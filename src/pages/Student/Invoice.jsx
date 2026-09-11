import React, { useMemo, useState } from "react";
import {
  FileText,
  CreditCard,
  WalletCards,
  CheckCircle2,
  AlertCircle,
  Search,
  Eye,
  Download,
  Printer,
  X,
  ArrowRight,
} from "lucide-react";

const invoices = [
  {
    id: "INV-2026-00125",
    session: "2026/2027",
    term: "First Term",
    issuedDate: "2026-09-01",
    dueDate: "2026-09-30",
    total: 200000,
    paid: 100000,
    status: "Partially Paid",
    items: [
      { name: "Tuition Fee", amount: 150000 },
      { name: "Registration Fee", amount: 20000 },
      { name: "Library Fee", amount: 10000 },
      { name: "Laboratory Fee", amount: 15000 },
      { name: "ICT Fee", amount: 10000 },
      { name: "Examination Fee", amount: 15000 },
    ],
  },
  {
    id: "INV-2026-00098",
    session: "2025/2026",
    term: "Third Term",
    issuedDate: "2026-04-01",
    dueDate: "2026-04-30",
    total: 180000,
    paid: 180000,
    status: "Paid",
    items: [
      { name: "Tuition Fee", amount: 150000 },
      { name: "Examination Fee", amount: 30000 },
    ],
  },
  {
    id: "INV-2026-00075",
    session: "2025/2026",
    term: "Second Term",
    issuedDate: "2026-01-10",
    dueDate: "2026-01-31",
    total: 175000,
    paid: 175000,
    status: "Paid",
    items: [
      { name: "Tuition Fee", amount: 150000 },
      { name: "Library Fee", amount: 10000 },
      { name: "ICT Fee", amount: 15000 },
    ],
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>

          <h3 className="mt-2 text-xl font-bold text-gray-900">
            {value}
          </h3>
        </div>

        <div className="rounded-xl bg-gray-100 p-3">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Paid: "bg-green-100 text-green-700",
    "Partially Paid": "bg-yellow-100 text-yellow-700",
    Unpaid: "bg-gray-100 text-gray-700",
    Overdue: "bg-red-100 text-red-700",
    Cancelled: "bg-gray-100 text-gray-500",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function StudentInvoice() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.id.toLowerCase().includes(search.toLowerCase()) ||
        invoice.term.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        invoice.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalAmount = invoices.reduce(
    (sum, invoice) => sum + invoice.total,
    0
  );

  const totalPaid = invoices.reduce(
    (sum, invoice) => sum + invoice.paid,
    0
  );

  const outstanding = totalAmount - totalPaid;

  const currentInvoice = invoices[0];

  const progress =
    (currentInvoice.paid / currentInvoice.total) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <FileText size={25} />

            <h1 className="text-2xl font-bold text-gray-900">
              My Invoices
            </h1>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            View your school invoices, payments and outstanding
            balances.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={FileText}
            label="Total Invoices"
            value={invoices.length}
          />

          <StatCard
            icon={WalletCards}
            label="Total Amount"
            value={formatCurrency(totalAmount)}
          />

          <StatCard
            icon={CheckCircle2}
            label="Amount Paid"
            value={formatCurrency(totalPaid)}
          />

          <StatCard
            icon={AlertCircle}
            label="Outstanding"
            value={formatCurrency(outstanding)}
          />

        </div>

        {/* Current Invoice */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 md:p-6">

          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

            <div>
              <div className="flex items-center gap-2">
                <FileText size={21} />

                <h2 className="text-lg font-bold">
                  Current Invoice
                </h2>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                {currentInvoice.id}
              </p>
            </div>

            <StatusBadge status={currentInvoice.status} />

          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">

            <div>
              <p className="text-xs text-gray-500">
                Session
              </p>

              <p className="mt-1 font-medium">
                {currentInvoice.session}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Term
              </p>

              <p className="mt-1 font-medium">
                {currentInvoice.term}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Issue Date
              </p>

              <p className="mt-1 font-medium">
                {formatDate(currentInvoice.issuedDate)}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Due Date
              </p>

              <p className="mt-1 font-medium">
                {formatDate(currentInvoice.dueDate)}
              </p>
            </div>

          </div>

          {/* Amount Summary */}
          <div className="my-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Invoice Total
              </p>

              <p className="mt-1 text-xl font-bold">
                {formatCurrency(currentInvoice.total)}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Amount Paid
              </p>

              <p className="mt-1 text-xl font-bold">
                {formatCurrency(currentInvoice.paid)}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Balance
              </p>

              <p className="mt-1 text-xl font-bold">
                {formatCurrency(
                  currentInvoice.total -
                    currentInvoice.paid
                )}
              </p>
            </div>

          </div>

          {/* Progress */}
          <div className="mb-6">

            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-500">
                Payment Progress
              </span>

              <span className="font-semibold">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gray-900"
                style={{ width: `${progress}%` }}
              />
            </div>

          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">

            <button
              onClick={() =>
                setSelectedInvoice(currentInvoice)
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-50"
            >
              <Eye size={17} />
              View Invoice
            </button>

            <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-50">
              <Download size={17} />
              Download
            </button>

            <button className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800">
              <CreditCard size={17} />
              Pay Balance
              <ArrowRight size={17} />
            </button>

          </div>
        </div>

        {/* Invoice History */}
        <div className="rounded-2xl border border-gray-200 bg-white">

          <div className="border-b border-gray-200 p-5">
            <h2 className="font-bold text-gray-900">
              Invoice History
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your previous and current invoices.
            </p>
          </div>

          {/* Search */}
          <div className="grid grid-cols-1 gap-3 border-b border-gray-200 p-4 md:grid-cols-2">

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search invoice..."
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 outline-none focus:border-gray-400"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Partially Paid">
                Partially Paid
              </option>
              <option value="Unpaid">Unpaid</option>
              <option value="Overdue">Overdue</option>
            </select>

          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">

              <thead className="bg-gray-50 text-sm text-gray-500">
                <tr>
                  <th className="px-5 py-4">Invoice</th>
                  <th className="px-5 py-4">Term</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Paid</th>
                  <th className="px-5 py-4">Balance</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>

                    <td className="px-5 py-4">
                      <p className="font-semibold">
                        {invoice.id}
                      </p>

                      <p className="text-xs text-gray-500">
                        {formatDate(invoice.issuedDate)}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm">
                      {invoice.term}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {formatCurrency(invoice.total)}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {formatCurrency(invoice.paid)}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {formatCurrency(
                        invoice.total - invoice.paid
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={invoice.status} />
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() =>
                          setSelectedInvoice(invoice)
                        }
                        className="rounded-lg p-2 hover:bg-gray-100"
                      >
                        <Eye size={18} />
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-3 p-4 md:hidden">

            {filteredInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="rounded-xl border border-gray-200 p-4"
              >

                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">
                      {invoice.id}
                    </p>

                    <p className="text-xs text-gray-500">
                      {invoice.term}
                    </p>
                  </div>

                  <StatusBadge status={invoice.status} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div>
                    <p className="text-xs text-gray-500">
                      Total
                    </p>

                    <p className="font-semibold">
                      {formatCurrency(invoice.total)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Balance
                    </p>

                    <p className="font-semibold">
                      {formatCurrency(
                        invoice.total - invoice.paid
                      )}
                    </p>
                  </div>

                </div>

                <button
                  onClick={() =>
                    setSelectedInvoice(invoice)
                  }
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-medium"
                >
                  <Eye size={16} />
                  View Invoice
                </button>

              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-5">

              <div>
                <h2 className="font-bold">
                  Invoice Details
                </h2>

                <p className="text-sm text-gray-500">
                  {selectedInvoice.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedInvoice(null)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-5">

              {/* Student */}
              <div className="mb-6 grid grid-cols-2 gap-4">

                <div>
                  <p className="text-xs text-gray-500">
                    Student
                  </p>

                  <p className="mt-1 font-semibold">
                    Jibreel Mujeeb
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Student ID
                  </p>

                  <p className="mt-1 font-semibold">
                    STU-2026-001
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Session
                  </p>

                  <p className="mt-1 font-semibold">
                    {selectedInvoice.session}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Term
                  </p>

                  <p className="mt-1 font-semibold">
                    {selectedInvoice.term}
                  </p>
                </div>

              </div>

              {/* Items */}
              <div className="overflow-hidden rounded-xl border border-gray-200">

                <div className="grid grid-cols-[1fr_auto] bg-gray-50 px-4 py-3 text-sm font-semibold">
                  <span>Description</span>
                  <span>Amount</span>
                </div>

                {selectedInvoice.items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1fr_auto] border-t border-gray-100 px-4 py-3 text-sm"
                  >
                    <span>{item.name}</span>
                    <span>
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                ))}

              </div>

              {/* Totals */}
              <div className="mt-5 ml-auto max-w-sm space-y-3">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Total
                  </span>

                  <span className="font-semibold">
                    {formatCurrency(selectedInvoice.total)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Paid
                  </span>

                  <span className="font-semibold">
                    {formatCurrency(selectedInvoice.paid)}
                  </span>
                </div>

                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="font-semibold">
                    Balance
                  </span>

                  <span className="font-bold">
                    {formatCurrency(
                      selectedInvoice.total -
                        selectedInvoice.paid
                    )}
                  </span>
                </div>

              </div>

            </div>

            {/* Modal Actions */}
            <div className="flex flex-col gap-3 border-t border-gray-200 p-5 sm:flex-row sm:justify-end">

              <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium">
                <Printer size={17} />
                Print
              </button>

              <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium">
                <Download size={17} />
                Download
              </button>

              {selectedInvoice.total >
                selectedInvoice.paid && (
                <button className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white">
                  <CreditCard size={17} />
                  Pay Balance
                </button>
              )}

            </div>

          </div>
        </div>
      )}
    </div>
  );
}