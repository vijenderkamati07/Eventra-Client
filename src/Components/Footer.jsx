const footerSections = [
  {
    title: "Learning",
    links: [
      "Generate Quiz",
      "Adaptive Practice",
      "Quiz History",
      "Performance Analytics",
      "Weak Areas",
      "Study Progress",
    ],
  },
  {
    title: "Features",
    links: [
      "AI Quiz Generation",
      "Adaptive Learning",
      "Progress Tracking",
      "Feedback Engine",
      "Topic Analysis",
      "Revision Plans",
    ],
  },
  {
    title: "Platform",
    links: [
      "Dashboard",
      "Profile",
      "Settings",
      "Roadmap",
      "Updates",
      "Changelog",
    ],
  },
  {
    title: "Resources",
    links: [
      "Documentation",
      "API",
      "Developers",
      "Support",
      "FAQ",
      "Community",
    ],
  },
  {
    title: "Connect",
    links: [
      "Contact Us",
      "LinkedIn",
      "GitHub",
      "Twitter",
      "YouTube",
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mt-32 border-t border-white/[0.06] bg-[#08090A]">
      <div className="mx-auto max-w-[1280px] px-8 py-20">

        {/* Top Section */}
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-3 lg:grid-cols-6">

          {/* Logo */}
          <div>
            <div
              className="
                flex h-8 w-8 items-center justify-center
                rounded-full
                bg-white
                text-sm
                font-semibold
                text-black
              "
            >
              E
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-6 text-[15px] font-semibold text-white">
                {section.title}
              </h3>

              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <button
                      className="
                        cursor-pointer
                        text-[15px]
                        text-[#8A8F98]
                        transition-colors
                        duration-200
                        hover:text-white
                      "
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-24 flex flex-wrap gap-8 text-[15px] text-[#8A8F98]">
          <button className="cursor-pointer hover:text-white transition-colors">
            Privacy
          </button>

          <button className="cursor-pointer hover:text-white transition-colors">
            Terms
          </button>

          <button className="cursor-pointer hover:text-white transition-colors">
            DPA
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;