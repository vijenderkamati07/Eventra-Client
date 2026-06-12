import {
  Activity,
  Brain,
  BookOpen,
  Target,
} from "lucide-react";

export default function AdaptiveLearningSnapshot({
  attemptCount,
  latestAccuracy,
  weakAreaCount,
  subject,
}) {
  const snapshots = [
    {
      icon: Brain,
      label: "Attempts",
      value: attemptCount,
      description:
        "Sessions analysed",
    },
    {
      icon: Target,
      label: "Accuracy",
      value: `${latestAccuracy}%`,
      description:
        "Latest performance",
    },
    {
      icon: Activity,
      label: "Weak Areas",
      value: weakAreaCount,
      description:
        "Patterns detected",
    },
    {
      icon: BookOpen,
      label: "Subject",
      value: subject,
      description:
        "Adaptive track",
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
          Learning Snapshot
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
          Your Learning
          <br />
          At A Glance.
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
          A quick overview of the
          information Eventra used
          to personalize this
          adaptive experience.
        </p>
      </div>

      <div
        className="
          mt-16
          grid
          gap-6
          md:grid-cols-2
        "
      >
        {snapshots.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="
                group
                border-b
                border-white/[0.06]
                pb-8
              "
            >
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                "
              >
                <div>
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      text-[#8A8F98]
                    "
                  >
                    <Icon
                      size={16}
                      className="
                        text-violet-300
                      "
                    />

                    {item.label}
                  </div>

                  <h3
                    className="
                      mt-4
                      text-4xl
                      font-bold
                      tracking-tight
                      break-words
                    "
                  >
                    {item.value}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-sm
                      text-[#8A8F98]
                    "
                  >
                    {item.description}
                  </p>
                </div>

                <div
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-violet-400
                    opacity-60
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Insight */}
      <div
        className="
          mt-16
          max-w-3xl
        "
      >
        <p
          className="
            text-xl
            leading-relaxed
            text-[#8A8F98]
          "
        >
          Adaptive learning isn't
          about changing everything.
          It's about identifying the
          few things that deserve
          your attention right now.
        </p>

        <p
          className="
            mt-6
            text-sm
            uppercase
            tracking-[0.35em]
            text-[#B8BBC2]
          "
        >
          Eventra Intelligence
        </p>
      </div>
    </section>
  );
}