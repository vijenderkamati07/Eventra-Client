// ===== IMPORTS =====
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getOneQuiz,
  submitQuiz,
} from "../../Services/quizService";

import {
  postSaveAdaptiveDraft,
  getAdaptiveDraftQuiz,
} from "../../Services/adaptiveService";

import AssessmentSidebar from "../../Components/QuizAttemptComponents/AssessmentSidebar";
import AttemptSkeleton from "../../Components/QuizAttemptComponents/AttemptSkeleton";
import AttemptErrorState from "../../Components/QuizAttemptComponents/AttemptErrorState";
import ExitModal from "../../Components/QuizAttemptComponents/ExitModal";
import QuestionCard from "../../Components/QuizAttemptComponents/QuestionCard";
import QuizHeader from "../../Components/QuizAttemptComponents/QuizHeader";
import ResumeDraftModal from "../../Components/QuizAttemptComponents/ResumeModal";
import SubmitModal from "../../Components/QuizAttemptComponents/SubmitModal";
import QuizNavigation from "../../Components/QuizAttemptComponents/QuizNavigation";


// ===== COMPONENT =====
const QuizAttemptPage = () => {
  const { quizId } = useParams();

  const navigate = useNavigate();


  // ==================================================
  // STATES
  // ==================================================

  const [quiz, setQuiz] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /*
    Answers Array

    Example:

    [
      2,
      undefined,
      0
    ]

    Question 1 -> option 2

    Question 2 -> unanswered

    Question 3 -> option 0
  */
  const [answers, setAnswers] = useState([]);


  /*
    Navigator states
  */
  const [visitedQuestions, setVisitedQuestions] =
    useState(new Set([0]));


  const [currentQuestion, setCurrentQuestion] =
    useState(0);


  /*
    Stored in MINUTES

    Example:

    17.12
  */
  const [timeLeft, setTimeLeft] =
    useState(0);


  /*
    Existing draft id

    Used for updating draft
  */
  const [submissionId, setSubmissionId] =
    useState("");


  // ==========================
  // Modals
  // ==========================

  const [showResumeModal, setShowResumeModal] =
    useState(false);

  const [showSubmitModal, setShowSubmitModal] =
    useState(false);

  const [showExitModal, setShowExitModal] =
    useState(false);


  // ==========================
  // Loading states
  // ==========================

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [isSavingDraft, setIsSavingDraft] =
    useState(false);


  /*
    Draft fetched but not restored yet
  */
  const [draftData, setDraftData] =
    useState(null);


  // ==================================================
  // REFS
  // ==================================================

  /*
    Prevent duplicate submit
  */
  const submissionStartedRef =
    useRef(false);


  /*
    Prevent duplicate draft saves
  */
  const draftSavingRef =
    useRef(false);


  /*
    Avoid showing resume modal multiple times
  */
  const draftInitializedRef =
    useRef(false);



  // ==================================================
  // FETCH QUIZ + DRAFT
  // ==================================================

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);

        setError("");


        // ==========================
        // Fetch Quiz
        // ==========================
        const quizRes =
          await getOneQuiz(quizId);


        if (
          !quizRes.success
        ) {
          setError(
            quizRes.errors?.[0] ||
            "Unable to load assessment."
          );

          return;
        }


        const quizData =
          quizRes.data.quiz;


        setQuiz(quizData);


        /*
          Initialize answers array
        */
        setAnswers(
          Array(
            quizData.questions.length
          ).fill(undefined)
        );


        /*
          Fresh timer

          Minutes
        */
        setTimeLeft(
          quizData.quizMetadata.timeLimit
        );


        // ==========================
        // Fetch Draft
        // ==========================

        const draftRes =
          await getAdaptiveDraftQuiz(
            quizId
          );


        if (
          draftRes.success &&
          draftRes.data?.hasDraft
        ) {
          setDraftData(
            draftRes.data.draft
          );

          setShowResumeModal(
            true
          );
        }

      } catch (err) {
        console.error(err);

        setError(
          "Unable to load assessment."
        );
      } finally {
        setLoading(false);
      }
    };


    fetchQuiz();

  }, [quizId]);



  // ==================================================
  // RESUME DRAFT
  // ==================================================

  const handleResumeDraft = () => {
    if (
      !draftData ||
      draftInitializedRef.current
    ) {
      return;
    }


    draftInitializedRef.current =
      true;


    /*
      Answers
    */
    const restoredAnswers = Array(
  quiz.questions.length
).fill(undefined);

draftData.attemptedQuestionWithAnswers.forEach(
  (item, index) => {
    restoredAnswers[index] =
      item.answer;
  }
);

setAnswers(restoredAnswers);


    /*
      Current Question
    */
    setCurrentQuestion(
      draftData.currentQuestionIndex
    );


    /*
      Minutes Remaining
    */
    setTimeLeft(
      draftData.remainingTime
    );


    /*
      Draft Id
    */
    setSubmissionId(
      draftData.submissionId || ""
    );


    /*
      Visited Questions
    */
    const visited =
      new Set();


    for (
      let i = 0;
      i <=
      draftData.currentQuestionIndex;
      i++
    ) {
      visited.add(i);
    }


    setVisitedQuestions(
      visited
    );


    setShowResumeModal(
      false
    );
  };



  // ==================================================
  // START FRESH
  // ==================================================

  const handleStartFresh = () => {
    draftInitializedRef.current =
      true;


    setDraftData(null);

    setSubmissionId("");

    setShowResumeModal(false);
  };



  // ==================================================
  // TIMER
  // ==================================================

  useEffect(() => {
    if (!quiz) return;

    if (showResumeModal) return;

    if (isSubmitting) return;

    if (
      submissionStartedRef.current
    ) {
      return;
    }


    const interval =
      setInterval(() => {
        setTimeLeft((prev) => {
          /*
            Auto Submit

            Part 1B
            will call
            handleSubmit(true)
          */
          if (
            prev <= (1 / 60)
          ) {
            clearInterval(
              interval
            );

            return 0;
          }


          /*
            1 second

            Stored as minutes
          */
          return Math.max(
            prev - (1 / 60),
            0
          );
        });
      }, 1000);


    return () =>
      clearInterval(interval);

  }, [
    quiz,
    showResumeModal,
    isSubmitting,
  ]);



  // ==================================================
  // BUILD DRAFT PAYLOAD
  // ==================================================

  const buildDraftPayload =
    () => {
      if (!quiz) return null;


      return {
        topic:
          quiz.topic,

        slug:
          quiz.slug,

        attemptedQuestionWithAnswers:
          answers.map(
            (answer) => ({
              answer,
            })
          ),

        currentQuestionIndex:
          currentQuestion,

        remainingTime:
          timeLeft,

        totalQuestion:
          quiz.questions.length,

        timeLimit:
          quiz.quizMetadata.timeLimit,

        ...(submissionId && {
          submissionId,
        }),
      };
    };



  // ==================================================
  // BUILD SUBMIT PAYLOAD
  // ==================================================

  const buildSubmitPayload =
    () => {
      if (!quiz) return null;


      const timeTaken =
        quiz.quizMetadata
          .timeLimit -
        timeLeft;


      return {
        quizId: quizId,

        topic:
          quiz.topic,

        difficulty:
          quiz.difficulty,

        timeTaken,

        answers:
          answers
            .map(
              (
                answer,
                questionIndex
              ) => {
                if (
                  answer ===
                  undefined
                ) {
                  return null;
                }

                return {
                  questionIndex,

                  answer,
                };
              }
            )
            .filter(Boolean),
      };
    };

  // ==================================================
  // SELECT ANSWER
  // ==================================================

  const handleSelectAnswer = (optionIndex) => {
    setAnswers((prev) => {
      const next = [...prev];

      next[currentQuestion] = optionIndex;

      return next;
    });
  };



  // ==================================================
  // NAVIGATION
  // ==================================================

  const handleGoToQuestion = (questionIndex) => {
    setCurrentQuestion(questionIndex);

    setVisitedQuestions((prev) => {
      const next = new Set(prev);

      next.add(questionIndex);

      return next;
    });
  };


  const handleNext = () => {
    if (
      !quiz ||
      currentQuestion >=
        quiz.questions.length - 1
    ) {
      return;
    }

    const nextQuestion =
      currentQuestion + 1;

    setCurrentQuestion(nextQuestion);

    setVisitedQuestions((prev) => {
      const next = new Set(prev);

      next.add(nextQuestion);

      return next;
    });
  };


  const handlePrevious = () => {
    if (currentQuestion <= 0) {
      return;
    }

    const previousQuestion =
      currentQuestion - 1;

    setCurrentQuestion(
      previousQuestion
    );

    setVisitedQuestions((prev) => {
      const next = new Set(prev);

      next.add(previousQuestion);

      return next;
    });
  };



  // ==================================================
  // SAVE DRAFT
  // ==================================================

  const handleSaveDraft =
    async () => {
      if (!quiz) return;

      if (
        draftSavingRef.current
      ) {
        return;
      }

      try {
        draftSavingRef.current =
          true;

        setIsSavingDraft(true);

        const payload =
          buildDraftPayload();

        const res =
          await postSaveAdaptiveDraft(
            payload
          );

        if (
          res.success &&
          res.data
            ?.submissionId
        ) {
          setSubmissionId(
            res.data
              .submissionId
          );
        }

        return res;
      } catch (error) {
        console.error(error);

        return {
          success: false,
        };
      } finally {
        draftSavingRef.current =
          false;

        setIsSavingDraft(false);
      }
    };



  // ==================================================
  // EXIT HANDLERS
  // ==================================================

  const handleLeaveQuiz =
    async () => {
      /*
        Don't save
        empty attempts
      */
      const hasProgress =
        answers.some(
          (answer) =>
            answer !==
            undefined
        );

      if (hasProgress) {
        await handleSaveDraft();
      }

      navigate(-1);
    };


  const handleExitConfirm =
    async () => {
      await handleLeaveQuiz();
    };



  // ==================================================
  // SUBMIT
  // ==================================================

  const handleSubmit =
    async (
      autoSubmit = false
    ) => {
      if (
        submissionStartedRef.current
      ) {
        return;
      }

      if (!quiz) {
        return;
      }

      submissionStartedRef.current =
        true;

      try {
        setIsSubmitting(
          true
        );

        const payload =
          buildSubmitPayload();

        const res =
          await submitQuiz(
            
              payload
            
          );

        if (res.success) {
          navigate(
            `/results/${res.data.submittionId}`
          );

          return;
        }

        submissionStartedRef.current =
          false;

      } catch (error) {
        console.error(error);

        submissionStartedRef.current =
          false;
      } finally {
        setIsSubmitting(
          false
        );

        if (
          !autoSubmit
        ) {
          setShowSubmitModal(
            false
          );
        }
      }
    };



  // ==================================================
  // TIMER AUTO SUBMIT
  // ==================================================

  useEffect(() => {
    if (
      !quiz ||
      isSubmitting
    ) {
      return;
    }

    if (
      submissionStartedRef.current
    ) {
      return;
    }

    if (timeLeft === 0) {
      handleSubmit(true);
    }
  }, [
    timeLeft,
    quiz,
    isSubmitting,
  ]);



  // ==================================================
  // BEFORE UNLOAD
  // ==================================================

  useEffect(() => {
    const handleBeforeUnload =
      (event) => {
        const hasProgress =
          answers.some(
            (answer) =>
              answer !==
              undefined
          );

        if (
          !hasProgress ||
          submissionStartedRef.current
        ) {
          return;
        }

        event.preventDefault();

        event.returnValue =
          "";
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
  }, [answers]);



  // ==================================================
  // DERIVED VALUES
  // ==================================================

  const answeredCount =
    answers.filter(
      (answer) =>
        answer !== undefined
    ).length;


  const unansweredCount =
    quiz
      ? quiz.questions
          .length -
        answeredCount
      : 0;

  // ==================================================
  // KEYBOARD SHORTCUTS
  // ==================================================

  useEffect(() => {
    if (!quiz) return;

    if (
      showResumeModal ||
      showSubmitModal ||
      showExitModal
    ) {
      return;
    }

    const handleKeyDown = (event) => {
      const activeTag =
        document.activeElement?.tagName;

      /*
        Ignore typing
      */
      if (
        activeTag === "INPUT" ||
        activeTag === "TEXTAREA"
      ) {
        return;
      }

      // Option shortcuts
      if (
        ["1", "2", "3", "4"].includes(
          event.key
        )
      ) {
        const optionIndex =
          Number(event.key) - 1;

        const optionsCount =
          quiz.questions[
            currentQuestion
          ]?.options?.length || 0;

        if (
          optionIndex <
          optionsCount
        ) {
          handleSelectAnswer(
            optionIndex
          );
        }

        return;
      }

      // Previous
      if (
        event.key ===
        "ArrowLeft"
      ) {
        handlePrevious();

        return;
      }

      // Next
      if (
        event.key ===
        "ArrowRight"
      ) {
        if (
          currentQuestion ===
          quiz.questions.length -
            1
        ) {
          return;
        }

        handleNext();

        return;
      }

      // Enter
      if (
        event.key ===
        "Enter"
      ) {
        const selected =
          answers[
            currentQuestion
          ];

        if (
          selected ===
          undefined
        ) {
          return;
        }

        if (
          currentQuestion ===
          quiz.questions.length -
            1
        ) {
          setShowSubmitModal(
            true
          );

          return;
        }

        handleNext();

        return;
      }

      // ESC
      if (
        event.key ===
        "Escape"
      ) {
        setShowExitModal(
          true
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    quiz,
    currentQuestion,
    answers,
    showResumeModal,
    showSubmitModal,
    showExitModal,
  ]);



  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <AttemptSkeleton />
    );
  }



  // ==================================================
  // ERROR
  // ==================================================

  if (error || !quiz) {
    return (
      <AttemptErrorState
        title="Unable to load assessment"
        description={
          error ||
          "Please try again."
        }
        onRetry={() =>
          window.location.reload()
        }
        onGoBack={() =>
          navigate(-1)
        }
      />
    );
  }



  // ==================================================
  // RETURN
  // ==================================================

  return (
    <div className="min-h-screen bg-[#08090A] text-white">

      {/* Header */}
      <QuizHeader
        title={quiz.title}
        topic={quiz.topic}
        difficulty={
          quiz.difficulty
        }
        currentQuestion={
          currentQuestion
        }
        totalQuestions={
          quiz.questions.length
        }
        timeLeft={timeLeft}
        onLeave={() =>
          setShowExitModal(
            true
          )
        }
        onSaveAndExit={
          handleLeaveQuiz
        }
        isSavingDraft={
          isSavingDraft
        }
      />


      <main className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,900px)_320px] gap-8 items-start">

          {/* Question Area */}
          <div>

            <QuestionCard
              question={
                quiz.questions[
                  currentQuestion
                ]
              }
              questionNumber={
                currentQuestion +
                1
              }
              totalQuestions={
                quiz.questions
                  .length
              }
              selectedAnswer={
                answers[
                  currentQuestion
                ]
              }
              onSelectAnswer={
                handleSelectAnswer
              }
            />

          </div>


          {/* Sidebar */}
          <AssessmentSidebar
            totalQuestions={
              quiz.questions
                .length
            }
            currentQuestion={
              currentQuestion
            }
            answers={answers}
            visitedQuestions={
              visitedQuestions
            }
            answeredCount={
              answeredCount
            }
            unansweredCount={
              unansweredCount
            }
            onQuestionSelect={
              handleGoToQuestion
            }
            onSaveAndExit={
              handleLeaveQuiz
            }
            onSubmit={() =>
              setShowSubmitModal(
                true
              )
            }
            isSavingDraft={
              isSavingDraft
            }
            isSubmitting={
              isSubmitting
            }
          />

        </div>

      </main>


      {/* Resume Draft */}
      <ResumeDraftModal
        isOpen={
          showResumeModal
        }
        draftData={
          draftData
        }
        onResume={
          handleResumeDraft
        }
        onStartFresh={
          handleStartFresh
        }
      />


      {/* Exit */}
      <ExitModal
        isOpen={
          showExitModal
        }
        isSavingDraft={
          isSavingDraft
        }
        onClose={() =>
          setShowExitModal(
            false
          )
        }
        onExit={
          handleExitConfirm
        }
      />


      {/* Submit */}
      <SubmitModal
        isOpen={
          showSubmitModal
        }
        answeredCount={
          answeredCount
        }
        unansweredCount={
          unansweredCount
        }
        totalQuestions={
          quiz.questions
            .length
        }
        timeLeft={timeLeft}
        isSubmitting={
          isSubmitting
        }
        onClose={() =>
          setShowSubmitModal(
            false
          )
        }
        onSubmit={() =>
          handleSubmit(
            false
          )
        }
      />

    </div>
  );
};

export default QuizAttemptPage;

