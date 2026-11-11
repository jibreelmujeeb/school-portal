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

const initialRoles = [
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
  const [roles, setRoles] = useState(initialRoles);
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState("");
  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  const createRole = () => {
    const name = window.prompt("Enter a role name:");
    if (!name?.trim()) return;
    if (roles.some((role) => role.name.toLowerCase() === name.trim().toLowerCase())) {
      setNotice("A role with that name already exists.");
      return;
    }
    setRoles((current) => [...current, {
      id: Date.now(), name: name.trim(), users: 0, permissions: 0, status: "Active",
    }]);
    setNotice(`${name.trim()} added to the local role list with no permissions.`);
  };

  const editRole = (role) => {
    if (role.status === "System") {
      setNotice("System roles cannot be renamed.");
      return;
    }
    const name = window.prompt("Role name:", role.name);
    if (!name?.trim()) return;
    setRoles((current) => current.map((item) => item.id === role.id ? { ...item, name: name.trim() } : item));
    setNotice(`${role.name} renamed in the local role list.`);
  };

  const duplicateRole = (role) => {
    const name = window.prompt("Name for the copied role:", `${role.name} Copy`);
    if (!name?.trim()) return;
    if (roles.some((item) => item.name.toLowerCase() === name.trim().toLowerCase())) {
      setNotice("A role with that name already exists.");
      return;
    }
    setRoles((current) => [...current, { ...role, id: Date.now(), name: name.trim(), users: 0, status: "Active" }]);
    setNotice(`${name.trim()} added as a local copy.`);
  };

  const exportRole = (role) => {
    const csv = ["Role,Users,Permissions,Status", [role.name, role.users, role.permissions, role.status]
      .map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${role.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-role.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

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

        <button onClick={createRole} className="bg-blue-600 text-white rounded-xl px-5 py-3 flex items-center gap-2">

          <UserPlus size={18} />

          Create Role

        </button>

      </div>
      {notice && <p role="status" className="text-sm text-blue-700">{notice}</p>}

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

                    <button aria-label={`View ${role.name}`} title="View role" onClick={() => setSelected(role)} className="border rounded-lg p-2">
                      <Eye size={16}/>
                    </button>

                    <button aria-label={`Edit ${role.name}`} title="Edit role" onClick={() => editRole(role)} className="border rounded-lg p-2">
                      <Edit size={16}/>
                    </button>

                    <button aria-label={`Copy ${role.name}`} title="Copy role" onClick={() => duplicateRole(role)} className="border rounded-lg p-2">
                      <Copy size={16}/>
                    </button>

                    <button aria-label={`Export ${role.name}`} title="Export role" onClick={() => exportRole(role)} className="border rounded-lg p-2">
                      <Download size={16}/>
                    </button>

                    <button aria-label={`Delete ${role.name}`} title="Delete role" disabled={role.status === "System"} onClick={() => {
                      if (window.confirm(`Delete the local "${role.name}" role?`)) {
                        setRoles((current) => current.filter((item) => item.id !== role.id));
                        setNotice(`${role.name} removed from the local role list.`);
                      }
                    }} className="border rounded-lg p-2 disabled:opacity-40">
                      <Trash2 size={16}/>
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {filteredRoles.length === 0 && <p className="p-5 text-center text-gray-500">No roles match your search.</p>}

      {selected && (
        <div role="dialog" aria-modal="true" aria-labelledby="role-details-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 id="role-details-title" className="text-xl font-bold">{selected.name}</h2>
            <p className="mt-4">{selected.users} assigned users</p>
            <p>{selected.permissions} permissions</p>
            <p>Status: {selected.status}</p>
            <p className="mt-3 text-sm text-gray-500">Permission-level configuration is not available in this local mock.</p>
            <button autoFocus onClick={() => setSelected(null)} className="mt-5 rounded-lg border px-4 py-2">Close</button>
          </div>
        </div>
      )}

    </div>

  );
}