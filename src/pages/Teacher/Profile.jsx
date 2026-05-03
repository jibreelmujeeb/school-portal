import React from "react";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Lock,
  Save,
} from "lucide-react";

const TeacherProfile = () => {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Profile
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Manage your personal information
        </p>
      </section>

      {/* PROFILE CARD */}
      <section className="border border-gray-200 rounded-2xl p-6 bg-white flex flex-col sm:flex-row items-center gap-6">
        
        {/* AVATAR */}
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
          <User className="w-8 h-8 text-gray-500" />
        </div>

        {/* BASIC INFO */}
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold">
            Mr. Adewale
          </h2>
          <p className="text-sm text-gray-500">
            adewale@email.com
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Mathematics Teacher
          </p>

          <button className="mt-3 text-sm text-blue-600 hover:underline">
            Change Photo
          </button>
        </div>

      </section>

      {/* EDIT PROFILE */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Edit Profile
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">

          {/* NAME */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <User className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {/* EMAIL */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Mail className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {/* PHONE */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Phone className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {/* SUBJECT */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <BookOpen className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Subject"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

        </div>
      </section>

      {/* PASSWORD */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Change Password
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Lock className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="New Password"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Lock className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

        </div>
      </section>

      {/* SAVE BUTTON */}
      <section className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </section>

    </div>
  );
};

export default TeacherProfile;