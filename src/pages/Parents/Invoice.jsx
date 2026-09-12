import React, { useMemo, useState } from "react";
import {
  FileText,
  Download,
  Printer,
  Eye,
  CreditCard,
  Search,
  Filter,
  ChevronDown,
  X,
  CalendarDays,
  User,
  Wallet,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Receipt,
} from "lucide-react";

const children = [
  {
    id: 1,
    name: "Abdulrahman Jibreel",
    className: "SS 2A",
    admissionNo: "STU-2026-0012",
  },
  {
    id: 2,
    name: "Aisha Jibreel",
    className: "JSS 3B",
    admissionNo: "STU-2026-0045",
  },
];

const invoices = [
  {
    id: "INV-2026-00125",
    childId: 1,
    childName: "Abdulrahman Jibreel",
    term: "First Term",
    session: "2026/2027",
    issuedDate: "01 Sep 2026",
    dueDate: "30 Sep 2026",
    total: 200000,
    paid: 100000,
    status: "Partially Paid",
    items: [
      { name: "Tuition Fee", amount: 120000 },
      { name: "Development Levy", amount: 30000 },
      { name: "ICT Fee", amount: 20000 },
      { name: "Library Fee", amount: 10000 },
      { name: "Sports Fee", amount: 20000 },
    ],
  },
  {
    id: "INV-2026-00126",
    childId: 1,
    childName: "Abdulrahman Jibreel",
    term: "Second Term",
    session: "2026/2027",
    issuedDate: "10 Jan 2027",
    dueDate: "31 Jan 2027",
    total: 180000,
    paid: 180000,
    status: "Paid",
    items: [
      { name: "Tuition Fee", amount: 120000 },
      { name: "Development Levy", amount: 30000 },
      { name: "ICT Fee", amount: 15000 },
      { name: "Sports Fee", amount: 15000 },
    ],
  },
  {
    id: "INV-2026-00201",
    childId: 2,
    childName: "Aisha Jibreel",
    term: "First Term",
    session: "2026/2027",
    issuedDate: "01 Sep 2026",
    dueDate: "30 Sep 2026",
    total: 160000,
    paid: 50000,
    status: "Partially Paid",
    items: [
      { name: "Tuition Fee", amount: 100000 },
      { name: "Development Levy", amount: 25000 },
      { name: "ICT Fee", amount: 15000 },
      { name: "Library Fee", amount: 10000 },
      { name: "Sports Fee", amount: 10000 },
    ],
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
        statusStyles[status] || "bg-gray-50 text-gray-600"
      }`}
    >
      {status === "Paid" && <CheckCircle2 size={13} />}
      {status === "Overdue" && <AlertCircle size={13} />}
      {status === "Partially Paid" && <Clock3 size={13} />}
      {status}
    </span>
  );
}

export default function ParentInvoice() {
  const [selectedChild, setSelectedChild] = useState(children[0].id);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const childInvoices = useMemo(() => {
    return invoices.filter((invoice) => invoice.childId === selectedChild);
  }, [selectedChild]);

  const filteredInvoices = useMemo(() => {
    return childInvoices.filter((invoice) => {
      const matchesSearch =
        invoice.id.toLowerCase().includes(search.toLowerCase()) ||
        invoice.term.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || invoice.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [childInvoices, search, statusFilter]);

  const totalInvoiced = childInvoices.reduce(
    (sum, invoice) => sum + invoice.total,
    0
  );

  const totalPaid = childInvoices.reduce(
    (sum, invoice) => sum + invoice.paid,
    0
  );

  const outstanding = totalInvoiced - totalPaid;

  const currentInvoice =
    childInvoices.find(
      (invoice) =>
        invoice.status === "Partially Paid" ||
        invoice.status === "Unpaid" ||
        invoice.status === "Overdue"
    ) || childInvoices[0];

  const paymentProgress =
    currentInvoice && currentInvoice.total > 0
      ? Math.round((currentInvoice.paid / currentInvoice.total) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
              <Receipt size={16} />
              Parent Portal
            </div>

            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Invoices
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View and manage your children's school invoices.
            </p>
          </div>

          {/* Child Selector */}
          <div className="relative">
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(Number(e.target.value))}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm font-medium text-gray-700 outline-none focus:border-blue-500 md:w-72"
            >
              {children.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name} — {child.className}
                </option>
              ))}
            </select>

            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Child Information */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <User size={22} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  {children.find((c) => c.id === selectedChild)?.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {
                    children.find((c) => c.id === selectedChild)
                      ?.admissionNo
                  }{" "}
                  •{" "}
                  {
                    children.find((c) => c.id === selectedChild)
                      ?.className
                  }
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs text-gray-500">Current Session</p>
              <p className="font-semibold text-gray-900">2026/2027</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Invoiced</p>
                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  {formatMoney(totalInvoiced)}
                </h3>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <FileText size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Paid</p>
                <h3 className="mt-2 text-xl font-bold text-emerald-600">
                  {formatMoney(totalPaid)}
                </h3>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CheckCircle2 size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Outstanding</p>
                <h3 className="mt-2 text-xl font-bold text-red-600">
                  {formatMoney(outstanding)}
                </h3>
              </div>

              <div className="rounded-xl bg-red-50 p-3 text-red-600">
                <Wallet size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Invoices</p>
                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  {childInvoices.length}
                </h3>
              </div>

              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <Receipt size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* Current Invoice */}
        {currentInvoice && (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Current Invoice
                  </span>

                  <StatusBadge status={currentInvoice.status} />
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  {currentInvoice.id}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {currentInvoice.term} • {currentInvoice.session}
                </p>
              </div>

              <button
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                onClick={() => alert("Payment process started")}
              >
                <CreditCard size={17} />
                Pay Balance
              </button>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500">Invoice Total</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {formatMoney(currentInvoice.total)}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Amount Paid</p>
                <p className="mt-1 font-semibold text-emerald-600">
                  {formatMoney(currentInvoice.paid)}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Balance</p>
                <p className="mt-1 font-semibold text-red-600">
                  {formatMoney(
                    currentInvoice.total - currentInvoice.paid
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Due Date</p>
                <p className="mt-1 flex items-center gap-2 font-semibold text-gray-900">
                  <CalendarDays size={16} />
                  {currentInvoice.dueDate}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-gray-500">Payment Progress</span>
                <span className="font-semibold text-gray-900">
                  {paymentProgress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${paymentProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search invoice number or term..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm outline-none focus:border-blue-500 md:w-48"
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Partially Paid">Partially Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Overdue">Overdue</option>
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
          <div className="border-b border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900">
              Invoice History
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              All invoices for the selected child.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-4">Invoice</th>
                  <th className="px-5 py-4">Term</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Paid</th>
                  <th className="px-5 py-4">Balance</th>
                  <th className="px-5 py-4">Due Date</th>
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
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <div className="font-medium text-gray-900">
                          {invoice.id}
                        </div>
                        <div className="text-xs text-gray-500">
                          {invoice.childName}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        <div>{invoice.term}</div>
                        <div className="text-xs text-gray-400">
                          {invoice.session}
                        </div>
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

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {invoice.dueDate}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={invoice.status} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedInvoice(invoice)}
                            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                            title="View Invoice"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                            title="Download"
                          >
                            <Download size={17} />
                          </button>

                          {balance > 0 && (
                            <button
                              onClick={() =>
                                alert(`Pay ${formatMoney(balance)}`)
                              }
                              className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                              title="Pay"
                            >
                              <CreditCard size={17} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="py-12 text-center">
              <FileText
                size={40}
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
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white">
            
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

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500">Student</p>
                  <p className="mt-1 font-semibold">
                    {selectedInvoice.childName}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <div className="mt-1">
                    <StatusBadge status={selectedInvoice.status} />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Session</p>
                  <p className="mt-1 font-medium">
                    {selectedInvoice.session}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Term</p>
                  <p className="mt-1 font-medium">
                    {selectedInvoice.term}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Issued Date</p>
                  <p className="mt-1 font-medium">
                    {selectedInvoice.issuedDate}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Due Date</p>
                  <p className="mt-1 font-medium">
                    {selectedInvoice.dueDate}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-900">
                  Invoice Items
                </h3>

                <div className="divide-y divide-gray-100 rounded-xl border border-gray-200">
                  {selectedInvoice.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-4 py-3"
                    >
                      <span className="text-sm text-gray-600">
                        {item.name}
                      </span>

                      <span className="text-sm font-semibold text-gray-900">
                        {formatMoney(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-500">
                    Invoice Total
                  </span>
                  <span className="font-semibold">
                    {formatMoney(selectedInvoice.total)}
                  </span>
                </div>

                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-500">
                    Amount Paid
                  </span>
                  <span className="font-semibold text-emerald-600">
                    {formatMoney(selectedInvoice.paid)}
                  </span>
                </div>

                <div className="mt-2 flex justify-between border-t border-gray-200 pt-3">
                  <span className="font-semibold">
                    Outstanding
                  </span>

                  <span className="font-bold text-red-600">
                    {formatMoney(
                      selectedInvoice.total -
                        selectedInvoice.paid
                    )}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                  <Download size={17} />
                  Download
                </button>

                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                  <Printer size={17} />
                  Print
                </button>

                {selectedInvoice.total > selectedInvoice.paid && (
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                    <CreditCard size={17} />
                    Pay Balance
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}