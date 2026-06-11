export default function AdaptiveRequirementsBenefits({
  unlockRequirement,
}) {
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
          Before Eventra Adapts
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
          Great Personalization
          <br />
          Requires Understanding.
        </h2>

        <p
          className="
            mt-6
            text-lg
            leading-relaxed
            text-[#8A8F98]
          "
        >
          Adaptive Learning becomes meaningful only
          when Eventra has enough evidence to understand
          how you learn. Every attempt contributes to
          building that intelligence.
        </p>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        {/* Requirements */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-white/[0.06]
            bg-[#0C0D0F]
            p-8
          "
        >
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-orange-500/[0.05]
              via-transparent
              to-transparent
            "
          />

          <div className="relative z-10">
            <div
              className="
                inline-flex
                rounded-full
                bg-orange-500/10
                px-4
                py-2
                text-sm
                text-orange-300
              "
            >
              Requirements
            </div>

            <h3
              className="
                mt-6
                text-3xl
                font-bold
                tracking-tight
              "
            >
              Eventra Needs
              <br />
              Learning Signals.
            </h3>

            <p
              className="
                mt-5
                leading-relaxed
                text-[#8A8F98]
              "
            >
              Adaptive Learning isn't based on guesses.
              Eventra unlocks personalized practice only
              after collecting enough evidence from your
              learning journey.
            </p>

            {/* Unlock Requirement */}
            <div
              className="
                mt-8
                rounded-2xl
                border
                border-orange-500/20
                bg-orange-500/10
                p-5
              "
            >
              <p
                className="
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-orange-300
                "
              >
                Unlock Requirement
              </p>

              <h4 className="mt-3 text-4xl font-bold">
                {unlockRequirement}
              </h4>

              <p
                className="
                  mt-2
                  text-sm
                  text-[#8A8F98]
                "
              >
                completed quizzes in the same subject.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {[
                "Repeated exposure to concepts.",
                "Multiple completed quiz attempts.",
                "Detectable learning patterns.",
                "Enough evidence for meaningful recommendations.",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-start
                    gap-4
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.02]
                    p-5
                  "
                >
                  <div className="mt-1 text-orange-300">
                    •
                  </div>

                  <p
                    className="
                      leading-relaxed
                      text-[#8A8F98]
                    "
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>        {/* Benefits */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-white/[0.06]
            bg-[#0C0D0F]
            p-8
          "
        >
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-emerald-500/[0.05]
              via-transparent
              to-transparent
            "
          />

          <div className="relative z-10">
            <div
              className="
                inline-flex
                rounded-full
                bg-emerald-500/10
                px-4
                py-2
                text-sm
                text-emerald-300
              "
            >
              Benefits
            </div>

            <h3
              className="
                mt-6
                text-3xl
                font-bold
                tracking-tight
              "
            >
              Learn With
              <br />
              Purpose.
            </h3>

            <p
              className="
                mt-5
                leading-relaxed
                text-[#8A8F98]
              "
            >
              Once Eventra understands how you learn,
              every practice session becomes more focused,
              intentional, and effective.
            </p>

            {/* Highlight */}
            <div
              className="
                mt-8
                rounded-2xl
                border
                border-emerald-500/20
                bg-emerald-500/10
                p-5
              "
            >
              <p
                className="
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-emerald-300
                "
              >
                Eventra Promise
              </p>

              <h4 className="mt-3 text-2xl font-bold">
                Improve What Matters Most.
              </h4>

              <p
                className="
                  mt-3
                  text-sm
                  leading-relaxed
                  text-[#8A8F98]
                "
              >
                Instead of asking you to do more work,
                Eventra helps you spend your effort where
                it creates the greatest impact.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {[
                "Focus on weaknesses instead of random practice.",
                "Avoid repeating concepts you've already mastered.",
                "Improve more efficiently with targeted reinforcement.",
                "Build confidence through visible progress.",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-start
                    gap-4
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.02]
                    p-5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-emerald-500/20
                  "
                >
                  <div
                    className="
                      mt-1
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-emerald-500/10
                      text-sm
                      font-semibold
                      text-emerald-300
                    "
                  >
                    ✓
                  </div>

                  <p
                    className="
                      leading-relaxed
                      text-[#8A8F98]
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
          mt-12
          rounded-[32px]
          border
          border-white/[0.06]
          bg-[#0C0D0F]
          p-8
          text-center
        "
      >
        <p
          className="
            text-sm
            uppercase
            tracking-[0.3em]
            text-violet-300
          "
        >
          The Difference
        </p>

        <h3
          className="
            mt-4
            text-2xl
            font-bold
            tracking-tight
            md:text-3xl
          "
        >
          Adaptive Learning Isn't About
          <br />
          Doing More.
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
          It's about doing the right practice at the
          right time. Eventra turns previous attempts
          into guidance, helping you focus less on
          guessing and more on meaningful improvement.
        </p>
      </div>
    </section>
  );
}