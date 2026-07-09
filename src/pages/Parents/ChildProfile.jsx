import React from "react";
import {
  User,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Heart,
  Users,
  Wallet,
  ClipboardCheck,
  BookOpen,
  Award,
  Eye,
} from "lucide-react";

const student = {
  name: "John Doe",
  admissionNo: "STD001",
  gender: "Male",
  dob: "15 March 2010",
  class: "SS2 Science",
  session: "2025/2026",
  section: "A",
  email: "john@student.com",
  phone: "+2348012345678",
  address: "Lagos, Nigeria",
  parent: "Mr. Michael Doe",
  parentPhone: "+2348098765432",
  parentEmail: "parent@email.com",
  bloodGroup: "O+",
  genotype: "AA",
  attendance: "96%",
  average: "88%",
  feeStatus: "Paid",
};

export default function ParentChildProfilePage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="border rounded-3xl p-6">

        <div className="flex flex-col md:flex-row items-center gap-6">

          <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={50} />
          </div>

          <div className="flex-1">

            <h1 className="text-3xl font-bold">
              {student.name}
            </h1>

            <p className="text-gray-500 mt-2">
              Admission No: {student.admissionNo}
            </p>

            <div className="flex flex-wrap gap-3 mt-4">

              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                {student.class}
              </span>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
                {student.session}
              </span>

              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                Active Student
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <ClipboardCheck className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">
            {student.attendance}
          </h2>
          <p>Attendance</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Award className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">
            {student.average}
          </h2>
          <p>Academic Average</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Wallet className="text-purple-600 mb-3"/>
          <h2 className="text-xl font-bold">
            {student.feeStatus}
          </h2>
          <p>Fee Status</p>
        </div>

        <div className="border rounded-3xl p-5">
          <BookOpen className="text-orange-600 mb-3"/>
          <h2 className="text-2xl font-bold">
            SS2
          </h2>
          <p>Current Class</p>
        </div>

      </div>

      {/* Information */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Personal */}
        <div className="border rounded-3xl p-6">

          <h2 className="text-xl font-semibold mb-5">
            Personal Information
          </h2>

          <div className="space-y-4">

            <div className="flex gap-3">
              <User />
              <span>{student.name}</span>
            </div>

            <div className="flex gap-3">
              <GraduationCap />
              <span>{student.class}</span>
            </div>

            <div className="flex gap-3">
              <Calendar />
              <span>{student.dob}</span>
            </div>

            <div className="flex gap-3">
              <Phone />
              <span>{student.phone}</span>
            </div>

            <div className="flex gap-3">
              <Mail />
              <span>{student.email}</span>
            </div>

            <div className="flex gap-3">
              <MapPin />
              <span>{student.address}</span>
            </div>

          </div>

        </div>

        {/* Parent */}
        <div className="border rounded-3xl p-6">

          <h2 className="text-xl font-semibold mb-5">
            Parent / Guardian
          </h2>

          <div className="space-y-4">

            <div className="flex gap-3">
              <Users />
              <span>{student.parent}</span>
            </div>

            <div className="flex gap-3">
              <Phone />
              <span>{student.parentPhone}</span>
            </div>

            <div className="flex gap-3">
              <Mail />
              <span>{student.parentEmail}</span>
            </div>

          </div>

          <h2 className="text-xl font-semibold mt-8 mb-5">
            Medical Information
          </h2>

          <div className="space-y-4">

            <div className="flex gap-3">
              <Heart />
              <span>Blood Group: {student.bloodGroup}</span>
            </div>

            <div className="flex gap-3">
              <Heart />
              <span>Genotype: {student.genotype}</span>
            </div>

          </div>

        </div>

      </div>

      {/* Quick Actions */}
      <div className="border rounded-3xl p-6">

        <h2 className="text-xl font-semibold mb-6">
          Quick Access
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <button className="border rounded-xl py-4 flex flex-col items-center gap-2">
            <Eye />
            Results
          </button>

          <button className="border rounded-xl py-4 flex flex-col items-center gap-2">
            <ClipboardCheck />
            Attendance
          </button>

          <button className="border rounded-xl py-4 flex flex-col items-center gap-2">
            <Wallet />
            Fees
          </button>

          <button className="border rounded-xl py-4 flex flex-col items-center gap-2">
            <BookOpen />
            Assignments
          </button>

        </div>

      </div>

    </div>
  );
}