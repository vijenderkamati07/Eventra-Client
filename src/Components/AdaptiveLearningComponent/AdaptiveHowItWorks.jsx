import {
  Brain,
  FileQuestion,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    icon: FileQuestion,
    title: "Attempt Quizzes",
    description:
      "Every completed quiz becomes valuable learning data. Eventra quietly observes how you solve problems and where hesitation begins.",
  },
  {
    icon: Search,
    title: "Patterns Detected",
    description:
      "Instead of looking at isolated mistakes, Eventra identifies recurring behaviors and hidden learning patterns.",
  },
  {
    icon: Brain,
    title: "Weak Concepts Identified",
    description:
      "Repeated struggles reveal concepts requiring additional reinforcement and attention.",
  },
  {
    icon: Sparkles,
    title: "Adaptive Practice Created",
    description:
      "Focused practice is generated around your specific needs rather than generic repetition.",
  },
  {
    icon: TrendingUp,
    title: "Learn Faster",
    description:
      "Targeted improvement helps you build confidence, retain concepts, and progress efficiently.",
  },
];

export default function AdaptiveHowItWorks() {
  return (
    <section className="pb-28">
      <div className="max-w-3xl mx-auto text-center">
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
            text-[#8A8F98]
          "
        >
          How Adaptive Learning Works
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
          Eventra Doesn't Guess.
          <br />
          It Learns.
        </h2>

        <p
          className="
            mt-6
            text-lg
            leading-relaxed
            text-[#8A8F98]
          "
        >
          Adaptive Learning isn't random practice.
          It's a continuous cycle of observation,
          understanding, and focused improvement
          designed around how you actually learn.
        </p>
      </div>

      <div className="relative mt-20">
        {/* Timeline */}
        <div
          className="
            absolute
            left-0
            right-0
            top-10
            hidden
            h-px
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
            xl:block
          "
        />

        <div className="grid gap-6 xl:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border
                  border-white/[0.06]
                  bg-[#0C0D0F]
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-violet-500/20
                "
              >
                {/* Hover Glow */}
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                    bg-gradient-to-br
                    from-violet-500/[0.05]
                    via-transparent
                    to-transparent
                  "
                />

                {/* Step Number */}
                <div
                  className="
                    absolute
                    right-6
                    top-6
                    text-5xl
                    font-bold
                    text-white/[0.04]
                  "
                >
                  0{index + 1}
                </div>

                {/* Icon */}
                <div
                  className="
                    relative
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-violet-500/10
                    text-violet-300
                  "
                >
                  <Icon size={28} />
                </div>

                <h3
                  className="
                    relative
                    mt-8
                    text-xl
                    font-semibold
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    relative
                    mt-4
                    text-sm
                    leading-relaxed
                    text-[#8A8F98]
                  "
                >
                  {step.description}
                </p>              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Explanation */}
 
    </section>
  );
}