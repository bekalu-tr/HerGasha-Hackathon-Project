
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import useAuth from "../../hooks/useAuth.js";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await login({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      navigate("/dashboard", { replace: true });

    } catch (err) {
      setError(
        err.message || "Login failed. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FFF3F9] to-pink-100 px-4 py-12">

      <div className="w-full max-w-md rounded-3xl border border-pink-100 bg-white p-7 shadow-xl sm:p-9">

        {/* Header */}
        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4B1248] text-white">
            <ShieldCheck size={33} />
          </div>

          <h1 className="mt-5 text-3xl font-extrabold text-[#4B1248]">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue to Her Gasha.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mt-7 flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#4B1248]"
            >
              Email Address
            </label>

            <div className="relative">

              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none transition focus:border-[#D90083] focus:ring-2 focus:ring-pink-100"
              />

            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#4B1248]"
            >
              Password
            </label>

            <div className="relative">

              <LockKeyhole
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-12 outline-none transition focus:border-[#D90083] focus:ring-2 focus:ring-pink-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D90083]"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D90083] py-4 font-bold text-white shadow-md transition hover:bg-[#B80070] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}

            {!loading && <LogIn size={18} />}
          </button>

        </form>

        {/* Register Link */}
        <p className="mt-7 text-center text-sm text-gray-600">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-bold text-[#D90083] hover:underline"
          >
            Create an account
          </Link>
        </p>

        {/* Footer */}
        <div className="mt-7 flex items-center justify-center gap-2 border-t border-gray-100 pt-6 text-xs text-gray-500">
          <LockKeyhole size={14} />
          Her Gasha account access
        </div>

      </div>
    </div>
  );
};

export default Login;
