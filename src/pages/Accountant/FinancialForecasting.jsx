import React, { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  AlertTriangle,
  Download,
  Calendar,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import { formatNaira, initialExpenses, initialPayments } from "../../data/accountantData";
import downloadCsv from "../../utils/downloadCsv";
import { recordAccountantAuditEvent } from "../../data/accountantAuditData";

const departments = ["All Departments", "Academic", "Administration", "ICT", "Library"];

function addMonths(date, amount) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + amount);
  return result;
}

function monthLabel(date) {
  return date.toLocaleDateString("en-NG", { month: "short", year: "numeric" });
}

export default function AccountantForecastingPage() {
  const [payments, , paymentError] = usePersistentState("accountant-payments", initialPayments);
  const [expenses, , expenseError] = usePersistentState("accountant-expenses", initialExpenses);
  const [savedForecast, setSavedForecast, forecastError] = usePersistentState("accountant-forecast", null);
  const [horizon, setHorizon] = useState(6);
  const [department, setDepartment] = useState("All Departments");
  const [chartMetric, setChartMetric] = useState("income");
  const [incomeGrowth, setIncomeGrowth] = useState(3);
  const [expenseGrowth, setExpenseGrowth] = useState(2);
  const [message, setMessage] = useState("");

  const verifiedPayments = payments.filter((payment) => payment.status === "Verified");
  const matchingExpenses = expenses.filter((expense) =>
    department === "All Departments" || expense.department === department
  );
  const monthlyData = useMemo(() => {
    const months = new Set([
      ...verifiedPayments.map((item) => item.date.slice(0, 7)),
      ...matchingExpenses.map((item) => item.date.slice(0, 7)),
    ]);
    const monthCount = Math.max(months.size, 1);
    return {
      count: monthCount,
      income: verifiedPayments.reduce((sum, item) => sum + item.amount, 0) / monthCount,
      expenses: matchingExpenses.reduce((sum, item) => sum + item.amount, 0) / monthCount,
    };
  }, [verifiedPayments, matchingExpenses]);

  const projection = useMemo(() => {
    const rows = Array.from({ length: horizon }, (_, index) => {
      const month = addMonths(new Date(), index + 1);
      const income = Math.round(monthlyData.income * (1 + incomeGrowth / 100) ** (index + 1));
      const expense = Math.round(monthlyData.expenses * (1 + expenseGrowth / 100) ** (index + 1));
      return {
        month: monthLabel(month),
        income,
        expenses: expense,
        balance: income - expense,
      };
    });
    const income = rows.reduce((sum, row) => sum + row.income, 0);
    const expensesTotal = rows.reduce((sum, row) => sum + row.expenses, 0);
    return { rows, income, expenses: expensesTotal, balance: income - expensesTotal };
  }, [horizon, monthlyData, incomeGrowth, expenseGrowth]);

  const expectedDebt = payments
    .filter((payment) => payment.status === "Pending")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const generateForecast = () => {
    const forecast = {
      ...projection,
      horizon,
      department,
      incomeGrowth,
      expenseGrowth,
      generatedAt: new Date().toISOString(),
    };
    setSavedForecast(forecast);
    setMessage("Forecast generated and saved in this browser.");
    try {
      recordAccountantAuditEvent({
        action: "Forecast Generated",
        module: "Financial Forecasting",
        record: `${horizon} months`,
      });
    } catch {
      setMessage("Forecast saved, but the audit event could not be recorded.");
    }
  };

  const exportForecast = () => downloadCsv("financial-forecast.csv", [
    ["Month", "Projected Income", "Projected Expenses", "Expected Balance"],
    ...projection.rows.map((row) => [row.month, row.income, row.expenses, row.balance]),
  ]);

  const scenario = (incomeFactor, expenseFactor) => ({
    income: Math.round(projection.income * incomeFactor),
    expenses: Math.round(projection.expenses * expenseFactor),
  });
  const scenarios = [
    { title: "Conservative", ...scenario(0.9, 1.05) },
    { title: "Expected", ...scenario(1, 1) },
    { title: "Optimistic", ...scenario(1.1, 0.95) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold">Financial Forecasting</h1>
          <p className="mt-1 text-gray-500">Project future income, expenses, and cash flow from recorded finance data.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={exportForecast} className="flex items-center gap-2 rounded-xl border px-5 py-3"><Download size={18} />Export CSV</button>
          <button onClick={generateForecast} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"><Calendar size={18} />Generate Forecast</button>
        </div>
      </div>

      {(paymentError || expenseError || forecastError) && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{paymentError || expenseError || forecastError}</p>}
      {message && <p role="status" className="text-sm text-blue-700">{message}</p>}
      {savedForecast && (
        <p className="text-sm text-gray-500">
          Last generated {new Date(savedForecast.generatedAt).toLocaleString()} for {savedForecast.horizon} months ({savedForecast.department}).
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block text-sm">Forecast horizon
          <select value={horizon} onChange={(event) => setHorizon(Number(event.target.value))} className="mt-1 w-full rounded-xl border px-4 py-3">
            <option value="3">Next 3 Months</option><option value="6">Next 6 Months</option><option value="12">Next 12 Months</option>
          </select>
        </label>
        <label className="block text-sm">Department
          <select value={department} onChange={(event) => setDepartment(event.target.value)} className="mt-1 w-full rounded-xl border px-4 py-3">
            {departments.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="block text-sm">Income growth per month (%)
          <input type="number" min="-100" max="100" step="0.5" value={incomeGrowth} onChange={(event) => setIncomeGrowth(Number(event.target.value))} className="mt-1 w-full rounded-xl border px-4 py-3" />
        </label>
        <label className="block text-sm">Expense growth per month (%)
          <input type="number" min="-100" max="100" step="0.5" value={expenseGrowth} onChange={(event) => setExpenseGrowth(Number(event.target.value))} className="mt-1 w-full rounded-xl border px-4 py-3" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={<TrendingUp />} value={formatNaira(projection.income)} label={`Forecast Income · ${horizon} mo.`} />
        <Stat icon={<TrendingDown />} value={formatNaira(projection.expenses)} label={`Forecast Expenses · ${horizon} mo.`} />
        <Stat icon={<Wallet />} value={formatNaira(projection.balance)} label="Expected Net Balance" />
        <Stat icon={<AlertTriangle />} value={formatNaira(expectedDebt)} label="Pending Payment Verification" />
      </div>

      <div className="rounded-3xl border p-6">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold">Financial Forecast</h2>
            <p className="text-sm text-gray-500">Projected monthly values use recorded totals as the baseline.</p>
          </div>
          <label className="sr-only" htmlFor="forecast-metric">Chart metric</label>
          <select id="forecast-metric" value={chartMetric} onChange={(event) => setChartMetric(event.target.value)} className="rounded-xl border px-3 py-2">
            <option value="income">Income</option><option value="expenses">Expenses</option><option value="balance">Cash Flow</option>
          </select>
        </div>
        {projection.rows.length > 0 ? (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projection.rows}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatNaira(value)} />
                <Line type="monotone" dataKey={chartMetric} stroke="#2563eb" strokeWidth={3} dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : <p className="py-12 text-center text-gray-500">No forecast periods available.</p>}
      </div>

      <div className="rounded-3xl border p-6">
        <h2 className="text-xl font-bold">Forecast Scenarios</h2>
        <p className="mt-1 text-sm text-gray-500">Scenario totals apply conservative or optimistic adjustments to the selected forecast.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {scenarios.map((item) => (
            <Scenario key={item.title} title={item.title} income={item.income} expenses={item.expenses} />
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border">
        <div className="border-b p-5"><h2 className="text-xl font-bold">Forecast Summary</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="border-b bg-gray-50"><tr>{["Period", "Income", "Expenses", "Expected Balance"].map((item) => <th key={item} className="p-4 text-left">{item}</th>)}</tr></thead>
            <tbody>
              {projection.rows.map((row) => (
                <tr key={row.month} className="border-b">
                  <td className="p-4 font-semibold">{row.month}</td>
                  <td className="p-4">{formatNaira(row.income)}</td>
                  <td className="p-4">{formatNaira(row.expenses)}</td>
                  <td className={`p-4 ${row.balance < 0 ? "text-red-600" : "text-green-600"}`}>{formatNaira(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return <div className="rounded-2xl border p-5">{icon}<h2 className="mt-3 text-2xl font-bold">{value}</h2><p className="text-sm text-gray-500">{label}</p></div>;
}

function Scenario({ title, income, expenses }) {
  return (
    <div className="rounded-2xl border p-5">
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="mt-4 space-y-3">
        <div className="flex justify-between"><span className="text-gray-500">Income</span><strong>{formatNaira(income)}</strong></div>
        <div className="flex justify-between"><span className="text-gray-500">Expenses</span><strong>{formatNaira(expenses)}</strong></div>
        <div className="flex justify-between border-t pt-3"><span className="text-gray-500">Balance</span><strong>{formatNaira(income - expenses)}</strong></div>
      </div>
    </div>
  );
}
