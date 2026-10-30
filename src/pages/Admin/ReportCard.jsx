
import { useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Download,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  MessageSquare,
  Printer,
  Search,
  Send,
  Users,
  X,
  Clock3,
  RotateCcw,
} from "lucide-react";

const initialReports = [
  {
    id: 1,
    student: "Abdulrahman Jibreel",
    admissionNo: "STU-2026-0012",
    className: "SS 2A",
    department: "Science",
    teacher: "Mr. Ibrahim",
    average: 82,
    attendance: 94,
    comment: "A hardworking student who demonstrates good understanding.",
    status: "Pending Review",
  },
  {
    id: 2,
    student: "Aisha Jibreel",
    admissionNo: "STU-2026-0045",
    className: "SS 2A",
    department: "Science",
    teacher: "Mrs. Bello",
    average: 76,
    attendance: 97,
    comment: "Consistent effort and good classroom participation.",
    status: "Approved",
  },
  {
    id: 3,
    student: "Muhammad Ibrahim",
    admissionNo: "STU-2026-0061",
    className: "SS 1B",
    department: "Arts",
    teacher: "Mr. Yusuf",
    average: 43,
    attendance: 82,
    comment: "Needs additional support and regular revision.",
    status: "Pending Review",
  },
  {
    id: 4,
    student: "Fatimah Abdullahi",
    admissionNo: "STU-2026-0074",
    className: "JSS 3B",
    department: "Junior School",
    teacher: "Mrs. Okafor",
    average: 91,
    attendance: 96,
    comment: "Excellent academic performance and attitude.",
    status: "Published",
  },
  {
    id: 5,
    student: "Yusuf Ahmed",
    admissionNo: "STU-2026-0088",
    className: "JSS 3B",
    department: "Junior School",
    teacher: "Mr. Ibrahim",
    average: 51,
    attendance: 78,
    comment: "Please improve consistency in classwork.",
    status: "Returned",
  },
  {
    id: 6,
    student: "Maryam Suleiman",
    admissionNo: "STU-2026-0094",
    className: "SS 2A",
    department: "Science",
    teacher: "Mrs. Bello",
    average: 68,
    attendance: 91,
    comment: "Good progress; continue working hard.",
    status: "Approved",
  },
];

