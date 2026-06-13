
const AssessmentSidebar = ({
  totalQuestions,
  currentQuestion,
  answers,
  visitedQuestions,
  answeredCount,
  unansweredCount,
  onQuestionSelect,
  onSaveAndExit,
  onSubmit,
  isSavingDraft,
  isSubmitting,
}) => {
  return (
    <aside className="lg:sticky lg:top-28 space-y-6">

      {/* ================================= */}
      {/* QUESTION NAVIGATOR */}
      {/* ================================= */}

      <section className="rounded-[32px] border border-white/[0.06] bg-[#0C0D0F] p-6">

        <div className="flex items-center justify-between mb-5">

          <div>
            <p className="text-xs uppercase tracking-wide text-[#8A8F98]">
              Assessment
            </p>

            <h2 className="mt-1 text-lg font-semibold text-white">
              Navigator
            </h2>
          </div>

          <div className="text-xs text-[#8A8F98]">
            {answeredCount}/{totalQuestions}
          </div>

        </div>


        {/* =============================== */}
        {/* Desktop Grid */}
        {/* =============================== */}

        <div className="hidden sm:grid grid-cols-4 gap-3">

          {Array.from(
            { length: totalQuestions },
            (_, index) => {
              const isCurrent =
                index === currentQuestion;

              const isAnswered =
                answers[index] !==
                undefined &&
                answers[index] !==
                null;

              const isVisited =
                visitedQuestions.has(
                  index
                );

              let classes =
                "border-white/[0.06] text-[#8A8F98] hover:border-white/[0.12] hover:bg-white/[0.03]";

              if (isAnswered) {
                classes =
                  "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
              }

              if (
                isVisited &&
                !isAnswered
              ) {
                classes =
                  "border-amber-500/30 text-amber-400";
              }

              if (isCurrent) {
                classes =
                  "bg-white text-black border-white shadow-sm";
              }

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    onQuestionSelect(
                      index
                    )
                  }
                  disabled={
                    isSubmitting
                  }
                  aria-label={`Go to question ${
                    index + 1
                  }`}
                  className={`
                    aspect-square rounded-2xl border
                    text-sm font-medium
                    transition-all duration-300
                    hover:-translate-y-1
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    cursor-pointer
                    ${classes}
                  `}
                >
                  {String(
                    index + 1
                  ).padStart(2, "0")}
                </button>
              );
            }
          )}

        </div>


        {/* =============================== */}
        {/* Mobile Navigator */}
        {/* =============================== */}

        <div className="sm:hidden -mx-1 overflow-x-auto">

          <div className="flex gap-3 px-1 pb-1 w-max">

            {Array.from(
              { length: totalQuestions },
              (_, index) => {
                const isCurrent =
                  index ===
                  currentQuestion;

                const isAnswered =
                  answers[index] !==
                    undefined &&
                  answers[index] !==
                    null;

                const isVisited =
                  visitedQuestions.has(
                    index
                  );

                let classes =
                  "border-white/[0.06] text-[#8A8F98]";

                if (
                  isAnswered
                ) {
                  classes =
                    "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
                }

                if (
                  isVisited &&
                  !isAnswered
                ) {
                  classes =
                    "border-amber-500/30 text-amber-400";
                }

                if (
                  isCurrent
                ) {
                  classes =
                    "bg-white text-black border-white";
                }

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      onQuestionSelect(
                        index
                      )
                    }
                    disabled={
                      isSubmitting
                    }
                    className={`
                      w-12 h-12 shrink-0 rounded-2xl border
                      text-sm font-medium
                      transition-all duration-300
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      cursor-pointer
                      ${classes}
                    `}
                  >
                    {index + 1}
                  </button>
                );
              }
            )}

          </div>

        </div>


        {/* =============================== */}
        {/* Legend */}
        {/* =============================== */}

        <div className="mt-6 flex flex-wrap gap-4 text-xs">

          <div className="flex items-center gap-2">

            <span className="w-3 h-3 rounded-full bg-emerald-500" />

            <span className="text-[#8A8F98]">
              Answered
            </span>

          </div>

          <div className="flex items-center gap-2">

            <span className="w-3 h-3 rounded-full bg-white" />

            <span className="text-[#8A8F98]">
              Current
            </span>

          </div>

          <div className="flex items-center gap-2">

            <span className="w-3 h-3 rounded-full bg-amber-400" />

            <span className="text-[#8A8F98]">
              Visited
            </span>

          </div>

        </div>

      </section>



      {/* ================================= */}
      {/* SUMMARY */}
      {/* ================================= */}

      <section className="rounded-[32px] border border-white/[0.06] bg-[#0C0D0F] p-6">

        <p className="text-xs uppercase tracking-wide text-[#8A8F98]">
          Summary
        </p>

        <h2 className="mt-1 text-lg font-semibold text-white">
          Progress
        </h2>


        <div className="mt-6 space-y-4">

          <div className="flex items-center justify-between">

            <span className="text-[#8A8F98]">
              Answered
            </span>

            <span className="font-medium text-white">
              {answeredCount}
            </span>

          </div>


          <div className="flex items-center justify-between">

            <span className="text-[#8A8F98]">
              Remaining
            </span>

            <span className="font-medium text-white">
              {unansweredCount}
            </span>

          </div>


          <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">

            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{
                width: `${
                  totalQuestions > 0
                    ? (answeredCount /
                        totalQuestions) *
                      100
                    : 0
                }%`,
              }}
            />

          </div>

        </div>

      </section>



      {/* ================================= */}
      {/* ACTIONS */}
      {/* ================================= */}

      <section className="rounded-[32px] border border-white/[0.06] bg-[#0C0D0F] p-6">

        <p className="text-xs uppercase tracking-wide text-[#8A8F98]">
          Actions
        </p>

        <h2 className="mt-1 text-lg font-semibold text-white">
          Assessment
        </h2>


        <div className="mt-6 space-y-3">

          <button
            type="button"
            onClick={onSaveAndExit}
            disabled={
              isSavingDraft ||
              isSubmitting
            }
            className="
              w-full
              rounded-2xl
              border border-white/[0.06]
              bg-white/[0.02]
              px-4 py-4
              text-[#D6D8DC]
              hover:bg-white/[0.03]
              hover:-translate-y-1
              transition-all duration-300
              disabled:opacity-50
              disabled:cursor-not-allowed
              cursor-pointer
            "
          >
            {isSavingDraft
              ? "Saving..."
              : "Save & Exit"}
          </button>


          <button
            type="button"
            onClick={onSubmit}
            disabled={
              isSubmitting
            }
            className="
              w-full
              rounded-2xl
              bg-white
              text-black
              px-4 py-4
              font-medium
              hover:opacity-90
              hover:-translate-y-1
              transition-all duration-300
              disabled:opacity-50
              disabled:cursor-not-allowed
              cursor-pointer
            "
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Assessment"}
          </button>

        </div>

      </section>

    </aside>
  );
};

export default AssessmentSidebar;

