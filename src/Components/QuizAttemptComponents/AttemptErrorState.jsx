
const AttemptErrorState = ({
  title = "Unable to load assessment",
  description = "Something went wrong.",
  onRetry,
  onGoBack,
}) => {
  return (
    <div className="min-h-screen bg-[#08090A] flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-[32px] border border-white/[0.06] bg-[#0C0D0F] p-8 text-center">

        <p className="text-xs uppercase tracking-wide text-[#8A8F98]">
          Assessment Error
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-white">
          {title}
        </h1>

        <p className="mt-4 text-sm leading-6 text-[#8A8F98]">
          {description}
        </p>


        <div className="mt-10 flex flex-col sm:flex-row gap-3">

          <button
            type="button"
            onClick={onGoBack}
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
            Go Back
          </button>


          <button
            type="button"
            onClick={onRetry}
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
            Retry
          </button>

        </div>

      </div>

    </div>
  );
};

export default AttemptErrorState;

