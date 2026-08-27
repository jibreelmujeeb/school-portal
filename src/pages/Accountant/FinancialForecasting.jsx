import {
  TrendingUp,
  TrendingDown,
  Wallet,
  AlertTriangle,
  Plus,
  Download,
} from "lucide-react";

export default function AccountantForecastingPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row
        lg:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Financial Forecasting
          </h1>

          <p className="text-gray-500 mt-1">
            Predict future school income, expenses and cash flow.
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
            Generate Forecast

          </button>

        </div>

      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3">

        <select className="border rounded-xl px-4 py-3">
          <option>2026/2027 Session</option>
          <option>2025/2026 Session</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>Next 12 Months</option>
          <option>Next 6 Months</option>
          <option>Next 3 Months</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Departments</option>
          <option>Academic</option>
          <option>Administration</option>
          <option>ICT</option>
          <option>Library</option>
        </select>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          icon={<TrendingUp />}
          value="₦145M"
          label="Forecast Income"
        />

        <StatCard
          icon={<TrendingDown />}
          value="₦98M"
          label="Forecast Expenses"
        />

        <StatCard
          icon={<Wallet />}
          value="₦47M"
          label="Expected Balance"
        />

        <StatCard
          icon={<AlertTriangle />}
          value="₦12.5M"
          label="Expected Debt"
        />

      </div>

      {/* Forecast Chart */}
      <div className="border rounded-3xl p-6">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h2 className="text-xl font-bold">
              Financial Forecast
            </h2>

            <p className="text-sm text-gray-500">
              Actual vs projected financial performance
            </p>
          </div>

          <select className="border rounded-xl px-3 py-2">
            <option>Income</option>
            <option>Expenses</option>
            <option>Cash Flow</option>
          </select>

        </div>

        <div className="h-72 flex items-center justify-center
          border rounded-2xl">

          <p className="text-gray-400">
            Forecast chart goes here
          </p>

        </div>

      </div>

      {/* Scenarios */}
      <div className="border rounded-3xl p-6">

        <h2 className="text-xl font-bold">
          Forecast Scenarios
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          <Scenario
            title="Conservative"
            income="₦130M"
            expenses="₦100M"
            balance="₦30M"
          />

          <Scenario
            title="Expected"
            income="₦145M"
            expenses="₦98M"
            balance="₦47M"
          />

          <Scenario
            title="Optimistic"
            income="₦160M"
            expenses="₦95M"
            balance="₦65M"
          />

        </div>

      </div>

      {/* Forecast Summary */}
      <div className="border rounded-3xl overflow-hidden">

        <div className="p-5 border-b">
          <h2 className="text-xl font-bold">
            Forecast Summary
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead className="border-b">

              <tr>
                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Current
                </th>

                <th className="p-4 text-left">
                  Forecast
                </th>

                <th className="p-4 text-left">
                  Variance
                </th>

                <th className="p-4 text-left">
                  Status
                </th>
              </tr>

            </thead>

            <tbody>

              <ForecastRow
                category="School Fees"
                current="₦99M"
                forecast="₦120M"
                variance="+₦21M"
                status="Positive"
              />

              <ForecastRow
                category="Payroll"
                current="₦35M"
                forecast="₦42M"
                variance="-₦7M"
                status="Warning"
              />

              <ForecastRow
                category="Expenses"
                current="₦74M"
                forecast="₦98M"
                variance="-₦24M"
                status="Warning"
              />

            </tbody>

          </table>

        </div>

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

function Scenario({
  title,
  income,
  expenses,
  balance,
}) {
  return (
    <div className="border rounded-2xl p-5">

      <h3 className="font-bold text-lg">
        {title}
      </h3>

      <div className="mt-4 space-y-3">

        <div className="flex justify-between">
          <span className="text-gray-500">
            Income
          </span>

          <strong>{income}</strong>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Expenses
          </span>

          <strong>{expenses}</strong>
        </div>

        <div className="flex justify-between border-t pt-3">
          <span className="text-gray-500">
            Balance
          </span>

          <strong>{balance}</strong>
        </div>

      </div>

    </div>
  );
}

function ForecastRow({
  category,
  current,
  forecast,
  variance,
  status,
}) {
  return (
    <tr className="border-b">

      <td className="p-4 font-semibold">
        {category}
      </td>

      <td className="p-4">
        {current}
      </td>

      <td className="p-4">
        {forecast}
      </td>

      <td className="p-4">
        {variance}
      </td>

      <td className="p-4">

        <span className={`px-3 py-1 rounded-full text-sm ${
          status === "Positive"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}>
          {status}
        </span>

      </td>

    </tr>
  );
}