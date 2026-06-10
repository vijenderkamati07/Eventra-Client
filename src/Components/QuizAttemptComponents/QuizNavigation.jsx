const QuizNavigation = ({
  currentQuestion,
  totalQuestions,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion =
    currentQuestion === totalQuestions - 1;

  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      
      {/* Previous */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstQuestion || isSubmitting}
        className={`px-5 py-2.5 rounded-xl border transition-colors cursor-pointer
        
        ${
          isFirstQuestion || isSubmitting
            ? "border-white/[0.06] text-[#5F6368] cursor-not-allowed"
            : "border-white/[0.06] text-[#8A8F98] hover:bg-white/[0.03] hover:text-white"
        }`}
      >
        Previous
      </button>

      {/* Next / Submit */}
      {!isLastQuestion ? (
        <button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-xl bg-white text-black hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-xl bg-white text-black hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Quiz"}
        </button>
      )}
    </div>
  );
};

export default QuizNavigation;