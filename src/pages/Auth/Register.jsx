import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  User,
  Mail,
  Lock,
  Phone,
  ArrowRight,
} from "lucide-react";

const Register = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gray-50">
      
      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center items-center px-10 border-r border-gray-200 bg-white">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6">
          <GraduationCap className="w-8 h-8 text-blue-600" />
        </div>

        <h2 className="text-2xl font-semibold text-center">
          Create an Account
        </h2>

        <p className="text-sm text-gray-600 mt-3 text-center max-w-sm">
          Join the platform to manage your academic activities بسهولة.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col justify-center px-6 sm:px-10 py-12">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Register
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Fill in your details to create an account
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-5 max-w-md">
          
          {/* NAME */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <User className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {/* EMAIL */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Mail className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {/* PHONE */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Phone className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {/* ROLE */}
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none">
            <option>Select Role</option>
            <option>Student</option>
            <option>Teacher</option>
          </select>

          {/* PASSWORD */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Lock className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Lock className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {/* BUTTON */}
          <button className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition">
            Register <ArrowRight className="w-4 h-4" />
          </button>

          {/* LOGIN LINK */}
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