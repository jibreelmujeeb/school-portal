import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Wrench,
  DollarSign,
  FileText,
  AlertTriangle,
} from "lucide-react";

const initialDamagedBooks = [
  { id: "DM-1101", book: "Physics for SS2", borrower: "John Doe", damage: "Torn Cover", severity: "Major", charge: "₦2,500", status: "Repair" },
  { id: "DM-1102", book: "Biology Essentials", borrower: "Mary Ali", damage: "Water Damage", severity: "Moderate", charge: "₦1,800", status: "Under Review" },
  { id: "DM-1103", book: "English Literature", borrower: "Tunde Ade", damage: "Missing Pages", severity: "Severe", charge: "₦4,200", status: "Replacement" },
];

export default function DamagedBooksPage() {
  const [books, setBooks] = useState(initialDamagedBooks);
  const [search, setSearch] = useState("");
  const [damageType, setDamageType] = useState("All Damage Types");
  const [severity, setSeverity] = useState("All Severity");

  const filteredBooks = useMemo(() => {
    return books.filter((item) => {
      const matchesSearch = [item.book, item.borrower, item.damage, item.id].join(" ").toLowerCase().includes(search.trim().toLowerCase());
      const matchesType = damageType === "All Damage Types" || item.damage === damageType;
      const matchesSeverity = severity === "All Severity" || item.severity === severity;
      return matchesSearch && matchesType && matchesSeverity;
    });
  }, [books, search, damageType, severity]);

  const totalCharges = books.reduce((sum, item) => sum + Number(String(item.charge).replace(/[^\d.]/g, "")), 0);
  const underRepair = books.filter((item) => item.status === "Repair").length;

  const handleReportDamage = () => {
    const book = window.prompt("Book title:", "");
    if (!book || !book.trim()) return;
    const borrower = window.prompt("Borrower name:", "");
    if (!borrower || !borrower.trim()) return;
    const damage = window.prompt("Damage type:", "Missing Pages");
    if (!damage || !damage.trim()) return;
    const charge = window.prompt("Repair/replacement charge:", "2500");
    if (!charge || !charge.trim()) return;

    setBooks((current) => [
      {
        id: `DM-${Date.now().toString().slice(-4)}`,
        book: book.trim(),
        borrower: borrower.trim(),
        damage: damage.trim(),
        severity: "Moderate",
        charge: `₦${Number(charge).toLocaleString()}`,
        status: "Under Review",
      },
      ...current,
    ]);
  };

  const handleStatusUpdate = (id, status) => {
    setBooks((current) => current.map((entry) => (entry.id === id ? { ...entry, status } : entry)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Damaged Books</h1>
          <p className="text-gray-500 mt-2">Manage damaged books, repairs, charges, and replacement records.</p>
        </div>

        <button onClick={handleReportDamage} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2">
          <Plus size={18} />
          Report Damaged Book
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<AlertTriangle className="text-red-600" />} value={books.length.toLocaleString()} label="Damaged Books" />
        <StatCard icon={<Wrench className="text-orange-600" />} value={underRepair.toLocaleString()} label="Under Repair" />
        <StatCard icon={<DollarSign className="text-green-600" />} value={`₦${totalCharges.toLocaleString()}`} label="Damage Charges" />
        <StatCard icon={<FileText className="text-blue-600" />} value={books.filter((item) => item.status === "Replacement").length.toLocaleString()} label="Recovered" />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">
          <Search size={18} />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search book, borrower, ISBN or barcode..."
            className="w-full outline-none ml-3"
          />
        </div>

        <select value={damageType} onChange={(event) => setDamageType(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Damage Types</option>
          <option>Torn Cover</option>
          <option>Water Damage</option>
          <option>Missing Pages</option>
        </select>

        <select value={severity} onChange={(event) => setSeverity(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Severity</option>
          <option>Minor</option>
          <option>Moderate</option>
          <option>Major</option>
          <option>Severe</option>
        </select>
      </div>

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="border-b">
            <tr>
              <th className="text-left p-4">Book</th>
              <th className="text-left p-4">Borrower</th>
              <th className="text-left p-4">Damage</th>
              <th className="text-left p-4">Severity</th>
              <th className="text-left p-4">Charge</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">No damaged books match your filters.</td>
              </tr>
            ) : (
              filteredBooks.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-4">{item.book}</td>
                  <td className="p-4">{item.borrower}</td>
                  <td className="p-4">{item.damage}</td>
                  <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${item.severity === "Major" ? "bg-orange-100 text-orange-700" : item.severity === "Severe" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{item.severity}</span></td>
                  <td className="p-4">{item.charge}</td>
                  <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Repair" ? "bg-yellow-100 text-yellow-700" : item.status === "Replacement" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>{item.status}</span></td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="border rounded-lg p-2" title="View"><Eye size={16} /></button>
                      <button onClick={() => handleStatusUpdate(item.id, "Repair")} className="border rounded-lg p-2" title="Edit"><Pencil size={16} /></button>
                      <button onClick={() => handleStatusUpdate(item.id, "Replacement")} className="border rounded-lg p-2" title="Repair"><Wrench size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="border rounded-2xl p-5">
      <div className="mb-3">{icon}</div>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-gray-500">{label}</p>
    </div>
  );
}