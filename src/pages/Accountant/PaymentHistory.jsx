import React, { useMemo, useState } from "react";
import {
  Search,
  Eye,
  Printer,
  Download,
  Receipt,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import { formatNaira, initialPayments } from "../../data/accountantData";
import downloadCsv from "../../utils/downloadCsv";

export default function AccountantPaymentHistoryPage() {
  const [payments, , storageError] = usePersistentState(
    "accountant-payments",
    initialPayments
  );
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return payments.filter((payment) => {
      const matchesSearch = [
        payment.student,
        payment.admissionNo,
        payment.reference,
        payment.feeType,
      ].some((value) => value.toLowerCase().includes(query));
      const displayStatus = payment.status === "Verified"
        ? "Successful"
        : payment.status === "Rejected"
        ? "Failed"
        : payment.status;
      return matchesSearch &&
        (!dateFilter || payment.date === dateFilter) &&
        (typeFilter === "All" || payment.feeType === typeFilter) &&
        (methodFilter === "All" || payment.method === methodFilter) &&
        (statusFilter === "All" || displayStatus === statusFilter);
    });
  }, [payments, search, dateFilter, typeFilter, methodFilter, statusFilter]);

  const totals = payments.reduce((result, payment) => {
    const key = payment.status === "Verified"
      ? "Successful"
      : payment.status === "Rejected"
      ? "Failed"
      : "Pending";
    result[key] += payment.amount;
    return result;
  }, { Successful: 0, Pending: 0, Failed: 0 });

  const exportFiltered = () => {
    downloadCsv("payment-history.csv", [
      ["Date", "Student", "Admission No.", "Payment Type", "Amount", "Method", "Reference", "Status"],
      ...filtered.map((payment) => [
        payment.date,
        payment.student,
        payment.admissionNo,
        payment.feeType,
        payment.amount,
        payment.method,
        payment.reference,
        payment.status,
      ]),
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold">Payment History</h1>
          <p className="mt-1 text-gray-500">View and manage all school payment transactions.</p>
        </div>
        <button onClick={exportFiltered} className="flex items-center gap-2 rounded-xl border px-5 py-3">
          <Download size={18} />
          Export filtered results
        </button>
      </div>

      {storageError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{storageError}</p>}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={<Receipt />} value={formatNaira(payments.reduce((sum, item) => sum + item.amount, 0))} label="Total Payments" />
        <Stat icon={<CheckCircle />} value={formatNaira(totals.Successful)} label="Successful" />
        <Stat icon={<Clock />} value={formatNaira(totals.Pending)} label="Pending" />
        <Stat icon={<XCircle />} value={formatNaira(totals.Failed)} label="Failed" />
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label className="flex items-center rounded-xl border px-4 py-3 md:col-span-2">
          <Search size={18} />
          <span className="sr-only">Search payment history</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search student, receipt or reference..." className="ml-3 w-full outline-none" />
        </label>
        <label className="sr-only" htmlFor="history-date">Filter by payment date</label>
        <input id="history-date" type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} className="rounded-xl border px-4 py-3" />
        <label className="sr-only" htmlFor="history-type">Filter by payment type</label>
        <select id="history-type" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="rounded-xl border px-4 py-3">
          <option value="All">All Payment Types</option>
          {[...new Set(payments.map((payment) => payment.feeType))].map((type) => <option key={type}>{type}</option>)}
        </select>
        <label className="sr-only" htmlFor="history-method">Filter by payment method</label>
        <select id="history-method" value={methodFilter} onChange={(event) => setMethodFilter(event.target.value)} className="rounded-xl border px-4 py-3">
          <option value="All">All Methods</option>
          {[...new Set(payments.map((payment) => payment.method))].map((method) => <option key={method}>{method}</option>)}
        </select>
        <label className="sr-only" htmlFor="history-status">Filter by payment status</label>
        <select id="history-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border px-4 py-3">
          <option value="All">All Statuses</option>
          <option>Successful</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-3xl border">
        <table className="w-full min-w-[1100px]">
          <thead className="border-b bg-gray-50">
            <tr>
              {["Date", "Student", "Payment Type", "Amount", "Method", "Reference", "Status", "Actions"].map((heading) => (
                <th key={heading} className="p-4 text-left">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((payment) => {
              const status = payment.status === "Verified"
                ? "Successful"
                : payment.status === "Rejected"
                ? "Failed"
                : payment.status;
              return (
                <tr key={payment.id} className="border-b">
                  <td className="p-4">{payment.date}</td>
                  <td className="p-4">
                    <p className="font-semibold">{payment.student}</p>
                    <p className="text-xs text-gray-500">{payment.admissionNo}</p>
                  </td>
                  <td className="p-4">{payment.feeType}</td>
                  <td className="p-4 font-semibold">{formatNaira(payment.amount)}</td>
                  <td className="p-4">{payment.method}</td>
                  <td className="p-4 text-sm">{payment.reference}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-3 py-1 text-sm ${
                      status === "Successful" ? "bg-green-100 text-green-700"
                        : status === "Pending" ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>{status}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button title="View payment" onClick={() => setSelectedPayment(payment)} className="rounded-lg border p-2"><Eye size={16} /></button>
                      <button title="Print payment" onClick={() => window.print()} className="rounded-lg border p-2"><Printer size={16} /></button>
                      <button title="Download payment" onClick={() => downloadCsv(`${payment.reference}.csv`, [["Reference", "Student", "Fee Type", "Amount", "Method", "Date", "Status"], [payment.reference, payment.student, payment.feeType, payment.amount, payment.method, payment.date, status]])} className="rounded-lg border p-2"><Download size={16} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && <tr><td colSpan="8" className="p-8 text-center text-gray-500">No payments match these filters.</td></tr>}
          </tbody>
        </table>
      </div>

      {selectedPayment && (
        <div role="dialog" aria-modal="true" aria-labelledby="payment-detail-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md space-y-3 rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 id="payment-detail-title" className="text-xl font-bold">Payment details</h2>
              <button onClick={() => setSelectedPayment(null)} className="rounded-lg border px-3 py-1">Close</button>
            </div>
            <p><strong>Reference:</strong> {selectedPayment.reference}</p>
            <p><strong>Student:</strong> {selectedPayment.student} ({selectedPayment.admissionNo})</p>
            <p><strong>Type:</strong> {selectedPayment.feeType}</p>
            <p><strong>Amount:</strong> {formatNaira(selectedPayment.amount)}</p>
            <p><strong>Method:</strong> {selectedPayment.method}</p>
            <p><strong>Date:</strong> {selectedPayment.date}</p>
            <p><strong>Status:</strong> {selectedPayment.status}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ icon, value, label }) {
  return <div className="rounded-2xl border p-5">{icon}<h2 className="mt-3 text-2xl font-bold">{value}</h2><p className="text-sm text-gray-500">{label}</p></div>;
}
