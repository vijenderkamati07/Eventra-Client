import { useState } from "react";
import {
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";

import { ChevronDown } from "lucide-react";

import { useAuth } from "../Context/AuthContext";
import { logout } from "../Services/authService"

const guestNavItems = [
  {
    name: "Features",
    path: "/",
  },
  {
    name: "Generate Quiz",
    path: "/all-quizzes",
  },
  {
    name: "Adaptive Practice",
    path: "/adaptive-quiz",
  },
];

const userNavItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Generate Quiz",
    path: "/all-quizzes",
  },
  {
    name: "Adaptive Practice",
    path: "/show/adaptive-learning",
  },
  {
    name: "History",
    path: "/submittion/history",
  },
];

const Navbar = () => {
  const navigate = useNavigate();

  const {
    user,
    setUser,
  } = useAuth();

  const [showDropdown, setShowDropdown] =
    useState(false);

  const handleLogout = async () => {
    try {
      const response = await logout();

      if (!response.success) {
        throw new Error(
          response.message || "Logout failed"
        );
      }

      setUser(null);

      setShowDropdown(false);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const navItems = user
    ? userNavItems
    : guestNavItems;

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08090A]">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center px-8">
        {/* Logo */}
        <Link
          to={user ? "/dashboard" : "/"}
          className="flex shrink-0 cursor-pointer items-center gap-3"
        >
          <div
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              bg-white
              text-[11px]
              font-semibold
              text-black
            "
          >
            E
          </div>

          <span
            className="
              text-[16px]
              font-medium
              tracking-[-0.02em]
              text-white
            "
          >
            Eventra
          </span>
        </Link>

        {/* Navigation */}
        <nav className="ml-auto flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                  cursor-pointer
                  rounded-full
                  px-4
                  py-2
                  text-[12px]
                  font-normal
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-[#8A8F98] hover:bg-white/[0.08] hover:text-[#D1D5DB]"
                  }
                `
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Guest Actions */}
        {!user && (
          <>
            <div className="mx-5 h-4 w-px bg-white/10" />

            <Link to="/user/login">
              <button
                className="
                  cursor-pointer
                  rounded-full
                  px-4
                  py-2
                  text-[12px]
                  font-normal
                  text-[#8A8F98]
                  transition-all
                  duration-200
                  hover:bg-white/[0.08]
                  hover:text-[#D1D5DB]
                "
              >
                Log in
              </button>
            </Link>

            <Link to="/user/signup">
              <button
                className="
                  ml-4
                  flex
                  h-[38px]
                  min-w-[88px]
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  px-4
                  text-[14px]
                  font-medium
                  text-black
                  transition-all
                  duration-200
                  hover:bg-white/90
                "
              >
                Sign up
              </button>
            </Link>
          </>
        )}

        {/* Authenticated User */}
        {user && (
          <>
            <div className="mx-5 h-4 w-px bg-white/10" />

            <div className="relative">
              <button
                onClick={() =>
                  setShowDropdown(!showDropdown)
                }
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/[0.06]
                  bg-white/[0.02]
                  px-3
                  py-2
                  transition-all
                  duration-200
                  hover:bg-white/[0.04]
                "
              >
                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-sm
                    font-semibold
                    text-black
                  "
                >
                  {user.firstName
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <span
                  className="
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  {user.firstName}
                </span>

                <ChevronDown
                  size={16}
                  className={`
                    text-[#8A8F98]
                    transition-transform
                    duration-200
                    ${
                      showDropdown
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />
              </button>

              {showDropdown && (
                <div
                  className="
                    absolute
                    right-0
                    top-[calc(100%+12px)]
                    w-[240px]
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-[#0C0D0F]
                    shadow-[0_20px_40px_rgba(0,0,0,0.45)]
                  "
                >
                  {/* User Info */}
                  <div className="border-b border-white/[0.06] p-4">
                    <p
                      className="
                        text-sm
                        font-medium
                        text-white
                      "
                    >
                      {user.firstName}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-[#8A8F98]
                      "
                    >
                      {user.email}
                    </p>
                  </div>

                  {/* Dropdown Links */}
                  <div className="p-2">
                    <Link
                      to="/user/profile"
                      onClick={() =>
                        setShowDropdown(false)
                      }
                      className="
                        block
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        text-[#D1D5DB]
                        transition-all
                        hover:bg-white/[0.05]
                      "
                    >
                      Profile
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() =>
                        setShowDropdown(false)
                      }
                      className="
                        block
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        text-[#D1D5DB]
                        transition-all
                        hover:bg-white/[0.05]
                      "
                    >
                      Settings
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="
                        mt-1
                        block
                        w-full
                        cursor-pointer
                        rounded-xl
                        px-3
                        py-2.5
                        text-left
                        text-sm
                        text-red-400
                        transition-all
                        hover:bg-red-500/10
                      "
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

