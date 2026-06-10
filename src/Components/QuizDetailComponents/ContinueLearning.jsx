import {
  ArrowRight,
  BookOpen,
  Clock3,
  Trophy,
} from "lucide-react";

const ContinueLearning = ({
  attempts = [],
}) => {
  const formatDate = (date) => {
    if (!date) return "Recently";

    const diff = Math.floor(
      (Date.now() - new Date(date)) /
        (1000 * 60 * 60 * 24)
    );

    if (diff === 0) return "Today";

    if (diff === 1) return "Yesterday";

    if (diff < 7) {
      return `${diff} days ago`;
    }

    return new Date(date).toLocaleDateString();
  };

  if (!attempts || attempts.length === 0) {
    return (
      <section
        className="
          rounded-[28px]
          border
          border-white/[0.06]
          bg-[#0C0D0F]
          p-8
        "
      >
        <div className="flex items-start gap-5">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-white/[0.03]
            "
          >
            <BookOpen size={24} />
          </div>

          <div className="flex-1">
            <span
              className="
                text-xs
                uppercase
                tracking-[0.2em]
                text-[#8A8F98]
              "
            >
              Continue Learning
            </span>

            <h2
              className="
                mt-3
                text-2xl
                font-semibold
              "
            >
              Start Your First Attempt
            </h2>

            <p
              className="
                mt-3
                max-w-xl
                leading-7
                text-[#8A8F98]
              "
            >
              You haven't attempted any quizzes
              for this subject yet. Generate your
              first quiz and begin tracking your
              learning journey.
            </p>

            <button
              className="
                mt-8
                cursor-pointer
                rounded-full
                bg-white
                px-6
                py-3
                text-sm
                font-semibold
                text-black
                transition-all
                duration-200
                hover:bg-white/90
              "
            >
              Start First Quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  const latestAttempt = attempts[0];

  const gain =
    latestAttempt?.score?.gain ?? 0;

  const total =
    latestAttempt?.score?.total ?? 0;

  const percentage =
    total > 0
      ? Math.round((gain / total) * 100)
      : 0;

  const completedAttempts =
    attempts.filter(
      (attempt) =>
        attempt.status === "completed"
    ).length;

  return (
    <section
      className="
        overflow-hidden
        rounded-[28px]
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
          gap-8
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Left */}
        <div className="flex-1">
          <span
            className="
              text-xs
              uppercase
              tracking-[0.2em]
              text-[#8A8F98]
            "
          >
            Continue Learning
          </span>

          <h2
            className="
              mt-3
              text-3xl
              font-semibold
              tracking-[-0.03em]
            "
          >
            Your Latest Progress
          </h2>

          <p
            className="
              mt-3
              max-w-xl
              leading-7
              text-[#8A8F98]
            "
          >
            Review your latest performance
            and continue improving your
            understanding.
          </p>

          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-4
            "
          >
            <div
              className="
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.03]
                px-5
                py-4
              "
            >
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-[#8A8F98]
                "
              >
                Score
              </p>

              <p
                className="
                  mt-2
                  text-2xl
                  font-semibold
                "
              >
                {gain}/{total}
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.03]
                px-5
                py-4
              "
            >
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-[#8A8F98]
                "
              >
                Accuracy
              </p>

              <p
                className="
                  mt-2
                  text-2xl
                  font-semibold
                "
              >
                {percentage}%
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.03]
                px-5
                py-4
              "
            >
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-[#8A8F98]
                "
              >
                Completed
              </p>

              <p
                className="
                  mt-2
                  text-2xl
                  font-semibold
                "
              >
                {completedAttempts}
              </p>
            </div>
          </div>

          <button
            className="
              mt-8
              inline-flex
              cursor-pointer
              items-center
              gap-2
              rounded-full
              bg-white
              px-6
              py-3
              text-sm
              font-semibold
              text-black
              transition-all
              duration-200
              hover:bg-white/90
            "
          >
            Review Attempt

            <ArrowRight size={16} />
          </button>
        </div>

        {/* Right */}
        <div
          className="
            flex
            w-full
            max-w-[260px]
            flex-col
            gap-4
          "
        >
          <div
            className="
              rounded-2xl
              border
              border-white/[0.06]
              bg-white/[0.03]
              p-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <Trophy size={20} />

              <span className="font-medium">
                Status
              </span>
            </div>

            <p
              className="
                mt-4
                capitalize
                text-[#D1D5DB]
              "
            >
              {latestAttempt?.status ||
                "Unknown"}
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-white/[0.06]
              bg-white/[0.03]
              p-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <Clock3 size={20} />

              <span className="font-medium">
                Last Attempt
              </span>
            </div>

            <p
              className="
                mt-4
                text-[#D1D5DB]
              "
            >
              {formatDate(
                latestAttempt?.createdAt
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContinueLearning;