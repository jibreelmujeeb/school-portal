
import { useMemo, useState } from "react";
import {
  ClipboardList, Plus, Search, CalendarDays, Users,
  CheckCircle, Clock, AlertCircle, FileText, Eye,
  Pencil, Trash2, X, Download, MessageSquare,
  GraduationCap, Filter, Send, BookOpen,
} from "lucide-react";

const initialAssignments = [
  {
    id: "A001",
    title: "Algebra Exercises",
    subject: "Mathematics",
    className: "JSS 2",
    instructions: "Solve questions 1–10 and show your working.",
    issueDate: "2026-10-20",
    deadline: "2026-10-30",
    marks: 20,
    status: "Active",
    submissions: [
      { id: "S001", name: "Abdulrahman Jibreel", studentId: "STU-001", submittedAt: "2026-10-25", status: "Submitted", score: "", feedback: "", fileName: "algebra.pdf" },
      { id: "S002", name: "Aisha Jibreel", studentId: "STU-002", submittedAt: "2026-10-26", status: "Graded", score: 17, feedback: "Good work. Review question 4.", fileName: "aisha-algebra.pdf" },
      { id: "S003", name: "Yusuf Ahmed", studentId: "STU-003", submittedAt: "", status: "Not Submitted", score: "", feedback: "", fileName: "" },
      { id: "S004", name: "Fatimah Abdullahi", studentId: "STU-004", submittedAt: "2026-10-27", status: "Late", score: "", feedback: "", fileName: "fatimah-work.pdf" },
    ],
  },
  {
    id: "A002",
    title: "English Essay Writing",
    subject: "English Language",
    className: "JSS 3",
    instructions: "Write an essay of 300–500 words.",
    issueDate: "2026-10-18",
    deadline: "2026-10-28",
    marks: 30,
    status: "Active",
    submissions: [
      { id: "S005", name: "Ibrahim Musa", studentId: "STU-005", submittedAt: "2026-10-24", status: "Submitted", score: "", feedback: "", fileName: "essay.docx" },
      { id: "S006", name: "Maryam Bello", studentId: "STU-006", submittedAt: "", status: "Not Submitted", score: "", feedback: "", fileName: "" },
    ],
  },
  {
    id: "A003",
    title: "Cell Structure Report",
    subject: "Biology",
    className: "SS 1",
    instructions: "Describe the functions of five cell organelles.",
    issueDate: "2026-10-10",
    deadline: "2026-10-22",
    marks: 25,
    status: "Closed",
    submissions: [
      { id: "S007", name: "Muhammad Ibrahim", studentId: "STU-007", submittedAt: "2026-10-20", status: "Graded", score: 22, feedback: "Well presented.", fileName: "cell-report.pdf" },
    ],
  },
];

const classes = ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"];

const emptyForm = {
  title: "",
  subject: "",
  className: "",
  instructions: "",
  issueDate: new Date().toISOString().slice(0, 10),
  deadline: "",
  marks: 20,
  status: "Active",
};

