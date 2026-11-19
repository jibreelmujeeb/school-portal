import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  BookOpen,
  CalendarDays,
  Download,
  Edit,
  Eye,
  FileText,
  Plus,
  Search,
  Send,
  Trash2,
  X,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

const initialNotes = [
  {
    id: "lesson-algebra",
    title: "Introduction to Algebra",
    subject: "Mathematics",
    className: "SS1",
    week: "Week 2",
    date: "2026-06-12",
    content: "Introduce algebraic expressions, variables, and simple substitution.",
    status: "Published",
  },
  {
    id: "lesson-chemistry",
    title: "Chemical Reactions",
    subject: "Chemistry",
    className: "SS2",
    week: "Week 3",
    date: "2026-06-15",
    content: "Describe reactants and products, and balance simple reaction equations.",
    status: "Draft",
  },
];

const emptyForm = {
  title: "",
  subject: "",
  className: "",
  week: "",
  date: "",
  content: "",
};

const TeacherLessonNotesPage = () => {
  const students = useSelector((state) => state.students.items);
  const subjects = useSelector((state) => state.subjects.items);
  const [notes, setNotes, persistenceError] = usePersistentState(
    "teacher-lesson-notes",
    initialNotes,
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const classes = [...new Set([
    ...students.map((student) => student.class),
    ...notes.map((note) => note.className),
  ].filter(Boolean))];
  const subjectNames = [...new Set([
    ...subjects.map((subject) => subject.name),
    ...notes.map((note) => note.subject),
  ].filter(Boolean))];
  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();
    return notes.filter((note) => {
      const matchesSearch = [note.title, note.subject, note.className, note.content]
        .some((value) => value?.toLowerCase().includes(query));
      const matchesStatus = statusFilter === "All" || note.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [notes, search, statusFilter]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) });
    setError("");
    setShowForm(true);
  };

  const openEdit = (note) => {
    setEditingId(note.id);
    setForm({
      title: note.title,
      subject: note.subject,
      className: note.className,
      week: note.week,
      date: note.date,
      content: note.content,
    });
    setError("");
    setShowForm(true);
  };

  const saveNote = (status) => {
    setError("");
    if (
      !form.title.trim() ||
      !form.subject.trim() ||
      !form.className ||
      !form.week.trim() ||
      !form.date ||
      !form.content.trim()
    ) {
      setError("Complete the title, subject, class, week, date, and lesson content.");
      return;
    }

    const note = {
      ...form,
      title: form.title.trim(),
      subject: form.subject.trim(),
      week: form.week.trim(),
      content: form.content.trim(),
      id: editingId || `lesson-${Date.now()}`,
      status,
    };
    setNotes((current) =>
      editingId
        ? current.map((item) => item.id === editingId ? note : item)
        : [note, ...current],
    );
    setShowForm(false);
    setNotice(status === "Published" ? "Lesson note published." : "Lesson note saved as a draft.");
  };

  const deleteNote = (note) => {
    if (!window.confirm(`Delete "${note.title}"?`)) return;
    setNotes((current) => current.filter((item) => item.id !== note.id));
    if (expandedNoteId === note.id) setExpandedNoteId(null);
    setNotice("Lesson note deleted.");
  };

  const downloadNote = (note) => {
    const text = [
      note.title,
      `${note.subject} | ${note.className} | ${note.week} | ${note.date}`,
      `Status: ${note.status}`,
      "",
      note.content,
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${note.title.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "lesson-note"}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const thisMonth = new Date().toISOString().slice(0, 7);
  const publishedCount = notes.filter((note) => note.status === "Published").length;
  const draftCount = notes.filter((note) => note.status === "Draft").length;
  const thisMonthCount = notes.filter((note) => note.date?.startsWith(thisMonth)).length;

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Lesson Notes</h1>
          <p className="mt-2 text-sm text-gray-600">
            Create lesson plans, save drafts, and publish notes for your classes.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" /> New lesson note
        </button>
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

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total notes", notes.length, BookOpen],
          ["Published", publishedCount, FileText],
          ["Drafts", draftCount, Edit],
          ["This month", thisMonthCount, CalendarDays],
        ].map(([label, value, Icon]) => (
          <div key={label} className="rounded-2xl border border-gray-200 p-5">
            {React.createElement(Icon, { className: "mb-3 h-5 w-5 text-blue-600" })}
            <p className="text-2xl font-semibold">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center rounded-xl border border-gray-300 px-4 py-3 focus-within:border-blue-600">
          <Search className="mr-3 h-4 w-4 text-gray-500" />
          <span className="sr-only">Search lesson notes</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search title, subject, class, or note"
            className="w-full outline-none"
          />
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-3">
          <span className="text-sm text-gray-600">Status</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="bg-transparent text-sm outline-none"
          >
            <option>All</option>
            <option>Draft</option>
            <option>Published</option>
          </select>
        </label>
      </section>

      {filteredNotes.length ? (
        <section className="overflow-hidden rounded-2xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Subject / Class</th>
                  <th className="p-4 font-medium">Week / Date</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotes.map((note) => (
                  <React.Fragment key={note.id}>
                    <tr className="border-t border-gray-100">
                      <td className="p-4 font-medium">{note.title}</td>
                      <td className="p-4">
                        <p>{note.subject}</p>
                        <p className="mt-1 text-xs text-gray-500">{note.className}</p>
                      </td>
                      <td className="p-4">
                        <p>{note.week}</p>
                        <p className="mt-1 text-xs text-gray-500">{note.date}</p>
                      </td>
                      <td className="p-4">
                        <span className={`rounded-full px-3 py-1 text-xs ${
                          note.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {note.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setExpandedNoteId(expandedNoteId === note.id ? null : note.id)}
                            aria-label={`${expandedNoteId === note.id ? "Hide" : "View"} ${note.title}`}
                            aria-expanded={expandedNoteId === note.id}
                            className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEdit(note)}
                            aria-label={`Edit ${note.title}`}
                            className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => downloadNote(note)}
                            aria-label={`Download ${note.title}`}
                            className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteNote(note)}
                            aria-label={`Delete ${note.title}`}
                            className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedNoteId === note.id && (
                      <tr className="border-t border-gray-100 bg-gray-50">
                        <td colSpan="5" className="whitespace-pre-wrap p-4 text-gray-700">
                          {note.content}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <div className="rounded-2xl border border-gray-200 p-8 text-center text-sm text-gray-500">
          {notes.length ? "No lesson notes match your search." : "No lesson notes created yet."}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="lesson-note-dialog-title"
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white"
          >
            <div className="flex items-center justify-between border-b p-5">
              <h2 id="lesson-note-dialog-title" className="font-semibold">
                {editingId ? "Edit lesson note" : "Create lesson note"}
              </h2>
              <button type="button" onClick={() => setShowForm(false)} aria-label="Close form">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                saveNote("Draft");
              }}
              className="space-y-4 p-5"
            >
              {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              <label className="block text-sm font-medium">
                Lesson title
                <input
                  required
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium">
                  Subject
                  <input
                    required
                    list="lesson-subjects"
                    value={form.subject}
                    onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal"
                  />
                  <datalist id="lesson-subjects">
                    {subjectNames.map((subject) => <option key={subject} value={subject} />)}
                  </datalist>
                </label>
                <label className="block text-sm font-medium">
                  Class
                  <select
                    required
                    value={form.className}
                    onChange={(event) => setForm((current) => ({ ...current, className: event.target.value }))}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal"
                  >
                    <option value="">Select class</option>
                    {classes.map((className) => <option key={className}>{className}</option>)}
                  </select>
                </label>
                <label className="block text-sm font-medium">
                  Week
                  <input
                    required
                    value={form.week}
                    onChange={(event) => setForm((current) => ({ ...current, week: event.target.value }))}
                    placeholder="e.g. Week 4"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal"
                  />
                </label>
                <label className="block text-sm font-medium">
                  Date
                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal"
                  />
                </label>
              </div>
              <label className="block text-sm font-medium">
                Lesson content
                <textarea
                  required
                  rows={7}
                  value={form.content}
                  onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal"
                />
              </label>
              <div className="flex flex-col-reverse justify-end gap-3 border-t pt-4 sm:flex-row">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border px-4 py-2.5 text-sm">
                  Cancel
                </button>
                <button type="submit" className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm hover:bg-gray-50">
                  Save draft
                </button>
                <button
                  type="button"
                  onClick={() => saveNote("Published")}
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm text-white hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" /> Publish
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default TeacherLessonNotesPage;
