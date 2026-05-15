import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  GraduationCap,
  Save,
} from "lucide-react";

const ParentProfilePage = () => {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Parent Profile
        </h1>

        <p className="text-sm text-gray-600 mt-2">
          Manage your personal and student information
        </p>
      </section>

      {/* PROFILE CARD */}
      <section className="border border-gray-200 rounded-2xl p-6 bg-white">

        <div className="flex flex-col sm:flex-row items-center gap-6">

          {/* AVATAR */}
          <div className="relative">

            <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-10 h-10 text-gray-500" />
            </div>

            {/* CAMERA */}
            <button className="absolute bottom-0 right-0 w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>

          </div>

          {/* BASIC INFO */}
          <div className="text-center sm:text-left">

            <h2 className="text-xl font-semibold">
              Mr. Adewale Johnson
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Parent Account
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4 text-sm text-gray-600">

              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                parent@email.com
              </div>

              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                +234 800 000 0000
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FORM */}
      <section className="grid gap-6 lg:grid-cols-2">

        {/* PERSONAL INFO */}
        <div className="border border-gray-200 rounded-2xl p-5 bg-white">

          <h2 className="text-lg font-semibold mb-5">
            Personal Information
          </h2>

          <div className="space-y-4">

            {/* FULL NAME */}
            <div>
              <label className="text-sm text-gray-500 mb-2 block">
                Full Name
              </label>

              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <User className="w-4 h-4 text-gray-500 mr-2" />

                <input
                  type="text"
                  defaultValue="Adewale Johnson"
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-500 mb-2 block">
                Email Address
              </label>

              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <Mail className="w-4 h-4 text-gray-500 mr-2" />

                <input
                  type="email"
                  defaultValue="parent@email.com"
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm text-gray-500 mb-2 block">
                Phone Number
              </label>

              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <Phone className="w-4 h-4 text-gray-500 mr-2" />

                <input
                  type="text"
                  defaultValue="+234 800 000 0000"
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <label className="text-sm text-gray-500 mb-2 block">
                Address
              </label>

              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <MapPin className="w-4 h-4 text-gray-500 mr-2" />

                <input
                  type="text"
                  defaultValue="Lagos, Nigeria"
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
            </div>

          </div>

        </div>

        {/* STUDENT INFO */}
        <div className="border border-gray-200 rounded-2xl p-5 bg-white">

          <h2 className="text-lg font-semibold mb-5">
            Linked Student
          </h2>

          <div className="space-y-4">

            {/* STUDENT CARD */}
            <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>

              <div>
                <h3 className="font-medium">
                  John Doe
                </h3>

                <p className="text-sm text-gray-500">
                  SS2 • Admission No: STD1023
                </p>
              </div>

            </div>

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

export default ParentProfilePage;