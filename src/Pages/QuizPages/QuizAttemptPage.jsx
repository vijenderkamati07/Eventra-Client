// ===== IMPORTS =====
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getOneQuiz, submitQuiz } from "../../Services/quizService";

import QuizHeader from "../../Components/QuizAttemptComponents/QuizHeader";
import QuestionCard from "../../Components/QuizAttemptComponents/QuestionCard";
import QuizNavigation from "../../Components/QuizAttemptComponents/QuizNavigation";
import SubmitModal from "../../Components/QuizAttemptComponents/SubmitModal";


// ===== COMPONENT =====
const QuizAttemptPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  // ===== STATES =====
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({});

  const [timeLeft, setTimeLeft] = useState(0);

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent duplicate submissions
  const submissionStartedRef = useRef(false);


  // ===== FETCH QUIZ =====
  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);

      const res = await getOneQuiz(quizId);

      if (res.success) {
        const quizData = res.data.quiz;

        setQuiz(quizData);

        // Backend timeLimit is in minutes
        setTimeLeft(
          quizData.quizMetadata.timeLimit * 60
        );
      }

      setLoading(false);
    };

    fetchQuiz();
  }, [quizId]);


  // ===== TIMER =====
  useEffect(() => {
    if (!quiz) return;

    if (isSubmitting) return;

    if (submissionStartedRef.current) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          handleSubmit(true);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [quiz, isSubmitting]);


  // ===== SELECT ANSWER =====
  const handleSelectAnswer = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }));
  };


  // ===== NEXT =====
  const handleNext = () => {
    if (
      currentQuestion <
      quiz.questions.length - 1
    ) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };


  // ===== PREVIOUS =====
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };


  // ===== BUILD PAYLOAD =====
  const buildPayload = () => {
    const totalTime =
      quiz.quizMetadata.timeLimit;

    const timeTaken =
      totalTime -
      Math.ceil(timeLeft / 60);

    return {
      quizId: quiz._id,
      topic: quiz.topic,

      timeLimit: totalTime,

      timeTaken,

      difficulty: quiz.difficulty,

      answers: Object.entries(
        answers
      ).map(
        ([questionIndex, answer]) => ({
          questionIndex: Number(
            questionIndex
          ),

          answer,
        })
      ),
    };
  };


  // ===== SUBMIT =====
  const handleSubmit = async (
    autoSubmit = false
  ) => {
    if (
      submissionStartedRef.current
    ) {
      return;
    }

    submissionStartedRef.current =
      true;

    try {
      setIsSubmitting(true);

      const payload =
        buildPayload();

      const res =
        await submitQuiz(
          quizId,
          JSON.stringify(payload)
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
      setIsSubmitting(false);

      if (!autoSubmit) {
        setShowSubmitModal(false);
      }
    }
  };


  // ===== DERIVED VALUES =====
  const answeredCount =
    Object.keys(answers).length;


  // ===== LOADING =====
  if (loading) {
    return (
      <div className="min-h-screen bg-[#08090A] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }


 
  if (!quiz) {
    return (
      <div className="min-h-screen bg-[#08090A] text-white flex items-center justify-center">
        Quiz not found.
      </div>
    );
  }

   return (
    <div className="min-h-screen bg-[#08090A] text-white">
      
      <QuizHeader
        title={quiz.title}
        topic={quiz.topic}
        difficulty={quiz.difficulty}
        currentQuestion={currentQuestion}
        totalQuestions={quiz.questions.length}
        timeLeft={timeLeft}
        onLeave={() => navigate(-1)}
      />

      <main className="max-w-4xl mx-auto px-6 py-8">

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-[#8A8F98] mb-2">
            <span>
              {answeredCount} of {quiz.questions.length} answered
            </span>

            <span>
              {currentQuestion + 1}/{quiz.questions.length}
            </span>
          </div>

          <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{
                width: `${
                  (answeredCount /
                    quiz.questions.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>


        {/* Question */}
        <QuestionCard
          question={
            quiz.questions[currentQuestion]
          }
          questionNumber={
            currentQuestion + 1
          }
          totalQuestions={
            quiz.questions.length
          }
          selectedAnswer={
            answers[currentQuestion]
          }
          onSelectAnswer={
            handleSelectAnswer
          }
        />


        {/* Navigation */}
        <QuizNavigation
          currentQuestion={currentQuestion}
          totalQuestions={
            quiz.questions.length
          }
          isSubmitting={isSubmitting}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={() =>
            setShowSubmitModal(true)
          }
        />
      </main>


      {/* Submit Confirmation */}
      <SubmitModal
        isOpen={showSubmitModal}
        answeredCount={answeredCount}
        totalQuestions={
          quiz.questions.length
        }
        timeLeft={timeLeft}
        isSubmitting={isSubmitting}
        onClose={() =>
          setShowSubmitModal(false)
        }
        onSubmit={() =>
          handleSubmit(false)
        }
      />
    </div>
  );
};

export default QuizAttemptPage;