import React from "react";
import {
  Wallet,
  CreditCard,
  TrendingUp,
  Receipt,
  Search,
  Download,
} from "lucide-react";

const transactions = [
  {
    id: 1,
    student: "John Doe",
    amount: "₦120,000",
    type: "School Fees",
    date: "2026-05-10",
    status: "Paid",
  },
  {
    id: 2,
    student: "Sarah James",
    amount: "₦80,000",
    type: "Exam Fees",
    date: "2026-05-12",
    status: "Pending",
  },
  {
    id: 3,
    student: "Michael Ade",
    amount: "₦100,000",
    type: "School Fees",
    date: "2026-05-15",
    status: "Paid",
  },
];

const AdminRevenuePage = () => {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Revenue Management
          </h1>

          <p className="text-sm text-gray-600 mt-2">
            Monitor school income and financial transactions
          </p>
        </div>

        {/* EXPORT */}
        <button className="flex items-center justify-center gap-2 px-5 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Download className="w-4 h-4" />
          Export Report
        </button>

      </section>

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL REVENUE */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Wallet className="w-4 h-4 text-blue-600" />
            Total Revenue
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            ₦12.5M
          </h2>

        </div>

        {/* TOTAL PAYMENTS */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <CreditCard className="w-4 h-4 text-green-600" />
            Payments
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            320
          </h2>

        </div>

        {/* MONTHLY GROWTH */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            Monthly Growth
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            +18%
          </h2>

        </div>

        {/* PENDING PAYMENTS */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Receipt className="w-4 h-4 text-orange-600" />
            Pending
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            ₦2.1M
          </h2>

        </div>

      </section>

      {/* SEARCH */}
      <section>

        <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 bg-white">

          <Search className="w-4 h-4 text-gray-500 mr-2" />

          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full outline-none text-sm bg-transparent"
          />

        </div>

      </section>

      {/* TRANSACTIONS */}
      <section className="space-y-4">

        {transactions.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-2xl p-5 bg-white"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

              {/* LEFT */}
              <div className="space-y-3">

                <h2 className="font-semibold text-lg">
                  {item.student}
                </h2>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">

                  <span>
                    {item.type}
                  </span>

                  <span>
                    {item.date}
                  </span>

                </div>

              </div>

              {/* RIGHT */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                {/* AMOUNT */}
                <div className="text-lg font-semibold">
                  {item.amount}
                </div>

                {/* STATUS */}
                <div
                  className={`px-4 py-2 rounded-full text-sm border ${
                    item.status === "Paid"
                      ? "border-green-200 bg-green-50 text-green-600"
                      : "border-orange-200 bg-orange-50 text-orange-600"
                  }`}
                >
                  {item.status}
                </div>

              </div>

            </div>
          </div>
        ))}

      </section>

      {/* EMPTY STATE */}
      {transactions.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No transactions available.
        </div>
      )}

    </div>
  );
};

export default AdminRevenuePage;