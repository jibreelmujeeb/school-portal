import React from "react";
import {
  Wallet,
  CheckCircle,
  AlertCircle,
  Receipt,
  ArrowRight,
} from "lucide-react";

const paymentHistory = [
  {
    date: "2026-03-01",
    amount: "₦50,000",
    status: "Paid",
  },
  {
    date: "2026-02-01",
    amount: "₦30,000",
    status: "Paid",
  },
];

const StudentFees = () => {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Fees & Payments
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Track and manage your school fees
        </p>
      </section>

      {/* SUMMARY */}
      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        
        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <Wallet className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Total Fees</p>
            <h2 className="text-lg font-semibold">₦120,000</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Paid</p>
            <h2 className="text-lg font-semibold">₦80,000</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-sm text-gray-500">Balance</p>
            <h2 className="text-lg font-semibold">₦40,000</h2>
          </div>
        </div>

      </section>

      {/* FEE BREAKDOWN */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Fee Breakdown
        </h2>

        <div className="border border-gray-200 rounded-2xl bg-white divide-y">
          {[
            { item: "Tuition Fee", amount: "₦80,000" },
            { item: "Library Fee", amount: "₦10,000" },
            { item: "Lab Fee", amount: "₦20,000" },
            { item: "Sports Fee", amount: "₦10,000" },
          ].map((fee, idx) => (
            <div
              key={idx}
              className="p-4 flex justify-between text-sm"
            >
              <span className="text-gray-600">{fee.item}</span>
              <span className="font-medium">{fee.amount}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PAYMENT HISTORY */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Payment History
        </h2>

        <div className="border border-gray-200 rounded-2xl bg-white divide-y">
          {paymentHistory.map((item, idx) => (
            <div
              key={idx}
              className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Receipt className="w-4 h-4" />
                {item.date}
              </div>

              <div className="text-sm font-medium">
                {item.amount}
              </div>

              <div className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PAY BUTTON */}
      <section className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          Pay Now <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
};

export default StudentFees;