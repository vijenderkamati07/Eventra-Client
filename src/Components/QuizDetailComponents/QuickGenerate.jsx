import { Sparkles, Zap } from "lucide-react";
import { useState } from "react";

const QuickGenerate = ({ subject }) => {
  const [difficulty, setDifficulty] =
    useState("adaptive");

  const [questionCount, setQuestionCount] =
    useState(10);

  const difficulties = [
    {
      label: "Easy",
      value: "easy",
    },
    {
      label: "Medium",
      value: "medium",
    },
    {
      label: "Hard",
      value: "hard",
    },
    {
      label: "Adaptive",
      value: "adaptive",
    },
  ];

  const questionOptions = [
    5,
    10,
    20,
    30,
  ];

  const handleGenerate = () => {
    if (!subject?.slug) return;

    /*
      Later:

      navigate("/quiz/generate", {
        state: {
          subject: subject.slug,
          difficulty,
          questionCount,
        },
      });
    */

    console.log({
      subject: subject.slug,
      difficulty,
      questionCount,
    });
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/[0.06]
        bg-[#0C0D0F]
        p-8
        lg:p-10
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          -right-10
          -top-10
          h-64
          w-64
          rounded-full
          bg-white/[0.03]
          blur-3xl
        "
      />

      <div className="relative">
        {/* Header */}
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

          Generate Quiz
        </span>

        <h2
          className="
            mt-6
            text-4xl
            font-semibold
            tracking-[-0.03em]
          "
        >
          Create Your Own
          <br />
          {subject?.name || "Custom"} Quiz
        </h2>

        <p
          className="
            mt-5
            max-w-2xl
            leading-8
            text-[#8A8F98]
          "
        >
          Customize your practice session
          by selecting difficulty and the
          number of questions.
        </p>

        {/* Difficulty */}
        <div className="mt-10">
          <p
            className="
              text-sm
              font-medium
              text-[#D1D5DB]
            "
          >
            Difficulty
          </p>

          <div
            className="
              mt-4
              flex
              flex-wrap
              gap-3
            "
          >
            {difficulties.map((item) => (
              <button
                key={item.value}
                onClick={() =>
                  setDifficulty(item.value)
                }
                className={`
                  cursor-pointer
                  rounded-2xl
                  px-5
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-200

                  ${
                    difficulty === item.value
                      ? "bg-white text-black"
                      : `
                        border
                        border-white/[0.06]
                        bg-white/[0.03]
                        text-white
                        hover:bg-white/[0.05]
                        hover:border-white/[0.12]
                      `
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="mt-10">
          <p
            className="
              text-sm
              font-medium
              text-[#D1D5DB]
            "
          >
            Number of Questions
          </p>

          <div
            className="
              mt-4
              flex
              flex-wrap
              gap-3
            "
          >
            {questionOptions.map(
              (count) => (
                <button
                  key={count}
                  onClick={() =>
                    setQuestionCount(count)
                  }
                  className={`
                    cursor-pointer
                    rounded-2xl
                    px-5
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      questionCount === count
                        ? "bg-white text-black"
                        : `
                          border
                          border-white/[0.06]
                          bg-white/[0.03]
                          text-white
                          hover:bg-white/[0.05]
                          hover:border-white/[0.12]
                        `
                    }
                  `}
                >
                  {count}
                </button>
              )
            )}
          </div>
        </div>

        {/* Summary */}
        <div
          className="
            mt-10
            rounded-3xl
            border
            border-white/[0.06]
            bg-white/[0.03]
            p-6
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div>
              <p
                className="
                  text-sm
                  text-[#8A8F98]
                "
              >
                Ready to generate
              </p>

              <p
                className="
                  mt-2
                  text-xl
                  font-semibold
                "
              >
                {subject?.name || "Custom"}
                {" • "}
                {difficulty.charAt(0).toUpperCase() +
                  difficulty.slice(1)}
                {" • "}
                {questionCount} Questions
              </p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!subject?.slug}
              className="
                inline-flex
                cursor-pointer
                items-center
                justify-center
                gap-2
                rounded-full
                bg-white
                px-8
                py-3.5
                text-sm
                font-semibold
                text-black
                transition-all
                duration-200
                hover:bg-white/90
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Zap size={18} />

              Generate Quiz
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickGenerate;