import React, { useState } from "react";
import {
  GraduationCap,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  Download,
  X,
} from "lucide-react";

const initialGrades = [
  {
    id: 1,
    grade: "A",
    min: 75,
    max: 100,
    gpa: 5.0,
    remark: "Excellent",
    status: "Pass",
  },
  {
    id: 2,
    grade: "B+",
    min: 70,
    max: 74,
    gpa: 4.5,
    remark: "Very Good",
    status: "Pass",
  },
  {
    id: 3,
    grade: "F",
    min: 0,
    max: 39,
    gpa: 0,
    remark: "Fail",
    status: "Fail",
  },
];

const emptyForm = {
  grade: "",
  min: "",
  max: "",
  gpa: "",
  remark: "",
  status: "Pass",
};

const csvValue = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;

export default function AdminGradingSystemPage() {
  const [grades, setGrades] = useState(initialGrades);
  const [dialog, setDialog] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const openAddDialog = () => {
    setForm(emptyForm);
    setFormError("");
    setDialog({ type: "form" });
  };

  const openEditDialog = (grade) => {
    setForm({
      grade: grade.grade,
      min: String(grade.min),
      max: String(grade.max),
      gpa: String(grade.gpa),
      remark: grade.remark,
      status: grade.status,
    });
    setFormError("");
    setDialog({ type: "form", grade });
  };

  const closeDialog = () => {
    setDialog(null);
    setForm(emptyForm);
    setFormError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const min = Number(form.min);
    const max = Number(form.max);
    const gpa = Number(form.gpa);

    if (min < 0 || max > 100 || min > max || gpa < 0) {
      setFormError("Enter a score range from 0 to 100 and a non-negative GPA.");
      return;
    }

    const overlaps = grades.some(
      (grade) =>
        grade.id !== dialog.grade?.id &&
        min <= grade.max &&
        max >= grade.min,
    );
    if (overlaps) {
      setFormError("This score range overlaps another grade level.");
      return;
    }

    const gradeData = {
      grade: form.grade.trim(),
      min,
      max,
      gpa,
      remark: form.remark.trim(),
      status: form.status,
    };

    if (dialog.grade) {
      setGrades((current) =>
        current.map((item) =>
          item.id === dialog.grade.id ? { ...item, ...gradeData } : item,
        ),
      );
    } else {
      const nextId = Math.max(0, ...grades.map((item) => item.id)) + 1;
      setGrades((current) => [...current, { id: nextId, ...gradeData }]);
    }
    closeDialog();
  };

  const handleDelete = (grade) => {
    if (window.confirm(`Delete grade ${grade.grade}?`)) {
      setGrades((current) => current.filter((item) => item.id !== grade.id));
    }
  };

  const exportGrades = () => {
    const headers = ["Grade", "Minimum Score", "Maximum Score", "GPA", "Remark", "Status"];
    const rows = grades.map((grade) => [
      grade.grade,
      grade.min,
      grade.max,
      grade.gpa,
      grade.remark,
      grade.status,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map(csvValue).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "grading-scale.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const passCount = grades.filter((grade) => grade.status === "Pass").length;
  const maximumGpa = Math.max(0, ...grades.map((grade) => grade.gpa));

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Grading System</h1>
          <p className="text-gray-500 mt-2">
            Configure grading scales, GPA, remarks, and promotion rules.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={exportGrades}
            className="border rounded-xl px-5 py-3 flex items-center gap-2"
          >
            <Download size={18} />
            Export CSV
          </button>
          <button
            type="button"
            onClick={openAddDialog}
            className="bg-blue-600 text-white rounded-xl px-5 py-3 flex items-center gap-2"
          >
            <Plus size={18} />
            Add Grade
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={<GraduationCap className="text-blue-600 mb-3" />}
          value={grades.length}
          label="Grade Levels"
        />
        <StatCard
          icon={<Settings className="text-green-600 mb-3" />}
          value={passCount}
          label="Passing Grades"
        />
        <StatCard
          icon={<GraduationCap className="text-purple-600 mb-3" />}
          value={maximumGpa.toFixed(1)}
          label="Maximum GPA"
        />
        <StatCard
          icon={<GraduationCap className="text-orange-600 mb-3" />}
          value="Secondary"
          label="Active System"
        />
      </div>

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Grade</th>
              <th className="p-4 text-left">Score Range</th>
              <th className="p-4 text-left">GPA</th>
              <th className="p-4 text-left">Remark</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade.id} className="border-t">
                <td className="p-4">{grade.grade}</td>
                <td className="p-4">{grade.min} - {grade.max}</td>
                <td className="p-4">{grade.gpa}</td>
                <td className="p-4">{grade.remark}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      grade.status === "Pass"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {grade.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <ActionButton
                      label={`View grade ${grade.grade}`}
                      onClick={() => setDialog({ type: "view", grade })}
                    >
                      <Eye size={16} />
                    </ActionButton>
                    <ActionButton
                      label={`Edit grade ${grade.grade}`}
                      onClick={() => openEditDialog(grade)}
                    >
                      <Edit size={16} />
                    </ActionButton>
                    <ActionButton
                      label={`Delete grade ${grade.grade}`}
                      onClick={() => handleDelete(grade)}
                    >
                      <Trash2 size={16} />
                    </ActionButton>
                  </div>
                </td>
              </tr>
            ))}
            {grades.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No grade levels configured.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {dialog?.type === "form" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="grade-form-title"
            className="bg-white rounded-2xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 id="grade-form-title" className="text-xl font-bold">
                  {dialog.grade ? "Edit Grade" : "Add Grade"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Updates are held in this page until it is refreshed.
                </p>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                aria-label="Close dialog"
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Grade"
                name="grade"
                value={form.grade}
                onChange={(value) => setForm((current) => ({ ...current, grade: value }))}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Minimum score"
                  name="min"
                  type="number"
                  min="0"
                  max="100"
                  value={form.min}
                  onChange={(value) => setForm((current) => ({ ...current, min: value }))}
                  required
                />
                <FormField
                  label="Maximum score"
                  name="max"
                  type="number"
                  min="0"
                  max="100"
                  value={form.max}
                  onChange={(value) => setForm((current) => ({ ...current, max: value }))}
                  required
                />
              </div>
              <FormField
                label="GPA"
                name="gpa"
                type="number"
                min="0"
                step="0.1"
                value={form.gpa}
                onChange={(value) => setForm((current) => ({ ...current, gpa: value }))}
                required
              />
              <FormField
                label="Remark"
                name="remark"
                value={form.remark}
                onChange={(value) => setForm((current) => ({ ...current, remark: value }))}
                required
              />
              <label className="block text-sm font-medium">
                Status
                <select
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, status: event.target.value }))
                  }
                >
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                </select>
              </label>
              {formError && (
                <p role="alert" className="text-sm text-red-600">
                  {formError}
                </p>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="border rounded-lg px-4 py-2"
                  onClick={closeDialog}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-lg px-4 py-2"
                >
                  {dialog.grade ? "Save Changes" : "Add Grade"}
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
            aria-labelledby="grade-details-title"
            className="bg-white rounded-2xl p-6 w-full max-w-lg"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 id="grade-details-title" className="text-xl font-bold">
                Grade Details
              </h2>
              <button
                type="button"
                onClick={closeDialog}
                aria-label="Close dialog"
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X />
              </button>
            </div>
            <dl className="grid grid-cols-2 gap-4">
              <Detail label="Grade" value={dialog.grade.grade} />
              <Detail label="Score range" value={`${dialog.grade.min} - ${dialog.grade.max}`} />
              <Detail label="GPA" value={dialog.grade.gpa} />
              <Detail label="Remark" value={dialog.grade.remark} />
              <Detail label="Status" value={dialog.grade.status} />
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

function FormField({
  label,
  name,
  type = "text",
  min,
  max,
  step,
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
        max={max}
        step={step}
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
