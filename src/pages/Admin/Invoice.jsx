import React, { useMemo, useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  Download,
  Printer,
  CreditCard,
  MoreVertical,
  X,
  User,
  CalendarDays,
  Wallet,
  CheckCircle2,
  AlertCircle,
  Clock3,
  BarChart3,
  Send,
  RotateCcw,
  Trash2,
  ChevronDown,
} from "lucide-react";

const initialInvoices = [
  {
    id: "INV-2026-00125",
    student: "Abdulrahman Jibreel",
    admissionNo: "STU-2026-0012",
    className: "SS 2A",
    parent: "Jibreel Mujeeb",
    session: "2026/2027",
    term: "First Term",
    issuedDate: "01 Sep 2026",
    dueDate: "30 Sep 2026",
    total: 200000,
    paid: 100000,
    status: "Partially Paid",
  },
  {
    id: "INV-2026-00126",
    student: "Aisha Jibreel",
    admissionNo: "STU-2026-0045",
    className: "JSS 3B",
    parent: "Jibreel Mujeeb",
    session: "2026/2027",
    term: "First Term",
    issuedDate: "01 Sep 2026",
    dueDate: "30 Sep 2026",
    total: 160000,
    paid: 160000,
    status: "Paid",
  },
  {
    id: "INV-2026-00127",
    student: "Muhammad Ibrahim",
    admissionNo: "STU-2026-0078",
    className: "SS 1B",
    parent: "Ibrahim Musa",
    session: "2026/2027",
    term: "First Term",
    issuedDate: "02 Sep 2026",
    dueDate: "30 Sep 2026",
    total: 180000,
    paid: 0,
    status: "Unpaid",
  },
  {
    id: "INV-2026-00128",
    student: "Fatimah Yusuf",
    admissionNo: "STU-2026-0090",
    className: "JSS 2A",
    parent: "Yusuf Ahmed",
    session: "2026/2027",
    term: "First Term",
    issuedDate: "02 Sep 2026",
    dueDate: "15 Sep 2026",
    total: 150000,
    paid: 50000,
    status: "Overdue",
  },
  {
    id: "INV-2026-00129",
    student: "Umar Abdullahi",
    admissionNo: "STU-2026-0115",
    className: "SS 3A",
    parent: "Abdullahi Umar",
    session: "2026/2027",
    term: "First Term",
    issuedDate: "03 Sep 2026",
    dueDate: "30 Sep 2026",
    total: 250000,
    paid: 250000,
    status: "Paid",
  },
];

const formatMoney = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const statusStyles = {
  Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Partially Paid": "bg-blue-50 text-blue-700 border-blue-200",
  Unpaid: "bg-amber-50 text-amber-700 border-amber-200",
  Overdue: "bg-red-50 text-red-700 border-red-200",
  Cancelled: "bg-gray-100 text-gray-600 border-gray-200",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${
        statusStyles[status] || ""
      }`}
    >
      {status === "Paid" && <CheckCircle2 size={13} />}
      {status === "Overdue" && <AlertCircle size={13} />}
      {status === "Partially Paid" && <Clock3 size={13} />}
      {status}
    </span>
  );
}

export default function AdminInvoice() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [classFilter, setClassFilter] = useState("All");
  const [termFilter, setTermFilter] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const stats = useMemo(() => {
    const total = invoices.reduce((sum, item) => sum + item.total, 0);
    const paid = invoices.reduce((sum, item) => sum + item.paid, 0);

    const overdue = invoices.filter(
      (item) => item.status === "Overdue"
    );

    return {
      invoiceCount: invoices.length,
      total,
      paid,
      outstanding: total - paid,
      overdueCount: overdue.length,
      overdueAmount: overdue.reduce(
        (sum, item) => sum + (item.total - item.paid),
        0
      ),
    };
  }, [invoices]);

  const collectionRate =
    stats.total > 0
      ? Math.round((stats.paid / stats.total) * 100)
      : 0;

  const filteredInvoices = invoices.filter((invoice) => {
    const query = search.toLowerCase();

    const matchesSearch =
      invoice.id.toLowerCase().includes(query) ||
      invoice.student.toLowerCase().includes(query) ||
      invoice.admissionNo.toLowerCase().includes(query) ||
      invoice.parent.toLowerCase().includes(query);

    const matchesStatus =
      status === "All" || invoice.status === status;

    const matchesClass =
      classFilter === "All" ||
      invoice.className === classFilter;

    const matchesTerm =
      termFilter === "All" || invoice.term === termFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesClass &&
      matchesTerm
    );
  });

  const cancelInvoice = (id) => {
    setInvoices((current) =>
      current.map((invoice) =>
        invoice.id === id
          ? { ...invoice, status: "Cancelled" }
          : invoice
      )
    );

    setOpenMenu(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
              <BarChart3 size={16} />
              Administration
            </div>

            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Invoice Management
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage school invoices, payments and outstanding balances.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              <Download size={17} />
              Export
            </button>

            <button
              onClick={() => setShowCreate(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus size={18} />
              Create Invoice
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          <StatCard
            label="Total Invoices"
            value={stats.invoiceCount}
            icon={<FileText size={21} />}
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            label="Total Invoiced"
            value={formatMoney(stats.total)}
            icon={<Wallet size={21} />}
            iconClass="bg-purple-50 text-purple-600"
          />

          <StatCard
            label="Collected"
            value={formatMoney(stats.paid)}
            icon={<CheckCircle2 size={21} />}
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            label="Outstanding"
            value={formatMoney(stats.outstanding)}
            icon={<AlertCircle size={21} />}
            iconClass="bg-red-50 text-red-600"
          />

          <StatCard
            label="Overdue"
            value={formatMoney(stats.overdueAmount)}
            icon={<Clock3 size={21} />}
            iconClass="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Collection Overview */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Overall Collection Rate
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                {collectionRate}%
              </h2>
            </div>

            <div className="w-full md:max-w-md">
              <div className="mb-2 flex justify-between text-xs text-gray-500">
                <span>
                  Collected: {formatMoney(stats.paid)}
                </span>

                <span>
                  Target: {formatMoney(stats.total)}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{
                    width: `${collectionRate}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3">
              <AlertCircle
                size={19}
                className="text-red-600"
              />

              <div>
                <p className="text-xs text-red-600">
                  Overdue Invoices
                </p>

                <p className="font-bold text-red-700">
                  {stats.overdueCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">

            <div className="relative lg:col-span-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search invoice or student..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <FilterSelect
              icon={<Filter size={16} />}
              value={status}
              onChange={setStatus}
              options={[
                "All",
                "Paid",
                "Partially Paid",
                "Unpaid",
                "Overdue",
                "Cancelled",
              ]}
            />

            <FilterSelect
              value={classFilter}
              onChange={setClassFilter}
              options={[
                "All",
                "JSS 2A",
                "JSS 3B",
                "SS 1B",
                "SS 2A",
                "SS 3A",
              ]}
            />

            <FilterSelect
              value={termFilter}
              onChange={setTermFilter}
              options={[
                "All",
                "First Term",
                "Second Term",
                "Third Term",
              ]}
            />
          </div>
        </div>

        {/* Invoice Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

          <div className="flex flex-col gap-2 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">
                All Invoices
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {filteredInvoices.length} invoice records found.
              </p>
            </div>

            <div className="text-sm text-gray-500">
              Session:{" "}
              <span className="font-semibold text-gray-900">
                2026/2027
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-4">Invoice</th>
                  <th className="px-5 py-4">Student</th>
                  <th className="px-5 py-4">Parent</th>
                  <th className="px-5 py-4">Class</th>
                  <th className="px-5 py-4">Term</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Paid</th>
                  <th className="px-5 py-4">Balance</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredInvoices.map((invoice) => {
                  const balance =
                    invoice.total - invoice.paid;

                  return (
                    <tr
                      key={invoice.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-900">
                          {invoice.id}
                        </p>

                        <p className="text-xs text-gray-400">
                          {invoice.issuedDate}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <User size={16} />
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {invoice.student}
                            </p>

                            <p className="text-xs text-gray-400">
                              {invoice.admissionNo}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {invoice.parent}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {invoice.className}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm text-gray-700">
                          {invoice.term}
                        </p>

                        <p className="text-xs text-gray-400">
                          {invoice.session}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm font-medium">
                        {formatMoney(invoice.total)}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-emerald-600">
                        {formatMoney(invoice.paid)}
                      </td>

                      <td className="px-5 py-4 text-sm font-bold text-red-600">
                        {formatMoney(balance)}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={invoice.status} />
                      </td>

                      <td className="relative px-5 py-4">
                        <div className="flex items-center gap-2">

                          <button
                            onClick={() =>
                              setSelectedInvoice(invoice)
                            }
                            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                            title="View"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                            title="Edit"
                          >
                            <Edit3 size={17} />
                          </button>

                          <button
                            onClick={() =>
                              setOpenMenu(
                                openMenu === invoice.id
                                  ? null
                                  : invoice.id
                              )
                            }
                            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                          >
                            <MoreVertical size={17} />
                          </button>
                        </div>

                        {openMenu === invoice.id && (
                          <div className="absolute right-5 top-14 z-30 w-48 rounded-xl border border-gray-200 bg-white p-1">

                            <MenuButton
                              icon={<Send size={15} />}
                              text="Send Invoice"
                            />

                            <MenuButton
                              icon={<Download size={15} />}
                              text="Download"
                            />

                            <MenuButton
                              icon={<Printer size={15} />}
                              text="Print"
                            />

                            {balance > 0 &&
                              invoice.status !== "Cancelled" && (
                                <MenuButton
                                  icon={
                                    <CreditCard size={15} />
                                  }
                                  text="Record Payment"
                                />
                              )}

                            <MenuButton
                              icon={<RotateCcw size={15} />}
                              text="Reissue Invoice"
                            />

                            {invoice.status !== "Cancelled" && (
                              <button
                                onClick={() =>
                                  cancelInvoice(invoice.id)
                                }
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Trash2 size={15} />
                                Cancel Invoice
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="py-14 text-center">
              <FileText
                size={42}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-3 font-semibold text-gray-900">
                No invoices found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selectedInvoice && (
        <InvoiceDetails
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}

      {/* Create Invoice Modal */}
      {showCreate && (
        <CreateInvoiceModal
          onClose={() => setShowCreate(false)}
        />
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-gray-500">{label}</p>

          <h2 className="mt-2 truncate text-xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        <div className={`rounded-xl p-3 ${iconClass}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  icon,
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pr-10 text-sm outline-none focus:border-blue-500 ${
          icon ? "pl-10" : "pl-4"
        }`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "All"
              ? "All"
              : option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}

function MenuButton({ icon, text }) {
  return (
    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
      {icon}
      {text}
    </button>
  );
}

function InvoiceDetails({ invoice, onClose }) {
  const balance = invoice.total - invoice.paid;

  const progress =
    invoice.total > 0
      ? Math.round((invoice.paid / invoice.total) * 100)
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white">

        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Invoice Details
            </h2>

            <p className="text-sm text-gray-500">
              {invoice.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-5">

          {/* Student */}
          <div className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <User size={22} />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                {invoice.student}
              </h3>

              <p className="text-sm text-gray-500">
                {invoice.admissionNo} •{" "}
                {invoice.className}
              </p>
            </div>

            <StatusBadge status={invoice.status} />
          </div>

          {/* Invoice Information */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <InfoItem
              label="Parent"
              value={invoice.parent}
            />

            <InfoItem
              label="Session"
              value={invoice.session}
            />

            <InfoItem
              label="Term"
              value={invoice.term}
            />

            <InfoItem
              label="Issued Date"
              value={invoice.issuedDate}
            />

            <InfoItem
              label="Due Date"
              value={invoice.dueDate}
            />

            <InfoItem
              label="Invoice Number"
              value={invoice.id}
            />
          </div>

          {/* Amounts */}
          <div className="grid gap-3 sm:grid-cols-3">
            <AmountCard
              label="Total"
              value={invoice.total}
            />

            <AmountCard
              label="Paid"
              value={invoice.paid}
              className="text-emerald-600"
            />

            <AmountCard
              label="Outstanding"
              value={balance}
              className="text-red-600"
            />
          </div>

          {/* Progress */}
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-500">
                Payment Progress
              </span>

              <span className="font-semibold">
                {progress}%
              </span>
            </div>

            <div className="h-3 rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ActionButton
              icon={<Download size={17} />}
              text="Download"
            />

            <ActionButton
              icon={<Printer size={17} />}
              text="Print"
            />

            <ActionButton
              icon={<Send size={17} />}
              text="Send Invoice"
            />

            {balance > 0 && (
              <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                <CreditCard size={17} />
                Record Payment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-gray-900">
        {value}
      </p>
    </div>
  );
}

function AmountCard({
  label,
  value,
  className = "text-gray-900",
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <p className="text-xs text-gray-500">{label}</p>

      <p className={`mt-2 text-lg font-bold ${className}`}>
        {formatMoney(value)}
      </p>
    </div>
  );
}

function ActionButton({ icon, text }) {
  return (
    <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
      {icon}
      {text}
    </button>
  );
}

function CreateInvoiceModal({ onClose }) {
  const [items, setItems] = useState([
    {
      name: "Tuition Fee",
      amount: "",
    },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        name: "",
        amount: "",
      },
    ]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const total = items.reduce(
    (sum, item) =>
      sum + Number(item.amount || 0),
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white">

        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Create Invoice
            </h2>

            <p className="text-sm text-gray-500">
              Create a new invoice for a student.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form className="space-y-5 p-5">

          {/* Student */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Student
            </label>

            <select className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500">
              <option>Select student</option>
              <option>Abdulrahman Jibreel</option>
              <option>Aisha Jibreel</option>
              <option>Muhammad Ibrahim</option>
              <option>Fatimah Yusuf</option>
            </select>
          </div>

          {/* Session + Term */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Session
              </label>

              <select className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500">
                <option>2026/2027</option>
                <option>2025/2026</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Term
              </label>

              <select className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500">
                <option>First Term</option>
                <option>Second Term</option>
                <option>Third Term</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Due Date
            </label>

            <input
              type="date"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Items */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-900">
                Invoice Items
              </label>

              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-1 text-sm font-medium text-blue-600"
              >
                <Plus size={15} />
                Add Item
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 sm:flex-row"
                >
                  <input
                    type="text"
                    placeholder="Fee name"
                    value={item.name}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[index].name =
                        e.target.value;
                      setItems(updated);
                    }}
                    className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                  <input
                    type="number"
                    placeholder="Amount"
                    value={item.amount}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[index].amount =
                        e.target.value;
                      setItems(updated);
                    }}
                    className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 sm:w-40"
                  />

                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeItem(index)
                      }
                      className="rounded-xl border border-red-200 px-4 text-red-600 hover:bg-red-50"
                    >
                      <X size={17} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Discount */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Discount
            </label>

            <input
              type="number"
              placeholder="0"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Total */}
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-600">
                Invoice Total
              </span>

              <span className="text-xl font-bold text-gray-900">
                {formatMoney(total)}
              </span>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}