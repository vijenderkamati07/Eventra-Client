import {
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";

import SubjectHero from "../../Components/QuizDetailComponents/SubjectHero";
import ContinueLearning from "../../Components/QuizDetailComponents/ContinueLearning";
import PopularTopics from "../../Components/QuizDetailComponents/PopularTopics";
import CommunityQuizzes from "../../Components/QuizDetailComponents/CommunityQuizzes";
import LearningInsights from "../../Components/QuizDetailComponents/LearningInsights";
import QuickGenerate from "../../Components/QuizDetailComponents/QuickGenerate";
import AICoachFeedback from "../../Components/QuizDetailComponents/AICoachFeedback";

import { findOneSubject } from "../../Services/quizService";

const SubjectPage = () => {
  const { slug } = useParams();

  const [subject, setSubject] =
    useState(null);

  const [attempts, setAttempts] =
    useState([]);

  const [
    communityQuizzes,
    setCommunityQuizzes,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // Quick Generate Scroll Ref
  const quickGenerateRef =
    useRef(null);

  useEffect(() => {
    fetchSubjectData();
  }, [slug]);

  const fetchSubjectData =
    async () => {
      try {
        setLoading(true);
        setError("");

        const subjectResponse =
          await findOneSubject(
            slug
          );

        if (
          !subjectResponse.success
        ) {
          setError(
            subjectResponse
              .errors?.[0] ||
              "Failed to load subject."
          );

          return;
        }

        setSubject(
          subjectResponse.data
            .subject
        );

        setAttempts(
          subjectResponse.data
            .attempt || []
        );

        setCommunityQuizzes(
          subjectResponse.data
            .communityQuizzes ||
            []
        );
      } catch {
        setError(
          "Something went wrong while loading this subject."
        );
      } finally {
        setLoading(false);
      }
    };

  const scrollToGenerate =
    () => {
      const element =
        quickGenerateRef.current;

      if (!element) return;

      const y =
        element.getBoundingClientRect()
          .top +
        window.pageYOffset -
        100;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    };  return (
    <div className="min-h-screen bg-[#08090A] text-white">
      {/* Background Glow */}
      <div
        className="
          absolute
          left-1/2
          top-0
          h-[700px]
          w-[700px]
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
          px-6
          py-10
          lg:px-8
        "
      >
        {loading ? (
          <div
            className="
              flex
              min-h-[60vh]
              items-center
              justify-center
            "
          >
            <div
              className="
                rounded-3xl
                border
                border-white/[0.06]
                bg-[#0C0D0F]
                px-12
                py-10
                text-center
              "
            >
              <div className="text-4xl">
                ⏳
              </div>

              <p
                className="
                  mt-5
                  text-[#8A8F98]
                "
              >
                Loading subject details...
              </p>
            </div>
          </div>
        ) : error ? (
          <div
            className="
              flex
              min-h-[60vh]
              items-center
              justify-center
            "
          >
            <div
              className="
                max-w-lg
                rounded-3xl
                border
                border-red-500/20
                bg-red-500/5
                px-10
                py-10
                text-center
              "
            >
              <div className="text-4xl">
                ⚠️
              </div>

              <h2
                className="
                  mt-6
                  text-2xl
                  font-semibold
                "
              >
                Unable to load this subject
              </h2>

              <p
                className="
                  mt-4
                  leading-7
                  text-[#8A8F98]
                "
              >
                {error}
              </p>

              <button
                onClick={
                  fetchSubjectData
                }
                className="
                  mt-8
                  cursor-pointer
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
          </div>
        ) : (
          <div className="space-y-8">
            {/* Hero */}
            <SubjectHero
              subject={subject}
              onGenerateQuiz={
                scrollToGenerate
              }
            />

            {/* Continue Learning */}
            {attempts.length > 0 && (
              <ContinueLearning
                attempts={
                  attempts
                }
              />
            )}

            {/* Community + Topics */}
            <div
              className="
                grid
                gap-8
                lg:grid-cols-3
              "
            >
              {/* Community */}
              <div className="lg:col-span-2">
                <CommunityQuizzes
                  quizzes={
                    communityQuizzes
                  }
                  onGenerateQuiz={
                    scrollToGenerate
                  }
                />
              </div>

              {/* Topics */}
              <div>
                <PopularTopics
                  subtopics={
                    subject?.subtopics ||
                    []
                  }
                  onGenerateQuiz={
                    scrollToGenerate
                  }
                />
              </div>
            </div>

            {/* Generate Quiz */}
            <div
              ref={
                quickGenerateRef
              }
            >
              <QuickGenerate
                subject={subject}
              />
            </div>

            {/* Learning Insights */}
            {attempts.length >
              0 && (
              <LearningInsights
                attempts={
                  attempts
                }
              />
            )}

            {/* AI Coach Feedback */}
            {attempts.length >
              0 && (
              <AICoachFeedback
                attempts={
                  attempts
                }
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectPage;