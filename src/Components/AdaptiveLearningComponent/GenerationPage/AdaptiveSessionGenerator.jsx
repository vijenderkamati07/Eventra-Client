import {
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function AdaptiveSessionGenerator({
  generatedQuiz,
  generating,
  handleGenerateSession,
  navigate,
}) {
  return (
    <section className="pb-28">
      <div className="max-w-3xl">
        <div
          className="
            inline-flex
            rounded-full
            border
            border-white/[0.08]
            bg-white/[0.03]
            px-4
            py-2
            text-sm
            text-[#B8BBC2]
          "
        >
          Adaptive Session
        </div>

        <h2
          className="
            mt-6
            text-4xl
            font-bold
            tracking-tight
            md:text-5xl
          "
        >
          {generatedQuiz?.exists
            ? "Your Session Is Ready."
            : "Ready To Begin?"}
        </h2>

        <p
          className="
            mt-6
            max-w-2xl
            text-lg
            leading-relaxed
            text-[#8A8F98]
          "
        >
          {generatedQuiz?.exists
            ? "Eventra has prepared a personalized practice experience based on your learning history."
            : "Generate a personalized adaptive session designed specifically for your current learning needs."}
        </p>

        {generatedQuiz?.exists && (
          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-4
            "
          >
            <div
              className="
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.03]
                px-5
                py-3
                text-sm
              "
            >
              {generatedQuiz.questionCount}
              {" "}Questions
            </div>

            <div
              className="
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.03]
                px-5
                py-3
                text-sm
              "
            >
              ~
              {generatedQuiz.estimatedTime}
              {" "}Minutes
            </div>

            <div
              className="
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.03]
                px-5
                py-3
                text-sm
              "
            >
              Adaptive Difficulty
            </div>
          </div>
        )}

        <button
          onClick={() => {
            if (generatedQuiz?.exists) {
              navigate(
                `/adaptive-attempt/${generatedQuiz.quizId}`
              );
            } else {
              handleGenerateSession();
            }
          }}
          disabled={generating}
          className="
            cursor-pointer
            mt-10
            group
            flex
            items-center
            gap-3
            rounded-full
            bg-white
            px-8
            py-4
            font-medium
            text-black
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-white/90
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >
          {generating ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />

              Generating Session...
            </>
          ) : generatedQuiz?.exists ? (
            <>
              Begin Adaptive Session

              <ArrowRight
                size={18}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </>
          ) : (
            <>
              <Sparkles size={18} />

              Generate Adaptive Session
            </>
          )}
        </button>
      </div>
    </section>
  );
}