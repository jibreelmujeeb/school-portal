import React, { useMemo, useState } from "react";
import {
  Users,
  Wallet,
  TrendingUp,
  Receipt,
  Plus,
  Search,
  Eye,
  Download,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import { formatNaira } from "../../data/accountantData";
import downloadCsv from "../../utils/downloadCsv";

const initialPayroll = [
  { name: "John Bello", id: "STF-001", department: "Academic", gross: 250000, deductions: 35000, net: 215000, status: "Paid", period: "August 2026" },
  { name: "Mary Ali", id: "STF-002", department: "Administration", gross: 300000, deductions: 42000, net: 258000, status: "Paid", period: "August 2026" },
  { name: "David Musa", id: "STF-003", department: "ICT", gross: 220000, deductions: 30000, net: 190000, status: "Pending", period: "August 2026" },
];

export default function AccountantPayrollPage() {
  const [payroll, setPayroll, storageError] = usePersistentState("accountant-payroll", initialPayroll);
  const [period, setPeriod] = useState("August 2026");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return payroll.filter((item) =>
      item.period === period &&
      (department === "All" || item.department === department) &&
      (status === "All" || item.status === status) &&
      `${item.name} ${item.id}`.toLowerCase().includes(query)
    );
  }, [payroll, period, department, status, search]);

  const periodPayroll = payroll.filter((item) => item.period === period);
  const grossTotal = periodPayroll.reduce((sum, item) => sum + item.gross, 0);
  const netTotal = periodPayroll.reduce((sum, item) => sum + item.net, 0);
  const deductionsTotal = periodPayroll.reduce((sum, item) => sum + item.deductions, 0);

  const createPayroll = () => {
    if (periodPayroll.length === 0) {
      setMessage(`No staff records are available for ${period}.`);
      return;
    }
    setPayroll((current) => current.map((item) =>
      item.period === period && item.status !== "Paid"
        ? { ...item, status: "Pending" }
        : item
    ));
    setMessage(`Payroll batch for ${period} is ready for payment.`);
  };

  const markPaid = (item) => {
    setPayroll((current) => current.map((person) =>
      person.id === item.id && person.period === item.period
        ? { ...person, status: "Paid" }
        : person
    ));
    setMessage(`${item.name}'s payroll marked as paid.`);
  };

  const exportPayroll = () => downloadCsv("payroll.csv", [
    ["Staff ID", "Staff", "Department", "Gross", "Deductions", "Net Pay", "Status", "Period"],
    ...filtered.map((item) => [item.id, item.name, item.department, item.gross, item.deductions, item.net, item.status, item.period]),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold">Payroll</h1>
          <p className="mt-1 text-gray-500">Review staff salaries and manage monthly payroll.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={exportPayroll} className="flex items-center gap-2 rounded-xl border px-5 py-3"><Download size={18} />Export</button>
          <button onClick={createPayroll} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"><Plus size={18} />Create Payroll Batch</button>
        </div>
      </div>

      {storageError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{storageError}</p>}
      {message && <p role="status" className="text-sm text-blue-700">{message}</p>}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={<Users />} value={periodPayroll.length} label="Staff" />
        <Stat icon={<Wallet />} value={formatNaira(grossTotal)} label="Gross Payroll" />
        <Stat icon={<TrendingUp />} value={formatNaira(netTotal)} label="Net Payroll" />
        <Stat icon={<Receipt />} value={formatNaira(deductionsTotal)} label="Deductions" />
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label className="sr-only" htmlFor="payroll-period">Payroll period</label>
        <select id="payroll-period" value={period} onChange={(event) => setPeriod(event.target.value)} className="rounded-xl border px-4 py-3">
          {[...new Set(payroll.map((item) => item.period))].map((item) => <option key={item}>{item}</option>)}
          <option>July 2026</option>
          <option>June 2026</option>
        </select>
        <label className="sr-only" htmlFor="payroll-department">Filter department</label>
        <select id="payroll-department" value={department} onChange={(event) => setDepartment(event.target.value)} className="rounded-xl border px-4 py-3">
          <option>All</option>
          {[...new Set(payroll.map((item) => item.department))].map((item) => <option key={item}>{item}</option>)}
        </select>
        <label className="sr-only" htmlFor="payroll-status">Filter payroll status</label>
        <select id="payroll-status" value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border px-4 py-3">
          <option>All</option><option>Paid</option><option>Pending</option>
        </select>
        <label className="flex items-center rounded-xl border px-4 py-3">
          <Search size={18} /><span className="sr-only">Search staff</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search staff..." className="ml-3 w-full outline-none" />
        </label>
      </div>

      <div className="overflow-x-auto rounded-3xl border">
        <table className="w-full min-w-[1000px]">
          <thead className="border-b bg-gray-50">
            <tr>{["Staff", "Department", "Gross", "Deductions", "Net Pay", "Status", "Actions"].map((item) => <th key={item} className="p-4 text-left">{item}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={`${item.period}-${item.id}`} className="border-b">
                <td className="p-4"><p className="font-semibold">{item.name}</p><p className="text-xs text-gray-500">{item.id}</p></td>
                <td className="p-4">{item.department}</td>
                <td className="p-4">{formatNaira(item.gross)}</td>
                <td className="p-4 text-red-600">{formatNaira(item.deductions)}</td>
                <td className="p-4 font-semibold">{formatNaira(item.net)}</td>
                <td className="p-4"><span className={`rounded-full px-3 py-1 text-sm ${item.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{item.status}</span></td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button title="View payroll details" onClick={() => setSelected(item)} className="rounded-lg border p-2"><Eye size={16} /></button>
                    {item.status !== "Paid" && <button onClick={() => markPaid(item)} className="rounded-lg border px-3 py-1 text-sm text-green-700">Mark paid</button>}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="7" className="p-8 text-center text-gray-500">No payroll records match these filters.</td></tr>}
          </tbody>
        </table>
      </div>

      {selected && (
        <div role="dialog" aria-modal="true" aria-labelledby="payroll-detail-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md space-y-3 rounded-2xl bg-white p-6">
            <h2 id="payroll-detail-title" className="text-xl font-bold">{selected.name} · {selected.period}</h2>
            <p>Department: {selected.department}</p>
            <p>Gross: {formatNaira(selected.gross)}</p>
            <p>Deductions: {formatNaira(selected.deductions)}</p>
            <p>Net pay: {formatNaira(selected.net)}</p>
            <p>Status: {selected.status}</p>
            <button onClick={() => setSelected(null)} className="rounded-xl border px-4 py-2">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ icon, value, label }) {
  return <div className="rounded-2xl border p-5">{icon}<h2 className="mt-3 text-2xl font-bold">{value}</h2><p className="text-sm text-gray-500">{label}</p></div>;
}
