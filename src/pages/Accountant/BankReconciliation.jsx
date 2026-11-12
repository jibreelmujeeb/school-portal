import React, { useMemo, useRef, useState } from "react";
import {
  Building2,
  CheckCircle,
  AlertTriangle,
  Wallet,
  Upload,
  Search,
  Eye,
  Download,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import { formatNaira } from "../../data/accountantData";
import downloadCsv from "../../utils/downloadCsv";

const initialTransactions = [
  { id: "REC-001", date: "2026-08-25", description: "School Fee Payment", reference: "PAY-82931", bankAmount: 150000, bookAmount: 150000, status: "Matched" },
  { id: "REC-002", date: "2026-08-25", description: "Bank Transfer", reference: "TRF-1829", bankAmount: 500000, bookAmount: 0, status: "Unmatched" },
  { id: "REC-003", date: "2026-08-24", description: "Payment", reference: "PAY-82912", bankAmount: 10000, bookAmount: 10000, status: "Matched" },
  { id: "REC-004", date: "2026-08-23", description: "Bank Charge", reference: "-", bankAmount: 5000, bookAmount: 0, status: "Unmatched" },
];

function parseCsvRow(line) {
  const cells = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"' && quoted && line[index + 1] === '"') {
      cell += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += character;
    }
  }
  cells.push(cell.trim());
  return cells;
}

