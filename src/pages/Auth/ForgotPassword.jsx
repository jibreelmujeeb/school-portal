import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  KeyRound,
} from "lucide-react";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      
      <div className="w-full max-w-md">
        
        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-blue-50">
            <KeyRound className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Enter your email and we’ll send you a reset link
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-5 border border-gray-200 rounded-2xl p-6 bg-white">
          
          {/* EMAIL */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:border-blue-600 transition">
            <Mail className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {/* BUTTON */}
          <button className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition">
            Send Reset Link <ArrowRight className="w-4 h-4" />
          </button>

          {/* BACK TO LOGIN */}
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;