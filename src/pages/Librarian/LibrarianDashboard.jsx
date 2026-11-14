import { useState } from "react";
import {
  BookOpen,
  Library,
  Users,
  RotateCcw,
  AlertTriangle,
  DollarSign,
  ClipboardList,
  Plus,
  Bell,
} from "lucide-react";

const initialBooks = [
  { id: "BK-1001", title: "Mathematics for SS2", type: "Textbook" },
  { id: "BK-1002", title: "Advanced Physics", type: "Reference" },
  { id: "BK-1003", title: "Biology Essentials", type: "Textbook" },
];

const initialActivities = [
  { id: 1, title: "New user registration", detail: "12 new library members were added today." },
  { id: 2, title: "Book return reminder", detail: "5 borrowers have due dates today." },
  { id: 3, title: "Fine update", detail: "₦12,500 collected from overdue payments." },
];

export default function LibrarianDashboard() {
  const [books, setBooks] = useState(initialBooks);
  const [activities, setActivities] = useState(initialActivities);

  const totalBooks = books.length + 12450;
  const borrowed = 1246;
  const overdue = 54;
  const fineRevenue = 250000;

  const handleAddBook = () => {
    const title = window.prompt("Book title:", "New Library Title");
    if (!title || !title.trim()) return;
    const type = window.prompt("Book type:", "Textbook");
    if (!type || !type.trim()) return;

    const newBook = { id: `BK-${Date.now().toString().slice(-4)}`, title: title.trim(), type: type.trim() };
    setBooks((current) => [newBook, ...current]);
    setActivities((current) => [{ id: Date.now(), title: "Book added", detail: `${title.trim()} was added to the catalog.` }, ...current].slice(0, 5));
  };

  const handleQuickAction = (label) => {
    setActivities((current) => [{ id: Date.now(), title: label, detail: `${label} action completed successfully.` }, ...current].slice(0, 5));
    window.alert(`${label} action triggered.`);
  };

  const quickActions = [
    { label: "Add Book", icon: Plus },
    { label: "Issue Book", icon: ClipboardList },
    { label: "Return Book", icon: RotateCcw },
    { label: "Members", icon: Users },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Librarian Dashboard</h1>
          <p className="text-gray-500">Manage books, members, borrowing, returns, and library activities.</p>
        </div>

        <button onClick={handleAddBook} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18} />
          Add New Book
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="border rounded-3xl p-5"><Library className="text-blue-600 mb-2" /><h2 className="text-3xl font-bold">{totalBooks.toLocaleString()}</h2><p>Total Books</p></div>
        <div className="border rounded-3xl p-5"><BookOpen className="text-green-600 mb-2" /><h2 className="text-3xl font-bold">{borrowed.toLocaleString()}</h2><p>Borrowed</p></div>
        <div className="border rounded-3xl p-5"><AlertTriangle className="text-red-600 mb-2" /><h2 className="text-3xl font-bold">{overdue.toLocaleString()}</h2><p>Overdue</p></div>
        <div className="border rounded-3xl p-5"><DollarSign className="text-yellow-600 mb-2" /><h2 className="text-3xl font-bold">₦{fineRevenue.toLocaleString()}</h2><p>Fine Revenue</p></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {quickActions.map(({ label, icon: Icon }) => (
          <button key={label} onClick={() => handleQuickAction(label)} className="border rounded-2xl p-5 text-center hover:bg-gray-50">
            <Icon className="mx-auto mb-2" />
            {label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6">
        <div className="border rounded-3xl p-5">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 rounded-2xl bg-gray-50 p-3">
                <Bell className="mt-1 text-blue-600" size={16} />
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-3xl p-5">
          <h2 className="text-xl font-semibold mb-4">Catalog Snapshot</h2>
          <div className="space-y-3">
            {books.slice(0, 4).map((book) => (
              <div key={book.id} className="flex items-center justify-between rounded-2xl bg-gray-50 p-3">
                <div>
                  <p className="font-medium">{book.title}</p>
                  <p className="text-xs text-gray-500">{book.type}</p>
                </div>
                <span className="text-xs rounded-full bg-green-100 text-green-700 px-2 py-1">Active</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}