
import {
  Clock,
  Save,
  LogOut,
} from "lucide-react";

const QuizHeader = ({
  title,
  topic,
  difficulty,
  currentQuestion,
  totalQuestions,
  timeLeft,
  originalTimeLimit,
  onLeave,
  onSaveAndExit,
  isSavingDraft,
}) => {
  /*
    timeLeft stored in MINUTES
  */
  const totalSeconds = Math.max(
    Math.floor(timeLeft * 60),
    0
  );

  const minutes = Math.floor(
    totalSeconds / 60
  );

  const seconds =
    totalSeconds % 60;

  const formattedTime = `${String(
    minutes
  ).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  /*
    Percentage-based timer colors
  */
  const percentageLeft =
    originalTimeLimit > 0
      ? (timeLeft /
          originalTimeLimit) *
        100
      : 0;

  let timerClasses =
    "text-white border-white/[0.06]";

  if (percentageLeft <= 10) {
    timerClasses =
      "text-red-400 border-red-500/20 bg-red-500/10";
  } else if (
    percentageLeft <= 25
  ) {
    timerClasses =
      "text-amber-400 border-amber-500/20 bg-amber-500/10";
  }

  /*
    Difficulty colors
  */
  const normalizedDifficulty =
    difficulty?.toLowerCase();

  const difficultyClasses =
    normalizedDifficulty ===
    "easy"
      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
      : normalizedDifficulty ===
        "hard"
      ? "bg-red-500/10 border-red-500/20 text-red-400"
      : "bg-amber-500/10 border-amber-500/20 text-amber-400";

  return (
    <header className="sticky top-0 z-30 bg-[#08090A]/95 backdrop-blur-md border-b border-white/[0.06]">

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-4">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          {/* ================================= */}
          {/* LEFT */}
          {/* ================================= */}

          <div className="min-w-0">

            <h1 className="text-xl md:text-2xl font-semibold text-white truncate">
              {title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2">

              <span className="text-sm text-[#8A8F98] capitalize">
                {topic}
              </span>

              <span
                className={`
                  px-3 py-1 rounded-full border text-xs font-medium capitalize
                  ${difficultyClasses}
                `}
              >
                {difficulty}
              </span>

              <span className="px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.03] text-[#D6D8DC] text-xs font-medium">
                Practice Assessment
              </span>

            </div>

          </div>


          {/* ================================= */}
          {/* RIGHT */}
          {/* ================================= */}

          <div className="flex flex-wrap items-center gap-3">

            {/* Progress */}
            <div className="px-4 py-2 rounded-2xl border border-white/[0.06] bg-[#0C0D0F]">

              <p className="text-[11px] uppercase tracking-wide text-[#8A8F98]">
                Progress
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                Question{" "}
                {currentQuestion + 1}{" "}
                of {totalQuestions}
              </p>

            </div>


            {/* Timer */}
            <div
              className={`
                px-4 py-2 rounded-2xl border bg-[#0C0D0F]
                transition-all duration-300
                ${timerClasses}
              `}
            >

              <div className="flex items-center gap-2">

                <Clock size={18} />

                <div>

                  <p className="text-[11px] uppercase tracking-wide text-[#8A8F98]">
                    Remaining
                  </p>

                  <p className="font-mono font-semibold">
                    {formattedTime}
                  </p>

                </div>

              </div>

            </div>


            {/* Save & Exit */}
            <button
              type="button"
              onClick={
                onSaveAndExit
              }
              disabled={
                isSavingDraft
              }
              className="
                flex items-center gap-2
                px-4 py-3
                rounded-2xl
                border border-white/[0.06]
                bg-[#0C0D0F]
                text-[#D6D8DC]
                hover:bg-white/[0.03]
                hover:-translate-y-1
                transition-all duration-300
                disabled:opacity-50
                disabled:cursor-not-allowed
                cursor-pointer
              "
            >

              <Save size={18} />

              <span className="hidden sm:block">
                {isSavingDraft
                  ? "Saving..."
                  : "Save & Exit"}
              </span>

            </button>


            {/* Leave */}
            <button
              type="button"
              onClick={onLeave}
              className="
                flex items-center gap-2
                px-4 py-3
                rounded-2xl
                border border-white/[0.06]
                bg-[#0C0D0F]
                text-[#D6D8DC]
                hover:bg-white/[0.03]
                hover:text-white
                hover:-translate-y-1
                transition-all duration-300
                cursor-pointer
              "
            >

              <LogOut size={18} />

              <span className="hidden sm:block">
                Leave
              </span>

            </button>

          </div>

        </div>


        {/* ================================= */}
        {/* SHORTCUT HINTS */}
        {/* ================================= */}

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#8A8F98]">

          <span>
            1–4 Select Option
          </span>

          <span>
            ← → Navigate
          </span>

          <span>
            Enter Next
          </span>

          <span>
            Esc Exit
          </span>

        </div>

      </div>

    </header>
  );
};

export default QuizHeader;

