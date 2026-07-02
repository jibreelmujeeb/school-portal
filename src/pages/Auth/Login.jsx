import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, GraduationCap, Lock, Mail } from "lucide-react";
import { useAuth } from "../../auth/useAuth";
import { roleDashboardPath } from "../../auth/roleRoutes";

const Login = () => {
  const { login, user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && isAuthenticated) {
    return <Navigate to={roleDashboardPath(user.role)} replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const loggedInUser = await login(form);
      const fallbackPath = roleDashboardPath(loggedInUser.role);
      const from = location.state?.from?.pathname;
      navigate(from || fallbackPath, { replace: true });
    } catch (err) {
      setError(err.message || "Unable to login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="hidden lg:flex w-1/2 border-r border-gray-200 bg-white items-center justify-center px-12">
        <div className="max-w-sm text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-lg bg-blue-50">
              <GraduationCap className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold">Welcome Back</h2>

          <p className="text-sm text-gray-600 mt-3">
            Login to manage your courses, assignments, and academic progress.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 md:px-10 py-10">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6 lg:hidden">
            <div className="p-3 rounded-lg bg-blue-50">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-semibold">Login</h1>
            <p className="text-sm text-gray-600 mt-2">
              Enter your details to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <label className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:border-blue-600 transition">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                autoComplete="email"
                required
                className="w-full outline-none text-sm bg-transparent"
              />
            </label>

            <label className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:border-blue-600 transition">
              <Lock className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                autoComplete="current-password"
                required
                className="w-full outline-none text-sm bg-transparent"
              />
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-blue-600" />
                Remember me
              </label>

              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Logging in..." : "Login"}
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex-1 border-t border-gray-200"></div>
              OR
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <p className="text-sm text-gray-600 text-center">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
