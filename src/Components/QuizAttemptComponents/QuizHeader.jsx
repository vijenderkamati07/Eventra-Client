import { Clock, LogOut } from "lucide-react";

const QuizHeader = ({
  title,
  topic,
  difficulty,
  currentQuestion,
  totalQuestions,
  timeLeft,
  onLeave,
}) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const timerColor =
    timeLeft <= 60
      ? "text-red-400"
      : timeLeft <= 180
      ? "text-yellow-400"
      : "text-white";

  return (
    <header className="sticky top-0 z-20 bg-[#08090A]/95 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left */}
        <div className="min-w-0">
          <h1 className="text-white font-semibold truncate">
            {title}
          </h1>

          <p className="text-sm text-[#8A8F98] capitalize">
            {topic} • {difficulty}
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Question Counter */}
          <div className="hidden sm:flex px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.03] text-sm text-[#8A8F98]">
            {currentQuestion + 1}/{totalQuestions}
          </div>

          {/* Timer */}
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.03] font-mono ${timerColor}`}
          >
            <Clock size={16} />

            <span>{formattedTime}</span>
          </div>

          {/* Leave */}
          <button
            onClick={onLeave}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.06] text-[#8A8F98] hover:bg-white/[0.03] hover:text-white transition-colors cursor-pointer"
          >
            <LogOut size={16} />

            <span className="hidden md:block">
              Leave
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default QuizHeader;