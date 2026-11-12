import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Download,
  Calendar,
  DollarSign,
  Wallet,
  TrendingUp,
  Receipt,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import { formatNaira, initialExpenses, initialPayments } from "../../data/accountantData";
import downloadCsv from "../../utils/downloadCsv";

export default function FinancialReportsPage() {
  const [payments, , paymentError] = usePersistentState("accountant-payments", initialPayments);
  const [expenses, , expenseError] = usePersistentState("accountant-expenses", initialExpenses);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredPayments = payments.filter((payment) =>
    payment.status === "Verified" &&
    (!fromDate || payment.date >= fromDate) &&
    (!toDate || payment.date <= toDate)
  );
  const filteredExpenses = expenses.filter((expense) =>
    (!fromDate || expense.date >= fromDate) &&
    (!toDate || expense.date <= toDate)
  );
  const revenue = filteredPayments.reduce((sum, item) => sum + item.amount, 0);
  const expenseTotal = filteredExpenses.reduce((sum, item) => sum + item.amount, 0);

  const monthlyData = useMemo(() => {
    const months = new Map();
    filteredPayments.forEach((payment) => {
      const month = payment.date.slice(0, 7);
      const row = months.get(month) || { month, revenue: 0, expenses: 0 };
      row.revenue += payment.amount;
      months.set(month, row);
    });
    filteredExpenses.forEach((expense) => {
      const month = expense.date.slice(0, 7);
      const row = months.get(month) || { month, revenue: 0, expenses: 0 };
      row.expenses += expense.amount;
      months.set(month, row);
    });
    return [...months.values()].sort((a, b) => a.month.localeCompare(b.month));
  }, [filteredPayments, filteredExpenses]);

  const exportReport = () => {
    downloadCsv("financial-report.csv", [
      ["Month", "Verified Revenue", "Expenses", "Net Income"],
      ...monthlyData.map((item) => [
        item.month,
        item.revenue,
        item.expenses,
        item.revenue - item.expenses,
      ]),
    ]);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <h1 className="text-3xl font-bold">Financial Reports</h1>
          <p className="mt-2 text-gray-500">Review verified income and recorded expenses for a selected period.</p>
        </div>
        <button onClick={exportReport} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {(paymentError || expenseError) && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{paymentError || expenseError}</p>}

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <Stat icon={<DollarSign />} value={formatNaira(revenue)} label="Verified Revenue" />
        <Stat icon={<Wallet />} value={formatNaira(expenseTotal)} label="Recorded Expenses" />
        <Stat icon={<TrendingUp />} value={formatNaira(revenue - expenseTotal)} label="Net Income" />
        <Stat icon={<Receipt />} value={filteredPayments.length} label="Verified Payments" />
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border p-4 md:flex-row md:items-end">
        <label className="flex-1">
          <span className="mb-1 flex items-center gap-2 text-sm text-gray-600"><Calendar size={16} /> From</span>
          <input type="date" value={fromDate} max={toDate || undefined} onChange={(event) => setFromDate(event.target.value)} className="w-full rounded-xl border p-3" />
        </label>
        <label className="flex-1">
          <span className="mb-1 flex items-center gap-2 text-sm text-gray-600"><Calendar size={16} /> To</span>
          <input type="date" value={toDate} min={fromDate || undefined} onChange={(event) => setToDate(event.target.value)} className="w-full rounded-xl border p-3" />
        </label>
        <button onClick={() => { setFromDate(""); setToDate(""); }} className="rounded-xl border px-5 py-3">Clear dates</button>
      </div>

      <div className="rounded-3xl border p-6">
        <h2 className="mb-4 text-xl font-bold">Revenue vs Expenses</h2>
        {monthlyData.length > 0 ? (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatNaira(value)} />
                <Legend />
                <Bar dataKey="revenue" name="Verified Revenue" fill="#2563eb" />
                <Bar dataKey="expenses" name="Expenses" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="py-12 text-center text-gray-500">No financial activity matches this date range.</p>
        )}
      </div>

      <div className="overflow-hidden rounded-3xl border">
        <div className="border-b p-5"><h2 className="text-xl font-bold">Monthly Summary</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50">
              <tr>{["Period", "Verified Revenue", "Expenses", "Net Income"].map((heading) => <th key={heading} className="p-4 text-left">{heading}</th>)}</tr>
            </thead>
            <tbody>
              {monthlyData.map((item) => (
                <tr key={item.month} className="border-t">
                  <td className="p-4">{item.month}</td>
                  <td className="p-4">{formatNaira(item.revenue)}</td>
                  <td className="p-4">{formatNaira(item.expenses)}</td>
                  <td className={`p-4 font-semibold ${item.revenue - item.expenses < 0 ? "text-red-600" : "text-green-600"}`}>{formatNaira(item.revenue - item.expenses)}</td>
                </tr>
              ))}
              {monthlyData.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-gray-500">No activity for the selected period.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return <div className="rounded-3xl border p-5"><span className="mb-3 inline-block text-blue-600">{icon}</span><h2 className="text-2xl font-bold">{value}</h2><p>{label}</p></div>;
}
