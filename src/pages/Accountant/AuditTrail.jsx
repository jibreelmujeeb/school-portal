import React, { useMemo, useState } from "react";
import {
  Search,
  Eye,
  Download,
  ShieldCheck,
  AlertTriangle,
  Activity,
  Users,
  FileText,
  X,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import { initialAuditEvents } from "../../data/accountantAuditData";
import downloadCsv from "../../utils/downloadCsv";

export default function AccountantAuditTrailPage() {
  const [logs, , storageError] = usePersistentState("accountant-audit-events", initialAuditEvents);
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("All");
  const [moduleFilter, setModuleFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return logs.filter((log) => {
      const date = log.timestamp.slice(0, 10);
      return `${log.user} ${log.action} ${log.module} ${log.record}`.toLowerCase().includes(query) &&
        (userFilter === "All" || log.user === userFilter) &&
        (moduleFilter === "All" || log.module === moduleFilter) &&
        (actionFilter === "All" || log.action.toLowerCase().includes(actionFilter.toLowerCase())) &&
        (statusFilter === "All" || log.status === statusFilter) &&
        (!fromDate || date >= fromDate) &&
        (!toDate || date <= toDate);
    });
  }, [logs, search, userFilter, moduleFilter, actionFilter, statusFilter, fromDate, toDate]);

  const exportLogs = () => downloadCsv("accountant-audit-trail.csv", [
    ["Timestamp", "User", "Action", "Module", "Record", "Status"],
    ...filtered.map((log) => [log.timestamp, log.user, log.action, log.module, log.record, log.status]),
  ]);
  const alertCount = logs.filter((log) => log.status !== "Success").length;
  const changeCount = logs.filter((log) => /created|updated|deleted|approved/i.test(log.action)).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold">Audit Trail</h1>
          <p className="mt-1 text-gray-500">Review saved financial activity and system changes.</p>
        </div>
        <button onClick={exportLogs} disabled={filtered.length === 0} className="flex items-center gap-2 rounded-xl border px-5 py-3 disabled:opacity-50">
          <Download size={18} />
          Export filtered ({filtered.length})
        </button>
      </div>

      {storageError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{storageError}</p>}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={<Activity />} value={logs.length} label="Total Events" />
        <Stat icon={<Users />} value={new Set(logs.map((log) => log.user)).size} label="Users Recorded" />
        <Stat icon={<FileText />} value={changeCount} label="Changes" />
        <Stat icon={<AlertTriangle />} value={alertCount} label="Alerts" />
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label className="flex items-center rounded-xl border px-4 py-3 xl:col-span-2">
          <Search size={18} />
          <span className="sr-only">Search audit events</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search activity, user, record..." className="ml-3 w-full outline-none" />
        </label>
        <SelectFilter id="audit-user" label="Filter by user" value={userFilter} onChange={setUserFilter} values={[...new Set(logs.map((log) => log.user))]} />
        <SelectFilter id="audit-module" label="Filter by module" value={moduleFilter} onChange={setModuleFilter} values={[...new Set(logs.map((log) => log.module))]} />
        <label className="sr-only" htmlFor="audit-action">Filter by action</label>
        <select id="audit-action" value={actionFilter} onChange={(event) => setActionFilter(event.target.value)} className="rounded-xl border px-4 py-3">
          <option value="All">All Actions</option>
          {["Created", "Updated", "Approved", "Refunded", "Deleted", "Saved", "Generated"].map((item) => <option key={item}>{item}</option>)}
        </select>
        <label className="sr-only" htmlFor="audit-status">Filter by status</label>
        <select id="audit-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border px-4 py-3">
          <option value="All">All Statuses</option><option>Success</option><option>Warning</option><option>Failed</option>
        </select>
        <label><span className="sr-only">From date</span><input type="date" aria-label="From date" value={fromDate} max={toDate || undefined} onChange={(event) => setFromDate(event.target.value)} className="w-full rounded-xl border px-4 py-3" /></label>
        <label><span className="sr-only">To date</span><input type="date" aria-label="To date" value={toDate} min={fromDate || undefined} onChange={(event) => setToDate(event.target.value)} className="w-full rounded-xl border px-4 py-3" /></label>
      </div>

      <div className="flex gap-3 rounded-2xl border p-4">
        <ShieldCheck />
        <div>
          <p className="font-semibold">Audit Protection Active</p>
          <p className="text-sm text-gray-500">This page does not provide controls to edit or delete audit entries.</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border">
        <table className="w-full min-w-[1000px]">
          <thead className="border-b bg-gray-50">
            <tr>{["Time", "User", "Action", "Module", "Record", "Status", "Details"].map((item) => <th key={item} className="p-4 text-left">{item}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id} className="border-b">
                <td className="p-4">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="p-4 font-semibold">{log.user}</td>
                <td className="p-4">{log.action}</td>
                <td className="p-4">{log.module}</td>
                <td className="p-4">{log.record}</td>
                <td className="p-4"><span className={`rounded-full px-3 py-1 text-sm ${log.status === "Success" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{log.status}</span></td>
                <td className="p-4"><button title="View audit details" onClick={() => setSelected(log)} className="rounded-lg border p-2"><Eye size={16} /></button></td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="7" className="p-8 text-center text-gray-500">No audit events match these filters.</td></tr>}
          </tbody>
        </table>
      </div>

      {selected && (
        <div role="dialog" aria-modal="true" aria-labelledby="audit-detail-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md space-y-3 rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between"><h2 id="audit-detail-title" className="text-xl font-bold">Audit event</h2><button onClick={() => setSelected(null)} className="rounded-lg border p-2"><X size={16} /></button></div>
            <p><strong>Timestamp:</strong> {new Date(selected.timestamp).toLocaleString()}</p>
            <p><strong>User:</strong> {selected.user}</p>
            <p><strong>Action:</strong> {selected.action}</p>
            <p><strong>Module:</strong> {selected.module}</p>
            <p><strong>Record:</strong> {selected.record}</p>
            <p><strong>Status:</strong> {selected.status}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function SelectFilter({ id, label, value, onChange, values }) {
  return (
    <>
      <label className="sr-only" htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border px-4 py-3">
        <option value="All">{label.replace("Filter by ", "All ")}</option>
        {values.map((item) => <option key={item}>{item}</option>)}
      </select>
    </>
  );
}

function Stat({ icon, value, label }) {
  return <div className="rounded-2xl border p-5">{icon}<h2 className="mt-3 text-2xl font-bold">{value}</h2><p className="text-sm text-gray-500">{label}</p></div>;
}
