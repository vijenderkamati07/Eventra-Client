import { Lock } from "lucide-react";

export default function AdaptiveLockedSubjects({
  subjects,
  navigate,
  unlockRequirement,
  isLoggedIn,
}) {
  const formatSubjectName = (slug) =>
    slug
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");

  return (
    <section className="pb-28">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
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
            Adaptive Locked
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
            A Little More Practice,
            <br />
            Then You're Ready.
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
            Eventra needs a few more learning
            signals before personalized practice
            becomes available. Keep progressing
            and adaptive learning will unlock
            naturally.
          </p>
        </div>

        {subjects.length > 0 && (
          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-orange-500/15
              bg-orange-500/[0.06]
              px-5
              py-3
              text-sm
              font-medium
              text-orange-300
            "
          >
            {subjects.length} Subject
            {subjects.length > 1 ? "s" : ""}
            {" "}In Progress
          </div>
        )}
      </div>

      {subjects.length === 0 ? (
        <div
          className="
            mt-16
            overflow-hidden
            rounded-[32px]
            border
            border-white/[0.06]
            bg-[#0C0D0F]
            p-10
            text-center
          "
        >
          <div
            className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-orange-500/10
              text-orange-300
            "
          >
            <Lock size={34} />
          </div>

          <h3
            className="
              mt-8
              text-2xl
              font-bold
            "
          >
            Nothing Is Locked.
          </h3>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              leading-relaxed
              text-[#8A8F98]
            "
          >
            You've already unlocked adaptive
            learning for every available subject.
          </p>
        </div>
      ) : (
        <div
          className="
            mt-16
            grid
            gap-8
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {subjects.map((subject) => {
            const remainingAttempts =
              unlockRequirement -
              subject.count;            return (
              <div
                key={subject._id}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[36px]
                  border
                  border-white/[0.06]
                  bg-[#0C0D0F]
                  p-6
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:border-white/[0.10]
                "
              >
                {/* Subtle Hover Glow */}
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                    bg-gradient-to-br
                    from-white/[0.02]
                    via-transparent
                    to-transparent
                  "
                />

                <div
                  className={`
                    relative z-10 flex h-full flex-col
                    ${
                      !isLoggedIn
                        ? "blur-[2px]"
                        : ""
                    }
                  `}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-orange-500/15
                        bg-orange-500/[0.06]
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-orange-300
                      "
                    >
                      <Lock size={14} />
                      Adaptive Locked
                    </div>

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-white/[0.03]
                        text-[#8A8F98]
                      "
                    >
                      <Lock size={22} />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="mt-8 min-h-[220px]">
                    <h3
                      className="
                        min-h-[96px]
                        text-4xl
                        font-bold
                        tracking-tight
                        leading-tight
                        break-words
                      "
                    >
                      {formatSubjectName(subject._id)}
                    </h3>

                    <p
                      className="
                        mt-5
                        text-[16px]
                        leading-relaxed
                        text-[#8A8F98]
                      "
                    >
                      Eventra needs a little more
                      evidence before it can
                      personalize practice for
                      this subject.
                    </p>

                    {/* Progress Pill */}
                    <div
                      className="
                        mt-6
                        inline-flex
                        w-fit
                        items-center
                        gap-3
                        rounded-full
                        border
                        border-white/[0.08]
                        bg-white/[0.03]
                        px-4
                        py-2.5
                      "
                    >
                      <div
                        className="
                          h-2.5
                          w-2.5
                          rounded-full
                          bg-orange-400
                        "
                      />

                      <span
                        className="
                          text-sm
                          font-medium
                          text-[#D6D8DC]
                        "
                      >
                        {remainingAttempts} quiz
                        {remainingAttempts > 1
                          ? "zes"
                          : ""}
                        {" "}to unlock
                      </span>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Insight */}
                  <div
                    className="
                      mt-8
                      rounded-3xl
                      border
                      border-white/[0.06]
                      bg-white/[0.02]
                      p-5
                      backdrop-blur-xl
                    "
                  >
                    <p
                      className="
                        text-sm
                        uppercase
                        tracking-[0.2em]
                        text-white
                      "
                    >
                      Eventra Insight
                    </p>

                    <p
                      className="
                        mt-3
                        leading-relaxed
                        text-[#8A8F98]
                      "
                    >
                      Complete{" "}
                      <span className="font-semibold text-white">
                        {remainingAttempts}
                      </span>{" "}
                      more quiz
                      {remainingAttempts > 1
                        ? "zes"
                        : ""}
                      {" "}to unlock personalized
                      practice.
                    </p>
                  </div>                  {/* CTA */}
                  <button
                    onClick={() =>
                      navigate(
                        `/subjects/${subject._id}`
                      )
                    }
                    className="
                      cursor-pointer
                      mt-8
                      group/button
                      flex
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      border
                      border-white/[0.08]
                      bg-white/[0.03]
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-white
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-white/[0.12]
                      hover:bg-white/[0.05]
                    "
                  >
                    <span>
                      Continue Learning
                    </span>

                    <span
                      className="
                        transition-transform
                        duration-300
                        group-hover/button:translate-x-1
                      "
                    >
                      →
                    </span>
                  </button>

                  {/* Guest Overlay */}
                  {!isLoggedIn && (
                    <div
                      className="
                        absolute
                        inset-0
                        z-20
                        flex
                        items-center
                        justify-center
                        rounded-[36px]
                        bg-black/70
                        backdrop-blur-md
                        p-8
                      "
                    >
                      <div className="text-center max-w-xs">
                        <div
                          className="
                            mx-auto
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-full
                            bg-orange-500/10
                            text-orange-300
                          "
                        >
                          <Lock size={30} />
                        </div>

                        <h4
                          className="
                            mt-6
                            text-xl
                            font-bold
                          "
                        >
                          Unlock Adaptive Learning
                        </h4>

                        <p
                          className="
                            mt-4
                            leading-relaxed
                            text-[#8A8F98]
                          "
                        >
                          Create an account and
                          complete quizzes to unlock
                          personalized practice.
                        </p>

                        <button
                          onClick={() =>
                            navigate(
                              "/user/signup"
                            )
                          }
                          className="
                            cursor-pointer
                            mt-6
                            rounded-full
                            bg-white
                            px-6
                            py-3
                            font-medium
                            text-black
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:bg-white/90
                          "
                        >
                          Start Learning Free
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}