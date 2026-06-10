import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CommunityQuizzes = ({
  quizzes = [],
}) => {
  const previewQuizzes = quizzes.slice(
    0,
    6
  );

  console.log(
    "Quizzes inside ",
    previewQuizzes
  );

  const navigate = useNavigate();

  const [selectedQuiz, setSelectedQuiz] =
    useState(null);

  const formatDate = (date) => {
    if (!date) return "Recently";

    const diff = Math.floor(
      (Date.now() -
        new Date(date)) /
        (1000 * 60 * 60 * 24)
    );

    if (diff === 0) return "Today";

    if (diff === 1)
      return "Yesterday";

    if (diff < 7) {
      return `${diff} days ago`;
    }

    return new Date(
      date
    ).toLocaleDateString();
  };

  const difficultyStyles = {
    easy:
      "bg-emerald-500/10 text-emerald-300",

    medium:
      "bg-yellow-500/10 text-yellow-300",

    hard:
      "bg-red-500/10 text-red-300",
  };

  const handleClick = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleStartQuiz = () => {
    if (!selectedQuiz) return;

    navigate(
      `/subjects/attempt/${selectedQuiz._id}`
    );

    setSelectedQuiz(null);
  };

  if (quizzes.length === 0) {
    return (
      <section
        className="
          rounded-[28px]
          border
          border-white/[0.06]
          bg-[#0C0D0F]
          p-8
        "
      >
        <div className="flex gap-5">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-white/[0.03]
            "
          >
            <Users size={24} />
          </div>

          <div className="flex-1">
            <span
              className="
                text-xs
                uppercase
                tracking-[0.2em]
                text-[#8A8F98]
              "
            >
              Community Quizzes
            </span>

            <h2
              className="
                mt-3
                text-2xl
                font-semibold
              "
            >
              Be the First Explorer 🚀
            </h2>

            <p
              className="
                mt-3
                max-w-xl
                leading-7
                text-[#8A8F98]
              "
            >
              No quizzes exist for this
              subject yet. Create the
              first one and help future
              learners.
            </p>

            <button
              className="
                mt-8
                inline-flex
                cursor-pointer
                items-center
                gap-2
                rounded-full
                bg-white
                px-6
                py-3
                text-sm
                font-semibold
                text-black
                transition-all
                duration-200
                hover:bg-white/90
              "
            >
              <Sparkles size={16} />
              Generate First Quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="
        min-h-[460px]
        h-[730px]
        max-h-[730px]
        rounded-[28px]
        border
        border-white/[0.06]
        bg-[#0C0D0F]
        p-8
      "
    >
      {/* Header */}
      <div
        className="
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-end
          md:justify-between
        "
      >
        <div>
          <span
            className="
              text-xs
              uppercase
              tracking-[0.2em]
              text-[#8A8F98]
            "
          >
            Community Quizzes
          </span>

          <h2
            className="
              mt-3
              text-3xl
              font-semibold
              tracking-[-0.03em]
            "
          >
            Learn With The Community
          </h2>

          <p
            className="
              mt-3
              max-w-2xl
              leading-7
              text-[#8A8F98]
            "
          >
            Discover quizzes created by
            other learners and practice
            from different perspectives.
          </p>
        </div>

        {quizzes.length > 6 && (
          <button
            className="
              inline-flex
              cursor-pointer
              items-center
              gap-2
              text-sm
              font-medium
              text-white
              transition-colors
              duration-200
              hover:text-[#D1D5DB]
            "
          >
            View All

            <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Quiz List */}
      <div
        className="
          mt-8
          space-y-1
        "
      >
        {previewQuizzes.map(
          (quiz, index) => {
            const difficulty =
              quiz.difficulty?.toLowerCase();

            return (
              <button
                key={
                  quiz._id || index
                }
                onClick={() =>
                  handleClick(quiz)
                }
                className="
                  group
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-transparent
                  px-5
                  py-3
                  text-left
                  transition-colors
                  duration-200
                  hover:border-white/[0.06]
                  hover:bg-white/[0.03]
                "
              >                {/* Left */}
                <div className="min-w-0">
                  <div
                    className="
                      flex
                      min-w-0
                      flex-wrap
                      items-center
                      gap-3
                    "
                  >
                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${
                          difficultyStyles[
                            difficulty
                          ] ||
                          "bg-blue-500/10 text-blue-300"
                        }
                      `}
                    >
                      {difficulty
                        ? difficulty
                            .charAt(0)
                            .toUpperCase() +
                          difficulty.slice(
                            1
                          )
                        : "Quiz"}
                    </span>

                    <h3
                      className="
                        truncate
                        text-lg
                        font-semibold
                      "
                    >
                      {quiz.title ||
                        "Untitled Quiz"}
                    </h3>
                  </div>

                  <div
                    className="
                      mt-2
                      flex
                      flex-wrap
                      items-center
                      gap-4
                      text-sm
                      text-[#8A8F98]
                    "
                  >
                    <span>
                      by{" "}
                      <span className="text-[#D1D5DB]">
                        {quiz.userId
                          ?.firstName ||
                          "Anonymous"}
                      </span>
                    </span>

                    <span
                      className="
                        flex
                        items-center
                        gap-1.5
                      "
                    >
                      <BookOpen
                        size={14}
                      />

                      {quiz.questionCount ??
                        quiz.questions
                          ?.length ??
                        0}
                    </span>

                    <span>
                      {formatDate(
                        quiz.createdAt
                      )}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div
                  className="
                    ml-6
                    flex
                    shrink-0
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  Start Quiz

                  <ArrowRight
                    size={16}
                    className="
                      transition-transform
                      duration-200
                      group-hover:translate-x-1
                    "
                  />
                </div>
              </button>
            );
          }
        )}
      </div>

      {/* Start Quiz Modal */}
      {selectedQuiz && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/60
            backdrop-blur-sm
            px-4
          "
        >
          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              border
              border-white/[0.06]
              bg-[#0C0D0F]
              p-6
            "
          >
            <h2
              className="
                text-xl
                font-semibold
                text-white
              "
            >
              Start Quiz?
            </h2>

            <p
              className="
                mt-3
                leading-7
                text-[#8A8F98]
              "
            >
              You are about to start{" "}
              <span className="text-white">
                {selectedQuiz.title}
              </span>
              . The timer will begin
              immediately after entering
              the quiz.
            </p>

            <div
              className="
                mt-5
                space-y-2
                text-sm
                text-[#8A8F98]
              "
            >
              <p>
                Difficulty:{" "}
                <span
                  className="
                    capitalize
                    text-white
                  "
                >
                  {
                    selectedQuiz.difficulty
                  }
                </span>
              </p>

              <p>
                Questions:{" "}
                <span className="text-white">
                  {selectedQuiz.questionCount ??
                    selectedQuiz.questions
                      ?.length ??
                    0}
                </span>
              </p>
            </div>

            <div
              className="
                mt-8
                flex
                justify-end
                gap-3
              "
            >
              <button
                onClick={() =>
                  setSelectedQuiz(
                    null
                  )
                }
                className="
                  cursor-pointer
                  rounded-xl
                  border
                  border-white/[0.06]
                  px-4
                  py-2
                  text-[#8A8F98]
                  hover:bg-white/[0.03]
                "
              >
                Cancel
              </button>

              <button
                onClick={
                  handleStartQuiz
                }
                className="
                  cursor-pointer
                  rounded-xl
                  bg-white
                  px-4
                  py-2
                  text-black
                  hover:bg-white/90
                "
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommunityQuizzes;