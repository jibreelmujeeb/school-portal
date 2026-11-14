import { useMemo, useState } from "react";
import { Search, ScanLine, RotateCcw, Eye, Receipt, Download } from "lucide-react";

const initialReturns = [
  { id: "RT-2201", borrower: "Aisha Yusuf", book: "English Literature", isbn: "978-1-2345-1101-0", returnedDate: "12 Aug 2026", condition: "Good", fine: "₦0" },
  { id: "RT-2202", borrower: "Tunde Ade", book: "Chemistry Lab Manual", isbn: "978-1-2345-1102-0", returnedDate: "12 Aug 2026", condition: "Damaged", fine: "₦2,500" },
  { id: "RT-2203", borrower: "Grace Peter", book: "World History", isbn: "978-1-2345-1103-0", returnedDate: "11 Aug 2026", condition: "Good", fine: "₦0" },
];

export default function ReturnedBooksPage() {
  const [returns, setReturns] = useState(initialReturns);
  const [search, setSearch] = useState("");

  const filteredReturns = useMemo(() => {
    return returns.filter((item) =>
      [item.borrower, item.book, item.isbn, item.id].join(" ").toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [returns, search]);

  const totalFineCollected = returns.reduce((sum, item) => {
    const numeric = Number(String(item.fine).replace(/[^\d.]/g, "")) || 0;
    return sum + numeric;
  }, 0);

  const handleReceiveReturn = () => {
    const borrower = window.prompt("Borrower name:", "");
    if (!borrower || !borrower.trim()) return;
    const book = window.prompt("Book title:", "");
    if (!book || !book.trim()) return;
    const condition = window.prompt("Condition (Good/Damaged):", "Good");
    if (!condition || !condition.trim()) return;
    const fine = window.prompt("Fine amount (leave blank for none):", "");

    setReturns((current) => [
      {
        id: `RT-${Date.now().toString().slice(-4)}`,
        borrower: borrower.trim(),
        book: book.trim(),
        isbn: "978-1-2345-" + Math.floor(Math.random() * 9000 + 1000) + "-0",
        returnedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        condition: condition.trim().charAt(0).toUpperCase() + condition.trim().slice(1).toLowerCase(),
        fine: fine && fine.trim() ? `₦${Number(fine).toLocaleString()}` : "₦0",
      },
      ...current,
    ]);
  };

  const handleView = (item) => {
    window.alert(`${item.book}\nBorrower: ${item.borrower}\nCondition: ${item.condition}\nReturned: ${item.returnedDate}\nFine: ${item.fine}`);
  };

  const damagedBooks = returns.filter((item) => item.condition === "Damaged").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Returned Books</h1>
          <p className="text-gray-500">Manage returned books, fines, and inventory updates.</p>
        </div>

        <button onClick={handleReceiveReturn} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <RotateCcw size={18} />
          Receive Return
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<RotateCcw className="text-green-600" />} value={returns.length.toLocaleString()} label="Returned Today" />
        <StatCard icon={<Receipt className="text-blue-600" />} value={returns.length.toLocaleString()} label="Total Returned" />
        <StatCard icon={<ScanLine className="text-red-600" />} value={damagedBooks.toLocaleString()} label="Damaged Books" />
        <StatCard icon={<Download className="text-yellow-600" />} value={`₦${totalFineCollected.toLocaleString()}`} label="Fine Collected" />
      </div>

      <div className="flex items-center border rounded-xl px-4 py-3">
        <Search className="mr-2" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full outline-none"
          placeholder="Search by borrower, book title, ISBN or return ID..."
        />
      </div>

      <div className="overflow-hidden rounded-3xl border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Return ID</th>
                <th className="p-4 text-left">Borrower</th>
                <th className="p-4 text-left">Book</th>
                <th className="p-4 text-left">Condition</th>
                <th className="p-4 text-left">Fine</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReturns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No return records match your search.</td>
                </tr>
              ) : (
                filteredReturns.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4 font-medium">{item.id}</td>
                    <td className="p-4">{item.borrower}</td>
                    <td className="p-4">{item.book}<div className="text-xs text-gray-500">{item.isbn}</div></td>
                    <td className="p-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.condition === "Damaged" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>{item.condition}</span></td>
                    <td className="p-4">{item.fine}</td>
                    <td className="p-4"><button onClick={() => handleView(item)} className="rounded-lg border p-2" aria-label={`View ${item.book}`}><Eye size={16} /></button></td>
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