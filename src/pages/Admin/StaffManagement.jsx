import React, { useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Download,
  Building2,
  X,
} from "lucide-react";

const initialStaff = [
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

const emptyForm = {
  name: "",
  department: "",
  role: "",
  phone: "",
  email: "",
  status: "Active",
};

const csvValue = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;

export default function AdminStaffManagementPage() {
  const [staff, setStaff] = useState(initialStaff);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dialog, setDialog] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const departments = useMemo(
    () => [...new Set(staff.map((member) => member.department))].sort(),
    [staff]
  );

  const filteredStaff = staff.filter((member) => {
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      [member.staffId, member.name, member.department, member.role, member.email]
        .some((value) => value.toLowerCase().includes(query));
    return (
      matchesSearch &&
      (!departmentFilter || member.department === departmentFilter) &&
      (!statusFilter || member.status === statusFilter)
    );
  });

  const openAddDialog = () => {
    setForm(emptyForm);
    setFormError("");
    setDialog({ type: "form" });
  };

  const openEditDialog = (member) => {
    setForm({
      name: member.name,
      department: member.department,
      role: member.role,
      phone: member.phone,
      email: member.email,
      status: member.status,
    });
    setFormError("");
    setDialog({ type: "form", member });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedForm = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [key, value.trim()])
    );
    const emailTaken = staff.some(
      (member) =>
        member.id !== dialog.member?.id &&
        member.email.toLowerCase() === normalizedForm.email.toLowerCase()
    );

    if (emailTaken) {
      setFormError("A staff member with this email address already exists.");
      return;
    }

    if (dialog.member) {
      setStaff((current) =>
        current.map((member) =>
          member.id === dialog.member.id
            ? { ...member, ...normalizedForm }
            : member
        )
      );
    } else {
      const nextId = Math.max(0, ...staff.map((member) => member.id)) + 1;
      const nextStaffNumber =
        Math.max(
          0,
          ...staff.map((member) => Number(member.staffId.replace(/\D/g, "")) || 0)
        ) + 1;
      setStaff((current) => [
        ...current,
        {
          id: nextId,
          staffId: `STF${String(nextStaffNumber).padStart(3, "0")}`,
          ...normalizedForm,
        },
      ]);
    }

    setDialog(null);
  };

  const exportStaff = () => {
    const headers = ["Staff ID", "Name", "Department", "Role", "Phone", "Email", "Status"];
    const rows = filteredStaff.map((member) => [
      member.staffId,
      member.name,
      member.department,
      member.role,
      member.phone,
      member.email,
      member.status,
    ]);
    const csv = [headers, ...rows].map((row) => row.map(csvValue).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "staff.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const removeStaff = (member) => {
    if (window.confirm(`Delete ${member.name} from the staff directory?`)) {
      setStaff((current) => current.filter((entry) => entry.id !== member.id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-gray-500 mt-2">
            Manage all school staff, departments, roles, and employment records.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddDialog}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <UserPlus size={18} />
          Add Staff
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<Users className="text-blue-600 mb-3" />} value={staff.length} label="Total Staff" />
        <StatCard
          icon={<Users className="text-green-600 mb-3" />}
          value={staff.filter((member) => member.status === "Active").length}
          label="Active Staff"
        />
        <StatCard
          icon={<Building2 className="text-purple-600 mb-3" />}
          value={departments.length}
          label="Departments"
        />
        <StatCard
          icon={<Users className="text-orange-600 mb-3" />}
          value={staff.filter((member) => member.status === "On Leave").length}
          label="On Leave"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">
          <Search className="mr-3 shrink-0" size={18} />
          <input
            type="search"
            placeholder="Search staff by name, ID, department, role, or email..."
            aria-label="Search staff"
            className="outline-none w-full"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          className="border rounded-xl px-4 py-3"
          aria-label="Filter by department"
          value={departmentFilter}
          onChange={(event) => setDepartmentFilter(event.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map((department) => (
            <option key={department} value={department}>{department}</option>
          ))}
        </select>

        <select
          className="border rounded-xl px-4 py-3"
          aria-label="Filter by status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          type="button"
          onClick={exportStaff}
          className="border rounded-xl px-5 py-3 flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      <div className="border rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
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
              {filteredStaff.map((member) => (
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
                          : member.status === "On Leave"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <ActionButton label={`View ${member.name}`} onClick={() => setDialog({ type: "view", member })}>
                        <Eye size={16} />
                      </ActionButton>
                      <ActionButton label={`Edit ${member.name}`} onClick={() => openEditDialog(member)}>
                        <Edit size={16} />
                      </ActionButton>
                      <a
                        href={`mailto:${member.email}`}
                        aria-label={`Email ${member.name}`}
                        title={`Email ${member.name}`}
                        className="border rounded-lg p-2"
                      >
                        <Mail size={16} />
                      </a>
                      <a
                        href={`tel:${member.phone}`}
                        aria-label={`Call ${member.name}`}
                        title={`Call ${member.name}`}
                        className="border rounded-lg p-2"
                      >
                        <Phone size={16} />
                      </a>
                      <ActionButton label={`Delete ${member.name}`} onClick={() => removeStaff(member)}>
                        <Trash2 size={16} />
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStaff.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-500">
                    No staff match your search and filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {dialog?.type === "form" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="staff-form-title"
            className="bg-white rounded-2xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 id="staff-form-title" className="text-xl font-bold">
                {dialog.member ? "Edit Staff Member" : "Add Staff Member"}
              </h2>
              <button type="button" onClick={() => setDialog(null)} aria-label="Close dialog">
                <X />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label="Full name" name="name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} required />
              <FormField label="Department" name="department" value={form.department} onChange={(value) => setForm({ ...form, department: value })} required />
              <FormField label="Role" name="role" value={form.role} onChange={(value) => setForm({ ...form, role: value })} required />
              <FormField label="Phone" name="phone" type="tel" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} required />
              <FormField label="Email" name="email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required />
              <label className="block text-sm font-medium">
                Status
                <select
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={form.status}
                  onChange={(event) => setForm({ ...form, status: event.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
              {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" className="border rounded-lg px-4 py-2" onClick={() => setDialog(null)}>
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2">
                  {dialog.member ? "Save Changes" : "Add Staff"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {dialog?.type === "view" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="staff-details-title"
            className="bg-white rounded-2xl p-6 w-full max-w-lg"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 id="staff-details-title" className="text-xl font-bold">Staff Details</h2>
              <button type="button" onClick={() => setDialog(null)} aria-label="Close dialog">
                <X />
              </button>
            </div>
            <dl className="grid grid-cols-2 gap-4">
              <Detail label="Staff ID" value={dialog.member.staffId} />
              <Detail label="Name" value={dialog.member.name} />
              <Detail label="Department" value={dialog.member.department} />
              <Detail label="Role" value={dialog.member.role} />
              <Detail label="Phone" value={dialog.member.phone} />
              <Detail label="Email" value={dialog.member.email} />
              <Detail label="Status" value={dialog.member.status} />
            </dl>
          </section>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="border rounded-3xl p-5">
      {icon}
      <h2 className="text-2xl font-bold">{value}</h2>
      <p>{label}</p>
    </div>
  );
}

function ActionButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      className="border rounded-lg p-2"
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function FormField({ label, name, type = "text", value, onChange, required }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        className="mt-1 w-full border rounded-lg px-3 py-2"
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </label>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="font-medium break-words">{value}</dd>
    </div>
  );
}
