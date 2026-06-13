export default function AdaptiveDraftModal({
  open,
  topic,
  currentQuestionIndex,
  totalQuestion,
  remainingTime,
  lastSavedAt,
  onResume,
  onStartFresh,
}) {
  /*
  ==================================================
  SAFETY
  ==================================================
  */

  if (!open) {
    return null;
  }

  /*
  ==================================================
  HELPERS
  ==================================================
  */

  const formattedTime =
    `${Math.floor(
      remainingTime
    )}:${String(
      Math.floor(
        (remainingTime % 1) * 60
      )
    ).padStart(2, "0")}`;

  const formattedDate =
    new Date(
      lastSavedAt
    ).toLocaleString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
      }
    );

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        px-6
      "
    >
      {/* Backdrop */}
      <div
        className="
          absolute
          inset-0
          bg-black/60
          backdrop-blur-sm
        "
      />

      {/* Modal */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-xl
          rounded-[32px]
          border
          border-white/[0.06]
          bg-[#0F1012]
          p-8
          md:p-10
        "
      >
        {/* Badge */}
        <div
          className="
            inline-flex
            items-center
            rounded-full
            bg-violet-500/[0.08]
            px-4
            py-2
            text-sm
            font-medium
            text-violet-400
          "
        >
          Adaptive Session Found
        </div>

        {/* Heading */}
        <h2
          className="
            mt-8
            text-4xl
            font-bold
            tracking-tight
          "
        >
          Resume Your Progress
        </h2>

        <p
          className="
            mt-4
            max-w-lg
            leading-relaxed
            text-[#8A8F98]
          "
        >
          We found an unfinished
          adaptive session and saved
          your progress automatically.
        </p>

        {/* Topic */}
        <div className="mt-10">
          <p
            className="
              text-sm
              uppercase
              tracking-[0.25em]
              text-[#8A8F98]
            "
          >
            Subject
          </p>

          <p
            className="
              mt-2
              text-3xl
              font-bold
            "
          >
            {topic}
          </p>
        </div>

        {/* Stats */}
        <div
          className="
            mt-10
            grid
            gap-8
            sm:grid-cols-3
          "
        >
          <div>
            <p
              className="
                text-sm
                uppercase
                tracking-[0.2em]
                text-[#8A8F98]
              "
            >
              Progress
            </p>

            <p
              className="
                mt-2
                text-2xl
                font-bold
              "
            >
              {currentQuestionIndex + 1}
              /{totalQuestion}
            </p>
          </div>

          <div>
            <p
              className="
                text-sm
                uppercase
                tracking-[0.2em]
                text-[#8A8F98]
              "
            >
              Remaining
            </p>

            <p
              className="
                mt-2
                text-2xl
                font-bold
              "
            >
              {formattedTime}
            </p>
          </div>

          <div>
            <p
              className="
                text-sm
                uppercase
                tracking-[0.2em]
                text-[#8A8F98]
              "
            >
              Last Saved
            </p>

            <p
              className="
                mt-2
                text-lg
                font-semibold
              "
            >
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Actions */}        <div
          className="
            mt-12
            flex
            flex-col-reverse
            gap-4
            sm:flex-row
            sm:justify-end
          "
        >
          {/* Start Fresh */}
          <button
            onClick={onStartFresh}
            className="
              cursor-pointer
              rounded-full
              border
              border-white/[0.08]
              px-6
              py-3.5
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
            Start Fresh
          </button>

          {/* Resume */}
          <button
            onClick={onResume}
            className="
              cursor-pointer
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
            Resume Session
          </button>
        </div>

        {/* Helper Text */}
        <p
          className="
            mt-8
            text-center
            text-sm
            leading-relaxed
            text-[#8A8F98]
          "
        >
          Resuming will restore your saved answers,
          remaining time, and question position exactly
          as you left them.
        </p>
      </div>
    </div>
  );
}