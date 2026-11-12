import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Download,
  Wallet,
  Calendar,
  FileText,
  X,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import { formatNaira, initialExpenses } from "../../data/accountantData";
import downloadCsv from "../../utils/downloadCsv";

const emptyExpense = {
  title: "",
  category: "",
  department: "",
  vendor: "",
  amount: "",
  paymentMethod: "Bank Transfer",
  date: new Date().toISOString().slice(0, 10),
  status: "Pending",
};

export default function AccountantExpensesPage() {
  const [expenses, setExpenses, storageError] = usePersistentState(
    "accountant-expenses",
    initialExpenses
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingExpense, setEditingExpense] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewingExpense, setViewingExpense] = useState(null);
  const [form, setForm] = useState(emptyExpense);
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return expenses.filter((expense) => {
      const matchesSearch = [
        expense.title,
        expense.id,
        expense.category,
        expense.department,
        expense.vendor,
      ].some((value) => value.toLowerCase().includes(query));
      return matchesSearch &&
        (statusFilter === "All" || expense.status === statusFilter);
    });
  }, [expenses, search, statusFilter]);

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const today = new Date().toISOString().slice(0, 10);
  const todayTotal = expenses
    .filter((expense) => expense.date === today)
    .reduce((sum, expense) => sum + expense.amount, 0);

  const openNewExpense = () => {
    setEditingExpense(null);
    setForm({ ...emptyExpense, date: today });
    setMessage("");
    setIsFormOpen(true);
  };

  const saveExpense = (event) => {
    event.preventDefault();
    const amount = Number(form.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setMessage("Enter an amount greater than zero.");
      return;
    }

    if (editingExpense) {
      setExpenses((current) =>
        current.map((item) =>
          item.id === editingExpense.id
            ? { ...form, amount, id: editingExpense.id }
            : item
        )
      );
      setMessage("Expense updated.");
    } else {
      const id = `EXP-${Date.now()}`;
      setExpenses((current) => [{ ...form, amount, id }, ...current]);
      setMessage("Expense added.");
    }
    setEditingExpense(null);
    setIsFormOpen(false);
  };

  const editExpense = (expense) => {
    setEditingExpense(expense);
    setForm({ ...expense, amount: String(expense.amount) });
    setMessage("");
    setIsFormOpen(true);
  };

  const deleteExpense = (expense) => {
    if (!window.confirm(`Delete "${expense.title}"? This cannot be undone.`)) return;
    setExpenses((current) => current.filter((item) => item.id !== expense.id));
    setMessage("Expense deleted.");
  };

  const exportExpenses = () => {
    downloadCsv("expenses.csv", [
      ["ID", "Expense", "Category", "Department", "Vendor", "Amount", "Method", "Date", "Status"],
      ...filtered.map((expense) => [
        expense.id,
        expense.title,
        expense.category,
        expense.department,
        expense.vendor,
        expense.amount,
        expense.paymentMethod,
        expense.date,
        expense.status,
      ]),
    ]);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <h1 className="text-3xl font-bold">Expenses</h1>
          <p className="mt-2 text-gray-500">Manage school operational expenses and payments.</p>
        </div>
        <button onClick={openNewExpense} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white">
          <Plus size={18} />
          Add Expense
        </button>
      </div>

      {storageError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{storageError}</p>}

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <Stat icon={<Wallet />} label="Total Expenses" value={formatNaira(total)} />
        <Stat icon={<Calendar />} label="Today's Expenses" value={formatNaira(todayTotal)} />
        <Stat icon={<FileText />} label="Pending Approval" value={expenses.filter((item) => item.status === "Pending").length} />
        <Stat icon={<Wallet />} label="Expense Records" value={expenses.length} />
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <label className="flex flex-1 items-center rounded-xl border px-4 py-3">
          <Search className="mr-3" />
          <span className="sr-only">Search expenses</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, category, vendor or ID..." className="w-full outline-none" />
        </label>
        <label className="sr-only" htmlFor="expense-status">Filter expenses by status</label>
        <select id="expense-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border px-5">
          <option value="All">All statuses</option>
          <option>Paid</option>
          <option>Pending</option>
        </select>
        <button onClick={exportExpenses} className="flex items-center justify-center gap-2 rounded-xl border px-5">
          <Download size={18} />
          Export filtered
        </button>
      </div>

      {message && !editingExpense && <p role="status" className="text-sm text-blue-700">{message}</p>}

      <div className="overflow-x-auto rounded-3xl border">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-gray-50">
            <tr>{["ID", "Expense", "Category", "Department", "Vendor", "Amount", "Method", "Date", "Status", "Actions"].map((item) => <th key={item} className="p-3 text-left">{item}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((expense) => (
              <tr key={expense.id} className="border-t">
                <td className="p-3">{expense.id}</td>
                <td className="p-3">{expense.title}</td>
                <td className="p-3">{expense.category}</td>
                <td className="p-3">{expense.department}</td>
                <td className="p-3">{expense.vendor}</td>
                <td className="p-3">{formatNaira(expense.amount)}</td>
                <td className="p-3">{expense.paymentMethod}</td>
                <td className="p-3">{expense.date}</td>
                <td className="p-3">
                  <span className={`rounded-full px-3 py-1 ${expense.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{expense.status}</span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button title="View expense" onClick={() => setViewingExpense(expense)} className="rounded-lg border p-2"><Eye size={16} /></button>
                    <button title="Edit expense" onClick={() => editExpense(expense)} className="rounded-lg border p-2"><Edit size={16} /></button>
                    <button title="Delete expense" onClick={() => deleteExpense(expense)} className="rounded-lg border p-2 text-red-600"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="10" className="p-8 text-center text-gray-500">No expenses match these filters.</td></tr>}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <ExpenseForm
          form={form}
          setForm={setForm}
          message={message}
          onSubmit={saveExpense}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {viewingExpense && (
        <div role="dialog" aria-modal="true" aria-labelledby="expense-details-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md space-y-3 rounded-2xl bg-white p-6">
            <div className="flex justify-between">
              <h2 id="expense-details-title" className="text-xl font-bold">Expense details</h2>
              <button onClick={() => setViewingExpense(null)} className="rounded-lg border p-2"><X size={16} /></button>
            </div>
            <p><strong>{viewingExpense.title}</strong> · {viewingExpense.id}</p>
            <p>{viewingExpense.category} · {viewingExpense.department}</p>
            <p>Vendor: {viewingExpense.vendor}</p>
            <p>Amount: {formatNaira(viewingExpense.amount)}</p>
            <p>{viewingExpense.paymentMethod} · {viewingExpense.date} · {viewingExpense.status}</p>
            <button onClick={() => { setViewingExpense(null); editExpense(viewingExpense); }} className="rounded-xl bg-blue-600 px-4 py-2 text-white">Edit expense</button>
          </div>
        </div>
      )}

    </div>
  );
}

function ExpenseForm({ form, setForm, message, onSubmit, onClose }) {
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="expense-form-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-xl space-y-4 rounded-2xl bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 id="expense-form-title" className="text-xl font-bold">{form.id ? "Edit Expense" : "Add Expense"}</h2>
          <button type="button" onClick={onClose} className="rounded-lg border p-2"><X size={16} /></button>
        </div>
        {["title", "category", "department", "vendor"].map((key) => (
          <label key={key} className="block">
            <span className="mb-1 block capitalize">{key}</span>
            <input required value={form[key]} onChange={(event) => update(key, event.target.value)} className="w-full rounded-xl border p-3" />
          </label>
        ))}
        <div className="grid gap-3 sm:grid-cols-2">
          <label>Amount<input required type="number" min="1" step="1" value={form.amount} onChange={(event) => update("amount", event.target.value)} className="mt-1 w-full rounded-xl border p-3" /></label>
          <label>Date<input required type="date" value={form.date} onChange={(event) => update("date", event.target.value)} className="mt-1 w-full rounded-xl border p-3" /></label>
          <label>Payment method<select value={form.paymentMethod} onChange={(event) => update("paymentMethod", event.target.value)} className="mt-1 w-full rounded-xl border p-3"><option>Bank Transfer</option><option>Cash</option><option>POS</option><option>Card</option></select></label>
          <label>Status<select value={form.status} onChange={(event) => update("status", event.target.value)} className="mt-1 w-full rounded-xl border p-3"><option>Pending</option><option>Paid</option></select></label>
        </div>
        {message && <p role="alert" className="text-sm text-red-700">{message}</p>}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-xl border px-4 py-2">Cancel</button>
          <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-white">Save Expense</button>
        </div>
      </form>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return <div className="rounded-3xl border p-5"><span className="mb-3 inline-block text-blue-600">{icon}</span><h2 className="text-2xl font-bold">{value}</h2><p>{label}</p></div>;
}
