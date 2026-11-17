import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Filter,
  Printer,
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

export default function ParentPaymentHistoryPage() {
  const [payments, , storageError] = usePersistentState(
    parentPaymentsStorageKey,
    initialParentPayments
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return payments.filter((payment) => {
      const matchesSearch = [
        payment.receiptNo,
        payment.child,
        payment.feeType,
        payment.method,
      ].some((value) => value.toLowerCase().includes(query));
      return (
        matchesSearch &&
        (statusFilter === "All" || payment.status === statusFilter)
      );
    });
  }, [payments, search, statusFilter]);

  const paidPayments = payments.filter((payment) => payment.status === "Paid");
  const pendingPayments = payments.filter(
    (payment) => payment.status !== "Paid"
  );
  const totalPaid = paidPayments.reduce(
    (total, payment) => total + Number(payment.amount),
    0
  );
  const pendingAmount = pendingPayments.reduce(
    (total, payment) => total + Number(payment.amount),
    0
  );

  const handleExport = () => {
    downloadCsv("parent-payment-history.csv", [
      ["Receipt", "Child", "Fee", "Amount (NGN)", "Date", "Method", "Status"],
      ...filteredPayments.map((payment) => [
        payment.receiptNo,
        payment.child,
        payment.feeType,
        payment.amount,
        payment.date,
        payment.method,
        payment.status,
      ]),
    ]);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <h1 className="text-3xl font-bold">Payment History</h1>
          <p className="mt-2 text-gray-500">
            Review payments and payment requests for your children.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExport}
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
        <SummaryCard icon={Wallet} label="Total Paid" value={formatMoney(totalPaid)} />
        <SummaryCard icon={CheckCircle} label="Successful Payments" value={paidPayments.length} />
        <SummaryCard icon={Clock} label="Pending Verification" value={pendingPayments.length} />
        <SummaryCard icon={AlertCircle} label="Pending Amount" value={formatMoney(pendingAmount)} />
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <label className="flex flex-1 items-center rounded-xl border px-4 py-3">
          <Search className="mr-3 shrink-0 text-gray-500" size={18} />
          <span className="sr-only">Search payments</span>
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
                <th className="p-4">Payment Date</th>
                <th className="p-4">Method</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-t">
                  <td className="p-4 font-medium">{payment.receiptNo}</td>
                  <td className="p-4">{payment.child}</td>
                  <td className="p-4">{payment.feeType}</td>
                  <td className="p-4 text-right font-semibold">
                    {formatMoney(payment.amount)}
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      {payment.date}
                    </span>
                  </td>
                  <td className="p-4">{payment.method}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        aria-label={`View ${payment.receiptNo}`}
                        onClick={() => setSelectedPayment(payment)}
                        className="rounded-lg border p-2 hover:bg-gray-50"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Download ${payment.receiptNo}`}
                        onClick={() => downloadPaymentRecord(payment)}
                        className="rounded-lg border p-2 hover:bg-gray-50"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Print ${payment.receiptNo}`}
                        onClick={() => window.print()}
                        className="rounded-lg border p-2 hover:bg-gray-50"
                      >
                        <Printer size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPayments.length === 0 && (
            <p className="p-10 text-center text-sm text-gray-500">
              No payments match your search or status filter.
            </p>
          )}
        </div>
      </div>

      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-details-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 id="payment-details-title" className="text-xl font-semibold">
                  Payment details
                </h2>
                <p className="text-sm text-gray-500">{selectedPayment.receiptNo}</p>
              </div>
              <button
                type="button"
                aria-label="Close payment details"
                onClick={() => setSelectedPayment(null)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <Detail label="Child" value={selectedPayment.child} />
              <Detail label="Fee" value={selectedPayment.feeType} />
              <Detail label="Amount" value={formatMoney(selectedPayment.amount)} />
              <Detail label="Date" value={selectedPayment.date} />
              <Detail label="Method" value={selectedPayment.method} />
              <Detail label="Status" value={selectedPayment.status} />
            </dl>
            {selectedPayment.status === "Pending Verification" && (
              <p className="mt-5 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
                This frontend demo records payment submissions for review. It does
                not process or verify payments.
              </p>
            )}
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => downloadPaymentRecord(selectedPayment)}
                className="rounded-xl border px-4 py-2 text-sm"
              >
                Download record
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
