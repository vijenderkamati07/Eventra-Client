import { useEffect, useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowRight,
  Brain,
  Medal,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { getQuizResult } from "../../Services/quizService";

const QuizResultPage = () => {
  const { quizId } = useParams();

  const navigate = useNavigate();

  const [resultData, setResultData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [reviewFilter, setReviewFilter] = useState("all");

  useEffect(() => {
    fetchResult();
  }, [quizId]);

  const fetchResult = async () => {
    try {
      setLoading(true);

      setError("");

      const response = await getQuizResult(quizId);

      if (!response.success) {
        setError(response.errors?.[0] || "Failed to load result.");

        return;
      }

      setResultData(response.data);
    } catch {
      setError("Something went wrong while loading your result.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          bg-[#08090A]
          text-white
          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            rounded-3xl
            border
            border-white/[0.06]
            bg-[#0C0D0F]
            px-12
            py-10
            text-center
          "
        >
          <div className="text-4xl">⏳</div>

          <p
            className="
              mt-5
              text-[#8A8F98]
            "
          >
            Loading your results...
          </p>
        </div>
      </div>
    );
  }

  if (error || !resultData) {
    return (
      <div
        className="
          min-h-screen
          bg-[#08090A]
          text-white
          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            max-w-lg
            rounded-3xl
            border
            border-red-500/20
            bg-red-500/5
            px-10
            py-10
            text-center
          "
        >
          <div className="text-4xl">⚠️</div>

          <h2
            className="
              mt-6
              text-2xl
              font-semibold
            "
          >
            Unable to load result
          </h2>

          <p
            className="
              mt-4
              leading-7
              text-[#8A8F98]
            "
          >
            {error}
          </p>

          <button
            onClick={fetchResult}
            className="
              mt-8
              cursor-pointer
              rounded-full
              bg-white
              px-6
              py-3
              text-sm
              font-medium
              text-black
              hover:bg-white/90
            "
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { result, currentAccuracy, prevAccuracy, change, adaptiveLearning } =
    resultData;

  const accuracy = currentAccuracy;

  const correctCount = result.correctAnswers.length;

  const wrongCount = result.wrongAnswers.length;
  const getPerformanceData = (accuracy) => {
    if (accuracy >= 80) {
      return {
        title: "Outstanding Performance",
        subtitle: "You're mastering this topic.",
      };
    }

    if (accuracy >= 50) {
      return {
        title: "Good Progress",
        subtitle: "A few concepts still need reinforcement.",
      };
    }

    return {
      title: "Keep Going",
      subtitle: "This attempt revealed exactly what to improve.",
    };
  };

  const getImprovementData = (change) => {
    if (change > 0) {
      return {
        icon: TrendingUp,
        title: `Improved by ${change}%`,
        subtitle: "Compared to your previous attempts.",
        bg: "bg-emerald-500/10",
        color: "text-emerald-300",
      };
    }

    if (change < 0) {
      return {
        icon: TrendingDown,
        title: "Performance Dropped",
        subtitle: "Focus on your weak areas below.",
        bg: "bg-red-500/10",
        color: "text-red-300",
      };
    }

    return {
      icon: Target,
      title: "Consistent Performance",
      subtitle: "You're maintaining the same level.",
      bg: "bg-blue-500/10",
      color: "text-blue-300",
    };
  };

  const performance = getPerformanceData(accuracy);

  const improvement = getImprovementData(change);

  const ImprovementIcon = improvement.icon;

  const circumference = 2 * Math.PI * 70;

  const progress = circumference - (accuracy / 100) * circumference;

  const scoreColor =
    accuracy >= 80
      ? "#10B981" // emerald
      : accuracy >= 50
        ? "#F59E0B" // yellow
        : "#EF4444"; // red

  return (
    <div className="min-h-screen bg-[#08090A] text-white">
      {/* Background Glow */}
      <div
        className="
          absolute
          left-1/2
          top-0
          h-[700px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-white/[0.02]
          blur-3xl
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-[1280px]
          px-6
          py-10
          lg:px-8
        "
      >
        <div className="space-y-8">
          {/* Hero */}
          <section
            className="
              rounded-[32px]
              border
              border-white/[0.06]
              bg-[#0C0D0F]
              p-8
              lg:p-10
            "
          >
            <div
              className="
                flex
                flex-col
                gap-8
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <div>
                <span
                  className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-[#8A8F98]
                  "
                >
                  Quiz Completed
                </span>

                <h1
                  className="
                    mt-4
                    text-4xl
                    font-semibold
                    tracking-[-0.03em]
                  "
                >
                  {performance.title}
                </h1>

                <p
                  className="
                    mt-4
                    max-w-2xl
                    leading-8
                    text-[#8A8F98]
                  "
                >
                  {performance.subtitle}
                </p>

                <div
                  className="
                    mt-8
                    flex
                    flex-wrap
                    gap-4
                    text-sm
                    text-[#8A8F98]
                  "
                >
                  <span>{result.topic}</span>

                  <span>•</span>

                  <span>
                    Score {result.score.gain}/{result.score.total}
                  </span>

                  <span>•</span>

                  <span>{new Date(result.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div
                className="
    relative
    flex
    h-48
    w-48
    shrink-0
    items-center
    justify-center
  "
              >
                {/* Very Subtle Halo */}
                <div
                  className="
      absolute
      inset-10
      rounded-full
      blur-md
      opacity-10
    "
                  style={{
                    backgroundColor: scoreColor,
                  }}
                />

                {/* Progress Ring */}
                <svg
                  className="
      absolute
      h-full
      w-full
      -rotate-90
    "
                  viewBox="0 0 160 160"
                >
                  {/* Track */}
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="6"
                  />

                  {/* Progress */}
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke={scoreColor}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={progress}
                    style={{
                      transition: "stroke-dashoffset 1.8s ease-out",
                    }}
                  />
                </svg>

                {/* Inner Circle */}
                {/* Inner Circle */}
                <div
                  className="
    flex
    h-[150px]
    w-[150px]
    flex-col
    items-center
    justify-center
    rounded-full
    border
    border-white/[0.04]
    bg-[#0C0D0F]
  "
                >
                  <div
                    className="
      flex
      flex-col
      items-center
      translate-y-[6px]
    "
                  >
                    <p
                      className="
        text-[30px]
        font-bold
        leading-none
      "
                      style={{
                        color: scoreColor,
                      }}
                    >
                      {accuracy}%
                    </p>

                    <p
                      className="
        mt-3
        text-[10px]
        font-medium
        uppercase
        tracking-[0.22em]
        text-[#8A8F98]
      "
                    >
                      Accuracy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Metrics */}
          <div
            className="
              grid
              gap-6
              md:grid-cols-2
              xl:grid-cols-4
            "
          >
            {[
              {
                icon: Target,
                label: "Accuracy",
                value: `${accuracy}%`,
              },
              {
                icon: Medal,
                label: "Score",
                value: `${result.score.gain}/${result.score.total}`,
              },
              {
                icon: Brain,
                label: "Correct",
                value: correctCount,
              },
              {
                icon: Sparkles,
                label: "Wrong",
                value: wrongCount,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="
                      rounded-3xl
                      border
                      border-white/[0.06]
                      bg-[#0C0D0F]
                      p-6
                    "
                >
                  <Icon size={24} />

                  <p
                    className="
                        mt-5
                        text-3xl
                        font-semibold
                      "
                  >
                    {item.value}
                  </p>

                  <p
                    className="
                        mt-2
                        text-[#8A8F98]
                      "
                  >
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
          {/* Improvement */}
          <section
            className={`
              rounded-3xl
              border
              border-white/[0.06]
              p-6
              ${improvement.bg}
            `}
          >
            <div className="flex gap-4">
              <ImprovementIcon className={improvement.color} />

              <div>
                <h2
                  className={`
                    text-xl
                    font-semibold
                    ${improvement.color}
                  `}
                >
                  {improvement.title}
                </h2>

                <p
                  className="
                    mt-2
                    text-[#8A8F98]
                  "
                >
                  {improvement.subtitle}
                </p>

                <p
                  className="
                    mt-4
                    text-sm
                    text-[#8A8F98]
                  "
                >
                  Previous: {prevAccuracy}%{" • "}
                  Current: {currentAccuracy}%
                </p>
              </div>
            </div>
          </section>{" "}
          {/* Adaptive Learning */}
          <section
            className="
              rounded-[32px]
              border
              border-white/[0.06]
              bg-[#0C0D0F]
              p-8
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/[0.03]
                px-4
                py-2
                text-sm
              "
            >
              <Sparkles size={16} />
              Adaptive Learning
            </span>

            <h2
              className="
                mt-6
                text-3xl
                font-semibold
              "
            >
              Master {result.topic}
            </h2>

            {adaptiveLearning.eligible ? (
              <>
                <p
                  className="
                    mt-4
                    max-w-2xl
                    leading-8
                    text-[#8A8F98]
                  "
                >
                  Generate a mastery quiz built from your recent learning
                  patterns and weak areas.
                </p>

                <button
                  className="
                    mt-8
                    inline-flex
                    cursor-pointer
                    items-center
                    gap-2
                    rounded-full
                    bg-white
                    px-8
                    py-3
                    font-medium
                    text-black
                    transition-all
                    duration-200
                    hover:bg-white/90
                  "
                >
                  Generate Adaptive Quiz
                  <ArrowRight size={18} />
                </button>
              </>
            ) : (
              <>
                <p
                  className="
                    mt-4
                    text-[#8A8F98]
                  "
                >
                  Complete {adaptiveLearning.attemptsUsed} more attempts to
                  unlock adaptive learning.
                </p>

                <div
                  className="
                    mt-6
                    h-3
                    overflow-hidden
                    rounded-full
                    bg-white/[0.06]
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-white
                    "
                    style={{
                      width: `${
                        ((5 - adaptiveLearning.attemptsUsed) / 5) * 100
                      }%`,
                    }}
                  />
                </div>
              </>
            )}
          </section>
          {/* Response Review */}
          <section
            className="
              rounded-[32px]
              border
              border-white/[0.06]
              bg-[#0C0D0F]
              p-8
            "
          >
            <div
              className="
                flex
                flex-col
                gap-5
                md:flex-row
                md:items-center
                md:justify-between
              "
            >
              <div>
                <h2
                  className="
                    text-2xl
                    font-semibold
                  "
                >
                  Review Your Responses
                </h2>

                <p
                  className="
                    mt-2
                    text-[#8A8F98]
                  "
                >
                  Understand what you got right and where you need improvement.
                </p>
              </div>

              <div
                className="
                  flex
                  rounded-2xl
                  bg-white/[0.03]
                  p-1
                "
              >
                <button
                  onClick={() => setReviewFilter("all")}
                  className={`
                    cursor-pointer
                    rounded-xl
                    px-4
                    py-2
                    text-sm
                    transition-all

                    ${
                      reviewFilter === "all"
                        ? "bg-white text-black"
                        : "text-[#8A8F98]"
                    }
                  `}
                >
                  All Responses
                </button>

                <button
                  onClick={() => setReviewFilter("wrong")}
                  className={`
                    cursor-pointer
                    rounded-xl
                    px-4
                    py-2
                    text-sm
                    transition-all

                    ${
                      reviewFilter === "wrong"
                        ? "bg-white text-black"
                        : "text-[#8A8F98]"
                    }
                  `}
                >
                  Incorrect Only
                </button>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {(reviewFilter === "all"
                ? result.answers
                : result.wrongAnswers
              ).map((item, index) => {
                const userAnswer =
                  reviewFilter === "all" ? item.answer : item.wrongAnswer;

                const correctMatch = result.correctAnswers.find(
                  (correct) => correct.question === item.question,
                );

                const correctAnswer = correctMatch?.correctAnswer;

                const isCorrect = userAnswer === correctAnswer;

                return (
                  <div
                    key={item._id}
                    className={`
                        rounded-3xl
                        border
                        p-6

                        ${
                          isCorrect
                            ? `
                              border-emerald-500/20
                              bg-emerald-500/[0.03]
                            `
                            : `
                              border-red-500/20
                              bg-red-500/[0.03]
                            `
                        }
                      `}
                  >
                    <div
                      className="
                          flex
                          items-center
                          gap-3
                        "
                    >
                      <span
                        className={`
                            text-xl

                            ${isCorrect ? "text-emerald-300" : "text-red-300"}
                          `}
                      >
                        {isCorrect ? "✓" : "✕"}
                      </span>

                      <p
                        className="
                            font-medium
                          "
                      >
                        Question {index + 1}
                      </p>
                    </div>

                    <h3
                      className="
                          mt-5
                          text-lg
                          font-medium
                          leading-8
                        "
                    >
                      {item.question}
                    </h3>

                    <div className="mt-6 space-y-4">
                      <div>
                        <p
                          className="
                              text-sm
                              text-[#8A8F98]
                            "
                        >
                          Your Answer
                        </p>

                        <p
                          className={`
                              mt-2
                              font-medium

                              ${isCorrect ? "text-emerald-300" : "text-red-300"}
                            `}
                        >
                          {userAnswer}
                        </p>
                      </div>

                      <div>
                        <p
                          className="
                              text-sm
                              text-[#8A8F98]
                            "
                        >
                          Correct Answer
                        </p>

                        <p
                          className="
                              mt-2
                              font-medium
                              text-emerald-300
                            "
                        >
                          {correctAnswer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>{" "}
          {/* Weak Areas */}
          {result.weakAreas?.length > 0 && (
            <section
              className="
                rounded-[32px]
                border
                border-white/[0.06]
                bg-[#0C0D0F]
                p-8
              "
            >
              <h2
                className="
                  text-2xl
                  font-semibold
                "
              >
                Focus Areas
              </h2>

              <p
                className="
                  mt-3
                  text-[#8A8F98]
                "
              >
                These concepts need additional practice.
              </p>

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-3
                "
              >
                {result.weakAreas.map((area, index) => (
                  <div
                    key={index}
                    className="
                        rounded-full
                        border
                        border-red-500/20
                        bg-red-500/10
                        px-5
                        py-3
                        text-sm
                        text-red-300
                      "
                  >
                    ⚠ {area}
                  </div>
                ))}
              </div>
            </section>
          )}
          {/* AI Coach Feedback */}
          <section
            className="
              rounded-[32px]
              border
              border-white/[0.06]
              bg-[#0C0D0F]
              p-8
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  rounded-2xl
                  bg-white/[0.03]
                  p-3
                "
              >
                <Brain size={24} />
              </div>

              <div>
                <h2
                  className="
                    text-2xl
                    font-semibold
                  "
                >
                  AI Coach Feedback
                </h2>

                <p
                  className="
                    mt-1
                    text-[#8A8F98]
                  "
                >
                  Personalized insights based on your attempt.
                </p>
              </div>
            </div>

            <div
              className="
                mt-8
                rounded-3xl
                border
                border-white/[0.06]
                bg-white/[0.03]
                p-6
              "
            >
              <p
                className="
                  leading-8
                  text-[#D1D5DB]
                "
              >
                {result.feedback}
              </p>
            </div>
          </section>
          {/* Bottom Actions */}
          <section
            className="
              rounded-[32px]
              border
              border-white/[0.06]
              bg-[#0C0D0F]
              p-8
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <div>
                <h2
                  className="
                    text-2xl
                    font-semibold
                  "
                >
                  What's Next?
                </h2>

                <p
                  className="
                    mt-3
                    max-w-2xl
                    leading-7
                    text-[#8A8F98]
                  "
                >
                  Continue improving your understanding through practice and
                  adaptive learning.
                </p>
              </div>

              <div
                className="
                  flex
                  flex-wrap
                  gap-3
                "
              >
                <button
                  onClick={() => navigate(`/subjects/${result.slug}`)}
                  className="
                    cursor-pointer
                    rounded-full
                    border
                    border-white/[0.06]
                    px-6
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    hover:bg-white/[0.03]
                  "
                >
                  Explore More
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="
                    cursor-pointer
                    rounded-full
                    border
                    border-white/[0.06]
                    px-6
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    hover:bg-white/[0.03]
                  "
                >
                  Back
                </button>

                {adaptiveLearning.eligible && (
                  <button
                    className="
                      inline-flex
                      cursor-pointer
                      items-center
                      gap-2
                      rounded-full
                      bg-white
                      px-8
                      py-3
                      text-sm
                      font-semibold
                      text-black
                      transition-all
                      duration-200
                      hover:bg-white/90
                    "
                  >
                    <Sparkles size={16} />
                    Generate Adaptive Quiz
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default QuizResultPage;
