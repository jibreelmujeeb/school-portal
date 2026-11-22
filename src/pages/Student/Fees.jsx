import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  CheckCircle,
  AlertCircle,
  Receipt,
  ArrowRight,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

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
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("40000");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [notice, setNotice] = useState("");
  const [fees, setFees, feesError] = usePersistentState("student-fees-balance", {
    total: 120000,
    paid: 80000,
  });
  const balance = useMemo(() => Math.max(0, fees.total - fees.paid), [fees]);

  const submitPayment = (event) => {
    event.preventDefault();
    const amount = Number(paymentAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setNotice("Enter a valid payment amount.");
      return;
    }
    if (amount > balance) {
      setNotice("Payment amount cannot exceed the outstanding balance.");
      return;
    }
    setFees((current) => ({ ...current, paid: current.paid + amount }));
    setNotice(`₦${amount.toLocaleString()} payment recorded via ${paymentMethod}.`);
    setShowPayment(false);
  };

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
            <h2 className="text-lg font-semibold">₦{fees.total.toLocaleString()}</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Paid</p>
            <h2 className="text-lg font-semibold">₦{fees.paid.toLocaleString()}</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-sm text-gray-500">Balance</p>
            <h2 className="text-lg font-semibold">₦{balance.toLocaleString()}</h2>
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
        {notice && <p className="mr-auto rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{notice}</p>}
        {feesError && <p className="mr-auto text-sm text-red-600">{feesError}</p>}
        <button
          type="button"
          onClick={() => balance > 0 ? setShowPayment(true) : navigate("/student/payment-history")}
          className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
        >
          {balance > 0 ? "Pay Now" : "View Payments"} <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={submitPayment} className="w-full max-w-md rounded-2xl bg-white p-6">
            <h2 className="text-lg font-semibold">Make a Fee Payment</h2>
            <p className="mt-1 text-sm text-gray-500">Outstanding balance: ₦{balance.toLocaleString()}</p>
            <label className="mt-5 block text-sm">
              Amount
              <input
                type="number"
                min="1"
                max={balance}
                value={paymentAmount}
                onChange={(event) => setPaymentAmount(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-3 outline-none"
              />
            </label>
            <label className="mt-4 block text-sm">
              Payment method
              <select
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-3 outline-none"
              >
                <option>Bank Transfer</option>
                <option>Card Payment</option>
              </select>
            </label>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setShowPayment(false)} className="rounded-xl border border-gray-300 px-4 py-2 text-sm">Cancel</button>
              <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white">Confirm Payment</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default StudentFees;