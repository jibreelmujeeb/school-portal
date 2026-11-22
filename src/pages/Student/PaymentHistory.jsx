import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Search,
  Download,
  Printer,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Wallet,
} from "lucide-react";
import jsPDF from "jspdf";
import downloadCsv from "../../utils/downloadCsv";

const payments = [
  {
    id: "PAY-1001",
    feeType: "Tuition Fee",
    session: "2025/2026",
    term: "First Term",
    amount: "₦150,000",
    date: "2026-01-15",
    method: "Bank Transfer",
    status: "Paid",
  },
  {
    id: "PAY-1002",
    feeType: "Library Fee",
    session: "2025/2026",
    term: "First Term",
    amount: "₦5,000",
    date: "2026-01-18",
    method: "Card Payment",
    status: "Paid",
  },
  {
    id: "PAY-1003",
    feeType: "Examination Fee",
    session: "2025/2026",
    term: "Second Term",
    amount: "₦10,000",
    date: "-",
    method: "-",
    status: "Pending",
  },
];

export default function StudentPaymentHistoryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPayments = payments.filter(
    (payment) =>
      (
        payment.feeType.toLowerCase().includes(search.toLowerCase()) ||
        payment.session.toLowerCase().includes(search.toLowerCase()) ||
        payment.status.toLowerCase().includes(search.toLowerCase())
      ) &&
      (statusFilter === "All" || payment.status === statusFilter)
  );

  const downloadPayment = (payment) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Payment Receipt", 20, 20);
    doc.setFontSize(11);
    doc.text(`Receipt: ${payment.id}`, 20, 35);
    doc.text(`Fee: ${payment.feeType}`, 20, 43);
    doc.text(`Session: ${payment.session}`, 20, 51);
    doc.text(`Term: ${payment.term}`, 20, 59);
    doc.text(`Amount: ${payment.amount}`, 20, 67);
    doc.text(`Date: ${payment.date}`, 20, 75);
    doc.text(`Method: ${payment.method}`, 20, 83);
    doc.text(`Status: ${payment.status}`, 20, 91);
    doc.save(`${payment.id}.pdf`);
  };

  const exportPayments = () => downloadCsv("payment-history.csv", [
    ["Receipt", "Fee", "Session", "Term", "Amount", "Date", "Method", "Status"],
    ...filteredPayments.map((payment) => [
      payment.id,
      payment.feeType,
      payment.session,
      payment.term,
      payment.amount,
      payment.date,
      payment.method,
      payment.status,
    ]),
  ]);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Payment History
          </h1>

          <p className="text-gray-500 mt-2">
            View all school fee payments, receipts, and outstanding balances.
          </p>
        </div>

        <button type="button" onClick={exportPayments} disabled={filteredPayments.length === 0} className="flex items-center justify-center gap-2 rounded-xl border border-blue-600 px-4 py-2 text-sm text-blue-600 disabled:opacity-50">
          <Download size={16} /> Export CSV
        </button>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Wallet className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">₦165,000</h2>
          <p>Total Paid</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Clock className="text-orange-600 mb-3"/>
          <h2 className="text-2xl font-bold">₦10,000</h2>
          <p>Outstanding</p>
        </div>

        <div className="border rounded-3xl p-5">
          <CheckCircle className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">2</h2>
          <p>Completed Payments</p>
        </div>

        <div className="border rounded-3xl p-5">
          <AlertCircle className="text-red-600 mb-3"/>
          <h2 className="text-2xl font-bold">1</h2>
          <p>Pending Payments</p>
        </div>

      </div>

      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center border rounded-2xl px-4 py-3">

        <Search className="text-gray-500 mr-3"/>

        <input
          type="text"
          placeholder="Search payments..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full outline-none"
        />

        </div>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-2xl border px-4 py-3 text-sm outline-none"
        >
          <option>All</option>
          <option>Paid</option>
          <option>Pending</option>
        </select>
      </div>

      {/* Payments Table */}
      <div className="border rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-gray-50">

              <tr>
                <th className="text-left p-4">Receipt No.</th>
                <th className="text-left p-4">Fee Type</th>
                <th className="text-left p-4">Session</th>
                <th className="text-left p-4">Term</th>
                <th className="text-left p-4">Amount</th>
                <th className="text-left p-4">Payment Date</th>
                <th className="text-left p-4">Method</th>
                <th className="text-left p-4">Status</th>
                <th className="text-center p-4">Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredPayments.map((payment)=>(
                <tr key={payment.id} className="border-t">

                  <td className="p-4">{payment.id}</td>
                  <td className="p-4">{payment.feeType}</td>
                  <td className="p-4">{payment.session}</td>
                  <td className="p-4">{payment.term}</td>
                  <td className="p-4">{payment.amount}</td>

                  <td className="p-4 flex items-center gap-2">
                    <Calendar size={15}/>
                    {payment.date}
                  </td>

                  <td className="p-4">{payment.method}</td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payment.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button
                        type="button"
                        disabled={payment.status !== "Paid"}
                        onClick={() => downloadPayment(payment)}
                        className="border rounded-lg p-2 disabled:cursor-not-allowed disabled:opacity-40"
                        title="Download payment receipt"
                      >
                        <Download size={16}/>
                      </button>

                      <button
                        type="button"
                        disabled={payment.status !== "Paid"}
                        onClick={() => navigate("/student/payment-receipt", { state: payment })}
                        className="border rounded-lg p-2 disabled:cursor-not-allowed disabled:opacity-40"
                        title="View or print receipt"
                      >
                        <Printer size={16}/>
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Payment Notice */}
      <div className="border border-blue-200 bg-blue-50 rounded-3xl p-6">

        <div className="flex items-start gap-3">

          <CreditCard className="text-blue-600 mt-1"/>

          <div>

            <h3 className="font-semibold">
              Payment Information
            </h3>

            <p className="text-gray-600 mt-2">
              Receipts are available immediately after successful payment.
              If you notice any discrepancies in your payment history,
              please contact the school finance office.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}