
const ResumeDraftModal = ({
  isOpen,
  draftData,
  onResume,
  onStartFresh,
}) => {
  if (!isOpen || !draftData) {
    return null;
  }

  const answeredCount =
    draftData.attemptedQuestionWithAnswers.filter(
      (item) =>
        item?.answer !== undefined &&
        item?.answer !== null
    ).length;

  const totalSeconds = Math.max(
    Math.floor(
      draftData.remainingTime * 60
    ),
    0
  );

  const minutes = Math.floor(
    totalSeconds / 60
  );

  const seconds =
    totalSeconds % 60;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-[32px] border border-white/[0.06] bg-[#0C0D0F] p-8">

        <p className="text-xs uppercase tracking-wide text-[#8A8F98]">
          Resume Assessment
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-white">
          Continue where you left off?
        </h2>

        <p className="mt-3 text-sm text-[#8A8F98] leading-6">
          We found a saved practice assessment.
        </p>


        <div className="mt-8 space-y-4">

          <div className="flex justify-between">

            <span className="text-[#8A8F98]">
              Answered
            </span>

            <span className="font-medium text-white">
              {answeredCount}/
              {draftData.totalQuestion}
            </span>

          </div>


          <div className="flex justify-between">

            <span className="text-[#8A8F98]">
              Resume From
            </span>

            <span className="font-medium text-white">
              Question{" "}
              {draftData.currentQuestionIndex + 1}
            </span>

          </div>


          <div className="flex justify-between">

            <span className="text-[#8A8F98]">
              Time Remaining
            </span>

            <span className="font-medium text-white">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </span>

          </div>

        </div>


        <div className="mt-10 flex flex-col sm:flex-row gap-3">

          <button
            type="button"
            onClick={onStartFresh}
            className="
              flex-1
              px-4 py-3
              rounded-2xl
              border border-white/[0.06]
              bg-white/[0.02]
              text-[#D6D8DC]
              hover:bg-white/[0.03]
              hover:-translate-y-1
              transition-all duration-300
              cursor-pointer
            "
          >
            Start Over
          </button>


          <button
            type="button"
            onClick={onResume}
            className="
              flex-1
              px-4 py-3
              rounded-2xl
              bg-white
              text-black
              font-medium
              hover:opacity-90
              hover:-translate-y-1
              transition-all duration-300
              cursor-pointer
            "
          >
            Resume Assessment
          </button>

        </div>

      </div>

    </div>
  );
};

export default ResumeDraftModal;

