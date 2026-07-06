import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Bell,
  Download,
  UserCheck,
} from "lucide-react";

const students = [
  {
    id: 1,
    name: "John Doe",
    admissionNo: "STD001",
    class: "SS2 Science",
    gender: "Male",
    attendance: "96%",
    average: "88%",
    parent: "Mr. Doe",
    phone: "+2348012345678",
    status: "Active",
  },
  {
    id: 2,
    name: "Mary Johnson",
    admissionNo: "STD002",
    class: "SS2 Science",
    gender: "Female",
    attendance: "92%",
    average: "91%",
    parent: "Mrs. Johnson",
    phone: "+2348098765432",
    status: "Active",
  },
];

export default function TeacherStudentListPage() {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            My Students
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage students assigned to your classes and subjects.
          </p>
        </div>

        <button className="bg-blue-600 text-white rounded-xl px-5 py-3 flex items-center gap-2">
          <Download size={18}/>
          Export List
        </button>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Users className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">120</h2>
          <p>Total Students</p>
        </div>

        <div className="border rounded-3xl p-5">
          <UserCheck className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">115</h2>
          <p>Active Students</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Users className="text-yellow-600 mb-3"/>
          <h2 className="text-2xl font-bold">4</h2>
          <p>Assigned Classes</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Users className="text-purple-600 mb-3"/>
          <h2 className="text-2xl font-bold">6</h2>
          <p>Subjects</p>
        </div>

      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex items-center flex-1 border rounded-xl px-4 py-3">
          <Search className="mr-3 text-gray-500"/>
          <input
            type="text"
            placeholder="Search by student name or admission number..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="outline-none w-full"
          />
        </div>

        <button className="border rounded-xl px-5 flex items-center gap-2">
          <Filter size={18}/>
          Filter
        </button>

      </div>

      {/* Student Table */}
      <div className="border rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1200px]">

            <thead className="bg-gray-50">

              <tr>
                <th className="text-left p-4">Student</th>
                <th className="text-left p-4">Admission No.</th>
                <th className="text-left p-4">Class</th>
                <th className="text-left p-4">Gender</th>
                <th className="text-center p-4">Attendance</th>
                <th className="text-center p-4">Average</th>
                <th className="text-left p-4">Parent</th>
                <th className="text-left p-4">Status</th>
                <th className="text-center p-4">Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredStudents.map((student)=>(
                <tr key={student.id} className="border-t">

                  <td className="p-4 font-medium">
                    {student.name}
                  </td>

                  <td className="p-4">
                    {student.admissionNo}
                  </td>

                  <td className="p-4">
                    {student.class}
                  </td>

                  <td className="p-4">
                    {student.gender}
                  </td>

                  <td className="text-center">
                    {student.attendance}
                  </td>

                  <td className="text-center font-semibold">
                    {student.average}
                  </td>

                  <td className="p-4">
                    {student.parent}
                  </td>

                  <td className="p-4">

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
                      {student.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button className="border rounded-lg p-2">
                        <Eye size={16}/>
                      </button>

                      <button className="border rounded-lg p-2">
                        <Mail size={16}/>
                      </button>

                      <button className="border rounded-lg p-2">
                        <Phone size={16}/>
                      </button>

                      <button className="border rounded-lg p-2">
                        <Bell size={16}/>
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}