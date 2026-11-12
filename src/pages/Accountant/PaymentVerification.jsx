import React, { useMemo, useState } from "react";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Receipt,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import { formatNaira, initialPayments } from "../../data/accountantData";
import downloadCsv from "../../utils/downloadCsv";

export default function AccountantPaymentVerificationPage() {
  const [payments, setPayments, storageError] = usePersistentState(
    "accountant-payments",
    initialPayments
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return payments.filter((payment) => {
      const matchesSearch = [
        payment.student,
        payment.admissionNo,
        payment.reference,
        payment.feeType,
      ].some((value) => value.toLowerCase().includes(query));
      return matchesSearch &&
        (statusFilter === "All" || payment.status === statusFilter);
    });
  }, [payments, search, statusFilter]);

  const updatePaymentStatus = (id, status) => {
    setPayments((current) =>
      current.map((payment) =>
        payment.id === id ? { ...payment, status } : payment
      )
    );
    setMessage(`Payment ${status.toLowerCase()}.`);
  };

  const exportPayments = () => {
    downloadCsv("payment-verification.csv", [
      ["Reference", "Student", "Admission No.", "Fee Type", "Amount", "Method", "Date", "Status"],
      ...filtered.map((payment) => [
        payment.reference,
        payment.student,
        payment.admissionNo,
        payment.feeType,
        payment.amount,
        payment.method,
        payment.date,
        payment.status,
      ]),
    ]);
  };

  const count = (status) => payments.filter((payment) => payment.status === status).length;
  const verifiedTotal = payments
    .filter((payment) => payment.status === "Verified")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <h1 className="text-3xl font-bold">Payment Verification</h1>
          <p className="mt-2 text-gray-500">
            Verify student fee payments before posting them to financial records.
          </p>
        </div>
        <button onClick={exportPayments} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white">
          <Download size={18} />
          Export filtered results
        </button>
      </div>

      {storageError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{storageError}</p>}

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <Stat icon={<Clock />} label="Pending" value={count("Pending")} />
        <Stat icon={<CheckCircle />} label="Verified" value={count("Verified")} />
        <Stat icon={<XCircle />} label="Rejected" value={count("Rejected")} />
        <Stat icon={<Receipt />} label="Verified collections" value={formatNaira(verifiedTotal)} />
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <label className="flex flex-1 items-center rounded-xl border px-4 py-3">
          <Search className="mr-3" />
          <span className="sr-only">Search payments</span>
          <input
            placeholder="Search student, admission number or reference..."
            className="w-full outline-none"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <label className="sr-only" htmlFor="verification-status">Filter by status</label>
        <select id="verification-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border px-4 py-3">
          <option>All</option>
          <option>Pending</option>
          <option>Verified</option>
          <option>Rejected</option>
        </select>
      </div>

      {message && <p role="status" className="text-sm text-blue-700">{message}</p>}

      <div className="overflow-x-auto rounded-3xl border">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-gray-50">
            <tr>
              {["Reference", "Student", "Admission No.", "Fee Type", "Amount", "Method", "Date", "Status", "Actions"].map((heading) => (
                <th key={heading} className="p-3 text-left">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((payment) => (
              <tr key={payment.id} className="border-t">
                <td className="p-3">{payment.reference}</td>
                <td className="p-3">{payment.student}</td>
                <td className="p-3">{payment.admissionNo}</td>
                <td className="p-3">{payment.feeType}</td>
                <td className="p-3">{formatNaira(payment.amount)}</td>
                <td className="p-3">{payment.method}</td>
                <td className="p-3">{payment.date}</td>
                <td className="p-3">
                  <span className={`rounded-full px-3 py-1 ${
                    payment.status === "Verified"
                      ? "bg-green-100 text-green-700"
                      : payment.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>{payment.status}</span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button type="button" title={`View ${payment.reference}`} onClick={() => setMessage(`${payment.student} · ${payment.feeType} · ${formatNaira(payment.amount)} · ${payment.method}`)} className="rounded-lg border p-2">
                      <Eye size={16} />
                    </button>
                    {payment.status === "Pending" && (
                      <>
                        <button type="button" title="Verify payment" onClick={() => updatePaymentStatus(payment.id, "Verified")} className="rounded-lg border p-2 text-green-600">
                          <CheckCircle size={16} />
                        </button>
                        <button type="button" title="Reject payment" onClick={() => updatePaymentStatus(payment.id, "Rejected")} className="rounded-lg border p-2 text-red-600">
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="9" className="p-8 text-center text-gray-500">No payments match these filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-3xl border p-5">
      <span className="mb-3 inline-block text-blue-600">{icon}</span>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p>{label}</p>
    </div>
  );
}