function formatDate(value) {
  if (!value) return "—";
  return new Date(`${value.slice(0, 10)}T12:00:00`).toLocaleDateString(
    "en-NG",
    { day: "numeric", month: "short", year: "numeric" }
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700",
    Closed: "bg-slate-100 text-slate-600",
    Submitted: "bg-blue-50 text-blue-700",
    Graded: "bg-emerald-50 text-emerald-700",
    Late: "bg-amber-50 text-amber-700",
    "Not Submitted": "bg-red-50 text-red-700",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[status] || styles.Closed}`}>
      {status}
    </span>
  );
}

function StatCard({ title, value, icon: Icon, note }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{note}</p>
        </div>
        <div className="rounded-lg bg-slate-100 p-2.5 text-slate-700">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

export default function TeacherAssignmentSubmission() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [tab, setTab] = useState("All Assignments");

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");

  const stats = useMemo(() => {
    const all = assignments.flatMap((a) => a.submissions);
    return {
      assignments: assignments.length,
      received: all.filter((s) => s.submittedAt).length,
      review: all.filter((s) => s.status === "Submitted" || s.status === "Late").length,
      missing: all.filter((s) => s.status === "Not Submitted").length,
    };
  }, [assignments]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return assignments.filter((a) => {
      const matchesSearch = [a.title, a.subject, a.className]
        .some((value) => value.toLowerCase().includes(term));

      const matchesClass =
        classFilter === "All Classes" || a.className === classFilter;

      const matchesStatus =
        statusFilter === "All Statuses" || a.status === statusFilter;

      const matchesTab =
        tab === "All Assignments" ||
        (tab === "Active" && a.status === "Active") ||
        (tab === "Closed" && a.status === "Closed") ||
        (tab === "Pending Review" &&
          a.submissions.some((s) => s.status === "Submitted" || s.status === "Late"));

      return matchesSearch && matchesClass && matchesStatus && matchesTab;
    });
  }, [assignments, search, classFilter, statusFilter, tab]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  };

  const openEdit = (assignment) => {
    setEditing(assignment);
    setForm({
      title: assignment.title,
      subject: assignment.subject,
      className: assignment.className,
      instructions: assignment.instructions,
      issueDate: assignment.issueDate,
      deadline: assignment.deadline,
      marks: assignment.marks,
      status: assignment.status,
    });
    setError("");
    setShowForm(true);
  };

  const saveAssignment = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (!form.title.trim() || !form.subject.trim() || !form.className || !form.deadline) {
      setError("Complete the title, subject, class, and deadline.");
      return;
    }

    if (form.deadline < form.issueDate) {
      setError("The deadline cannot be earlier than the issue date.");
      return;
    }

    if (Number(form.marks) <= 0) {
      setError("Total marks must be greater than zero.");
      return;
    }

    try {
      // Connect to your API:
      // POST /api/teacher/assignments
      // PUT  /api/teacher/assignments/:id

      const assignment = {
        ...form,
        marks: Number(form.marks),
        id: editing?.id || crypto.randomUUID(),
        submissions: editing?.submissions || [],
      };

      setAssignments((current) =>
        editing
          ? current.map((a) => a.id === editing.id ? assignment : a)
          : [assignment, ...current]
      );

      setShowForm(false);
      setNotice(editing ? "Assignment updated." : "Assignment created.");
    } catch {
      setError("Unable to save the assignment.");
    }
  };

  const deleteAssignment = (assignment) => {
    if (!window.confirm(`Delete "${assignment.title}" and its assignment record?`)) return;

    // In production, verify ownership and handle associated submissions
    // on the backend before allowing deletion.
    setAssignments((current) => current.filter((a) => a.id !== assignment.id));
    setNotice("Assignment deleted.");
  };

  const openReview = (assignment, submission) => {
    setSelectedAssignment(assignment);
    setSelectedSubmission(submission);
    setGrade(submission.score === "" ? "" : String(submission.score));
    setFeedback(submission.feedback || "");
  };

  const saveGrade = async (e) => {
    e.preventDefault();
    if (!selectedAssignment || !selectedSubmission) return;

    if (grade === "" || !Number.isFinite(Number(grade))) {
      setNotice("Enter a valid score.");
      return;
    }

    if (Number(grade) < 0 || Number(grade) > selectedAssignment.marks) {
      setNotice(`Score must be between 0 and ${selectedAssignment.marks}.`);
      return;
    }

    try {
      // Connect to:
      // PATCH /api/teacher/assignments/:assignmentId/submissions/:submissionId/grade
      const updatedSubmission = {
        ...selectedSubmission,
        score: Number(grade),
        feedback,
        status: "Graded",
      };

      setAssignments((current) =>
        current.map((a) =>
          a.id !== selectedAssignment.id
            ? a
            : {
                ...a,
                submissions: a.submissions.map((s) =>
                  s.id === selectedSubmission.id ? updatedSubmission : s
                ),
              }
        )
      );

      setSelectedSubmission(null);
      setSelectedAssignment(null);
      setNotice("Grade and feedback saved.");
    } catch {
      setNotice("Unable to save the grade.");
    }
  };

  const exportSubmissions = (assignment) => {
    const headers = ["Student", "Student ID", "Status", "Submitted At", "Score", "Feedback"];
    const rows = assignment.submissions.map((s) => [
      s.name, s.studentId, s.status, s.submittedAt, s.score, s.feedback,
    ]);

    const csvCell = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(csvCell).join(","))
      .join("\n");

    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${assignment.title.replace(/[^a-z0-9]/gi, "-")}-submissions.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetFilters = () => {
    setSearch("");
    setClassFilter("All Classes");
    setStatusFilter("All Statuses");
    setTab("All Assignments");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <BookOpen size={16} />
              <span>Teacher</span><span>/</span><span>Assignment Submissions</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Assignment Submissions
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Create assignments, review student work, and manage grading.
            </p>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
          >
            <Plus size={18} /> Create Assignment
          </button>
        </div>

        {notice && (
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
            {notice}
            <button onClick={() => setNotice("")} aria-label="Dismiss">
              <X size={17} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Assignments" value={stats.assignments} icon={ClipboardList} note="All your assignments" />
          <StatCard title="Submissions Received" value={stats.received} icon={CheckCircle} note="Students who submitted" />
          <StatCard title="Awaiting Review" value={stats.review} icon={Clock} note="Submitted work to grade" />
          <StatCard title="Not Submitted" value={stats.missing} icon={AlertCircle} note="Across tracked assignments" />
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="space-y-4 border-b border-slate-200 p-4 sm:p-5">
            <div>
              <h2 className="font-semibold text-slate-900">Your Assignments</h2>
              <p className="mt-1 text-sm text-slate-500">
                Track submission progress and open student work for grading.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["All Assignments", "Active", "Closed", "Pending Review"].map((item) => (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                    tab === item
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="relative">
                <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search assignments..."
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-slate-500"
                />
              </div>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
              >
                <option>All Classes</option>
                {classes.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
              >
                <option>All Statuses</option>
                <option>Active</option>
                <option>Closed</option>
              </select>
              <button
                onClick={resetFilters}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm hover:bg-slate-50"
              >
                <Filter size={16} /> Reset filters
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Assignment</th>
                  <th className="px-5 py-4 font-medium">Class / Subject</th>
                  <th className="px-5 py-4 font-medium">Deadline</th>
                  <th className="px-5 py-4 font-medium">Submissions</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((a) => {
                  const submitted = a.submissions.filter((s) => s.submittedAt).length;
                  const total = a.submissions.length;
                  const percent = total ? (submitted / total) * 100 : 0;

                  return (
                    <tr key={a.id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div className="rounded-lg bg-slate-100 p-2.5 text-slate-700">
                            <FileText size={21} />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{a.title}</p>
                            <p className="mt-1 text-xs text-slate-500">{a.id} · {a.marks} marks</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-800">{a.className}</p>
                        <p className="mt-1 text-xs text-slate-500">{a.subject}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={15} />
                          {formatDate(a.deadline)}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Users size={15} /> {submitted}/{total}
                        </div>
                        <div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-slate-800" style={{ width: `${percent}%` }} />
                        </div>
                      </td>
                      <td className="px-5 py-4"><StatusBadge status={a.status} /></td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button title="Review submissions" onClick={() => setSelectedAssignment(a)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                            <Eye size={17} />
                          </button>
                          <button title="Edit assignment" onClick={() => openEdit(a)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                            <Pencil size={17} />
                          </button>
                          <button title="Export submissions" onClick={() => exportSubmissions(a)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                            <Download size={17} />
                          </button>
                          <button title="Delete assignment" onClick={() => deleteAssignment(a)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <ClipboardList size={34} className="mx-auto text-slate-300" />
                      <p className="mt-3 font-medium text-slate-800">No assignments found</p>
                      <p className="mt-1 text-sm text-slate-500">Try different filters or create an assignment.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create / edit assignment */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
            <div className="my-auto w-full max-w-2xl rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 p-5">
                <div>
                  <h2 className="font-semibold text-slate-900">{editing ? "Edit Assignment" : "Create Assignment"}</h2>
                  <p className="mt-1 text-sm text-slate-500">Set the instructions and submission deadline.</p>
                </div>
                <button onClick={() => setShowForm(false)} className="rounded-lg p-2 hover:bg-slate-100"><X size={20} /></button>
              </div>

              <form onSubmit={saveAssignment} className="space-y-4 p-5">
                {error && <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Assignment Title *</label>
                  <input required name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm" placeholder="Enter assignment title" />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Instructions</label>
                  <textarea name="instructions" rows={3} value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm" placeholder="Explain what students need to do" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Subject *</label>
                    <input required name="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm" placeholder="e.g. Mathematics" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Class *</label>
                    <select required value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm">
                      <option value="">Select class</option>
                      {classes.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Issue Date *</label>
                    <input required type="date" value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Deadline *</label>
                    <input required type="date" min={form.issueDate} value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Total Marks *</label>
                    <input required min="1" type="number" value={form.marks} onChange={(e) => setForm({ ...form, marks: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Status</label>
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm">
                      <option>Active</option>
                      <option>Closed</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
                  <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm">Cancel</button>
                  <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700">
                    <Plus size={17} /> {editing ? "Save Changes" : "Create Assignment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Student submissions */}
        {selectedAssignment && (
          <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
            <div className="my-auto w-full max-w-5xl rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 p-5">
                <div>
                  <h2 className="font-semibold text-slate-900">{selectedAssignment.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedAssignment.className} · {selectedAssignment.subject} · {selectedAssignment.marks} marks
                  </p>
                </div>
                <button onClick={() => setSelectedAssignment(null)} className="rounded-lg p-2 hover:bg-slate-100"><X size={20} /></button>
              </div>

              <div className="overflow-x-auto p-5">
                <p className="mb-4 text-sm text-slate-600">{selectedAssignment.instructions}</p>
                <table className="w-full min-w-[650px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Student</th>
                      <th className="px-4 py-3">Submitted</th>
                      <th className="px-4 py-3">Attachment</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedAssignment.submissions.map((s) => (
                      <tr key={s.id}>
                        <td className="px-4 py-4">
                          <p className="font-medium text-slate-900">{s.name}</p>
                          <p className="mt-1 text-xs text-slate-500">{s.studentId}</p>
                        </td>
                        <td className="px-4 py-4 text-slate-600">{formatDate(s.submittedAt)}</td>
                        <td className="px-4 py-4 text-slate-600">{s.fileName || "No file"}</td>
                        <td className="px-4 py-4"><StatusBadge status={s.status} /></td>
                        <td className="px-4 py-4 text-right">
                          {s.submittedAt ? (
                            <button onClick={() => openReview(selectedAssignment, s)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium hover:bg-slate-50">
                              {s.status === "Graded" ? "View / Edit Grade" : "Review & Grade"}
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400">Awaiting work</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-5 flex justify-end">
                  <button onClick={() => exportSubmissions(selectedAssignment)} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm hover:bg-slate-50">
                    <Download size={16} /> Export CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grading modal */}
        {selectedSubmission && selectedAssignment && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
            <div className="my-auto w-full max-w-lg rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 p-5">
                <div>
                  <h2 className="font-semibold text-slate-900">Review Submission</h2>
                  <p className="mt-1 text-sm text-slate-500">{selectedSubmission.name}</p>
                </div>
                <button onClick={() => setSelectedSubmission(null)} className="rounded-lg p-2 hover:bg-slate-100"><X size={20} /></button>
              </div>

              <form onSubmit={saveGrade} className="space-y-4 p-5">
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">Assignment</p>
                  <p className="mt-1 font-medium text-slate-900">{selectedAssignment.title}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Submitted: {formatDate(selectedSubmission.submittedAt)}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Attachment: {selectedSubmission.fileName || "No file attached"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    File preview/download should be connected to your authenticated file endpoint.
                  </p>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Score (out of {selectedAssignment.marks})</label>
                  <input type="number" min="0" max={selectedAssignment.marks} step="0.5" required value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm" />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Feedback</label>
                  <textarea rows={4} value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Provide comments to help the student improve..." className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm" />
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
                  <button type="button" onClick={() => setSelectedSubmission(null)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm">Cancel</button>
                  <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700">
                    <CheckCircle size={17} /> Save Grade
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
