import { useEffect, useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowRight,
  Brain,
  Loader2,
  Medal,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

import { getQuizResult } from "../../Services/quizService";

const QuizResultPage = () => {
  const { quizId } = useParams();

  const navigate = useNavigate();

  /*
  ==================================================
  STATE
  ==================================================
  */

  /*
==================================================
STATE
==================================================
*/

const [resultData, setResultData] =
  useState(null);

const [loading, setLoading] =
  useState(true);

const [error, setError] =
  useState("");

const [reviewFilter, setReviewFilter] =
  useState("all");

/*
==================================================
FETCH RESULT
==================================================
*/

useEffect(() => {
  fetchResult();
}, [quizId]);

const fetchResult = async () => {
  try {
    setLoading(true);

    setError("");

    const response =
      await getQuizResult(quizId);

    if (!response.success) {
      setError(
        response.errors?.[0] ||
          "Failed to load result."
      );

      return;
    }

    setResultData(response.data);
  } catch {
    setError(
      "Something went wrong while loading your result."
    );
  } finally {
    setLoading(false);
  }
};

/*
==================================================
SAFE DATA
==================================================
*/

const quizType =
  resultData?.quizType ||
  "normal";

const result =
  resultData?.result || {
    topic: "",
    slug: "",
    answers: [],
    correctAnswers: [],
    wrongAnswers: [],
    weakAreas: [],
    feedback: "",
    score: {
      gain: 0,
      total: 0,
      accuracy: 0,
    },
    createdAt: "",
  };

const currentAccuracy =
  resultData?.currentAccuracy ??
  result.score?.accuracy ??
  0;

const prevAccuracy =
  resultData?.prevAccuracy ??
  0;

const change =
  resultData?.change ??
  0;

const adaptiveLearning =
  resultData?.adaptiveLearning || {
    eligible: false,
    attemptsNeed: 0,
  };

/*
==================================================
ADAPTIVE DETECTION
==================================================
*/

const isAdaptive =
  quizType === "adaptive";

/*
==================================================
DERIVED VALUES
==================================================
*/

const accuracy =
  currentAccuracy;

const correctCount =
  result.correctAnswers?.length ||
  0;

const wrongCount =
  result.wrongAnswers?.length ||
  0;

/*
==================================================
PERFORMANCE
==================================================
*/

const performance =
  (() => {
    if (accuracy >= 80) {
      return {
        title: isAdaptive
          ? "Adaptive Mastery Emerging"
          : "Outstanding Performance",

        subtitle: isAdaptive
          ? `
            Eventra identified
            strong understanding
            with only a few concepts
            requiring reinforcement.
          `
          : `
            You're mastering
            this topic.
          `,
      };
    }

    if (accuracy >= 50) {
      return {
        title: isAdaptive
          ? "Learning Momentum"
          : "Good Progress",

        subtitle: isAdaptive
          ? `
            Your learning pattern
            is improving, though
            several areas still
            deserve attention.
          `
          : `
            A few concepts still
            need reinforcement.
          `,
      };
    }

    return {
      title: isAdaptive
        ? "Growth Opportunity"
        : "Keep Going",

      subtitle: isAdaptive
        ? `
          This adaptive session
          uncovered exactly where
          Eventra can help you
          improve next.
        `
        : `
          This attempt revealed
          exactly what to improve.
        `,
    };
  })();

/*
==================================================
IMPROVEMENT
==================================================
*/

const improvement =
  (() => {
    if (change > 0) {
      return {
        icon: TrendingUp,

        title: isAdaptive
          ? `Learning Shift +${change}%`
          : `Improved by ${change}%`,

        subtitle: isAdaptive
          ? `
            Your understanding
            is moving in the
            right direction.
          `
          : `
            Compared to your
            previous attempts.
          `,

        bg:
          "bg-emerald-500/10",

        color:
          "text-emerald-300",
      };
    }

    if (change < 0) {
      return {
        icon: TrendingDown,

        title: isAdaptive
          ? "Learning Plateau"
          : "Performance Dropped",

        subtitle: isAdaptive
          ? `
            Focus on reinforcement
            before progressing
            further.
          `
          : `
            Focus on your weak
            areas below.
          `,

        bg:
          "bg-amber-500/10",

        color:
          "text-amber-300",
      };
    }

    return {
      icon: Target,

      title: isAdaptive
        ? "Stable Learning Pattern"
        : "Consistent Performance",

      subtitle: isAdaptive
        ? `
          Eventra detected
          a consistent
          understanding level.
        `
        : `
          You're maintaining
          the same level.
        `,

      bg:
        "bg-blue-500/10",

      color:
        "text-blue-300",
    };
  })();

const ImprovementIcon =
  improvement.icon;

/*
==================================================
STRENGTH AREAS
==================================================
*/

const strengthAreas =
  useMemo(() => {
    if (!isAdaptive) {
      return [];
    }

    return [
      ...new Set(
        result.correctAnswers.flatMap(
          (item) =>
            item.tags || []
        )
      ),
    ];
  }, [
    isAdaptive,
    result.correctAnswers,
  ]);
  /*
==================================================
SCORE RING
==================================================
*/

const circumference =
  2 * Math.PI * 70;

const progress =
  circumference -
  (accuracy / 100) *
    circumference;

const scoreColor =
  accuracy >= 80
    ? "#10B981"
    : accuracy >= 50
    ? isAdaptive
      ? "#6366F1"
      : "#F59E0B"
    : isAdaptive
    ? "#F59E0B"
    : "#EF4444";

/*
==================================================
HERO CONFIG
==================================================
*/

const heroBadge =
  isAdaptive
    ? "Adaptive Intelligence Report"
    : "Quiz Completed";

const heroDescription =
  isAdaptive
    ? `
      Eventra analyzed how you think,
      identified your strengths,
      and uncovered concepts that
      still need reinforcement.
    `
    : performance.subtitle;

/*
==================================================
HERO GLOW
==================================================
*/

const heroGlow =
  isAdaptive
    ? `
      before:absolute
      before:left-1/2
      before:top-0
      before:h-[650px]
      before:w-[650px]
      before:-translate-x-1/2
      before:rounded-full
      before:bg-indigo-500/[0.04]
      before:blur-3xl

      after:absolute
      after:right-20
      after:top-24
      after:h-[280px]
      after:w-[280px]
      after:rounded-full
      after:bg-cyan-500/[0.03]
      after:blur-3xl
    `
    : `
      before:absolute
      before:left-1/2
      before:top-0
      before:h-[600px]
      before:w-[600px]
      before:-translate-x-1/2
      before:rounded-full
      before:bg-white/[0.02]
      before:blur-3xl
    `;

/*
==================================================
LOADING
==================================================
*/

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
        px-6
      "
    >
      <div className="text-center">
        <Loader2
          size={42}
          className="
            mx-auto
            animate-spin
            text-indigo-400
          "
        />

        <h2
          className="
            mt-8
            text-2xl
            font-semibold
          "
        >
          Preparing Your Report
        </h2>

        <p
          className="
            mt-3
            text-[#8A8F98]
          "
        >
          Eventra is analyzing
          your performance...
        </p>
      </div>
    </div>
  );
}

/*
==================================================
ERROR
==================================================
*/

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
        px-6
      "
    >
      <div
        className="
          max-w-lg
          text-center
        "
      >
        <div className="text-5xl">
          ⚠️
        </div>

        <h2
          className="
            mt-8
            text-3xl
            font-semibold
          "
        >
          Unable to Load Result
        </h2>

        <p
          className="
            mt-5
            leading-8
            text-[#8A8F98]
          "
        >
          {error}
        </p>

        <button
          onClick={fetchResult}
          className="
            mt-10
            cursor-pointer
            rounded-full
            bg-white
            px-7
            py-3.5
            text-sm
            font-medium
            text-black
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-white/90
          "
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

  /*
  ==================================================
  RETURN
  ==================================================
  */

  return (
    <div
      className={`
        relative
        min-h-screen
        overflow-hidden
        bg-[#08090A]
        text-white
        ${heroGlow}
      `}
    >
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
          {/* HERO */}
          <section
  className="
    relative
    overflow-visible
    rounded-[36px]
    p-[1px]
  "
>
  {/* Adaptive Border Effect */}
  {isAdaptive ? (
    <>
      <div
        className="
          absolute
          inset-0
          rounded-[36px]
          bg-gradient-to-r
          from-indigo-500/20
          via-cyan-500/15
          to-indigo-500/20
          opacity-90
        "
      />

      {/* Corner Glow */}
      <div
        className="
          absolute
          -left-10
          -top-10
          h-40
          w-40
          rounded-full
          bg-indigo-500/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -right-10
          -bottom-10
          h-40
          w-40
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />
    </>
  ) : null}

  <div
    className={`
      relative
      overflow-hidden
      rounded-[36px]
      p-8
      lg:p-10

      ${
        isAdaptive
          ? `
            bg-gradient-to-br
            from-[#0D0F14]
            via-[#0C0D0F]
            to-[#0B1117]
          `
          : `
            border
            border-white/[0.06]
            bg-[#0C0D0F]
          `
      }
    `}
  >


    <div
      className="
        flex
        flex-col
        gap-10
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* LEFT */}
      <div>
        <div
          className={`
            inline-flex
            items-center
            gap-2
            rounded-full
            px-4
            py-2
            text-sm
            font-medium

            ${
              isAdaptive
                ? `
                  border
                  border-indigo-500/20
                  bg-indigo-500/10
                  text-indigo-300
                `
                : `
                  border
                  border-white/[0.06]
                  bg-white/[0.03]
                  text-[#D6D8DC]
                `
            }
          `}
        >
          {isAdaptive ? (
            <Sparkles size={16} />
          ) : (
            <Medal size={16} />
          )}

          {heroBadge}
        </div>

        <h1
          className="
            mt-6
            text-4xl
            font-semibold
            tracking-[-0.03em]
            md:text-5xl
          "
        >
          {performance.title}
        </h1>

        <p
          className="
            mt-5
            max-w-2xl
            leading-8
            text-[#8A8F98]
          "
        >
          {heroDescription}
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
            Score {result.score.gain}/
            {result.score.total}
          </span>

          <span>•</span>

          <span>
            {new Date(
              result.createdAt
            ).toLocaleDateString()}
          </span>

          {isAdaptive && (
            <>
              <span>•</span>

              <span className="text-indigo-300">
                Adaptive
              </span>
            </>
          )}
        </div>

        {/* Adaptive Highlight */}
        {isAdaptive && (
          <div
            className="
              mt-10
              inline-flex
              items-center
              gap-3
              rounded-2xl
              border
              border-indigo-500/15
              bg-indigo-500/[0.04]
              px-5
              py-4
            "
          >
            <Zap
              size={18}
              className="
                text-indigo-300
              "
            />

            <p
              className="
                text-sm
                leading-7
                text-[#D6D8DC]
              "
            >
              Eventra doesn't just
              score your answers.
              It understands how
              you learn.
            </p>
          </div>
        )}
      </div>

      {/* SCORE RING */}
      <div
        className="
          relative
          flex
          h-52
          w-52
          shrink-0
          items-center
          justify-center
        "
      >
        {/* Halo */}
        <div
          className="
            absolute
            inset-10
            rounded-full
            blur-xl
            opacity-10
          "
          style={{
            backgroundColor:
              scoreColor,
          }}
        />

        <svg
          className="
            absolute
            h-full
            w-full
            -rotate-90
          "
          viewBox="0 0 160 160"
        >
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="6"
          />

          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke={scoreColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={
              circumference
            }
            strokeDashoffset={
              progress
            }
            style={{
              transition:
                "stroke-dashoffset 1.8s ease-out",
            }}
          />
        </svg>

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
          <p
            className="
              text-[32px]
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
              uppercase
              tracking-[0.22em]
              text-[#8A8F98]
            "
          >
            {isAdaptive
              ? "Learning Score"
              : "Accuracy"}
          </p>

          {isAdaptive && (
            <p
              className="
                mt-2
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-indigo-300
              "
            >
              Adaptive Insight
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
</section>        {/* Metrics */}
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
                label: isAdaptive
                  ? "Learning Score"
                  : "Accuracy",
                value: `${accuracy}%`,
              },
              {
                icon: Medal,
                label: "Score",
                value: `${result.score.gain}/${result.score.total}`,
              },
              {
                icon: Brain,
                label: isAdaptive
                  ? "Mastered"
                  : "Correct",
                value: correctCount,
              },
              {
                icon: Sparkles,
                label: isAdaptive
                  ? "Focus Areas"
                  : "Wrong",
                value: isAdaptive
                  ? result.weakAreas.length
                  : wrongCount,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className={`
                    rounded-3xl
                    border
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1

                    ${
                      isAdaptive
                        ? `
                          border-indigo-500/10
                          bg-[#0D1016]
                          hover:border-indigo-500/20
                        `
                        : `
                          border-white/[0.06]
                          bg-[#0C0D0F]
                          hover:border-white/[0.1]
                        `
                    }
                  `}
                >
                  <Icon
                    size={24}
                    className={
                      isAdaptive
                        ? "text-indigo-300"
                        : ""
                    }
                  />

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

          {/* Learning Shift */}
          <section
            className={`
              rounded-[32px]
              border
              p-8

              ${
                isAdaptive
                  ? `
                    border-indigo-500/15
                    bg-[#0D1016]
                  `
                  : `
                    border-white/[0.06]
                    ${improvement.bg}
                  `
              }
            `}
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
              <div className="flex gap-4">
                <div
                  className={`
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl

                    ${
                      isAdaptive
                        ? `
                          bg-indigo-500/10
                          text-indigo-300
                        `
                        : improvement.bg
                    }
                  `}
                >
                  <ImprovementIcon
                    size={24}
                    className={
                      isAdaptive
                        ? "text-indigo-300"
                        : improvement.color
                    }
                  />
                </div>

                <div>
                  <h2
                    className={`
                      text-2xl
                      font-semibold

                      ${
                        isAdaptive
                          ? "text-indigo-300"
                          : improvement.color
                      }
                    `}
                  >
                    {improvement.title}
                  </h2>

                  <p
                    className="
                      mt-3
                      max-w-2xl
                      leading-7
                      text-[#8A8F98]
                    "
                  >
                    {improvement.subtitle}
                  </p>
                </div>
              </div>

              {/* Adaptive Progress */}
              {isAdaptive ? (
                <div
                  className="
                    flex
                    items-center
                    gap-6
                  "
                >
                  <div className="text-center">
                    <p
                      className="
                        text-sm
                        uppercase
                        tracking-[0.2em]
                        text-[#8A8F98]
                      "
                    >
                      Previous
                    </p>

                    <p
                      className="
                        mt-2
                        text-3xl
                        font-bold
                      "
                    >
                      {prevAccuracy}%
                    </p>
                  </div>

                  <ArrowRight
                    className="
                      text-indigo-300
                    "
                  />

                  <div className="text-center">
                    <p
                      className="
                        text-sm
                        uppercase
                        tracking-[0.2em]
                        text-[#8A8F98]
                      "
                    >
                      Current
                    </p>

                    <p
                      className="
                        mt-2
                        text-3xl
                        font-bold
                        text-indigo-300
                      "
                    >
                      {currentAccuracy}%
                    </p>
                  </div>
                </div>
              ) : (
                <p
                  className="
                    text-sm
                    text-[#8A8F98]
                  "
                >
                  Previous: {prevAccuracy}%
                  {" • "}
                  Current: {currentAccuracy}%
                </p>
              )}
            </div>
          </section>

          {/* Adaptive Insight */}
          {isAdaptive && (
            <section
              className="
                rounded-[32px]
                border
                border-indigo-500/15
                bg-[#0D1016]
                p-8
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <div
                  className="
                    rounded-2xl
                    bg-indigo-500/10
                    p-3
                  "
                >
                  <Sparkles
                    className="
                      text-indigo-300
                    "
                    size={24}
                  />
                </div>

                <div>
                  <p
                    className="
                      text-sm
                      uppercase
                      tracking-[0.25em]
                      text-indigo-300
                    "
                  >
                    What Eventra Learned
                  </p>

                  <h2
                    className="
                      mt-4
                      text-3xl
                      font-semibold
                    "
                  >
                    Your Adaptive Insight
                  </h2>

                  <p
                    className="
                      mt-6
                      max-w-3xl
                      leading-8
                      text-[#D1D5DB]
                    "
                  >
                    {result.feedback}
                  </p>

                  {result.weakAreas
                    ?.length > 0 && (
                    <div
                      className="
                        mt-8
                        rounded-2xl
                        border-l-2
                        border-indigo-500/30
                        pl-6
                      "
                    >
                      <p
                        className="
                          leading-8
                          text-[#8A8F98]
                        "
                      >
                        Eventra recommends
                        spending additional
                        practice time on{" "}
                        <span
                          className="
                            text-indigo-300
                          "
                        >
                          {result.weakAreas.join(
                            ", "
                          )}
                        </span>
                        {" "}before progressing
                        to more advanced
                        concepts.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}          {/* Adaptive Snapshot */}
          {isAdaptive && (
            <section
              className="
                overflow-hidden
                rounded-[32px]
                border
                border-indigo-500/15
                bg-[#0D1016]
              "
            >
              <div
                className="
                  grid
                  divide-y
                  divide-white/[0.06]
                  md:grid-cols-4
                  md:divide-x
                  md:divide-y-0
                "
              >
                {[
                  {
                    label: "Weak Areas",
                    value:
                      result.weakAreas
                        ?.length || 0,
                    color:
                      "text-amber-300",
                  },
                  {
                    label: "Growth",
                    value:
                      change > 0
                        ? `+${change}%`
                        : `${change}%`,
                    color:
                      change >= 0
                        ? "text-emerald-300"
                        : "text-amber-300",
                  },
                  {
                    label: "Readiness",
                    value:
                      adaptiveLearning
                        ?.eligible
                        ? "Ready"
                        : "Building",
                    color:
                      adaptiveLearning
                        ?.eligible
                        ? "text-indigo-300"
                        : "text-[#D6D8DC]",
                  },
                  {
                    label: "Strengths",
                    value:
                      strengthAreas.length,
                    color:
                      "text-emerald-300",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="
                      px-8
                      py-8
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
                      {item.label}
                    </p>

                    <p
                      className={`
                        mt-4
                        text-3xl
                        font-bold
                        ${item.color}
                      `}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Review */}
          <section
            className={`
              rounded-[32px]
              border
              p-8

              ${
                isAdaptive
                  ? `
                    border-indigo-500/15
                    bg-[#0D1016]
                  `
                  : `
                    border-white/[0.06]
                    bg-[#0C0D0F]
                  `
              }
            `}
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
                  {isAdaptive
                    ? "Learning Review"
                    : "Review Your Responses"}
                </h2>

                <p
                  className="
                    mt-2
                    text-[#8A8F98]
                  "
                >
                  {isAdaptive
                    ? `
                      Understand how
                      your learning
                      patterns emerged
                      throughout this
                      session.
                    `
                    : `
                      Understand what
                      you got right and
                      where you need
                      improvement.
                    `}
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
                  onClick={() =>
                    setReviewFilter(
                      "all"
                    )
                  }
                  className={`
                    cursor-pointer
                    rounded-xl
                    px-4
                    py-2
                    text-sm
                    transition-all
                    duration-300

                    ${
                      reviewFilter ===
                      "all"
                        ? `
                          bg-white
                          text-black
                        `
                        : `
                          text-[#8A8F98]
                        `
                    }
                  `}
                >
                  All Responses
                </button>

                <button
                  onClick={() =>
                    setReviewFilter(
                      "wrong"
                    )
                  }
                  className={`
                    cursor-pointer
                    rounded-xl
                    px-4
                    py-2
                    text-sm
                    transition-all
                    duration-300

                    ${
                      reviewFilter ===
                      "wrong"
                        ? `
                          bg-white
                          text-black
                        `
                        : `
                          text-[#8A8F98]
                        `
                    }
                  `}
                >
                  {isAdaptive
                    ? "Focus Review"
                    : "Incorrect Only"}
                </button>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {(reviewFilter ===
              "all"
                ? result.answers
                : result.wrongAnswers
              ).map(
                (item, index) => {
                  const userAnswer =
                    reviewFilter ===
                    "all"
                      ? item.answer
                      : item.wrongAnswer;

                  const correctMatch =
                    result.correctAnswers.find(
                      (
                        correct
                      ) =>
                        correct.question ===
                        item.question
                    );

                  const correctAnswer =
                    correctMatch?.correctAnswer;

                  const isCorrect =
                    userAnswer ===
                    correctAnswer;

                  return (
                    <div
                      key={
                        item.question
                      }
                      className={`
                        rounded-3xl
                        border
                        p-6
                        transition-all
                        duration-300

                        ${
                          isCorrect
                            ? `
                              border-emerald-500/20
                              bg-emerald-500/[0.03]
                            `
                            : isAdaptive
                            ? `
                              border-amber-500/20
                              bg-amber-500/[0.03]
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

                            ${
                              isCorrect
                                ? `
                                  text-emerald-300
                                `
                                : isAdaptive
                                ? `
                                  text-amber-300
                                `
                                : `
                                  text-red-300
                                `
                            }
                          `}
                        >
                          {isCorrect
                            ? "✓"
                            : "✕"}
                        </span>

                        <p
                          className="
                            font-medium
                          "
                        >
                          Question{" "}
                          {index + 1}
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
                        {
                          item.question
                        }
                      </h3>

                      <div
                        className="
                          mt-6
                          space-y-4
                        "
                      >
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

                              ${
                                isCorrect
                                  ? `
                                    text-emerald-300
                                  `
                                  : isAdaptive
                                  ? `
                                    text-amber-300
                                  `
                                  : `
                                    text-red-300
                                  `
                              }
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
                            Correct
                            Answer
                          </p>

                          <p
                            className="
                              mt-2
                              font-medium
                              text-emerald-300
                            "
                          >
                            {
                              correctAnswer
                            }
                          </p>
                        </div>

                        {/* Adaptive Tags */}
                        {isAdaptive &&
                          !isCorrect &&
                          item.tags
                            ?.length >
                            0 && (
                            <div
                              className="
                                flex
                                flex-wrap
                                gap-2
                                pt-2
                              "
                            >
                              {item.tags.map(
                                (
                                  tag
                                ) => (
                                  <span
                                    key={
                                      tag
                                    }
                                    className="
                                      rounded-full
                                      border
                                      border-amber-500/15
                                      bg-amber-500/10
                                      px-3
                                      py-1
                                      text-xs
                                      font-medium
                                      text-amber-300
                                    "
                                  >
                                    {
                                      tag
                                    }
                                  </span>
                                )
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </section>          {/* Strength & Focus Grid */}
          <div
            className="
              grid
              gap-8
              xl:grid-cols-2
            "
          >
            {/* Strength Areas */}
            {isAdaptive && (
              <section
                className="
                  rounded-[32px]
                  border
                  border-emerald-500/15
                  bg-[#0D1210]
                  p-8
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-emerald-500/10
                    "
                  >
                    <Medal
                      size={24}
                      className="
                        text-emerald-300
                      "
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-sm
                        uppercase
                        tracking-[0.22em]
                        text-emerald-300
                      "
                    >
                      Strength Areas
                    </p>

                    <h2
                      className="
                        mt-2
                        text-2xl
                        font-semibold
                      "
                    >
                      Concepts You're
                      Mastering
                    </h2>
                  </div>
                </div>

                <p
                  className="
                    mt-6
                    leading-7
                    text-[#8A8F98]
                  "
                >
                  These concepts appeared
                  consistently among your
                  correct responses and
                  represent your strongest
                  understanding areas.
                </p>

                {strengthAreas.length >
                0 ? (
                  <div
                    className="
                      mt-8
                      flex
                      flex-wrap
                      gap-3
                    "
                  >
                    {strengthAreas.map(
                      (area) => (
                        <div
                          key={area}
                          className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-emerald-500/15
                            bg-emerald-500/10
                            px-4
                            py-2.5
                          "
                        >
                          <span
                            className="
                              text-emerald-300
                            "
                          >
                            ✓
                          </span>

                          <span
                            className="
                              text-sm
                              font-medium
                              text-[#D6D8DC]
                            "
                          >
                            {area}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div
                    className="
                      mt-8
                      rounded-2xl
                      border
                      border-white/[0.06]
                      bg-white/[0.02]
                      px-5
                      py-5
                    "
                  >
                    <p
                      className="
                        text-[#8A8F98]
                      "
                    >
                      Complete more adaptive
                      sessions to identify
                      strong knowledge areas.
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* Weak Areas */}
            <section
              className={`
                rounded-[32px]
                border
                p-8

                ${
                  isAdaptive
                    ? `
                      border-amber-500/15
                      bg-[#14110D]
                    `
                    : `
                      border-red-500/15
                      bg-[#130D0D]
                    `
                }
              `}
            >
              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >
                <div
                  className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl

                    ${
                      isAdaptive
                        ? `
                          bg-amber-500/10
                        `
                        : `
                          bg-red-500/10
                        `
                    }
                  `}
                >
                  <Target
                    size={24}
                    className={
                      isAdaptive
                        ? "text-amber-300"
                        : "text-red-300"
                    }
                  />
                </div>

                <div>
                  <p
                    className={`
                      text-sm
                      uppercase
                      tracking-[0.22em]

                      ${
                        isAdaptive
                          ? `
                            text-amber-300
                          `
                          : `
                            text-red-300
                          `
                      }
                    `}
                  >
                    {isAdaptive
                      ? "Needs More Attention"
                      : "Focus Areas"}
                  </p>

                  <h2
                    className="
                      mt-2
                      text-2xl
                      font-semibold
                    "
                  >
                    {isAdaptive
                      ? "Growth Opportunities"
                      : "Areas To Improve"}
                  </h2>
                </div>
              </div>

              <p
                className="
                  mt-6
                  leading-7
                  text-[#8A8F98]
                "
              >
                {isAdaptive
                  ? `
                    These topics appeared
                    repeatedly in incorrect
                    responses and deserve
                    additional practice.
                  `
                  : `
                    Revisiting these concepts
                    can improve future
                    performance.
                  `}
              </p>

              {result.weakAreas
                ?.length > 0 ? (
                <div
                  className="
                    mt-8
                    flex
                    flex-wrap
                    gap-3
                  "
                >
                  {result.weakAreas.map(
                    (area) => (
                      <div
                        key={area}
                        className={`
                          rounded-full
                          border
                          px-4
                          py-2.5

                          ${
                            isAdaptive
                              ? `
                                border-amber-500/15
                                bg-amber-500/10
                              `
                              : `
                                border-red-500/15
                                bg-red-500/10
                              `
                          }
                        `}
                      >
                        <span
                          className={`
                            text-sm
                            font-medium

                            ${
                              isAdaptive
                                ? `
                                  text-amber-300
                                `
                                : `
                                  text-red-300
                                `
                            }
                          `}
                        >
                          {area}
                        </span>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div
                  className="
                    mt-8
                    rounded-2xl
                    border
                    border-emerald-500/15
                    bg-emerald-500/10
                    px-5
                    py-5
                  "
                >
                  <p
                    className="
                      text-emerald-300
                    "
                  >
                    Excellent work. No weak
                    areas were identified in
                    this session.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Coach Feedback */}
          <section
            className={`
              rounded-[32px]
              border
              p-8

              ${
                isAdaptive
                  ? `
                    border-indigo-500/15
                    bg-[#0D1016]
                  `
                  : `
                    border-white/[0.06]
                    bg-[#0C0D0F]
                  `
              }
            `}
          >
            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl

                  ${
                    isAdaptive
                      ? `
                        bg-indigo-500/10
                      `
                      : `
                        bg-white/[0.05]
                      `
                  }
                `}
              >
                {isAdaptive ? (
                  <Sparkles
                    size={24}
                    className="
                      text-indigo-300
                    "
                  />
                ) : (
                  <Brain
                    size={24}
                    className="
                      text-white
                    "
                  />
                )}
              </div>

              <div>
                <p
                  className={`
                    text-sm
                    uppercase
                    tracking-[0.22em]

                    ${
                      isAdaptive
                        ? `
                          text-indigo-300
                        `
                        : `
                          text-[#8A8F98]
                        `
                    }
                  `}
                >
                  {isAdaptive
                    ? "Adaptive Coach Insights"
                    : "Coach Feedback"}
                </p>

                <h2
                  className="
                    mt-2
                    text-2xl
                    font-semibold
                  "
                >
                  {isAdaptive
                    ? "Your Learning Narrative"
                    : "Performance Reflection"}
                </h2>
              </div>
            </div>

            <div
              className="
                mt-8
                rounded-3xl
                border-l-2
                pl-6

                ${
                  isAdaptive
                    ? `
                      border-indigo-500/30
                    `
                    : `
                      border-white/[0.1]
                    `
                }
              "
            >
              <p
                className="
                  leading-9
                  text-[#D6D8DC]
                "
              >
                {result.feedback}
              </p>
            </div>

            {isAdaptive && (
              <div
                className="
                  mt-8
                  rounded-2xl
                  border
                  border-indigo-500/15
                  bg-indigo-500/[0.04]
                  px-5
                  py-5
                "
              >
                <p
                  className="
                    leading-8
                    text-[#D6D8DC]
                  "
                >
                  Adaptive learning isn't
                  about perfection. It's
                  about discovering the
                  right next step and
                  continuously improving
                  through targeted practice.
                </p>
              </div>
            )}
          </section>          {/* Adaptive Readiness */}
          {isAdaptive && (
            <section
              className="
                rounded-[32px]
                border
                border-indigo-500/15
                bg-gradient-to-br
                from-[#0D1016]
                via-[#0C0D0F]
                to-[#0B1117]
                p-8
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
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-indigo-500/20
                      bg-indigo-500/10
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-indigo-300
                    "
                  >
                    <Sparkles size={16} />

                    Adaptive Readiness
                  </div>

                  <h2
                    className="
                      mt-6
                      text-3xl
                      font-semibold
                    "
                  >
                    {adaptiveLearning?.eligible
                      ? "You're Ready To Advance"
                      : "Building Your Foundation"}
                  </h2>

                  <p
                    className="
                      mt-5
                      max-w-2xl
                      leading-8
                      text-[#8A8F98]
                    "
                  >
                    {adaptiveLearning?.eligible
                      ? `
                        Eventra believes you're ready
                        to continue challenging yourself
                        with more adaptive practice.
                      `
                      : `
                        A few more focused sessions
                        will strengthen your foundation
                        before progressing further.
                      `}
                  </p>
                </div>

                <div
                  className="
                    rounded-3xl
                    border
                    border-indigo-500/15
                    bg-indigo-500/[0.04]
                    px-8
                    py-7
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
                    Status
                  </p>

                  <p
                    className="
                      mt-3
                      text-3xl
                      font-bold
                      text-indigo-300
                    "
                  >
                    {adaptiveLearning?.eligible
                      ? "Ready"
                      : `${adaptiveLearning?.attemptsNeed || 0} Left`}
                  </p>

                  <p
                    className="
                      mt-3
                      text-sm
                      text-[#8A8F98]
                    "
                  >
                    {adaptiveLearning?.eligible
                      ? "Adaptive progression unlocked"
                      : "Sessions required to unlock"}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Bottom CTA */}
          <section
            className={`
              rounded-[36px]
              border
              p-8
              text-center

              ${
                isAdaptive
                  ? `
                    border-indigo-500/15
                    bg-gradient-to-br
                    from-[#0D1016]
                    via-[#0C0D0F]
                    to-[#0B1117]
                  `
                  : `
                    border-white/[0.06]
                    bg-[#0C0D0F]
                  `
              }
            `}
          >
            <h2
              className="
                text-3xl
                font-semibold
              "
            >
              {isAdaptive
                ? "Your Learning Journey Continues"
                : "What's Next?"}
            </h2>

            <p
              className="
                mx-auto
                mt-5
                max-w-2xl
                leading-8
                text-[#8A8F98]
              "
            >
              {isAdaptive
                ? `
                  Every adaptive session helps
                  Eventra understand how you learn
                  and guide you toward mastery.
                `
                : `
                  Keep practicing and continue
                  building your confidence.
                `}
            </p>

            <div
              className="
                mt-10
                flex
                flex-col
                justify-center
                gap-4
                sm:flex-row
              "
            >
              {/* Explore Topic */}
              <button
                onClick={() =>
                  navigate(
                    `/subjects/${result.slug}`
                  )
                }
                className="
                  cursor-pointer
                  rounded-full
                  border
                  border-white/[0.08]
                  px-7
                  py-3.5
                  text-sm
                  font-medium
                  text-[#D6D8DC]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-white/[0.15]
                  hover:bg-white/[0.03]
                "
              >
                Explore Topic
              </button>

              {/* Continue Learning */}
              {isAdaptive ? (
                <button
                  onClick={() =>
                    navigate(
                      `/subjects/${result.slug}`
                    )
                  }
                  className="
                    cursor-pointer
                    rounded-full
                    border
                    border-indigo-500/20
                    bg-indigo-500/10
                    px-7
                    py-3.5
                    text-sm
                    font-medium
                    text-indigo-300
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-indigo-500/15
                  "
                >
                  Review Weak Areas
                </button>
              ) : (
                <button
                  onClick={() =>
                    navigate(
                      `/subjects/${result.slug}`
                    )
                  }
                  className="
                    cursor-pointer
                    rounded-full
                    border
                    border-emerald-500/20
                    bg-emerald-500/10
                    px-7
                    py-3.5
                    text-sm
                    font-medium
                    text-emerald-300
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-emerald-500/15
                  "
                >
                  Continue Learning
                </button>
              )}

              {/* Back */}
              <button
                onClick={() => navigate(-1)}
                className="
                  cursor-pointer
                  rounded-full
                  bg-white
                  px-8
                  py-3.5
                  text-sm
                  font-semibold
                  text-black
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/90
                "
              >
                Done
              </button>
            </div>

            {isAdaptive && (
              <p
                className="
                  mt-10
                  text-sm
                  leading-7
                  text-[#8A8F98]
                "
              >
                Eventra doesn't just measure
                outcomes. It evolves alongside
                your learning journey.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default QuizResultPage;