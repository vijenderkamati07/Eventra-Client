export default function AdaptiveComparison() {
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
          The Eventra Difference
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
          Most Systems Measure.
          <br />
          Eventra Responds.
        </h2>

        <p
          className="
            mt-6
            text-lg
            leading-relaxed
            text-[#8A8F98]
          "
        >
          Traditional platforms tell you whether
          you succeeded or failed. Eventra uses
          those outcomes to understand how you
          learn and guide what happens next.
        </p>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        {/* Traditional Learning */}
        <div
          className="
            group
            rounded-[32px]
            border
            border-white/[0.06]
            bg-[#0C0D0F]
            p-8
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-red-500/20
          "
        >
          <div
            className="
              inline-flex
              rounded-full
              bg-red-500/10
              px-4
              py-2
              text-sm
              text-red-300
            "
          >
            Traditional Learning
          </div>

          <h3
            className="
              mt-8
              text-3xl
              font-bold
              tracking-tight
            "
          >
            Repeat The
            <br />
            Same Cycle.
          </h3>

          <p
            className="
              mt-5
              leading-relaxed
              text-[#8A8F98]
            "
          >
            The same content is repeated regardless
            of whether it helps you improve.
          </p>

          <div className="mt-10 space-y-5">
            {[
              "Same quizzes",
              "Same mistakes",
              "Generic practice",
              "Slow improvement",
            ].map((item) => (
              <div
                key={item}
                className="
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-white/[0.02]
                  px-6
                  py-5
                "
              >
                <p
                  className="
                    text-lg
                    text-[#8A8F98]
                  "
                >
                  {item}
                </p>
              </div>
            ))}            </div>
          </div>

          {/* Eventra Adaptive */}
          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-violet-500/20
              bg-[#0C0D0F]
              p-8
              transition-all
              duration-300
              hover:-translate-y-1
            "
          >
            {/* Premium Glow */}
            <div
              className="
                absolute
                inset-0
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
                bg-gradient-to-br
                from-violet-500/[0.06]
                via-transparent
                to-transparent
              "
            />

            <div className="relative z-10">
              <div
                className="
                  inline-flex
                  rounded-full
                  bg-violet-500/10
                  px-4
                  py-2
                  text-sm
                  text-violet-300
                "
              >
                Eventra Adaptive
              </div>

              <h3
                className="
                  mt-8
                  text-3xl
                  font-bold
                  tracking-tight
                "
              >
                Learn From
                <br />
                Every Mistake.
              </h3>

              <p
                className="
                  mt-5
                  leading-relaxed
                  text-[#8A8F98]
                "
              >
                Mistakes become signals that shape
                your next learning experience instead
                of simply ending the session.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  "Patterns detected",
                  "Weak concepts reinforced",
                  "Personalized practice",
                  "Faster progress",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      rounded-2xl
                      border
                      border-white/[0.06]
                      bg-white/[0.02]
                      px-6
                      py-5
                    "
                  >
                    <p
                      className="
                        text-lg
                        text-white
                      "
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
                The Eventra Difference
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
                The Goal Isn't More Practice.
                <br />
                It's Better Practice.
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
                Most systems measure performance.
                Eventra responds to it.
                <br />
                <br />
                Instead of treating mistakes as
                failures, Eventra treats them as
                signals that guide your next step.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
}