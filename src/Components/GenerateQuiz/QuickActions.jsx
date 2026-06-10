import {
  ArrowRight,
  Brain,
  Sparkles,
  Target,
  Play,
} from "lucide-react";

const actions = [
  {
    title: "Continue Learning",
    description:
      "Resume where you left off and continue your progress.",
    icon: Play,
    badge: "Resume",
  },
  {
    title: "Weak Areas",
    description:
      "Focus on concepts that need more practice.",
    icon: Target,
    badge: "Recommended",
  },
  {
    title: "Adaptive Quiz",
    description:
      "AI adjusts difficulty as you improve.",
    icon: Brain,
    badge: "Smart",
  },
  {
    title: "Custom Quiz",
    description:
      "Build a quiz exactly the way you want.",
    icon: Sparkles,
    badge: "Popular",
  },
];

const QuickActions = () => {
  return (
    <section>
      {/* Heading */}
      <div className="mb-6">
        <p
          className="
            text-xs
            uppercase
            tracking-[0.25em]
            text-[#8A8F98]
          "
        >
          Quick Actions
        </p>

        <h2
          className="
            mt-2
            text-2xl
            font-semibold
            tracking-[-0.03em]
            text-white
          "
        >
          Learn Smarter
        </h2>
      </div>

      {/* Cards */}
      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/[0.06]
                bg-[#0C0D0F]
                p-6
                text-left
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-white/[0.12]
                hover:bg-[#101114]
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
              "
            >
              {/* Glow */}
              <div
                className="
                  absolute
                  right-0
                  top-0
                  h-24
                  w-24
                  rounded-full
                  bg-white/[0.03]
                  blur-3xl
                  transition-all
                  duration-300
                  group-hover:bg-white/[0.05]
                "
              />

              {/* Badge */}
              <span
                className="
                  inline-flex
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.03]
                  px-3
                  py-1
                  text-[11px]
                  font-medium
                  text-[#D1D5DB]
                "
              >
                {action.badge}
              </span>

              {/* Icon */}
              <div
                className="
                  mt-5
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/[0.04]
                "
              >
                <Icon
                  size={22}
                  className="
                    text-white
                  "
                />
              </div>

              {/* Content */}
              <h3
                className="
                  mt-6
                  text-lg
                  font-semibold
                  text-white
                "
              >
                {action.title}
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-[#8A8F98]
                "
              >
                {action.description}
              </p>

              {/* CTA */}
              <div
                className="
                  mt-8
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-white
                "
              >
                Explore

                <ArrowRight
                  size={16}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;