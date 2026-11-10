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
  X,
} from "lucide-react";

const initialDepartments = [
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

const emptyForm = {
  name: "",
  hod: "",
  teachers: "0",
  staff: "0",
  subjects: "0",
  status: "Active",
};

const csvValue = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState(initialDepartments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dialog, setDialog] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const query = search.trim().toLowerCase();
  const filteredDepartments = departments.filter((department) => {
    const matchesSearch =
      !query ||
      [department.name, department.hod].some((value) =>
        value.toLowerCase().includes(query)
      );
    return matchesSearch && (!statusFilter || department.status === statusFilter);
  });

  const totalTeachers = departments.reduce(
    (total, department) => total + department.teachers,
    0
  );
  const totalStaff = departments.reduce(
    (total, department) => total + department.staff,
    0
  );
  const totalSubjects = departments.reduce(
    (total, department) => total + department.subjects,
    0
  );

  const openAddDialog = () => {
    setForm(emptyForm);
    setFormError("");
    setDialog({ type: "form" });
  };

  const openEditDialog = (department) => {
    setForm({
      name: department.name,
      hod: department.hod,
      teachers: String(department.teachers),
      staff: String(department.staff),
      subjects: String(department.subjects),
      status: department.status,
    });
    setFormError("");
    setDialog({ type: "form", department });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = form.name.trim();
    const hod = form.hod.trim();
    const duplicateName = departments.some(
      (department) =>
        department.id !== dialog.department?.id &&
        department.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicateName) {
      setFormError("A department with this name already exists.");
      return;
    }

    const departmentData = {
      name,
      hod,
      teachers: Number(form.teachers),
      staff: Number(form.staff),
      subjects: Number(form.subjects),
      status: form.status,
    };

    if (dialog.department) {
      setDepartments((current) =>
        current.map((department) =>
          department.id === dialog.department.id
            ? { ...department, ...departmentData }
            : department
        )
      );
    } else {
      const nextId = Math.max(0, ...departments.map((department) => department.id)) + 1;
      setDepartments((current) => [
        ...current,
        { id: nextId, ...departmentData },
      ]);
    }

    setDialog(null);
  };

  const removeDepartment = (department) => {
    if (
      window.confirm(
        `Delete the ${department.name} department? This action cannot be undone.`
      )
    ) {
      setDepartments((current) =>
        current.filter((entry) => entry.id !== department.id)
      );
    }
  };

  const exportDepartments = () => {
    const headers = [
      "Department",
      "Head of Department",
      "Teachers",
      "Staff",
      "Subjects",
      "Status",
    ];
    const rows = filteredDepartments.map((department) => [
      department.name,
      department.hod,
      department.teachers,
      department.staff,
      department.subjects,
      department.status,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map(csvValue).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "departments.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Departments</h1>
          <p className="text-gray-500 mt-2">
            Manage academic and administrative departments.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddDialog}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Department
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={<Building2 className="text-blue-600 mb-3" />}
          value={departments.length}
          label="Departments"
        />
        <StatCard
          icon={<Users className="text-green-600 mb-3" />}
          value={totalTeachers}
          label="Teachers"
        />
        <StatCard
          icon={<Users className="text-purple-600 mb-3" />}
          value={totalStaff}
          label="Staff"
        />
        <StatCard
          icon={<BookOpen className="text-orange-600 mb-3" />}
          value={totalSubjects}
          label="Subjects"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">
          <Search className="mr-3 shrink-0" size={18} />
          <input
            type="search"
            placeholder="Search departments or department heads..."
            aria-label="Search departments"
            className="outline-none w-full"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 border rounded-xl px-4">
          <Filter size={18} className="text-gray-500" />
          <select
            className="py-3 outline-none bg-transparent"
            aria-label="Filter by department status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          type="button"
          onClick={exportDepartments}
          className="border rounded-xl px-5 py-3 flex items-center justify-center gap-2 hover:bg-gray-50"
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
                <th className="text-left p-4">Department</th>
                <th className="text-left p-4">Head</th>
                <th className="text-center p-4">Teachers</th>
                <th className="text-center p-4">Staff</th>
                <th className="text-center p-4">Subjects</th>
                <th className="text-center p-4">Status</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.map((department) => (
                <tr key={department.id} className="border-t">
                  <td className="p-4 font-medium">{department.name}</td>
                  <td className="p-4">{department.hod}</td>
                  <td className="p-4 text-center">{department.teachers}</td>
                  <td className="p-4 text-center">{department.staff}</td>
                  <td className="p-4 text-center">{department.subjects}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        department.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {department.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <ActionButton
                        label={`View ${department.name}`}
                        onClick={() => setDialog({ type: "view", department })}
                      >
                        <Eye size={16} />
                      </ActionButton>
                      <ActionButton
                        label={`Edit ${department.name}`}
                        onClick={() => openEditDialog(department)}
                      >
                        <Edit size={16} />
                      </ActionButton>
                      <ActionButton
                        label={`Delete ${department.name}`}
                        onClick={() => removeDepartment(department)}
                      >
                        <Trash2 size={16} />
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDepartments.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    No departments match your search and filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {dialog?.type === "form" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setDialog(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="department-form-title"
            className="bg-white rounded-2xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 id="department-form-title" className="text-xl font-bold">
                {dialog.department ? "Edit Department" : "Add Department"}
              </h2>
              <button
                type="button"
                onClick={() => setDialog(null)}
                aria-label="Close dialog"
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Department name"
                name="name"
                value={form.name}
                onChange={(value) => setForm((current) => ({ ...current, name: value }))}
                required
              />
              <FormField
                label="Head of department"
                name="hod"
                value={form.hod}
                onChange={(value) => setForm((current) => ({ ...current, hod: value }))}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <NumberField
                  label="Teachers"
                  name="teachers"
                  value={form.teachers}
                  onChange={(value) => setForm((current) => ({ ...current, teachers: value }))}
                />
                <NumberField
                  label="Staff"
                  name="staff"
                  value={form.staff}
                  onChange={(value) => setForm((current) => ({ ...current, staff: value }))}
                />
                <NumberField
                  label="Subjects"
                  name="subjects"
                  value={form.subjects}
                  onChange={(value) => setForm((current) => ({ ...current, subjects: value }))}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="department-status" className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="department-status"
                  name="status"
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, status: event.target.value }))
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {formError && (
                <p role="alert" className="text-sm text-red-600">
                  {formError}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDialog(null)}
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                >
                  {dialog.department ? "Save Changes" : "Add Department"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {dialog?.type === "view" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setDialog(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="department-details-title"
            className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-blue-600">
                  <Building2 size={20} />
                  <span className="text-sm font-medium">Department Overview</span>
                </div>
                <h2 id="department-details-title" className="mt-2 text-2xl font-semibold">
                  {dialog.department.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setDialog(null)}
                aria-label="Close department details"
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X />
              </button>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4">
              <DetailItem label="Head of department" value={dialog.department.hod} />
              <DetailItem label="Status" value={dialog.department.status} />
              <DetailItem label="Teachers" value={dialog.department.teachers} />
              <DetailItem label="Staff" value={dialog.department.staff} />
              <DetailItem label="Subjects" value={dialog.department.subjects} />
            </dl>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setDialog(null)}
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
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
      onClick={onClick}
      aria-label={label}
      title={label}
      className="border rounded-lg p-2 hover:bg-gray-50"
    >
      {children}
    </button>
  );
}

function FormField({ label, name, value, onChange, required }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={`department-${name}`} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={`department-${name}`}
        name={name}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
        required={required}
      />
    </div>
  );
}

function NumberField({ label, name, value, onChange }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={`department-${name}`} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={`department-${name}`}
        name={name}
        type="number"
        min="0"
        step="1"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        required
      />
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="mt-1 font-medium text-gray-900">{value}</dd>
    </div>
  );
}
