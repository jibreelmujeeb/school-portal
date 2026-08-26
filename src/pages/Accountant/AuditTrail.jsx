import {
  Search,
  Eye,
  Download,
  ShieldCheck,
  AlertTriangle,
  Activity,
  Users,
  FileText,
} from "lucide-react";

export default function AccountantAuditTrailPage() {
  const logs = [
    {
      time: "21:42",
      user: "John Bello",
      action: "Payment Created",
      module: "Payments",
      record: "PAY-82931",
      status: "Success",
    },
    {
      time: "21:35",
      user: "Mary Ali",
      action: "Budget Updated",
      module: "Budgeting",
      record: "BDG-001",
      status: "Success",
    },
    {
      time: "21:20",
      user: "Ahmed Musa",
      action: "Refund Processed",
      module: "Payments",
      record: "PAY-82920",
      status: "Warning",
    },
    {
      time: "20:55",
      user: "John Bello",
      action: "Payroll Approved",
      module: "Payroll",
      record: "PAYROLL-08",
      status: "Success",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row
        lg:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Audit Trail
          </h1>

          <p className="text-gray-500 mt-1">
            Monitor financial activities and system changes.
          </p>
        </div>

        <button className="border rounded-xl px-5 py-3
          flex items-center gap-2">

          <Download size={18} />

          Export

        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          icon={<Activity />}
          value="12,850"
          label="Total Events"
        />

        <StatCard
          icon={<Users />}
          value="18"
          label="Active Users"
        />

        <StatCard
          icon={<FileText />}
          value="8,420"
          label="Changes"
        />

        <StatCard
          icon={<AlertTriangle />}
          value="32"
          label="Alerts"
        />

      </div>

      {/* Search */}
      <div className="flex flex-col lg:flex-row gap-3">

        <div className="border rounded-xl px-4 py-3
          flex items-center flex-1">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search activity, user, record..."
            className="w-full ml-3 outline-none"
          />

        </div>

        <select className="border rounded-xl px-4 py-3">
          <option>All Users</option>
          <option>John Bello</option>
          <option>Mary Ali</option>
          <option>Ahmed Musa</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Modules</option>
          <option>Payments</option>
          <option>Budgeting</option>
          <option>Payroll</option>
          <option>Expenses</option>
          <option>Receipts</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Actions</option>
          <option>Created</option>
          <option>Updated</option>
          <option>Approved</option>
          <option>Refunded</option>
          <option>Deleted</option>
        </select>

      </div>

      {/* Security Banner */}
      <div className="border rounded-2xl p-4 flex gap-3">

        <ShieldCheck />

        <div>
          <p className="font-semibold">
            Audit Protection Active
          </p>

          <p className="text-sm text-gray-500">
            Audit records are protected from modification
            and deletion.
          </p>
        </div>

      </div>

      {/* Table */}
      <div className="border rounded-3xl overflow-hidden
        overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead className="border-b">

            <tr>
              <th className="p-4 text-left">
                Time
              </th>

              <th className="p-4 text-left">
                User
              </th>

              <th className="p-4 text-left">
                Action
              </th>

              <th className="p-4 text-left">
                Module
              </th>

              <th className="p-4 text-left">
                Record
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

            {logs.map((log, index) => (
              <tr
                key={index}
                className="border-b"
              >

                <td className="p-4">
                  {log.time}
                </td>

                <td className="p-4 font-semibold">
                  {log.user}
                </td>

                <td className="p-4">
                  {log.action}
                </td>

                <td className="p-4">
                  {log.module}
                </td>

                <td className="p-4">
                  {log.record}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full
                      text-sm ${
                      log.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {log.status}
                  </span>

                </td>

                <td className="p-4">

                  <button className="border rounded-lg p-2">
                    <Eye size={16} />
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="border rounded-2xl p-5">

      {icon}

      <h2 className="text-2xl font-bold mt-3">
        {value}
      </h2>

      <p className="text-sm text-gray-500">
        {label}
      </p>

    </div>
  );
}