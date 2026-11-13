import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Eye,
  CreditCard,
  Receipt,
  Bell,
  Download,
  AlertCircle,
  Users,
  X,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import { formatNaira } from "../../data/accountantData";
import downloadCsv from "../../utils/downloadCsv";

const initialDebtors = [
  {
    id: "STD001",
    name: "John David",
    admissionNo: "ADM2026001",
    className: "SS2A",
    totalFees: 180000,
    paid: 120000,
    dueDate: "2026-09-15",
    email: "john.parent@example.com",
  },
  {
    id: "STD002",
    name: "Mary Johnson",
    admissionNo: "ADM2026002",
    className: "JSS3B",
    totalFees: 150000,
    paid: 0,
    dueDate: "2026-08-30",
    email: "mary.parent@example.com",
  },
];

const getStatus = (student) => {
  if (student.paid >= student.totalFees) return "Paid";
  if (new Date(`${student.dueDate}T23:59:59`) < new Date()) return "Overdue";
  return student.paid > 0 ? "Partial" : "Unpaid";
};

export default function StudentDebtorsPage() {
  const [debtors, , storageError] = usePersistentState("accountant-debtors", initialDebtors);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [reminderMessage, setReminderMessage] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return debtors.filter((student) => {
      const status = getStatus(student);
      return `${student.name} ${student.id} ${student.admissionNo}`.toLowerCase().includes(query) &&
        (statusFilter === "All" || status === statusFilter) &&
        (classFilter === "All" || student.className === classFilter);
    });
  }, [debtors, search, statusFilter, classFilter]);

  const totalOutstanding = debtors.reduce((sum, student) => sum + Math.max(student.totalFees - student.paid, 0), 0);
  const overdueDebtors = debtors.filter((student) => getStatus(student) === "Overdue");
  const collected = debtors.reduce((sum, student) => sum + student.paid, 0);

  const exportDebtors = () => downloadCsv("student-debtors.csv", [
    ["Student ID", "Student", "Admission No.", "Class", "Total Fees", "Paid", "Balance", "Due Date", "Status"],
    ...filtered.map((student) => [
      student.id,
      student.name,
      student.admissionNo,
      student.className,
      student.totalFees,
      student.paid,
      Math.max(student.totalFees - student.paid, 0),
      student.dueDate,
      getStatus(student),
    ]),
  ]);

  const sendReminder = (student) => {
    const balance = Math.max(student.totalFees - student.paid, 0);
    const subject = encodeURIComponent("School fees payment reminder");
    const body = encodeURIComponent(
      `Dear Parent/Guardian,\n\nThis is a reminder that ${student.name} has an outstanding balance of ${formatNaira(balance)}. Please contact the school finance office if you have questions.\n\nThank you.`
    );
    window.location.href = `mailto:${student.email}?subject=${subject}&body=${body}`;
    setReminderMessage(`A reminder email draft was opened for ${student.name}.`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <h1 className="text-3xl font-bold">Student Debtors</h1>
          <p className="mt-2 text-gray-500">Track outstanding student fees and manage debt recovery.</p>
        </div>
        <button onClick={exportDebtors} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white">
          <Download size={18} />
          Export filtered ({filtered.length})
        </button>
      </div>

      {storageError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{storageError}</p>}
      {reminderMessage && <p role="status" className="text-sm text-blue-700">{reminderMessage}</p>}

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <Stat icon={<Users className="text-blue-600" />} value={debtors.length} label="Total Debtors" />
        <Stat icon={<CreditCard className="text-red-600" />} value={formatNaira(totalOutstanding)} label="Total Outstanding" />
        <Stat icon={<AlertCircle className="text-orange-600" />} value={overdueDebtors.length} label="Overdue" />
        <Stat icon={<Receipt className="text-green-600" />} value={formatNaira(collected)} label="Collected" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="flex items-center rounded-xl border px-4 py-3 md:col-span-1">
          <Search className="mr-3" />
          <span className="sr-only">Search debtors</span>
          <input className="w-full outline-none" placeholder="Search student or ID..." value={search} onChange={(event) => setSearch(event.target.value)} />
        </label>
        <label className="sr-only" htmlFor="debtor-class">Filter debtors by class</label>
        <select id="debtor-class" value={classFilter} onChange={(event) => setClassFilter(event.target.value)} className="rounded-xl border px-4 py-3">
          <option value="All">All Classes</option>
          {[...new Set(debtors.map((student) => student.className))].map((className) => <option key={className}>{className}</option>)}
        </select>
        <label className="sr-only" htmlFor="debtor-status">Filter debtors by status</label>
        <select id="debtor-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border px-4 py-3">
          <option value="All">All Statuses</option>
          <option>Overdue</option>
          <option>Unpaid</option>
          <option>Partial</option>
          <option>Paid</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-3xl border">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-gray-50">
            <tr>{["Student", "Class", "Total Fees", "Paid", "Balance", "Due Date", "Status", "Actions"].map((item) => <th key={item} className="p-4 text-left">{item}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((student) => {
              const balance = Math.max(student.totalFees - student.paid, 0);
              const status = getStatus(student);
              return (
                <tr key={student.id} className="border-t">
                  <td className="p-4"><p className="font-semibold">{student.name}</p><p className="text-xs text-gray-500">{student.admissionNo}</p></td>
                  <td className="p-4">{student.className}</td>
                  <td className="p-4">{formatNaira(student.totalFees)}</td>
                  <td className="p-4">{formatNaira(student.paid)}</td>
                  <td className="p-4 font-semibold">{formatNaira(balance)}</td>
                  <td className="p-4">{student.dueDate}</td>
                  <td className="p-4"><span className={`rounded-full px-3 py-1 ${status === "Paid" ? "bg-green-100 text-green-700" : status === "Overdue" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{status}</span></td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button title="View debtor" onClick={() => setSelected(student)} className="rounded-lg border p-2"><Eye size={16} /></button>
                      {balance > 0 && (
                        <>
                          <Link title="Record a payment" to={`/accountant/fees-collection?student=${encodeURIComponent(student.name)}`} className="rounded-lg border p-2"><CreditCard size={16} /></Link>
                          <button title="Prepare reminder email" onClick={() => sendReminder(student)} className="rounded-lg border p-2"><Bell size={16} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && <tr><td colSpan="8" className="p-8 text-center text-gray-500">No debtors match these filters.</td></tr>}
          </tbody>
        </table>
      </div>

      {selected && (
        <div role="dialog" aria-modal="true" aria-labelledby="debtor-details-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md space-y-3 rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 id="debtor-details-title" className="text-xl font-bold">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="rounded-lg border p-2"><X size={16} /></button>
            </div>
            <p>{selected.admissionNo} · {selected.className}</p>
            <p>Total fees: {formatNaira(selected.totalFees)}</p>
            <p>Paid: {formatNaira(selected.paid)}</p>
            <p>Outstanding: {formatNaira(Math.max(selected.totalFees - selected.paid, 0))}</p>
            <p>Due date: {selected.dueDate}</p>
            <p>Status: {getStatus(selected)}</p>
            <div className="flex gap-3">
              <Link to={`/accountant/fees-collection?student=${encodeURIComponent(selected.name)}`} className="rounded-xl bg-blue-600 px-4 py-2 text-white">Record payment</Link>
              <button onClick={() => sendReminder(selected)} className="rounded-xl border px-4 py-2">Prepare reminder</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ icon, value, label }) {
  return <div className="rounded-3xl border p-5">{icon}<h2 className="mt-3 text-2xl font-bold">{value}</h2><p>{label}</p></div>;
}
