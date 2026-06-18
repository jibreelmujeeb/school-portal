import React, { useMemo, useState } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Receipt,
  Search,
  Download,
} from "lucide-react";

const transactions = [
  {
    id: 1,
    title: "School Fees Payment",
    student: "John Doe",
    amount: "₦120,000",
    type: "Income",
    date: "2026-05-20",
  },
  {
    id: 2,
    title: "Laboratory Equipment",
    student: "Expense",
    amount: "₦45,000",
    type: "Expense",
    date: "2026-05-18",
  },
  {
    id: 3,
    title: "Exam Registration",
    student: "Sarah James",
    amount: "₦80,000",
    type: "Income",
    date: "2026-05-15",
  },
];

const formatCsvValue = (value) => {
  const stringValue = String(value ?? "");

  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }

  return stringValue;
};

const AdminFinancePage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleExportReport = () => {
    const headers = ["ID", "Transaction", "Student", "Amount", "Type", "Date"];

    const rows = transactions.map((item) => [
      item.id,
      item.title,
      item.student,
      item.amount,
      item.type,
      item.date,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map(formatCsvValue).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `finance-report-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return transactions.filter((item) => {
      const matchesTab = activeTab === "All" || item.type === activeTab;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [item.title, item.student, item.type, item.date]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Finance Management
          </h1>

          <p className="text-sm text-gray-600 mt-2">
            Monitor school income, expenses, and transactions
          </p>
        </div>

        {/* EXPORT */}
        <button
          type="button"
          onClick={handleExportReport}
          className="flex items-center justify-center gap-2 px-5 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </section>

      {/* FINANCE STATS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* TOTAL BALANCE */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Wallet className="w-4 h-4 text-blue-600" />
            Total Balance
          </div>

          <h2 className="text-2xl font-semibold mt-3">₦25.4M</h2>
        </div>

        {/* TOTAL INCOME */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <TrendingUp className="w-4 h-4 text-green-600" />
            Total Income
          </div>

          <h2 className="text-2xl font-semibold mt-3">₦18.7M</h2>
        </div>

        {/* TOTAL EXPENSE */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <TrendingDown className="w-4 h-4 text-red-600" />
            Total Expense
          </div>

          <h2 className="text-2xl font-semibold mt-3">₦6.7M</h2>
        </div>

        {/* TRANSACTIONS */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CreditCard className="w-4 h-4 text-purple-600" />
            Transactions
          </div>

          <h2 className="text-2xl font-semibold mt-3">540</h2>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="flex flex-wrap gap-2">
        {["All", "Income", "Expense"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-blue-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </section>

      {/* SEARCH */}
      <section>
        <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 bg-white">
          <Search className="w-4 h-4 text-gray-500 mr-2" />

          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>
      </section>

      {/* TRANSACTIONS */}
      <section className="space-y-4">
        {filteredTransactions.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-2xl p-5 bg-white"
          >
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
              {/* LEFT */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      item.type === "Income" ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    <Receipt
                      className={`w-5 h-5 ${
                        item.type === "Income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    />
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg">{item.title}</h2>

                    <p className="text-sm text-gray-500">{item.student}</p>
                  </div>
                </div>

                {/* DATE */}
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* AMOUNT */}
                <div
                  className={`text-lg font-semibold ${
                    item.type === "Income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.type === "Income" ? "+" : "-"}
                  {item.amount}
                </div>

                {/* TYPE */}
                <div
                  className={`px-4 py-2 rounded-full border text-sm ${
                    item.type === "Income"
                      ? "border-green-200 bg-green-50 text-green-600"
                      : "border-red-200 bg-red-50 text-red-600"
                  }`}
                >
                  {item.type}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* EMPTY STATE */}
      {filteredTransactions.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No financial transactions available for this view.
        </div>
      )}
    </div>
  );
};

export default AdminFinancePage;
