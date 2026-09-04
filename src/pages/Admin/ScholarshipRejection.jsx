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

const applications = [
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

function AdminScholarshipRejection() {
  const [selected, setSelected] = useState(null);
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");
  const [notifyStudent, setNotifyStudent] = useState(true);
  const [notifyParent, setNotifyParent] = useState(true);

  const handleReject = async () => {
    if (!reason || !remarks.trim()) {
      alert("Please provide a rejection reason and remarks.");
      return;
    }

    const confirmed = window.confirm(
      `Reject scholarship application ${selected.id}?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/admin/scholarships/applications/${selected.id}/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            reason,
            remarks,
            notifyStudent,
            notifyParent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reject application");
      }

      alert("Scholarship application rejected successfully.");

      setSelected(null);
      setReason("");
      setRemarks("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Scholarship Rejection
          </h1>

          <p className="text-sm text-gray-500">
            Review and reject scholarship applications
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium">
          <FileText size={18} />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<FileText />}
          title="Total Applications"
          value="185"
        />

        <StatCard
          icon={<AlertTriangle />}
          title="Pending Review"
          value="32"
        />

        <StatCard
          icon={<XCircle />}
          title="Rejected"
          value="25"
        />

        <StatCard
          icon={<Bell />}
          title="This Month"
          value="8"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search student or application..."
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 outline-none focus:border-blue-500"
            />
          </div>

          <select className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none">
            <option>All Status</option>
            <option>Pending</option>
            <option>Under Review</option>
            <option>Rejected</option>
          </select>
        </div>

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
              {applications.map((application) => (
                <tr key={application.id}>
                  <td className="px-5 py-4 font-medium">
                    {application.id}
                  </td>

                  <td className="px-5 py-4">
                    {application.student}
                  </td>

                  <td className="px-5 py-4">
                    {application.className}
                  </td>

                  <td className="px-5 py-4">
                    {application.scholarship}
                  </td>

                  <td className="px-5 py-4">
                    ₦{application.amount.toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
                      {application.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelected(application)}
                      className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      <Eye size={16} />
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2 className="text-lg font-bold">
                  Reject Scholarship
                </h2>

                <p className="text-sm text-gray-500">
                  {selected.id} · {selected.student}
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              {/* Student */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Info
                  icon={<User size={18} />}
                  label="Student"
                  value={selected.student}
                />

                <Info
                  icon={<GraduationCap size={18} />}
                  label="Class"
                  value={selected.className}
                />
              </div>

              {/* Reason */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Rejection Reason *
                </label>

                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Select reason</option>

                  {rejectionReasons.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Remarks */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Administrative Remarks *
                </label>

                <textarea
                  rows="5"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Explain why the scholarship application is being rejected..."
                  className="w-full resize-none rounded-xl border border-gray-200 p-4 outline-none focus:border-blue-500"
                />
              </div>

              {/* Notifications */}
              <div className="rounded-xl border border-gray-200 p-4">
                <h3 className="mb-3 font-medium">
                  Notification
                </h3>

                <label className="mb-3 flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={notifyStudent}
                    onChange={(e) =>
                      setNotifyStudent(e.target.checked)
                    }
                  />
                  Notify student
                </label>

                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={notifyParent}
                    onChange={(e) =>
                      setNotifyParent(e.target.checked)
                    }
                  />
                  Notify parent/guardian
                </label>
              </div>

              {/* Warning */}
              <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertTriangle size={20} className="shrink-0" />

                <p>
                  Rejecting this application will permanently change
                  its status to <strong>Rejected</strong> and create
                  an audit record.
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 font-medium"
                >
                  Cancel
                </button>

                <button
                  onClick={handleReject}
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white"
                >
                  <XCircle size={18} />
                  Reject Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
        {icon}
      </div>

      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="mt-1 text-2xl font-bold">{value}</h2>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="mb-2 flex items-center gap-2 text-gray-500">
        {icon}
        <span className="text-xs">{label}</span>
      </div>

      <p className="font-semibold">{value}</p>
    </div>
  );
}

export default AdminScholarshipRejection;