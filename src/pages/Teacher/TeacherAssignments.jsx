import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BookOpen, CalendarDays, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { teacherApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const emptyForm = {
  teacherAssignmentId: "",
  title: "",
  description: "",
  dueDate: "",
  maxScore: 100,
};

const TeacherAssignments = () => {
  const { accessToken } = useAuth();
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const assignmentOptions = useMemo(() => (
    classes.flatMap((schoolClass) => schoolClass.subjects.map((subject) => ({
      id: subject.assignmentId,
      label: `${schoolClass.name} - ${subject.name}`,
    })))
  ), [classes]);

  const loadClasses = useCallback(async () => {
    if (!accessToken) return;

    const payload = await teacherApi.classes(accessToken);
    setClasses(payload.classes);
    setForm((current) => ({
      ...current,
      teacherAssignmentId: current.teacherAssignmentId || payload.classes[0]?.subjects[0]?.assignmentId || "",
    }));
  }, [accessToken]);

  const loadAssignments = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError("");

    try {
      const payload = await teacherApi.assignments(accessToken);
      setAssignments(payload.assignments);
    } catch (err) {
      setError(err.message || "Unable to load assignments.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void loadClasses().catch((err) => setError(err.message || "Unable to load classes."));
  }, [loadClasses]);

  useEffect(() => {
    void loadAssignments();
  }, [loadAssignments]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      ...emptyForm,
      teacherAssignmentId: assignmentOptions[0]?.id || "",
    });
    setEditingAssignment(null);
    setIsFormOpen(false);
  };

  const openCreateForm = () => {
    setForm({
      ...emptyForm,
      teacherAssignmentId: assignmentOptions[0]?.id || "",
    });
    setEditingAssignment(null);
    setIsFormOpen(true);
  };

  const openEditForm = (assignment) => {
    setForm({
      teacherAssignmentId: assignment.teacherAssignmentId,
      title: assignment.title,
      description: assignment.description || "",
      dueDate: assignment.dueDate,
      maxScore: assignment.maxScore,
    });
    setEditingAssignment(assignment);
    setIsFormOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      if (editingAssignment) {
        await teacherApi.updateAssignment(accessToken, editingAssignment.id, {
          title: form.title,
          description: form.description,
          dueDate: form.dueDate,
          maxScore: Number(form.maxScore),
        });
      } else {
        await teacherApi.createAssignment(accessToken, {
          ...form,
          maxScore: Number(form.maxScore),
        });
      }

      resetForm();
      await loadAssignments();
    } catch (err) {
      setError(err.message || "Unable to save assignment.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (assignment) => {
    if (!window.confirm(`Delete ${assignment.title}?`)) return;

    setError("");

    try {
      await teacherApi.deleteAssignment(accessToken, assignment.id);
      await loadAssignments();
    } catch (err) {
      setError(err.message || "Unable to delete assignment.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Assignments</h1>
          <p className="mt-2 text-sm text-gray-600">
            Create and manage class assignments
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          disabled={assignmentOptions.length === 0}
          className="flex items-center gap-2 rounded-lg border border-blue-600 px-5 py-2 text-sm text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus className="h-4 w-4" />
          New Assignment
        </button>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isFormOpen && (
        <section className="rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="mb-5 text-lg font-semibold">
            {editingAssignment ? "Edit Assignment" : "Create Assignment"}
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <select
              name="teacherAssignmentId"
              value={form.teacherAssignmentId}
              onChange={handleChange}
              disabled={Boolean(editingAssignment)}
              required
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600 disabled:bg-gray-50"
            >
              {assignmentOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Assignment title"
              required
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
            <input
              type="number"
              name="maxScore"
              min="1"
              value={form.maxScore}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Instructions"
              rows="4"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600 md:col-span-2"
            />

            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 rounded-lg border border-blue-600 px-5 py-2 text-sm text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 px-5 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="space-y-4">
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading assignments...</div>
        ) : assignments.length === 0 ? (
          <div className="text-sm text-gray-500">No assignments created.</div>
        ) : (
          assignments.map((assignment) => (
            <article key={assignment.id} className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">{assignment.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {assignment.description || "No instructions added."}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span>{assignment.class.name} - {assignment.subject.name}</span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      Due {assignment.dueDate}
                    </span>
                    <span>{assignment.maxScore} marks</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openEditForm(assignment)}
                    className="text-gray-600 hover:text-blue-600"
                    aria-label="Edit assignment"
                    title="Edit assignment"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(assignment)}
                    className="text-gray-600 hover:text-red-600"
                    aria-label="Delete assignment"
                    title="Delete assignment"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
};

export default TeacherAssignments;
