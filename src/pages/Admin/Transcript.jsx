
import React, { useMemo, useState } from "react";
import {
  Award, BookOpen, Search, Plus, Download, Printer, Eye,
  CheckCircle2, Clock, XCircle, FileText, Filter, X,
  ChevronDown, MoreVertical, GraduationCap, Users, TrendingUp,
  CalendarDays, RefreshCw, Trash2
} from "lucide-react";

const initialTranscripts = [
  {
    id: 1,
    transcriptNo: "TRN-2026-001",
    student: "Abdulrahman Jibreel",
    admissionNo: "STU-2026-0012",
    className: "SS 3A",
    department: "Science",
    session: "2025/2026",
    type: "Official Transcript",
    date: "2026-10-12",
    status: "Issued",
    gpa: "4.72",
    cgpa: "4.65",
    subjects: [
      { name: "Mathematics", grade: "A", score: 85, unit: 3 },
      { name: "English Language", grade: "A", score: 82, unit: 3 },
      { name: "Physics", grade: "A", score: 88, unit: 3 },
      { name: "Chemistry", grade: "B", score: 76, unit: 3 },
      { name: "Biology", grade: "A", score: 84, unit: 3 },
    ],
  },
  {
    id: 2,
    transcriptNo: "TRN-2026-002",
    student: "Aisha Jibreel",
    admissionNo: "STU-2026-0045",
    className: "SS 2A",
    department: "Science",
    session: "2025/2026",
    type: "Student Copy",
    date: "2026-10-15",
    status: "Pending",
    gpa: "4.50",
    cgpa: "4.38",
    subjects: [
      { name: "Mathematics", grade: "A", score: 81, unit: 3 },
      { name: "English Language", grade: "B", score: 75, unit: 3 },
      { name: "Physics", grade: "A", score: 86, unit: 3 },
      { name: "Chemistry", grade: "B", score: 73, unit: 3 },
    ],
  },
  {
    id: 3,
    transcriptNo: "TRN-2026-003",
    student: "Muhammad Ibrahim",
    admissionNo: "STU-2026-0061",
    className: "SS 1B",
    department: "Arts",
    session: "2025/2026",
    type: "Official Transcript",
    date: "2026-10-18",
    status: "Processing",
    gpa: "4.10",
    cgpa: "4.02",
    subjects: [
      { name: "Government", grade: "A", score: 82, unit: 3 },
      { name: "Literature", grade: "B", score: 76, unit: 3 },
      { name: "English Language", grade: "A", score: 85, unit: 3 },
      { name: "History", grade: "B", score: 72, unit: 3 },
    ],
  },
  {
    id: 4,
    transcriptNo: "TRN-2026-004",
    student: "Fatimah Abdullahi",
    admissionNo: "STU-2026-0074",
    className: "JSS 3B",
    department: "Junior School",
    session: "2025/2026",
    type: "Student Copy",
    date: "2026-10-20",
    status: "Rejected",
    gpa: "4.30",
    cgpa: "4.25",
    subjects: [
      { name: "Mathematics", grade: "A", score: 80, unit: 3 },
      { name: "English Language", grade: "B", score: 74, unit: 3 },
      { name: "Basic Science", grade: "A", score: 87, unit: 3 },
    ],
  },
];

const statusStyles = {
  Issued: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Processing: "bg-blue-50 text-blue-700",
  Rejected: "bg-red-50 text-red-700",
};

