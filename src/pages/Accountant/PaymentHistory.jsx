import {
  Search,
  Eye,
  Printer,
  Download,
  Receipt,
  CheckCircle,
  Clock,
  XCircle,
  RotateCcw,
} from "lucide-react";

export default function AccountantPaymentHistoryPage() {
  const payments = [
    {
      date: "23 Aug 2026",
      student: "John Doe",
      studentId: "STU-2026-00125",
      type: "School Fees",
      amount: "₦150,000",
      method: "Online",
      reference: "PAY-82931",
      status: "Successful",
    },
    {
      date: "22 Aug 2026",
      student: "Mary Ali",
      studentId: "STU-2026-00126",
      type: "Examination",
      amount: "₦25,000",
      method: "Cash",
      reference: "PAY-82930",
      status: "Successful",
    },
    {
      date: "21 Aug 2026",
      student: "David Bello",
      studentId: "STU-2026-00127",
      type: "Transport",
      amount: "₦40,000",
      method: "Transfer",
      reference: "PAY-82929",
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
            Payment History
          </h1>

          <p className="text-gray-500 mt-1">
            View and manage all school payment transactions.
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
          icon={<Receipt />}
          value="₦85.42M"
          label="Total Payments"
        />

        <StatCard
          icon={<CheckCircle />}
          value="₦82.85M"
          label="Successful"
        />

        <StatCard
          icon={<Clock />}
          value="₦1.45M"
          label="Pending"
        />

        <StatCard
          icon={<XCircle />}
          value="₦1.12M"
          label="Failed"
        />

      </div>

      {/* Search and Filters */}
      <div className="flex flex-col xl:flex-row gap-3">

        <div className="border rounded-xl px-4 py-3
          flex items-center flex-1">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search student, receipt or reference..."
            className="w-full ml-3 outline-none"
          />

        </div>

        <input
          type="date"
          className="border rounded-xl px-4 py-3"
        />

        <select className="border rounded-xl px-4 py-3">
          <option>All Payment Types</option>
          <option>School Fees</option>
          <option>Admission</option>
          <option>Examination</option>
          <option>Transport</option>
          <option>Library</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Methods</option>
          <option>Online</option>
          <option>Cash</option>
          <option>Transfer</option>
          <option>POS</option>
        </select>

      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto">

        {[
          "All",
          "Successful",
          "Pending",
          "Failed",
          "Refunded",
        ].map((tab, index) => (
          <button
            key={tab}
            className={`px-5 py-2 rounded-xl
              whitespace-nowrap ${
                index === 0
                  ? "bg-blue-600 text-white"
                  : "border"
              }`}
          >
            {tab}
          </button>
        ))}

      </div>

      {/* Payment Table */}
      <div className="border rounded-3xl overflow-hidden
        overflow-x-auto">

        <table className="w-full min-w-[1100px]">

          <thead className="border-b">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Payment Type</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Method</th>
              <th className="p-4 text-left">Reference</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <PaymentRow
                key={payment.reference}
                payment={payment}
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

function PaymentRow({ payment }) {
  return (
    <tr className="border-b">

      <td className="p-4">
        {payment.date}
      </td>

      <td className="p-4">
        <p className="font-semibold">
          {payment.student}
        </p>

        <p className="text-xs text-gray-500">
          {payment.studentId}
        </p>
      </td>

      <td className="p-4">
        {payment.type}
      </td>

      <td className="p-4 font-semibold">
        {payment.amount}
      </td>

      <td className="p-4">
        {payment.method}
      </td>

      <td className="p-4 text-sm">
        {payment.reference}
      </td>

      <td className="p-4">

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            payment.status === "Successful"
              ? "bg-green-100 text-green-700"
              : payment.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {payment.status}
        </span>

      </td>

      <td className="p-4">

        <div className="flex gap-2">

          <button className="border rounded-lg p-2">
            <Eye size={16} />
          </button>

          <button className="border rounded-lg p-2">
            <Printer size={16} />
          </button>

          <button className="border rounded-lg p-2">
            <Download size={16} />
          </button>

          {payment.status === "Successful" && (
            <button className="border rounded-lg p-2">
              <RotateCcw size={16} />
            </button>
          )}

        </div>

      </td>

    </tr>
  );
}