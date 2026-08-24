import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Eye,
  Edit,
  Download,
  AlertTriangle,
} from "lucide-react";

export default function AccountantBudgetingPage() {
  const budgets = [
    {
      category: "Staff Salaries",
      department: "Administration",
      budget: 50000000,
      spent: 28000000,
    },
    {
      category: "Learning Materials",
      department: "Academic",
      budget: 20000000,
      spent: 12000000,
    },
    {
      category: "Utilities",
      department: "Administration",
      budget: 15000000,
      spent: 14000000,
    },
    {
      category: "Maintenance",
      department: "Facilities",
      budget: 10000000,
      spent: 12000000,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row
        lg:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Budgeting
          </h1>

          <p className="text-gray-500 mt-1">
            Plan, allocate and monitor school finances.
          </p>
        </div>

        <button className="bg-blue-600 text-white
          px-5 py-3 rounded-xl flex items-center gap-2">

          <Plus size={18} />
          Create Budget

        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          icon={<Wallet />}
          value="₦120M"
          label="Total Budget"
        />

        <StatCard
          icon={<TrendingDown />}
          value="₦68.5M"
          label="Total Spent"
        />

        <StatCard
          icon={<TrendingUp />}
          value="₦51.5M"
          label="Remaining"
        />

        <StatCard
          icon={<AlertTriangle />}
          value="₦2.5M"
          label="Over Budget"
        />

      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3">

        <select className="border rounded-xl px-4 py-3">
          <option>2026/2027 Session</option>
          <option>2025/2026 Session</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Terms</option>
          <option>First Term</option>
          <option>Second Term</option>
          <option>Third Term</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Departments</option>
          <option>Administration</option>
          <option>Academic</option>
          <option>Library</option>
          <option>ICT</option>
        </select>

      </div>

      {/* Search */}
      <div className="border rounded-xl px-4 py-3
        flex items-center">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search budget category..."
          className="w-full ml-3 outline-none"
        />

      </div>

      {/* Budget Table */}
      <div className="border rounded-3xl overflow-hidden
        overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead className="border-b">

            <tr>
              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Department
              </th>

              <th className="p-4 text-left">
                Budget
              </th>

              <th className="p-4 text-left">
                Spent
              </th>

              <th className="p-4 text-left">
                Remaining
              </th>

              <th className="p-4 text-left">
                Utilization
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {budgets.map((item) => (
              <BudgetRow
                key={item.category}
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

function BudgetRow({ item }) {
  const remaining = item.budget - item.spent;

  const percentage = Math.round(
    (item.spent / item.budget) * 100
  );

  const overBudget = percentage > 100;

  return (
    <tr className="border-b">

      <td className="p-4 font-semibold">
        {item.category}
      </td>

      <td className="p-4">
        {item.department}
      </td>

      <td className="p-4">
        ₦{item.budget.toLocaleString()}
      </td>

      <td className="p-4">
        ₦{item.spent.toLocaleString()}
      </td>

      <td className={`p-4 ${
        remaining < 0
          ? "text-red-600"
          : "text-green-600"
      }`}>
        ₦{remaining.toLocaleString()}
      </td>

      <td className="p-4">

        <div className="w-32">

          <div className="text-sm mb-1">
            {percentage}%
          </div>

          <div className="h-2 rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-blue-600"
              style={{
                width: `${Math.min(percentage, 100)}%`,
              }}
            />

          </div>

        </div>

      </td>

      <td className="p-4">

        <span className={`px-3 py-1 rounded-full text-sm ${
          overBudget
            ? "bg-red-100 text-red-700"
            : percentage >= 90
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-700"
        }`}>
          {overBudget
            ? "Over Budget"
            : percentage >= 90
            ? "Warning"
            : "On Track"}
        </span>

      </td>

      <td className="p-4">

        <div className="flex gap-2">

          <button className="border rounded-lg p-2">
            <Eye size={16} />
          </button>

          <button className="border rounded-lg p-2">
            <Edit size={16} />
          </button>

        </div>

      </td>

    </tr>
  );
}