function StatusBadge({ status }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

function StatCard({ title, value, icon: Icon, color, description }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
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

function Modal({ title, onClose, children, size = "max-w-2xl" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className={`max-h-[90vh] w-full ${size} overflow-y-auto rounded-2xl bg-white`}>
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
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

export default function AdminTranscript() {
  const [transcripts, setTranscripts] = useState(initialTranscripts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sessionFilter, setSessionFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [newTranscript, setNewTranscript] = useState({
    student: "",
    admissionNo: "",
    className: "",
    department: "",
    session: "2025/2026",
    type: "Official Transcript",
  });

  const stats = [
    {
      title: "Total Transcripts",
      value: transcripts.length,
      icon: FileText,
      color: "bg-indigo-50 text-indigo-600",
      description: "All transcript records",
    },
    {
      title: "Issued",
      value: transcripts.filter((t) => t.status === "Issued").length,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
      description: "Successfully issued",
    },
    {
      title: "Pending Requests",
      value: transcripts.filter((t) => t.status === "Pending").length,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
      description: "Awaiting approval",
    },
    {
      title: "Processing",
      value: transcripts.filter((t) => t.status === "Processing").length,
      icon: RefreshCw,
      color: "bg-blue-50 text-blue-600",
      description: "Currently being prepared",
    },
  ];

  const filteredTranscripts = useMemo(() => {
    return transcripts.filter((item) => {
      const query = search.toLowerCase();
      const matchesSearch =
        item.student.toLowerCase().includes(query) ||
        item.admissionNo.toLowerCase().includes(query) ||
        item.transcriptNo.toLowerCase().includes(query);

      return (
        matchesSearch &&
        (statusFilter === "All" || item.status === statusFilter) &&
        (sessionFilter === "All" || item.session === sessionFilter)
      );
    });
  }, [transcripts, search, statusFilter, sessionFilter]);

  const updateStatus = (id, status) => {
    setTranscripts((prev) =>
      prev.map((item) => item.id === id ? { ...item, status } : item)
    );
    setSelected((prev) => prev?.id === id ? { ...prev, status } : prev);
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const record = {
      ...newTranscript,
      id: Date.now(),
      transcriptNo: `TRN-2026-${String(transcripts.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString().slice(0, 10),
      status: "Pending",
      gpa: "0.00",
      cgpa: "0.00",
      subjects: [],
    };

    setTranscripts((prev) => [record, ...prev]);
    setShowCreate(false);
    setNewTranscript({
      student: "",
      admissionNo: "",
      className: "",
      department: "",
      session: "2025/2026",
      type: "Official Transcript",
    });
  };

  const exportCSV = () => {
    const headers = [
      "Transcript Number", "Student", "Admission Number",
      "Class", "Department", "Session", "Type", "Status", "Date",
    ];

    const rows = filteredTranscripts.map((t) => [
      t.transcriptNo, t.student, t.admissionNo, t.className,
      t.department, t.session, t.type, t.status, t.date,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "school-transcripts.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const printTranscript = (item) => {
    const rows = item.subjects.map((subject) => `
      <tr>
        <td>${subject.name}</td>
        <td>${subject.unit}</td>
        <td>${subject.score}</td>
        <td>${subject.grade}</td>
      </tr>
    `).join("");

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${item.transcriptNo}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 35px; color: #1e293b; }
          h1, h2, p { text-align: center; }
          h1 { margin-bottom: 5px; }
          .subtitle { color: #64748b; margin-bottom: 30px; }
          .details { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 25px 0; }
          .details div { border: 1px solid #ddd; padding: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 25px; }
          th, td { border: 1px solid #ddd; padding: 11px; text-align: left; }
          th { background: #f1f5f9; }
          .summary { display: flex; justify-content: space-between; margin-top: 25px; }
          .signatures { display: flex; justify-content: space-between; margin-top: 75px; }
          .signatures div { border-top: 1px solid #333; padding-top: 8px; width: 35%; text-align: center; }
          @media print { body { padding: 10px; } }
        </style>
      </head>
      <body>
        <h1>JIBREEL MODEL SCHOOL</h1>
        <p class="subtitle">OFFICIAL ACADEMIC TRANSCRIPT</p>
        <div class="details">
          <div><strong>Student:</strong> ${item.student}</div>
          <div><strong>Admission No:</strong> ${item.admissionNo}</div>
          <div><strong>Class:</strong> ${item.className}</div>
          <div><strong>Department:</strong> ${item.department}</div>
          <div><strong>Academic Session:</strong> ${item.session}</div>
          <div><strong>Transcript No:</strong> ${item.transcriptNo}</div>
        </div>
        <table>
          <thead><tr><th>Subject</th><th>Units</th><th>Score</th><th>Grade</th></tr></thead>
          <tbody>${rows || "<tr><td colspan='4'>No subject records available</td></tr>"}</tbody>
        </table>
        <div class="summary">
          <p><strong>GPA:</strong> ${item.gpa}</p>
          <p><strong>CGPA:</strong> ${item.cgpa}</p>
        </div>
        <div class="signatures">
          <div>School Administrator</div>
          <div>Principal</div>
        </div>
        <script>window.onload = () => window.print();</script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <span>Admin</span><span>/</span><span className="text-indigo-600">Transcripts</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Transcript Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Generate, review, approve and manage students' academic transcripts.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={exportCSV} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <Download size={17} /> Export
            </button>
            <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
              <Plus size={18} /> Generate Transcript
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => <StatCard key={stat.title} {...stat} />)}
        </div>

        {/* Quick information */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
            <div className="rounded-xl bg-violet-50 p-3 text-violet-600"><GraduationCap size={23} /></div>
            <div>
              <p className="text-sm text-slate-500">Academic Records</p>
              <p className="font-semibold text-slate-900">Student performance history</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
            <div className="rounded-xl bg-sky-50 p-3 text-sky-600"><BookOpen size={23} /></div>
            <div>
              <p className="text-sm text-slate-500">Transcript Types</p>
              <p className="font-semibold text-slate-900">Official and student copies</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600"><TrendingUp size={23} /></div>
            <div>
              <p className="text-sm text-slate-500">Approval Workflow</p>
              <p className="font-semibold text-slate-900">Review before issuing</p>
            </div>
          </div>
        </div>

        {/* Transcript table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">All Transcripts</h2>
              <p className="mt-1 text-sm text-slate-500">Manage student transcript requests and records.</p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search student or transcript..."
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-indigo-500 sm:w-64"
                />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
                <option value="All">All Statuses</option>
                <option value="Issued">Issued</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Rejected">Rejected</option>
              </select>
              <select value={sessionFilter} onChange={(e) => setSessionFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
                <option value="All">All Sessions</option>
                <option value="2025/2026">2025/2026</option>
                <option value="2024/2025">2024/2025</option>
                <option value="2023/2024">2023/2024</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Student</th>
                  <th className="px-5 py-4">Transcript No.</th>
                  <th className="px-5 py-4">Class / Dept.</th>
                  <th className="px-5 py-4">Session</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTranscripts.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">{item.student}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.admissionNo}</p>
                    </td>
                    <td className="px-5 py-4 font-medium text-indigo-600">{item.transcriptNo}</td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-800">{item.className}</p>
                      <p className="text-xs text-slate-500">{item.department}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{item.session}</td>
                    <td className="px-5 py-4 text-slate-600">{item.type}</td>
                    <td className="px-5 py-4 text-slate-600">{item.date}</td>
                    <td className="px-5 py-4"><StatusBadge status={item.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button title="View transcript" onClick={() => { setSelected(item); setShowPreview(true); }} className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600">
                          <Eye size={17} />
                        </button>
                        <button title="Print transcript" onClick={() => printTranscript(item)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800">
                          <Printer size={17} />
                        </button>
                        <div className="relative group">
                          <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                            <MoreVertical size={17} />
                          </button>
                          <div className="invisible absolute right-0 top-9 z-20 w-40 rounded-lg border border-slate-200 bg-white p-1 opacity-0 group-hover:visible group-hover:opacity-100">
                            {item.status !== "Issued" && (
                              <button onClick={() => updateStatus(item.id, "Issued")} className="w-full rounded-md px-3 py-2 text-left text-xs text-emerald-700 hover:bg-emerald-50">
                                Approve & Issue
                              </button>
                            )}
                            {item.status !== "Processing" && (
                              <button onClick={() => updateStatus(item.id, "Processing")} className="w-full rounded-md px-3 py-2 text-left text-xs text-blue-700 hover:bg-blue-50">
                                Mark Processing
                              </button>
                            )}
                            {item.status !== "Rejected" && (
                              <button onClick={() => updateStatus(item.id, "Rejected")} className="w-full rounded-md px-3 py-2 text-left text-xs text-red-700 hover:bg-red-50">
                                Reject Request
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

            {filteredTranscripts.length === 0 && (
              <div className="py-14 text-center">
                <FileText className="mx-auto mb-3 text-slate-300" size={35} />
                <p className="font-semibold text-slate-700">No transcripts found</p>
                <p className="mt-1 text-sm text-slate-500">Try changing your search or filters.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>Showing {filteredTranscripts.length} of {transcripts.length} transcripts</span>
            <span>Academic session: 2025/2026</span>
          </div>
        </div>
      </div>

      {/* Generate transcript modal */}
      {showCreate && (
        <Modal title="Generate New Transcript" onClose={() => setShowCreate(false)}>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Student Full Name</label>
              <input required value={newTranscript.student} onChange={(e) => setNewTranscript({ ...newTranscript, student: e.target.value })} placeholder="Enter student name" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Admission Number</label>
                <input required value={newTranscript.admissionNo} onChange={(e) => setNewTranscript({ ...newTranscript, admissionNo: e.target.value })} placeholder="STU-2026-0001" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Class</label>
                <input required value={newTranscript.className} onChange={(e) => setNewTranscript({ ...newTranscript, className: e.target.value })} placeholder="e.g. SS 3A" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Department</label>
                <select required value={newTranscript.department} onChange={(e) => setNewTranscript({ ...newTranscript, department: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
                  <option value="">Select department</option>
                  <option>Science</option>
                  <option>Arts</option>
                  <option>Commercial</option>
                  <option>Junior School</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Academic Session</label>
                <select value={newTranscript.session} onChange={(e) => setNewTranscript({ ...newTranscript, session: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
                  <option>2025/2026</option>
                  <option>2024/2025</option>
                  <option>2023/2024</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Transcript Type</label>
              <select value={newTranscript.type} onChange={(e) => setNewTranscript({ ...newTranscript, type: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
                <option>Official Transcript</option>
                <option>Student Copy</option>
                <option>Transfer Transcript</option>
                <option>Unofficial Transcript</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button type="button" onClick={() => setShowCreate(false)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
              <button type="submit" className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Create Transcript</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Transcript preview modal */}
      {showPreview && selected && (
        <Modal title="Transcript Preview" onClose={() => setShowPreview(false)} size="max-w-3xl">
          <div className="space-y-5">
            <div className="rounded-xl border border-slate-200 p-5 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <GraduationCap size={28} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">JIBREEL MODEL SCHOOL</h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-500">Academic Transcript</p>
              <p className="mt-2 text-xs text-slate-400">{selected.transcriptNo}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Student Name", selected.student],
                ["Admission Number", selected.admissionNo],
                ["Class", selected.className],
                ["Department", selected.department],
                ["Academic Session", selected.session],
                ["Transcript Type", selected.type],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-slate-900">Academic Performance</h3>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full min-w-[450px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Subject</th>
                      <th className="px-4 py-3">Units</th>
                      <th className="px-4 py-3">Score</th>
                      <th className="px-4 py-3">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selected.subjects.map((subject, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 font-medium text-slate-800">{subject.name}</td>
                        <td className="px-4 py-3">{subject.unit}</td>
                        <td className="px-4 py-3">{subject.score}</td>
                        <td className="px-4 py-3 font-semibold text-indigo-600">{subject.grade}</td>
                      </tr>
                    ))}
                    {selected.subjects.length === 0 && (
                      <tr><td colSpan="4" className="px-4 py-8 text-center text-slate-500">No academic results available yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-indigo-50 p-4">
                <p className="text-xs text-indigo-600">GPA</p>
                <p className="mt-1 text-2xl font-bold text-indigo-700">{selected.gpa}</p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-4">
                <p className="text-xs text-emerald-600">CGPA</p>
                <p className="mt-1 text-2xl font-bold text-emerald-700">{selected.cgpa}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <StatusBadge status={selected.status} />
              <div className="flex flex-wrap gap-2">
                <button onClick={() => printTranscript(selected)} className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <Printer size={16} /> Print
                </button>
                {selected.status !== "Issued" && (
                  <button onClick={() => updateStatus(selected.id, "Issued")} className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                    <CheckCircle2 size={16} /> Approve & Issue
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
