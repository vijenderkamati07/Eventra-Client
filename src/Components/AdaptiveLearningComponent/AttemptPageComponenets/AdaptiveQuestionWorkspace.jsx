import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function AdaptiveQuestionWorkspace({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onPrevious,
  onNext,
  isLastQuestion,
}) {
  /*
  ==================================================
  SAFETY
  ==================================================
  */

  if (!currentQuestion) {
    return null;
  }

  /*
  ==================================================
  LONG QUESTION HANDLING
  ==================================================
  */

  const questionText =
    currentQuestion.question || "";

  const isLongQuestion =
    questionText.length > 120;

  return (
    <section>
      {/* Focus Area */}
      {currentQuestion.tags?.length >
        0 && (
        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >
          {currentQuestion.tags.map(
            (tag) => (
              <span
                key={tag}
                className="
                  rounded-full
                  bg-violet-500/[0.06]
                  px-3
                  py-1.5
                  text-sm
                  font-medium
                  text-violet-400
                "
              >
                {tag}
              </span>
            )
          )}
        </div>
      )}

      {/* Question Meta */}
      <div className="mt-10">
        <p
          className="
            text-sm
            uppercase
            tracking-[0.25em]
            text-[#8A8F98]
          "
        >
          Question
        </p>

        <p
          className="
            mt-2
            text-lg
            font-semibold
          "
        >
          {currentQuestionIndex + 1}
          {" / "}
          {totalQuestions}
        </p>
      </div>

      {/* Divider */}
      <div
        className="
          mt-8
          h-px
          bg-white/[0.06]
        "
      />

      {/* Question */}
      <div className="mt-10">
        <h2
          className={`
            font-bold
            tracking-tight
            break-words

            ${
              isLongQuestion
                ? `
                  text-2xl
                  leading-relaxed
                  md:text-3xl
                `
                : `
                  text-3xl
                  leading-tight
                  md:text-4xl
                `
            }
          `}
        >
          {questionText}
        </h2>

        {isLongQuestion && (
          <p
            className="
              mt-4
              text-sm
              leading-relaxed
              text-[#8A8F98]
            "
          >
            Read carefully before
            choosing your answer.
          </p>
        )}
      </div>

      {/* Options */}
      <div
        className="
          mt-12
          space-y-4
        "
      >        {currentQuestion.options?.map(
          (option, index) => {
            const isSelected =
              selectedAnswer === index;

            return (
              <button
                key={index}
                onClick={() =>
                  onSelectAnswer(index)
                }
                className={`
                  cursor-pointer
                  group
                  flex
                  w-full
                  items-start
                  gap-5
                  rounded-3xl
                  border
                  px-5
                  py-5
                  text-left
                  transition-all
                  duration-300

                  ${
                    isSelected
                      ? `
                        border-violet-500/30
                        bg-violet-500/[0.06]
                      `
                      : `
                        border-white/[0.06]
                        hover:border-white/[0.12]
                        hover:bg-white/[0.02]
                        hover:-translate-y-0.5
                      `
                  }
                `}
              >
                {/* Option Indicator */}
                <div
                  className={`
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    text-sm
                    font-semibold
                    transition-all
                    duration-300

                    ${
                      isSelected
                        ? `
                          bg-violet-500/12
                          text-violet-400
                        `
                        : `
                          bg-white/[0.03]
                          text-[#8A8F98]
                          group-hover:text-white
                        `
                    }
                  `}
                >
                  {String.fromCharCode(
                    65 + index
                  )}
                </div>

                {/* Option Text */}
                <div
                  className="
                    flex-1
                    pt-1
                  "
                >
                  <p
                    className={`
                      leading-relaxed
                      transition-colors
                      duration-300

                      ${
                        isSelected
                          ? "text-white"
                          : "text-[#D6D8DC]"
                      }
                    `}
                  >
                    {option}
                  </p>
                </div>
              </button>
            );
          }
        )}
      </div>

      {/* Navigation */}
      <div
        className="
          mt-14
          flex
          flex-col-reverse
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* Previous */}
        <div>
          {currentQuestionIndex >
            0 && (
            <button
              onClick={onPrevious}
              className="
                cursor-pointer
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/[0.08]
                px-5
                py-3
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
              <ChevronLeft
                size={16}
              />

              Previous
            </button>
          )}
        </div>

        {/* Next */}
        <button
          onClick={onNext}
          className="
            cursor-pointer
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-white
            px-7
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
          <span>
            {isLastQuestion
              ? "Complete Session"
              : selectedAnswer !==
                undefined
              ? "Save & Continue"
              : "Skip & Continue"}
          </span>

          {!isLastQuestion && (
            <ChevronRight
              size={16}
            />
          )}
        </button>
      </div>
    </section>
  );
}