import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative">
      <Search
        size={20}
        className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          text-[#8A8F98]
        "
      />

      <input
        type="text"
        placeholder="Search subjects, technologies, concepts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          h-14
          w-full
          rounded-2xl
          border
          border-white/[0.06]
          bg-[#0C0D0F]
          pl-14
          pr-5
          text-sm
          text-white
          outline-none
          transition-all
          duration-200
          placeholder:text-[#6B7280]
          focus:border-white/[0.12]
          focus:ring-2
          focus:ring-white/10
        "
      />
    </div>
  );
};

export default SearchBar;
