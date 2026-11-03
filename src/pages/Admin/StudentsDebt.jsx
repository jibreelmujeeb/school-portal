
import React, { useMemo, useState } from "react";
import {
  Search, Download, Printer, Eye, Wallet, Users, AlertTriangle,
  TrendingUp, X, CreditCard, Bell, Clock, FileText, CheckCircle2,
  ChevronDown, Phone, Mail, CalendarDays, Filter, MoreVertical,
  Receipt, ArrowUpRight, Banknote, History
} from "lucide-react";

const initialDebtors = [
  {
    id: 1,
    name: "Abdulrahman Jibreel",
    admissionNo: "STU-2026-0012",
    className: "SS 2A",
    department: "Science",
    parent: "Jibreel Mujeeb",
    phone: "08012345678",
    email: "parent@example.com",
    session: "2026/2027",
    term: "First Term",
    invoiceNo: "INV-2026-00125",
    feeType: "School Fees",
    totalBilled: 200000,
    amountPaid: 100000,
    balance: 100000,
    dueDate: "2026-09-30",
    payments: [
      { date: "2026-09-10", amount: 60000, method: "Bank Transfer", reference: "PAY-001" },
      { date: "2026-10-05", amount: 40000, method: "Cash", reference: "PAY-002" },
    ],
  },
  {
    id: 2,
    name: "Aisha Jibreel",
    admissionNo: "STU-2026-0045",
    className: "JSS 3B",
    department: "Junior School",
    parent: "Jibreel Mujeeb",
    phone: "08012345678",
    email: "parent@example.com",
    session: "2026/2027",
    term: "First Term",
    invoiceNo: "INV-2026-00205",
    feeType: "School Fees",
    totalBilled: 180000,
    amountPaid: 80000,
    balance: 100000,
    dueDate: "2026-09-30",
    payments: [
      { date: "2026-09-15", amount: 80000, method: "Bank Transfer", reference: "PAY-003" },
    ],
  },
  {
    id: 3,
    name: "Muhammad Ibrahim",
    admissionNo: "STU-2026-0061",
    className: "SS 1B",
    department: "Arts",
    parent: "Ibrahim Musa",
    phone: "08023456789",
    email: "ibrahim@example.com",
    session: "2026/2027",
    term: "First Term",
    invoiceNo: "INV-2026-00221",
    feeType: "School Fees",
    totalBilled: 220000,
    amountPaid: 0,
    balance: 220000,
    dueDate: "2026-08-15",
    payments: [],
  },
  {
    id: 4,
    name: "Fatimah Abdullahi",
    admissionNo: "STU-2026-0074",
    className: "JSS 2A",
    department: "Junior School",
    parent: "Abdullahi Yusuf",
    phone: "08034567890",
    email: "abdullahi@example.com",
    session: "2026/2027",
    term: "First Term",
    invoiceNo: "INV-2026-00234",
    feeType: "Examination Fee",
    totalBilled: 35000,
    amountPaid: 0,
    balance: 35000,
    dueDate: "2026-10-25",
    payments: [],
  },
  {
    id: 5,
    name: "Yusuf Ahmed",
    admissionNo: "STU-2026-0088",
    className: "SS 3A",
    department: "Science",
    parent: "Ahmed Yusuf",
    phone: "08045678901",
    email: "ahmed@example.com",
    session: "2026/2027",
    term: "First Term",
    invoiceNo: "INV-2026-00240",
    feeType: "ICT & Laboratory Fee",
    totalBilled: 30000,
    amountPaid: 10000,
    balance: 20000,
    dueDate: "2026-09-10",
    payments: [
      { date: "2026-09-05", amount: 10000, method: "Cash", reference: "PAY-004" },
    ],
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount || 0);

const getDebtStatus = (debtor) => {
  if (debtor.balance <= 0) return "Paid";
  if (new Date(debtor.dueDate) < new Date("2026-11-02")) return "Overdue";
  return "Outstanding";
};

const statusStyles = {
  Paid: "bg-emerald-50 text-emerald-700",
  Outstanding: "bg-amber-50 text-amber-700",
  Overdue: "bg-red-50 text-red-700",
};

function StatusBadge({ status }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

function StatCard({ title, value, icon: Icon, color, description }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

function Modal({ title, onClose, children, size = "max-w-2xl" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className={`max-h-[90vh] w-full ${size} overflow-y-auto rounded-2xl bg-white`}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <h2 className="font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <X size={19} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export default function AdminStudentDebtors() {
  const [debtors, setDebtors] = useState(initialDebtors);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");
  const [sessionFilter, setSessionFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    method: "Bank Transfer",
    reference: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [reminderMessage, setReminderMessage] = useState(
    "Dear Parent/Guardian, this is a reminder that your child's school fees are outstanding. Kindly make payment as soon as possible. Thank you."
  );
  const [notice, setNotice] = useState("");

  const filteredDebtors = useMemo(() => {
    return debtors.filter((item) => {
      const query = search.toLowerCase();
      const status = getDebtStatus(item);

      const matchesSearch = [
        item.name,
        item.admissionNo,
        item.parent,
        item.invoiceNo,
      ].some((value) => value.toLowerCase().includes(query));

      return (
        matchesSearch &&
        (statusFilter === "All" || status === statusFilter) &&
        (classFilter === "All" || item.className === classFilter) &&
        (sessionFilter === "All" || item.session === sessionFilter)
      );
    });
  }, [debtors, search, statusFilter, classFilter, sessionFilter]);

  const outstandingDebtors = debtors.filter((d) => d.balance > 0);
  const totalOutstanding = outstandingDebtors.reduce((sum, d) => sum + d.balance, 0);
  const overdueDebtors = outstandingDebtors.filter((d) => getDebtStatus(d) === "Overdue");
  const overdueAmount = overdueDebtors.reduce((sum, d) => sum + d.balance, 0);
  const totalBilled = debtors.reduce((sum, d) => sum + d.totalBilled, 0);
  const totalCollected = debtors.reduce((sum, d) => sum + d.amountPaid, 0);
  const collectionRate = totalBilled ? Math.round((totalCollected / totalBilled) * 100) : 0;

  const stats = [
    {
      title: "Total Outstanding",
      value: money(totalOutstanding),
      icon: Wallet,
      color: "bg-indigo-50 text-indigo-600",
      description: "Unpaid student balances",
    },
    {
      title: "Overdue Debt",
      value: money(overdueAmount),
      icon: AlertTriangle,
      color: "bg-red-50 text-red-600",
      description: "Past payment due date",
    },
    {
      title: "Students in Debt",
      value: outstandingDebtors.length,
      icon: Users,
      color: "bg-amber-50 text-amber-600",
      description: "Students with unpaid fees",
    },
    {
      title: "Overdue Students",
      value: overdueDebtors.length,
      icon: Clock,
      color: "bg-orange-50 text-orange-600",
      description: "Require payment follow-up",
    },
  ];

  const recordPayment = (e) => {
    e.preventDefault();
    const amount = Number(paymentForm.amount);

    if (!selected || !amount || amount <= 0) {
      alert("Enter a valid payment amount.");
      return;
    }

    if (amount > selected.balance) {
      alert("Payment cannot exceed the outstanding balance.");
      return;
    }

    const payment = {
      date: paymentForm.date,
      amount,
      method: paymentForm.method,
      reference: paymentForm.reference || `PAY-${Date.now()}`,
    };

    setDebtors((prev) =>
      prev.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              amountPaid: item.amountPaid + amount,
              balance: item.balance - amount,
              payments: [...item.payments, payment],
            }
          : item
      )
    );

    setSelected((prev) => ({
      ...prev,
      amountPaid: prev.amountPaid + amount,
      balance: prev.balance - amount,
      payments: [...prev.payments, payment],
    }));

    setShowPayment(false);
    setPaymentForm({
      amount: "",
      method: "Bank Transfer",
      reference: "",
      date: new Date().toISOString().slice(0, 10),
    });
    setNotice("Payment recorded successfully.");
  };

  const sendReminder = () => {
    if (!selected) return;
    setNotice(`Reminder prepared for ${selected.parent} (${selected.phone}). Connect your SMS or email service to send it.`);
    setShowReminder(false);
  };

  const sendBulkReminder = () => {
    const count = filteredDebtors.filter((d) => d.balance > 0).length;
    setNotice(`Bulk reminder prepared for ${count} outstanding student account(s). Connect your messaging service to send.`);
  };

  const exportCSV = () => {
    const headers = [
      "Student", "Admission Number", "Class", "Department", "Parent",
      "Phone", "Invoice", "Fee Type", "Total Billed", "Amount Paid",
      "Balance", "Due Date", "Status",
    ];

    const rows = filteredDebtors.map((d) => [
      d.name, d.admissionNo, d.className, d.department, d.parent,
      d.phone, d.invoiceNo, d.feeType, d.totalBilled, d.amountPaid,
      d.balance, d.dueDate, getDebtStatus(d),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "student-debtors-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    const rows = filteredDebtors.map((d) => `
      <tr>
        <td>${d.name}</td>
        <td>${d.admissionNo}</td>
        <td>${d.className}</td>
        <td>${d.invoiceNo}</td>
        <td>₦${d.totalBilled.toLocaleString()}</td>
        <td>₦${d.amountPaid.toLocaleString()}</td>
        <td>₦${d.balance.toLocaleString()}</td>
        <td>${getDebtStatus(d)}</td>
      </tr>
    `).join("");

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Student Debtors Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 25px; color: #1e293b; }
          h1, p { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 25px; font-size: 12px; }
          th, td { border: 1px solid #ddd; padding: 9px; text-align: left; }
          th { background: #f1f5f9; }
          .total { margin-top: 20px; font-weight: bold; text-align: right; }
        </style>
      </head>
      <body>
        <h1>JIBREEL MODEL SCHOOL</h1>
        <p>STUDENT DEBTORS REPORT</p>
        <table>
          <thead><tr><th>Student</th><th>Admission No.</th><th>Class</th><th>Invoice</th><th>Billed</th><th>Paid</th><th>Balance</th><th>Status</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <p class="total">Outstanding balance: ₦${filteredDebtors.reduce((sum, d) => sum + d.balance, 0).toLocaleString()}</p>
        <script>window.onload = () => window.print();</script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const agingBuckets = [
    { label: "1–30 days", min: 1, max: 30, color: "bg-amber-500" },
    { label: "31–60 days", min: 31, max: 60, color: "bg-orange-500" },
    { label: "61–90 days", min: 61, max: 90, color: "bg-red-500" },
    { label: "Over 90 days", min: 91, max: Infinity, color: "bg-rose-700" },
  ];

  const getDaysOverdue = (date) =>
    Math.max(0, Math.floor((new Date("2026-11-02") - new Date(date)) / 86400000));

  const agingData = agingBuckets.map((bucket) => {
    const matching = outstandingDebtors.filter((d) => {
      const days = getDaysOverdue(d.dueDate);
      return days >= bucket.min && days <= bucket.max;
    });
    return {
      ...bucket,
      count: matching.length,
      amount: matching.reduce((sum, d) => sum + d.balance, 0),
    };
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <span>Admin</span><span>/</span>
              <span className="text-indigo-600">Student Debtors</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Student Debtors Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Monitor unpaid fees, overdue balances, and student payment records.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={printReport} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <Printer size={17} /> Print
            </button>
            <button onClick={exportCSV} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <Download size={17} /> Export
            </button>
            <button onClick={sendBulkReminder} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
              <Bell size={17} /> Bulk Reminder
            </button>
          </div>
        </div>

        {notice && (
          <div className="flex items-start justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <span>{notice}</span>
            <button onClick={() => setNotice("")}><X size={17} /></button>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => <StatCard key={stat.title} {...stat} />)}
        </div>

        {/* Collection overview */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-bold text-slate-900">Fee Collection Overview</h2>
                <p className="mt-1 text-sm text-slate-500">Billed amount compared with payments received.</p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs text-slate-500">Total Billed</p>
                <p className="mt-1 text-xl font-bold text-slate-900">{money(totalBilled)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Collected</p>
                <p className="mt-1 text-xl font-bold text-emerald-600">{money(totalCollected)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Outstanding</p>
                <p className="mt-1 text-xl font-bold text-red-600">{money(totalOutstanding)}</p>
              </div>
            </div>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-600">Collection rate</span>
                <span className="font-bold text-slate-900">{collectionRate}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${collectionRate}%` }} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-bold text-slate-900">Debt Aging Analysis</h2>
            <p className="mt-1 text-sm text-slate-500">Outstanding balances by overdue period.</p>
            <div className="mt-4 space-y-4">
              {agingData.map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-semibold text-slate-900">{money(item.amount)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${totalOutstanding ? (item.amount / totalOutstanding) * 100 : 0}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{item.count} student(s)</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Debtors table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-5">
            <div className="mb-4">
              <h2 className="font-bold text-slate-900">Student Debtor Records</h2>
              <p className="mt-1 text-sm text-slate-500">View student accounts and follow up on outstanding payments.</p>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search student, parent..."
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
                <option value="All">All Debt Statuses</option>
                <option value="Overdue">Overdue</option>
                <option value="Outstanding">Outstanding</option>
                <option value="Paid">Paid</option>
              </select>
              <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
                <option value="All">All Classes</option>
                <option>JSS 2A</option>
                <option>JSS 3B</option>
                <option>SS 1B</option>
                <option>SS 2A</option>
                <option>SS 3A</option>
              </select>
              <select value={sessionFilter} onChange={(e) => setSessionFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
                <option value="All">All Sessions</option>
                <option>2026/2027</option>
                <option>2025/2026</option>
                <option>2024/2025</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Student</th>
                  <th className="px-5 py-4">Invoice / Fee</th>
                  <th className="px-5 py-4">Class</th>
                  <th className="px-5 py-4">Total Billed</th>
                  <th className="px-5 py-4">Amount Paid</th>
                  <th className="px-5 py-4">Balance Due</th>
                  <th className="px-5 py-4">Due Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDebtors.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.admissionNo}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-indigo-600">{item.invoiceNo}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.feeType}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-800">{item.className}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.department}</p>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-700">{money(item.totalBilled)}</td>
                    <td className="px-5 py-4 font-medium text-emerald-600">{money(item.amountPaid)}</td>
                    <td className="px-5 py-4 font-bold text-red-600">{money(item.balance)}</td>
                    <td className="px-5 py-4 text-slate-600">{item.dueDate}</td>
                    <td className="px-5 py-4"><StatusBadge status={getDebtStatus(item)} /></td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button title="View details" onClick={() => { setSelected(item); setShowDetails(true); }} className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600">
                          <Eye size={17} />
                        </button>
                        {item.balance > 0 && (
                          <>
                            <button title="Record payment" onClick={() => { setSelected(item); setShowPayment(true); }} className="rounded-lg p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600">
                              <CreditCard size={17} />
                            </button>
                            <button title="Send reminder" onClick={() => { setSelected(item); setShowReminder(true); }} className="rounded-lg p-2 text-slate-500 hover:bg-amber-50 hover:text-amber-600">
                              <Bell size={17} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredDebtors.length === 0 && (
              <div className="py-14 text-center">
                <Users className="mx-auto mb-3 text-slate-300" size={36} />
                <p className="font-semibold text-slate-700">No student records found</p>
                <p className="mt-1 text-sm text-slate-500">Try changing your search or filters.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>Showing {filteredDebtors.length} of {debtors.length} student records</span>
            <span>Outstanding in filtered records: {money(filteredDebtors.reduce((sum, d) => sum + d.balance, 0))}</span>
          </div>
        </div>
      </div>

      {/* Student debt details */}
      {showDetails && selected && (
        <Modal title="Student Debt Details" onClose={() => setShowDetails(false)} size="max-w-3xl">
          <div className="space-y-5">
            <div className="flex flex-col justify-between gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selected.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{selected.admissionNo} · {selected.className}</p>
                <p className="mt-1 text-xs text-slate-500">{selected.department}</p>
              </div>
              <StatusBadge status={getDebtStatus(selected)} />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Total Billed</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{money(selected.totalBilled)}</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Amount Paid</p>
                <p className="mt-1 text-lg font-bold text-emerald-600">{money(selected.amountPaid)}</p>
              </div>
              <div className="rounded-lg border border-red-100 bg-red-50 p-4">
                <p className="text-xs text-red-600">Outstanding</p>
                <p className="mt-1 text-lg font-bold text-red-700">{money(selected.balance)}</p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-slate-900">Invoice Information</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Invoice Number", selected.invoiceNo],
                  ["Fee Category", selected.feeType],
                  ["Academic Session", selected.session],
                  ["Term", selected.term],
                  ["Due Date", selected.dueDate],
                  ["Department", selected.department],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-slate-900">Parent / Guardian Contact</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                  <Users className="text-slate-400" size={18} />
                  <div><p className="text-xs text-slate-500">Parent</p><p className="text-sm font-semibold">{selected.parent}</p></div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                  <Phone className="text-slate-400" size={18} />
                  <div><p className="text-xs text-slate-500">Phone</p><p className="text-sm font-semibold">{selected.phone}</p></div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 sm:col-span-2">
                  <Mail className="text-slate-400" size={18} />
                  <div><p className="text-xs text-slate-500">Email</p><p className="text-sm font-semibold">{selected.email}</p></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
                <History size={18} /> Payment History
              </h3>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full min-w-[450px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs text-slate-500">
                    <tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Reference</th><th className="px-4 py-3">Method</th><th className="px-4 py-3">Amount</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selected.payments.map((payment, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3">{payment.date}</td>
                        <td className="px-4 py-3">{payment.reference}</td>
                        <td className="px-4 py-3">{payment.method}</td>
                        <td className="px-4 py-3 font-semibold text-emerald-600">{money(payment.amount)}</td>
                      </tr>
                    ))}
                    {selected.payments.length === 0 && (
                      <tr><td colSpan="4" className="px-4 py-6 text-center text-slate-500">No payments recorded.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-4">
              <button onClick={() => setShowDetails(false)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Close</button>
              {selected.balance > 0 && (
                <>
                  <button onClick={() => { setShowDetails(false); setShowReminder(true); }} className="flex items-center gap-2 rounded-lg border border-amber-200 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50">
                    <Bell size={16} /> Reminder
                  </button>
                  <button onClick={() => { setShowDetails(false); setShowPayment(true); }} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                    <CreditCard size={16} /> Record Payment
                  </button>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Record payment */}
      {showPayment && selected && (
        <Modal title="Record Student Payment" onClose={() => setShowPayment(false)} size="max-w-xl">
          <form onSubmit={recordPayment} className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">{selected.name}</p>
              <p className="mt-1 text-sm text-slate-500">{selected.invoiceNo}</p>
              <div className="mt-3 flex justify-between text-sm">
                <span className="text-slate-500">Outstanding balance</span>
                <span className="font-bold text-red-600">{money(selected.balance)}</span>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Payment Amount (₦)</label>
              <input required type="number" min="1" max={selected.balance} value={paymentForm.amount} onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })} placeholder="Enter amount received" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Payment Method</label>
                <select value={paymentForm.method} onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                  <option>POS</option>
                  <option>Online Payment</option>
                  <option>Cheque</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Payment Date</label>
                <input required type="date" value={paymentForm.date} onChange={(e) => setPaymentForm({ ...paymentForm, date: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Payment Reference (Optional)</label>
              <input value={paymentForm.reference} onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })} placeholder="Enter transaction reference" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500" />
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button type="button" onClick={() => setShowPayment(false)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">Cancel</button>
              <button type="submit" className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
                <CheckCircle2 size={17} /> Save Payment
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Payment reminder */}
      {showReminder && selected && (
        <Modal title="Send Payment Reminder" onClose={() => setShowReminder(false)} size="max-w-xl">
          <div className="space-y-4">
            <div className="rounded-lg bg-amber-50 p-4">
              <p className="font-semibold text-amber-900">{selected.parent}</p>
              <p className="mt-1 text-sm text-amber-800">{selected.phone} · {selected.email}</p>
              <p className="mt-2 text-sm text-amber-800">
                Outstanding balance: <strong>{money(selected.balance)}</strong>
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Reminder Message</label>
              <textarea rows={6} value={reminderMessage} onChange={(e) => setReminderMessage(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500" />
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button onClick={() => setShowReminder(false)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">Cancel</button>
              <button onClick={sendReminder} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                <Bell size={17} /> Prepare Reminder
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
