
const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  currentQuestion,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  const isFirstQuestion =
    currentQuestion === 0;

  const isLastQuestion =
    currentQuestion ===
    totalQuestions - 1;

  if (!question) {
    return null;
  }

  const options =
    Array.isArray(question.options)
      ? question.options
      : [];

  return (
    <section
      className="
        rounded-[32px]
        border border-white/[0.06]
        bg-[#0C0D0F]
        p-6 md:p-10
      "
    >

      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>

          <p className="text-sm text-[#8A8F98]">
            Question {questionNumber}
          </p>

          <p className="mt-2 text-xs text-[#8A8F98]">
            2 Points • Single Choice
          </p>

        </div>

        <div className="px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.03] text-sm text-[#D6D8DC]">
          {questionNumber}/{totalQuestions}
        </div>

      </div>


      {/* ============================= */}
      {/* TAGS */}
      {/* ============================= */}

      {Array.isArray(question.tags) &&
        question.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">

            {question.tags.map(
              (tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="
                    px-3 py-1
                    rounded-full
                    border border-white/[0.06]
                    bg-white/[0.03]
                    text-xs
                    text-[#8A8F98]
                  "
                >
                  {tag}
                </span>
              )
            )}

          </div>
        )}


      {/* ============================= */}
      {/* QUESTION */}
      {/* ============================= */}

      <h2
        className="
          mt-8
          text-2xl
          leading-9
          font-medium
          text-white
          break-words
        "
      >
        {question.question}
      </h2>


      {/* ============================= */}
      {/* OPTIONS */}
      {/* ============================= */}

      <div className="mt-10 space-y-4">

        {options.map(
          (option, index) => {
            const isSelected =
              selectedAnswer ===
              index;

            return (
              <button
                key={`${option}-${index}`}
                type="button"
                role="radio"
                aria-checked={
                  isSelected
                }
                onClick={() =>
                  onSelectAnswer(
                    index
                  )
                }
                disabled={
                  isSubmitting
                }
                className={`
                  w-full
                  text-left
                  px-6 py-5
                  rounded-2xl
                  border
                  transition-all
                  duration-300
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  cursor-pointer

                  ${
                    isSelected
                      ? `
                        border-emerald-500/30
                        bg-emerald-500/10
                      `
                      : `
                        border-white/[0.06]
                        bg-white/[0.02]
                        hover:border-white/[0.12]
                        hover:-translate-y-1
                      `
                  }
                `}
              >

                <div className="flex items-start gap-4">

                  {/* Indicator */}
                  <div
                    className={`
                      mt-1
                      w-6 h-6
                      rounded-full
                      border
                      flex items-center justify-center
                      shrink-0

                      ${
                        isSelected
                          ? `
                            border-emerald-500
                            bg-emerald-500
                          `
                          : `
                            border-white/[0.12]
                          `
                      }
                    `}
                  >

                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    )}

                  </div>


                  {/* Option Label */}
                  <div
                    className={`
                      w-8 h-8
                      rounded-full
                      flex items-center justify-center
                      shrink-0
                      text-sm font-medium

                      ${
                        isSelected
                          ? `
                            bg-emerald-500/15
                            text-emerald-400
                          `
                          : `
                            bg-white/[0.04]
                            text-[#8A8F98]
                          `
                      }
                    `}
                  >
                    {String.fromCharCode(
                      65 + index
                    )}
                  </div>


                  {/* Option Text */}
                  <div className="flex-1">

                    <p className="leading-7 text-white">
                      {option}
                    </p>

                  </div>

                </div>

              </button>
            );
          }
        )}


        {options.length === 0 && (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-5 text-[#8A8F98]">
            No options available.
          </div>
        )}

      </div>


      {/* ============================= */}
      {/* FOOTER NAVIGATION */}
      {/* ============================= */}

      <div className="mt-10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4">

        {/* Previous */}
        <button
          type="button"
          onClick={onPrevious}
          disabled={
            isFirstQuestion ||
            isSubmitting
          }
          className="
            px-6 py-3
            rounded-2xl
            border border-white/[0.06]
            bg-white/[0.02]
            text-[#D6D8DC]
            transition-all
            duration-300
            hover:bg-white/[0.03]
            hover:-translate-y-1
            disabled:opacity-50
            disabled:cursor-not-allowed
            cursor-pointer
          "
        >
          Previous
        </button>


        {/* Keyboard Hint */}
        <div className="hidden md:flex items-center gap-4 text-xs text-[#8A8F98]">

          <span>
            Enter → Next
          </span>

          <span>
            1–4 → Select
          </span>

        </div>


        {/* Next / Submit */}
        {!isLastQuestion ? (
          <button
            type="button"
            onClick={onNext}
            disabled={
              isSubmitting
            }
            className="
              px-6 py-3
              rounded-2xl
              bg-white
              text-black
              font-medium
              transition-all
              duration-300
              hover:opacity-90
              hover:-translate-y-1
              disabled:opacity-50
              disabled:cursor-not-allowed
              cursor-pointer
            "
          >
            Next Question
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={
              isSubmitting
            }
            className="
              px-6 py-3
              rounded-2xl
              bg-white
              text-black
              font-medium
              transition-all
              duration-300
              hover:opacity-90
              hover:-translate-y-1
              disabled:opacity-50
              disabled:cursor-not-allowed
              cursor-pointer
            "
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Assessment"}
          </button>
        )}

      </div>

    </section>
  );
};

export default QuestionCard;

