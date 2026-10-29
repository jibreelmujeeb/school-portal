
import { useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  CalendarDays,
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
} from "lucide-react";

const initialStudents = [
  {
    id: 1,
    name: "Abdulrahman Jibreel",
    admissionNo: "STU-2026-0012",
    className: "SS 2A",
    subject: "Mathematics",
    ca: 27,
    exam: 62,
    attendance: 94,
    comment: "A hardworking student who demonstrates good understanding.",
    status: "Completed",
  },
  {
    id: 2,
    name: "Aisha Jibreel",
    admissionNo: "STU-2026-0045",
    className: "SS 2A",
    subject: "Mathematics",
    ca: 24,
    exam: 55,
    attendance: 97,
    comment: "Shows consistent effort. More practice is encouraged.",
    status: "Completed",
  },
  {
    id: 3,
    name: "Muhammad Ibrahim",
    admissionNo: "STU-2026-0061",
    className: "SS 2A",
    subject: "Mathematics",
    ca: 18,
    exam: 39,
    attendance: 82,
    comment: "",
    status: "Pending",
  },
  {
    id: 4,
    name: "Fatimah Abdullahi",
    admissionNo: "STU-2026-0074",
    className: "JSS 3B",
    subject: "Mathematics",
    ca: 29,
    exam: 66,
    attendance: 96,
    comment: "Excellent participation and a positive attitude to learning.",
    status: "Completed",
  },
  {
    id: 5,
    name: "Yusuf Ahmed",
    admissionNo: "STU-2026-0088",
    className: "JSS 3B",
    subject: "Mathematics",
    ca: 15,
    exam: 32,
    attendance: 78,
    comment: "",
    status: "Pending",
  },
];

const getTotal = (student) => Number(student.ca) + Number(student.exam);

const getGrade = (total) => {
  if (total >= 70) return { grade: "A", remark: "Excellent" };
  if (total >= 60) return { grade: "B", remark: "Very Good" };
  if (total >= 50) return { grade: "C", remark: "Good" };
  if (total >= 45) return { grade: "D", remark: "Fair" };
  if (total >= 40) return { grade: "E", remark: "Pass" };
  return { grade: "F", remark: "Needs Improvement" };
};

const badgeStyle = {
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Submitted: "bg-blue-50 text-blue-700 border-blue-200",
};

