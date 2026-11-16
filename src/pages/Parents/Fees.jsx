import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  CheckCircle,
  Clock3,
  Download,
} from "lucide-react";

const payments = [
  {
    term: "1st Term",
    amount: 120000,
    status: "Paid",
    date: "2026-01-15",
  },
  {
    term: "2nd Term",
    amount: 120000,
    status: "Pending",
    date: "2026-05-20",
  },
];

const ParentFeesPage = () => {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const navigate = useNavigate();
  const totalFees = payments.reduce((sum, item) => sum + item.amount, 0);
  const amountPaid = payments
    .filter((item) => item.status === "Paid")
    .reduce((sum, item) => sum + item.amount, 0);
  const outstandingBalance = totalFees - amountPaid;

  const downloadPaymentRecord = (payment) => {
    const contents = [
      "School fee payment record (local demo)",
      `Term: ${payment.term}`,
      `Amount: ${formatCurrency(payment.amount)}`,
      `Status: ${payment.status}`,
      `Date: ${payment.date}`,
    ].join("\r\n");
    const blob = new Blob([contents], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${payment.term.toLowerCase().replace(/\s+/g, "-")}-fee-record.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

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
        <button
          onClick={() => setPaymentDialogOpen(true)}
          disabled={outstandingBalance === 0}
          className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition disabled:cursor-not-allowed disabled:opacity-50"
        >
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
            {formatCurrency(totalFees)}
          </h2>
        </div>

        {/* PAID */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Amount Paid
          </p>

          <h2 className="text-2xl font-semibold mt-2 text-green-600">
            {formatCurrency(amountPaid)}
          </h2>
        </div>

        {/* BALANCE */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Outstanding Balance
          </p>

          <h2 className="text-2xl font-semibold mt-2 text-red-600">
            {formatCurrency(outstandingBalance)}
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
        {payments.map((item) => (
          <div
            key={item.term}
            className="grid md:grid-cols-5 gap-2 p-4 border-b border-gray-100 text-sm items-center"
          >
            <span className="font-medium">
              {item.term}
            </span>

            <span>{formatCurrency(item.amount)}</span>

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
            <button
              onClick={() => downloadPaymentRecord(item)}
              disabled={item.status !== "Paid"}
              className="flex items-center gap-1 text-blue-600 hover:underline disabled:cursor-not-allowed disabled:text-gray-400 disabled:no-underline"
              aria-label={`${item.status === "Paid" ? "Download" : "Unavailable"} ${item.term} fee record`}
            >
              <Download className="w-4 h-4" />
              {item.status === "Paid" ? "Download Record" : "Unavailable"}
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

      {paymentDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-dialog-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2 id="payment-dialog-title" className="text-xl font-semibold">
              Payment is not available
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              This front-end demo does not connect to a payment provider. No payment has been processed.
            </p>
            <p className="mt-4 rounded-xl bg-orange-50 p-4 text-sm text-orange-800">
              Outstanding balance: <span className="font-semibold">{formatCurrency(outstandingBalance)}</span>
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setPaymentDialogOpen(false)}
                className="rounded-xl border px-4 py-2 text-sm"
              >
                Close
              </button>
              <button
                onClick={() => navigate("/parent/payment-history")}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white"
              >
                Payment History
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default ParentFeesPage;