const statusStyles = {
  "Pending Review": "border-amber-200 bg-amber-50 text-amber-700",
  Approved: "border-blue-200 bg-blue-50 text-blue-700",
  Returned: "border-rose-200 bg-rose-50 text-rose-700",
  Published: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <Icon size={21} className="text-slate-700" />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${
        statusStyles[status] || statusStyles["Pending Review"]
      }`}
    >
      {status}
    </span>
  );
}

export default function AdminReportCard() {
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState("");
  const [session, setSession] = useState("2026/2027");
  const [term, setTerm] = useState("First Term");
  const [classFilter, setClassFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [teacherFilter, setTeacherFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);
  const [returnReason, setReturnReason] = useState("");
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [notice, setNotice] = useState("");

  const counts = useMemo(() => ({
    total: reports.length,
    pending: reports.filter((r) => r.status === "Pending Review").length,
    approved: reports.filter((r) => r.status === "Approved").length,
    published: reports.filter((r) => r.status === "Published").length,
    returned: reports.filter((r) => r.status === "Returned").length,
  }), [reports]);

  const average = reports.length
    ? (
        reports.reduce((sum, report) => sum + report.average, 0) /
        reports.length
      ).toFixed(1)
    : "0.0";

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const query = search.toLowerCase();

      const matchesSearch =
        report.student.toLowerCase().includes(query) ||
        report.admissionNo.toLowerCase().includes(query) ||
        report.teacher.toLowerCase().includes(query);

      const matchesClass =
        classFilter === "All" || report.className === classFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        report.department === departmentFilter;

      const matchesTeacher =
        teacherFilter === "All" || report.teacher === teacherFilter;

      const matchesStatus =
        statusFilter === "All" || report.status === statusFilter;

      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Pending" && report.status === "Pending Review") ||
        (activeTab === "Approved" && report.status === "Approved") ||
        (activeTab === "Published" && report.status === "Published") ||
        (activeTab === "Returned" && report.status === "Returned");

      return (
        matchesSearch &&
        matchesClass &&
        matchesDepartment &&
        matchesTeacher &&
        matchesStatus &&
        matchesTab
      );
    });
  }, [
    reports,
    search,
    classFilter,
    departmentFilter,
    teacherFilter,
    statusFilter,
    activeTab,
  ]);

  const updateStatus = (id, status, message) => {
    setReports((current) =>
      current.map((report) =>
        report.id === id ? { ...report, status } : report
      )
    );
    setSelectedReport(null);
    setShowReturnForm(false);
    setReturnReason("");
    setNotice(message);
  };

  const approveReport = (report) => {
    updateStatus(
      report.id,
      "Approved",
      `${report.student}'s report has been approved.`
    );
  };

  const publishReport = (report) => {
    updateStatus(
      report.id,
      "Published",
      `${report.student}'s report has been published.`
    );
  };

  const returnReport = () => {
    if (!selectedReport || !returnReason.trim()) return;

    const student = selectedReport.student;

    setReports((current) =>
      current.map((report) =>
        report.id === selectedReport.id
          ? {
              ...report,
              status: "Returned",
              returnReason: returnReason.trim(),
            }
          : report
      )
    );

    setSelectedReport(null);
    setShowReturnForm(false);
    setReturnReason("");
    setNotice(`Report returned to the teacher for correction: ${student}.`);
  };

  const exportCSV = () => {
    const headers = [
      "Student",
      "Admission Number",
      "Class",
      "Department",
      "Teacher",
      "Average (%)",
      "Attendance (%)",
      "Teacher Comment",
      "Status",
    ];

    const rows = filteredReports.map((report) => [
      report.student,
      report.admissionNo,
      report.className,
      report.department,
      report.teacher,
      report.average,
      report.attendance,
      report.comment,
      report.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;",
      })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "admin-report-cards.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const printReport = (report) => {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      setNotice("Please allow pop-ups to print the report card.");
      return;
    }

    const safe = (value) =>
      String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Report Card - ${safe(report.student)}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 32px; color: #1e293b; }
          h1, h2 { text-align: center; }
          .details { line-height: 2; margin: 28px 0; }
          .summary { display: flex; gap: 24px; margin: 24px 0; }
          .summary div { border: 1px solid #cbd5e1; padding: 16px; flex: 1; }
          .comment { margin-top: 32px; }
          .signatures { display: flex; justify-content: space-between; margin-top: 70px; }
          @media print { body { padding: 8px; } }
        </style>
      </head>
      <body>
        <h1>Student Report Card</h1>
        <h2>${safe(term)} — ${safe(session)}</h2>
        <div class="details">
          <strong>Student:</strong> ${safe(report.student)}<br>
          <strong>Admission Number:</strong> ${safe(report.admissionNo)}<br>
          <strong>Class:</strong> ${safe(report.className)}<br>
          <strong>Department:</strong> ${safe(report.department)}<br>
          <strong>Class Teacher:</strong> ${safe(report.teacher)}
        </div>
        <div class="summary">
          <div><strong>Average</strong><br>${safe(report.average)}%</div>
          <div><strong>Attendance</strong><br>${safe(report.attendance)}%</div>
          <div><strong>Report Status</strong><br>${safe(report.status)}</div>
        </div>
        <div class="comment">
          <strong>Teacher's Comment</strong>
          <p>${safe(report.comment || "No comment provided.")}</p>
        </div>
        <div class="signatures">
          <span>Class Teacher: __________________</span>
          <span>Principal: __________________</span>
        </div>
        <script>window.onload = () => window.print();<\/script>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  const closeModal = () => {
    setSelectedReport(null);
    setShowReturnForm(false);
    setReturnReason("");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <GraduationCap size={17} />
              <span>Admin Portal</span>
              <span>/</span>
              <span>Report Cards</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Report Card Management
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Review, approve, and publish student academic reports.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            <Download size={17} />
            Export Reports
          </button>
        </div>

        {notice && (
          <div className="flex items-start justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <span>{notice}</span>
            <button
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Total Reports"
            value={counts.total}
            description="Reports in this view"
            icon={Users}
          />
          <StatCard
            title="Pending Review"
            value={counts.pending}
            description="Awaiting admin action"
            icon={Clock3}
          />
          <StatCard
            title="Approved"
            value={counts.approved}
            description="Ready for publishing"
            icon={ClipboardCheck}
          />
          <StatCard
            title="Published"
            value={counts.published}
            description="Released to users"
            icon={CheckCircle2}
          />
          <StatCard
            title="Class Average"
            value={`${average}%`}
            description="Average of sample records"
            icon={Award}
          />
        </div>

        {/* Academic period */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen size={19} className="text-slate-600" />
            <h2 className="font-semibold text-slate-900">
              Academic Period
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-600">
              Academic Session
              <select
                value={session}
                onChange={(event) => setSession(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-800 outline-none focus:border-slate-400"
              >
                <option>2026/2027</option>
                <option>2025/2026</option>
                <option>2024/2025</option>
              </select>
            </label>

            <label className="text-sm font-medium text-slate-600">
              Term
              <select
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-800 outline-none focus:border-slate-400"
              >
                <option>First Term</option>
                <option>Second Term</option>
                <option>Third Term</option>
              </select>
            </label>
          </div>
        </section>

        {/* Reports table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Student Reports
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Inspect teacher submissions and manage report publication.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["All", "Pending", "Approved", "Returned", "Published"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`rounded-xl px-3 py-2 text-sm font-medium ${
                        activeTab === tab
                          ? "bg-slate-900 text-white"
                          : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
              <div className="relative sm:col-span-2 xl:col-span-1">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search student or teacher"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-slate-400"
                />
              </div>

              <div className="relative">
                <Filter
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={classFilter}
                  onChange={(event) => setClassFilter(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-8 text-sm outline-none"
                >
                  <option value="All">All Classes</option>
                  <option value="SS 1B">SS 1B</option>
                  <option value="SS 2A">SS 2A</option>
                  <option value="JSS 3B">JSS 3B</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <select
                value={departmentFilter}
                onChange={(event) => setDepartmentFilter(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
              >
                <option value="All">All Departments</option>
                <option value="Science">Science</option>
                <option value="Arts">Arts</option>
                <option value="Junior School">Junior School</option>
              </select>

              <select
                value={teacherFilter}
                onChange={(event) => setTeacherFilter(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
              >
                <option value="All">All Teachers</option>
                <option value="Mr. Ibrahim">Mr. Ibrahim</option>
                <option value="Mrs. Bello">Mrs. Bello</option>
                <option value="Mr. Yusuf">Mr. Yusuf</option>
                <option value="Mrs. Okafor">Mrs. Okafor</option>
              </select>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Approved">Approved</option>
                <option value="Returned">Returned</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Student</th>
                  <th className="px-5 py-4">Class</th>
                  <th className="px-5 py-4">Department</th>
                  <th className="px-5 py-4">Teacher</th>
                  <th className="px-5 py-4">Average</th>
                  <th className="px-5 py-4">Attendance</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {report.student}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {report.admissionNo}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {report.className}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {report.department}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {report.teacher}
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-900">
                        {report.average}%
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {report.attendance}%
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setShowReturnForm(false);
                          }}
                          title="Review report"
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                        >
                          <Eye size={16} />
                        </button>

                        {report.status === "Pending Review" && (
                          <>
                            <button
                              onClick={() => approveReport(report)}
                              title="Approve report"
                              className="rounded-lg border border-emerald-200 p-2 text-emerald-700 hover:bg-emerald-50"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedReport(report);
                                setShowReturnForm(true);
                              }}
                              title="Return for correction"
                              className="rounded-lg border border-rose-200 p-2 text-rose-700 hover:bg-rose-50"
                            >
                              <RotateCcw size={16} />
                            </button>
                          </>
                        )}

                        {report.status === "Approved" && (
                          <button
                            onClick={() => publishReport(report)}
                            title="Publish report"
                            className="rounded-lg border border-blue-200 p-2 text-blue-700 hover:bg-blue-50"
                          >
                            <Send size={16} />
                          </button>
                        )}

                        <button
                          onClick={() => printReport(report)}
                          title="Print report"
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                        >
                          <Printer size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredReports.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      No reports match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-2 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:flex-row">
            <span>
              Showing {filteredReports.length} of {reports.length} reports
            </span>
            <span>
              {term} · {session}
            </span>
          </div>
        </section>

        {/* Report review modal */}
        {selectedReport && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 sm:p-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeModal();
            }}
          >
            <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Review Report Card
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {selectedReport.student}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close report"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Student Information
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                      {selectedReport.admissionNo}
                    </p>
                  </div>
                  <StatusBadge status={selectedReport.status} />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    ["Class", selectedReport.className],
                    ["Department", selectedReport.department],
                    ["Class Teacher", selectedReport.teacher],
                    ["Academic Session", session],
                    ["Term", term],
                    ["Attendance", `${selectedReport.attendance}%`],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-slate-200 p-4"
                    >
                      <p className="text-xs text-slate-500">{label}</p>
                      <p className="mt-1 font-semibold text-slate-800">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center gap-2">
                    <Award size={18} />
                    <h4 className="font-semibold text-slate-900">
                      Academic Summary
                    </h4>
                  </div>
                  <p className="mt-4 text-3xl font-bold text-slate-900">
                    {selectedReport.average}%
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Overall average across subjects
                  </p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-slate-800"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, selectedReport.average)
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                    <MessageSquare size={18} />
                    Teacher's Comment
                  </h4>
                  <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                    {selectedReport.comment || "No teacher comment provided."}
                  </p>
                </div>

                {selectedReport.returnReason && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                    <p className="text-sm font-semibold text-rose-800">
                      Previous correction request
                    </p>
                    <p className="mt-1 text-sm text-rose-700">
                      {selectedReport.returnReason}
                    </p>
                  </div>
                )}

                {showReturnForm && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                      Reason for returning this report
                    </label>
                    <textarea
                      value={returnReason}
                      onChange={(event) =>
                        setReturnReason(event.target.value)
                      }
                      rows={3}
                      placeholder="Explain what the teacher needs to correct..."
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-slate-400"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      A correction reason is required.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 border-t border-slate-200 bg-slate-50 p-5 sm:flex-row sm:justify-between">
                <button
                  onClick={() => printReport(selectedReport)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Printer size={16} />
                  Print
                </button>

                <div className="flex flex-col gap-2 sm:flex-row">
                  {showReturnForm ? (
                    <>
                      <button
                        onClick={() => setShowReturnForm(false)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={!returnReason.trim()}
                        onClick={returnReport}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-700 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <RotateCcw size={16} />
                        Return Report
                      </button>
                    </>
                  ) : (
                    <>
                      {selectedReport.status === "Pending Review" && (
                        <>
                          <button
                            onClick={() => setShowReturnForm(true)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm font-semibold text-rose-700 hover:bg-rose-50"
                          >
                            <RotateCcw size={16} />
                            Return for Correction
                          </button>
                          <button
                            onClick={() => approveReport(selectedReport)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                          >
                            <CheckCircle2 size={16} />
                            Approve Report
                          </button>
                        </>
                      )}

                      {selectedReport.status === "Approved" && (
                        <button
                          onClick={() => publishReport(selectedReport)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                        >
                          <Send size={16} />
                          Publish Report
                        </button>
                      )}

                      {selectedReport.status === "Published" && (
                        <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                          <CheckCircle2 size={16} />
                          Report Published
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
