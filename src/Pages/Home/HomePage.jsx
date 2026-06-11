import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Target,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../Context/AuthContext";
import { getHome } from "../../Services/quizService";

const HomePage = () => {
  const navigate = useNavigate();

  const { user, loading: authLoading } = useAuth();

  const isLoggedIn = !!user;

  const [homeData, setHomeData] = useState({
    overview: {
      totalAttempts: 0,
      averageAccuracy: 0,
    },
    continueLearning: [],
    trendingSubjects: [],
    recommendations: [],
    insights: {
      summary: "",
      strengths: [],
      focusAreas: [],
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchHome = async () => {
      try {
        setLoading(true);

        const response = await getHome();

        const data = response?.data || {};

        setHomeData({
          overview: data.overview || {
            totalAttempts: 0,
            averageAccuracy: 0,
          },

          continueLearning:
            data.continueLearning || [],

          trendingSubjects:
            data.trendingSubjects || [],

          recommendations:
            data.recommendations || [],

          insights: data.insights || {
            summary: "",
            strengths: [],
            focusAreas: [],
          },
        });
      } catch (error) {
        console.error(
          "Failed to fetch homepage data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, [isLoggedIn]);

  const validRecommendations = useMemo(() => {
    return homeData.recommendations.filter(
      (item) => item.areas?.length > 0
    );
  }, [homeData.recommendations]);

  const showContinueLearning =
    homeData.continueLearning.length > 0;

  const showInsights =
    validRecommendations.length > 0;

  /*
    Trending rank calculation
  */

  const rankedSubjects = useMemo(() => {
    const subjects = isLoggedIn
      ? homeData.trendingSubjects
      : [
          {
            slug: "react",
            title: "React",
            popularity: 4,
            quizCount: 3,
          },
          {
            slug: "sql",
            title: "SQL",
            popularity: 3,
            quizCount: 1,
          },
          {
            slug: "javascript",
            title: "JavaScript",
            popularity: 3,
            quizCount: 2,
          },
          {
            slug: "data-structures-and-algorithms",
            title: "Data Structures and Algorithms",
            popularity: 1,
            quizCount: 1,
          },
        ];

    return [...subjects]
      .sort((a, b) => b.popularity - a.popularity)
      .map((subject, index) => ({
        ...subject,
        rank: index + 1,
      }));
  }, [isLoggedIn, homeData.trendingSubjects]);

  if (authLoading) {
    return (
      <div
        className="
          min-h-screen
          bg-[#08090A]
          flex
          items-center
          justify-center
        "
      >
        <div className="text-[#8A8F98]">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#08090A] text-white">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden border-b border-white/[0.06]">

        <div
          className="
            absolute
            left-1/2
            top-0
            h-[600px]
            w-[600px]
            -translate-x-1/2
            rounded-full
            bg-white/[0.02]
            blur-3xl
          "
        />

        <div
          className="
            mx-auto
            max-w-[1280px]
            px-8
            pb-24
            pt-28
          "
        >

          <div className="mb-8">

            <span
              className="
                rounded-full
                border border-white/10
                bg-white/[0.03]
                px-4
                py-2
                text-xs
                font-medium
                text-[#A1A1AA]
              "
            >
              AI-Powered Adaptive Learning
            </span>

          </div>

          <h1
            className="
              max-w-5xl
              text-5xl
              font-semibold
              leading-tight
              tracking-[-0.04em]
              md:text-7xl
            "
          >
            Stop Guessing What To Study.
            <br />
            Start Improving What Matters.
          </h1>

          <p
            className="
              mt-8
              max-w-2xl
              text-lg
              leading-8
              text-[#8A8F98]
            "
          >
            Generate quizzes, discover weak
            concepts, track progress, and
            receive personalized guidance
            powered by AI.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <button
              onClick={() =>
                navigate(
                  isLoggedIn
                    ? "/all-quizzes"
                    : "/user/signup"
                )
              }
              className="
                cursor-pointer
                rounded-full
                bg-white
                px-6
                py-3
                text-sm
                font-medium
                text-black
                transition-all
                duration-300
                hover:bg-white/90
                hover:-translate-y-1
              "
            >
              Start Learning
            </button>

            <button
              className="
                cursor-pointer
                rounded-full
                border border-white/10
                bg-white/[0.03]
                px-6
                py-3
                text-sm
                font-medium
                transition-all
                duration-300
                hover:bg-white/[0.06]
                hover:-translate-y-1
              "
            >
              View Demo
            </button>

          </div>

          {/* PRODUCT PREVIEW */}

          <div className="mt-24">

            <div
              className="
                overflow-hidden
                rounded-[32px]
                border border-white/[0.06]
                bg-[#0C0D0F]
                shadow-[0_0_120px_rgba(255,255,255,0.03)]
              "
            >

              {/* Apple Top Bar */}

              <div
                className="
                  border-b
                  border-white/[0.06]
                  px-6
                  py-4
                "
              >
                <div className="flex gap-2">

                  <div className="h-3 w-3 rounded-full bg-red-500/80" />

                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />

                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />

                </div>
              </div>

              <div className="p-8">

                <p
                  className="
                    mb-6
                    text-xs
                    uppercase
                    tracking-widest
                    text-[#8A8F98]
                  "
                >
                  HOW EVENTRA HELPS YOU LEARN
                </p>

                <div className="grid gap-4 md:grid-cols-4">

                  {[
                    {
                      icon: Sparkles,
                      title: "Generate",
                      description:
                        "Create quizzes from any topic instantly.",
                      iconBg:
                        "bg-sky-500/10 text-sky-400",
                    },

                    {
                      icon: CheckCircle2,
                      title: "Practice",
                      description:
                        "Attempt quizzes and test your understanding.",
                      iconBg:
                        "bg-emerald-500/10 text-emerald-400",
                    },

                    {
                      icon: Brain,
                      title: "Analyze",
                      description:
                        "AI identifies concepts that need attention.",
                      iconBg:
                        "bg-violet-500/10 text-violet-400",
                    },

                    {
                      icon: Target,
                      title: "Improve",
                      description:
                        "Focus on what matters most.",
                      iconBg:
                        "bg-orange-500/10 text-orange-400",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="
                          rounded-2xl
                          border
                          border-white/[0.06]
                          bg-white/[0.02]
                          p-6
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:border-white/[0.12]
                          hover:bg-white/[0.03]
                        "
                      >
                        <div
                          className={`
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-2xl
                            ${item.iconBg}
                          `}
                        >
                          <Icon size={22} />
                        </div>

                        <h3
                          className="
                            mt-6
                            text-xl
                            font-semibold
                          "
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                            mt-3
                            text-sm
                            leading-7
                            text-[#8A8F98]
                          "
                        >
                          {item.description}
                        </p>

                      </div>
                    );
                  })}                </div>

                {/* Workflow */}

                <div className="mt-14">

                  <div className="flex flex-wrap items-center justify-center gap-3">

                    {[
                      "Generate Quiz",
                      "Attempt",
                      "AI Feedback",
                      "Improve",
                    ].map((step, index) => (
                      <React.Fragment key={step}>

                        <div
                          className="
                            rounded-full
                            border border-white/[0.06]
                            bg-white/[0.02]
                            px-5
                            py-3
                            text-sm
                            font-medium
                            transition-all
                            duration-300
                            hover:border-white/[0.12]
                            hover:bg-white/[0.03]
                          "
                        >
                          {step}
                        </div>

                        {index !== 3 && (
                          <ArrowRight
                            size={16}
                            className="text-[#8A8F98]"
                          />
                        )}

                      </React.Fragment>
                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= WHY EVENTRA ================= */}

      <section className="py-24">

        <div
          className="
            mx-auto
            max-w-[1280px]
            px-8
          "
        >

          <div className="mb-14 text-center">

            <span
              className="
                text-sm
                font-medium
                text-[#8A8F98]
              "
            >
              Why Eventra?
            </span>

            <h2
              className="
                mt-4
                text-4xl
                font-semibold
                tracking-[-0.03em]
              "
            >
              More Than Just Another Quiz App
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
              Eventra doesn't stop at showing scores.
              It helps learners identify gaps,
              build momentum, and continuously improve.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: Brain,
                title: "Weak Area Detection",
                description:
                  "Discover concepts that deserve extra attention.",
                iconBg:
                  "bg-violet-500/10 text-violet-400",
              },

              {
                icon: TrendingUp,
                title: "Track Progress",
                description:
                  "Observe how your learning evolves over time.",
                iconBg:
                  "bg-emerald-500/10 text-emerald-400",
              },

              {
                icon: Sparkles,
                title: "AI Guidance",
                description:
                  "Receive intelligent recommendations from attempts.",
                iconBg:
                  "bg-sky-500/10 text-sky-400",
              },

              {
                icon: Target,
                title: "Focused Learning",
                description:
                  "Spend time where it creates the biggest impact.",
                iconBg:
                  "bg-orange-500/10 text-orange-400",
              },
            ].map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="
                    rounded-[32px]
                    border border-white/[0.06]
                    bg-[#0C0D0F]
                    p-8
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-white/[0.12]
                    hover:bg-white/[0.03]
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
                      ${feature.iconBg}
                    `}
                  >
                    <Icon size={24} />
                  </div>

                  <h3
                    className="
                      mt-6
                      text-xl
                      font-semibold
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      text-sm
                      leading-7
                      text-[#8A8F98]
                    "
                  >
                    {feature.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* ================= TRENDING SUBJECTS ================= */}

      <section className="pb-24">

        <div
          className="
            mx-auto
            max-w-[1280px]
            px-8
          "
        >

          <div
            className="
              mb-12
              flex
              flex-col
              gap-4
              md:flex-row
              md:items-end
              md:justify-between
            "
          >

            <div>

              <span
                className="
                  text-sm
                  font-medium
                  text-[#8A8F98]
                "
              >
                Explore
              </span>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-semibold
                  tracking-[-0.03em]
                "
              >
                Trending Subjects
              </h2>

              <p
                className="
                  mt-4
                  max-w-2xl
                  leading-8
                  text-[#8A8F98]
                "
              >
                Discover what learners are
                practicing the most right now.
              </p>

            </div>

            <Link
              to="/all-quizzes"
              className="
                cursor-pointer
                flex
                items-center
                gap-2
                rounded-full
                border border-white/10
                bg-white/[0.03]
                px-5
                py-3
                text-sm
                font-medium
                transition-all
                duration-300
                hover:bg-white/[0.06]
                hover:-translate-y-1
              "
            >
              Generate Quiz

              <ChevronRight size={16} />

            </Link>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {rankedSubjects.map((subject) => (
              <button
                key={subject.slug}
                onClick={() =>
                  navigate(
                    `/subjects/${subject.slug}`
                  )
                }
                className="
                  cursor-pointer
                  rounded-[32px]
                  border border-white/[0.06]
                  bg-[#0C0D0F]
                  p-7
                  text-left
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-white/[0.12]
                  hover:bg-white/[0.03]
                "
              >

                <div className="flex items-center justify-between">

                  <BookOpen
                    size={22}
                    className="text-[#8A8F98]"
                  />

                  {/* Correct Rank */}

                  <span
                    className="
                      rounded-full
                      bg-emerald-500/10
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-emerald-400
                    "
                  >
                    #{subject.rank}
                  </span>

                </div>

                <h3
                  className="
                    mt-8
                    text-2xl
                    font-semibold
                    leading-tight
                  "
                >
                  {subject.title}
                </h3>

                <p
                  className="
                    mt-4
                    text-sm
                    text-[#8A8F98]
                  "
                >
                  {subject.quizCount}
                  {" "}
                  {subject.quizCount === 1
                    ? "quiz"
                    : "quizzes"}
                  {" "}
                  available
                </p>

                <div
                  className="
                    mt-8
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                  "
                >
                  Explore

                  <ArrowRight size={16} />

                </div>

              </button>
            ))}

          </div>

        </div>

      </section>      {/* ================= CONTINUE LEARNING ================= */}

      {isLoggedIn && showContinueLearning && (
        <section className="pb-24">

          <div
            className="
              mx-auto
              max-w-[1280px]
              px-8
            "
          >

            <div
              className="
                mb-12
                flex
                flex-col
                gap-4
                md:flex-row
                md:items-end
                md:justify-between
              "
            >

              <div>

                <span
                  className="
                    text-sm
                    font-medium
                    text-[#8A8F98]
                  "
                >
                  Pick Up Where You Left Off
                </span>

                <h2
                  className="
                    mt-3
                    text-4xl
                    font-semibold
                    tracking-[-0.03em]
                  "
                >
                  Continue Learning
                </h2>

                <p
                  className="
                    mt-4
                    max-w-2xl
                    leading-8
                    text-[#8A8F98]
                  "
                >
                  Resume unfinished learning sessions
                  and keep building momentum.
                </p>

              </div>

              <Link
                to="/submittion/history"
                className="
                  cursor-pointer
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border border-white/10
                  bg-white/[0.03]
                  px-5
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                  hover:bg-white/[0.06]
                  hover:-translate-y-1
                "
              >
                View History

                <ChevronRight size={16} />

              </Link>

            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {homeData.continueLearning.map((attempt) => (
                <button
                  key={attempt._id}
                  onClick={() =>
                    navigate(`/results/${attempt._id}`)
                  }
                  className="
                    cursor-pointer
                    rounded-[32px]
                    border border-white/[0.06]
                    bg-[#0C0D0F]
                    p-8
                    text-left
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-white/[0.12]
                    hover:bg-white/[0.03]
                  "
                >

                  <div className="flex items-center justify-between">

                    <span
                      className="
                        rounded-full
                        bg-sky-500/10
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-sky-400
                      "
                    >
                      Resume
                    </span>

                    <ArrowRight size={18} />

                  </div>

                  <h3
                    className="
                      mt-8
                      text-2xl
                      font-semibold
                      leading-tight
                    "
                  >
                    {attempt.topic}
                  </h3>

                  <div className="mt-8 space-y-4">

                    <div className="flex justify-between text-sm">

                      <span className="text-[#8A8F98]">
                        Accuracy
                      </span>

                      <span className="font-medium">
                        {attempt.accuracy}%
                      </span>

                    </div>

                    <div className="flex justify-between text-sm">

                      <span className="text-[#8A8F98]">
                        Last Attempt
                      </span>

                      <span className="text-[#8A8F98]">
                        {new Date(
                          attempt.createdAt
                        ).toLocaleDateString()}
                      </span>

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

        </section>
      )}

      {/* ================= EVENTRA INTELLIGENCE ================= */}

      {isLoggedIn && showInsights && (
        <section className="pb-24">

          <div
            className="
              mx-auto
              max-w-[1280px]
              px-8
            "
          >

            <div
              className="
                overflow-hidden
                rounded-[32px]
                border border-white/[0.06]
                bg-[#0C0D0F]
              "
            >

              {/* Header */}

              <div className="p-10 lg:p-14">

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                  "
                >

                  <span
                    className="
                      rounded-full
                      border border-violet-500/20
                      bg-violet-500/10
                      px-4
                      py-2
                      text-xs
                      font-medium
                      text-violet-400
                    "
                  >
                    Eventra Intelligence
                  </span>

                  <span
                    className="
                      rounded-full
                      bg-white/[0.03]
                      px-4
                      py-2
                      text-xs
                      text-[#8A8F98]
                    "
                  >
                    {homeData.overview.totalAttempts}
                    {" "}
                    Attempts Analysed
                  </span>

                </div>

                <h2
                  className="
                    mt-8
                    text-4xl
                    font-semibold
                    tracking-[-0.03em]
                  "
                >
                  What Eventra Has Noticed
                </h2>

                <p
                  className="
                    mt-5
                    max-w-3xl
                    leading-8
                    text-[#8A8F98]
                  "
                >
                  {homeData.insights.summary}
                </p>

              </div>

              {/* Dynamic Grid */}

              <div
                className={`
                  grid
                  border-t
                  border-white/[0.06]

                  ${
                    validRecommendations.length === 1
                      ? "lg:grid-cols-1"
                      : validRecommendations.length === 2
                      ? "lg:grid-cols-2"
                      : validRecommendations.length === 3
                      ? "lg:grid-cols-3"
                      : "lg:grid-cols-4"
                  }
                `}
              >

                {validRecommendations.map(
                  (item, index) => (
                    <div
                      key={item.subject}
                      className={`
                        p-8
                        transition-all
                        duration-300
                        hover:bg-white/[0.02]

                        ${
                          index !==
                          validRecommendations.length - 1
                            ? "lg:border-r lg:border-white/[0.06]"
                            : ""
                        }
                      `}
                    >

                      {/* Subject */}

                      <div className="flex items-center gap-4">

                        <div
                          className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-violet-500/10
                            text-violet-400
                          "
                        >
                          <Brain size={24} />
                        </div>

                        <div>

                          <h3
                            className="
                              text-2xl
                              font-semibold
                              capitalize
                            "
                          >
                            {item.subject}
                          </h3>

                          <p
                            className="
                              mt-1
                              text-sm
                              text-[#8A8F98]
                            "
                          >
                            Suggested focus
                          </p>

                        </div>

                      </div>

                      {/* Areas */}

                      <div className="mt-8 space-y-4">

                        {item.areas.map((area) => (
                          <div
                            key={area}
                            className="
                              flex
                              items-start
                              gap-3
                            "
                          >

                            <div
                              className="
                                mt-2
                                h-2
                                w-2
                                shrink-0
                                rounded-full
                                bg-violet-400
                              "
                            />

                            <span
                              className="
                                text-sm
                                leading-7
                                text-[#D1D5DB]
                              "
                            >
                              {area}
                            </span>

                          </div>
                        ))}

                      </div>

                      {/* CTA */}

                      <button
                        onClick={() =>
                          navigate(
                            `/subjects/${item.subject.toLowerCase()}`
                          )
                        }
                        className="
                          cursor-pointer
                          mt-10
                          flex
                          items-center
                          gap-2
                          text-sm
                          font-medium
                          transition-all
                          duration-300
                          hover:translate-x-1
                        "
                      >
                        Explore Subject

                        <ArrowRight size={16} />

                      </button>

                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        </section>
      )}      {/* ================= LEARNING JOURNEY (GUEST ONLY) ================= */}

      {!isLoggedIn && (
        <section className="pb-24">

          <div
            className="
              mx-auto
              max-w-[1280px]
              px-8
            "
          >

            <div className="mb-14 text-center">

              <span
                className="
                  text-sm
                  font-medium
                  text-[#8A8F98]
                "
              >
                How Eventra Works
              </span>

              <h2
                className="
                  mt-4
                  text-4xl
                  font-semibold
                  tracking-[-0.03em]
                "
              >
                Learning That Evolves With You
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
                Eventra doesn't stop after showing a score.
                Every attempt helps guide your next step,
                helping you improve continuously.
              </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">

              {[
                {
                  title: "Generate",
                  description:
                    "Create quizzes from any topic instantly.",
                  icon: Sparkles,
                  iconBg:
                    "bg-sky-500/10 text-sky-400",
                },

                {
                  title: "Attempt",
                  description:
                    "Challenge your understanding.",
                  icon: CheckCircle2,
                  iconBg:
                    "bg-emerald-500/10 text-emerald-400",
                },

                {
                  title: "Analyze",
                  description:
                    "AI reviews your performance.",
                  icon: Brain,
                  iconBg:
                    "bg-violet-500/10 text-violet-400",
                },

                {
                  title: "Improve",
                  description:
                    "Focus where growth matters.",
                  icon: TrendingUp,
                  iconBg:
                    "bg-orange-500/10 text-orange-400",
                },

                {
                  title: "Repeat",
                  description:
                    "Build long-term confidence.",
                  icon: Target,
                  iconBg:
                    "bg-cyan-500/10 text-cyan-400",
                },
              ].map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.title}
                    className="
                      rounded-[32px]
                      border border-white/[0.06]
                      bg-[#0C0D0F]
                      p-8
                      text-center
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-white/[0.12]
                      hover:bg-white/[0.03]
                    "
                  >

                    <div
                      className={`
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        ${step.iconBg}
                      `}
                    >
                      <Icon size={24} />
                    </div>

                    <h3
                      className="
                        mt-6
                        text-xl
                        font-semibold
                      "
                    >
                      {step.title}
                    </h3>

                    <p
                      className="
                        mt-4
                        text-sm
                        leading-7
                        text-[#8A8F98]
                      "
                    >
                      {step.description}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>

        </section>
      )}

      {/* ================= FINAL CTA ================= */}

      <section className="pb-28 mt-8">

        <div
          className="
            mx-auto
            max-w-[1280px]
            px-8
          "
        >

          <div
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border border-white/[0.06]
              bg-[#0C0D0F]
              px-8
              py-16
              text-center
              md:px-16
            "
          >

            {/* Glow */}

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[320px]
                w-[320px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-white/[0.02]
                blur-3xl
              "
            />

            <div className="relative z-10">

              {isLoggedIn ? (
                <>
                  <span
                    className="
                      rounded-full
                      border border-white/10
                      bg-white/[0.03]
                      px-4
                      py-2
                      text-xs
                      font-medium
                      text-[#A1A1AA]
                    "
                  >
                    Keep The Momentum Going
                  </span>

                  <h2
                    className="
                      mt-8
                      text-4xl
                      font-semibold
                      tracking-[-0.03em]
                    "
                  >
                    Ready For Your Next Challenge?
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
                    You've completed
                    {" "}
                    <span className="font-medium text-white">
                      {homeData.overview.totalAttempts}
                    </span>
                    {" "}
                    quizzes so far.
                    Keep learning, improving,
                    and discovering what you're
                    capable of.
                  </p>

                  <div
                    className="
                      mt-10
                      flex
                      flex-wrap
                      items-center
                      justify-center
                      gap-4
                    "
                  >

                    <button
                      onClick={() =>
                        navigate("/all-quizzes")
                      }
                      className="
                        cursor-pointer
                        rounded-full
                        bg-white
                        px-6
                        py-3
                        text-sm
                        font-medium
                        text-black
                        transition-all
                        duration-300
                        hover:bg-white/90
                        hover:-translate-y-1
                      "
                    >
                      Generate Quiz
                    </button>

                    <button
                      onClick={() =>
                        navigate("/submittion/history")
                      }
                      className="
                        cursor-pointer
                        rounded-full
                        border border-white/10
                        bg-white/[0.03]
                        px-6
                        py-3
                        text-sm
                        font-medium
                        transition-all
                        duration-300
                        hover:bg-white/[0.06]
                        hover:-translate-y-1
                      "
                    >
                      View History
                    </button>

                  </div>
                </>
              ) : (
                <>
                  <span
                    className="
                      rounded-full
                      border border-white/10
                      bg-white/[0.03]
                      px-4
                      py-2
                      text-xs
                      font-medium
                      text-[#A1A1AA]
                    "
                  >
                    Start Today
                  </span>

                  <h2
                    className="
                      mt-8
                      text-4xl
                      font-semibold
                      tracking-[-0.03em]
                    "
                  >
                    Start Learning Free Today
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
                    Stop guessing what to study.
                    Let Eventra guide your learning
                    journey with AI-powered insights
                    and focused practice.
                  </p>

                  <div
                    className="
                      mt-10
                      flex
                      flex-wrap
                      items-center
                      justify-center
                      gap-4
                    "
                  >

                    <button
                      onClick={() =>
                        navigate("/user/signup")
                      }
                      className="
                        cursor-pointer
                        rounded-full
                        bg-white
                        px-6
                        py-3
                        text-sm
                        font-medium
                        text-black
                        transition-all
                        duration-300
                        hover:bg-white/90
                        hover:-translate-y-1
                      "
                    >
                      Create Free Account
                    </button>

                    <button
                      onClick={() =>
                        navigate("/all-quizzes")
                      }
                      className="
                        cursor-pointer
                        rounded-full
                        border border-white/10
                        bg-white/[0.03]
                        px-6
                        py-3
                        text-sm
                        font-medium
                        transition-all
                        duration-300
                        hover:bg-white/[0.06]
                        hover:-translate-y-1
                      "
                    >
                      Explore Quizzes
                    </button>

                  </div>
                </>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* ================= CLOSING QUOTE ================= */}

{/* ================= CLOSING QUOTE ================= */}

<section className="py-16 overflow-hidden">

  <div
    className="
      relative
      mx-auto
      max-w-5xl
      px-8
      text-center
    "
  >

    {/* Background Glow */}

    <div
      className="
        absolute
        left-1/2
        top-1/2
        h-64
        w-64
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-violet-500/[0.04]
        blur-3xl
      "
    />

    {/* Opening Quote */}

    <div
      className="
        absolute
        left-0
        top-0
        text-7xl
        font-serif
        text-white/[0.05]
        md:text-8xl
      "
    >
      "
    </div>

    {/* Closing Quote */}

    <div
      className="
        absolute
        right-0
        bottom-12
        text-7xl
        font-serif
        text-white/[0.05]
        md:text-8xl
      "
    >
      "
    </div>

    <div className="relative z-10">

      <p
        className="
          text-4xl
          font-semibold
          leading-[1.35]
          tracking-[-0.04em]
          md:text-6xl
        "
      >
        Stop studying
        <span className="text-orange-400">
          {" "}harder.
        </span>

        <br />

        Start learning
        <span className="text-violet-400">
          {" "}smarter.
        </span>
      </p>

      <p
        className="
          mx-auto
          mt-6
          max-w-xl
          text-sm
          leading-7
          text-[#8A8F98]
        "
      >
        Every attempt is an opportunity to improve.
      </p>

      <div className="mt-10 flex justify-center">

        <div
          className="
            h-px
            w-20
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
          "
        />

      </div>

      <p
        className="
          mt-6
          text-xs
          uppercase
          tracking-[0.45em]
          text-[#8A8F98]
        "
      >
        EVENTRA
      </p>

    </div>

  </div>

</section>

    </div>
  );
};

export default HomePage;