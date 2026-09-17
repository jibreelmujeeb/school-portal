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
    invoice: "INV-2026-00125",
    fee: "School Fees",
    session: "2026/2027",
    term: "First Term",
    total: 200000,
    paid: 100000,
    dueDate: "30 Sep 2026",
    status: "Partially Paid",
    email: "parent@example.com",
  },
  {
    id: 2,
    studentId: "STU-2026-0045",
    student: "Aisha Jibreel",
    className: "JSS 3B",
    invoice: "INV-2026-00205",
    fee: "School Fees",
    session: "2026/2027",
    term: "First Term",
    total: 180000,
    paid: 80000,
    dueDate: "30 Sep 2026",
    status: "Partially Paid",
    email: "parent@example.com",
  },
  {
    id: 3,
    studentId: "STU-2026-0081",
    student: "Muhammad Ibrahim",
    className: "SS 1B",
    invoice: "INV-2026-00221",
    fee: "School Fees",
    session: "2026/2027",
    term: "First Term",
    total: 220000,
    paid: 0,
    dueDate: "15 Sep 2026",
    status: "Overdue",
    email: "parent@example.com",
  },
  {
    id: 4,
    studentId: "STU-2026-0094",
    student: "Fatimah Abdullahi",
    className: "JSS 2A",
    invoice: "INV-2026-00234",
    fee: "Examination Fee",
    session: "2026/2027",
    term: "First Term",
    total: 35000,
    paid: 0,
    dueDate: "25 Sep 2026",
    status: "Unpaid",
    email: "parent@example.com",
  },
  {
    id: 5,
    studentId: "STU-2026-0108",
    student: "Yusuf Ahmed",
    className: "SS 3A",
    invoice: "INV-2026-00240",
    fee: "ICT & Laboratory Fee",
    session: "2026/2027",
    term: "First Term",
    total: 30000,
    paid: 10000,
    dueDate: "10 Sep 2026",
    status: "Overdue",
    email: "parent@example.com",
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
        styles[status]
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

function ActionButton({
  icon: Icon,
  children,
  onClick,
  primary = false,
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
        primary
          ? "bg-slate-900 text-white hover:bg-slate-800"
          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      <Icon size={16} />
      {children}
    </button>
  );
}

export default function AccountantOutstanding() {
  const [records] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const totalOutstanding = records.reduce(
    (sum, item) => sum + (item.total - item.paid),
    0
  );

  const overdueAmount = records
    .filter((item) => item.status === "Overdue")
    .reduce(
      (sum, item) => sum + (item.total - item.paid),
      0
    );

  const overdueStudents = records.filter(
    (item) => item.status === "Overdue"
  ).length;

  const collectionBase = records.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const totalPaid = records.reduce(
    (sum, item) => sum + item.paid,
    0
  );

  const collectionRate =
    collectionBase > 0
      ? Math.round((totalPaid / collectionBase) * 100)
      : 0;

  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        item.student.toLowerCase().includes(searchText) ||
        item.studentId.toLowerCase().includes(searchText) ||
        item.invoice.toLowerCase().includes(searchText) ||
        item.fee.toLowerCase().includes(searchText);

      const matchesClass =
        classFilter === "All" ||
        item.className === classFilter;

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesClass &&
        matchesStatus
      );
    });
  }, [records, search, classFilter, statusFilter]);

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

  const handlePayment = (record) => {
    alert(
      `Record payment for ${record.student} — ${formatCurrency(
        record.total - record.paid
      )}`
    );
  };

  const handleReminder = (record) => {
    alert(
      `Payment reminder sent for ${record.invoice}`
    );
  };

  const handleExport = () => {
    alert("Outstanding fees report exported.");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Wallet size={16} />
              <span>Accountant</span>
              <span>/</span>
              <span>Outstanding Fees</span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Outstanding Fees
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor unpaid student balances and manage fee
              collections.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <ActionButton
              icon={Download}
              onClick={handleExport}
            >
              Export Report
            </ActionButton>

            <ActionButton
              icon={Receipt}
              onClick={() =>
                alert("Opening payment history")
              }
            >
              Payment History
            </ActionButton>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Wallet}
            title="Total Outstanding"
            value={formatCurrency(totalOutstanding)}
            description="Across all students"
          />

          <StatCard
            icon={AlertCircle}
            title="Overdue Amount"
            value={formatCurrency(overdueAmount)}
            description="Past their due date"
          />

          <StatCard
            icon={Users}
            title="Outstanding Students"
            value={records.length}
            description="Students with balances"
          />

          <StatCard
            icon={CheckCircle2}
            title="Collection Rate"
            value={`${collectionRate}%`}
            description="Current invoice collection"
          />
        </div>

        {/* Overdue Alert */}
        {overdueStudents > 0 && (
          <div className="my-6 flex flex-col gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <AlertCircle
                size={22}
                className="mt-0.5 shrink-0 text-red-600"
              />

              <div>
                <h3 className="font-semibold text-red-900">
                  Overdue payments require follow-up
                </h3>

                <p className="mt-1 text-sm text-red-800">
                  {overdueStudents} student(s) have overdue
                  balances totaling{" "}
                  <strong>
                    {formatCurrency(overdueAmount)}
                  </strong>
                  .
                </p>
              </div>
            </div>

            <button
              onClick={() => setStatusFilter("Overdue")}
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              View Overdue
            </button>
          </div>
        )}

        {/* Aging Overview */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Outstanding Aging
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Monitor how long balances have remained unpaid.
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
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search student, ID, invoice or fee..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-slate-400"
              />
            </div>

            <div className="relative">
              <Filter
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={classFilter}
                onChange={(e) =>
                  setClassFilter(e.target.value)
                }
                className="appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm outline-none"
              >
                <option value="All">All Classes</option>
                <option value="SS 1B">SS 1B</option>
                <option value="SS 2A">SS 2A</option>
                <option value="SS 3A">SS 3A</option>
                <option value="JSS 2A">JSS 2A</option>
                <option value="JSS 3B">JSS 3B</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="appearance-none rounded-xl border border-slate-200 bg-white py-3 px-4 pr-10 text-sm outline-none"
              >
                <option value="All">All Status</option>
                <option value="Overdue">Overdue</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Partially Paid">
                  Partially Paid
                </option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Bulk actions */}
        {selectedRows.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-700">
              {selectedRows.length} record(s) selected
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  alert("Bulk reminders sent.")
                }
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                <Bell size={16} />
                Send Reminders
              </button>

              <button
                onClick={handleExport}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                <Download size={16} />
                Export Selected
              </button>
            </div>
          </div>
        )}

        {/* Main table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-2 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Student Debtors
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredRecords.length} outstanding record(s)
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
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

                  <th className="px-5 py-4">
                    Student
                  </th>

                  <th className="px-5 py-4">
                    Invoice
                  </th>

                  <th className="px-5 py-4">
                    Fee
                  </th>

                  <th className="px-5 py-4">
                    Total
                  </th>

                  <th className="px-5 py-4">
                    Paid
                  </th>

                  <th className="px-5 py-4">
                    Outstanding
                  </th>

                  <th className="px-5 py-4">
                    Due Date
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>

                  <th className="px-5 py-4">
                    Action
                  </th>
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
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
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

                      <td className="px-5 py-4 text-sm text-slate-700">
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
                        <div className="flex items-center gap-2 text-sm text-slate-700">
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
                              handlePayment(record)
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
                  No students match the current filters.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer summary */}
        <div className="mt-5 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Total outstanding balance
            </p>

            <p className="mt-1 text-2xl font-bold text-red-600">
              {formatCurrency(totalOutstanding)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <ActionButton
              icon={Bell}
              onClick={() =>
                alert("Payment reminders sent.")
              }
            >
              Send Reminders
            </ActionButton>

            <ActionButton
              icon={Download}
              onClick={handleExport}
            >
              Export Report
            </ActionButton>
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
                  Outstanding Invoice
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

              <div className="flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-5">
                <ActionButton
                  icon={Mail}
                  onClick={() =>
                    handleReminder(selected)
                  }
                >
                  Send Reminder
                </ActionButton>

                <ActionButton
                  icon={Download}
                  onClick={() =>
                    alert(
                      `Downloading ${selected.invoice}`
                    )
                  }
                >
                  Download
                </ActionButton>

                <ActionButton
                  icon={Printer}
                  onClick={() => window.print()}
                >
                  Print
                </ActionButton>

                <ActionButton
                  icon={CreditCard}
                  primary
                  onClick={() =>
                    handlePayment(selected)
                  }
                >
                  Record Payment
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}