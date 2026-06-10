const SubmitModal = ({
  isOpen,
  answeredCount,
  totalQuestions,
  timeLeft,
  isSubmitting,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const unansweredCount =
    totalQuestions - answeredCount;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/[0.06] bg-[#0C0D0F] p-6">

        <h2 className="text-xl font-semibold text-white">
          Submit Quiz?
        </h2>

        <p className="mt-2 text-sm text-[#8A8F98]">
          Review your progress before submitting.
        </p>

        <div className="mt-6 space-y-4">

          <div className="flex justify-between">
            <span className="text-[#8A8F98]">
              Answered
            </span>

            <span className="text-white font-medium">
              {answeredCount}/{totalQuestions}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#8A8F98]">
              Unanswered
            </span>

            <span className="text-white font-medium">
              {unansweredCount}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#8A8F98]">
              Time Remaining
            </span>

            <span className="text-white font-medium">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </span>
          </div>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl border border-white/[0.06] text-[#8A8F98] hover:bg-white/[0.03] cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl bg-white text-black hover:opacity-90 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Quiz"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default SubmitModal;