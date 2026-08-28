import {
  Building2,
  CheckCircle,
  AlertTriangle,
  Wallet,
  Upload,
  Search,
  Eye,
  Download,
} from "lucide-react";

export default function AccountantBankReconciliationPage() {
  const transactions = [
    {
      date: "25 Aug 2026",
      description: "School Fee Payment",
      reference: "PAY-82931",
      bankAmount: 150000,
      bookAmount: 150000,
      status: "Matched",
    },
    {
      date: "25 Aug 2026",
      description: "Bank Transfer",
      reference: "TRF-1829",
      bankAmount: 500000,
      bookAmount: 0,
      status: "Unmatched",
    },
    {
      date: "24 Aug 2026",
      description: "Payment",
      reference: "PAY-82912",
      bankAmount: 10000,
      bookAmount: 10000,
      status: "Matched",
    },
    {
      date: "23 Aug 2026",
      description: "Bank Charge",
      reference: "-",
      bankAmount: 5000,
      bookAmount: 0,
      status: "Unmatched",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row
        lg:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Bank Reconciliation
          </h1>

          <p className="text-gray-500 mt-1">
            Compare bank transactions with school records.
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

            <Upload size={18} />
            Import Statement

          </button>

        </div>

      </div>

      {/* Account */}
      <div className="border rounded-2xl p-5
        flex flex-col lg:flex-row
        lg:items-center justify-between gap-4">

        <div className="flex items-center gap-4">

          <div className="p-3 border rounded-xl">
            <Building2 size={24} />
          </div>

          <div>
            <h2 className="font-bold">
              School Main Account
            </h2>

            <p className="text-sm text-gray-500">
              Example Bank •••• 4521
            </p>
          </div>

        </div>

        <div>
          <p className="text-sm text-gray-500">
            Current Balance
          </p>

          <p className="text-2xl font-bold">
            ₦85,400,000
          </p>
        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          icon={<Building2 />}
          value="₦85.4M"
          label="Bank Balance"
        />

        <StatCard
          icon={<Wallet />}
          value="₦84.95M"
          label="Book Balance"
        />

        <StatCard
          icon={<CheckCircle />}
          value="1,248"
          label="Matched"
        />

        <StatCard
          icon={<AlertTriangle />}
          value="37"
          label="Unmatched"
        />

      </div>

      {/* Difference */}
      <div className="border rounded-2xl p-5">

        <div className="flex items-center gap-3">

          <AlertTriangle />

          <div>
            <h2 className="font-bold">
              Reconciliation Difference
            </h2>

            <p className="text-sm text-gray-500">
              Bank and book balances do not currently match.
            </p>
          </div>

        </div>

        <div className="mt-5 text-3xl font-bold">
          ₦450,000
        </div>

      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3">

        <div className="border rounded-xl px-4 py-3
          flex items-center flex-1">

          <Search size={18} />

          <input
            placeholder="Search transaction..."
            className="w-full ml-3 outline-none"
          />

        </div>

        <select className="border rounded-xl px-4 py-3">
          <option>All Transactions</option>
          <option>Matched</option>
          <option>Unmatched</option>
          <option>Bank Charges</option>
        </select>

        <input
          type="date"
          className="border rounded-xl px-4 py-3"
        />

      </div>

      {/* Table */}
      <div className="border rounded-3xl overflow-hidden
        overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead className="border-b">

            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Reference</th>
              <th className="p-4 text-left">Bank Amount</th>
              <th className="p-4 text-left">Book Amount</th>
              <th className="p-4 text-left">Difference</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>

          </thead>

          <tbody>

            {transactions.map((transaction) => {

              const difference =
                transaction.bankAmount -
                transaction.bookAmount;

              return (
                <tr
                  key={transaction.reference}
                  className="border-b"
                >

                  <td className="p-4">
                    {transaction.date}
                  </td>

                  <td className="p-4 font-medium">
                    {transaction.description}
                  </td>

                  <td className="p-4">
                    {transaction.reference}
                  </td>

                  <td className="p-4">
                    ₦{transaction.bankAmount.toLocaleString()}
                  </td>

                  <td className="p-4">
                    ₦{transaction.bookAmount.toLocaleString()}
                  </td>

                  <td className={`p-4 ${
                    difference === 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                    ₦{Math.abs(difference).toLocaleString()}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1
                        rounded-full text-sm ${
                        transaction.status === "Matched"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {transaction.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <button className="border rounded-lg p-2">
                      <Eye size={16} />
                    </button>

                  </td>

                </tr>
              );
            })}

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