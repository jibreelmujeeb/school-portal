import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Shield,
  Lock,
  Camera,
  Edit,
  Key,
  Download,
} from "lucide-react";

export default function AccountantProfilePage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row items-center gap-6 border rounded-3xl p-6">

        <div className="relative">

          <img
            src="/images/avatar.png"
            alt="profile"
            className="w-32 h-32 rounded-full object-cover border"
          />

          <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full">
            <Camera size={16} />
          </button>

        </div>

        <div className="flex-1">

          <h1 className="text-3xl font-bold">John Doe</h1>

          <p className="text-gray-500 mt-2">
            Senior Accountant
          </p>

          <p className="text-gray-500">
            Finance Department
          </p>

        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Edit size={18} />
          Edit Profile
        </button>

      </div>

      {/* Overview Cards */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <User className="text-blue-600 mb-3" />
          <h2 className="text-2xl font-bold">95%</h2>
          <p>Profile Complete</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Calendar className="text-green-600 mb-3" />
          <h2 className="text-2xl font-bold">8 Years</h2>
          <p>Service</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Briefcase className="text-purple-600 mb-3" />
          <h2 className="text-2xl font-bold">245</h2>
          <p>Reports</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Shield className="text-orange-600 mb-3" />
          <h2 className="text-2xl font-bold">4,860</h2>
          <p>Receipts Processed</p>
        </div>

      </div>

      {/* Profile Details */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="border rounded-3xl p-6 space-y-4">

          <h2 className="text-xl font-bold">
            Personal Information
          </h2>

          <p className="flex items-center gap-3">
            <Mail size={18}/> john@example.com
          </p>

          <p className="flex items-center gap-3">
            <Phone size={18}/> +234 800 123 4567
          </p>

          <p className="flex items-center gap-3">
            <MapPin size={18}/> Lagos, Nigeria
          </p>

        </div>

        <div className="border rounded-3xl p-6 space-y-4">

          <h2 className="text-xl font-bold">
            Security
          </h2>

          <p className="flex items-center gap-3">
            <Lock size={18}/> Last Login: Today, 09:20 AM
          </p>

          <p className="flex items-center gap-3">
            <Shield size={18}/> Two-Factor Authentication Enabled
          </p>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <button className="border rounded-2xl p-5 flex flex-col items-center gap-2">
          <Edit />
          Edit Profile
        </button>

        <button className="border rounded-2xl p-5 flex flex-col items-center gap-2">
          <Key />
          Change Password
        </button>

        <button className="border rounded-2xl p-5 flex flex-col items-center gap-2">
          <Download />
          Download Profile
        </button>

        <button className="border rounded-2xl p-5 flex flex-col items-center gap-2">
          <Camera />
          Update Photo
        </button>

      </div>

    </div>
  );
}