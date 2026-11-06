
import { useMemo, useState } from "react";
import jsPDF from "jspdf";
import {
  Search,
  Download,
  Eye,
  Printer,
  Receipt,
  CheckCircle2,
  Clock3,
  XCircle,
  Wallet,
  X,
  Filter,
  FileText,
  CalendarDays,
  UserRound,
  Ban,
  RefreshCw,
  Check,
} from "lucide-react";

const initialReceipts = [
  {
    id: 1,
    receiptNo: "RCT-2026-00125",
    student: "Abdulrahman Jibreel",
    studentId: "STU-2026-0012",
    className: "SS 2A",
    invoice: "INV-2026-00125",
    paymentRef: "PAY-2026-00125",
    description: "First Term School Fees",
    amount: 100000,
    method: "Paystack",
    date: "2026-11-02",
    payer: "Jibreel Mujeeb",
    status: "Issued",
  },
  {
    id: 2,
    receiptNo: "RCT-2026-00126",
    student: "Aisha Jibreel",
    studentId: "STU-2026-0045",
    className: "JSS 3B",
    invoice: "INV-2026-00205",
    paymentRef: "PAY-2026-00126",
    description: "First Term School Fees",
    amount: 80000,
    method: "Bank Transfer",
    date: "2026-11-01",
    payer: "Jibreel Mujeeb",
    status: "Pending",
  },
  {
    id: 3,
    receiptNo: "RCT-2026-00127",
    student: "Muhammad Ibrahim",
    studentId: "STU-2026-0061",
    className: "SS 1B",
    invoice: "INV-2026-00221",
    paymentRef: "PAY-2026-00127",
    description: "Examination Fee",
    amount: 35000,
    method: "Cash",
    date: "2026-10-30",
    payer: "Ibrahim Musa",
    status: "Issued",
  },
  {
    id: 4,
    receiptNo: "RCT-2026-00128",
    student: "Fatimah Abdullahi",
    studentId: "STU-2026-0074",
    className: "JSS 2A",
    invoice: "INV-2026-00234",
    paymentRef: "PAY-2026-00128",
    description: "ICT and Laboratory Fee",
    amount: 25000,
    method: "POS",
    date: "2026-10-28",
    payer: "Abdullahi Yusuf",
    status: "Cancelled",
    cancelReason: "Payment transaction failed",
  },
  {
    id: 5,
    receiptNo: "RCT-2026-00129",
    student: "Yusuf Ahmed",
    studentId: "STU-2026-0088",
    className: "SS 3A",
    invoice: "INV-2026-00240",
    paymentRef: "PAY-2026-00129",
    description: "First Term School Fees",
    amount: 20000,
    method: "Paystack",
    date: "2026-10-25",
    payer: "Ahmed Yusuf",
    status: "Issued",
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const statusStyles = {
  Issued: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Cancelled: "bg-red-50 text-red-700",
};

function StatusBadge({ status }) {
  const Icon =
    status === "Issued"
      ? CheckCircle2
      : status === "Pending"
      ? Clock3
      : XCircle;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, color }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className={`rounded-lg p-2 ${color}`}>
          <Icon size={19} />
        </div>
      </div>
      <h2 className="mt-4 text-2xl font-bold text-slate-900">{value}</h2>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}

export default function AdminReceipts() {
  const [receipts, setReceipts] = useState(initialReceipts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [cancelReceipt, setCancelReceipt] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const filteredReceipts = useMemo(() => {
    return receipts.filter((receipt) => {
      const query = search.toLowerCase();

      const matchesSearch = [
        receipt.receiptNo,
        receipt.student,
        receipt.studentId,
        receipt.invoice,
        receipt.paymentRef,
        receipt.payer,
      ].some((value) => value.toLowerCase().includes(query));

      return (
        matchesSearch &&
        (statusFilter === "All" || receipt.status === statusFilter) &&
        (methodFilter === "All" || receipt.method === methodFilter) &&
        (classFilter === "All" || receipt.className === classFilter) &&
        (!startDate || receipt.date >= startDate) &&
        (!endDate || receipt.date <= endDate)
      );
    });
  }, [
    receipts,
    search,
    statusFilter,
    methodFilter,
    classFilter,
    startDate,
    endDate,
  ]);

  const issuedReceipts = receipts.filter((r) => r.status === "Issued");
  const pendingReceipts = receipts.filter((r) => r.status === "Pending");
  const cancelledReceipts = receipts.filter((r) => r.status === "Cancelled");

  const totalIssued = issuedReceipts.reduce(
    (sum, receipt) => sum + receipt.amount,
    0
  );

  const generatePDF = (receipt) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("SCHOOL PAYMENT RECEIPT", 105, 25, { align: "center" });

    doc.setFontSize(10);
    doc.text("Official payment acknowledgement", 105, 33, {
      align: "center",
    });

    doc.line(20, 40, 190, 40);

    doc.setFontSize(12);
    doc.text(`Receipt Number: ${receipt.receiptNo}`, 20, 52);
    doc.text(`Student: ${receipt.student}`, 20, 63);
    doc.text(`Student ID: ${receipt.studentId}`, 20, 74);
    doc.text(`Class: ${receipt.className}`, 20, 85);
    doc.text(`Invoice: ${receipt.invoice}`, 20, 96);
    doc.text(`Payment Reference: ${receipt.paymentRef}`, 20, 107);
    doc.text(`Description: ${receipt.description}`, 20, 118);
    doc.text(`Payment Method: ${receipt.method}`, 20, 129);
    doc.text(`Payer: ${receipt.payer}`, 20, 140);
    doc.text(`Payment Date: ${receipt.date}`, 20, 151);

    doc.setFontSize(18);
    doc.text(`Amount: ${money(receipt.amount)}`, 20, 170);

    doc.setFontSize(11);
    doc.text(`Receipt Status: ${receipt.status}`, 20, 185);

    if (receipt.status === "Cancelled") {
      doc.text(`Cancellation Reason: ${receipt.cancelReason || "Not specified"}`, 20, 196);
    }

    doc.line(20, 210, 190, 210);
    doc.text("Thank you for your payment.", 105, 222, {
      align: "center",
    });

    doc.save(`${receipt.receiptNo}.pdf`);
  };

  const printReceipt = (receipt) => {
    const win = window.open("", "_blank", "width=750,height=850");

    if (!win) {
      alert("Please allow pop-ups to print receipts.");
      return;
    }

    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${receipt.receiptNo}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 35px; color: #1e293b; }
          .header { text-align: center; border-bottom: 2px solid #ddd; padding-bottom: 20px; }
          .amount { font-size: 28px; font-weight: bold; text-align: center; margin: 25px; }
          .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
          .footer { margin-top: 35px; text-align: center; }
          .status { text-align: center; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>SCHOOL PAYMENT RECEIPT</h1>
          <p>Official payment acknowledgement</p>
          <h3>${receipt.receiptNo}</h3>
        </div>
        <div class="amount">${money(receipt.amount)}</div>
        <p class="status">${receipt.status}</p>
        ${[
          ["Student", receipt.student],
          ["Student ID", receipt.studentId],
          ["Class", receipt.className],
          ["Invoice Number", receipt.invoice],
          ["Payment Reference", receipt.paymentRef],
          ["Description", receipt.description],
          ["Payment Method", receipt.method],
          ["Payer", receipt.payer],
          ["Date", receipt.date],
        ].map(([label, value]) => `
          <div class="row"><span>${label}</span><strong>${value}</strong></div>
        `).join("")}
        ${receipt.cancelReason ? `<p>Cancellation reason: ${receipt.cancelReason}</p>` : ""}
        <div class="footer">
          <p>Thank you for your payment.</p>
          <p>Authorized school receipt</p>
        </div>
        <script>window.onload = () => window.print();</script>
      </body>
      </html>
    `);

    win.document.close();
  };

  const cancelSelectedReceipt = () => {
    if (!cancelReason.trim()) {
      alert("Please provide a cancellation reason.");
      return;
    }

    setReceipts((current) =>
      current.map((receipt) =>
        receipt.id === cancelReceipt.id
          ? { ...receipt, status: "Cancelled", cancelReason }
          : receipt
      )
    );

    if (selectedReceipt?.id === cancelReceipt.id) {
      setSelectedReceipt({
        ...selectedReceipt,
        status: "Cancelled",
        cancelReason,
      });
    }

    setCancelReceipt(null);
    setCancelReason("");
  };

  const exportCSV = () => {
    const headers = [
      "Receipt Number",
      "Student",
      "Student ID",
      "Class",
      "Invoice",
      "Payment Reference",
      "Description",
      "Amount",
      "Method",
      "Date",
      "Payer",
      "Status",
    ];

    const rows = filteredReceipts.map((r) => [
      r.receiptNo,
      r.student,
      r.studentId,
      r.className,
      r.invoice,
      r.paymentRef,
      r.description,
      r.amount,
      r.method,
      r.date,
      r.payer,
      r.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) =>
          `"${String(value).replace(/"/g, '""')}"`
        ).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "admin-receipts.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setMethodFilter("All");
    setClassFilter("All");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-slate-500">
              Admin / Finance / Receipts
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
              Receipt Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage, view, print and track all school payment receipts.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <Download size={17} />
            Export Receipts
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Issued"
            value={issuedReceipts.length}
            subtitle="Successfully issued receipts"
            icon={Receipt}
            color="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Receipt Amount"
            value={money(totalIssued)}
            subtitle="Value of issued receipts"
            icon={Wallet}
            color="bg-blue-50 text-blue-600"
          />
          <StatCard
            title="Pending Receipts"
            value={pendingReceipts.length}
            subtitle="Awaiting confirmation"
            icon={Clock3}
            color="bg-amber-50 text-amber-600"
          />
          <StatCard
            title="Cancelled Receipts"
            value={cancelledReceipts.length}
            subtitle="Cancelled receipt records"
            icon={XCircle}
            color="bg-red-50 text-red-600"
          />
        </div>

        {/* Notice */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <FileText className="mt-0.5 text-blue-600" size={20} />
          <div>
            <h3 className="text-sm font-semibold text-blue-900">
              Receipt management
            </h3>
            <p className="mt-1 text-xs leading-5 text-blue-700">
              Receipts should be issued only for confirmed payments. A cancelled
              receipt remains in the audit history and should never be deleted.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-slate-500" />
              <h3 className="font-semibold text-slate-900">Filter Receipts</h3>
            </div>
            <button
              onClick={resetFilters}
              className="text-sm font-medium text-blue-600"
            >
              Reset filters
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <div className="relative xl:col-span-2">
              <Search
                className="absolute left-3 top-3 text-slate-400"
                size={17}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search receipt, student, invoice..."
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Issued">Issued</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none"
            >
              <option value="All">All Methods</option>
              <option value="Paystack">Paystack</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
              <option value="POS">POS</option>
            </select>

            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none"
            >
              <option value="All">All Classes</option>
              <option value="SS 2A">SS 2A</option>
              <option value="JSS 3B">JSS 3B</option>
              <option value="SS 1B">SS 1B</option>
              <option value="JSS 2A">JSS 2A</option>
              <option value="SS 3A">SS 3A</option>
            </select>

            <div className="flex gap-2">
              <input
                type="date"
                aria-label="Start date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="min-w-0 w-full rounded-lg border border-slate-200 px-2 py-2 text-xs outline-none"
              />
              <input
                type="date"
                aria-label="End date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="min-w-0 w-full rounded-lg border border-slate-200 px-2 py-2 text-xs outline-none"
              />
            </div>
          </div>
        </div>

        {/* Receipts table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-col justify-between gap-2 border-b border-slate-200 p-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-semibold text-slate-900">All Receipts</h3>
              <p className="mt-1 text-xs text-slate-500">
                Showing {filteredReceipts.length} of {receipts.length} receipts
              </p>
            </div>
            <span className="text-xs text-slate-500">
              Currency: Nigerian Naira (₦)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Receipt Number</th>
                  <th className="px-5 py-4 font-semibold">Student</th>
                  <th className="px-5 py-4 font-semibold">Invoice</th>
                  <th className="px-5 py-4 font-semibold">Amount</th>
                  <th className="px-5 py-4 font-semibold">Method</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredReceipts.map((receipt) => (
                  <tr key={receipt.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {receipt.receiptNo}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {receipt.student}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {receipt.studentId} · {receipt.className}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {receipt.invoice}
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {money(receipt.amount)}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {receipt.method}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {receipt.date}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={receipt.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSelectedReceipt(receipt)}
                          title="View receipt"
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => generatePDF(receipt)}
                          title="Download PDF"
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          onClick={() => printReceipt(receipt)}
                          title="Print receipt"
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                        >
                          <Printer size={16} />
                        </button>
                        {receipt.status === "Issued" && (
                          <button
                            onClick={() => setCancelReceipt(receipt)}
                            title="Cancel receipt"
                            className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50"
                          >
                            <Ban size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredReceipts.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-5 py-14 text-center">
                      <Receipt className="mx-auto mb-3 text-slate-300" size={36} />
                      <p className="font-semibold text-slate-700">
                        No receipts found
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Receipt details modal */}
        {selectedReceipt && (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
            onClick={() => setSelectedReceipt(null)}
          >
            <div
              className="my-auto w-full max-w-xl rounded-2xl bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 p-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Receipt Details
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {selectedReceipt.receiptNo}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5 p-5">
                <div className="rounded-xl bg-slate-50 p-5 text-center">
                  <p className="text-sm text-slate-500">Receipt Amount</p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    {money(selectedReceipt.amount)}
                  </h2>
                  <div className="mt-3">
                    <StatusBadge status={selectedReceipt.status} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    ["Student", selectedReceipt.student],
                    ["Student ID", selectedReceipt.studentId],
                    ["Class", selectedReceipt.className],
                    ["Payer", selectedReceipt.payer],
                    ["Invoice", selectedReceipt.invoice],
                    ["Payment Reference", selectedReceipt.paymentRef],
                    ["Description", selectedReceipt.description],
                    ["Payment Method", selectedReceipt.method],
                    ["Payment Date", selectedReceipt.date],
                    ["Receipt Number", selectedReceipt.receiptNo],
                  ].map(([label, value]) => (
                    <div key={label} className="border-b border-slate-100 pb-3">
                      <p className="text-xs text-slate-500">{label}</p>
                      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {selectedReceipt.cancelReason && (
                  <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    <strong>Cancellation reason:</strong>{" "}
                    {selectedReceipt.cancelReason}
                  </div>
                )}

                <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-4">
                  <button
                    onClick={() => printReceipt(selectedReceipt)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
                  >
                    <Printer size={16} />
                    Print
                  </button>
                  <button
                    onClick={() => generatePDF(selectedReceipt)}
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    <Download size={16} />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cancel receipt modal */}
        {cancelReceipt && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
            onClick={() => setCancelReceipt(null)}
          >
            <div
              className="w-full max-w-md rounded-2xl bg-white p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">
                  Cancel Receipt
                </h2>
                <button
                  onClick={() => setCancelReceipt(null)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={19} />
                </button>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                You are cancelling receipt{" "}
                <strong>{cancelReceipt.receiptNo}</strong>. This action should
                only be used for an invalid receipt.
              </p>

              <label className="mt-5 block text-sm font-medium text-slate-700">
                Cancellation reason
              </label>
              <textarea
                rows="4"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Enter the reason for cancelling this receipt..."
                className="mt-2 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-red-500"
              />

              <div className="mt-5 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setCancelReceipt(null);
                    setCancelReason("");
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600"
                >
                  Go Back
                </button>
                <button
                  onClick={cancelSelectedReceipt}
                  className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Cancel Receipt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
