import React, { useState } from "react";
import {
  Users,
  Search,
  User,
  GraduationCap,
  CalendarCheck,
  Wallet,
  ClipboardCheck,
  Eye,
  ArrowRight,
} from "lucide-react";

const children = [
  {
    id: 1,
    name: "John Doe",
    admissionNo: "STD001",
    class: "SS2 Science",
    attendance: 96,
    average: 88,
    fees: "Paid",
    assignments: 12,
    photo: "",
  },
  {
    id: 2,
    name: "Mary Doe",
    admissionNo: "STD002",
    class: "JSS3",
    attendance: 93,
    average: 91,
    fees: "Pending",
    assignments: 10,
    photo: "",
  },
];

export default function ParentChildrenOverviewPage() {
  const [search, setSearch] = useState("");

  const filteredChildren = children.filter((child) =>
    child.name.toLowerCase().includes(search.toLowerCase()) ||
    child.admissionNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            My Children
          </h1>
          <p className="text-gray-500 mt-2">
            Monitor your children's academic progress, attendance, assignments,
            and fee payments.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Users className="text-blue-600 mb-3" />
          <h2 className="text-2xl font-bold">2</h2>
          <p>Registered Children</p>
        </div>

        <div className="border rounded-3xl p-5">
          <GraduationCap className="text-green-600 mb-3" />
          <h2 className="text-2xl font-bold">89.5%</h2>
          <p>Average Performance</p>
        </div>

        <div className="border rounded-3xl p-5">
          <CalendarCheck className="text-purple-600 mb-3" />
          <h2 className="text-2xl font-bold">94.5%</h2>
          <p>Attendance</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Wallet className="text-orange-600 mb-3" />
          <h2 className="text-2xl font-bold">1 Pending</h2>
          <p>Fee Status</p>
        </div>

      </div>

      {/* Search */}
      <div className="flex items-center border rounded-xl px-4 py-3">
        <Search className="mr-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search child..."
          className="w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Children Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredChildren.map((child) => (

          <div
            key={child.id}
            className="border rounded-3xl p-6 hover:border-blue-500 transition"
          >

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={30} />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  {child.name}
                </h2>

                <p className="text-gray-500">
                  {child.admissionNo}
                </p>

                <p className="text-sm">
                  {child.class}
                </p>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">

              <div>
                <p className="text-gray-500 text-sm">Attendance</p>
                <p className="font-semibold">{child.attendance}%</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Average</p>
                <p className="font-semibold">{child.average}%</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Assignments</p>
                <p className="font-semibold">
                  {child.assignments}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Fees</p>

                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    child.fees === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {child.fees}
                </span>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">

              <button className="border rounded-xl py-2 flex justify-center items-center gap-2">
                <Eye size={16} />
                Profile
              </button>

              <button className="bg-blue-600 text-white rounded-xl py-2 flex justify-center items-center gap-2">
                View Dashboard
                <ArrowRight size={16} />
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* Recent Activities */}
      <div className="border rounded-3xl p-6">

        <h2 className="text-xl font-semibold mb-5">
          Recent Activities
        </h2>

        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <ClipboardCheck className="text-green-600" />
            <p>
              John Doe submitted Mathematics Assignment.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Wallet className="text-blue-600" />
            <p>
              School fee payment received for Mary Doe.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <GraduationCap className="text-purple-600" />
            <p>
              First Term examination results have been published.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}