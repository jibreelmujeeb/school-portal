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
    <div className="min-h-screen flex bg-gray-50">
      
      {/* LEFT SIDE (Desktop Only) */}
      <div className="hidden lg:flex w-1/2 border-r border-gray-200 bg-white items-center justify-center px-12">
        <div className="max-w-sm text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-blue-50">
              <GraduationCap className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold">
            Welcome Back
          </h2>

          <p className="text-sm text-gray-600 mt-3">
            Login to manage your courses, assignments, and academic progress.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 md:px-10 py-10">
        
        <div className="w-full max-w-md">
          
          {/* Mobile Logo */}
          <div className="flex justify-center mb-6 lg:hidden">
            <div className="p-3 rounded-full bg-blue-50">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Header */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Login
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Enter your details to continue
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-5">
            
            {/* Email */}
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:border-blue-600 transition">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full outline-none text-sm bg-transparent"
              />
            </div>

            {/* Password */}
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:border-blue-600 transition">
              <Lock className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="password"
                placeholder="Password"
                className="w-full outline-none text-sm bg-transparent"
              />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-blue-600" />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* BUTTON */}
            <button className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition">
              Login <ArrowRight className="w-4 h-4" />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex-1 border-t border-gray-200"></div>
              OR
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Register */}
            <p className="text-sm text-gray-600 text-center">
              Don’t have an account?{" "}
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