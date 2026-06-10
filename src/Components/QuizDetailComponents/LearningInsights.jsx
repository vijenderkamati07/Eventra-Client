import {
  ArrowRight,
  Brain,
  Sparkles,
  Target,
} from "lucide-react";

const LearningInsights = ({
  attempts = [],
}) => {
  const weakAreaFrequency = {};

  attempts.forEach((attempt) => {
    if (
      attempt.status !== "completed" ||
      !Array.isArray(attempt.weakAreas)
    ) {
      return;
    }

    attempt.weakAreas.forEach((area) => {
      const normalizedArea =
        area?.trim();

      if (!normalizedArea) {
        return;
      }

      weakAreaFrequency[
        normalizedArea
      ] =
        (weakAreaFrequency[
          normalizedArea
        ] || 0) + 1;
    });
  });

  const focusAreas = Object.entries(
    weakAreaFrequency
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  /*
    Empty State
  */
  if (focusAreas.length === 0) {
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
        <div className="flex gap-5">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-emerald-500/10
              text-emerald-300
            "
          >
            <Sparkles size={24} />
          </div>

          <div>
            <span
              className="
                text-xs
                uppercase
                tracking-[0.2em]
                text-[#8A8F98]
              "
            >
              Learning Intelligence
            </span>

            <h2
              className="
                mt-3
                text-2xl
                font-semibold
              "
            >
              No Focus Areas Detected
            </h2>

            <p
              className="
                mt-4
                max-w-xl
                leading-7
                text-[#8A8F98]
              "
            >
              Great work. We haven't found
              recurring weak areas yet.
              Continue practicing to unlock
              deeper insights.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const topArea =
    focusAreas[0][0];

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
      {/* Header */}
      <div>
        <span
          className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-[#8A8F98]
          "
        >
          Learning Intelligence
        </span>

        <h2
          className="
            mt-3
            text-3xl
            font-semibold
            tracking-[-0.03em]
          "
        >
          Focus Areas
        </h2>

        <p
          className="
            mt-3
            max-w-2xl
            leading-7
            text-[#8A8F98]
          "
        >
          Based on your completed attempts,
          these concepts deserve additional
          attention.
        </p>
      </div>

      {/* Focus List */}
      <div
        className="
          mt-10
          rounded-3xl
          border
          border-white/[0.06]
          bg-white/[0.03]
          overflow-hidden
        "
      >
        {focusAreas.map(
          ([area, count], index) => (
            <div
              key={area}
              className={`
                flex
                items-center
                justify-between
                px-6
                py-5

                ${
                  index !==
                  focusAreas.length - 1
                    ? "border-b border-white/[0.06]"
                    : ""
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
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-red-500/10
                    text-red-300
                  "
                >
                  <Target size={18} />
                </div>

                <span
                  className="
                    font-medium
                  "
                >
                  {area}
                </span>
              </div>

              <span
                className="
                  rounded-full
                  bg-white/[0.04]
                  px-3
                  py-1
                  text-sm
                  font-medium
                  text-[#D1D5DB]
                "
              >
                {count}×
              </span>
            </div>
          )
        )}
      </div>

      {/* AI Recommendation */}
      <div
        className="
          mt-8
          rounded-3xl
          border
          border-blue-500/20
          bg-blue-500/5
          p-6
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
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-blue-500/10
              text-blue-300
            "
          >
            <Brain size={22} />
          </div>

          <div className="flex-1">
            <h3
              className="
                text-lg
                font-semibold
              "
            >
              AI Recommendation
            </h3>

            <p
              className="
                mt-3
                leading-7
                text-[#D1D5DB]
              "
            >
              "{topArea}" has appeared most
              frequently in your weak areas.
              Revisiting this concept before
              attempting harder quizzes may
              significantly improve your
              accuracy and confidence.
            </p>

            <button
              className="
                mt-6
                inline-flex
                cursor-pointer
                items-center
                gap-2
                text-sm
                font-medium
                text-white
              "
            >
              Review Weak Areas

              <ArrowRight
                size={16}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningInsights;