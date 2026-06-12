import { ArrowUpRight } from "lucide-react";

export default function AdaptiveFocusAreas({
  weakAreas,
}) {
  const focusAreas = Object.entries(
    weakAreas || {}
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  function getPriority(count) {
    if (count >= 4) {
      return {
        label: "High Priority",
        color:
          "bg-red-400",
        text:
          "text-red-300",
        width: "100%",
      };
    }

    if (count >= 2) {
      return {
        label: "Medium Priority",
        color:
          "bg-amber-400",
        text:
          "text-amber-300",
        width: "65%",
      };
    }

    return {
      label: "Reinforcement",
      color:
        "bg-sky-400",
      text:
        "text-sky-300",
      width: "35%",
    };
  }

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
          Today's Focus
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
          Practice Where
          <br />
          It Matters Most.
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
          Eventra identified the
          concepts that deserve more
          attention based on your
          previous performance.
        </p>
      </div>

      {focusAreas.length === 0 ? (
        <div
          className="
            mt-16
            rounded-[32px]
            border
            border-white/[0.06]
            bg-[#0C0D0F]
            p-10
            text-center
          "
        >
          <div className="text-5xl">
            🧠
          </div>

          <h3
            className="
              mt-6
              text-2xl
              font-bold
            "
          >
            Still Learning About You.
          </h3>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              leading-relaxed
              text-[#8A8F98]
            "
          >
            Focus areas become more
            meaningful as you complete
            additional adaptive sessions.
          </p>
        </div>
      ) : (
        <div
          className="
            mt-16
            flex
            flex-col
            gap-8
          "
        >
          {focusAreas.map(
            ([topic, count]) => {
              const priority =
                getPriority(count);

              return (
                <div
                  key={topic}
                  className="
                    border-b
                    border-white/[0.06]
                    pb-8
                    last:border-0
                    last:pb-0
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      gap-5
                      lg:flex-row
                      lg:items-center
                      lg:justify-between
                    "
                  >
                    <div>
                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-3
                        "
                      >
                        <h3
                          className="
                            text-2xl
                            font-semibold
                            tracking-tight
                          "
                        >
                          {topic}
                        </h3>

                        <span
                          className={`
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-medium
                            ${priority.text}
                            bg-white/[0.03]
                          `}
                        >
                          {
                            priority.label
                          }
                        </span>
                      </div>

                      <p
                        className="
                          mt-3
                          text-[#8A8F98]
                        "
                      >
                        Appeared{" "}
                        <span
                          className="
                            font-medium
                            text-white
                          "
                        >
                          {count}
                        </span>{" "}
                        time
                        {count > 1
                          ? "s"
                          : ""}
                        {" "}
                        across your
                        previous attempts.
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-[#8A8F98]
                      "
                    >
                      Needs Attention

                      <ArrowUpRight
                        size={16}
                      />
                    </div>
                  </div>

                  {/* Priority Meter */}
                  <div
                    className="
                      mt-6
                      h-2
                      overflow-hidden
                      rounded-full
                      bg-white/[0.05]
                    "
                  >
                    <div
                      className={`
                        h-full
                        rounded-full
                        ${priority.color}
                      `}
                      style={{
                        width:
                          priority.width,
                      }}
                    />
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </section>
  );
}