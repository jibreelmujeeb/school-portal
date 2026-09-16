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
  Users,
  Wallet,
  X,
} from "lucide-react";

const children = [
  {
    id: "STU-2026-0012",
    name: "Abdulrahman Jibreel",
    className: "SS 2A",
    initials: "AJ",
  },
  {
    id: "STU-2026-0045",
    name: "Aisha Jibreel",
    className: "JSS 3B",
    initials: "AI",
  },
];

const invoices = [
  {
    id: 1,
    invoiceNumber: "INV-2026-00125",
    studentId: "STU-2026-0012",
    studentName: "Abdulrahman Jibreel",
    className: "SS 2A",
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
    studentId: "STU-2026-0012",
    studentName: "Abdulrahman Jibreel",
    className: "SS 2A",
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
    studentId: "STU-2026-0012",
    studentName: "Abdulrahman Jibreel",
    className: "SS 2A",
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
    invoiceNumber: "INV-2026-00205",
    studentId: "STU-2026-0045",
    studentName: "Aisha Jibreel",
    className: "JSS 3B",
    feeName: "School Fees",
    session: "2026/2027",
    term: "First Term",
    issuedDate: "01 Sep 2026",
    dueDate: "30 Sep 2026",
    totalAmount: 180000,
    amountPaid: 80000,
    status: "Partially Paid",
  },
  {
    id: 5,
    invoiceNumber: "INV-2026-00211",
    studentId: "STU-2026-0045",
    studentName: "Aisha Jibreel",
    className: "JSS 3B",
    feeName: "Examination Fee",
    session: "2026/2027",
    term: "First Term",
    issuedDate: "04 Sep 2026",
    dueDate: "25 Sep 2026",
    totalAmount: 25000,
    amountPaid: 0,
    status: "Unpaid",
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
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
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

export default function ParentOutstanding() {
  const [selectedChild, setSelectedChild] = useState("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const outstandingInvoices = useMemo(() => {
    return invoices.filter(
      (invoice) => invoice.totalAmount > invoice.amountPaid
    );
  }, []);

  const filteredInvoices = useMemo(() => {
    return outstandingInvoices.filter((invoice) => {
      const matchesChild =
        selectedChild === "all" ||
        invoice.studentId === selectedChild;

      const matchesStatus =
        status === "All" || invoice.status === status;

      const matchesSearch =
        invoice.invoiceNumber
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        invoice.feeName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        invoice.studentName
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesChild && matchesStatus && matchesSearch;
    });
  }, [outstandingInvoices, selectedChild, status, search]);

  const totalOutstanding = filteredInvoices.reduce(
    (sum, invoice) =>
      sum + invoice.totalAmount - invoice.amountPaid,
    0
  );

  const overdueAmount = filteredInvoices
    .filter((invoice) => invoice.status === "Overdue")
    .reduce(
      (sum, invoice) =>
        sum + invoice.totalAmount - invoice.amountPaid,
      0
    );

  const dueSoon = filteredInvoices
    .filter((invoice) => invoice.status !== "Overdue")
    .reduce(
      (sum, invoice) =>
        sum + invoice.totalAmount - invoice.amountPaid,
      0
    );

  const handlePay = (invoice) => {
    alert(
      `Starting payment for ${invoice.invoiceNumber} - ${formatCurrency(
        
        invoice.totalAmount - invoice.amountPaid
      )}`
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
              <span>Parent Finance</span>
              <span>/</span>
              <span>Outstanding</span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Outstanding Fees
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor and pay outstanding balances for your children.
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

        {/* Children Overview */}
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <button
            onClick={() => setSelectedChild("all")}
            className={`rounded-2xl border p-4 text-left transition ${
              selectedChild === "all"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  selectedChild === "all"
                    ? "bg-white/10"
                    : "bg-slate-100"
                }`}
              >
                <Users size={20} />
              </div>

              <div>
                <p
                  className={`text-xs ${
                    selectedChild === "all"
                      ? "text-slate-300"
                      : "text-slate-500"
                  }`}
                >
                  Children
                </p>

                <p className="font-bold">
                  All Children
                </p>
              </div>
            </div>
          </button>

          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child.id)}
              className={`rounded-2xl border p-4 text-left transition ${
                selectedChild === child.id
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${
                    selectedChild === child.id
                      ? "bg-white/10"
                      : "bg-slate-100"
                  }`}
                >
                  {child.initials}
                </div>

                <div>
                  <p className="font-bold">
                    {child.name}
                  </p>

                  <p
                    className={`text-xs ${
                      selectedChild === child.id
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  >
                    {child.id} · {child.className}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Wallet}
            title="Total Outstanding"
            value={formatCurrency(totalOutstanding)}
            description="Current unpaid balance"
          />

          <StatCard
            icon={AlertCircle}
            title="Overdue"
            value={formatCurrency(overdueAmount)}
            description="Requires attention"
          />

          <StatCard
            icon={CalendarDays}
            title="Due Soon"
            value={formatCurrency(dueSoon)}
            description="Pending balances"
          />

          <StatCard
            icon={FileText}
            title="Invoices"
            value={filteredInvoices.length}
            description="Outstanding invoices"
          />
        </div>

        {/* Alert */}
        {totalOutstanding > 0 && (
          <div className="my-6 flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <AlertCircle
                size={22}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <div>
                <h3 className="font-semibold text-amber-900">
                  Outstanding balance
                </h3>

                <p className="mt-1 text-sm text-amber-800">
                  You currently have{" "}
                  <strong>
                    {formatCurrency(totalOutstanding)}
                  </strong>{" "}
                  in outstanding fees.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (filteredInvoices[0]) {
                  handlePay(filteredInvoices[0]);
                }
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <CreditCard size={17} />
              Pay Outstanding
            </button>
          </div>
        )}

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
                placeholder="Search invoice, fee or child..."
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
                className="appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm outline-none"
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

        {/* Invoice Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-5">
            <h2 className="font-bold text-slate-900">
              Outstanding Invoices
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredInvoices.length} outstanding invoice(s)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4">Child</th>
                  <th className="px-5 py-4">Invoice</th>
                  <th className="px-5 py-4">Fee</th>
                  <th className="px-5 py-4">Due Date</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Outstanding</th>
                  <th className="px-5 py-4">Progress</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredInvoices.map((invoice) => {
                  const balance =
                    invoice.totalAmount - invoice.amountPaid;

                  const progress = Math.round(
                    (invoice.amountPaid /
                      invoice.totalAmount) *
                      100
                  );

                  return (
                    <tr
                      key={invoice.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">
                          {invoice.studentName}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {invoice.className}
                        </p>
                      </td>

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
                          {invoice.term}
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

                      <td className="px-5 py-4 text-sm font-semibold">
                        {formatCurrency(invoice.totalAmount)}
                      </td>

                      <td className="px-5 py-4 text-sm font-bold text-red-600">
                        {formatCurrency(balance)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="w-28">
                          <div className="mb-1 flex justify-between text-xs text-slate-500">
                            <span>{progress}%</span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-slate-900"
                              style={{
                                width: `${progress}%`,
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
                  size={42}
                  className="mx-auto text-emerald-500"
                />

                <h3 className="mt-4 font-semibold text-slate-900">
                  No outstanding fees
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  There are no outstanding invoices matching your
                  selection.
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
                  Pay outstanding fees securely online.
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">
                  Online Payment
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Pay with card, bank transfer or other supported
                  payment methods.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">
                  Finance Office
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Visit the school finance office if you need
                  payment assistance.
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
                  Financial Notice
                </h3>

                <p className="text-sm text-slate-500">
                  Keep your children's accounts up to date.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Please settle outstanding balances before their due
              dates according to the school's financial policy.
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
                <p className="text-xs uppercase tracking-wide text-slate-500">
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
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 font-bold">
                    {selectedInvoice.studentName
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {selectedInvoice.studentName}
                    </p>

                    <p className="text-sm text-slate-500">
                      {selectedInvoice.className} ·{" "}
                      {selectedInvoice.studentId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-500">
                    Fee
                  </p>

                  <p className="mt-1 font-semibold">
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

                  <p className="mt-1 font-bold">
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

                  <p className="mt-1 font-semibold">
                    {selectedInvoice.dueDate}
                  </p>
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