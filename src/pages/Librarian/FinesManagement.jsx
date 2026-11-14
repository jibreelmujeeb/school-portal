import { useMemo, useState } from "react";
import { DollarSign, Search, Receipt, CreditCard, FileText } from "lucide-react";

const initialFines = [
  { id: "FN-2210", member: "Samuel Akin", book: "Chemistry Lab Manual", reason: "Late return", amount: "₦3,000", status: "Outstanding" },
  { id: "FN-2211", member: "Maryam Tayo", book: "Physics Workbook", reason: "Damaged book", amount: "₦7,500", status: "Paid" },
  { id: "FN-2212", member: "Emmanuel Kola", book: "Biology Notes", reason: "Lost copy", amount: "₦15,000", status: "Outstanding" }
];

export default function FinesManagementPage() {
  const [fines, setFines] = useState(initialFines);
  const [search, setSearch] = useState("");

  const filteredFines = useMemo(() => {
    return fines.filter((item) =>
      [item.member, item.book, item.id, item.reason].join(" ").toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [fines, search]);

  const totalFine = fines.reduce((sum, item) => sum + Number(String(item.amount).replace(/[^\d.]/g, "")), 0);
  const collected = fines.filter((item) => item.status === "Paid").reduce((sum, item) => sum + Number(String(item.amount).replace(/[^\d.]/g, "")), 0);
  const outstanding = totalFine - collected;

  const handleAddFine = () => {
    const member = window.prompt("Member name:", "");
    if (!member || !member.trim()) return;
    const book = window.prompt("Book title:", "");
    if (!book || !book.trim()) return;
    const reason = window.prompt("Reason:", "Late return");
    if (!reason || !reason.trim()) return;
    const amount = window.prompt("Fine amount:", "2500");
    if (!amount || !amount.trim()) return;

    setFines((current) => [
      {
        id: `FN-${Date.now().toString().slice(-4)}`,
        member: member.trim(),
        book: book.trim(),
        reason: reason.trim(),
        amount: `₦${Number(amount).toLocaleString()}`,
        status: "Outstanding",
      },
      ...current,
    ]);
  };

  const handleMarkPaid = (item) => {
    setFines((current) => current.map((entry) => (entry.id === item.id ? { ...entry, status: "Paid" } : entry)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Fines Management</h1>
          <p className="text-gray-500">Manage overdue, lost, and damaged book fines.</p>
        </div>

        <button onClick={handleAddFine} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <FileText size={18} />
          Add Fine
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<DollarSign className="text-blue-600" />} value={`₦${totalFine.toLocaleString()}`} label="Total Fines" />
        <StatCard icon={<Receipt className="text-green-600" />} value={`₦${collected.toLocaleString()}`} label="Collected" />
        <StatCard icon={<CreditCard className="text-red-600" />} value={`₦${outstanding.toLocaleString()}`} label="Outstanding" />
        <StatCard icon={<Receipt className="text-yellow-600" />} value={fines.filter((item) => item.status === "Paid").length.toLocaleString()} label="Paid Fines" />
      </div>

      <div className="flex items-center border rounded-xl px-4 py-3">
        <Search className="mr-2" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="outline-none w-full"
          placeholder="Search by member, book, fine ID..."
        />
      </div>

      <div className="overflow-hidden rounded-3xl border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Fine ID</th>
                <th className="p-4 text-left">Member</th>
                <th className="p-4 text-left">Book</th>
                <th className="p-4 text-left">Reason</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFines.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">No fine records match your search.</td>
                </tr>
              ) : (
                filteredFines.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4 font-medium">{item.id}</td>
                    <td className="p-4">{item.member}</td>
                    <td className="p-4">{item.book}</td>
                    <td className="p-4">{item.reason}</td>
                    <td className="p-4">{item.amount}</td>
                    <td className="p-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.status === "Paid" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{item.status}</span></td>
                    <td className="p-4">
                      {item.status !== "Paid" ? (
                        <button onClick={() => handleMarkPaid(item)} className="rounded-lg border px-3 py-2 text-sm">Mark Paid</button>
                      ) : (
                        <span className="text-sm text-gray-500">Completed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="rounded-2xl border p-5">
      <div className="mb-2">{icon}</div>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}