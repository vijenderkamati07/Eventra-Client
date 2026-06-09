import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import {
  Eye,
  EyeOff,
  Sparkles,
  Brain,
  Target,
} from "lucide-react";

import { login } from "../../Services/authService";

const Login = () => {
  const navigate = useNavigate();
  const { fetchCurrentUser } = useAuth();

  const auth = useAuth();
  console.log(auth);

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Learning",
    },
    {
      icon: Brain,
      title: "Adaptive Practice",
    },
    {
      icon: Target,
      title: "Weak Area Detection",
    },
    {
      icon: Sparkles,
      title: "Progress Analytics",
    },
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password =
        "Password is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const response =
        await login(payload);

      if (!response.success) {
        throw new Error(
          response.errors?.join(", ") ||
            "Login failed"
        );
      }

      console.log(
        response.data.user
      );
      await fetchCurrentUser();
      navigate("/");
    } catch (error) {
      console.error(error);

      setErrors({
        general:
          error.message ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };
return (
  <div className="min-h-screen bg-[#08090A] text-white">
    <div
      className="
        mx-auto
        flex
        max-w-[1280px]
        flex-col
        px-8
        py-12
        lg:flex-row
        lg:gap-12
      "
    >
      {/* LEFT SIDE */}
      <div
        className="
          mb-12
          flex
          lg:mb-0
          lg:w-[38%]
          lg:items-center
        "
      >
        <div className="max-w-lg">
          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-emerald-500/20
              bg-emerald-500/10
              px-4
              py-2
              text-xs
              font-medium
              text-emerald-300
              shadow-[0_0_20px_rgba(16,185,129,0.15)]
            "
          >
            ✨ Welcome Back
          </span>

          <h1
            className="
              mt-8
              text-5xl
              font-semibold
              leading-tight
              tracking-[-0.04em]
            "
          >
            Continue Your
            <br />
            Learning Journey.
          </h1>

          <p
            className="
              mt-6
              max-w-md
              text-[15px]
              leading-7
              text-[#8A8F98]
            "
          >
            Pick up exactly where you left off and
            continue improving with AI-powered
            learning designed around your progress.
          </p>

          <div
            className="
              mt-10
              grid
              grid-cols-2
              gap-3
            "
          >
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.02]
                    p-4
                    transition-all
                    duration-200
                    hover:border-white/[0.10]
                    hover:bg-white/[0.03]
                  "
                >
                  <Icon
                    size={18}
                    className="text-white"
                  />

                  <p
                    className="
                      mt-3
                      text-sm
                      text-[#D1D5DB]
                    "
                  >
                    {feature.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        className="
          flex
          justify-center
          lg:w-[62%]
        "
      >
        <div
          className="
            w-full
            max-w-[480px]
            rounded-[28px]
            border
            border-white/[0.06]
            bg-[#0C0D0F]
            p-8
          "
        >
          <h2
            className="
              text-[32px]
              font-semibold
              tracking-[-0.03em]
            "
          >
            Sign in
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-[#8A8F98]
            "
          >
            Access your personalized learning dashboard.
          </p>

          <div className="mb-6 mt-6 h-px bg-white/[0.06]" />

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {errors.general && (
              <div
                className="
                  rounded-2xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-4
                  py-3
                  text-sm
                  text-red-300
                "
              >
                {errors.general}
              </div>
            )}

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="
                  h-11
                  w-full
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.03]
                  px-4
                  text-sm
                  outline-none
                  transition-all
                  placeholder:text-[#6B7280]
                  focus:border-white/[0.16]
                  focus:ring-2
                  focus:ring-white/10
                "
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="
                    h-11
                    w-full
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-white/[0.03]
                    px-4
                    pr-12
                    text-sm
                    outline-none
                    transition-all
                    placeholder:text-[#6B7280]
                    focus:border-white/[0.16]
                    focus:ring-2
                    focus:ring-white/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="
                  cursor-pointer
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-[#8A8F98]
                    transition-colors
                    hover:text-white
                  "
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-3
                  text-sm
                  text-[#8A8F98]
                "
              >
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 cursor-pointer"
                />

                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="
                  text-sm
                  text-[#8A8F98]
                  transition-colors
                  hover:text-white
                "
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
              cursor-pointer
                h-12
                w-full
                rounded-2xl
                bg-white
                text-sm
                font-semibold
                text-black
                transition-all
                duration-200
                hover:bg-white/90
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>

            <p
              className="
                text-center
                text-sm
                text-[#8A8F98]
              "
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="
                cursor-pointer
                  font-medium
                  text-white
                  transition-colors
                  hover:text-[#D1D5DB]
                "
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
);
};

export default Login;
