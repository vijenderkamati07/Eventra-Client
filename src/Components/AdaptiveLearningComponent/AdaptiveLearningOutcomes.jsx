export default function AdaptiveLearningOutcomes() {
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
          Learning Outcomes
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
          What Better Practice
          <br />
          Actually Delivers.
        </h2>

        <p
          className="
            mt-6
            text-lg
            leading-relaxed
            text-[#8A8F98]
          "
        >
          Adaptive Learning isn't designed to give you
          more work. It's designed to help you make
          meaningful progress with every learning session.
        </p>
      </div>


      {/* Bottom Reinforcement */}
      <div
        className="
          mt-16
          overflow-hidden
          rounded-[32px]
          border
          border-white/[0.06]
          bg-[#0C0D0F]
          p-8
          md:p-10
        "
      >
        <div
          className="
            relative
            rounded-[28px]
            border
            border-white/[0.04]
            bg-white/[0.02]
            p-8
          "
        >
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-violet-500/[0.04]
              via-transparent
              to-sky-500/[0.04]
            "
          />

          <div className="relative z-10 text-center">
            <p
              className="
                text-sm
                uppercase
                tracking-[0.3em]
                text-violet-300
              "
            >
              The Outcome
            </p>

            <h3
              className="
                mt-5
                text-2xl
                font-bold
                tracking-tight
                md:text-3xl
              "
            >
              Learning Should Feel
              <br />
              More Intentional.
            </h3>

            <p
              className="
                mx-auto
                mt-6
                max-w-3xl
                leading-relaxed
                text-[#8A8F98]
              "
            >
              Adaptive Learning reduces uncertainty by
              helping you focus on what matters most.
              Instead of trying to improve everything at
              once, Eventra guides you toward the next
              meaningful step.
            </p>

            <div
              className="
                mt-10
                grid
                gap-4
                md:grid-cols-3
              "
            >
              {[
                {
                  title: "Clarity",
                  description:
                    "Know exactly where to direct your effort.",
                },
                {
                  title: "Momentum",
                  description:
                    "Build progress through focused improvement.",
                },
                {
                  title: "Confidence",
                  description:
                    "Trust the process because every step has purpose.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.02]
                    p-5
                  "
                >
                  <h4 className="font-semibold">
                    {item.title}
                  </h4>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-relaxed
                      text-[#8A8F98]
                    "
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}