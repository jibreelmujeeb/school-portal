import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Download,
  FileText,
  Filter,
  Printer,
  Receipt,
  Search,
  Wallet,
  X,
} from "lucide-react";

const initialInvoices = [
  {
    id: 1,
    invoiceNumber: "INV-2026-00125",
    feeName: "School Fees",
    session: "2026/2027",
    term: "First Term",
    issuedDate: "01 Sep 2026",
    dueDate: "30 Sep 2026",
    totalAmount: 200000,
    amountPaid: 100000,
    status: "Partially Paid",
  },
  {
    id: 2,
    invoiceNumber: "INV-2026-00131",
    feeName: "Examination Fee",
    session: "2026/2027",
    term: "First Term",
    issuedDate: "03 Sep 2026",
    dueDate: "25 Sep 2026",
    totalAmount: 30000,
    amountPaid: 0,
    status: "Unpaid",
  },
  {
    id: 3,
    invoiceNumber: "INV-2026-00142",
    feeName: "ICT & Laboratory Fee",
    session: "2026/2027",
    term: "First Term",
    issuedDate: "05 Sep 2026",
    dueDate: "15 Sep 2026",
    totalAmount: 25000,
    amountPaid: 0,
    status: "Overdue",
  },
  {
    id: 4,
    invoiceNumber: "INV-2026-00148",
    feeName: "Library Fee",
    session: "2026/2027",
    term: "First Term",
    issuedDate: "07 Sep 2026",
    dueDate: "28 Sep 2026",
    totalAmount: 15000,
    amountPaid: 5000,
    status: "Partially Paid",
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
        styles[status] || "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >
      {status === "Overdue" ? (
        <AlertCircle size={13} />
      ) : (
        <Wallet size={13} />
      )}
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

function ActionButton({ icon: Icon, children, onClick, primary = false }) {
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

export default function StudentOutstanding() {
  const [invoices] = useState(initialInvoices);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const outstandingInvoices = useMemo(() => {
    return invoices.filter(
      (invoice) => invoice.totalAmount > invoice.amountPaid
    );
  }, [invoices]);

  const totalOutstanding = useMemo(
    () =>
      outstandingInvoices.reduce(
        (sum, invoice) =>
          sum + (invoice.totalAmount - invoice.amountPaid),
        0
      ),
    [outstandingInvoices]
  );

  const overdueAmount = useMemo(
    () =>
      outstandingInvoices
        .filter((invoice) => invoice.status === "Overdue")
        .reduce(
          (sum, invoice) =>
            sum + (invoice.totalAmount - invoice.amountPaid),
          0
        ),
    [outstandingInvoices]
  );

  const dueSoonAmount = useMemo(
    () =>
      outstandingInvoices
        .filter((invoice) => invoice.status !== "Overdue")
        .reduce(
          (sum, invoice) =>
            sum + (invoice.totalAmount - invoice.amountPaid),
          0
        ),
    [outstandingInvoices]
  );

  const filteredInvoices = outstandingInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      invoice.feeName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || invoice.status === status;

    return matchesSearch && matchesStatus;
  });

  const paymentProgress = (invoice) =>
    Math.round(
      (invoice.amountPaid / invoice.totalAmount) * 100
    );

  const handlePay = (invoice) => {
    alert(
      `Payment process started for ${invoice.invoiceNumber}`
    );
  };

  const handleDownload = (invoice) => {
    alert(`Downloading ${invoice.invoiceNumber}`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Wallet size={16} />
              <span>Student Finance</span>
              <span>/</span>
              <span>Outstanding</span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Outstanding Fees
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View and manage your outstanding school payments.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <ActionButton
              icon={Receipt}
              onClick={() =>
                alert("Opening payment history")
              }
            >
              Payment History
            </ActionButton>

            <ActionButton
              icon={Printer}
              onClick={handlePrint}
            >
              Print
            </ActionButton>
          </div>
        </div>

        {/* Student information */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                AJ
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Abdulrahman Jibreel
                </h2>
                <p className="text-sm text-slate-500">
                  Student ID: STU-2026-0012 · SS 2A
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs text-slate-500">
                Current Session
              </p>
              <p className="font-semibold text-slate-900">
                2026/2027 · First Term
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Wallet}
            title="Total Outstanding"
            value={formatCurrency(totalOutstanding)}
            description="Amount currently owed"
          />

          <StatCard
            icon={AlertCircle}
            title="Overdue"
            value={formatCurrency(overdueAmount)}
            description="Requires immediate attention"
          />

          <StatCard
            icon={CalendarDays}
            title="Due Soon"
            value={formatCurrency(dueSoonAmount)}
            description="Pending payment"
          />

          <StatCard
            icon={FileText}
            title="Outstanding Invoices"
            value={outstandingInvoices.length}
            description="Invoices with balances"
          />
        </div>

        {/* Balance alert */}
        <div className="my-6 flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <AlertCircle
              size={22}
              className="mt-0.5 shrink-0 text-amber-600"
            />

            <div>
              <h3 className="font-semibold text-amber-900">
                Outstanding balance requires attention
              </h3>
              <p className="mt-1 text-sm text-amber-800">
                You currently have{" "}
                <strong>{formatCurrency(totalOutstanding)}</strong>{" "}
                in unpaid school fees.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const first = outstandingInvoices[0];
              if (first) handlePay(first);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <CreditCard size={17} />
            Pay Outstanding
          </button>
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
                placeholder="Search invoice number or fee..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-slate-400"
              />
            </div>

            <div className="relative">
              <Filter
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm outline-none focus:border-slate-400"
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

        {/* Invoice table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-2 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Outstanding Invoices
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredInvoices.length} invoice(s) found
              </p>
            </div>

            <button
              onClick={() => alert("Exporting outstanding invoices")}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Download size={16} />
              Export
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4">Invoice</th>
                  <th className="px-5 py-4">Fee</th>
                  <th className="px-5 py-4">Due Date</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Balance</th>
                  <th className="px-5 py-4">Progress</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredInvoices.map((invoice) => {
                  const balance =
                    invoice.totalAmount - invoice.amountPaid;

                  return (
                    <tr
                      key={invoice.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <button
                          onClick={() =>
                            setSelectedInvoice(invoice)
                          }
                          className="font-semibold text-slate-900 hover:underline"
                        >
                          {invoice.invoiceNumber}
                        </button>

                        <p className="mt-1 text-xs text-slate-500">
                          {invoice.term} · {invoice.session}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-700">
                        {invoice.feeName}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <CalendarDays size={15} />
                          {invoice.dueDate}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                        {formatCurrency(invoice.totalAmount)}
                      </td>

                      <td className="px-5 py-4 text-sm font-bold text-red-600">
                        {formatCurrency(balance)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="w-28">
                          <div className="mb-1 flex justify-between text-xs text-slate-500">
                            <span>
                              {paymentProgress(invoice)}%
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-slate-900"
                              style={{
                                width: `${paymentProgress(
                                  invoice
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={invoice.status} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setSelectedInvoice(invoice)
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                            title="View invoice"
                          >
                            <ArrowUpRight size={16} />
                          </button>

                          <button
                            onClick={() => handlePay(invoice)}
                            className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                          >
                            Pay
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredInvoices.length === 0 && (
              <div className="px-5 py-16 text-center">
                <CheckCircle2
                  size={40}
                  className="mx-auto text-emerald-500"
                />

                <h3 className="mt-4 font-semibold text-slate-900">
                  No outstanding invoices
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  You have no unpaid invoices matching your search.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Payment information */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                <CreditCard size={19} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Payment Options
                </h3>
                <p className="text-sm text-slate-500">
                  Securely pay your outstanding balance online.
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-3 text-sm">
                <p className="font-medium text-slate-900">
                  Online Payment
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Pay using card, bank transfer or other supported
                  methods.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3 text-sm">
                <p className="font-medium text-slate-900">
                  School Payment
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Visit the school finance office for assistance.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                <FileText size={19} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Payment Reminder
                </h3>
                <p className="text-sm text-slate-500">
                  Keep your account up to date.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Please settle outstanding balances before their due
              dates to avoid restrictions or additional charges
              according to the school's financial policy.
            </p>
          </div>
        </div>
      </div>

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Invoice Details
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {selectedInvoice.invoiceNumber}
                </h2>
              </div>

              <button
                onClick={() => setSelectedInvoice(null)}
                className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">
                    Fee
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {selectedInvoice.feeName}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">
                    Status
                  </p>
                  <div className="mt-2">
                    <StatusBadge
                      status={selectedInvoice.status}
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">
                    Total Amount
                  </p>
                  <p className="mt-1 font-bold text-slate-900">
                    {formatCurrency(
                      selectedInvoice.totalAmount
                    )}
                  </p>
                </div>

                <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                  <p className="text-xs text-red-600">
                    Outstanding
                  </p>
                  <p className="mt-1 font-bold text-red-700">
                    {formatCurrency(
                      selectedInvoice.totalAmount -
                        selectedInvoice.amountPaid
                    )}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">
                    Amount Paid
                  </p>
                  <p className="mt-1 font-semibold text-emerald-600">
                    {formatCurrency(
                      selectedInvoice.amountPaid
                    )}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">
                    Due Date
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {selectedInvoice.dueDate}
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-500">
                    Payment Progress
                  </span>

                  <span className="font-semibold text-slate-900">
                    {paymentProgress(selectedInvoice)}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-900"
                    style={{
                      width: `${paymentProgress(
                        selectedInvoice
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-5">
                <ActionButton
                  icon={Download}
                  onClick={() =>
                    handleDownload(selectedInvoice)
                  }
                >
                  Download
                </ActionButton>

                <ActionButton
                  icon={Printer}
                  onClick={handlePrint}
                >
                  Print
                </ActionButton>

                <ActionButton
                  icon={CreditCard}
                  primary
                  onClick={() => handlePay(selectedInvoice)}
                >
                  Pay Balance
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}