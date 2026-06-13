import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

import {
  getOneQuiz,
  submitQuiz,
} from "../../Services/quizService";

import {getAdaptiveDraftQuiz, postSaveAdaptiveDraft} from "../../Services/adaptiveService"

import AdaptiveHeader from "../../Components/AdaptiveLearningComponent/AttemptPageComponenets/AdaptiveHeader";
import AdaptiveQuestionWorkspace from "../../Components/AdaptiveLearningComponent/AttemptPageComponenets/AdaptiveQuestionWorkspace";
import AdaptiveQuestionNavigator from "../../Components/AdaptiveLearningComponent/AttemptPageComponenets/AdaptiveQuestionNavigator";
import AdaptiveDraftModal from "../../Components/AdaptiveLearningComponent/AttemptPageComponenets/AdaptiveDraftModal";
import AdaptiveExitModal from "../../Components/AdaptiveLearningComponent/AttemptPageComponenets/AdaptiveExitModal";

export default function AdaptiveAttemptPage() {
  const navigate = useNavigate();

  const { quizId } = useParams();

  /*
  ==================================================
  STATE
  ==================================================
  */

  const [loading, setLoading] =
    useState(true);

  const [quiz, setQuiz] =
    useState(null);

  const [draft, setDraft] =
    useState(null);

  const [showDraftModal, setShowDraftModal] =
    useState(false);

  const [showExitModal, setShowExitModal] =
    useState(false);

  const [showSubmitModal, setShowSubmitModal] =
    useState(false);

  const [sessionState, setSessionState] =
    useState("prepare");

  /*
    prepare
    attempt
    submitting
  */

  const [answers, setAnswers] =
    useState({});

  const [
    currentQuestionIndex,
    setCurrentQuestionIndex,
  ] = useState(0);

  const [remainingTime, setRemainingTime] =
    useState(0);

  const [savingDraft, setSavingDraft] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  /*
  ==================================================
  FETCH QUIZ
  ==================================================
  */

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  async function fetchQuiz() {
    try {
      setLoading(true);

      const quizRes =
        await getOneQuiz(quizId);

      if (!quizRes.success) {
        navigate(-1);

        return;
      }

      const fetchedQuiz =
        quizRes.data.quiz;

      setQuiz(fetchedQuiz);

      setRemainingTime(
        fetchedQuiz.quizMetadata
          ?.timeLimit || 0
      );

      /*
      ==========================================
      CHECK DRAFT
      ==========================================
      */

      const draftRes =
        await getAdaptiveDraftQuiz(
          fetchedQuiz._id
        );

      if (
        draftRes.success &&
        draftRes.data.hasDraft
      ) {
        setDraft(
          draftRes.data.draft
        );

        setShowDraftModal(true);
      }
    } finally {
      setLoading(false);
    }
  }

  /*
  ==================================================
  DERIVED VALUES
  ==================================================
  */

  const questions =
    quiz?.questions || [];

  const currentQuestion =
    questions[
      currentQuestionIndex
    ];

  const totalQuestions =
    quiz?.questionCount ||
    questions.length ||
    0;

  const progressPercentage =
    totalQuestions > 0
      ? Math.round(
          (Object.keys(
            answers
          ).length /
            totalQuestions) *
            100
        )
      : 0;

  /*
  ==================================================
  FOCUS AREAS
  ==================================================
  */

  const focusAreas = useMemo(() => {
    const tags = new Set();

    questions.forEach(
      (question) => {
        question.tags?.forEach(
          (tag) => tags.add(tag)
        );
      }
    );

    return Array.from(tags).slice(
      0,
      4
    );
  }, [questions]);

  /*
  ==================================================
  DRAFT PAYLOAD
  ==================================================
  */

  function buildDraftPayload() {
    return {
      quizId: quiz._id,

      slug: quiz.slug,

      difficulty:
        quiz.difficulty,

      attemptedQuestionWithAnswers:
        Object.entries(
          answers
        ).map(
          ([
            questionIndex,
            answer,
          ]) => ({
            questionIndex:
              Number(
                questionIndex
              ),

            answer,
          })
        ),

      currentQuestionIndex,

      remainingTime,

      totalQuestion:
        totalQuestions,

      timeLimit:
        quiz.quizMetadata
          ?.timeLimit,
    };
  }

  /*
  ==================================================
  SUBMIT PAYLOAD
  ==================================================
  */

  function buildSubmitPayload() {
    return {
      quizId,
      topic: quiz.topic,

      difficulty:
        quiz.difficulty,

      timeTaken:
        quiz.quizMetadata
          ?.timeLimit -
        remainingTime,

      answers: Object.entries(
        answers
      ).map(
        ([
          questionIndex,
          answer,
        ]) => ({
          questionIndex:
            Number(
              questionIndex
            ),

            answer,
        })
      ),
    };
  }  /*
  ==================================================
  RESUME DRAFT
  ==================================================
  */

  function handleResumeDraft() {
    if (!draft) {
      return;
    }

    const restoredAnswers = {};

    draft.attemptedQuestionWithAnswers?.forEach(
      (item, index) => {
        restoredAnswers[index] =
          item.answer;
      }
    );

    setAnswers(restoredAnswers);

    setCurrentQuestionIndex(
      draft.currentQuestionIndex || 0
    );

    setRemainingTime(
      draft.remainingTime ||
        quiz.quizMetadata?.timeLimit ||
        0
    );

    setShowDraftModal(false);

    setSessionState("attempt");
  }

  /*
  ==================================================
  START FRESH
  ==================================================
  */

  function handleStartFresh() {
    setAnswers({});

    setCurrentQuestionIndex(0);

    setRemainingTime(
      quiz.quizMetadata?.timeLimit ||
        0
    );

    setDraft(null);

    setShowDraftModal(false);

    setSessionState("prepare");
  }

  /*
  ==================================================
  TIMER
  ==================================================
  */

  useEffect(() => {
    if (
      sessionState !== "attempt" ||
      submitting ||
      !quiz
    ) {
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        const updated = Number(
          (prev - 1 / 60).toFixed(2)
        );

        if (updated <= 0) {
          clearInterval(interval);

          handleAutoSubmit();

          return 0;
        }

        return updated;
      });
    }, 1000);

    return () =>
      clearInterval(interval);
  }, [
    sessionState,
    submitting,
    quiz,
  ]);

  /*
  ==================================================
  SAVE DRAFT
  ==================================================
  */

  async function handleSaveDraft() {
    try {
      setSavingDraft(true);

      const payload =
        buildDraftPayload();

      const res =
        await postSaveAdaptiveDraft(
          payload
        );

      if (!res.success) {
        alert(
          res.errors?.[0] ||
            "Unable to save draft."
        );

        return;
      }

      navigate(
        "/show/adaptive-learning"
      );
    } finally {
      setSavingDraft(false);

      setShowExitModal(false);
    }
  }

  /*
  ==================================================
  SUBMIT
  ==================================================
  */

  async function handleSubmitQuiz() {
    try {
      setSubmitting(true);

      setSessionState(
        "submitting"
      );

      const payload =
        buildSubmitPayload();

      const res =
        await submitQuiz(
  
          payload
        );

      if (!res.success) {
        alert(
          res.errors?.[0] ||
            "Unable to submit quiz."
        );

        setSessionState(
          "attempt"
        );

        return;
      }

      navigate(
        `/results/${res._id}`
      );
    } finally {
      setSubmitting(false);

      setShowSubmitModal(false);
    }
  }

  /*
  ==================================================
  AUTO SUBMIT
  ==================================================
  */

  async function handleAutoSubmit() {
    try {
      setSubmitting(true);

      setSessionState(
        "submitting"
      );

      await submitQuiz(
        buildSubmitPayload()
      );

      navigate(
        `/result/${res._id}`
      );
    } finally {
      setSubmitting(false);
    }
  }

  /*
  ==================================================
  BEFORE UNLOAD
  ==================================================
  */

  useEffect(() => {
    const handleBeforeUnload = (
      event
    ) => {
      if (
        sessionState !==
          "attempt" ||
        submitting
      ) {
        return;
      }

      event.preventDefault();

      event.returnValue = "";
    };

    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };
  }, [
    sessionState,
    submitting,
  ]);

  /*
  ==================================================
  ANSWERS
  ==================================================
  */

  function handleSelectAnswer(
    optionIndex
  ) {
    setAnswers((prev) => ({
      ...prev,

      [currentQuestionIndex]:
        optionIndex,
    }));
  }

  /*
  ==================================================
  NAVIGATION
  ==================================================
  */

  function handleQuestionJump(
    questionIndex
  ) {
    setCurrentQuestionIndex(
      questionIndex
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handlePrevious() {
    if (
      currentQuestionIndex === 0
    ) {
      return;
    }

    handleQuestionJump(
      currentQuestionIndex - 1
    );
  }

  function handleNext() {
    if (
      currentQuestionIndex ===
      totalQuestions - 1
    ) {
      setShowSubmitModal(true);

      return;
    }

    handleQuestionJump(
      currentQuestionIndex + 1
    );
  }

  /*
  ==================================================
  TIMER FORMAT
  ==================================================
  */

  const formattedTime =
    `${Math.floor(
      remainingTime
    )}:${String(
      Math.floor(
        (remainingTime % 1) * 60
      )
    ).padStart(2, "0")}`;

  const timerColor =
    remainingTime <= 1
      ? "text-rose-400"
      : remainingTime <= 3
      ? "text-amber-400"
      : "text-violet-500";  /*
  ==================================================
  LOADING
  ==================================================
  */

  if (loading) {
    return (
      <section
        className="
          flex
          min-h-[75vh]
          items-center
          justify-center
          px-6
        "
      >
        <div className="text-center">
          <Loader2
            size={42}
            className="
              mx-auto
              animate-spin
              text-violet-500
            "
          />

          <h2
            className="
              mt-8
              text-2xl
              font-bold
            "
          >
            Preparing Your Session
          </h2>

          <p
            className="
              mt-3
              text-[#8A8F98]
            "
          >
            Eventra is loading your
            adaptive workspace...
          </p>
        </div>
      </section>
    );
  }

  /*
  ==================================================
  SUBMITTING
  ==================================================
  */

  if (
    sessionState === "submitting"
  ) {
    return (
      <section
        className="
          flex
          min-h-[75vh]
          items-center
          justify-center
          px-6
        "
      >
        <div className="text-center">
          <Loader2
            size={42}
            className="
              mx-auto
              animate-spin
              text-violet-500
            "
          />

          <h2
            className="
              mt-8
              text-2xl
              font-bold
            "
          >
            Building Your Insights
          </h2>

          <p
            className="
              mt-3
              text-[#8A8F98]
            "
          >
            Finalizing your adaptive
            learning report...
          </p>
        </div>
      </section>
    );
  }

  /*
  ==================================================
  DRAFT MODAL
  ==================================================
  */

  if (showDraftModal && draft) {
    return (
      <>
        <AdaptiveDraftModal
          open={showDraftModal}
          topic={draft.topic}
          currentQuestionIndex={
            draft.currentQuestionIndex
          }
          totalQuestion={
            draft.totalQuestion
          }
          remainingTime={
            draft.remainingTime
          }
          lastSavedAt={
            draft.lastSavedAt
          }
          onResume={
            handleResumeDraft
          }
          onStartFresh={
            handleStartFresh
          }
        />
      </>
    );
  }

  /*
  ==================================================
  PREPARATION SCREEN
  ==================================================
  */

  if (
    sessionState === "prepare"
  ) {
    return (
      <section
        className="
          mx-auto
          max-w-5xl
          px-6
          py-14
        "
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-violet-500/15
              bg-violet-500/5
              px-4
              py-2
              text-sm
              font-medium
              text-violet-400
            "
          >
            Adaptive Session
          </div>

          {/* Heading */}
          <h1
            className="
              mt-8
              text-5xl
              font-bold
              tracking-tight
              leading-tight
              md:text-6xl
            "
          >
            {quiz.topic}
          </h1>

          <p
            className="
              mt-6
              max-w-2xl
              text-lg
              leading-relaxed
              text-[#8A8F98]
            "
          >
            This session has been
            personalized using your
            learning history to focus
            on concepts that matter
            most right now.
          </p>

          {/* Session Stats */}
          <div
            className="
              mt-12
              flex
              flex-wrap
              gap-10
            "
          >
            <div>
              <p
                className="
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-[#8A8F98]
                "
              >
                Questions
              </p>

              <p
                className="
                  mt-2
                  text-3xl
                  font-bold
                "
              >
                {totalQuestions}
              </p>
            </div>

            <div>
              <p
                className="
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-[#8A8F98]
                "
              >
                Time Limit
              </p>

              <p
                className="
                  mt-2
                  text-3xl
                  font-bold
                "
              >
                {
                  quiz.quizMetadata
                    ?.timeLimit
                }{" "}
                min
              </p>
            </div>

            <div>
              <p
                className="
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-[#8A8F98]
                "
              >
                Difficulty
              </p>

              <p
                className="
                  mt-2
                  text-3xl
                  font-bold
                  capitalize
                "
              >
                {quiz.difficulty}
              </p>
            </div>
          </div>

          {/* Focus Areas */}
          {focusAreas.length >
            0 && (
            <div className="mt-14">
              <p
                className="
                  text-sm
                  uppercase
                  tracking-[0.25em]
                  text-[#8A8F98]
                "
              >
                Today's Focus
              </p>

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-3
                "
              >
                {focusAreas.map(
                  (area) => (
                    <span
                      key={area}
                      className="
                        rounded-full
                        border
                        border-white/[0.08]
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-[#D6D8DC]
                      "
                    >
                      {area}
                    </span>
                  )
                )}
              </div>
            </div>
          )}

          {/* Quote */}
          <div
            className="
              mt-14
              border-l-2
              border-violet-500/20
              pl-5
            "
          >
            <p
              className="
                text-xl
                italic
                leading-relaxed
                text-[#D6D8DC]
              "
            >
              Practice isn't about
              doing more.
              <br />
              It's about doing what
              moves you forward.
            </p>

            <p
              className="
                mt-4
                text-sm
                uppercase
                tracking-[0.35em]
                text-[#8A8F98]
              "
            >
              EVENTRA
            </p>
          </div>

          {/* CTA */}
          <div className="mt-14">
            <button
              onClick={() =>
                setSessionState(
                  "attempt"
                )
              }
              className="
                cursor-pointer
                rounded-full
                bg-white
                px-8
                py-4
                font-semibold
                text-black
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/90
              "
            >
              Begin Adaptive Session
            </button>
          </div>
        </div>
      </section>
    );
  }

  /*
  ==================================================
  ATTEMPT SCREEN START
  ==================================================
  */

  return (
    <main
      className="
        mx-auto
        max-w-7xl
        px-6
        py-8
      "
    >      <AdaptiveHeader
        topic={quiz.topic}
        currentQuestionIndex={
          currentQuestionIndex
        }
        totalQuestions={
          totalQuestions
        }
        formattedTime={
          formattedTime
        }
        timerColor={timerColor}
        onExit={() =>
          setShowExitModal(true)
        }
      />

      <div
        className="
          mt-10
          grid
          gap-12
          lg:grid-cols-[260px_minmax(0,1fr)]
        "
      >
        {/* Left Rail */}
        <div
          className="
            order-2
            lg:order-1
          "
        >
          {/* Progress */}
          <div>
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <p
                className="
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-[#8A8F98]
                "
              >
                Progress
              </p>

              <span
                className="
                  text-sm
                  font-semibold
                "
              >
                {
                  Object.keys(
                    answers
                  ).length
                }
                {" / "}
                {totalQuestions}
              </span>
            </div>

            <div
              className="
                mt-4
                h-2
                overflow-hidden
                rounded-full
                bg-white/[0.05]
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-violet-500
                  to-blue-500
                  transition-all
                  duration-500
                "
                style={{
                  width: `${progressPercentage}%`,
                }}
              />
            </div>

            <p
              className="
                mt-3
                text-sm
                text-[#8A8F98]
              "
            >
              {progressPercentage}% answered
            </p>
          </div>

          {/* Navigator */}
          <div className="mt-12">
            <p
              className="
                text-sm
                uppercase
                tracking-[0.2em]
                text-[#8A8F98]
              "
            >
              Navigator
            </p>

            <AdaptiveQuestionNavigator
              totalQuestions={
                totalQuestions
              }
              currentQuestionIndex={
                currentQuestionIndex
              }
              answers={answers}
              onJump={
                handleQuestionJump
              }
            />
          </div>

          {/* Focus */}
          {focusAreas.length >
            0 && (
            <div className="mt-12">
              <p
                className="
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-[#8A8F98]
                "
              >
                Focus Areas
              </p>

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {focusAreas.map(
                  (area) => {
                    const isCurrent =
                      currentQuestion?.tags?.includes(
                        area
                      );

                    return (
                      <span
                        key={area}
                        className={`
                          rounded-full
                          px-3
                          py-2
                          text-sm
                          font-medium
                          transition-all
                          duration-300

                          ${
                            isCurrent
                              ? `
                                bg-violet-500/10
                                text-violet-400
                              `
                              : `
                                text-[#8A8F98]
                              `
                          }
                        `}
                      >
                        {area}
                      </span>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>

        {/* Workspace */}
        <div
          className="
            order-1
            lg:order-2
          "
        >
          <AdaptiveQuestionWorkspace
            currentQuestion={
              currentQuestion
            }
            currentQuestionIndex={
              currentQuestionIndex
            }
            totalQuestions={
              totalQuestions
            }
            selectedAnswer={
              answers[
                currentQuestionIndex
              ]
            }
            onSelectAnswer={
              handleSelectAnswer
            }
            onPrevious={
              handlePrevious
            }
            onNext={handleNext}
            isLastQuestion={
              currentQuestionIndex ===
              totalQuestions - 1
            }
          />
        </div>
      </div>      {/* Exit Draft Modal */}
      <AdaptiveExitModal
        open={showExitModal}
        title="Save Your Progress?"
        description="
          Your adaptive session can be resumed later from exactly where you left off.
        "
        confirmText="Save & Exit"
        cancelText="Continue Learning"
        loading={savingDraft}
        onConfirm={handleSaveDraft}
        onCancel={() =>
          setShowExitModal(false)
        }
      />

      {/* Submit Confirmation */}
      <AdaptiveExitModal
        open={showSubmitModal}
        title="Complete Adaptive Session?"
        description="
          Once submitted, your answers will be evaluated and personalized insights will be generated.
        "
        confirmText="Submit Session"
        cancelText="Review Answers"
        loading={submitting}
        onConfirm={handleSubmitQuiz}
        onCancel={() =>
          setShowSubmitModal(false)
        }
      />
    </main>
  );
}