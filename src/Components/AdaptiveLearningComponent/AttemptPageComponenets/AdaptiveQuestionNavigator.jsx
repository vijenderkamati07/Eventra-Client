export default function AdaptiveQuestionNavigator({
  totalQuestions,
  currentQuestionIndex,
  answers,
  onJump,
}) {
  /*
  ==================================================
  STATUS HELPERS
  ==================================================
  */

  function getQuestionStatus(
    index
  ) {
    if (
      index ===
      currentQuestionIndex
    ) {
      return "current";
    }

    if (
      answers[index] !==
      undefined
    ) {
      return "answered";
    }

    return "unanswered";
  }

  return (
    <div>
      {/* Legend */}
      <div
        className="
          flex
          flex-wrap
          gap-5
          text-sm
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              h-2.5
              w-2.5
              rounded-full
              bg-violet-500
            "
          />

          <span
            className="
              text-[#8A8F98]
            "
          >
            Current
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              h-2.5
              w-2.5
              rounded-full
              bg-emerald-400
            "
          />

          <span
            className="
              text-[#8A8F98]
            "
          >
            Answered
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              h-2.5
              w-2.5
              rounded-full
              bg-white/20
            "
          />

          <span
            className="
              text-[#8A8F98]
            "
          >
            Unanswered
          </span>
        </div>
      </div>

      {/* Grid */}
      <div
        className="
          mt-6
          grid
          grid-cols-5
          gap-3
        "
      >        {Array.from(
          { length: totalQuestions },
          (_, index) => {
            const status =
              getQuestionStatus(
                index
              );

            return (
              <button
                key={index}
                onClick={() =>
                  onJump(index)
                }
                className={`
                  cursor-pointer
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  text-sm
                  font-semibold
                  transition-all
                  duration-300

                  ${
                    status ===
                    "current"
                      ? `
                        bg-violet-500
                        text-white
                        shadow-[0_8px_20px_rgba(139,92,246,0.18)]
                        hover:-translate-y-0.5
                      `
                      : status ===
                        "answered"
                      ? `
                        border
                        border-emerald-500/20
                        bg-emerald-500/10
                        text-emerald-400
                        hover:-translate-y-0.5
                        hover:bg-emerald-500/15
                      `
                      : `
                        border
                        border-white/[0.06]
                        text-[#8A8F98]
                        hover:-translate-y-0.5
                        hover:border-white/[0.12]
                        hover:bg-white/[0.03]
                        hover:text-white
                      `
                  }
                `}
              >
                {index + 1}
              </button>
            );
          }
        )}
      </div>

      {/* Summary */}
      <div
        className="
          mt-6
          flex
          items-center
          justify-between
          text-sm
          text-[#8A8F98]
        "
      >
        <span>
          {
            Object.keys(
              answers
            ).length
          }{" "}
          Answered
        </span>

        <span>
          {totalQuestions -
            Object.keys(
              answers
            ).length}{" "}
          Remaining
        </span>
      </div>
    </div>
  );
}