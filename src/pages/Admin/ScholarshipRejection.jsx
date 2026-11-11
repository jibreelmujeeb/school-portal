import { useState } from "react";
import {
  Search,
  Eye,
  XCircle,
  AlertTriangle,
  FileText,
  Bell,
  User,
  GraduationCap,
} from "lucide-react";

const initialApplications = [
  {
    id: "SCH-0012",
    student: "Aisha Bello",
    className: "SS 2A",
    scholarship: "Need-Based",
    amount: 250000,
    status: "Pending",
  },
  {
    id: "SCH-0013",
    student: "John Peter",
    className: "JSS 3B",
    scholarship: "Merit",
    amount: 150000,
    status: "Pending",
  },
];

const rejectionReasons = [
  "Does not meet academic requirements",
  "Does not meet financial eligibility",
  "Incomplete application",
  "Invalid supporting documents",
  "Scholarship quota reached",
  "Student already has another scholarship",
  "Application submitted late",
  "Other",
];

export default function AdminScholarshipRejection() {
  const [applications, setApplications] = useState(initialApplications);
  const [selected, setSelected] = useState(null);
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");
  const [notifyStudent, setNotifyStudent] = useState(true);
  const [notifyParent, setNotifyParent] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [notice, setNotice] = useState("");

  const filteredApplications = applications.filter((application) =>
    [application.id, application.student, application.className, application.scholarship]
      .some((value) => value.toLowerCase().includes(search.trim().toLowerCase())) &&
    (statusFilter === "All Status" || application.status === statusFilter)
  );

  const closeReview = () => {
    setSelected(null);
    setReason("");
    setRemarks("");
  };

  const handleReject = (event) => {
    event.preventDefault();
    if (!reason || !remarks.trim()) return;
    if (!window.confirm(`Reject scholarship application ${selected.id}?`)) return;

    setApplications((current) => current.map((application) =>
      application.id === selected.id
        ? {
            ...application,
            status: "Rejected",
            rejectionReason: reason,
            remarks: remarks.trim(),
            notifyStudent,
            notifyParent,
          }
        : application
    ));
    setNotice(`Application ${selected.id} marked rejected locally. No notifications were sent.`);
    closeReview();
  };

  const exportCSV = () => {
    const rows = [
      ["Application", "Student", "Class", "Scholarship", "Amount", "Status", "Rejection Reason", "Remarks"],
      ...filteredApplications.map((application) => [
        application.id, application.student, application.className,
        application.scholarship, application.amount, application.status,
        application.rejectionReason || "", application.remarks || "",
      ]),
    ];
    const csv = rows.map((row) =>
      row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
    ).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "scholarship-applications.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scholarship Rejection</h1>
          <p className="text-sm text-gray-500">Review and reject scholarship applications</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium">
          <FileText size={18} /> Export
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<FileText />} title="Applications" value={applications.length} />
        <StatCard icon={<AlertTriangle />} title="Pending Review" value={applications.filter((item) => item.status === "Pending" || item.status === "Under Review").length} />
        <StatCard icon={<XCircle />} title="Rejected" value={applications.filter((item) => item.status === "Rejected").length} />
        <StatCard icon={<Bell />} title="Reviewed with Remarks" value={applications.filter((item) => Boolean(item.remarks)).length} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 md:flex-row">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search student or application..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 outline-none focus:border-blue-500"
            />
          </div>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none">
            <option>All Status</option>
            <option>Pending</option>
            <option>Under Review</option>
            <option>Rejected</option>
          </select>
        </div>

        {notice && <p role="status" className="border-b border-gray-200 bg-green-50 px-4 py-3 text-sm text-green-800">{notice}</p>}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="bg-gray-50 text-sm text-gray-500">
              <tr>
                <th className="px-5 py-4">Application</th>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Class</th>
                <th className="px-5 py-4">Scholarship</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td className="px-5 py-4 font-medium">{application.id}</td>
                  <td className="px-5 py-4">{application.student}</td>
                  <td className="px-5 py-4">{application.className}</td>
                  <td className="px-5 py-4">{application.scholarship}</td>
                  <td className="px-5 py-4">₦{application.amount.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${application.status === "Rejected" ? "bg-red-50 text-red-700" : "bg-yellow-50 text-yellow-700"}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      disabled={application.status === "Rejected"}
                      onClick={() => setSelected(application)}
                      className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Eye size={16} /> {application.status === "Rejected" ? "Rejected" : "Review"}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredApplications.length === 0 && <tr><td colSpan={7} className="px-5 py-8 text-center text-gray-500">No applications match your search or filter.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={handleReject} className="max-h-[90vh] w-full max-w-2xl space-y-5 overflow-y-auto rounded-2xl bg-white p-5">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-lg font-bold">Reject Scholarship</h2>
                <p className="text-sm text-gray-500">{selected.id} · {selected.student}</p>
              </div>
              <button type="button" onClick={closeReview} className="rounded-lg p-2 hover:bg-gray-100" aria-label="Close review"><XCircle size={20} /></button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Info icon={<User size={18} />} label="Student" value={selected.student} />
              <Info icon={<GraduationCap size={18} />} label="Class" value={selected.className} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Rejection Reason *</label>
              <select required value={reason} onChange={(event) => setReason(event.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3">
                <option value="">Select reason</option>
                {rejectionReasons.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Administrative Remarks *</label>
              <textarea required rows={4} value={remarks} onChange={(event) => setRemarks(event.target.value)} placeholder="Explain why the application is being rejected..." className="w-full rounded-xl border border-gray-200 p-4" />
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <h3 className="mb-3 font-medium">Notification preferences (not sent in this demo)</h3>
              <label className="mb-3 flex items-center gap-3 text-sm">
                <input type="checkbox" checked={notifyStudent} onChange={(event) => setNotifyStudent(event.target.checked)} />
                Notify student
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" checked={notifyParent} onChange={(event) => setNotifyParent(event.target.checked)} />
                Notify parent/guardian
              </label>
            </div>

            <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <AlertTriangle size={20} className="shrink-0" />
              <p>This changes the sample application status in this page only. No external notification or audit record is created.</p>
            </div>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={closeReview} className="rounded-xl border border-gray-200 px-5 py-2.5 font-medium">Cancel</button>
              <button type="submit" className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white">
                <XCircle size={18} /> Reject Application
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">{icon}</div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="mt-1 text-2xl font-bold">{value}</h2>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="mb-2 flex items-center gap-2 text-gray-500">{icon}<span className="text-xs">{label}</span></div>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
