import {
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";

const PopularTopics = ({
  subtopics = [],
   onGenerateQuiz
}) => {
  const normalizedTopics = subtopics
    .map((topic) => {
      if (typeof topic === "string") {
        return {
          key: topic,
          name: topic.trim(),
        };
      }

      return {
        key: topic?._id || topic?.name,
        name: topic?.name?.trim() || "",
      };
    })
    .filter((topic) => topic.name)
    .slice(0, 8);

  /*
    Empty State
  */
  if (normalizedTopics.length === 0) {
    return (
<section
  className="
    flex
    h-full
    w-full
    flex-col
    rounded-[28px]
    border
    border-white/[0.06]
    bg-[#0C0D0F]
    p-6
  "
>
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-white/[0.03]
          "
        >
          <BookOpen size={22} />
        </div>

        <span
          className="
            mt-6
            block
            text-xs
            uppercase
            tracking-[0.2em]
            text-[#8A8F98]
          "
        >
          Practice Topics
        </span>

        <h2
          className="
            mt-3
            text-2xl
            font-semibold
          "
        >
          Topics Coming Soon
        </h2>

        <p
          className="
            mt-4
            leading-7
            text-[#8A8F98]
          "
        >
          This subject doesn't have
          topic recommendations yet.
        </p>

        <button
         onClick={onGenerateQuiz}
          className="
            mt-8
            inline-flex
            cursor-pointer
            items-center
            gap-2
            rounded-full
            bg-white
            px-5
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

          Generate Quiz
        </button>
      </section>
    );
  }

  return (
<section
  className="
    min-h-[460px]
    max-h-[730]
    rounded-[28px]
    border
    border-white/[0.06]
    bg-[#0C0D0F]
    p-6
  "
>
      {/* Header */}
      <div>
        <span
          className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-[#8A8F98]
          "
        >
          Practice Topics
        </span>

        <h2
          className="
            mt-3
            text-2xl
            font-semibold
          "
        >
          Focus Areas
        </h2>

        <p
          className="
            mt-3
            text-sm
            leading-6
            text-[#8A8F98]
          "
        >
          Practice concepts
          individually to improve
          mastery.
        </p>
      </div>

      {/* Topics List */}
      <div
        className="
          mt-8
          flex-1
          overflow-y-auto
          pr-2
        "
      >
        {normalizedTopics.map(
          (topic, index) => (
            <button
              key={topic.key}
              className={`
                group
                flex
                w-full
                cursor-pointer
                items-center
                justify-between
                rounded-2xl
                px-4
                py-3
                text-left
                transition-all
                duration-200
                hover:bg-white/[0.03]

                ${
                  index !==
                  normalizedTopics.length - 1
                    ? "mb-1"
                    : ""
                }
              `}
            >
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/[0.03]
                    text-sm
                  "
                >
                  📚
                </div>

                <span
                  className="
                    truncate
                    font-medium
                    text-[#D1D5DB]
                    transition-colors
                    duration-200
                    group-hover:text-white
                  "
                >
                  {topic.name}
                </span>
              </div>

              <ArrowRight
                size={16}
                className="
                  shrink-0
                  text-[#8A8F98]
                  transition-all
                  duration-200
                  group-hover:translate-x-1
                  group-hover:text-white
                "
              />
            </button>
          )
        )}
      </div>
    </section>
  );
};

export default PopularTopics;