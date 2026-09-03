import {
  GraduationCap,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Eye,
  Download,
  MoreVertical,
} from "lucide-react";

const applications = [
  {
    id: "SCH-2026-001",
    student: "Ahmed Musa",
    className: "SS 2",
    type: "Merit",
    amount: "₦250,000",
    status: "Pending",
    date: "Sep 01, 2026",
  },
  {
    id: "SCH-2026-002",
    student: "Fatima Bello",
    className: "JSS 3",
    type: "Need-Based",
    amount: "₦180,000",
    status: "Pending",
    date: "Sep 01, 2026",
  },
  {
    id: "SCH-2026-003",
    student: "John Peter",
    className: "SS 1",
    type: "Sports",
    amount: "₦150,000",
    status: "Approved",
    date: "Aug 30, 2026",
  },
];

export default function AdminScholarshipApprovalPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row
        lg:items-center lg:justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Scholarship Approval
          </h1>

          <p className="mt-1 text-gray-500">
            Review and approve student scholarship
            applications.
          </p>
        </div>

        <button className="flex items-center gap-2
          rounded-xl border px-5 py-3">

          <Download size={18} />

          Export

        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        <StatCard
          icon={<GraduationCap />}
          value="185"
          label="Total Applications"
        />

        <StatCard
          icon={<Clock />}
          value="32"
          label="Pending"
        />

        <StatCard
          icon={<CheckCircle />}
          value="128"
          label="Approved"
        />

        <StatCard
          icon={<XCircle />}
          value="25"
          label="Rejected"
        />

      </div>

      {/* Filters */}
      <div className="rounded-2xl border p-4">

        <div className="grid gap-3 md:grid-cols-4">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3"
            />

            <input
              placeholder="Search student..."
              className="w-full rounded-xl border
                py-3 pl-10 pr-4 outline-none"
            />

          </div>

          <select className="rounded-xl border px-4 py-3">
            <option>All Status</option>
            <option>Pending</option>
            <option>Under Review</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>

          <select className="rounded-xl border px-4 py-3">
            <option>All Scholarships</option>
            <option>Merit</option>
            <option>Need-Based</option>
            <option>Sports</option>
          </select>

          <select className="rounded-xl border px-4 py-3">
            <option>2026/2027</option>
            <option>2025/2026</option>
          </select>

        </div>

      </div>

      {/* Applications */}
      <div className="overflow-hidden rounded-3xl border">

        <div className="border-b p-5">
          <h2 className="text-xl font-bold">
            Scholarship Applications
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px]">

            <thead className="border-b">

              <tr>
                <th className="p-4 text-left">
                  Application
                </th>

                <th className="p-4 text-left">
                  Student
                </th>

                <th className="p-4 text-left">
                  Class
                </th>

                <th className="p-4 text-left">
                  Scholarship
                </th>

                <th className="p-4 text-left">
                  Requested
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

              {applications.map((application) => (

                <tr
                  key={application.id}
                  className="border-b last:border-0"
                >

                  <td className="p-4 font-medium">
                    {application.id}
                  </td>

                  <td className="p-4">
                    {application.student}
                  </td>

                  <td className="p-4">
                    {application.className}
                  </td>

                  <td className="p-4">
                    {application.type}
                  </td>

                  <td className="p-4 font-medium">
                    {application.amount}
                  </td>

                  <td className="p-4">
                    <StatusBadge
                      status={application.status}
                    />
                  </td>

                  <td className="p-4">

                    <div className="flex gap-2">

                      <button
                        className="rounded-lg border p-2"
                        title="Review"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        className="rounded-lg border p-2"
                        title="More"
                      >
                        <MoreVertical size={16} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="rounded-2xl border p-5">

      {icon}

      <h2 className="mt-3 text-2xl font-bold">
        {value}
      </h2>

      <p className="text-sm text-gray-500">
        {label}
      </p>

    </div>
  );
}

function StatusBadge({ status }) {

  const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    "Under Review": "bg-blue-100 text-blue-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm
        ${styles[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
}