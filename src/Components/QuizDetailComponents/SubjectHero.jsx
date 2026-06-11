import { Brain, Sparkles, TrendingUp } from "lucide-react";

const SubjectHero = ({ subject, onGenerateQuiz }) => {
  const subjectName = subject?.name || "Subject";

  const description =
    subject?.description ||
    "Master concepts through adaptive quizzes and personalized practice.";

  const popularity = subject?.popularity ?? 0;

  const subtopicCount = Array.isArray(subject?.subtopics)
    ? subject.subtopics.length
    : 0;

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/[0.06]
        bg-[#0C0D0F]
        px-8
        py-10
        lg:px-12
        lg:py-12
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          right-0
          top-0
          h-48
          w-48
          rounded-full
          bg-white/[0.03]
          blur-3xl
        "
      />

      <div className="relative">
        {/* Top Badges */}
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          {subject?.isSystemSubject && (
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-500/20
                bg-emerald-500/10
                px-4
                py-2
                text-xs
                font-medium
                text-emerald-300
              "
            >
              <Sparkles size={14} />
              Core Subject
            </span>
          )}

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/[0.08]
              bg-white/[0.03]
              px-4
              py-2
              text-xs
              font-medium
              text-[#D1D5DB]
            "
          >
            <TrendingUp size={14} />
            Popularity: {popularity}
          </span>
        </div>

        {/* Subject Name */}
        <h1
          className="
            mt-8
            text-5xl
            font-semibold
            tracking-[-0.04em]
            md:text-6xl
          "
        >
          {subjectName}
        </h1>

        {/* Description */}
        <p
          className="
            mt-6
            max-w-2xl
            text-lg
            leading-8
            text-[#8A8F98]
          "
        >
          {description}
        </p>

        {/* Stats */}
        <div
          className="
            mt-10
            flex
            flex-wrap
            gap-4
          "
        >
          <div
            className="
              rounded-2xl
              border
              border-white/[0.06]
              bg-white/[0.03]
              px-5
              py-4
            "
          >
            <p
              className="
                text-xs
                uppercase
                tracking-[0.18em]
                text-[#8A8F98]
              "
            >
              Topics
            </p>

            <p
              className="
                mt-2
                text-2xl
                font-semibold
              "
            >
              {subtopicCount}
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-white/[0.06]
              bg-white/[0.03]
              px-5
              py-4
            "
          >
            <p
              className="
                text-xs
                uppercase
                tracking-[0.18em]
                text-[#8A8F98]
              "
            >
              Learning
            </p>

            <div
              className="
                mt-2
                flex
                items-center
                gap-2
              "
            >
              <Brain size={18} />

              <span className="font-medium">Adaptive Ready</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div
          className="
            mt-10
            flex
            flex-wrap
            gap-4
          "
        >
          <button
          onClick={onGenerateQuiz}
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
              duration-200
              hover:bg-white/90
            "
          >
            Generate Quiz
          </button>

          <button
            className="
              cursor-pointer
              rounded-full
              border
              border-white/[0.08]
              bg-white/[0.03]
              px-7
              py-3.5
              text-sm
              font-medium
              text-white
              transition-all
              duration-200
              hover:bg-white/[0.06]
            "
          >
            Adaptive Practice
          </button>
        </div>
      </div>
    </section>
  );
};

export default SubjectHero;
