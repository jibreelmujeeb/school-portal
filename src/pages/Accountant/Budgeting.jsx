import React, { useMemo, useState } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Eye,
  Edit,
  Download,
  AlertTriangle,
  X,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import { formatNaira, initialBudgets } from "../../data/accountantData";
import downloadCsv from "../../utils/downloadCsv";

const blankBudget = { category: "", department: "", budget: "", spent: 0 };

export default function AccountantBudgetingPage() {
  const [budgets, setBudgets, storageError] = usePersistentState("accountant-budgets", initialBudgets);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(blankBudget);
  const [formError, setFormError] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return budgets.filter((item) =>
      `${item.category} ${item.department}`.toLowerCase().includes(query) &&
      (departmentFilter === "All" || item.department === departmentFilter)
    );
  }, [budgets, search, departmentFilter]);

  const totals = budgets.reduce((result, item) => {
    result.budget += item.budget;
    result.spent += item.spent;
    result.overBudget += Math.max(0, item.spent - item.budget);
    return result;
  }, { budget: 0, spent: 0, overBudget: 0 });

  const openNew = () => {
    setEditing(null);
    setForm(blankBudget);
    setFormError("");
    setIsFormOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ ...item, budget: String(item.budget), spent: String(item.spent) });
    setFormError("");
    setIsFormOpen(true);
  };

  const saveBudget = (event) => {
    event.preventDefault();
    const budget = Number(form.budget);
    const spent = Number(form.spent);
    if (!Number.isFinite(budget) || budget <= 0 || !Number.isFinite(spent) || spent < 0) {
      setFormError("Enter a budget greater than zero and a valid non-negative spend.");
      return;
    }

    if (editing) {
      setBudgets((current) => current.map((item) =>
        item.id === editing.id
          ? { ...form, id: editing.id, budget, spent }
          : item
      ));
    } else {
      setBudgets((current) => [{ ...form, id: `BDG-${Date.now()}`, budget, spent }, ...current]);
    }
    setIsFormOpen(false);
  };

  const exportBudgets = () => downloadCsv("budgets.csv", [
    ["Category", "Department", "Budget", "Spent", "Remaining", "Utilization"],
    ...filtered.map((item) => [
      item.category,
      item.department,
      item.budget,
      item.spent,
      item.budget - item.spent,
      `${Math.round((item.spent / item.budget) * 100)}%`,
    ]),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold">Budgeting</h1>
          <p className="mt-1 text-gray-500">Plan, allocate and monitor school finances.</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white">
          <Plus size={18} />
          Create Budget
        </button>
      </div>

      {storageError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{storageError}</p>}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={<Wallet />} value={formatNaira(totals.budget)} label="Total Budget" />
        <Stat icon={<TrendingDown />} value={formatNaira(totals.spent)} label="Total Spent" />
        <Stat icon={<TrendingUp />} value={formatNaira(totals.budget - totals.spent)} label="Remaining" />
        <Stat icon={<AlertTriangle />} value={formatNaira(totals.overBudget)} label="Over Budget" />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row">
        <label className="flex flex-1 items-center rounded-xl border px-4 py-3">
          <Search size={18} />
          <span className="sr-only">Search budget categories</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search category or department..." className="ml-3 w-full outline-none" />
        </label>
        <label className="sr-only" htmlFor="budget-department">Filter budgets by department</label>
        <select id="budget-department" value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)} className="rounded-xl border px-4 py-3">
          <option value="All">All Departments</option>
          {[...new Set(budgets.map((item) => item.department))].map((department) => <option key={department}>{department}</option>)}
        </select>
        <button onClick={exportBudgets} className="flex items-center justify-center gap-2 rounded-xl border px-5 py-3">
          <Download size={18} />
          Export
        </button>
      </div>

      <div className="overflow-x-auto rounded-3xl border">
        <table className="w-full min-w-[1000px]">
          <thead className="border-b bg-gray-50">
            <tr>{["Category", "Department", "Budget", "Spent", "Remaining", "Utilization", "Status", "Actions"].map((item) => <th key={item} className="p-4 text-left">{item}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const remaining = item.budget - item.spent;
              const percentage = Math.round((item.spent / item.budget) * 100);
              const status = percentage > 100 ? "Over Budget" : percentage >= 90 ? "Warning" : "On Track";
              return (
                <tr key={item.id} className="border-b">
                  <td className="p-4 font-semibold">{item.category}</td>
                  <td className="p-4">{item.department}</td>
                  <td className="p-4">{formatNaira(item.budget)}</td>
                  <td className="p-4">{formatNaira(item.spent)}</td>
                  <td className={`p-4 ${remaining < 0 ? "text-red-600" : "text-green-600"}`}>{formatNaira(remaining)}</td>
                  <td className="p-4">
                    <p className="mb-1 text-sm">{percentage}%</p>
                    <div className="h-2 w-32 rounded-full bg-gray-200">
                      <div className={`h-full rounded-full ${percentage > 100 ? "bg-red-600" : "bg-blue-600"}`} style={{ width: `${Math.min(percentage, 100)}%` }} />
                    </div>
                  </td>
                  <td className="p-4"><span className={`rounded-full px-3 py-1 text-sm ${status === "Over Budget" ? "bg-red-100 text-red-700" : status === "Warning" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>{status}</span></td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button title="View budget" onClick={() => setViewing(item)} className="rounded-lg border p-2"><Eye size={16} /></button>
                      <button title="Edit budget" onClick={() => openEdit(item)} className="rounded-lg border p-2"><Edit size={16} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && <tr><td colSpan="8" className="p-8 text-center text-gray-500">No budgets match these filters.</td></tr>}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby="budget-form-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={saveBudget} className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 id="budget-form-title" className="text-xl font-bold">{editing ? "Edit Budget" : "Create Budget"}</h2>
              <button type="button" onClick={() => setIsFormOpen(false)} className="rounded-lg border p-2"><X size={16} /></button>
            </div>
            <label className="block">Category<input required value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} className="mt-1 w-full rounded-xl border p-3" /></label>
            <label className="block">Department<input required value={form.department} onChange={(event) => setForm((current) => ({ ...current, department: event.target.value }))} className="mt-1 w-full rounded-xl border p-3" /></label>
            <label className="block">Budget amount<input required type="number" min="1" value={form.budget} onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))} className="mt-1 w-full rounded-xl border p-3" /></label>
            <label className="block">Amount spent<input required type="number" min="0" value={form.spent} onChange={(event) => setForm((current) => ({ ...current, spent: event.target.value }))} className="mt-1 w-full rounded-xl border p-3" /></label>
            {formError && <p role="alert" className="text-sm text-red-700">{formError}</p>}
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setIsFormOpen(false)} className="rounded-xl border px-4 py-2">Cancel</button>
              <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-white">Save Budget</button>
            </div>
          </form>
        </div>
      )}

      {viewing && (
        <div role="dialog" aria-modal="true" aria-labelledby="budget-detail-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md space-y-3 rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 id="budget-detail-title" className="text-xl font-bold">{viewing.category}</h2>
              <button onClick={() => setViewing(null)} className="rounded-lg border p-2"><X size={16} /></button>
            </div>
            <p>{viewing.department}</p>
            <p>Allocated: {formatNaira(viewing.budget)}</p>
            <p>Spent: {formatNaira(viewing.spent)}</p>
            <p>Remaining: {formatNaira(viewing.budget - viewing.spent)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ icon, value, label }) {
  return <div className="rounded-2xl border p-5">{icon}<h2 className="mt-3 text-2xl font-bold">{value}</h2><p className="text-sm text-gray-500">{label}</p></div>;
}
