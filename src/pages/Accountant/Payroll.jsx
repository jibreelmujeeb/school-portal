import {
  Users,
  Wallet,
  TrendingUp,
  Receipt,
  Plus,
  Search,
  Eye,
  Download,
} from "lucide-react";

export default function AccountantPayrollPage() {
  const payroll = [
    {
      name: "John Bello",
      id: "STF-001",
      department: "Academic",
      gross: 250000,
      deductions: 35000,
      net: 215000,
      status: "Paid",
    },
    {
      name: "Mary Ali",
      id: "STF-002",
      department: "Administration",
      gross: 300000,
      deductions: 42000,
      net: 258000,
      status: "Paid",
    },
    {
      name: "David Musa",
      id: "STF-003",
      department: "ICT",
      gross: 220000,
      deductions: 30000,
      net: 190000,
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row
        lg:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Payroll
          </h1>

          <p className="text-gray-500 mt-1">
            Manage staff salaries and monthly payroll.
          </p>
        </div>

        <div className="flex gap-3">

          <button className="border rounded-xl px-5 py-3
            flex items-center gap-2">
            <Download size={18} />
            Export
          </button>

          <button className="bg-blue-600 text-white
            rounded-xl px-5 py-3 flex items-center gap-2">
            <Plus size={18} />
            Create Payroll
          </button>

        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          icon={<Users />}
          value="245"
          label="Staff"
        />

        <StatCard
          icon={<Wallet />}
          value="₦38.5M"
          label="Gross Payroll"
        />

        <StatCard
          icon={<TrendingUp />}
          value="₦35.4M"
          label="Net Payroll"
        />

        <StatCard
          icon={<Receipt />}
          value="₦7.3M"
          label="Deductions"
        />

      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3">

        <select className="border rounded-xl px-4 py-3">
          <option>August 2026</option>
          <option>July 2026</option>
          <option>June 2026</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Departments</option>
          <option>Academic</option>
          <option>Administration</option>
          <option>ICT</option>
          <option>Library</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Status</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>

      </div>

      {/* Search */}
      <div className="border rounded-xl px-4 py-3
        flex items-center">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search staff..."
          className="w-full ml-3 outline-none"
        />

      </div>

      {/* Payroll Table */}
      <div className="border rounded-3xl overflow-hidden
        overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead className="border-b">
            <tr>
              <th className="p-4 text-left">Staff</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Gross</th>
              <th className="p-4 text-left">Deductions</th>
              <th className="p-4 text-left">Net Pay</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {payroll.map((item) => (
              <PayrollRow
                key={item.id}
                item={item}
              />
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

function PayrollRow({ item }) {
  return (
    <tr className="border-b">

      <td className="p-4">

        <p className="font-semibold">
          {item.name}
        </p>

        <p className="text-xs text-gray-500">
          {item.id}
        </p>

      </td>

      <td className="p-4">
        {item.department}
      </td>

      <td className="p-4">
        ₦{item.gross.toLocaleString()}
      </td>

      <td className="p-4 text-red-600">
        ₦{item.deductions.toLocaleString()}
      </td>

      <td className="p-4 font-semibold">
        ₦{item.net.toLocaleString()}
      </td>

      <td className="p-4">

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            item.status === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {item.status}
        </span>

      </td>

      <td className="p-4">

        <div className="flex gap-2">

          <button className="border rounded-lg p-2">
            <Eye size={16} />
          </button>

          <button className="border rounded-lg p-2">
            <Download size={16} />
          </button>

        </div>

      </td>

    </tr>
  );
}