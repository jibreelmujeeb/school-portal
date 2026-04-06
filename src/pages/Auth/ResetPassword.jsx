import React from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      
      <div className="w-full max-w-md">
        
        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-blue-50">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Reset Password
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Enter a new password for your account
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-5 border border-gray-200 rounded-2xl p-6 bg-white">
          
          {/* NEW PASSWORD */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:border-blue-600 transition">
            <Lock className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="New Password"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:border-blue-600 transition">
            <Lock className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {/* BUTTON */}
          <button className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition">
            Reset Password <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* SUCCESS MESSAGE (Optional State) */}
        {/* 
        <div className="mt-6 border border-green-300 rounded-2xl p-4 bg-white text-center">
          <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-sm text-gray-700">
            Your password has been successfully reset.
          </p>
          <Link to="/login" className="text-blue-600 text-sm mt-2 inline-block">
            Go to Login
          </Link>
        </div>
        */}
        
      </div>
    </div>
  );
};

export default ResetPassword;