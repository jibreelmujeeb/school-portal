import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Download,
  FileText,
  Filter,
  Mail,
  MoreHorizontal,
  Printer,
  Receipt,
  Search,
  Users,
  Wallet,
  X,
} from "lucide-react";

const initialRecords = [
  {
    id: 1,
    studentId: "STU-2026-0012",
    student: "Abdulrahman Jibreel",
    className: "SS 2A",
    department: "Science",
    invoice: "INV-2026-00125",
    fee: "School Fees",
    session: "2026/2027",
    term: "First Term",
    total: 200000,
    paid: 100000,
    dueDate: "30 Sep 2026",
    status: "Partially Paid",
  },
  {
    id: 2,
    studentId: "STU-2026-0045",
    student: "Aisha Jibreel",
    className: "JSS 3B",
    department: "Junior School",
    invoice: "INV-2026-00205",
    fee: "School Fees",
    session: "2026/2027",
    term: "First Term",
    total: 180000,
    paid: 80000,
    dueDate: "30 Sep 2026",
    status: "Partially Paid",
  },
  {
    id: 3,
    studentId: "STU-2026-0081",
    student: "Muhammad Ibrahim",
    className: "SS 1B",
    department: "Arts",
    invoice: "INV-2026-00221",
    fee: "School Fees",
    session: "2026/2027",
    term: "First Term",
    total: 220000,
    paid: 0,
    dueDate: "15 Sep 2026",
    status: "Overdue",
  },
  {
    id: 4,
    studentId: "STU-2026-0094",
    student: "Fatimah Abdullahi",
    className: "JSS 2A",
    department: "Junior School",
    invoice: "INV-2026-00234",
    fee: "Examination Fee",
    session: "2026/2027",
    term: "First Term",
    total: 35000,
    paid: 0,
    dueDate: "25 Sep 2026",
    status: "Unpaid",
  },
  {
    id: 5,
    studentId: "STU-2026-0108",
    student: "Yusuf Ahmed",
    className: "SS 3A",
    department: "Science",
    invoice: "INV-2026-00240",
    fee: "ICT & Laboratory Fee",
    session: "2026/2027",
    term: "First Term",
    total: 30000,
    paid: 10000,
    dueDate: "10 Sep 2026",
    status: "Overdue",
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

function StatusBadge({ status }) {
  const styles = {
    Paid:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Partially Paid":
      "bg-amber-50 text-amber-700 border-amber-200",
    Unpaid:
      "bg-red-50 text-red-700 border-red-200",
    Overdue:
      "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[status] ||
        "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >
      {status === "Overdue" && <AlertCircle size={13} />}
      {status}
    </span>
  );
}

function StatCard({ icon: Icon, title, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
          <Icon size={21} className="text-slate-700" />
        </div>
      </div>
    </div>
  );
}

export default function AdminOutstanding() {
  const [records, setRecords] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] =
    useState("All");
  const [selected, setSelected] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [paymentRecord, setPaymentRecord] = useState(null);
  const [paymentError, setPaymentError] = useState("");
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    method: "Bank Transfer",
    reference: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [reminderRecords, setReminderRecords] = useState([]);
  const [reminderMessage, setReminderMessage] = useState("");
  const [showFinancialReport, setShowFinancialReport] = useState(false);
  const [notice, setNotice] = useState("");

  const totalInvoiced = records.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const totalCollected = records.reduce(
    (sum, item) => sum + item.paid,
    0
  );

  const totalOutstanding = records.reduce(
    (sum, item) => sum + (item.total - item.paid),
    0
  );

  const overdueRecords = records.filter(
    (item) => item.status === "Overdue"
  );

  const overdueAmount = overdueRecords.reduce(
    (sum, item) => sum + (item.total - item.paid),
    0
  );

  const collectionRate =
    totalInvoiced > 0
      ? Math.round(
          (totalCollected / totalInvoiced) * 100
        )
      : 0;

  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      const text = search.toLowerCase();

      const matchesSearch =
        item.student.toLowerCase().includes(text) ||
        item.studentId.toLowerCase().includes(text) ||
        item.invoice.toLowerCase().includes(text) ||
        item.fee.toLowerCase().includes(text);

      const matchesClass =
        classFilter === "All" ||
        item.className === classFilter;

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        item.department === departmentFilter;

      return (
        matchesSearch &&
        matchesClass &&
        matchesStatus &&
        matchesDepartment
      );
    });
  }, [
    records,
    search,
    classFilter,
    statusFilter,
    departmentFilter,
  ]);

  const toggleRow = (id) => {
    setSelectedRows((current) =>
      current.includes(id)
        ? current.filter((rowId) => rowId !== id)
        : [...current, id]
    );
  };

  const toggleAll = () => {
    if (
      selectedRows.length === filteredRecords.length
    ) {
      setSelectedRows([]);
    } else {
      setSelectedRows(
        filteredRecords.map((item) => item.id)
      );
    }
  };

  const exportRecords = (items, filename) => {
    const headers = [
      "Student ID", "Student", "Class", "Department", "Invoice", "Fee",
      "Session", "Term", "Total", "Paid", "Outstanding", "Due Date", "Status",
    ];
    const rows = items.map((item) => [
      item.studentId,
      item.student,
      item.className,
      item.department,
      item.invoice,
      item.fee,
      item.session,
      item.term,
      item.total,
      item.paid,
      item.total - item.paid,
      item.dueDate,
      item.status,
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const recordPayment = (record) => {
    setPaymentRecord(record);
    setPaymentError("");
    setPaymentForm({
      amount: "",
      method: "Bank Transfer",
      reference: "",
      date: new Date().toISOString().slice(0, 10),
    });
  };

  const submitPayment = (event) => {
    event.preventDefault();
    const amount = Number(paymentForm.amount);
    if (!paymentRecord || !Number.isFinite(amount) || amount <= 0) {
      setPaymentError("Enter a valid payment amount.");
      return;
    }

    const balance = paymentRecord.total - paymentRecord.paid;
    if (amount > balance) {
      setPaymentError(`Payment cannot exceed the outstanding balance of ${formatCurrency(balance)}.`);
      return;
    }

    const payment = {
      amount,
      method: paymentForm.method,
      date: paymentForm.date,
      reference: paymentForm.reference.trim() || `PAY-${Date.now()}`,
    };
    const updatedRecord = {
      ...paymentRecord,
      paid: paymentRecord.paid + amount,
      payments: [...(paymentRecord.payments || []), payment],
      status:
        paymentRecord.paid + amount >= paymentRecord.total
          ? "Paid"
          : paymentRecord.status,
    };
    setRecords((current) =>
      current.map((record) =>
        record.id === paymentRecord.id ? updatedRecord : record
      )
    );
    setSelected((current) =>
      current?.id === paymentRecord.id ? updatedRecord : current
    );
    setPaymentRecord(null);
    setNotice(`Payment of ${formatCurrency(amount)} recorded locally for ${paymentRecord.student}.`);
  };

  const prepareReminder = (items) => {
    const recipients = items.filter((item) => item.total > item.paid);
    if (recipients.length === 0) {
      setNotice("There are no outstanding accounts to remind.");
      return;
    }
    setReminderRecords(recipients);
    setReminderMessage(
      `Dear Parent/Guardian, this is a reminder that ${recipients.length === 1 ? `${recipients[0].student}'s` : "your student's"} account has an outstanding balance. Please contact the school to arrange payment.`
    );
  };

  const sendReminder = (record) => {
    prepareReminder([record]);
  };

  const copyReminderDraft = async () => {
    try {
      await navigator.clipboard.writeText(reminderMessage);
      setNotice("Reminder draft copied. No messages have been sent.");
      setReminderRecords([]);
    } catch {
      setNotice("Clipboard access is unavailable; select and copy the reminder text. No messages have been sent.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Wallet size={16} />
              <span>Admin</span>
              <span>/</span>
              <span>Outstanding Fees</span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Outstanding Fees
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor school-wide unpaid balances and financial
              collections.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => exportRecords(filteredRecords, "outstanding-fees-report.csv")}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Download size={16} />
              Export Report
            </button>

            <button
              onClick={() => setShowFinancialReport(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Receipt size={16} />
              Financial Reports
            </button>
          </div>
        </div>

        {notice && (
          <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            <span>{notice}</span>
            <button type="button" onClick={() => setNotice("")} aria-label="Dismiss notice">
              <X size={17} />
            </button>
          </div>
        )}

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            icon={Wallet}
            title="Total Outstanding"
            value={formatCurrency(totalOutstanding)}
            description="Current unpaid balance"
          />

          <StatCard
            icon={AlertCircle}
            title="Overdue Amount"
            value={formatCurrency(overdueAmount)}
            description="Past due date"
          />

          <StatCard
            icon={Users}
            title="Outstanding Students"
            value={records.filter((record) => record.total > record.paid).length}
            description="Students with balances"
          />

          <StatCard
            icon={Bell}
            title="Overdue Students"
            value={overdueRecords.length}
            description="Require follow-up"
          />

          <StatCard
            icon={CheckCircle2}
            title="Collection Rate"
            value={`${collectionRate}%`}
            description="Invoice collection"
          />
        </div>

        {/* Collection Summary */}
        <div className="my-6 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Collection Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current session invoice collection performance.
              </p>
            </div>

            <span className="text-sm font-semibold text-slate-700">
              {collectionRate}% collected
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-900"
              style={{
                width: `${collectionRate}%`,
              }}
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs text-slate-500">
                Total Invoiced
              </p>
              <p className="mt-1 font-bold text-slate-900">
                {formatCurrency(totalInvoiced)}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Total Collected
              </p>
              <p className="mt-1 font-bold text-emerald-600">
                {formatCurrency(totalCollected)}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Outstanding
              </p>
              <p className="mt-1 font-bold text-red-600">
                {formatCurrency(totalOutstanding)}
              </p>
            </div>
          </div>
        </div>

        {/* Aging */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Outstanding Aging
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Distribution of outstanding balances by age.
              </p>
            </div>

            <CalendarDays
              size={20}
              className="text-slate-400"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {[
              ["Current", "₦255,000"],
              ["1–7 Days", "₦70,000"],
              ["8–30 Days", "₦125,000"],
              ["31–60 Days", "₦80,000"],
              ["61–90 Days", "₦45,000"],
              ["90+ Days", "₦25,000"],
            ].map(([label, amount]) => (
              <div
                key={label}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="text-xs text-slate-500">
                  {label}
                </p>

                <p className="mt-2 font-bold text-slate-900">
                  {amount}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search student, ID, invoice or fee..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-slate-400"
              />
            </div>

            <select
              value={classFilter}
              onChange={(e) =>
                setClassFilter(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="All">All Classes</option>
              <option value="JSS 2A">JSS 2A</option>
              <option value="JSS 3B">JSS 3B</option>
              <option value="SS 1B">SS 1B</option>
              <option value="SS 2A">SS 2A</option>
              <option value="SS 3A">SS 3A</option>
            </select>

            <select
              value={departmentFilter}
              onChange={(e) =>
                setDepartmentFilter(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="All">All Departments</option>
              <option value="Science">Science</option>
              <option value="Arts">Arts</option>
              <option value="Junior School">
                Junior School
              </option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="All">All Status</option>
              <option value="Overdue">Overdue</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Partially Paid">
                Partially Paid
              </option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>

        {/* Bulk actions */}
        {selectedRows.length > 0 && (
          <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-700">
              {selectedRows.length} record(s) selected
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => prepareReminder(
                  records.filter((record) => selectedRows.includes(record.id))
                )}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                <Mail size={16} />
                Send Reminders
              </button>

              <button
                onClick={() => exportRecords(
                  records.filter((record) => selectedRows.includes(record.id)),
                  "selected-outstanding-fees.csv"
                )}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                <Download size={16} />
                Export Selected
              </button>
            </div>
          </div>
        )}

        {paymentRecord && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
            <form
              onSubmit={submitPayment}
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Record payment</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {paymentRecord.student} · Balance {formatCurrency(paymentRecord.total - paymentRecord.paid)}
                  </p>
                </div>
                <button type="button" onClick={() => setPaymentRecord(null)} aria-label="Close payment form">
                  <X size={19} />
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">
                  Amount
                  <input
                    type="number"
                    min="1"
                    max={paymentRecord.total - paymentRecord.paid}
                    step="1"
                    required
                    value={paymentForm.amount}
                    onChange={(event) => setPaymentForm({ ...paymentForm, amount: event.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Payment method
                  <select
                    value={paymentForm.method}
                    onChange={(event) => setPaymentForm({ ...paymentForm, method: event.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5"
                  >
                    <option>Bank Transfer</option>
                    <option>Cash</option>
                    <option>POS</option>
                    <option>Paystack</option>
                  </select>
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Payment date
                  <input
                    type="date"
                    required
                    value={paymentForm.date}
                    onChange={(event) => setPaymentForm({ ...paymentForm, date: event.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Reference (optional)
                  <input
                    value={paymentForm.reference}
                    onChange={(event) => setPaymentForm({ ...paymentForm, reference: event.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5"
                  />
                </label>
              </div>
              {paymentError && (
                <p role="alert" className="mt-4 text-sm text-red-600">{paymentError}</p>
              )}
              <div className="mt-6 flex justify-end gap-2">
                <button type="button" onClick={() => setPaymentRecord(null)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold">
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">
                  Record payment
                </button>
              </div>
            </form>
          </div>
        )}

        {reminderRecords.length > 0 && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
                <section role="dialog" aria-modal="true" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Reminder draft</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Prepared for {reminderRecords.length} account(s). Messaging is not connected; nothing has been sent.
                  </p>
                </div>
                <button type="button" onClick={() => setReminderRecords([])} aria-label="Close reminder draft">
                  <X size={19} />
                </button>
              </div>
              <div className="mb-3 max-h-32 overflow-y-auto rounded-lg bg-slate-50 p-3 text-sm">
                {reminderRecords.map((record) => (
                  <p key={record.id} className="py-1">{record.student} · {record.invoice} · {formatCurrency(record.total - record.paid)}</p>
                ))}
              </div>
              <textarea
                rows={4}
                value={reminderMessage}
                onChange={(event) => setReminderMessage(event.target.value)}
                className="w-full rounded-lg border border-slate-200 p-3 text-sm"
                aria-label="Reminder message draft"
              />
              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setReminderRecords([])} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold">
                  Close
                </button>
                <button type="button" onClick={copyReminderDraft} className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">
                  Copy draft
                </button>
              </div>
            </section>
          </div>
        )}

        {showFinancialReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowFinancialReport(false)}>
            <section role="dialog" aria-modal="true" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl" onClick={(event) => event.stopPropagation()}>
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Outstanding fee summary</h2>
                  <p className="mt-1 text-sm text-slate-500">Calculated from the local outstanding-fee records.</p>
                </div>
                <button type="button" onClick={() => setShowFinancialReport(false)} aria-label="Close financial report"><X size={19} /></button>
              </div>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between"><dt>Total invoiced</dt><dd className="font-semibold">{formatCurrency(totalInvoiced)}</dd></div>
                <div className="flex justify-between"><dt>Collected</dt><dd className="font-semibold text-emerald-700">{formatCurrency(totalCollected)}</dd></div>
                <div className="flex justify-between"><dt>Outstanding</dt><dd className="font-semibold text-red-700">{formatCurrency(totalOutstanding)}</dd></div>
                <div className="flex justify-between"><dt>Overdue amount</dt><dd className="font-semibold">{formatCurrency(overdueAmount)}</dd></div>
                <div className="flex justify-between"><dt>Collection rate</dt><dd className="font-semibold">{collectionRate}%</dd></div>
              </dl>
              <div className="mt-6 flex justify-end gap-2">
                <button type="button" onClick={() => setShowFinancialReport(false)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold">Close</button>
                <button type="button" onClick={() => exportRecords(filteredRecords, "outstanding-fees-report.csv")} className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">Export CSV</button>
              </div>
            </section>
          </div>
        )}

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-5">
            <h2 className="font-bold text-slate-900">
              Outstanding Student Accounts
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredRecords.length} outstanding record(s)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={
                        filteredRecords.length > 0 &&
                        selectedRows.length ===
                          filteredRecords.length
                      }
                      onChange={toggleAll}
                    />
                  </th>

                  <th className="px-5 py-4">Student</th>
                  <th className="px-5 py-4">Invoice</th>
                  <th className="px-5 py-4">Fee</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Paid</th>
                  <th className="px-5 py-4">Outstanding</th>
                  <th className="px-5 py-4">Due Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => {
                  const balance =
                    record.total - record.paid;

                  return (
                    <tr
                      key={record.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(
                            record.id
                          )}
                          onChange={() =>
                            toggleRow(record.id)
                          }
                        />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-bold">
                            {record.student
                              .split(" ")
                              .map((word) => word[0])
                              .slice(0, 2)
                              .join("")}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {record.student}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {record.studentId} ·{" "}
                              {record.className}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <button
                          onClick={() =>
                            setSelected(record)
                          }
                          className="font-semibold text-slate-900 hover:underline"
                        >
                          {record.invoice}
                        </button>

                        <p className="mt-1 text-xs text-slate-500">
                          {record.term}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm">
                        {record.fee}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold">
                        {formatCurrency(record.total)}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-emerald-600">
                        {formatCurrency(record.paid)}
                      </td>

                      <td className="px-5 py-4 text-sm font-bold text-red-600">
                        {formatCurrency(balance)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarDays size={15} />
                          {record.dueDate}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={record.status}
                        />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              recordPayment(record)
                            }
                            className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                          >
                            Payment
                          </button>

                          <button
                            onClick={() =>
                              setSelected(record)
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                          >
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredRecords.length === 0 && (
              <div className="px-5 py-16 text-center">
                <CheckCircle2
                  size={42}
                  className="mx-auto text-emerald-500"
                />

                <h3 className="mt-4 font-semibold text-slate-900">
                  No outstanding records
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  No student accounts match the selected filters.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom summary */}
        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">
              School-wide outstanding balance
            </p>

            <p className="mt-1 text-2xl font-bold text-red-600">
              {formatCurrency(totalOutstanding)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => prepareReminder(filteredRecords)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Bell size={16} />
              Send Reminders
            </button>

            <button
              onClick={() => exportRecords(filteredRecords, "outstanding-fees-report.csv")}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
            >
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Invoice Details
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {selected.invoice}
                </h2>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 font-bold">
                    {selected.student
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {selected.student}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {selected.studentId} ·{" "}
                      {selected.className}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">
                    Invoice Total
                  </p>

                  <p className="mt-1 font-bold">
                    {formatCurrency(selected.total)}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">
                    Amount Paid
                  </p>

                  <p className="mt-1 font-bold text-emerald-600">
                    {formatCurrency(selected.paid)}
                  </p>
                </div>

                <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                  <p className="text-xs text-red-600">
                    Outstanding
                  </p>

                  <p className="mt-1 font-bold text-red-700">
                    {formatCurrency(
                      selected.total - selected.paid
                    )}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">
                    Due Date
                  </p>

                  <p className="mt-1 font-semibold">
                    {selected.dueDate}
                  </p>
                </div>
              </div>

              {selected.payments?.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-slate-800">Payments recorded in this view</h3>
                  <div className="overflow-x-auto rounded-lg border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500">
                        <tr>
                          <th className="px-3 py-2">Date</th>
                          <th className="px-3 py-2">Method</th>
                          <th className="px-3 py-2">Reference</th>
                          <th className="px-3 py-2 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selected.payments.map((payment, index) => (
                          <tr key={`${payment.reference}-${index}`} className="border-t border-slate-100">
                            <td className="px-3 py-2">{payment.date}</td>
                            <td className="px-3 py-2">{payment.method}</td>
                            <td className="px-3 py-2">{payment.reference}</td>
                            <td className="px-3 py-2 text-right font-medium">{formatCurrency(payment.amount)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-5">
                <button
                  onClick={() => sendReminder(selected)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
                >
                  <Mail size={16} />
                  Send Reminder
                </button>

                <button
                  onClick={() => exportRecords(
                    [selected],
                    `${selected.invoice.toLowerCase()}.csv`
                  )}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
                >
                  <Download size={16} />
                  Download
                </button>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
                >
                  <Printer size={16} />
                  Print
                </button>

                <button
                  onClick={() => recordPayment(selected)}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <CreditCard size={16} />
                  Record Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}