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
  Bell,
  KeyRound,
  Download,
  Building2,
} from "lucide-react";

const staff = [
  {
    id: 1,
    staffId: "STF001",
    name: "James Williams",
    department: "Administration",
    role: "Administrator",
    phone: "+2348012345678",
    email: "james@school.com",
    status: "Active",
  },
  {
    id: 2,
    staffId: "STF002",
    name: "Sarah Johnson",
    department: "Finance",
    role: "Accountant",
    phone: "+2348098765432",
    email: "sarah@school.com",
    status: "On Leave",
  },
];

export default function AdminStaffManagementPage() {
  const [search, setSearch] = useState("");

  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.staffId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Staff Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all school staff, departments, roles, and employment records.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <UserPlus size={18}/>
          Add Staff
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Users className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">125</h2>
          <p>Total Staff</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Users className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">118</h2>
          <p>Active Staff</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Building2 className="text-purple-600 mb-3"/>
          <h2 className="text-2xl font-bold">12</h2>
          <p>Departments</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Users className="text-orange-600 mb-3"/>
          <h2 className="text-2xl font-bold">7</h2>
          <p>On Leave</p>
        </div>

      </div>

      {/* Search & Actions */}

      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">
          <Search className="mr-3"/>
          <input
            type="text"
            placeholder="Search staff by name or ID..."
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

      {/* Staff Table */}

      <div className="border rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1200px]">

            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Staff ID</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Department</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Phone</th>
                <th className="text-left p-4">Email</th>
                <th className="text-center p-4">Status</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredStaff.map((member)=>(
                <tr key={member.id} className="border-t">

                  <td className="p-4">{member.staffId}</td>

                  <td className="p-4 font-medium">{member.name}</td>

                  <td className="p-4">{member.department}</td>

                  <td className="p-4">{member.role}</td>

                  <td className="p-4">{member.phone}</td>

                  <td className="p-4">{member.email}</td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        member.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">

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

    </div>
  );
}