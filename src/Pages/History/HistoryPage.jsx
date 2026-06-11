import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  ArrowRight,
  Clock3,
  Medal,
  Search,
  Sparkles,
  Target,
} from "lucide-react";

import {
  getAllSubmittions,
} from "../../Services/quizService";

const HistoryPage = () => {
  const navigate = useNavigate();

  const [submissions, setSubmissions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      setError("");

      const response =
        await getAllSubmittions();

      if (!response.success) {
        setError(
          response.errors?.[0] ||
            "Failed to load history."
        );

        return;
      }

      setSubmissions(
        response.data
          ?.submissions || []
      );
    } catch {
      setError(
        "Something went wrong while loading history."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDateHeading = (
    date
  ) => {
    const current =
      new Date();

    const target =
      new Date(date);

    const today =
      new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate()
      );

    const compare =
      new Date(
        target.getFullYear(),
        target.getMonth(),
        target.getDate()
      );

    const diff =
      Math.floor(
        (today - compare) /
          (1000 *
            60 *
            60 *
            24)
      );

    if (diff === 0) {
      return "Today";
    }

    if (diff === 1) {
      return "Yesterday";
    }

    return target.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  const formatTime = (
    date
  ) => {
    return new Date(
      date
    ).toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  const getAccuracy = (
    submission
  ) => {
    if (
      !submission.score?.total
    ) {
      return 0;
    }

    return Math.round(
      (submission.score
        .gain /
        submission.score
          .total) *
        100
    );
  };

  const getStatus = (
    accuracy
  ) => {
    if (accuracy === 100) {
      return {
        label:
          "Perfect Score",
        color:
          "bg-emerald-500/10 text-emerald-300",
      };
    }

    if (accuracy >= 80) {
      return {
        label:
          "Excellent",
        color:
          "bg-blue-500/10 text-blue-300",
      };
    }

    if (accuracy >= 60) {
      return {
        label:
          "Good Progress",
        color:
          "bg-yellow-500/10 text-yellow-300",
      };
    }

    return {
      label:
        "Needs Practice",
      color:
        "bg-red-500/10 text-red-300",
    };
  };

  const filteredSubmissions =
    useMemo(() => {
      return submissions.filter(
        (
          submission
        ) => {
          const topicMatch =
            submission.topic
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const accuracy =
            getAccuracy(
              submission
            );

          let filterMatch =
            true;

          if (
            filter ===
            "perfect"
          ) {
            filterMatch =
              accuracy ===
              100;
          }

          if (
            filter ===
            "weak"
          ) {
            filterMatch =
              submission
                .weakAreas
                ?.length > 0;
          }

          if (
            filter ===
            "practice"
          ) {
            filterMatch =
              accuracy < 60;
          }

          return (
            topicMatch &&
            filterMatch
          );
        }
      );
    }, [
      submissions,
      search,
      filter,
    ]);

  const groupedHistory =
    useMemo(() => {
      return filteredSubmissions.reduce(
        (
          groups,
          submission
        ) => {
          const key =
            formatDateHeading(
              submission.createdAt
            );

          if (
            !groups[key]
          ) {
            groups[key] =
              [];
          }

          groups[key].push(
            submission
          );

          return groups;
        },
        {}
      );
    }, [
      filteredSubmissions,
    ]);  const totalAttempts =
    submissions.length;

  const averageAccuracy =
    submissions.length > 0
      ? Math.round(
          submissions.reduce(
            (
              total,
              submission
            ) =>
              total +
              getAccuracy(
                submission
              ),
            0
          ) /
            submissions.length
        )
      : 0;

  const topicsPracticed =
    new Set(
      submissions.map(
        (
          submission
        ) =>
          submission.topic
      )
    ).size;

  const perfectScores =
    submissions.filter(
      (
        submission
      ) =>
        getAccuracy(
          submission
        ) === 100
    ).length;

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
          <div className="text-4xl">
            ⏳
          </div>

          <p
            className="
              mt-5
              text-[#8A8F98]
            "
          >
            Loading your learning history...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
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
          <div className="text-4xl">
            ⚠️
          </div>

          <h2
            className="
              mt-6
              text-2xl
              font-semibold
            "
          >
            Unable to load history
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
            onClick={
              fetchHistory
            }
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
              transition-all
              duration-200
              hover:bg-white/90
            "
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
            "
          >
            <span
              className="
                text-xs
                uppercase
                tracking-[0.2em]
                text-[#8A8F98]
              "
            >
              Learning Journey
            </span>

            <h1
              className="
                mt-4
                text-4xl
                font-semibold
                tracking-[-0.03em]
              "
            >
              Quiz History
            </h1>

            <p
              className="
                mt-4
                max-w-2xl
                leading-8
                text-[#8A8F98]
              "
            >
              Review your progress,
              revisit previous attempts,
              and identify patterns in
              your learning journey.
            </p>
          </section>

          {/* Summary */}
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
                icon: Clock3,
                label:
                  "Total Attempts",
                value:
                  totalAttempts,
              },
              {
                icon: Target,
                label:
                  "Average Accuracy",
                value: `${averageAccuracy}%`,
              },
              {
                icon: Sparkles,
                label:
                  "Topics Practiced",
                value:
                  topicsPracticed,
              },
              {
                icon: Medal,
                label:
                  "Perfect Scores",
                value:
                  perfectScores,
              },
            ].map(
              (
                item
              ) => {
                const Icon =
                  item.icon;

                return (
                  <div
                    key={
                      item.label
                    }
                    className="
                      rounded-3xl
                      border
                      border-white/[0.06]
                      bg-[#0C0D0F]
                      p-6
                    "
                  >
                    <Icon
                      size={24}
                    />

                    <p
                      className="
                        mt-5
                        text-3xl
                        font-semibold
                      "
                    >
                      {
                        item.value
                      }
                    </p>

                    <p
                      className="
                        mt-2
                        text-[#8A8F98]
                      "
                    >
                      {
                        item.label
                      }
                    </p>
                  </div>
                );
              }
            )}
          </div>

          {/* Search + Filters */}
          <section
            className="
              rounded-3xl
              border
              border-white/[0.06]
              bg-[#0C0D0F]
              p-6
            "
          >
            <div
              className="
                flex
                flex-col
                gap-5
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              {/* Search */}
              <div
                className="
                  relative
                  w-full
                  lg:max-w-md
                "
              >
                <Search
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#8A8F98]
                  "
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search by topic..."
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.03]
                    py-3
                    pl-11
                    pr-4
                    outline-none
                    transition-all
                    placeholder:text-[#8A8F98]
                    focus:border-white/[0.12]
                  "
                />
              </div>

              {/* Filters */}
              <div
                className="
                  flex
                  flex-wrap
                  gap-3
                "
              >
                {[
                  {
                    label:
                      "All",
                    value:
                      "all",
                  },
                  {
                    label:
                      "Perfect",
                    value:
                      "perfect",
                  },
                  {
                    label:
                      "Weak Areas",
                    value:
                      "weak",
                  },
                  {
                    label:
                      "Needs Practice",
                    value:
                      "practice",
                  },
                ].map(
                  (
                    item
                  ) => (
                    <button
                      key={
                        item.value
                      }
                      onClick={() =>
                        setFilter(
                          item.value
                        )
                      }
                      className={`
                        cursor-pointer
                        rounded-full
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        transition-all
                        duration-200

                        ${
                          filter ===
                          item.value
                            ? "bg-white text-black"
                            : `
                              border
                              border-white/[0.06]
                              bg-white/[0.03]
                              text-white
                              hover:bg-white/[0.05]
                            `
                        }
                      `}
                    >
                      {
                        item.label
                      }
                    </button>
                  )
                )}
              </div>
            </div>
          </section>          {/* Timeline */}
          {Object.keys(
            groupedHistory
          ).length === 0 ? (
            <section
              className="
                rounded-[32px]
                border
                border-white/[0.06]
                bg-[#0C0D0F]
                px-8
                py-16
                text-center
              "
            >
              <div className="text-5xl">
                📚
              </div>

              <h2
                className="
                  mt-6
                  text-2xl
                  font-semibold
                "
              >
                No History Found
              </h2>

              <p
                className="
                  mt-4
                  max-w-lg
                  mx-auto
                  leading-7
                  text-[#8A8F98]
                "
              >
                Start attempting quizzes
                to build your learning
                timeline.
              </p>
            </section>
          ) : (
            <div className="space-y-10">
              {Object.entries(
                groupedHistory
              ).map(
                ([
                  date,
                  items,
                ]) => (
                  <section
                    key={date}
                    className="
                      relative
                    "
                  >
                    {/* Date Header */}
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
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/[0.06]
                          bg-[#0C0D0F]
                        "
                      >
                        📅
                      </div>

                      <div>
                        <h2
                          className="
                            text-2xl
                            font-semibold
                          "
                        >
                          {date}
                        </h2>

                        <p
                          className="
                            mt-1
                            text-sm
                            text-[#8A8F98]
                          "
                        >
                          {
                            items.length
                          }{" "}
                          Quiz
                          {items.length >
                          1
                            ? "es"
                            : ""}
                        </p>
                      </div>
                    </div>

                    {/* Vertical Timeline */}
                    <div
                      className="
                        relative
                        mt-8
                        ml-5
                        border-l
                        border-white/[0.06]
                        pl-8
                        space-y-6
                      "
                    >
                      {items.map(
                        (
                          submission
                        ) => {
                          const accuracy =
                            getAccuracy(
                              submission
                            );

                          const status =
                            getStatus(
                              accuracy
                            );

                          return (
                            <div
                              key={
                                submission._id
                              }
                              className="
                                relative
                              "
                            >
                              {/* Timeline Dot */}
                              <div
                                className="
                                  absolute
                                  -left-[42px]
                                  top-10
                                  h-4
                                  w-4
                                  rounded-full
                                  border-2
                                  border-[#08090A]
                                  bg-white
                                "
                              />

                              {/* Card */}
                              <div
                                className="
                                  w-full
                                  rounded-[28px]
                                  border
                                  border-white/[0.06]
                                  bg-[#0C0D0F]
                                  p-6
                                  transition-all
                                  duration-200
                                  hover:border-white/[0.12]
                                  hover:bg-white/[0.02]
                                "
                              >
                                <div
                                  className="
                                    flex
                                    flex-col
                                    gap-6
                                    xl:flex-row
                                    xl:items-center
                                    xl:justify-between
                                  "
                                >
                                  {/* Left */}
                                  <div
                                    className="
                                      flex-1
                                      min-w-0
                                    "
                                  >
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
                                          bg-white/[0.03]
                                          px-4
                                          py-2
                                          text-xs
                                          uppercase
                                          tracking-[0.15em]
                                          text-[#8A8F98]
                                        "
                                      >
                                        {
                                          submission.topic
                                        }
                                      </span>

                                      <span
                                        className={`
                                          rounded-full
                                          px-4
                                          py-2
                                          text-xs
                                          font-medium
                                          ${status.color}
                                        `}
                                      >
                                        {
                                          status.label
                                        }
                                      </span>
                                    </div>

                                    <div
                                      className="
                                        mt-5
                                        flex
                                        flex-wrap
                                        items-center
                                        gap-5
                                        text-sm
                                        text-[#8A8F98]
                                      "
                                    >
                                      <span>
                                        Score{" "}
                                        {
                                          submission
                                            .score
                                            .gain
                                        }
                                        /
                                        {
                                          submission
                                            .score
                                            .total
                                        }
                                      </span>

                                      <span>
                                        Accuracy{" "}
                                        {
                                          accuracy
                                        }
                                        %
                                      </span>

                                      <span>
                                        {formatTime(
                                          submission.createdAt
                                        )}
                                      </span>
                                    </div>

                                    {submission
                                      .weakAreas
                                      ?.length >
                                      0 && (
                                      <div
                                        className="
                                          mt-5
                                          flex
                                          flex-wrap
                                          gap-2
                                        "
                                      >
                                        {submission.weakAreas.map(
                                          (
                                            area,
                                            index
                                          ) => (
                                            <span
                                              key={
                                                index
                                              }
                                              className="
                                                rounded-full
                                                border
                                                border-red-500/20
                                                bg-red-500/10
                                                px-3
                                                py-1.5
                                                text-xs
                                                text-red-300
                                              "
                                            >
                                              ⚠{" "}
                                              {
                                                area
                                              }
                                            </span>
                                          )
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  {/* Right */}
                                  <div
                                    className="
                                      flex
                                      flex-wrap
                                      items-center
                                      gap-3
                                    "
                                  >
                                    {/* Accuracy */}
                                    <div
                                      className="
                                        rounded-2xl
                                        border
                                        border-white/[0.06]
                                        bg-white/[0.03]
                                        px-5
                                        py-4
                                        text-center
                                      "
                                    >
                                      <p
                                        className="
                                          text-2xl
                                          font-semibold
                                        "
                                      >
                                        {
                                          accuracy
                                        }
                                        %
                                      </p>

                                      <p
                                        className="
                                          mt-1
                                          text-xs
                                          uppercase
                                          tracking-[0.15em]
                                          text-[#8A8F98]
                                        "
                                      >
                                        Accuracy
                                      </p>
                                    </div>

                                    {/* Result */}
                                    <button
                                      onClick={() =>
                                        navigate(
                                          `/results/${submission._id}`
                                        )
                                      }
                                      className="
                                        inline-flex
                                        cursor-pointer
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-white
                                        px-6
                                        py-3
                                        text-sm
                                        font-medium
                                        text-black
                                        transition-all
                                        duration-200
                                        hover:bg-white/90
                                      "
                                    >
                                      View Result

                                      <ArrowRight
                                        size={
                                          16
                                        }
                                      />
                                    </button>

                                    {/* Retake */}
                                    <button
                                      onClick={() =>
                                        navigate(
                                          `/subjects/${submission.slug}`
                                        )
                                      }
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
                                      Retake Topic
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </section>
                )
              )}
            </div>
          )}        </div>
      </div>
    </div>
  );
};

export default HistoryPage;