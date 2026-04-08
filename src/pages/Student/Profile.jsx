import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  CalendarDays,
  School,
  Pencil,
} from "lucide-react";

const StudentProfile = () => {
  return (
    <div className="space-y-10">
      
      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border border-gray-200 rounded-2xl p-6 bg-white">
        
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold">
            JM
          </div>

          {/* Info */}
          <div>
            <h2 className="text-lg font-semibold">Jibreel Mujeeb</h2>
            <p className="text-sm text-gray-600">Student</p>
          </div>
        </div>

        {/* Edit Button */}
        <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition">
          <Pencil className="w-4 h-4" />
          Edit Profile
        </button>
      </section>

      {/* PERSONAL INFO */}
      <section>
        <h3 className="text-lg font-semibold mb-4">
          Personal Information
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          
          <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <User className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="text-sm font-medium">Jibreel Mujeeb</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <CalendarDays className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Date of Birth</p>
              <p className="text-sm font-medium">12 Jan 2005</p>
            </div>
          </div>

        </div>
      </section>

      {/* ACADEMIC INFO */}
      <section>
        <h3 className="text-lg font-semibold mb-4">
          Academic Information
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          
          <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Class</p>
              <p className="text-sm font-medium">SS2</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <School className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Department</p>
              <p className="text-sm font-medium">Science</p>
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT INFO */}
      <section>
        <h3 className="text-lg font-semibold mb-4">
          Contact Information
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          
          <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium">jibreel@email.com</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm font-medium">+234 800 000 0000</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 sm:col-span-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="text-sm font-medium">
                Ibadan, Nigeria
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default StudentProfile;