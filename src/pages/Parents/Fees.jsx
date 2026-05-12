import React from "react";
import {
  CreditCard,
  CheckCircle,
  Clock3,
  Download,
} from "lucide-react";

const payments = [
  {
    term: "1st Term",
    amount: "₦120,000",
    status: "Paid",
    date: "2026-01-15",
  },
  {
    term: "2nd Term",
    amount: "₦120,000",
    status: "Pending",
    date: "2026-05-20",
  },
];

const ParentFeesPage = () => {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            School Fees
          </h1>

          <p className="text-sm text-gray-600 mt-2">
            Track payments and fee status
          </p>
        </div>

        {/* PAY BUTTON */}
        <button className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <CreditCard className="w-4 h-4" />
          Make Payment
        </button>

      </section>

      {/* SUMMARY */}
      <section className="grid gap-4 sm:grid-cols-3">

        {/* TOTAL */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Total Fees
          </p>

          <h2 className="text-2xl font-semibold mt-2">
            ₦240,000
          </h2>
        </div>

        {/* PAID */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Amount Paid
          </p>

          <h2 className="text-2xl font-semibold mt-2 text-green-600">
            ₦120,000
          </h2>
        </div>

        {/* BALANCE */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Outstanding Balance
          </p>

          <h2 className="text-2xl font-semibold mt-2 text-red-600">
            ₦120,000
          </h2>
        </div>

      </section>

      {/* PAYMENT HISTORY */}
      <section className="border border-gray-200 rounded-2xl overflow-hidden bg-white">

        {/* HEADER */}
        <div className="hidden md:grid grid-cols-5 p-4 border-b border-gray-200 text-sm text-gray-500">
          <span>Term</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Date</span>
          <span>Receipt</span>
        </div>

        {/* BODY */}
        {payments.map((item, idx) => (
          <div
            key={idx}
            className="grid md:grid-cols-5 gap-2 p-4 border-b border-gray-100 text-sm items-center"
          >
            <span className="font-medium">
              {item.term}
            </span>

            <span>{item.amount}</span>

            {/* STATUS */}
            <div>
              {item.status === "Paid" ? (
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  Paid
                </span>
              ) : (
                <span className="flex items-center gap-1 text-orange-600">
                  <Clock3 className="w-4 h-4" />
                  Pending
                </span>
              )}
            </div>

            <span>{item.date}</span>

            {/* RECEIPT */}
            <button className="flex items-center gap-1 text-blue-600 hover:underline">
              <Download className="w-4 h-4" />
              Receipt
            </button>
          </div>
        ))}

      </section>

      {/* NOTICE */}
      <section className="border border-orange-200 bg-orange-50 rounded-2xl p-4">
        <p className="text-sm text-orange-700">
          Outstanding fees should be paid before the deadline to avoid penalties.
        </p>
      </section>

    </div>
  );
};

export default ParentFeesPage;