export default function AccountantBankReconciliationPage() {
  const [transactions, setTransactions, storageError] = usePersistentState(
    "accountant-reconciliation",
    initialTransactions
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState(null);
  const fileInput = useRef(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return transactions.filter((item) =>
      `${item.description} ${item.reference}`.toLowerCase().includes(query) &&
      (statusFilter === "All" || item.status === statusFilter) &&
      (!dateFilter || item.date === dateFilter)
    );
  }, [transactions, search, statusFilter, dateFilter]);

  const matched = transactions.filter((item) => item.status === "Matched").length;
  const unmatched = transactions.filter((item) => item.status === "Unmatched").length;
  const bankBalance = transactions.reduce((sum, item) => sum + item.bankAmount, 0);
  const bookBalance = transactions.reduce((sum, item) => sum + item.bookAmount, 0);
  const difference = bankBalance - bookBalance;

  const reconcile = (transaction) => {
    setTransactions((current) => current.map((item) =>
      item.id === transaction.id
        ? { ...item, bookAmount: item.bankAmount, status: "Matched" }
        : item
    ));
    setMessage(`${transaction.reference} marked as reconciled.`);
  };

  const exportRows = () => downloadCsv("bank-reconciliation.csv", [
    ["Date", "Description", "Reference", "Bank Amount", "Book Amount", "Difference", "Status"],
    ...filtered.map((item) => [
      item.date,
      item.description,
      item.reference,
      item.bankAmount,
      item.bookAmount,
      item.bankAmount - item.bookAmount,
      item.status,
    ]),
  ]);

  const importStatement = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const lines = String(reader.result || "").split(/\r?\n/).filter(Boolean);
        if (lines.length < 2) throw new Error("The CSV must include a header and at least one transaction.");
        const headers = parseCsvRow(lines[0]).map((header) => header.toLowerCase().replace(/[\s_-]/g, ""));
        const indexOf = (name) => headers.indexOf(name);
        const required = ["date", "description", "reference", "bankamount", "bookamount"];
        const indexes = required.map(indexOf);
        if (indexes.some((index) => index < 0)) {
          throw new Error("CSV columns required: date, description, reference, bankAmount, bookAmount.");
        }

        const imported = lines.slice(1).map((line, index) => {
          const columns = parseCsvRow(line);
          const bankAmount = Number(columns[indexes[3]]);
          const bookAmount = Number(columns[indexes[4]]);
          const date = columns[indexes[0]];
          const description = columns[indexes[1]];
          const reference = columns[indexes[2]];
          if (!date || !description || !reference || !Number.isFinite(bankAmount) || !Number.isFinite(bookAmount)) {
            throw new Error(`Invalid transaction on CSV line ${index + 2}.`);
          }
          return {
            id: `REC-${Date.now()}-${index}`,
            date,
            description,
            reference,
            bankAmount,
            bookAmount,
            status: bankAmount === bookAmount ? "Matched" : "Unmatched",
          };
        });
        setTransactions((current) => [...imported, ...current]);
        setMessage(`${imported.length} bank transaction(s) imported.`);
      } catch (error) {
        setMessage(error.message);
      } finally {
        event.target.value = "";
      }
    };
    reader.onerror = () => setMessage("The selected statement could not be read.");
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold">Bank Reconciliation</h1>
          <p className="mt-1 text-gray-500">Compare bank transactions with school records.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={exportRows} className="flex items-center gap-2 rounded-xl border px-5 py-3"><Download size={18} />Export</button>
          <input ref={fileInput} type="file" accept=".csv,text/csv" onChange={importStatement} className="hidden" aria-label="Import bank statement CSV" />
          <button onClick={() => fileInput.current?.click()} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"><Upload size={18} />Import Statement CSV</button>
        </div>
      </div>

      {(storageError || message) && <p role={storageError ? "alert" : "status"} className={`rounded-xl p-3 text-sm ${storageError ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"}`}>{storageError || message}</p>}

      <div className="flex flex-col justify-between gap-4 rounded-2xl border p-5 lg:flex-row lg:items-center">
        <div className="flex items-center gap-4">
          <div className="rounded-xl border p-3"><Building2 size={24} /></div>
          <div><h2 className="font-bold">School Main Account</h2><p className="text-sm text-gray-500">Statement data imported from CSV</p></div>
        </div>
        <div><p className="text-sm text-gray-500">Bank Balance</p><p className="text-2xl font-bold">{formatNaira(bankBalance)}</p></div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={<Building2 />} value={formatNaira(bankBalance)} label="Bank Balance" />
        <Stat icon={<Wallet />} value={formatNaira(bookBalance)} label="Book Balance" />
        <Stat icon={<CheckCircle />} value={matched} label="Matched" />
        <Stat icon={<AlertTriangle />} value={unmatched} label="Unmatched" />
      </div>

      <div className="rounded-2xl border p-5">
        <div className="flex items-center gap-3">
          <AlertTriangle />
          <div><h2 className="font-bold">Reconciliation Difference</h2><p className="text-sm text-gray-500">Difference between imported bank and book balances.</p></div>
        </div>
        <div className={`mt-5 text-3xl font-bold ${difference === 0 ? "text-green-600" : "text-red-600"}`}>{formatNaira(difference)}</div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <label className="flex items-center rounded-xl border px-4 py-3">
          <Search size={18} /><span className="sr-only">Search transactions</span>
          <input placeholder="Search transaction..." className="ml-3 w-full outline-none" value={search} onChange={(event) => setSearch(event.target.value)} />
        </label>
        <label className="sr-only" htmlFor="reconciliation-status">Filter transaction status</label>
        <select id="reconciliation-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border px-4 py-3">
          <option value="All">All Transactions</option><option>Matched</option><option>Unmatched</option>
        </select>
        <label className="sr-only" htmlFor="reconciliation-date">Filter transaction date</label>
        <input id="reconciliation-date" type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} className="rounded-xl border px-4 py-3" />
      </div>

      <div className="overflow-x-auto rounded-3xl border">
        <table className="w-full min-w-[1000px]">
          <thead className="border-b bg-gray-50">
            <tr>{["Date", "Description", "Reference", "Bank Amount", "Book Amount", "Difference", "Status", "Actions"].map((item) => <th key={item} className="p-4 text-left">{item}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((transaction) => {
              const rowDifference = transaction.bankAmount - transaction.bookAmount;
              return (
                <tr key={transaction.id} className="border-b">
                  <td className="p-4">{transaction.date}</td>
                  <td className="p-4 font-medium">{transaction.description}</td>
                  <td className="p-4">{transaction.reference}</td>
                  <td className="p-4">{formatNaira(transaction.bankAmount)}</td>
                  <td className="p-4">{formatNaira(transaction.bookAmount)}</td>
                  <td className={`p-4 ${rowDifference === 0 ? "text-green-600" : "text-red-600"}`}>{formatNaira(rowDifference)}</td>
                  <td className="p-4"><span className={`rounded-full px-3 py-1 text-sm ${transaction.status === "Matched" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{transaction.status}</span></td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button title="View transaction" onClick={() => setSelected(transaction)} className="rounded-lg border p-2"><Eye size={16} /></button>
                      {transaction.status === "Unmatched" && <button onClick={() => reconcile(transaction)} className="rounded-lg border px-3 py-1 text-sm text-green-700">Reconcile</button>}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && <tr><td colSpan="8" className="p-8 text-center text-gray-500">No transactions match these filters.</td></tr>}
          </tbody>
        </table>
      </div>

      {selected && (
        <div role="dialog" aria-modal="true" aria-labelledby="reconciliation-detail-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md space-y-3 rounded-2xl bg-white p-6">
            <h2 id="reconciliation-detail-title" className="text-xl font-bold">{selected.description}</h2>
            <p>Reference: {selected.reference}</p><p>Date: {selected.date}</p>
            <p>Bank amount: {formatNaira(selected.bankAmount)}</p><p>Book amount: {formatNaira(selected.bookAmount)}</p>
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
