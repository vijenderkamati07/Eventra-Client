export default function AdaptiveReadySubjects({
  subjects,
  navigate,
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
              bg-emerald-500/10
              px-4
              py-2
              text-sm
              text-emerald-300
            "
          >
            Adaptive Ready
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
            Personalized Practice
            <br />
            Is Waiting For You.
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
            Eventra has gathered enough learning
            signals to move beyond generic practice.
            These subjects are now ready for a more
            focused and personalized experience.
          </p>
        </div>

        {subjects.length > 0 && (
          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-emerald-500/20
              bg-emerald-500/10
              px-5
              py-3
              text-sm
              font-medium
              text-emerald-300
            "
          >
            {subjects.length} Subject
            {subjects.length > 1 ? "s" : ""} Unlocked
          </div>
        )}
      </div>

      {subjects.length === 0 ? (        <div
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
              bg-emerald-500/10
              text-4xl
            "
          >
            🌱
          </div>

          <h3
            className="
              mt-8
              text-2xl
              font-bold
            "
          >
            Your Adaptive Journey
            Has Just Begun.
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
            Keep completing quizzes and Eventra will
            gradually understand how you learn. Once
            enough patterns emerge, personalized practice
            will become available.
          </p>
        </div>
      ) : (
        <div
  className="
    mt-16
    grid
    gap-4
    md:grid-cols-2
    xl:grid-cols-3
    xl:gap-8
  "
>
  {subjects.map((subject) => (
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
        p-8
        w-full
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-emerald-500/20
      "
    >
      {/* Premium Glow */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          bg-gradient-to-br
          from-emerald-500/[0.08]
          via-transparent
          to-transparent
        "
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div
            className="
              inline-flex
              rounded-full
              border
              border-emerald-500/20
              bg-emerald-500/10
              px-4
              py-2
              text-sm
              font-medium
              text-emerald-300
            "
          >
            Adaptive Ready
          </div>

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-emerald-500/10
              text-2xl
            "
          >
            ✨
          </div>
        </div>

        {/* Subject */}
        <div className="mt-10">
          <h3
            className="
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
            Eventra has learned enough about
            how you approach this subject to
            personalize your next practice
            experience.
          </p>
        </div>

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
              bg-emerald-400
            "
          />

          <span
            className="
              text-sm
              font-medium
              text-[#D6D8DC]
            "
          >
            {subject.count} quiz
            {subject.count > 1 ? "zes" : ""}
            {" "}completed
          </span>
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
              text-emerald-300
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
            Personalized practice is now unlocked
            for this subject.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() =>
            navigate(
              `/adaptive-learning/${subject._id}`
            )
          }
          className="
            cursor-pointer
            mt-8
            group
            flex
            items-center
            justify-center
            gap-3
            rounded-full
            border
            border-emerald-500/15
            bg-emerald-500/[0.06]
            px-6
            py-4
            text-sm
            font-semibold
            text-emerald-300
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-emerald-500/30
            hover:bg-emerald-500/[0.12]
            hover:text-emerald-200
          "
        >
          <span>
            Start Adaptive Practice
          </span>

          <span
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </button>
      </div>
    </div>
  ))}
</div>
      )}
    </section>
  );
}