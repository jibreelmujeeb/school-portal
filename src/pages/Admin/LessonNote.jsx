
import React, { useMemo, useState } from "react";
import {
  BookOpen, Search, Plus, Download, Printer, Eye, CheckCircle2,
  Clock, XCircle, X, FileText, Users, CalendarDays, Filter,
  MoreVertical, ClipboardList, BookMarked
} from "lucide-react";

const initialNotes = [
  {
    id: 1,
    noteNo: "LN-2026-001",
    teacher: "Mr. Ibrahim Musa",
    teacherId: "TCH-0012",
    subject: "Mathematics",
    className: "SS 2A",
    topic: "Quadratic Equations",
    week: "Week 3",
    term: "First Term",
    session: "2026/2027",
    date: "2026-10-15",
    status: "Approved",
    objectives: "Students should be able to define quadratic equations, identify their coefficients, and solve simple quadratic equations.",
    materials: "Whiteboard, markers, mathematics textbook, charts.",
    introduction: "Review of linear equations and introduction to quadratic expressions.",
    activities: "Teacher explains the standard form and demonstrates factorisation. Students solve examples individually and in groups.",
    evaluation: "Solve x² + 5x + 6 = 0 and identify the roots.",
    assignment: "Solve five quadratic equations from the textbook.",
    remarks: "Good lesson delivery.",
  },
  {
    id: 2,
    noteNo: "LN-2026-002",
    teacher: "Mrs. Amina Bello",
    teacherId: "TCH-0021",
    subject: "English Language",
    className: "JSS 2B",
    topic: "Parts of Speech",
    week: "Week 3",
    term: "First Term",
    session: "2026/2027",
    date: "2026-10-17",
    status: "Pending",
    objectives: "Students should identify nouns, verbs, adjectives, and adverbs in sentences.",
    materials: "English textbook, flashcards, whiteboard.",
    introduction: "Ask students to identify naming words in familiar sentences.",
    activities: "Explain the major parts of speech and guide students through sentence examples.",
    evaluation: "Identify the parts of speech in five given sentences.",
    assignment: "Write ten sentences and identify the parts of speech used.",
    remarks: "",
  },
  {
    id: 3,
    noteNo: "LN-2026-003",
    teacher: "Mr. Daniel Okafor",
    teacherId: "TCH-0030",
    subject: "Physics",
    className: "SS 1A",
    topic: "Measurement",
    week: "Week 2",
    term: "First Term",
    session: "2026/2027",
    date: "2026-10-12",
    status: "Under Review",
    objectives: "Students should understand physical quantities and identify fundamental SI units.",
    materials: "Metre rule, stopwatch, weighing scale.",
    introduction: "Discuss the importance of measurement in everyday activities.",
    activities: "Demonstrate measurement using different instruments and explain SI units.",
    evaluation: "List five fundamental physical quantities and their units.",
    assignment: "Explain the difference between fundamental and derived quantities.",
    remarks: "",
  },
  {
    id: 4,
    noteNo: "LN-2026-004",
    teacher: "Mrs. Fatimah Yusuf",
    teacherId: "TCH-0044",
    subject: "Basic Science",
    className: "JSS 1A",
    topic: "Living and Non-living Things",
    week: "Week 2",
    term: "First Term",
    session: "2026/2027",
    date: "2026-10-11",
    status: "Rejected",
    objectives: "Students should distinguish between living and non-living things.",
    materials: "Pictures, charts, specimens.",
    introduction: "Ask students to name objects found in their environment.",
    activities: "Discuss characteristics of living things and classify examples.",
    evaluation: "Give three examples each of living and non-living things.",
    assignment: "Draw and label two living things.",
    remarks: "Please provide clearer teaching activities and lesson evaluation.",
  },
  {
    id: 5,
    noteNo: "LN-2026-005",
    teacher: "Mr. Ibrahim Musa",
    teacherId: "TCH-0012",
    subject: "Further Mathematics",
    className: "SS 3A",
    topic: "Differentiation",
    week: "Week 1",
    term: "First Term",
    session: "2026/2027",
    date: "2026-10-08",
    status: "Published",
    objectives: "Students should understand differentiation and calculate derivatives of simple functions.",
    materials: "Textbook, board, graph sheets.",
    introduction: "Review functions and gradients of straight lines.",
    activities: "Explain differentiation from first principles and demonstrate examples.",
    evaluation: "Find the derivative of y = 3x² + 2x.",
    assignment: "Solve the differentiation exercises given in class.",
    remarks: "Published for lesson delivery.",
  },
];

