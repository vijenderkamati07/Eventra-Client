const HomePage = () => {
  return (
    <div className="bg-[#08090A] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        {/* Background Glow */}
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.02] blur-3xl" />

        <div className="mx-auto max-w-[1280px] px-8 pb-24 pt-28">
          {/* Badge */}
          <div className="mb-8">
            <span
              className="
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                px-4
                py-2
                text-xs
                font-medium
                text-[#A1A1AA]
              "
            >
              AI-Powered Adaptive Learning
            </span>
          </div>

          {/* Heading */}
          <h1
            className="
              max-w-5xl
              text-5xl
              font-semibold
              leading-tight
              tracking-[-0.04em]
              md:text-7xl
            "
          >
            Stop Guessing What To Study.
            <br />
            Start Improving What Matters.
          </h1>

          {/* Description */}
          <p
            className="
              mt-8
              max-w-2xl
              text-lg
              leading-8
              text-[#8A8F98]
            "
          >
            Generate quizzes, discover weak concepts, track mastery,
            and receive personalized practice powered by AI.
          </p>

          {/* CTA */}
          <div className="mt-10 flex items-center gap-4">
            <button
              className="
                rounded-full
                bg-white
                px-6
                py-3
                text-sm
                font-medium
                text-black
                transition
                hover:bg-white/90
              "
            >
              Start Learning
            </button>

            <button
              className="
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                px-6
                py-3
                text-sm
                font-medium
                text-white
                transition
                hover:bg-white/[0.06]
              "
            >
              View Demo
            </button>
          </div>

          {/* Product Preview */}
          <div className="mt-24">
            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-white/[0.06]
                bg-[#0C0D0F]
                shadow-[0_0_120px_rgba(255,255,255,0.03)]
              "
            >
              {/* Top Bar */}
              <div className="border-b border-white/[0.06] px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-white/20" />
                  <div className="h-3 w-3 rounded-full bg-white/20" />
                  <div className="h-3 w-3 rounded-full bg-white/20" />
                </div>
              </div>

              {/* Analytics Overview */}
              <div className="p-8">
                <div className="mb-3">
                  <p className="text-xs uppercase tracking-widest text-[#8A8F98]">
                    Analytics Overview
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    {
                      label: "Accuracy",
                      value: "87%",
                      change: "+12%",
                      color: "text-emerald-400",
                      bg: "bg-emerald-500/10",
                    },
                    {
                      label: "Mastery",
                      value: "78%",
                      change: "+8%",
                      color: "text-sky-400",
                      bg: "bg-sky-500/10",
                    },
                    {
                      label: "Weak Areas",
                      value: "4",
                      change: "-3",
                      color: "text-orange-400",
                      bg: "bg-orange-500/10",
                    },
                    {
                      label: "Attempts",
                      value: "128",
                      change: "+14",
                      color: "text-violet-400",
                      bg: "bg-violet-500/10",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="
                        rounded-xl
                        border
                        border-white/[0.06]
                        bg-white/[0.02]
                        p-4
                        transition-all
                        duration-300
                        hover:border-white/[0.12]
                        hover:bg-white/[0.03]
                      "
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-[#8A8F98]">
                          {item.label}
                        </p>

                        <div
                          className={`
                            rounded-full
                            px-2.5
                            py-1
                            text-[10px]
                            font-medium
                            ${item.color}
                            ${item.bg}
                          `}
                        >
                          {item.change}
                        </div>
                      </div>

                      <h3 className="mt-3 text-3xl font-semibold text-white">
                        {item.value}
                      </h3>
                    </div>
                  ))}
                </div>

                {/* Workflow */}
              <div className="mt-12">
                <h3 className="mb-6 text-sm font-medium text-[#8A8F98]">
                  Adaptive Learning Workflow
                </h3>

                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {[
                    {
                      title: "Generate Quiz",
                      badge: "1",
                      color: "bg-blue-500/10 text-blue-400",
                    },
                    {
                      title: "Attempt Quiz",
                      badge: "2",
                      color: "bg-violet-500/10 text-violet-400",
                    },
                    {
                      title: "AI Analysis",
                      badge: "3",
                      color: "bg-cyan-500/10 text-cyan-400",
                    },
                    {
                      title: "Weak Areas Found",
                      badge: "4",
                      color: "bg-orange-500/10 text-orange-400",
                    },
                    {
                      title: "Adaptive Quiz",
                      badge: "5",
                      color: "bg-emerald-500/10 text-emerald-400",
                    },
                  ].map((step, index) => (
                    <div
                      key={step.title}
                      className="flex items-center"
                    >
                      <div
                        className="
                          rounded-xl
                          border
                          border-white/[0.06]
                          bg-white/[0.02]
                          px-5
                          py-4
                          transition-all
                          duration-300
                          hover:border-white/[0.12]
                          hover:bg-white/[0.03]
                        "
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`
                              flex h-7 w-7 items-center justify-center
                              rounded-full
                              text-[11px]
                              font-semibold
                              ${step.color}
                            `}
                          >
                            {step.badge}
                          </div>

                          <span className="text-sm font-medium text-white">
                            {step.title}
                          </span>
                        </div>
                      </div>

                      {index !== 4 && (
                        <span className="mx-3 text-[#8A8F98] text-lg">
                          →
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              </div>

              {/* Activity */}
              <div className="border-t border-white/[0.06] p-6">
                <h3 className="mb-6 text-lg font-medium">
                  Recent Learning Activity
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl border border-white/[0.06] p-4">
                    <span>JavaScript Fundamentals Quiz</span>
                    <span className="text-green-400">92%</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/[0.06] p-4">
                    <span>DBMS Practice Quiz</span>
                    <span className="text-yellow-400">76%</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/[0.06] p-4">
                    <span>OOP Concepts Quiz</span>
                    <span className="text-green-400">88%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default HomePage;