import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  ClipboardList,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

const initialAssignments = [
  {
    id: "assignment-math",
    title: "Math Homework",
    subject: "Mathematics",
    className: "SS2",
    deadline: "2026-04-25",
    instructions: "Complete the assigned mathematics exercises.",
    status: "Active",
  },
  {
    id: "assignment-essay",
    title: "Essay Writing",
    subject: "English",
    className: "JSS3",
    deadline: "2026-04-22",
    instructions: "Write and submit the assigned essay.",
    status: "Active",
  },
];

const emptyForm = {
  title: "",
  subject: "",
  className: "",
  deadline: "",
  instructions: "",
};

const TeacherAssignments = () => {
  const students = useSelector((state) => state.students.items);
  const [assignments, setAssignments, persistenceError] = usePersistentState(
    "teacher-assignments",
    initialAssignments,
  );
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const classes = [...new Set([
    ...students.map((student) => student.class),
    ...assignments.map((assignment) => assignment.className),
  ].filter(Boolean))];
  const filteredAssignments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return assignments.filter((assignment) =>
      [assignment.title, assignment.subject, assignment.className]
        .some((value) => value?.toLowerCase().includes(query)),
    );
  }, [assignments, search]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setError("");
    setShowForm(true);
  };

  const openEdit = (assignment) => {
    setEditingId(assignment.id);
    setForm({
      title: assignment.title,
      subject: assignment.subject || "",
      className: assignment.className,
      deadline: assignment.deadline,
      instructions: assignment.instructions || "",
    });
    setError("");
    setShowForm(true);
  };

  const saveAssignment = (event) => {
    event.preventDefault();
    setError("");
    if (!form.title.trim() || !form.className || !form.deadline) {
      setError("Enter an assignment title, class, and due date.");
      return;
    }

    const assignment = {
      ...form,
      title: form.title.trim(),
      subject: form.subject.trim(),
      id: editingId || `assignment-${Date.now()}`,
      status: assignments.find((item) => item.id === editingId)?.status || "Active",
    };
    setAssignments((current) =>
      editingId
        ? current.map((item) => item.id === editingId ? assignment : item)
        : [assignment, ...current],
    );
    setShowForm(false);
    setNotice(editingId ? "Assignment updated." : "Assignment created.");
  };

  const deleteAssignment = (assignment) => {
    if (!window.confirm(`Delete "${assignment.title}"?`)) return;
    setAssignments((current) => current.filter((item) => item.id !== assignment.id));
    setNotice("Assignment deleted.");
  };

  const toggleStatus = (assignment) => {
    const nextStatus = assignment.status === "Active" ? "Closed" : "Active";
    setAssignments((current) => current.map((item) =>
      item.id === assignment.id ? { ...item, status: nextStatus } : item,
    ));
    setNotice(`Assignment ${nextStatus.toLowerCase()}.`);
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Assignments</h1>
          <p className="mt-2 text-sm text-gray-600">
            Create, update, close, and remove class assignments.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/teacher/assignments-submission"
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm hover:bg-gray-50"
          >
            Review submissions
          </Link>
          <button
            type="button"
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> New assignment
          </button>
        </div>
      </section>

      {persistenceError && (
        <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {persistenceError}
        </p>
      )}
      {notice && (
        <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          {notice}
          <button type="button" onClick={() => setNotice("")} aria-label="Dismiss message">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <label className="flex max-w-xl items-center rounded-xl border border-gray-300 px-4 py-3 focus-within:border-blue-600">
        <Search className="mr-3 h-4 w-4 text-gray-500" />
        <span className="sr-only">Search assignments</span>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search title, subject, or class"
          className="w-full outline-none"
        />
      </label>

      {filteredAssignments.length ? (
        <section className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <article key={assignment.id} className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-blue-600" />
                    <h2 className="font-semibold">{assignment.title}</h2>
                    <span className={`rounded-full px-3 py-1 text-xs ${
                      assignment.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {assignment.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" /> {assignment.className}
                    </span>
                    {assignment.subject && <span>{assignment.subject}</span>}
                    <span className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" /> Due: {assignment.deadline}
                    </span>
                  </div>
                  {assignment.instructions && (
                    <p className="max-w-3xl text-sm text-gray-500">{assignment.instructions}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => toggleStatus(assignment)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    {assignment.status === "Active" ? "Close" : "Reopen"}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(assignment)}
                    aria-label={`Edit ${assignment.title}`}
                    className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteAssignment(assignment)}
                    aria-label={`Delete ${assignment.title}`}
                    className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="rounded-2xl border border-gray-200 p-8 text-center text-sm text-gray-500">
          {assignments.length ? "No assignments match your search." : "No assignments created yet."}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="assignment-dialog-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white"
          >
            <div className="flex items-center justify-between border-b p-5">
              <h2 id="assignment-dialog-title" className="font-semibold">
                {editingId ? "Edit assignment" : "Create assignment"}
              </h2>
              <button type="button" onClick={() => setShowForm(false)} aria-label="Close form">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={saveAssignment} className="space-y-4 p-5">
              {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              <label className="block text-sm font-medium">
                Title
                <input
                  required
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal"
                />
              </label>
              <label className="block text-sm font-medium">
                Subject
                <input
                  value={form.subject}
                  onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal"
                />
              </label>
              <label className="block text-sm font-medium">
                Class
                <select
                  required
                  value={form.className}
                  onChange={(event) => setForm((current) => ({ ...current, className: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal"
                >
                  <option value="">Select a class</option>
                  {classes.map((className) => <option key={className}>{className}</option>)}
                </select>
              </label>
              <label className="block text-sm font-medium">
                Due date
                <input
                  required
                  type="date"
                  value={form.deadline}
                  onChange={(event) => setForm((current) => ({ ...current, deadline: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal"
                />
              </label>
              <label className="block text-sm font-medium">
                Instructions
                <textarea
                  rows={4}
                  value={form.instructions}
                  onChange={(event) => setForm((current) => ({ ...current, instructions: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal"
                />
              </label>
              <div className="flex justify-end gap-3 border-t pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border px-4 py-2.5 text-sm">
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm text-white hover:bg-blue-700">
                  {editingId ? "Save changes" : "Create assignment"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default TeacherAssignments;
