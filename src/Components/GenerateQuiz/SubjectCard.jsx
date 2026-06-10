import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SubjectCard = ({ subject }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/subjects/${subject.slug}`);
  };

  return (
    <button
      onClick={handleClick}
      className="
      cursor-pointer
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/[0.06]
        bg-[#0C0D0F]
        p-6
        text-left
        transition-all
        duration-300
        hover:-translate-y-1.5
        hover:border-white/[0.12]
        hover:bg-[#101114]
        hover:shadow-[0_25px_60px_rgba(0,0,0,0.45)]
      "
    >
      {/* Glow Effect */}
      <div
        className="
          absolute
          -right-6
          -top-6
          h-28
          w-28
          rounded-full
          bg-white/[0.03]
          blur-3xl
          transition-all
          duration-300
          group-hover:bg-white/[0.05]
        "
      />

      {/* Badge */}
      {subject.isSystemSubject && (
        <span
          className="
            inline-flex
            rounded-full
            border
            border-emerald-500/20
            bg-emerald-500/10
            px-3
            py-1
            text-[11px]
            font-medium
            text-emerald-300
          "
        >
          Core Subject
        </span>
      )}

      {/* Subject Icon */}
      <div
        className="
          mt-5
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          border
          border-white/[0.06]
          bg-white/[0.03]
          text-2xl
          transition-all
          duration-300
          group-hover:border-white/[0.12]
          group-hover:bg-white/[0.05]
        "
      >
        {getSubjectIcon(subject.slug)}
      </div>

      {/* Title */}
      <h3
        className="
          mt-6
          text-xl
          font-semibold
          tracking-[-0.02em]
          text-white
        "
      >
        {subject.name}
      </h3>

      {/* Description */}
      <p
        className="
          mt-3
          line-clamp-2
          text-sm
          leading-6
          text-[#8A8F98]
        "
      >
        {subject.description}
      </p>

      {/* CTA */}
      <div
        className="
          mt-8
          flex
          items-center
          gap-2
          text-sm
          font-medium
          text-white
        "
      >
        Explore
        <ArrowRight
          size={16}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </div>
    </button>
  );
};

function getSubjectIcon(slug) {
  const icons = {
    javascript: "🟨",
    react: "⚛️",
    "data-structures-and-algorithms": "📘",
    sql: "🗄️",
    mongodb: "🍃",
    "computer-networks": "🌐",
    "node-js": "🟢",
    "object-oriented-programming": "🧩",
    "express-js": "🚂",
    java: "☕",
    dbms: "🛢️",
    mysql: "🐬",
    "operating-systems": "💻",
    python: "🐍",
    "c-programming": "⚙️",
  };

  return icons[slug] || "📚";
}

export default SubjectCard;
