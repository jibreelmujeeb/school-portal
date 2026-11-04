
import { useMemo, useState } from "react";
import {
  Search, Download, Eye, Printer, CheckCircle2, Clock3,
  XCircle, CreditCard, Wallet, Banknote, Receipt,
  TrendingUp, ArrowUpRight, X, Filter, RefreshCw,
  CalendarDays, UserRound, FileText, Check, ChevronDown
} from "lucide-react";

const initialPayments = [
  {
    id: 1,
    reference: "PAY-2026-00125",
    transactionId: "TXN-90812345",
    student: "Abdulrahman Jibreel",
    studentId: "STU-2026-0012",
    className: "SS 2A",
    invoice: "INV-2026-00125",
    description: "First Term School Fees",
    amount: 100000,
    method: "Paystack",
    date: "2026-11-02",
    time: "10:25 AM",
    status: "Successful",
    payer: "Jibreel Mujeeb",
    email: "jibreel@example.com",
  },
  {
    id: 2,
    reference: "PAY-2026-00126",
    transactionId: "TXN-90812346",
    student: "Aisha Jibreel",
    studentId: "STU-2026-0045",
    className: "JSS 3B",
    invoice: "INV-2026-00205",
    description: "First Term School Fees",
    amount: 80000,
    method: "Bank Transfer",
    date: "2026-11-01",
    time: "02:15 PM",
    status: "Pending",
    payer: "Jibreel Mujeeb",
    email: "jibreel@example.com",
  },
  {
    id: 3,
    reference: "PAY-2026-00127",
    transactionId: "TXN-90812347",
    student: "Muhammad Ibrahim",
    studentId: "STU-2026-0061",
    className: "SS 1B",
    invoice: "INV-2026-00221",
    description: "Examination Fee",
    amount: 35000,
    method: "Cash",
    date: "2026-10-30",
    time: "09:40 AM",
    status: "Successful",
    payer: "Ibrahim Musa",
    email: "ibrahim@example.com",
  },
  {
    id: 4,
    reference: "PAY-2026-00128",
    transactionId: "TXN-90812348",
    student: "Fatimah Abdullahi",
    studentId: "STU-2026-0074",
    className: "JSS 2A",
    invoice: "INV-2026-00234",
    description: "ICT and Laboratory Fee",
    amount: 25000,
    method: "POS",
    date: "2026-10-28",
    time: "11:05 AM",
    status: "Failed",
    payer: "Abdullahi Yusuf",
    email: "abdullahi@example.com",
  },
  {
    id: 5,
    reference: "PAY-2026-00129",
    transactionId: "TXN-90812349",
    student: "Yusuf Ahmed",
    studentId: "STU-2026-0088",
    className: "SS 3A",
    invoice: "INV-2026-00240",
    description: "First Term School Fees",
    amount: 20000,
    method: "Paystack",
    date: "2026-10-25",
    time: "01:30 PM",
    status: "Successful",
    payer: "Ahmed Yusuf",
    email: "ahmed@example.com",
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const statusStyles = {
  Successful: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-red-50 text-red-700",
  Reversed: "bg-slate-100 text-slate-600",
};

function StatusBadge({ status }) {
  const Icon =
    status === "Successful" ? CheckCircle2 :
    status === "Pending" ? Clock3 :
    status === "Failed" ? XCircle : RefreshCw;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status] || statusStyles.Reversed}`}>
      <Icon size={13} />
      {status}
    </span>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, iconColor }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className={`rounded-lg p-2 ${iconColor}`}>
          <Icon size={19} />
        </div>
      </div>
      <h2 className="mt-4 text-2xl font-bold text-slate-900">{value}</h2>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}

export default function AdminPaymentHistory() {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const query = search.toLowerCase();

      const matchesSearch = [
        payment.student,
        payment.studentId,
        payment.reference,
        payment.transactionId,
        payment.invoice,
        payment.payer,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "All" || payment.status === statusFilter;

      const matchesMethod =
        methodFilter === "All" || payment.method === methodFilter;

      const matchesClass =
        classFilter === "All" || payment.className === classFilter;

      const matchesStart = !startDate || payment.date >= startDate;
      const matchesEnd = !endDate || payment.date <= endDate;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod &&
        matchesClass &&
        matchesStart &&
        matchesEnd
      );
    });
  }, [payments, search, statusFilter, methodFilter, classFilter, startDate, endDate]);

  const successfulPayments = payments.filter(
    (payment) => payment.status === "Successful"
  );

  const totalCollected = successfulPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const pendingPayments = payments.filter(
    (payment) => payment.status === "Pending"
  );

  const failedPayments = payments.filter(
    (payment) => payment.status === "Failed"
  );

  const pendingAmount = pendingPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const exportCSV = () => {
    const headers = [
      "Reference", "Transaction ID", "Student", "Student ID",
      "Class", "Invoice", "Description", "Amount", "Method",
      "Date", "Status", "Payer",
    ];

    const rows = filteredPayments.map((p) => [
      p.reference, p.transactionId, p.student, p.studentId,
      p.className, p.invoice, p.description, p.amount,
      p.method, p.date, p.status, p.payer,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "admin-payment-history.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const verifyPayment = (paymentId) => {
    setPayments((current) =>
      current.map((payment) =>
        payment.id === paymentId
          ? { ...payment, status: "Successful" }
          : payment
      )
    );

    setSelectedPayment((current) =>
      current?.id === paymentId
        ? { ...current, status: "Successful" }
        : current
    );
  };

  const printReceipt = (payment) => {
    const receiptWindow = window.open("", "_blank", "width=700,height=800");
    if (!receiptWindow) {
      alert("Please allow pop-ups to print the receipt.");
      return;
    }

    receiptWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payment Receipt - ${payment.reference}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 35px; color: #1e293b; }
          .header { text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; }
          h1 { margin-bottom: 5px; }
          .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
          .amount { font-size: 28px; font-weight: bold; text-align: center; margin: 25px 0; }
          .success { color: #047857; font-weight: bold; text-align: center; }
          @media print { button { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>School Payment Receipt</h1>
          <p>Official payment confirmation</p>
        </div>
        <div class="amount">${money(payment.amount)}</div>
        <p class="success">${payment.status}</p>
        ${[
          ["Receipt Reference", payment.reference],
          ["Transaction ID", payment.transactionId],
          ["Student", payment.student],
          ["Student ID", payment.studentId],
          ["Class", payment.className],
          ["Invoice", payment.invoice],
          ["Description", payment.description],
          ["Payment Method", payment.method],
          ["Payer", payment.payer],
          ["Date", payment.date],
          ["Time", payment.time],
        ].map(([label, value]) => `
          <div class="row"><span>${label}</span><strong>${value}</strong></div>
        `).join("")}
        <p style="text-align:center;margin-top:35px;">Thank you for your payment.</p>
        <script>window.onload = () => window.print();</script>
      </body>
      </html>
    `);
    receiptWindow.document.close();
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
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Admin</span>
              <span>/</span>
              <span className="text-slate-800">Payment History</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
              Payment History
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Monitor, verify and manage all school payment transactions.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <Download size={17} />
            Export Records
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Collected"
            value={money(totalCollected)}
            subtitle={`${successfulPayments.length} successful transactions`}
            icon={Wallet}
            iconColor="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Successful Payments"
            value={successfulPayments.length}
            subtitle="Verified transactions"
            icon={CheckCircle2}
            iconColor="bg-blue-50 text-blue-600"
          />
          <StatCard
            title="Pending Payments"
            value={pendingPayments.length}
            subtitle={`${money(pendingAmount)} awaiting verification`}
            icon={Clock3}
            iconColor="bg-amber-50 text-amber-600"
          />
          <StatCard
            title="Failed Payments"
            value={failedPayments.length}
            subtitle="Transactions not completed"
            icon={XCircle}
            iconColor="bg-red-50 text-red-600"
          />
        </div>

        {/* Collection summary */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">Collection Overview</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Breakdown of recorded transaction statuses
                </p>
              </div>
              <TrendingUp className="text-emerald-600" size={21} />
            </div>

            <div className="mt-5 space-y-4">
              {[
                { label: "Successful", count: successfulPayments.length, color: "bg-emerald-500" },
                { label: "Pending", count: pendingPayments.length, color: "bg-amber-400" },
                { label: "Failed", count: failedPayments.length, color: "bg-red-500" },
              ].map((item) => {
                const percentage = payments.length
                  ? (item.count / payments.length) * 100
                  : 0;

                return (
                  <div key={item.label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-slate-600">{item.label}</span>
                      <span className="font-semibold text-slate-900">
                        {item.count} ({Math.round(percentage)}%)
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <CreditCard className="text-blue-600" size={20} />
              <h3 className="font-semibold text-slate-900">Payment Methods</h3>
            </div>
            <div className="mt-4 space-y-4">
              {["Paystack", "Bank Transfer", "Cash", "POS"].map((method) => {
                const count = payments.filter((p) => p.method === method).length;
                return (
                  <div key={method} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{method}</span>
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {count} transactions
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-slate-500" />
              <h3 className="font-semibold text-slate-900">Filter Transactions</h3>
            </div>
            <button
              onClick={resetFilters}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Reset filters
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <div className="relative xl:col-span-2">
              <Search className="absolute left-3 top-3 text-slate-400" size={17} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student, reference, invoice..."
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Successful">Successful</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Reversed">Reversed</option>
            </select>

            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
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
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
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
                className="min-w-0 w-full rounded-lg border border-slate-200 px-2 py-2 text-xs outline-none focus:border-blue-500"
              />
              <input
                type="date"
                aria-label="End date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="min-w-0 w-full rounded-lg border border-slate-200 px-2 py-2 text-xs outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Transactions table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-col justify-between gap-2 border-b border-slate-200 p-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-semibold text-slate-900">All Transactions</h3>
              <p className="mt-1 text-xs text-slate-500">
                Showing {filteredPayments.length} of {payments.length} transactions
              </p>
            </div>
            <span className="text-xs text-slate-500">
              Amounts displayed in Nigerian Naira (₦)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Student</th>
                  <th className="px-5 py-4 font-semibold">Reference</th>
                  <th className="px-5 py-4 font-semibold">Invoice</th>
                  <th className="px-5 py-4 font-semibold">Amount</th>
                  <th className="px-5 py-4 font-semibold">Method</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">{payment.student}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {payment.studentId} · {payment.className}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-800">{payment.reference}</p>
                      <p className="mt-1 text-xs text-slate-400">{payment.transactionId}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{payment.invoice}</td>
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {money(payment.amount)}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{payment.method}</td>
                    <td className="px-5 py-4 text-slate-600">
                      <p>{payment.date}</p>
                      <p className="mt-1 text-xs text-slate-400">{payment.time}</p>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={payment.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          title="View payment"
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => printReceipt(payment)}
                          title="Print receipt"
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                        >
                          <Printer size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredPayments.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-5 py-14 text-center">
                      <Receipt className="mx-auto mb-3 text-slate-300" size={35} />
                      <p className="font-semibold text-slate-700">No payments found</p>
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

        {/* Payment details modal */}
        {selectedPayment && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
            onClick={() => setSelectedPayment(null)}
          >
            <div
              className="my-auto w-full max-w-2xl rounded-2xl bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 p-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Payment Details</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {selectedPayment.reference}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5 p-5">
                <div className="rounded-xl bg-slate-50 p-5 text-center">
                  <p className="text-sm text-slate-500">Payment Amount</p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    {money(selectedPayment.amount)}
                  </h2>
                  <div className="mt-3">
                    <StatusBadge status={selectedPayment.status} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    ["Student Name", selectedPayment.student],
                    ["Student ID", selectedPayment.studentId],
                    ["Class", selectedPayment.className],
                    ["Payer", selectedPayment.payer],
                    ["Payer Email", selectedPayment.email],
                    ["Invoice Number", selectedPayment.invoice],
                    ["Description", selectedPayment.description],
                    ["Payment Method", selectedPayment.method],
                    ["Transaction ID", selectedPayment.transactionId],
                    ["Payment Date", `${selectedPayment.date} · ${selectedPayment.time}`],
                  ].map(([label, value]) => (
                    <div key={label} className="border-b border-slate-100 pb-3">
                      <p className="text-xs text-slate-500">{label}</p>
                      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-between">
                  <button
                    onClick={() => printReceipt(selectedPayment)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Printer size={16} />
                    Print Receipt
                  </button>

                  {selectedPayment.status === "Pending" && (
                    <button
                      onClick={() => verifyPayment(selectedPayment.id)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      <Check size={16} />
                      Mark as Verified
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
