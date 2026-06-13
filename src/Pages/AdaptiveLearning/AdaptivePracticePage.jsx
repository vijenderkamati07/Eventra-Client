import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../../Context/AuthContext";
import { getAdaptiveEligibleSubjects } from "../../Services/adaptiveService"

import AdaptiveHowItWorks from "../../Components/AdaptiveLearningComponent/AdaptiveHowItWorks";
import AdaptiveRequirementsBenefits from "../../Components/AdaptiveLearningComponent/AdaptiveRequirements";
import AdaptiveReadySubjects from "../../Components/AdaptiveLearningComponent/AdaptiveReadySubjects";
import AdaptiveLockedSubjects from "../../Components/AdaptiveLearningComponent/AdaptiveLockedSubjects";
import AdaptiveLearningOutcomes from "../../Components/AdaptiveLearningComponent/AdaptiveLearningOutcomes";
import AdaptiveComparison from "../../Components/AdaptiveLearningComponent/AdaptiveComparison";

export default function AdaptivePracticePage() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const isLoggedIn = !!user;console.log("user", user);
  console.log("isLoggedIn", isLoggedIn);
  

  const [loading, setLoading] = useState(true);

  const [unlockRequirement, setUnlockRequirement] = useState(0);

  const [readySubjects, setReadySubjects] = useState([]);

  const [lockedSubjects, setLockedSubjects] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdaptiveSubjects = async () => {
      try {
        /*
          Guests should be able to view the page
          as a marketing experience.
        */

        if (!isLoggedIn) {
          setLoading(false);
          return;
        }

        const response = await getAdaptiveEligibleSubjects();

        const data = response?.data;

        const unlockReq = data?.unlockRequirement || 0;

        const subjects = data?.subjects || [];

        /*
          count >= unlockRequirement
        */

        const ready = subjects.filter(
          (subject) =>
            subject.count >= unlockReq
        );

        /*
          count > 0 &&
          count < unlockRequirement
        */

        const locked = subjects.filter(
          (subject) =>
            subject.count > 0 &&
            subject.count < unlockReq
        );

        setUnlockRequirement(unlockReq);

        setReadySubjects(ready);

        setLockedSubjects(locked);
      } catch (err) {
        console.error(err);

        setError(
          err?.response?.data?.message ||
            "Unable to load adaptive learning."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdaptiveSubjects();
    

  }, [isLoggedIn]);


  return (
    <div className="min-h-screen overflow-hidden bg-[#08090A] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-32 top-16 h-[420px] w-[420px] rounded-full bg-violet-600/15 blur-[140px]" />

        <div className="absolute -right-24 top-[30%] h-[360px] w-[360px] rounded-full bg-sky-500/10 blur-[120px]" />

        <div className="absolute left-1/2 top-[65%] h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Adaptive Hero */}
        <section className="pt-28 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-violet-500/20
                bg-violet-500/10
                px-5
                py-2.5
                text-sm
                text-violet-300
                backdrop-blur-xl
              "
            >
              <Sparkles size={16} />

              <span>
                Powered by Eventra Intelligence
              </span>
            </div>

            {/* Headline */}
            <h1
              className="
                mt-8
                text-5xl
                font-bold
                leading-tight
                tracking-tight
                md:text-6xl
                lg:text-7xl
              "
            >
              Your Mistakes
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-violet-300
                  via-violet-100
                  to-sky-300
                  bg-clip-text
                  text-transparent
                "
              >
                Have A Pattern.
              </span>

              <br />

              Eventra Learns From It.
            </h1>

            {/* Description */}
            <p
              className="
                mx-auto
                mt-8
                max-w-3xl
                text-lg
                leading-relaxed
                text-[#8A8F98]
                md:text-xl
              "
            >
              Adaptive Practice transforms your previous
              attempts into focused learning experiences.
              By detecting recurring mistakes and identifying
              learning patterns, Eventra creates practice
              designed to help you improve where it matters
              most.
            </p>

            {/* Trust Indicators */}
            <div
              className="
                mt-12
                flex
                flex-wrap
                justify-center
                gap-4
              "
            >
              {[
                "Pattern-Based",
                "Personalized",
                "AI-Guided",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/[0.08]
                    bg-white/[0.03]
                    px-5
                    py-3
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-white/[0.14]
                  "
                >
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400"
                  />

                  <span className="text-sm font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>            {/* Intelligence Highlight */}
            <div className="mt-22 flex items-center justify-center">
  <div className="h-px flex-1 max-w-md bg-gradient-to-r from-transparent to-white/20" />

  <div className="mx-4 text-violet-400">
    ✦
  </div>

  <div className="h-px flex-1 max-w-md bg-gradient-to-l from-transparent to-white/20" />
</div>

            {/* Guest Overlay */}
            {!isLoggedIn && (
              <div
                className="
                  mt-12
                  rounded-[32px]
                  border
                  border-violet-500/20
                  bg-violet-500/10
                  p-8
                  backdrop-blur-xl
                "
              >
                <div className="max-w-2xl mx-auto text-center">
                  <p
                    className="
                      text-sm
                      uppercase
                      tracking-[0.3em]
                      text-violet-300
                    "
                  >
                    Unlock Eventra Intelligence
                  </p>

                  <h3
                    className="
                      mt-4
                      text-2xl
                      font-bold
                      md:text-3xl
                    "
                  >
                    Create an account and complete
                    quizzes to unlock adaptive learning.
                  </h3>

                  <p
                    className="
                      mt-5
                      leading-relaxed
                      text-[#8A8F98]
                    "
                  >
                    Eventra becomes more powerful as it
                    understands how you learn. Start
                    building your learning profile today.
                  </p>

                  <button
                    onClick={() =>
                      navigate("/user/signup")
                    }
                    className="
                      cursor-pointer
                      mt-8
                      rounded-full
                      bg-white
                      px-8
                      py-4
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
        </section>

        <AdaptiveHowItWorks />

        {error && (
          <div
            className="
              mb-20
              rounded-[32px]
              border
              border-red-500/20
              bg-red-500/10
              p-6
              text-center
              text-red-300
            "
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="pb-28">
            <div className="mb-8">
              <div className="h-8 w-56 rounded-xl bg-white/[0.04] animate-pulse" />

              <div className="mt-4 h-5 w-96 max-w-full rounded-xl bg-white/[0.04] animate-pulse" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    rounded-[32px]
                    border
                    border-white/[0.06]
                    bg-[#0C0D0F]
                    p-8
                  "
                >
                  <div className="h-6 w-32 rounded-lg bg-white/[0.04] animate-pulse" />

                  <div className="mt-6 h-10 w-44 rounded-lg bg-white/[0.04] animate-pulse" />

                  <div className="mt-6 h-5 w-full rounded-lg bg-white/[0.04] animate-pulse" />

                  <div className="mt-10 h-12 w-full rounded-full bg-white/[0.04] animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ) : (          <>
            <AdaptiveReadySubjects
              subjects={readySubjects}
              navigate={navigate}
            />

            <AdaptiveLockedSubjects
              subjects={lockedSubjects}
              unlockRequirement={unlockRequirement}
              navigate={navigate}
              isLoggedIn={isLoggedIn}
            />
          </>
        )}

        <AdaptiveLearningOutcomes />

        <AdaptiveComparison />

        {/* Footer CTA */}
<section className="pb-20 mb-20 mt-15">
  <div
    className="
      flex
      flex-col
      gap-8
      lg:flex-row
      lg:items-center
      lg:justify-between
    "
  >
    {/* Content */}
    <div className="max-w-2xl">
      <p
        className="
          text-sm
          uppercase
          tracking-[0.3em]
          text-violet-300
        "
      >
        Ready To Begin?
      </p>

      <h2
        className="
          mt-3
          text-3xl
          font-bold
          tracking-tight
          md:text-5xl
        "
      >
        Learn Smarter.
        <br />
        Practice With Purpose.
      </h2>

      <p
        className="
          mt-4
          max-w-xl
          text-lg
          leading-relaxed
          text-[#8A8F98]
        "
      >
        Eventra helps you focus on what
        matters most and guides your next
        learning step with confidence.
      </p>
    </div>

    {/* Actions */}
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-4
        lg:flex-nowrap
      "
    >
      <button
        onClick={() => {
          if (isLoggedIn) {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          } else {
            navigate("/user/signup");
          }
        }}
        className="
          cursor-pointer
          rounded-full
          bg-white
          px-8
          py-4
          font-medium
          text-black
          whitespace-nowrap
          transition-all
          duration-300
          hover:-translate-y-1
          hover:bg-white/90
        "
      >
        {isLoggedIn
          ? "Explore Adaptive Learning"
          : "Start Learning Free"}
      </button>

      <button
        onClick={() => navigate("/all-quizzes")}
        className="
          cursor-pointer
          rounded-full
          border
          border-white/10
          bg-white/[0.03]
          px-8
          py-4
          font-medium
          text-white
          whitespace-nowrap
          transition-all
          duration-300
          hover:-translate-y-1
          hover:bg-white/[0.06]
        "
      >
        Continue Learning
      </button>
    </div>
  </div>
</section>
<section className="pb-26 pt-8 mt-36">
  <div className="relative overflow-hidden text-center">
    <div className="relative z-10 max-w-6xl mx-auto">
      {/* Decorative Quotes */}
      <span
        className="
          absolute
          left-0
          top-12
          hidden
          text-8xl
          font-bold
          leading-none
          text-white/[0.04]
          lg:block
        "
      >
        "
      </span>

      <span
        className="
          absolute
          right-0
          bottom-24
          hidden
          text-8xl
          font-bold
          leading-none
          text-white/[0.04]
          lg:block
        "
      >
        "
      </span>

      <h2
        className="
          text-5xl
          font-bold
          tracking-tight
          leading-[1.15]
          md:text-6xl
          lg:text-7xl
        "
      >
        Practice isn't about repeating
        <br />

        <span className="text-[#B8BBC2]">
          what you already know.
        </span>
      </h2>

      <p
        className="
          mt-10
          text-xl
          leading-relaxed
          text-[#8A8F98]
          md:text-2xl
        "
      >
        It's about confronting
        <br />
        what you don't.
      </p>

      {/* Signature Divider */}
      <div className="mt-14 flex justify-center">
        <div
          className="
            h-px
            w-24
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
          "
        />
      </div>

      {/* Signature */}
      <p
        className="
          mt-8
          text-sm
          uppercase
          tracking-[0.5em]
          text-[#B8BBC2]
        "
      >
        Eventra
      </p>
    </div>
  </div>
</section>

        
      </div>
    </div>
  );
}