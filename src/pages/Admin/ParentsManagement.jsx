import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  KeyRound,
  Bell,
  Download,
} from "lucide-react";

const parents = [
  {
    id: 1,
    name: "Mr. Michael Johnson",
    email: "michael@gmail.com",
    phone: "+2348012345678",
    children: 2,
    status: "Active",
    feeStatus: "Paid",
  },
  {
    id: 2,
    name: "Mrs. Grace Peter",
    email: "grace@gmail.com",
    phone: "+2348098765432",
    children: 1,
    status: "Inactive",
    feeStatus: "Pending",
  },
];

export default function AdminParentsManagement() {
  const [search, setSearch] = useState("");

  const filtered = parents.filter((parent) =>
    parent.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Parents Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage parent accounts, linked students, and communications.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <UserPlus size={18}/>
          Add Parent
        </button>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Users className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">560</h2>
          <p>Total Parents</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Users className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">530</h2>
          <p>Active</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Users className="text-purple-600 mb-3"/>
          <h2 className="text-2xl font-bold">710</h2>
          <p>Linked Students</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Users className="text-red-600 mb-3"/>
          <h2 className="text-2xl font-bold">38</h2>
          <p>Pending Fees</p>
        </div>

      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">
          <Search className="mr-3"/>
          <input
            className="outline-none w-full"
            placeholder="Search parent..."
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

      {/* Parents Table */}
      <div className="border rounded-3xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[1200px]">

          <thead className="bg-gray-50">

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Children</th>
              <th>Fee Status</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filtered.map((parent)=>(

              <tr key={parent.id} className="border-t">

                <td>{parent.name}</td>

                <td>{parent.email}</td>

                <td>{parent.phone}</td>

                <td>{parent.children}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full ${
                      parent.feeStatus==="Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {parent.feeStatus}
                  </span>
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full ${
                      parent.status==="Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {parent.status}
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
                      <Mail size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Phone size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Bell size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <KeyRound size={16}/>
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