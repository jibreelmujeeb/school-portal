import React, { useMemo, useState } from "react";
import {
  Calendar,
  CheckCircle,
  Download,
  Eye,
  Filter,
  Mail,
  Printer,
  Receipt,
  Search,
  Wallet,
  X,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import {
  downloadCsv,
  downloadPaymentRecord,
  initialParentPayments,
  parentPaymentsStorageKey,
} from "../../data/parentPortal";

const formatMoney = (amount) =>
  `₦${Number(amount).toLocaleString("en-NG")}`;

export default function ParentReceiptPage() {
  const [receipts, , storageError] = usePersistentState(
    parentPaymentsStorageKey,
    initialParentPayments
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const filteredReceipts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return receipts.filter((receipt) => {
      const matchesSearch = [
        receipt.receiptNo,
        receipt.child,
        receipt.feeType,
        receipt.method,
      ].some((value) => value.toLowerCase().includes(query));
      return (
        matchesSearch &&
        (statusFilter === "All" || receipt.status === statusFilter)
      );
    });
  }, [receipts, search, statusFilter]);
  const paidReceipts = receipts.filter((receipt) => receipt.status === "Paid");
  const totalPaid = paidReceipts.reduce(
    (total, receipt) => total + Number(receipt.amount),
    0
  );

  const exportReceipts = () => {
    downloadCsv("parent-payment-receipts.csv", [
      ["Receipt", "Child", "Fee", "Amount (NGN)", "Date", "Method", "Status"],
      ...filteredReceipts.map((receipt) => [
        receipt.receiptNo,
        receipt.child,
        receipt.feeType,
        receipt.amount,
        receipt.date,
        receipt.method,
        receipt.status,
      ]),
    ]);
  };

  const emailReceipt = (receipt) => {
    const subject = encodeURIComponent(`Payment record ${receipt.receiptNo}`);
    const body = encodeURIComponent(
      `Receipt: ${receipt.receiptNo}\nChild: ${receipt.child}\nFee: ${receipt.feeType}\nAmount: ${formatMoney(receipt.amount)}\nStatus: ${receipt.status}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <h1 className="text-3xl font-bold">Payment Receipts</h1>
          <p className="mt-2 text-gray-500">
            View, download, print, and share your payment records.
          </p>
        </div>
        <button
          type="button"
          onClick={exportReceipts}
          className="flex items-center gap-2 self-start rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {storageError && (
        <p role="alert" className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
          {storageError}
        </p>
      )}

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <SummaryCard icon={Receipt} label="Total Records" value={receipts.length} />
        <SummaryCard icon={Wallet} label="Amount Paid" value={formatMoney(totalPaid)} />
        <SummaryCard icon={CheckCircle} label="Verified Payments" value={paidReceipts.length} />
        <SummaryCard icon={Calendar} label="Current Session" value="2026/2027" />
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <label className="flex flex-1 items-center rounded-xl border px-4 py-3">
          <Search className="mr-3 shrink-0 text-gray-500" size={18} />
          <span className="sr-only">Search receipts</span>
          <input
            type="search"
            placeholder="Search receipt, child, fee or method..."
            className="w-full outline-none"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <label className="flex items-center gap-2 rounded-xl border px-4 py-3">
          <Filter size={18} className="text-gray-500" />
          <span className="sr-only">Filter by payment status</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="bg-transparent outline-none"
          >
            <option value="All">All statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending Verification">Pending verification</option>
          </select>
        </label>
      </div>

      <div className="overflow-hidden rounded-3xl border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="p-4">Receipt No.</th>
                <th className="p-4">Child</th>
                <th className="p-4">Fee Type</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReceipts.map((receipt) => (
                <tr key={receipt.id} className="border-t">
                  <td className="p-4 font-medium">{receipt.receiptNo}</td>
                  <td className="p-4">{receipt.child}</td>
                  <td className="p-4">{receipt.feeType}</td>
                  <td className="p-4 text-right font-semibold">
                    {formatMoney(receipt.amount)}
                  </td>
                  <td className="p-4">{receipt.method}</td>
                  <td className="p-4">{receipt.date}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        receipt.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {receipt.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        aria-label={`View ${receipt.receiptNo}`}
                        onClick={() => setSelectedReceipt(receipt)}
                        className="rounded-lg border p-2 hover:bg-gray-50"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Download ${receipt.receiptNo}`}
                        onClick={() => downloadPaymentRecord(receipt)}
                        className="rounded-lg border p-2 hover:bg-gray-50"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Print ${receipt.receiptNo}`}
                        onClick={() => window.print()}
                        className="rounded-lg border p-2 hover:bg-gray-50"
                      >
                        <Printer size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Email ${receipt.receiptNo}`}
                        onClick={() => emailReceipt(receipt)}
                        className="rounded-lg border p-2 hover:bg-gray-50"
                      >
                        <Mail size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredReceipts.length === 0 && (
            <p className="p-10 text-center text-sm text-gray-500">
              No receipts match your search or status filter.
            </p>
          )}
        </div>
      </div>

      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="receipt-details-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 id="receipt-details-title" className="text-xl font-semibold">
                  Payment record
                </h2>
                <p className="text-sm text-gray-500">{selectedReceipt.receiptNo}</p>
              </div>
              <button
                type="button"
                aria-label="Close receipt details"
                onClick={() => setSelectedReceipt(null)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <Detail label="Child" value={selectedReceipt.child} />
              <Detail label="Fee" value={selectedReceipt.feeType} />
              <Detail label="Amount" value={formatMoney(selectedReceipt.amount)} />
              <Detail label="Date" value={selectedReceipt.date} />
              <Detail label="Method" value={selectedReceipt.method} />
              <Detail label="Status" value={selectedReceipt.status} />
            </dl>
            {selectedReceipt.status !== "Paid" && (
              <p className="mt-5 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
                This payment record is awaiting school verification and is not an
                official receipt.
              </p>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => downloadPaymentRecord(selectedReceipt)}
                className="rounded-xl border px-4 py-2 text-sm"
              >
                Download
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-xl border px-4 py-2 text-sm"
              >
                Print
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-3xl border p-5">
      {React.createElement(Icon, { className: "mb-3 text-blue-600" })}
      <h2 className="text-2xl font-bold">{value}</h2>
      <p>{label}</p>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-gray-500">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}
