import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, GraduationCap, Lock, Mail, User } from "lucide-react";
import { useAuth } from "../../auth/useAuth";
import { roleDashboardPath } from "../../auth/roleRoutes";

const Register = () => {
  const { register, user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const registeredUser = await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      navigate(roleDashboardPath(registeredUser.role), { replace: true });
    } catch (err) {
      setError(err.message || "Unable to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gray-50">
      <div className="hidden md:flex flex-col justify-center items-center px-10 border-r border-gray-200 bg-white">
        <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-blue-50 mb-6">
          <GraduationCap className="w-8 h-8 text-blue-600" />
        </div>

        <h2 className="text-2xl font-semibold text-center">Create an Account</h2>

        <p className="text-sm text-gray-600 mt-3 text-center max-w-sm">
          Student self-registration creates a student portal account. Teachers
          and admins are created by an administrator.
        </p>
      </div>

      <div className="flex flex-col justify-center px-6 sm:px-10 py-12">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold">Register</h1>
          <p className="text-sm text-gray-600 mt-2">
            Fill in your details to create a student account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-600 transition">
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                autoComplete="given-name"
                required
                className="w-full outline-none text-sm bg-transparent"
              />
            </label>

            <label className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-600 transition">
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                autoComplete="family-name"
                required
                className="w-full outline-none text-sm bg-transparent"
              />
            </label>
          </div>

          <label className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-600 transition">
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

          <label className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-600 transition">
            <Lock className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="new-password"
              required
              className="w-full outline-none text-sm bg-transparent"
            />
          </label>

          <label className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-600 transition">
            <Lock className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              autoComplete="new-password"
              required
              className="w-full outline-none text-sm bg-transparent"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Register"}
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
