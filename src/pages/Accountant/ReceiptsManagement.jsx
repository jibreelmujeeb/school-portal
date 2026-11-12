import React, { useMemo, useState } from "react";
import {
  Search,
  Eye,
  Printer,
  Download,
  FileText,
  Ban,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import { formatNaira, initialPayments } from "../../data/accountantData";
import downloadCsv from "../../utils/downloadCsv";

export default function ReceiptManagementPage() {
  const [payments, , storageError] = usePersistentState(
    "accountant-payments",
    initialPayments
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const receipts = payments.map((payment) => ({
    ...payment,
    status: payment.status === "Verified"
      ? "Issued"
      : payment.status === "Rejected"
      ? "Voided"
      : "Pending verification",
  }));
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return receipts.filter((receipt) => {
      const matchesSearch = [
        receipt.reference,
        receipt.student,
        receipt.admissionNo,
      ].some((value) => value.toLowerCase().includes(query));
      return matchesSearch &&
        (statusFilter === "All" || receipt.status === statusFilter);
    });
  }, [receipts, search, statusFilter]);
  const collected = receipts
    .filter((receipt) => receipt.status === "Issued")
    .reduce((sum, receipt) => sum + receipt.amount, 0);

  const exportReceipts = () => {
    downloadCsv("receipts.csv", [
      ["Receipt No.", "Student", "Admission No.", "Fee Type", "Amount", "Method", "Date", "Status"],
      ...filtered.map((receipt) => [
        receipt.reference,
        receipt.student,
        receipt.admissionNo,
        receipt.feeType,
        receipt.amount,
        receipt.method,
        receipt.date,
        receipt.status,
      ]),
    ]);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <h1 className="text-3xl font-bold">Receipts Management</h1>
          <p className="mt-2 text-gray-500">View, print, and download receipts for recorded payments.</p>
        </div>
        <button onClick={exportReceipts} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white">
          <Download size={18} />
          Export filtered
        </button>
      </div>

      {storageError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{storageError}</p>}

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <Stat icon={<FileText />} value={receipts.length} label="Total Receipts" />
        <Stat icon={<FileText />} value={formatNaira(collected)} label="Verified Collections" />
        <Stat icon={<FileText />} value={receipts.filter((item) => item.status === "Pending verification").length} label="Pending Verification" />
        <Stat icon={<Ban />} value={receipts.filter((item) => item.status === "Voided").length} label="Rejected Payments" />
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <label className="flex flex-1 items-center rounded-xl border px-4 py-3">
          <Search className="mr-3" />
          <span className="sr-only">Search receipts</span>
          <input className="w-full outline-none" placeholder="Search receipt number or student..." value={search} onChange={(event) => setSearch(event.target.value)} />
        </label>
        <label className="sr-only" htmlFor="receipt-status">Filter receipts by status</label>
        <select id="receipt-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border px-5">
          <option value="All">All statuses</option>
          <option>Issued</option>
          <option>Pending verification</option>
          <option>Voided</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-3xl border">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-gray-50">
            <tr>{["Receipt No.", "Student", "Fee Type", "Amount", "Method", "Date", "Status", "Actions"].map((item) => <th key={item} className="p-3 text-left">{item}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((receipt) => (
              <tr key={receipt.id} className="border-t">
                <td className="p-3">{receipt.reference}</td>
                <td className="p-3">{receipt.student}<p className="text-xs text-gray-500">{receipt.admissionNo}</p></td>
                <td className="p-3">{receipt.feeType}</td>
                <td className="p-3">{formatNaira(receipt.amount)}</td>
                <td className="p-3">{receipt.method}</td>
                <td className="p-3">{receipt.date}</td>
                <td className="p-3">
                  <span className={`rounded-full px-3 py-1 text-sm ${
                    receipt.status === "Issued" ? "bg-green-100 text-green-700"
                      : receipt.status === "Voided" ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>{receipt.status}</span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button title="View receipt" onClick={() => setSelectedReceipt(receipt)} className="rounded-lg border p-2"><Eye size={16} /></button>
                    <button title="Print receipt" disabled={receipt.status !== "Issued"} onClick={() => window.print()} className="rounded-lg border p-2 disabled:cursor-not-allowed disabled:opacity-40"><Printer size={16} /></button>
                    <button title="Download receipt" disabled={receipt.status !== "Issued"} onClick={() => downloadCsv(`${receipt.reference}.csv`, [["Receipt No.", "Student", "Admission No.", "Fee Type", "Amount", "Method", "Date"], [receipt.reference, receipt.student, receipt.admissionNo, receipt.feeType, receipt.amount, receipt.method, receipt.date]])} className="rounded-lg border p-2 disabled:cursor-not-allowed disabled:opacity-40"><Download size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="8" className="p-8 text-center text-gray-500">No receipts match these filters.</td></tr>}
          </tbody>
        </table>
      </div>

      {selectedReceipt && (
        <div role="dialog" aria-modal="true" aria-labelledby="receipt-detail-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md space-y-3 rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 id="receipt-detail-title" className="text-xl font-bold">Receipt details</h2>
              <button onClick={() => setSelectedReceipt(null)} className="rounded-lg border px-3 py-1">Close</button>
            </div>
            <p><strong>{selectedReceipt.reference}</strong> · {selectedReceipt.status}</p>
            <p>{selectedReceipt.student} · {selectedReceipt.admissionNo}</p>
            <p>{selectedReceipt.feeType} · {formatNaira(selectedReceipt.amount)}</p>
            <p>{selectedReceipt.method} · {selectedReceipt.date}</p>
            {selectedReceipt.status !== "Issued" && <p className="text-sm text-yellow-700">A receipt is available after this payment is verified.</p>}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ icon, value, label }) {
  return <div className="rounded-3xl border p-5"><span className="mb-3 inline-block text-blue-600">{icon}</span><h2 className="text-2xl font-bold">{value}</h2><p>{label}</p></div>;
}
