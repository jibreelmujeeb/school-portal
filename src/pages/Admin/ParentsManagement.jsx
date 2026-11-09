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
  X,
} from "lucide-react";

const initialParents = [
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

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  children: "0",
  status: "Active",
  feeStatus: "Paid",
};

const csvValue = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;

export default function AdminParentsManagement() {
  const [parents, setParents] = useState(initialParents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [feeFilter, setFeeFilter] = useState("");
  const [dialog, setDialog] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return parents.filter((parent) => {
      const matchesSearch =
        !query ||
        [parent.name, parent.email, parent.phone].some((value) =>
          value.toLowerCase().includes(query)
        );
      return (
        matchesSearch &&
        (!statusFilter || parent.status === statusFilter) &&
        (!feeFilter || parent.feeStatus === feeFilter)
      );
    });
  }, [parents, search, statusFilter, feeFilter]);

  const openAddDialog = () => {
    setForm(emptyForm);
    setFormError("");
    setDialog({ type: "form" });
  };

  const openEditDialog = (parent) => {
    setForm({
      name: parent.name,
      email: parent.email,
      phone: parent.phone,
      children: String(parent.children),
      status: parent.status,
      feeStatus: parent.feeStatus,
    });
    setFormError("");
    setDialog({ type: "form", parent });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedForm = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      children: Number(form.children),
    };
    const emailTaken = parents.some(
      (parent) =>
        parent.id !== dialog.parent?.id &&
        parent.email.toLowerCase() === normalizedForm.email.toLowerCase()
    );

    if (emailTaken) {
      setFormError("A parent with this email address already exists.");
      return;
    }

    if (dialog.parent) {
      setParents((current) =>
        current.map((parent) =>
          parent.id === dialog.parent.id
            ? { ...parent, ...normalizedForm }
            : parent
        )
      );
    } else {
      const nextId = Math.max(0, ...parents.map((parent) => parent.id)) + 1;
      setParents((current) => [...current, { id: nextId, ...normalizedForm }]);
    }
    setDialog(null);
  };

  const exportParents = () => {
    const headers = ["Name", "Email", "Phone", "Children", "Fee Status", "Status"];
    const rows = filtered.map((parent) => [
      parent.name,
      parent.email,
      parent.phone,
      parent.children,
      parent.feeStatus,
      parent.status,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map(csvValue).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "parents.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const removeParent = (parent) => {
    if (window.confirm(`Delete ${parent.name} from parent accounts?`)) {
      setParents((current) =>
        current.filter((entry) => entry.id !== parent.id)
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Parents Management</h1>
          <p className="text-gray-500 mt-2">
            Manage parent accounts, linked students, and communications.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddDialog}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <UserPlus size={18} />
          Add Parent
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<Users className="text-blue-600 mb-3" />} value={parents.length} label="Total Parents" />
        <StatCard
          icon={<Users className="text-green-600 mb-3" />}
          value={parents.filter((parent) => parent.status === "Active").length}
          label="Active"
        />
        <StatCard
          icon={<Users className="text-purple-600 mb-3" />}
          value={parents.reduce((total, parent) => total + parent.children, 0)}
          label="Linked Students"
        />
        <StatCard
          icon={<Users className="text-red-600 mb-3" />}
          value={parents.filter((parent) => parent.feeStatus === "Pending").length}
          label="Pending Fees"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">
          <Search className="mr-3 shrink-0" size={18} />
          <input
            type="search"
            className="outline-none w-full"
            placeholder="Search parent by name, email, or phone..."
            aria-label="Search parents"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <select
          className="border rounded-xl px-4 py-3"
          aria-label="Filter by account status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="">All Account Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select
          className="border rounded-xl px-4 py-3"
          aria-label="Filter by fee status"
          value={feeFilter}
          onChange={(event) => setFeeFilter(event.target.value)}
        >
          <option value="">All Fee Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
        <button
          type="button"
          onClick={exportParents}
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
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Phone</th>
                <th className="text-center p-4">Children</th>
                <th className="text-left p-4">Fee Status</th>
                <th className="text-left p-4">Status</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((parent) => (
                <tr key={parent.id} className="border-t">
                  <td className="p-4 font-medium">{parent.name}</td>
                  <td className="p-4">{parent.email}</td>
                  <td className="p-4">{parent.phone}</td>
                  <td className="p-4 text-center">{parent.children}</td>
                  <td className="p-4">
                    <StatusBadge value={parent.feeStatus} />
                  </td>
                  <td className="p-4">
                    <StatusBadge value={parent.status} />
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <ActionButton
                        label={`View ${parent.name}`}
                        onClick={() => setDialog({ type: "view", parent })}
                      >
                        <Eye size={16} />
                      </ActionButton>
                      <ActionButton
                        label={`Edit ${parent.name}`}
                        onClick={() => openEditDialog(parent)}
                      >
                        <Edit size={16} />
                      </ActionButton>
                      <a
                        href={`mailto:${parent.email}`}
                        aria-label={`Email ${parent.name}`}
                        title={`Email ${parent.name}`}
                        className="border rounded-lg p-2"
                      >
                        <Mail size={16} />
                      </a>
                      <a
                        href={`tel:${parent.phone}`}
                        aria-label={`Call ${parent.name}`}
                        title={`Call ${parent.name}`}
                        className="border rounded-lg p-2"
                      >
                        <Phone size={16} />
                      </a>
                      <ActionButton
                        label={`Delete ${parent.name}`}
                        onClick={() => removeParent(parent)}
                      >
                        <Trash2 size={16} />
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    No parents match your search and filters.
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
            aria-labelledby="parent-form-title"
            className="bg-white rounded-2xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 id="parent-form-title" className="text-xl font-bold">
                {dialog.parent ? "Edit Parent" : "Add Parent"}
              </h2>
              <button type="button" onClick={() => setDialog(null)} aria-label="Close dialog">
                <X />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label="Full name" name="name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} required />
              <FormField label="Email" name="email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required />
              <FormField label="Phone" name="phone" type="tel" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} required />
              <FormField
                label="Number of children"
                name="children"
                type="number"
                min="0"
                value={form.children}
                onChange={(value) => setForm({ ...form, children: value })}
                required
              />
              <SelectField
                label="Account status"
                value={form.status}
                options={["Active", "Inactive"]}
                onChange={(value) => setForm({ ...form, status: value })}
              />
              <SelectField
                label="Fee status"
                value={form.feeStatus}
                options={["Paid", "Pending"]}
                onChange={(value) => setForm({ ...form, feeStatus: value })}
              />
              {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" className="border rounded-lg px-4 py-2" onClick={() => setDialog(null)}>
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2">
                  {dialog.parent ? "Save Changes" : "Add Parent"}
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
            aria-labelledby="parent-details-title"
            className="bg-white rounded-2xl p-6 w-full max-w-lg"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 id="parent-details-title" className="text-xl font-bold">Parent Details</h2>
              <button type="button" onClick={() => setDialog(null)} aria-label="Close dialog">
                <X />
              </button>
            </div>
            <dl className="grid grid-cols-2 gap-4">
              <Detail label="Name" value={dialog.parent.name} />
              <Detail label="Email" value={dialog.parent.email} />
              <Detail label="Phone" value={dialog.parent.phone} />
              <Detail label="Children" value={dialog.parent.children} />
              <Detail label="Account status" value={dialog.parent.status} />
              <Detail label="Fee status" value={dialog.parent.feeStatus} />
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

function StatusBadge({ value }) {
  const className =
    value === "Paid" || value === "Active"
      ? "bg-green-100 text-green-700"
      : value === "Pending"
        ? "bg-red-100 text-red-700"
        : "bg-gray-200 text-gray-700";
  return <span className={`px-3 py-1 rounded-full text-sm ${className}`}>{value}</span>;
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

function FormField({
  label,
  name,
  type = "text",
  min,
  value,
  onChange,
  required,
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        className="mt-1 w-full border rounded-lg px-3 py-2"
        name={name}
        type={type}
        min={min}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </label>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <select
        className="mt-1 w-full border rounded-lg px-3 py-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
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
