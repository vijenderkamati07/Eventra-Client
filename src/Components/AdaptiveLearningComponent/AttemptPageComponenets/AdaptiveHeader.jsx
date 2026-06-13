import {
  Clock3,
  LogOut,
} from "lucide-react";

export default function AdaptiveHeader({
  topic,
  currentQuestionIndex,
  totalQuestions,
  formattedTime,
  timerColor,
  onExit,
}) {
  return (
    <header
      className="
        flex
        flex-col
        gap-6
        border-b
        border-white/[0.06]
        pb-8
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* Left */}
      <div>
        <p
          className="
            text-sm
            uppercase
            tracking-[0.25em]
            text-[#8A8F98]
          "
        >
          Adaptive Session
        </p>

        <h1
          className="
            mt-3
            text-3xl
            font-bold
            tracking-tight
            md:text-4xl
          "
        >
          {topic}
        </h1>

        <p
          className="
            mt-3
            text-[#8A8F98]
          "
        >
          Question{" "}
          <span className="font-semibold text-white">
            {currentQuestionIndex + 1}
          </span>
          {" "}of{" "}
          <span className="font-semibold text-white">
            {totalQuestions}
          </span>
        </p>
      </div>

      {/* Right */}
      <div
        className="
          flex
          flex-wrap
          items-center
          gap-4
        "
      >
        {/* Timer */}
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <Clock3
            size={18}
            className={timerColor}
          />

          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-[0.2em]
                text-[#8A8F98]
              "
            >
              Remaining
            </p>

            <p
              className={`
                mt-1
                text-2xl
                font-bold
                ${timerColor}
              `}
            >
              {formattedTime}
            </p>
          </div>
        </div>

        {/* Exit */}        <button
          onClick={onExit}
          className="
            cursor-pointer
            flex
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
            hover:border-rose-500/20
            hover:bg-rose-500/[0.05]
            hover:text-rose-300
          "
        >
          <LogOut size={16} />

          Save & Exit
        </button>
      </div>
    </header>
  );
}