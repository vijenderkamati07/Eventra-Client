import {
  Brain,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

const AICoachFeedback = ({
  attempts = [],
}) => {
  const latestFeedbackAttempt =
    attempts.find(
      (attempt) =>
        attempt.status ===
          "completed" &&
        attempt.feedback?.trim()
    );

  if (!latestFeedbackAttempt) {
    return null;
  }

  const feedback =
    latestFeedbackAttempt.feedback.trim();

  return (
    <section
      className="
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
          items-start
          gap-4
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-blue-500/10
            text-blue-300
          "
        >
          <Brain size={22} />
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
            Coach Notes
          </span>

          <p
            className="
              mt-4
              whitespace-pre-line
              break-words
              leading-7
              text-[#D1D5DB]
            "
          >
            <MessageSquareText
              size={18}
              className="
                mr-2
                inline
                text-blue-300
              "
            />

            {feedback}
          </p>

          <div
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/[0.06]
              bg-white/[0.03]
              px-4
              py-2
              text-xs
              text-[#8A8F98]
            "
          >
            <Sparkles size={14} />

            Generated from your latest completed attempt
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICoachFeedback;