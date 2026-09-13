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
  Users,
  ChevronDown,
} from "lucide-react";

const invoicesData = [
  {
    id: "INV-2026-00125",
    student: "Abdulrahman Jibreel",
    admissionNo: "STU-2026-0012",
    className: "SS 2A",
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
    session: "2026/2027",
    term: "First Term",
    issuedDate: "02 Sep 2026",
    dueDate: "15 Sep 2026",
    total: 150000,
    paid: 50000,
    status: "Overdue",
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

export default function AccountantInvoice() {
  const [invoices, setInvoices] = useState(invoicesData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const statistics = useMemo(() => {
    const total = invoices.reduce((sum, item) => sum + item.total, 0);
    const paid = invoices.reduce((sum, item) => sum + item.paid, 0);

    return {
      count: invoices.length,
      total,
      paid,
      outstanding: total - paid,
    };
  }, [invoices]);

  const filteredInvoices = invoices.filter((invoice) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      invoice.id.toLowerCase().includes(searchValue) ||
      invoice.student.toLowerCase().includes(searchValue) ||
      invoice.admissionNo.toLowerCase().includes(searchValue) ||
      invoice.className.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
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
              <Wallet size={16} />
              Accountant Portal
            </div>

            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Invoices
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Create, manage and monitor student invoices.
            </p>
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Create Invoice
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Invoices</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {statistics.count}
                </h2>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <FileText size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Invoiced</p>
                <h2 className="mt-2 text-xl font-bold text-gray-900">
                  {formatMoney(statistics.total)}
                </h2>
              </div>

              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <Wallet size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Amount Collected</p>
                <h2 className="mt-2 text-xl font-bold text-emerald-600">
                  {formatMoney(statistics.paid)}
                </h2>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CheckCircle2 size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Outstanding</p>
                <h2 className="mt-2 text-xl font-bold text-red-600">
                  {formatMoney(statistics.outstanding)}
                </h2>
              </div>

              <div className="rounded-xl bg-red-50 p-3 text-red-600">
                <AlertCircle size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Paid Invoices</p>
                <p className="text-lg font-bold text-gray-900">
                  {invoices.filter((x) => x.status === "Paid").length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Clock3 size={20} />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Partially Paid
                </p>

                <p className="text-lg font-bold text-gray-900">
                  {
                    invoices.filter(
                      (x) => x.status === "Partially Paid"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-red-50 p-3 text-red-600">
                <AlertCircle size={20} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Overdue</p>
                <p className="text-lg font-bold text-gray-900">
                  {
                    invoices.filter(
                      (x) => x.status === "Overdue"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="flex flex-col gap-3 lg:flex-row">

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search invoice, student, admission number..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <Filter
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm outline-none focus:border-blue-500 lg:w-52"
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Partially Paid">
                  Partially Paid
                </option>
                <option value="Unpaid">Unpaid</option>
                <option value="Overdue">Overdue</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

          <div className="flex flex-col gap-2 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">
                Invoice Records
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage all student invoices.
              </p>
            </div>

            <button className="inline-flex items-center gap-2 self-start rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
              <Download size={16} />
              Export
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-4">Invoice</th>
                  <th className="px-5 py-4">Student</th>
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
                  const balance = invoice.total - invoice.paid;

                  return (
                    <tr
                      key={invoice.id}
                      className="hover:bg-gray-50"
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
                            <User size={17} />
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

                      <td className="px-5 py-4 text-sm text-emerald-600">
                        {formatMoney(invoice.paid)}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-red-600">
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
                          <div className="absolute right-5 top-14 z-20 w-44 rounded-xl border border-gray-200 bg-white p-1">
                            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                              <Download size={15} />
                              Download
                            </button>

                            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                              <Printer size={15} />
                              Print
                            </button>

                            {balance > 0 && (
                              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                                <CreditCard size={15} />
                                Record Payment
                              </button>
                            )}

                            {invoice.status !== "Cancelled" && (
                              <button
                                onClick={() =>
                                  cancelInvoice(invoice.id)
                                }
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <X size={15} />
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
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white">

            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Invoice Details
                </h2>

                <p className="text-sm text-gray-500">
                  {selectedInvoice.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedInvoice(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 p-5">

              {/* Student */}
              <div className="flex items-center gap-4 rounded-xl border border-gray-200 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <User size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedInvoice.student}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {selectedInvoice.admissionNo} •{" "}
                    {selectedInvoice.className}
                  </p>
                </div>
              </div>

              {/* Invoice Information */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs text-gray-500">
                    Session
                  </p>

                  <p className="mt-1 font-medium">
                    {selectedInvoice.session}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Term
                  </p>

                  <p className="mt-1 font-medium">
                    {selectedInvoice.term}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Issued
                  </p>

                  <p className="mt-1 flex items-center gap-2 font-medium">
                    <CalendarDays size={15} />
                    {selectedInvoice.issuedDate}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Due Date
                  </p>

                  <p className="mt-1 font-medium text-red-600">
                    {selectedInvoice.dueDate}
                  </p>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Invoice Total
                  </p>

                  <p className="mt-2 text-lg font-bold">
                    {formatMoney(selectedInvoice.total)}
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="text-xs text-emerald-700">
                    Amount Paid
                  </p>

                  <p className="mt-2 text-lg font-bold text-emerald-700">
                    {formatMoney(selectedInvoice.paid)}
                  </p>
                </div>

                <div className="rounded-xl bg-red-50 p-4">
                  <p className="text-xs text-red-700">
                    Outstanding
                  </p>

                  <p className="mt-2 text-lg font-bold text-red-700">
                    {formatMoney(
                      selectedInvoice.total -
                        selectedInvoice.paid
                    )}
                  </p>
                </div>
              </div>

              <div>
                <StatusBadge status={selectedInvoice.status} />
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 border-t border-gray-200 pt-5 sm:flex-row">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                  <Download size={17} />
                  Download
                </button>

                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                  <Printer size={17} />
                  Print
                </button>

                {selectedInvoice.total >
                  selectedInvoice.paid &&
                  selectedInvoice.status !== "Cancelled" && (
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                      <CreditCard size={17} />
                      Record Payment
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
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

function CreateInvoiceModal({ onClose }) {
  const [items, setItems] = useState([
    {
      name: "Tuition Fee",
      amount: "",
    },
  ]);

  const addItem = () => {
    setItems([...items, { name: "", amount: "" }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const total = items.reduce(
    (sum, item) => sum + Number(item.amount || 0),
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
              Create a new student invoice.
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

          {/* Fee Items */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-900">
                Invoice Items
              </label>

              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
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
                      updated[index].name = e.target.value;
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
                      updated[index].amount = e.target.value;
                      setItems(updated);
                    }}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 sm:w-40"
                  />

                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
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

          {/* Buttons */}
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