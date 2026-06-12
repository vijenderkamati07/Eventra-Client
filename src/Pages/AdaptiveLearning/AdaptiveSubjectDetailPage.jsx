import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Brain,
  Crosshair,
  Loader2,
  Sparkles,
} from "lucide-react";

import {
  getAdaptiveLearningOneSubject,
  postGenerateAdpativeQuiz,
} from "../../Services/adaptiveService";

import AdaptiveBuildProcess from "../../Components/AdaptiveLearningComponent/GenerationPage/AdaptiveBuildProcess";
import AdaptiveFocusAreas from "../../Components/AdaptiveLearningComponent/GenerationPage/AdaptiveFocusAreas";
import AdaptiveLearningSnapshot from "../../Components/AdaptiveLearningComponent/GenerationPage/AdaptiveLearningSnapshot";
import AdaptiveSessionGenerator from "../../Components/AdaptiveLearningComponent/GenerationPage/AdaptiveSessionGenerator";

export default function AdaptiveSubjectDetailPage() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] =
    useState(false);

  const [error, setError] =
    useState("");

  const [subjectData, setSubjectData] =
    useState(null);

  useEffect(() => {
    fetchAdaptiveSubject();
  }, [slug]);

  async function fetchAdaptiveSubject() {
    try {
      setLoading(true);
      setError("");

      const res =
        await getAdaptiveLearningOneSubject(
          slug
        );

      if (!res.success) {
        setError(
          res.errors?.[0] ||
            "Unable to load adaptive learning."
        );

        return;
      }

      setSubjectData(res.data);
    } catch {
      setError(
        "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateSession() {
    try {
      setGenerating(true);

      const res =
        await postGenerateAdpativeQuiz({
          slug,
        });

      if (!res.success) {
        alert(
          res.errors?.[0] ||
            "Unable to generate session."
        );

        return;
      }

      setSubjectData((prev) => ({
        ...prev,
        generatedQuiz: {
          exists: true,
          quizId: res.data.quizId,

          questionCount:
            prev.generatedQuiz
              ?.questionCount || 12,

          estimatedTime:
            prev.generatedQuiz
              ?.estimatedTime || 12,
        },
      }));
    } finally {
      setGenerating(false);
    }
  }

  const focusAreas = Object.entries(
    subjectData?.weakAreas || {}
  )
    .sort((a, b) => b[1] - a[1])
    .map(([topic, count]) => ({
      topic,
      count,
    }));

  function formatSubjectName(slug) {
    return slug
      ?.split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  }

  if (loading) {
    return (
      <section
        className="
          flex
          min-h-[70vh]
          items-center
          justify-center
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            text-[#8A8F98]
          "
        >
          <Loader2
            size={22}
            className="animate-spin"
          />

          <span>
            Preparing adaptive
            learning...
          </span>
        </div>
      </section>
    );
  }

  if (error || !subjectData) {
    return (
      <section
        className="
          flex
          min-h-[70vh]
          items-center
          justify-center
          px-6
        "
      >
        <div
          className="
            max-w-md
            text-center
          "
        >
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-red-500/10
              text-red-400
            "
          >
            ⚠️
          </div>

          <h2
            className="
              mt-6
              text-2xl
              font-bold
            "
          >
            Something went wrong.
          </h2>

          <p
            className="
              mt-4
              leading-relaxed
              text-[#8A8F98]
            "
          >
            {error}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="
              cursor-pointer
              mt-8
              rounded-full
              bg-white
              px-6
              py-3
              font-medium
              text-black
            "
          >
            Go Back
          </button>
        </div>
      </section>
    );
  }  return (
    <main className="pb-32">
      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          pt-10
        "
      >
        {/* Hero */}
        <section className="pb-20">
          <div className="max-w-4xl">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-violet-500/15
                bg-violet-500/10
                px-4
                py-2
                text-sm
                text-violet-300
              "
            >
              <Sparkles size={16} />

              Adaptive Practice
            </div>

            <h1
              className="
                mt-8
                text-5xl
                font-bold
                tracking-tight
                leading-[1.05]
                md:text-7xl
              "
            >
              {formatSubjectName(
                subjectData.slug
              )}

              <br />

              <span
                className="
                  text-[#B8BBC2]
                "
              >
                Built Around You.
              </span>
            </h1>

            <p
              className="
                mt-8
                max-w-3xl
                text-lg
                leading-relaxed
                text-[#8A8F98]
                md:text-xl
              "
            >
              Eventra analyzed your
              previous attempts and
              identified patterns in
              your learning behavior
              to create a more focused
              and intentional practice
              experience.
            </p>

            {/* Hero Metrics */}
            <div
              className="
                mt-12
                flex
                flex-wrap
                gap-4
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.03]
                  px-5
                  py-3
                "
              >
                <Brain
                  size={18}
                  className="
                    text-violet-300
                  "
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
                    Attempts
                  </p>

                  <p
                    className="
                      font-semibold
                    "
                  >
                    {
                      subjectData.attemptCount
                    }{" "}
                    Analysed
                  </p>
                </div>
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.03]
                  px-5
                  py-3
                "
              >
                <Crosshair
                  size={18}
                  className="
                    text-violet-300
                  "
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
                    Accuracy
                  </p>

                  <p
                    className="
                      font-semibold
                    "
                  >
                    {
                      subjectData.latestAccuracy
                    }
                    %
                  </p>
                </div>
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.03]
                  px-5
                  py-3
                "
              >
                <Sparkles
                  size={18}
                  className="
                    text-violet-300
                  "
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
                    Focus Areas
                  </p>

                  <p
                    className="
                      font-semibold
                    "
                  >
                    {focusAreas.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>        {/* Adaptive Session */}
        <AdaptiveSessionGenerator
          generatedQuiz={
            subjectData.generatedQuiz
          }
          generating={generating}
          handleGenerateSession={
            handleGenerateSession
          }
          navigate={navigate}
        />

        {/* Focus Areas */}
        <AdaptiveFocusAreas
          weakAreas={
            subjectData.weakAreas || {}
          }
        />

        {/* Build Process */}
        <AdaptiveBuildProcess
          attemptCount={
            subjectData.attemptCount
          }
          weakAreaCount={
            Object.keys(
              subjectData.weakAreas || {}
            ).length
          }
        />

        {/* Learning Snapshot */}
        <AdaptiveLearningSnapshot
          attemptCount={
            subjectData.attemptCount
          }
          latestAccuracy={
            subjectData.latestAccuracy
          }
          weakAreaCount={
            Object.keys(
              subjectData.weakAreas || {}
            ).length
          }
          subject={formatSubjectName(
            subjectData.slug
          )}
        />        {/* Philosophy Quote */}
        <section
          className="
            pb-12
            pt-8
          "
        >
          <div
            className="
              mx-auto
              max-w-5xl
              text-center
            "
          >
            {/* Decorative Quotes */}
            <span
              className="
                absolute
                left-6
                hidden
                text-8xl
                font-bold
                leading-none
                text-white/[0.04]
                lg:block
              "
            >
              "
            </span>

            <span
              className="
                absolute
                right-6
                hidden
                text-8xl
                font-bold
                leading-none
                text-white/[0.04]
                lg:block
              "
            >
              "
            </span>

            <h2
              className="
                text-4xl
                font-bold
                tracking-tight
                leading-[1.15]
                md:text-5xl
                lg:text-6xl
              "
            >
              Practice isn't about
              repeating what you
              already know.
            </h2>

            <p
              className="
                mt-8
                text-xl
                leading-relaxed
                text-[#8A8F98]
                md:text-2xl
              "
            >
              It's about confronting
              what you don't.
            </p>

            <div
              className="
                mt-12
                flex
                justify-center
              "
            >
              <div
                className="
                  h-px
                  w-24
                  bg-gradient-to-r
                  from-transparent
                  via-white/20
                  to-transparent
                "
              />
            </div>

            <p
              className="
                mt-8
                text-sm
                uppercase
                tracking-[0.45em]
                text-[#B8BBC2]
              "
            >
              EVENTRA
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}