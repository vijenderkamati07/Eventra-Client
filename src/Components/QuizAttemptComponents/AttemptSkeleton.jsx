
const AttemptSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#08090A] text-white">

      {/* Header Skeleton */}
      <div className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#08090A]/95 backdrop-blur-md">

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-4">

          <div className="animate-pulse">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              {/* Left */}
              <div>

                <div className="h-7 w-72 rounded-xl bg-white/[0.06]" />

                <div className="mt-4 flex flex-wrap gap-2">

                  <div className="h-8 w-24 rounded-full bg-white/[0.06]" />

                  <div className="h-8 w-20 rounded-full bg-white/[0.06]" />

                  <div className="h-8 w-36 rounded-full bg-white/[0.06]" />

                </div>

              </div>


              {/* Right */}
              <div className="flex flex-wrap gap-3">

                <div className="h-16 w-36 rounded-2xl bg-white/[0.06]" />

                <div className="h-16 w-36 rounded-2xl bg-white/[0.06]" />

                <div className="h-14 w-32 rounded-2xl bg-white/[0.06]" />

                <div className="h-14 w-28 rounded-2xl bg-white/[0.06]" />

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Main */}
      <main className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,900px)_320px] gap-8">

          {/* ================================= */}
          {/* Question Skeleton */}
          {/* ================================= */}

          <section className="rounded-[32px] border border-white/[0.06] bg-[#0C0D0F] p-6 md:p-10 animate-pulse">

            {/* Question Header */}
            <div className="flex items-center justify-between">

              <div>

                <div className="h-4 w-28 rounded bg-white/[0.06]" />

                <div className="mt-3 h-3 w-32 rounded bg-white/[0.06]" />

              </div>

              <div className="h-10 w-20 rounded-2xl bg-white/[0.06]" />

            </div>


            {/* Tags */}
            <div className="mt-8 flex gap-2">

              <div className="h-8 w-20 rounded-full bg-white/[0.06]" />

              <div className="h-8 w-24 rounded-full bg-white/[0.06]" />

            </div>


            {/* Question */}
            <div className="mt-10 space-y-4">

              <div className="h-6 w-full rounded bg-white/[0.06]" />

              <div className="h-6 w-11/12 rounded bg-white/[0.06]" />

              <div className="h-6 w-4/5 rounded bg-white/[0.06]" />

            </div>


            {/* Options */}
            <div className="mt-12 space-y-4">

              {Array.from(
                { length: 4 },
                (_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-5"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-6 h-6 rounded-full bg-white/[0.06]" />

                      <div className="w-8 h-8 rounded-full bg-white/[0.06]" />

                      <div className="flex-1 h-5 rounded bg-white/[0.06]" />

                    </div>

                  </div>
                )
              )}

            </div>


            {/* Footer */}
            <div className="mt-10 flex justify-between">

              <div className="h-12 w-28 rounded-2xl bg-white/[0.06]" />

              <div className="h-12 w-36 rounded-2xl bg-white/[0.06]" />

            </div>

          </section>



          {/* ================================= */}
          {/* Sidebar Skeleton */}
          {/* ================================= */}

          <aside className="space-y-6 animate-pulse">

            {/* Navigator */}
            <div className="rounded-[32px] border border-white/[0.06] bg-[#0C0D0F] p-6">

              <div className="h-4 w-24 rounded bg-white/[0.06]" />

              <div className="mt-3 h-6 w-32 rounded bg-white/[0.06]" />

              <div className="mt-6 grid grid-cols-4 gap-3">

                {Array.from(
                  { length: 8 },
                  (_, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-2xl bg-white/[0.06]"
                    />
                  )
                )}

              </div>

            </div>


            {/* Summary */}
            <div className="rounded-[32px] border border-white/[0.06] bg-[#0C0D0F] p-6">

              <div className="h-4 w-20 rounded bg-white/[0.06]" />

              <div className="mt-3 h-6 w-28 rounded bg-white/[0.06]" />

              <div className="mt-8 space-y-5">

                <div className="h-4 w-full rounded bg-white/[0.06]" />

                <div className="h-4 w-full rounded bg-white/[0.06]" />

                <div className="h-2 w-full rounded-full bg-white/[0.06]" />

              </div>

            </div>


            {/* Actions */}
            <div className="rounded-[32px] border border-white/[0.06] bg-[#0C0D0F] p-6">

              <div className="h-4 w-20 rounded bg-white/[0.06]" />

              <div className="mt-3 h-6 w-32 rounded bg-white/[0.06]" />

              <div className="mt-8 space-y-3">

                <div className="h-14 rounded-2xl bg-white/[0.06]" />

                <div className="h-14 rounded-2xl bg-white/[0.06]" />

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
};

export default AttemptSkeleton;

