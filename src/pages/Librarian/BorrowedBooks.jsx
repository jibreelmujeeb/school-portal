import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  RefreshCw,
  RotateCcw,
  Eye,
  BookOpen,
} from "lucide-react";

const initialBorrowed = [
  { id: "BR-1001", student: "John Doe", type: "Student", book: "Mathematics for SS2", isbn: "978-1-2345-6789-0", borrowDate: "05 Aug 2026", dueDate: "15 Aug 2026", status: "Due Today" },
  { id: "BR-1002", student: "Mary Ali", type: "Student", book: "Advanced Physics", isbn: "978-1-2345-6790-0", borrowDate: "28 Jul 2026", dueDate: "07 Aug 2026", status: "Overdue" },
  { id: "BR-1003", student: "Mr. Bello", type: "Teacher", book: "Biology Essentials", isbn: "978-1-2345-6791-0", borrowDate: "03 Aug 2026", dueDate: "18 Aug 2026", status: "Active" },
];

export default function BorrowedBooksPage() {
  const [borrowed, setBorrowed] = useState(initialBorrowed);
  const [search, setSearch] = useState("");

  const filteredBorrowed = useMemo(() => {
    return borrowed.filter((item) =>
      [item.student, item.book, item.isbn, item.id].join(" ").toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [borrowed, search]);

  const handleIssueBook = () => {
    const student = window.prompt("Borrower name:", "");
    if (!student || !student.trim()) return;
    const book = window.prompt("Book title:", "");
    if (!book || !book.trim()) return;
    const isbn = window.prompt("ISBN:", "978-1-2345-6799-0");
    if (!isbn || !isbn.trim()) return;
    const dueDate = window.prompt("Due date:", "20 Aug 2026");
    if (!dueDate || !dueDate.trim()) return;

    setBorrowed((current) => [
      {
        id: `BR-${Date.now().toString().slice(-4)}`,
        student: student.trim(),
        type: "Student",
        book: book.trim(),
        isbn: isbn.trim(),
        borrowDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        dueDate: dueDate.trim(),
        status: "Active",
      },
      ...current,
    ]);
  };

  const handleView = (item) => {
    window.alert(`${item.book}\nBorrower: ${item.student} (${item.type})\nISBN: ${item.isbn}\nBorrowed: ${item.borrowDate}\nDue: ${item.dueDate}\nStatus: ${item.status}`);
  };

  const handleRenew = (item) => {
    const newDueDate = window.prompt("New due date:", item.dueDate);
    if (!newDueDate || !newDueDate.trim()) return;
    setBorrowed((current) =>
      current.map((entry) => (entry.id === item.id ? { ...entry, dueDate: newDueDate.trim(), status: "Active" } : entry))
    );
  };

  const activeCount = borrowed.filter((item) => item.status === "Active").length;
  const dueToday = borrowed.filter((item) => item.status === "Due Today").length;
  const overdue = borrowed.filter((item) => item.status === "Overdue").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Borrowed Books</h1>
          <p className="text-gray-500">Monitor all issued books, returns, renewals, and overdue items.</p>
        </div>

        <button onClick={handleIssueBook} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18} />
          Issue Book
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<BookOpen className="text-blue-600" />} value={borrowed.length.toLocaleString()} label="Borrowed Books" />
        <StatCard icon={<RefreshCw className="text-yellow-600" />} value={dueToday.toLocaleString()} label="Due Today" />
        <StatCard icon={<RotateCcw className="text-red-600" />} value={overdue.toLocaleString()} label="Overdue" />
        <StatCard icon={<BookOpen className="text-green-600" />} value={activeCount.toLocaleString()} label="Active Loans" />
      </div>

      <div className="flex items-center border rounded-xl px-4 py-3">
        <Search className="mr-2" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full outline-none"
          placeholder="Search by student, teacher, book title or ISBN..."
        />
      </div>

      <div className="overflow-hidden rounded-3xl border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Borrow ID</th>
                <th className="p-4 text-left">Borrower</th>
                <th className="p-4 text-left">Book</th>
                <th className="p-4 text-left">Due Date</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBorrowed.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No borrowed books match your search.</td>
                </tr>
              ) : (
                filteredBorrowed.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4 font-medium">{item.id}</td>
                    <td className="p-4">{item.student}<div className="text-xs text-gray-500">{item.type}</div></td>
                    <td className="p-4">{item.book}<div className="text-xs text-gray-500">{item.isbn}</div></td>
                    <td className="p-4">{item.dueDate}</td>
                    <td className="p-4"><span className="rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700">{item.status}</span></td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleView(item)} className="rounded-lg border p-2" aria-label={`View ${item.book}`}><Eye size={16} /></button>
                        <button onClick={() => handleRenew(item)} className="rounded-lg border p-2" aria-label={`Renew ${item.book}`}><RefreshCw size={16} /></button>
                      </div>
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