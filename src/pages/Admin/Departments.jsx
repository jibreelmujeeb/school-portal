import React, { useState } from "react";
import {
  Building2,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Users,
  BookOpen,
  Download,
} from "lucide-react";

const departments = [
  {
    id: 1,
    name: "Computer Science",
    hod: "Mr. David Johnson",
    teachers: 8,
    staff: 2,
    subjects: 4,
    status: "Active",
  },
  {
    id: 2,
    name: "Mathematics",
    hod: "Mrs. Sarah Peter",
    teachers: 10,
    staff: 1,
    subjects: 3,
    status: "Active",
  },
];

export default function AdminDepartmentsPage() {
  const [search, setSearch] = useState("");

  const filtered = departments.filter((dept) =>
    dept.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Departments
          </h1>

          <p className="text-gray-500 mt-2">
            Manage academic and administrative departments.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18}/>
          Add Department
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Building2 className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">25</h2>
          <p>Departments</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Users className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">85</h2>
          <p>Teachers</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Users className="text-purple-600 mb-3"/>
          <h2 className="text-2xl font-bold">40</h2>
          <p>Staff</p>
        </div>

        <div className="border rounded-3xl p-5">
          <BookOpen className="text-orange-600 mb-3"/>
          <h2 className="text-2xl font-bold">120</h2>
          <p>Subjects</p>
        </div>

      </div>

      {/* Search */}

      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">

          <Search className="mr-3"/>

          <input
            placeholder="Search department..."
            className="outline-none w-full"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>

        <button className="border rounded-xl px-5 flex items-center gap-2">
          <Filter size={18}/>
          Filter
        </button>

        <button className="border rounded-xl px-5 flex items-center gap-2">
          <Download size={18}/>
          Export
        </button>

      </div>

      {/* Table */}

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[1100px]">

          <thead className="bg-gray-50">

            <tr>

              <th>Department</th>
              <th>Head</th>
              <th>Teachers</th>
              <th>Staff</th>
              <th>Subjects</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((dept)=>(
              <tr key={dept.id} className="border-t">

                <td>{dept.name}</td>

                <td>{dept.hod}</td>

                <td>{dept.teachers}</td>

                <td>{dept.staff}</td>

                <td>{dept.subjects}</td>

                <td>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
                    {dept.status}
                  </span>

                </td>

                <td>

                  <div className="flex gap-2">

                    <button className="border rounded-lg p-2">
                      <Eye size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Edit size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Trash2 size={16}/>
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}