function StatCard({ title, value, detail, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>
          <p className="mt-1 text-xs text-slate-500">{detail}</p>
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
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
        badgeStyle[status] || badgeStyle.Pending
      }`}
    >
      {status}
    </span>
  );
}

export default function TeacherReportCard() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [session, setSession] = useState("2026/2027");
  const [term, setTerm] = useState("First Term");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [comment, setComment] = useState("");
  const [notice, setNotice] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.admissionNo.toLowerCase().includes(search.toLowerCase());

      const matchesClass =
        classFilter === "All" || student.className === classFilter;

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Completed" && student.status === "Completed") ||
        (activeTab === "Pending" && student.status === "Pending");

      return matchesSearch && matchesClass && matchesStatus && matchesTab;
    });
  }, [students, search, classFilter, statusFilter, activeTab]);

  const completed = students.filter(
    (student) => student.status === "Completed"
  ).length;

  const pending = students.length - completed;

  const average =
    students.length > 0
      ? (
          students.reduce((sum, student) => sum + getTotal(student), 0) /
          students.length
        ).toFixed(1)
      : "0.0";

  const openReport = (student) => {
    setSelectedStudent(student);
    setComment(student.comment || "");
    setNotice("");
  };

  const saveReport = (submit = false) => {
    if (!selectedStudent) return;

    setStudents((current) =>
      current.map((student) =>
        student.id === selectedStudent.id
          ? {
              ...student,
              comment,
              status: submit ? "Submitted" : "Completed",
            }
          : student
      )
    );

    setSelectedStudent(null);
    setNotice(
      submit
        ? "Report card submitted for approval."
        : "Report card saved successfully."
    );
  };

  const exportCSV = () => {
    const rows = [
      [
        "Student",
        "Admission Number",
        "Class",
        "CA (30)",
        "Exam (70)",
        "Total (100)",
        "Grade",
        "Attendance (%)",
        "Teacher Comment",
        "Status",
      ],
      ...filteredStudents.map((student) => {
        const total = getTotal(student);
        return [
          student.name,
          student.admissionNo,
          student.className,
          student.ca,
          student.exam,
          total,
          getGrade(total).grade,
          student.attendance,
          student.comment,
          student.status,
        ];
      }),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "teacher-report-cards.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const printReport = (student) => {
    const total = getTotal(student);
    const result = getGrade(total);
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      setNotice("Allow pop-ups in your browser to print report cards.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Report Card - ${student.name}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 32px; color: #172033; }
          h1, h2, p { text-align: center; }
          .meta { margin: 28px 0; line-height: 2; }
          table { width: 100%; border-collapse: collapse; margin-top: 24px; }
          th, td { border: 1px solid #cbd5e1; padding: 12px; text-align: left; }
          .comment { margin-top: 32px; }
          .signatures { display: flex; justify-content: space-between; margin-top: 70px; }
          @media print { body { padding: 8px; } }
        </style>
      </head>
      <body>
        <h1>School Report Card</h1>
        <h2>${term} — ${session}</h2>
        <div class="meta">
          <strong>Student:</strong> ${student.name}<br/>
          <strong>Admission No:</strong> ${student.admissionNo}<br/>
          <strong>Class:</strong> ${student.className}<br/>
          <strong>Attendance:</strong> ${student.attendance}%
        </div>
        <table>
          <thead><tr><th>Subject</th><th>CA / 30</th><th>Exam / 70</th><th>Total / 100</th><th>Grade</th><th>Remark</th></tr></thead>
          <tbody><tr><td>${student.subject}</td><td>${student.ca}</td><td>${student.exam}</td><td>${total}</td><td>${result.grade}</td><td>${result.remark}</td></tr></tbody>
        </table>
        <div class="comment"><strong>Teacher's Comment:</strong><p>${student.comment || "No comment added."}</p></div>
        <div class="signatures"><span>Teacher's Signature: ______________</span><span>Principal's Signature: ______________</span></div>
        <script>window.onload = () => window.print();<\/script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <GraduationCap size={17} />
              <span>Teacher Portal</span>
              <span>/</span>
              <span>Report Cards</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Student Report Cards
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Review student results, add comments, and prepare academic reports.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            <Download size={17} />
            Export Results
          </button>
        </div>

        {notice && (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <span>{notice}</span>
            <button onClick={() => setNotice("")} aria-label="Dismiss message">
              <X size={17} />
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Students"
            value={students.length}
            detail="Students in the sample register"
            icon={Users}
          />
          <StatCard
            title="Completed Reports"
            value={completed}
            detail="Reports marked completed"
            icon={CheckCircle2}
          />
          <StatCard
            title="Pending Reports"
            value={pending}
            detail="Reports requiring attention"
            icon={Clock3}
          />
          <StatCard
            title="Class Average"
            value={`${average}%`}
            detail="Average across displayed sample records"
            icon={Award}
          />
        </div>

        {/* Session settings */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <CalendarDays size={19} className="text-slate-600" />
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

        {/* Student report list */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Academic Performance
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review results and manage individual report cards.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["All", "Completed", "Pending"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium ${
                      activeTab === tab
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search student or admission no."
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
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-9 text-sm outline-none focus:border-slate-400"
                >
                  <option value="All">All Classes</option>
                  <option value="SS 2A">SS 2A</option>
                  <option value="JSS 3B">JSS 3B</option>
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Submitted">Submitted</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Student</th>
                  <th className="px-5 py-4">Class</th>
                  <th className="px-5 py-4">CA / 30</th>
                  <th className="px-5 py-4">Exam / 70</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Grade</th>
                  <th className="px-5 py-4">Attendance</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => {
                  const total = getTotal(student);
                  const result = getGrade(total);

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {student.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {student.admissionNo}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {student.className}
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        {student.ca}
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        {student.exam}
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {total}/100
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 font-bold text-slate-800">
                          {result.grade}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {student.attendance}%
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={student.status} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openReport(student)}
                            title="View and edit report"
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => printReport(student)}
                            title="Print report card"
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                          >
                            <Printer size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      No students match your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-2 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:flex-row">
            <span>
              Showing {filteredStudents.length} of {students.length} students
            </span>
            <span>{term} · {session}</span>
          </div>
        </section>

        {/* Report editor modal */}
        {selectedStudent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 sm:p-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setSelectedStudent(null);
              }
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
                      Student Report Card
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {selectedStudent.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  aria-label="Close report"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5 p-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Admission Number</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {selectedStudent.admissionNo}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Class</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {selectedStudent.className}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-slate-800">
                    <BookOpen size={18} />
                    Academic Result
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full min-w-[420px] text-sm">
                      <thead className="bg-slate-50 text-left text-slate-500">
                        <tr>
                          <th className="px-3 py-3">Subject</th>
                          <th className="px-3 py-3">CA</th>
                          <th className="px-3 py-3">Exam</th>
                          <th className="px-3 py-3">Total</th>
                          <th className="px-3 py-3">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-3 py-4 font-medium">
                            {selectedStudent.subject}
                          </td>
                          <td className="px-3 py-4">{selectedStudent.ca}/30</td>
                          <td className="px-3 py-4">
                            {selectedStudent.exam}/70
                          </td>
                          <td className="px-3 py-4 font-bold">
                            {getTotal(selectedStudent)}/100
                          </td>
                          <td className="px-3 py-4 font-bold">
                            {getGrade(getTotal(selectedStudent)).grade}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Grading shown is a demo scale. Use your school's approved
                    grading system in production.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Performance Remark</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {getGrade(getTotal(selectedStudent)).remark}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Attendance</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {selectedStudent.attendance}%
                    </p>
                  </div>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <MessageSquare size={17} />
                    Teacher's Comment
                  </label>
                  <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    rows={4}
                    placeholder="Write a comment about this student's performance..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-slate-400"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 p-5 sm:flex-row sm:justify-between">
                <button
                  onClick={() => printReport({ ...selectedStudent, comment })}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Printer size={16} />
                  Print Report
                </button>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    onClick={() => saveReport(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <ClipboardCheck size={16} />
                    Save Report
                  </button>
                  <button
                    onClick={() => saveReport(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                  >
                    <Send size={16} />
                    Submit for Approval
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
