import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import SubjectCard from "./SubjectCard";

const SubjectGrid = ({ subjects, searchTerm }) => {
  const navigate = useNavigate();

  const filteredSubjects = subjects.filter((subject) => {
    const query = searchTerm.toLowerCase();

    return (
      subject.name.toLowerCase().includes(query) ||
      subject.description.toLowerCase().includes(query)
    );
  });

  const trendingSubjects = subjects.slice(0, 4);

  if (filteredSubjects.length === 0) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-white/[0.06]
          bg-[#0C0D0F]
          px-8
          py-20
          text-center
        "
      >
        <div className="text-5xl">
          🔍
        </div>

        <h3
          className="
            mt-6
            text-2xl
            font-semibold
            text-white
          "
        >
          Couldn't find a matching subject
        </h3>

        <p
          className="
            mx-auto
            mt-4
            max-w-md
            text-sm
            leading-7
            text-[#8A8F98]
          "
        >
          Generate a quiz on any topic,
          even if it isn't part of our
          current subject library.
        </p>

        <button
          onClick={() => navigate("/quiz/custom")}
          className="
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-white
            px-6
            py-3
            text-sm
            font-medium
            text-black
            transition-all
            duration-200
            hover:bg-white/90
          "
        >
          <Sparkles size={16} />

          Generate Custom Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-14">
      {/* Trending Subjects */}
      {!searchTerm && (
        <section>
          <div className="mb-6">
            <p
              className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-[#8A8F98]
              "
            >
              Trending Subjects
            </p>

            <h3
              className="
                mt-2
                text-2xl
                font-semibold
                tracking-[-0.03em]
                text-white
              "
            >
              Most Popular Right Now
            </h3>
          </div>

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >
            {trendingSubjects.map((subject) => (
              <button
                key={subject._id}
                onClick={() =>
                  navigate(`/subjects/${subject.slug}`)
                }
                className="
                  rounded-full
                  border
                  border-white/[0.06]
                  bg-white/[0.03]
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-white
                  transition-all
                  duration-200
                  hover:border-white/[0.12]
                  hover:bg-white/[0.06]
                "
              >
                {subject.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* All Subjects */}
      <section>
        <div className="mb-8">
          <p
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-[#8A8F98]
            "
          >
            Browse Subjects
          </p>

          <h3
            className="
              mt-2
              text-2xl
              font-semibold
              tracking-[-0.03em]
              text-white
            "
          >
            Discover Topics
          </h3>
        </div>

        <div
          className="
            grid
            gap-6
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >
          {filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject._id}
              subject={subject}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SubjectGrid;