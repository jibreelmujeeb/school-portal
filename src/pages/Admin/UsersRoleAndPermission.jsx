import React, { useState } from "react";
import {
  Shield,
  Users,
  KeyRound,
  Search,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  Copy,
  Download,
} from "lucide-react";

const roles = [
  {
    id: 1,
    name: "Super Admin",
    users: 2,
    permissions: 150,
    status: "System",
  },
  {
    id: 2,
    name: "Teacher",
    users: 48,
    permissions: 42,
    status: "Active",
  },
  {
    id: 3,
    name: "Parent",
    users: 560,
    permissions: 18,
    status: "Active",
  },
];

export default function UserRolesPermissionPage() {

  const [search, setSearch] = useState("");

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold">
            User Roles & Permissions
          </h1>

          <p className="text-gray-500 mt-2">
            Manage system roles and permission settings.
          </p>

        </div>

        <button className="bg-blue-600 text-white rounded-xl px-5 py-3 flex items-center gap-2">

          <UserPlus size={18} />

          Create Role

        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">

          <Shield className="text-blue-600 mb-3"/>

          <h2 className="text-2xl font-bold">14</h2>

          <p>Total Roles</p>

        </div>

        <div className="border rounded-3xl p-5">

          <KeyRound className="text-green-600 mb-3"/>

          <h2 className="text-2xl font-bold">150</h2>

          <p>Permissions</p>

        </div>

        <div className="border rounded-3xl p-5">

          <Users className="text-purple-600 mb-3"/>

          <h2 className="text-2xl font-bold">1,420</h2>

          <p>Assigned Users</p>

        </div>

        <div className="border rounded-3xl p-5">

          <Shield className="text-orange-600 mb-3"/>

          <h2 className="text-2xl font-bold">8</h2>

          <p>Recent Changes</p>

        </div>

      </div>

      {/* Search */}

      <div className="flex items-center border rounded-xl px-4 py-3">

        <Search className="mr-3"/>

        <input
          placeholder="Search roles..."
          className="outline-none w-full"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </div>

      {/* Roles Table */}

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead className="bg-gray-50">

            <tr>

              <th>Role</th>
              <th>Users</th>
              <th>Permissions</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredRoles.map(role => (

              <tr key={role.id} className="border-t">

                <td>{role.name}</td>

                <td>{role.users}</td>

                <td>{role.permissions}</td>

                <td>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
                    {role.status}
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
                      <Copy size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Download size={16}/>
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