import {
  Brain,
  Sparkles,
  Target,
} from "lucide-react";

export default function AdaptiveBuildProcess({
  attemptCount,
  weakAreaCount,
}) {
  const steps = [
    {
      icon: Brain,
      title: "Previous Attempts",
      description: `${attemptCount} learning sessions analysed to understand how you approach this subject.`,
    },
    {
      icon: Target,
      title: "Patterns Detected",
      description: `${weakAreaCount} recurring weak areas were identified from your responses.`,
    },
    {
      icon: Sparkles,
      title: "Session Generated",
      description:
        "Eventra prepares questions designed specifically to reinforce those concepts.",
    },
  ];

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
          How Eventra Built This Session
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
          From Attempts
          <br />
          To Intention.
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
          Adaptive practice isn't random.
          Every session is shaped by
          patterns revealed through your
          previous learning experiences.
        </p>
      </div>

      <div
        className="
          mt-16
          flex
          flex-col
          gap-10
          lg:flex-row
          lg:items-start
          lg:justify-between
        "
      >
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="
                relative
                flex-1
              "
            >
              {/* Connector */}
              {index !== steps.length - 1 && (
                <div
                  className="
                    absolute
                    left-8
                    top-8
                    hidden
                    h-px
                    w-[calc(100%-2rem)]
                    bg-gradient-to-r
                    from-white/15
                    to-transparent
                    lg:block
                  "
                />
              )}

              <div className="relative z-10">
                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-white/[0.03]
                  "
                >
                  <Icon
                    size={28}
                    className="text-violet-300"
                  />
                </div>

                <h3
                  className="
                    mt-8
                    text-2xl
                    font-semibold
                    tracking-tight
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    mt-4
                    max-w-sm
                    leading-relaxed
                    text-[#8A8F98]
                  "
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}