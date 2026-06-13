
const ExitModal = ({
  isOpen,
  isSavingDraft,
  onClose,
  onExit,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-[32px] border border-white/[0.06] bg-[#0C0D0F] p-8">

        <p className="text-xs uppercase tracking-wide text-[#8A8F98]">
          Leave Assessment
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-white">
          Exit this assessment?
        </h2>

        <p className="mt-3 text-sm text-[#8A8F98] leading-6">
          Your progress will be saved and you can continue later.
        </p>


        <div className="mt-10 flex flex-col sm:flex-row gap-3">

          <button
            type="button"
            onClick={onClose}
            disabled={isSavingDraft}
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
              disabled:opacity-50
              disabled:cursor-not-allowed
              cursor-pointer
            "
          >
            Continue Quiz
          </button>


          <button
            type="button"
            onClick={onExit}
            disabled={isSavingDraft}
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
              disabled:opacity-50
              disabled:cursor-not-allowed
              cursor-pointer
            "
          >
            {isSavingDraft
              ? "Saving..."
              : "Save & Exit"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default ExitModal;
