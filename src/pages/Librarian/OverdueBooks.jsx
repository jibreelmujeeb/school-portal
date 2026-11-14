import { useMemo, useState } from "react";
import { AlertTriangle, Search, Mail, DollarSign } from "lucide-react";

const initialOverdues = [
  { id: "OD-4501", borrower: "Jane Okafor", book: "Economics Basics", isbn: "978-1-2345-2101-0", daysLate: 12, fine: "₦3,600", priority: "Critical" },
  { id: "OD-4502", borrower: "Haruna Musa", book: "Computer Science Primer", isbn: "978-1-2345-2102-0", daysLate: 8, fine: "₦2,400", priority: "High" },
  { id: "OD-4503", borrower: "Linda Daniel", book: "Government & Civic Education", isbn: "978-1-2345-2103-0", daysLate: 5, fine: "₦1,500", priority: "Medium" },
];

export default function OverdueBooksPage() {
  const [overdue, setOverdue] = useState(initialOverdues);
  const [search, setSearch] = useState("");

  const filteredOverdue = useMemo(() => {
    return overdue.filter((item) =>
      [item.borrower, item.book, item.isbn, item.id].join(" ").toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [overdue, search]);

  const totalFine = overdue.reduce((sum, item) => sum + Number(String(item.fine).replace(/[^\d.]/g, "")), 0);
  const criticalCount = overdue.filter((item) => item.priority === "Critical").length;

  const handleReminder = (item) => {
    window.alert(`Reminder sent to ${item.borrower} for ${item.book}.`);
  };

  const handleBulkReminders = () => {
    const count = overdue.length;
    window.alert(`Bulk reminder sent to ${count} overdue borrowers.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Overdue Books</h1>
          <p className="text-gray-500">Track overdue books, calculate fines, and send reminders.</p>
        </div>

        <button onClick={handleBulkReminders} className="bg-red-600 text-white px-5 py-3 rounded-xl">
          Send Bulk Reminders
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<AlertTriangle className="text-red-600" />} value={overdue.length.toLocaleString()} label="Total Overdue" />
        <StatCard icon={<AlertTriangle className="text-orange-600" />} value={criticalCount.toLocaleString()} label="Critical" />
        <StatCard icon={<DollarSign className="text-green-600" />} value={`₦${totalFine.toLocaleString()}`} label="Outstanding Fines" />
        <StatCard icon={<Mail className="text-blue-600" />} value={overdue.length.toLocaleString()} label="Reminders Sent" />
      </div>

      <div className="flex items-center border rounded-xl px-4 py-3">
        <Search className="mr-2" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full outline-none"
          placeholder="Search borrower, book title, ISBN or member ID..."
        />
      </div>

      <div className="overflow-hidden rounded-3xl border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Borrower</th>
                <th className="p-4 text-left">Book</th>
                <th className="p-4 text-left">Days Late</th>
                <th className="p-4 text-left">Fine</th>
                <th className="p-4 text-left">Priority</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOverdue.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">No overdue items match your search.</td>
                </tr>
              ) : (
                filteredOverdue.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4 font-medium">{item.id}</td>
                    <td className="p-4">{item.borrower}</td>
                    <td className="p-4">{item.book}<div className="text-xs text-gray-500">{item.isbn}</div></td>
                    <td className="p-4">{item.daysLate} days</td>
                    <td className="p-4">{item.fine}</td>
                    <td className="p-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.priority === "Critical" ? "bg-red-50 text-red-700" : item.priority === "High" ? "bg-orange-50 text-orange-700" : "bg-yellow-50 text-yellow-700"}`}>{item.priority}</span></td>
                    <td className="p-4"><button onClick={() => handleReminder(item)} className="rounded-lg border px-3 py-2 text-sm">Send Reminder</button></td>
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