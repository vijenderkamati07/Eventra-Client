import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Sparkles, Brain, Target, TrendingUp } from "lucide-react";
import { signup } from "../../Services/authService";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.terms) {
      newErrors.terms = "Please accept the terms";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        terms: formData.terms,
      };

      console.log(payload);

      /*
      await signupApi(payload);
      navigate("/dashboard");
      */
      const response = await signup(payload);
      if (!response.success) {
        console.log(response.errors, "from try block");
      }
      navigate("/user/login");
    } catch (error) {
      console.error(error, "from catch block");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: "AI Quiz Generation",
    },
    {
      icon: Brain,
      title: "Adaptive Practice",
    },
    {
      icon: Target,
      title: "Weak Area Insights",
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
    },
  ];

  const passwordStrength =
    formData.password.length === 0
      ? 0
      : formData.password.length < 6
        ? 33
        : formData.password.length < 10
          ? 66
          : 100;

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
            {/* Badge */}
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
              ✨ Join Eventra
            </span>

            {/* Heading */}
            <h1
              className="
              mt-8
              text-5xl
              font-semibold
              leading-tight
              tracking-[-0.04em]
            "
            >
              Learn Smarter.
              <br />
              Master Faster.
            </h1>

            {/* Description */}
            <p
              className="
              mt-6
              max-w-md
              text-[15px]
              leading-7
              text-[#8A8F98]
            "
            >
              Adaptive learning that evolves with every attempt, helping you
              master concepts faster.
            </p>

            {/* Feature Cards */}
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
                    <Icon size={18} className="text-white" />

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
          flex
          justify-center
          lg:w-[62%]
        "
          >
            <div
              className="
            w-full
            max-w-[620px]
            rounded-[28px]
            border
            border-white/[0.06]
            bg-[#0C0D0F]
            p-8
          "
            >
              {/* Header */}
              <h2
                className="
              text-[32px]
              font-semibold
              tracking-[-0.03em]
            "
              >
                Create your account
              </h2>

              <p
                className="
              mt-2
              text-sm
              leading-6
              text-[#8A8F98]
            "
              >
                Start your personalized learning journey.
              </p>

              <div className="mb-6 mt-6 h-px bg-white/[0.06]" />

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="
                    h-10
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

                    {errors.firstName && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="
                    h-10
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

                    {errors.lastName && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="
                  h-10
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
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="
                    h-10
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
                      onClick={() => setShowPassword(!showPassword)}
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
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}

                  {formData.password && (
                    <div className="mt-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs text-[#8A8F98]">
                          Password Strength
                        </span>

                        <span
                          className={`text-xs font-medium ${
                            passwordStrength <= 33
                              ? "text-red-400"
                              : passwordStrength <= 66
                                ? "text-yellow-400"
                                : "text-emerald-400"
                          }`}
                        >
                          {passwordStrength <= 33
                            ? "Weak"
                            : passwordStrength <= 66
                              ? "Medium"
                              : "Strong"}
                        </span>
                      </div>

                      <div className="h-1.5 rounded-full bg-white/10">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            passwordStrength <= 33
                              ? "bg-red-400"
                              : passwordStrength <= 66
                                ? "bg-yellow-400"
                                : "bg-emerald-400"
                          }`}
                          style={{
                            width: `${passwordStrength}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="
                      h-10
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
                        setShowConfirmPassword(!showConfirmPassword)
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
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div
                  className="
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.02]
                px-4
                py-3
              "
                >
                  <label
                    className="
                  flex
                  cursor-pointer
                  items-start
                  gap-3
                  text-sm
                  text-[#8A8F98]
                "
                  >
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      className="mt-0.5 h-4 w-4 cursor-pointer"
                    />

                    <span>
                      I agree to the{" "}
                      <span className="text-white">Terms of Service</span> and{" "}
                      <span className="text-white">Privacy Policy</span>.
                    </span>
                  </label>

                  {errors.terms && (
                    <p className="mt-2 text-sm text-red-400">{errors.terms}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                  cursor-pointer
                  h-11
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
                  onClick={handleSubmit}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                {/* Login */}
                <p
                  className="
                text-center
                text-sm
                text-[#8A8F98]
              "
                >
                  Already have an account?{" "}
                  <Link
                    to="/user/login"
                    className="
                  font-medium
                  text-white
                  transition-colors
                  hover:text-[#D1D5DB]
                "
                  >
                    Log in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
