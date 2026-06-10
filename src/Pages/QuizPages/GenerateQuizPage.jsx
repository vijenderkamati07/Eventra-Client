import { useEffect, useState } from "react";

import SearchBar from "../../Components/GenerateQuiz/SearchBar";
import SubjectGrid from "../../Components/GenerateQuiz/SubjectGrid";

import { findPopularSubject } from "../../Services/quizService";

const GenerateQuizPage = () => {
  const [subjects, setSubjects] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);

      const response = await findPopularSubject();

      if (!response.success) {
        setError(
          response.errors?.[0] ||
            "Failed to load subjects."
        );

        setSubjects([]);

        return;
      }

      setSubjects(response.data.subjects);

      setError("");
    } catch {
      setError(
        "Something went wrong while loading subjects."
      );

      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  return (
          <div className="min-h-screen bg-[#08090A] text-white">
        {/* Background Glow */}
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[600px]
            w-[600px]
            -translate-x-1/2
            rounded-full
            bg-white/[0.02]
            blur-3xl
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-[1280px]
            px-8
            py-14
          "
        >
          {/* Hero */}
          <section>
            <span
              className="
                inline-flex
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
              ✨ AI Quiz Generator
            </span>

            <h1
              className="
                mt-8
                max-w-4xl
                text-5xl
                font-semibold
                leading-tight
                tracking-[-0.04em]
                md:text-6xl
              "
            >
              What would you like
              <br />
              to master today?
            </h1>

            <p
              className="
                mt-6
                max-w-2xl
                text-lg
                leading-8
                text-[#8A8F98]
              "
            >
              Choose a subject and generate quizzes
              tailored to your learning goals.
            </p>

            <div className="mt-10 max-w-2xl">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
          </section>

          {/* Subjects */}
          <section className="mt-20">
            {loading ? (
              <div
                className="
                  rounded-3xl
                  border
                  border-white/[0.06]
                  bg-[#0C0D0F]
                  py-20
                  text-center
                "
              >
                <div className="text-4xl">
                  ⏳
                </div>

                <p
                  className="
                    mt-4
                    text-[#8A8F98]
                  "
                >
                  Discovering subjects for you...
                </p>
              </div>
            ) : error ? (
              <div
                className="
                  rounded-3xl
                  border
                  border-red-500/20
                  bg-red-500/5
                  px-8
                  py-20
                  text-center
                "
              >
                <div className="text-4xl">
                  ⚠️
                </div>

                <h3
                  className="
                    mt-6
                    text-2xl
                    font-semibold
                    text-white
                  "
                >
                  Unable to load subjects
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
                  {error}
                </p>

                <button
                  onClick={fetchSubjects}
                  className="
                    mt-8
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
                  Try Again
                </button>
              </div>
            ) : (
              <SubjectGrid
                subjects={subjects}
                searchTerm={searchTerm}
              />
            )}
          </section>
        </div>
      </div>
    );
};

export default GenerateQuizPage;
