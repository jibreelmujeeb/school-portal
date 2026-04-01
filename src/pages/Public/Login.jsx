import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gray-50">
      
      {/* LEFT SIDE (Branding) */}
      <div className="hidden md:flex flex-col justify-center items-center px-10 border-r border-gray-200 bg-white">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6">
          <GraduationCap className="w-8 h-8 text-blue-600" />
        </div>

        <h2 className="text-2xl font-semibold text-center">
          Welcome Back
        </h2>

        <p className="text-sm text-gray-600 mt-3 text-center max-w-sm">
          Access your dashboard to manage courses, assignments, and more.
        </p>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="flex flex-col justify-center px-6 sm:px-10 py-12">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Login
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Enter your credentials to continue
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-5 max-w-md">
          
          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Mail className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Lock className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition">
            Login <ArrowRight className="w-4 h-4" />
          </button>

          {/* Register Link */}
          <p className="text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;