const statusStyles = {
  Approved: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  "Under Review": "bg-blue-50 text-blue-700",
  Rejected: "bg-red-50 text-red-700",
  Published: "bg-violet-50 text-violet-700",
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

function StatCard({ title, value, icon: Icon, color, description }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

function Modal({ title, onClose, children, size = "max-w-3xl" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className={`max-h-[90vh] w-full ${size} overflow-y-auto rounded-2xl bg-white`}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <h2 className="font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <X size={19} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export default function AdminLessonNotes() {
  const [notes, setNotes] = useState(initialNotes);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");
  const [termFilter, setTermFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [reviewComment, setReviewComment] = useState("");
  const [showReview, setShowReview] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const [form, setForm] = useState({
    teacher: "",
    teacherId: "",
    subject: "",
    className: "",
    topic: "",
    week: "Week 1",
    term: "First Term",
    session: "2026/2027",
    objectives: "",
    materials: "",
    introduction: "",
    activities: "",
    evaluation: "",
    assignment: "",
  });

  const stats = [
    {
      title: "Total Lesson Notes",
      value: notes.length,
      icon: BookOpen,
      color: "bg-indigo-50 text-indigo-600",
      description: "All submitted lesson notes",
    },
    {
      title: "Pending Review",
      value: notes.filter((n) => n.status === "Pending").length,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
      description: "Awaiting admin review",
    },
    {
      title: "Approved",
      value: notes.filter((n) => n.status === "Approved" || n.status === "Published").length,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
      description: "Approved or published",
    },
    {
      title: "Rejected",
      value: notes.filter((n) => n.status === "Rejected").length,
      icon: XCircle,
      color: "bg-red-50 text-red-600",
      description: "Returned for correction",
    },
  ];

  const filteredNotes = useMemo(() => {
    const query = search.toLowerCase();

    return notes.filter((note) => {
      const matchesSearch = [
        note.teacher,
        note.subject,
        note.topic,
        note.noteNo,
        note.teacherId,
      ].some((value) => value.toLowerCase().includes(query));

      return (
        matchesSearch &&
        (statusFilter === "All" || note.status === statusFilter) &&
        (classFilter === "All" || note.className === classFilter) &&
        (termFilter === "All" || note.term === termFilter)
      );
    });
  }, [notes, search, statusFilter, classFilter, termFilter]);

  const updateStatus = (id, status, remarks = "") => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, status, remarks: remarks || note.remarks }
          : note
      )
    );
    setSelected((prev) =>
      prev?.id === id
        ? { ...prev, status, remarks: remarks || prev.remarks }
        : prev
    );
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const newNote = {
      ...form,
      id: Date.now(),
      noteNo: `LN-2026-${String(notes.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString().slice(0, 10),
      status: "Pending",
      remarks: "",
    };

    setNotes((prev) => [newNote, ...prev]);
    setShowCreate(false);
    setForm({
      teacher: "",
      teacherId: "",
      subject: "",
      className: "",
      topic: "",
      week: "Week 1",
      term: "First Term",
      session: "2026/2027",
      objectives: "",
      materials: "",
      introduction: "",
      activities: "",
      evaluation: "",
      assignment: "",
    });
  };

  const exportCSV = () => {
    const headers = [
      "Note Number", "Teacher", "Teacher ID", "Subject", "Class",
      "Topic", "Week", "Term", "Session", "Date", "Status",
    ];

    const rows = filteredNotes.map((n) => [
      n.noteNo, n.teacher, n.teacherId, n.subject, n.className,
      n.topic, n.week, n.term, n.session, n.date, n.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "admin-lesson-notes.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const printNote = (note) => {
    const escapeHTML = (value = "") =>
      String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[char]));

    const fields = [
      ["Learning Objectives", note.objectives],
      ["Instructional Materials", note.materials],
      ["Introduction", note.introduction],
      ["Lesson Activities", note.activities],
      ["Evaluation", note.evaluation],
      ["Assignment", note.assignment],
      ["Admin Remarks", note.remarks],
    ];

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${escapeHTML(note.noteNo)}</title>
        <style>
          body { font-family: Arial, sans-serif; color: #1e293b; padding: 30px; line-height: 1.5; }
          h1, h2 { text-align: center; }
          h1 { margin-bottom: 4px; }
          h2 { font-size: 16px; margin-top: 0; color: #475569; }
          .meta { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 25px 0; }
          .meta div { border: 1px solid #ddd; padding: 10px; }
          .section { margin: 18px 0; }
          .section h3 { margin-bottom: 5px; font-size: 14px; }
          .section p { white-space: pre-wrap; margin-top: 0; }
          .signature { display: flex; justify-content: space-between; margin-top: 70px; }
          .signature div { border-top: 1px solid #333; padding-top: 8px; width: 35%; text-align: center; }
          @media print { body { padding: 10px; } }
        </style>
      </head>
      <body>
        <h1>JIBREEL MODEL SCHOOL</h1>
        <h2>TEACHER LESSON NOTE</h2>
        <div class="meta">
          <div><strong>Teacher:</strong> ${escapeHTML(note.teacher)}</div>
          <div><strong>Subject:</strong> ${escapeHTML(note.subject)}</div>
          <div><strong>Class:</strong> ${escapeHTML(note.className)}</div>
          <div><strong>Topic:</strong> ${escapeHTML(note.topic)}</div>
          <div><strong>Week:</strong> ${escapeHTML(note.week)}</div>
          <div><strong>Term:</strong> ${escapeHTML(note.term)}</div>
          <div><strong>Session:</strong> ${escapeHTML(note.session)}</div>
          <div><strong>Reference:</strong> ${escapeHTML(note.noteNo)}</div>
        </div>
        ${fields.map(([title, value]) => `
          <div class="section">
            <h3>${escapeHTML(title)}</h3>
            <p>${escapeHTML(value || "Not provided")}</p>
          </div>
        `).join("")}
        <div class="signature">
          <div>Teacher's Signature</div>
          <div>Administrator's Signature</div>
        </div>
        <script>window.onload = () => window.print();</script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const openReview = (note) => {
    setSelected(note);
    setReviewComment(note.remarks || "");
    setShowReview(true);
  };

  const submitReview = (status) => {
    if (status === "Rejected" && !reviewComment.trim()) {
      alert("Please provide a reason or correction note before rejecting.");
      return;
    }

    updateStatus(selected.id, status, reviewComment);
    setShowReview(false);
  };

  const Field = ({ label, value }) => (
    <div className="rounded-lg bg-slate-50 p-3">
      <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>
      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-800">
        {value || "Not provided"}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Page header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <span>Admin</span><span>/</span>
              <span className="text-indigo-600">Lesson Notes</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Lesson Notes Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Review teacher submissions and manage lesson note approvals. Changes apply to the sample data on this page only.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={exportCSV} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <Download size={17} /> Export
            </button>
            <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
              <Plus size={18} /> Add Lesson Note
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => <StatCard key={stat.title} {...stat} />)}
        </div>

        {/* Information cards */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600"><Users size={23} /></div>
            <div>
              <p className="text-sm text-slate-500">Teacher Submissions</p>
              <p className="font-semibold text-slate-900">Monitor lesson preparation</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600"><ClipboardList size={23} /></div>
            <div>
              <p className="text-sm text-slate-500">Review Process</p>
              <p className="font-semibold text-slate-900">Check quality and completeness</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600"><BookMarked size={23} /></div>
            <div>
              <p className="text-sm text-slate-500">Approved Notes</p>
              <p className="font-semibold text-slate-900">Ready for lesson delivery</p>
            </div>
          </div>
        </div>

        {/* Lesson note table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5">
            <div>
              <h2 className="font-bold text-slate-900">All Lesson Notes</h2>
              <p className="mt-1 text-sm text-slate-500">Review and manage lesson notes submitted by teachers.</p>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search teacher, subject..."
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
                <option value="All">All Statuses</option>
                <option>Pending</option>
                <option>Under Review</option>
                <option>Approved</option>
                <option>Published</option>
                <option>Rejected</option>
              </select>
              <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
                <option value="All">All Classes</option>
                <option>JSS 1A</option>
                <option>JSS 2B</option>
                <option>SS 1A</option>
                <option>SS 2A</option>
                <option>SS 3A</option>
              </select>
              <select value={termFilter} onChange={(e) => setTermFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
                <option value="All">All Terms</option>
                <option>First Term</option>
                <option>Second Term</option>
                <option>Third Term</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Teacher</th>
                  <th className="px-5 py-4">Subject / Topic</th>
                  <th className="px-5 py-4">Class</th>
                  <th className="px-5 py-4">Week / Term</th>
                  <th className="px-5 py-4">Session</th>
                  <th className="px-5 py-4">Submitted</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredNotes.map((note) => (
                  <tr key={note.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">{note.teacher}</p>
                      <p className="mt-1 text-xs text-slate-500">{note.teacherId}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">{note.subject}</p>
                      <p className="mt-1 text-xs text-slate-500">{note.topic}</p>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-700">{note.className}</td>
                    <td className="px-5 py-4">
                      <p className="text-slate-700">{note.week}</p>
                      <p className="mt-1 text-xs text-slate-500">{note.term}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{note.session}</td>
                    <td className="px-5 py-4 text-slate-600">{note.date}</td>
                    <td className="px-5 py-4"><StatusBadge status={note.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button title="View lesson note" onClick={() => { setSelected(note); setShowPreview(true); }} className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600">
                          <Eye size={17} />
                        </button>
                        <button title="Print lesson note" onClick={() => printNote(note)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800">
                          <Printer size={17} />
                        </button>
                        <div className="relative group">
                          <button
                            onClick={() => setOpenMenuId((current) => current === note.id ? null : note.id)}
                            aria-label={`More actions for ${note.noteNo}`}
                            aria-expanded={openMenuId === note.id}
                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                          >
                            <MoreVertical size={17} />
                          </button>
                          <div className={`${openMenuId === note.id ? "visible opacity-100" : "invisible opacity-0 group-hover:visible group-hover:opacity-100"} absolute right-0 top-9 z-20 w-44 rounded-lg border border-slate-200 bg-white p-1`}>
                            <button onClick={() => openReview(note)} className="w-full rounded-md px-3 py-2 text-left text-xs text-indigo-700 hover:bg-indigo-50">
                              Review submission
                            </button>
                            {note.status === "Approved" && (
                              <button onClick={() => updateStatus(note.id, "Published")} className="w-full rounded-md px-3 py-2 text-left text-xs text-violet-700 hover:bg-violet-50">
                                Publish lesson note
                              </button>
                            )}
                            {note.status === "Published" && (
                              <button onClick={() => updateStatus(note.id, "Approved")} className="w-full rounded-md px-3 py-2 text-left text-xs text-amber-700 hover:bg-amber-50">
                                Unpublish note
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredNotes.length === 0 && (
              <div className="py-14 text-center">
                <BookOpen className="mx-auto mb-3 text-slate-300" size={36} />
                <p className="font-semibold text-slate-700">No lesson notes found</p>
                <p className="mt-1 text-sm text-slate-500">Try changing your search or filters.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>Showing {filteredNotes.length} of {notes.length} lesson notes</span>
            <span>Academic session: 2026/2027</span>
          </div>
        </div>
      </div>

      {/* Add lesson note modal */}
      {showCreate && (
        <Modal title="Add Lesson Note" onClose={() => setShowCreate(false)}>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Teacher Name</label>
                <input required value={form.teacher} onChange={(e) => setForm({ ...form, teacher: e.target.value })} placeholder="Enter teacher name" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Teacher ID</label>
                <input required value={form.teacherId} onChange={(e) => setForm({ ...form, teacherId: e.target.value })} placeholder="TCH-0001" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Subject</label>
                <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Enter subject" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Class</label>
                <input required value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} placeholder="e.g. SS 2A" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Lesson Topic</label>
                <input required value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="Enter lesson topic" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Week</label>
                <select value={form.week} onChange={(e) => setForm({ ...form, week: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
                  {Array.from({ length: 14 }, (_, i) => <option key={i}>Week {i + 1}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Term</label>
                <select value={form.term} onChange={(e) => setForm({ ...form, term: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
                  <option>First Term</option>
                  <option>Second Term</option>
                  <option>Third Term</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Academic Session</label>
                <select value={form.session} onChange={(e) => setForm({ ...form, session: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
                  <option>2026/2027</option>
                  <option>2025/2026</option>
                  <option>2024/2025</option>
                </select>
              </div>
              {[
                ["objectives", "Learning Objectives", "What should students learn?"],
                ["materials", "Instructional Materials", "List teaching materials..."],
                ["introduction", "Introduction", "How will the lesson begin?"],
                ["activities", "Lesson Activities", "Describe teacher and student activities..."],
                ["evaluation", "Evaluation", "How will students be assessed?"],
                ["assignment", "Assignment", "Enter homework or follow-up tasks..."],
              ].map(([key, label, placeholder]) => (
                <div key={key} className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
                  <textarea required value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} rows={3} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500" />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button type="button" onClick={() => setShowCreate(false)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
              <button type="submit" className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Save Lesson Note</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Preview modal */}
      {showPreview && selected && (
        <Modal title="Lesson Note Details" onClose={() => setShowPreview(false)}>
          <div className="space-y-5">
            <div className="rounded-xl border border-slate-200 p-5 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <BookOpen size={25} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">{selected.subject}</h2>
              <p className="mt-1 text-sm text-slate-500">{selected.topic}</p>
              <p className="mt-2 text-xs text-slate-400">{selected.noteNo}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Teacher" value={selected.teacher} />
              <Field label="Teacher ID" value={selected.teacherId} />
              <Field label="Class" value={selected.className} />
              <Field label="Week" value={selected.week} />
              <Field label="Term" value={selected.term} />
              <Field label="Academic Session" value={selected.session} />
              <Field label="Submission Date" value={selected.date} />
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="mb-2 text-xs font-medium text-slate-500">Status</p>
                <StatusBadge status={selected.status} />
              </div>
            </div>

            <div className="space-y-3">
              <Field label="Learning Objectives" value={selected.objectives} />
              <Field label="Instructional Materials" value={selected.materials} />
              <Field label="Introduction" value={selected.introduction} />
              <Field label="Lesson Activities" value={selected.activities} />
              <Field label="Evaluation" value={selected.evaluation} />
              <Field label="Assignment" value={selected.assignment} />
              <Field label="Admin Remarks" value={selected.remarks} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <StatusBadge status={selected.status} />
              <div className="flex flex-wrap gap-2">
                <button onClick={() => printNote(selected)} className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <Printer size={16} /> Print
                </button>
                <button onClick={() => { setShowPreview(false); openReview(selected); }} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                  <ClipboardList size={16} /> Review
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Review modal */}
      {showReview && selected && (
        <Modal title="Review Lesson Note" onClose={() => setShowReview(false)} size="max-w-xl">
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">{selected.topic}</p>
              <p className="mt-1 text-sm text-slate-500">{selected.teacher} · {selected.subject} · {selected.className}</p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Review Comments / Correction Instructions
              </label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={4}
                placeholder="Enter feedback for the teacher..."
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
              />
              <p className="mt-1 text-xs text-slate-400">A comment is required when rejecting a lesson note.</p>
            </div>
            <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-4">
              <button onClick={() => submitReview("Rejected")} className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">
                <XCircle size={16} /> Reject
              </button>
              <button onClick={() => submitReview("Under Review")} className="flex items-center gap-2 rounded-lg border border-blue-200 px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50">
                <Clock size={16} /> Request Changes
              </button>
              <button onClick={() => submitReview("Approved")} className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
                <CheckCircle2 size={16} /> Approve
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
