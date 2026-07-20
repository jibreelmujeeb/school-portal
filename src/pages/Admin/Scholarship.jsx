import React, { useState } from "react";
import {
  GraduationCap,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  CheckCircle,
} from "lucide-react";

const scholarships = [
  {
    id: 1,
    title: "Academic Excellence Scholarship",
    category: "Merit",
    beneficiaries: 25,
    value: "100% Tuition",
    status: "Active",
  },
  {
    id: 2,
    title: "Sports Scholarship",
    category: "Sports",
    beneficiaries: 15,
    value: "50% Tuition",
    status: "Active",
  },
];

export default function AdminScholarshipPage() {
  const [search, setSearch] = useState("");

  const filtered = scholarships.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold">
            Scholarship Management
          </h1>

          <p className="text-gray-500 mt-2">
            Create and manage scholarship programs and beneficiaries.
          </p>

        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18}/>
          New Scholarship
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <GraduationCap className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">12</h2>
          <p>Scholarships</p>
        </div>

        <div className="border rounded-3xl p-5">
          <CheckCircle className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">250</h2>
          <p>Applications</p>
        </div>

        <div className="border rounded-3xl p-5">
          <GraduationCap className="text-purple-600 mb-3"/>
          <h2 className="text-2xl font-bold">80</h2>
          <p>Beneficiaries</p>
        </div>

        <div className="border rounded-3xl p-5">
          <GraduationCap className="text-orange-600 mb-3"/>
          <h2 className="text-2xl font-bold">₦18M</h2>
          <p>Budget</p>
        </div>

      </div>

      {/* Search */}

      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex-1 flex items-center border rounded-xl px-4 py-3">
          <Search className="mr-3"/>
          <input
            placeholder="Search scholarship..."
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

              <th>Scholarship</th>
              <th>Category</th>
              <th>Beneficiaries</th>
              <th>Value</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((item)=>(
              <tr key={item.id} className="border-t">

                <td>{item.title}</td>

                <td>{item.category}</td>

                <td>{item.beneficiaries}</td>

                <td>{item.value}</td>

                <td>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
                    {item.status}
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