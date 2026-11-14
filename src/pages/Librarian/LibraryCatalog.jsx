import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  BookOpen,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Download,
} from "lucide-react";

const initialBooks = [
  {
    id: "BK-000125",
    title: "Mathematics for SS2",
    author: "John Smith",
    category: "Mathematics",
    subject: "Mathematics",
    copies: 25,
    available: 18,
    borrowed: 5,
    location: "Shelf A-12",
    status: "Available",
  },
  {
    id: "BK-000126",
    title: "Advanced Physics",
    author: "A. Bello",
    category: "Science",
    subject: "Physics",
    copies: 20,
    available: 12,
    borrowed: 6,
    location: "Shelf B-05",
    status: "Available",
  },
  {
    id: "BK-000127",
    title: "Biology Essentials",
    author: "Mary Ali",
    category: "Science",
    subject: "Biology",
    copies: 15,
    available: 10,
    borrowed: 4,
    location: "Shelf B-08",
    status: "Borrowed",
  },
];

export default function LibrarianLibraryCatalogPage() {
  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [subject, setSubject] = useState("All Subjects");
  const [availability, setAvailability] = useState("All Availability");
  const [activeTab, setActiveTab] = useState("All Books");

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = [book.title, book.author, book.id, book.category]
        .join(" ")
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesCategory = category === "All Categories" || book.category === category;
      const matchesSubject = subject === "All Subjects" || book.subject === subject;
      const matchesAvailability =
        availability === "All Availability" ||
        (availability === "Available" && book.status === "Available") ||
        (availability === "Borrowed" && book.status === "Borrowed") ||
        (availability === "Reserved" && book.status === "Reserved") ||
        (availability === "Damaged" && book.status === "Damaged") ||
        (availability === "Lost" && book.status === "Lost");
      const matchesTab =
        activeTab === "All Books" ||
        (activeTab === "Available" && book.status === "Available") ||
        (activeTab === "Borrowed" && book.status === "Borrowed") ||
        (activeTab === "Reserved" && book.status === "Reserved") ||
        (activeTab === "Damaged" && book.status === "Damaged") ||
        (activeTab === "Lost" && book.status === "Lost");

      return matchesSearch && matchesCategory && matchesSubject && matchesAvailability && matchesTab;
    });
  }, [books, search, category, subject, availability, activeTab]);

  const totalBooks = books.reduce((sum, book) => sum + book.copies, 0);
  const totalAvailable = books.reduce((sum, book) => sum + book.available, 0);
  const totalBorrowed = books.reduce((sum, book) => sum + book.borrowed, 0);

  const handleAddBook = () => {
    const title = window.prompt("Book title:", "");
    if (title === null || !title.trim()) return;
    const author = window.prompt("Author:", "");
    if (author === null || !author.trim()) return;
    const categoryValue = window.prompt("Category:", "Science");
    if (categoryValue === null || !categoryValue.trim()) return;
    const subjectValue = window.prompt("Subject:", "Mathematics");
    if (subjectValue === null || !subjectValue.trim()) return;
    const copiesValue = window.prompt("Copies:", "10");
    if (copiesValue === null || !Number.isInteger(Number(copiesValue)) || Number(copiesValue) <= 0) return;
    const locationValue = window.prompt("Location:", "Shelf A-01");
    if (locationValue === null || !locationValue.trim()) return;

    const copies = Number(copiesValue);
    const newBook = {
      id: `BK-${Date.now().toString().slice(-6)}`,
      title: title.trim(),
      author: author.trim(),
      category: categoryValue.trim(),
      subject: subjectValue.trim(),
      copies,
      available: copies,
      borrowed: 0,
      location: locationValue.trim(),
      status: "Available",
    };

    setBooks((current) => [newBook, ...current]);
  };

  const handleEditBook = (book) => {
    const title = window.prompt("Book title:", book.title);
    if (title === null || !title.trim()) return;
    const author = window.prompt("Author:", book.author);
    if (author === null || !author.trim()) return;
    const categoryValue = window.prompt("Category:", book.category);
    if (categoryValue === null || !categoryValue.trim()) return;
    const subjectValue = window.prompt("Subject:", book.subject);
    if (subjectValue === null || !subjectValue.trim()) return;
    const copiesValue = window.prompt("Copies:", String(book.copies));
    if (copiesValue === null || !Number.isInteger(Number(copiesValue)) || Number(copiesValue) < 0) return;
    const locationValue = window.prompt("Location:", book.location);
    if (locationValue === null || !locationValue.trim()) return;

    const copies = Number(copiesValue);
    setBooks((current) =>
      current.map((item) => {
        if (item.id !== book.id) return item;

        const nextAvailable = Math.max(0, copies - Math.min(copies, item.borrowed));
        return {
          ...item,
          title: title.trim(),
          author: author.trim(),
          category: categoryValue.trim(),
          subject: subjectValue.trim(),
          copies,
          available: nextAvailable,
          borrowed: Math.max(0, copies - nextAvailable),
          location: locationValue.trim(),
          status: nextAvailable > 0 ? "Available" : "Borrowed",
        };
      })
    );
  };

  const handleDeleteBook = (book) => {
    if (window.confirm(`Delete "${book.title}" from the catalog?`)) {
      setBooks((current) => current.filter((item) => item.id !== book.id));
    }
  };

  const viewBook = (book) => {
    window.alert(
      `${book.title}\nAuthor: ${book.author}\nCategory: ${book.category}\nSubject: ${book.subject}\nCopies: ${book.copies}\nAvailable: ${book.available}\nLocation: ${book.location}`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Library Catalog</h1>
          <p className="text-gray-500 mt-1">Browse and manage the complete library collection.</p>
        </div>

        <div className="flex gap-3">
          <button className="border rounded-xl px-5 py-3 flex items-center gap-2">
            <Download size={18} />
            Export
          </button>

          <button
            onClick={handleAddBook}
            className="bg-blue-600 text-white rounded-xl px-5 py-3 flex items-center gap-2"
          >
            <Plus size={18} />
            Add Book
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard icon={<BookOpen />} value={totalBooks.toLocaleString()} label="Total Books" />
        <StatCard icon={<BookOpen />} value={totalAvailable.toLocaleString()} label="Available" />
        <StatCard icon={<BookOpen />} value={totalBorrowed.toLocaleString()} label="Borrowed" />
        <StatCard icon={<BookOpen />} value={books.filter((book) => book.status === "Reserved").length.toLocaleString()} label="Reserved" />
        <StatCard icon={<BookOpen />} value={books.filter((book) => book.status === "Damaged").length.toLocaleString()} label="Damaged" />
        <StatCard icon={<BookOpen />} value={books.filter((book) => book.status === "Lost").length.toLocaleString()} label="Lost" />
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        <div className="border rounded-xl px-4 py-3 flex items-center flex-1">
          <Search size={18} />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search title, author, ISBN or book ID..."
            className="outline-none w-full ml-3"
          />
        </div>

        <select value={category} onChange={(event) => setCategory(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Categories</option>
          <option>Science</option>
          <option>Arts</option>
          <option>Commercial</option>
          <option>Literature</option>
          <option>Mathematics</option>
        </select>

        <select value={subject} onChange={(event) => setSubject(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Subjects</option>
          <option>Mathematics</option>
          <option>Physics</option>
          <option>Biology</option>
          <option>Chemistry</option>
          <option>English</option>
        </select>

        <select value={availability} onChange={(event) => setAvailability(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Availability</option>
          <option>Available</option>
          <option>Borrowed</option>
          <option>Reserved</option>
          <option>Damaged</option>
          <option>Lost</option>
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {[
          "All Books",
          "Available",
          "Borrowed",
          "Reserved",
          "Damaged",
          "Lost",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={`px-5 py-2 rounded-xl whitespace-nowrap ${
              activeTab === item ? "bg-blue-600 text-white" : "border"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="border-b">
            <tr>
              <th className="text-left p-4">Book</th>
              <th className="text-left p-4">Author</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Copies</th>
              <th className="text-left p-4">Available</th>
              <th className="text-left p-4">Borrowed</th>
              <th className="text-left p-4">Location</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  No books match your filters.
                </td>
              </tr>
            ) : (
              filteredBooks.map((book) => (
                <BookRow
                  key={book.id}
                  book={book}
                  onView={viewBook}
                  onEdit={handleEditBook}
                  onDelete={handleDeleteBook}
                />
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
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function BookRow({ book, onView, onEdit, onDelete }) {
  return (
    <tr className="border-b">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-12 border rounded-lg flex items-center justify-center">
            <BookOpen size={18} />
          </div>
          <div>
            <p className="font-semibold">{book.title}</p>
            <p className="text-xs text-gray-500">{book.id}</p>
          </div>
        </div>
      </td>

      <td className="p-4">{book.author}</td>
      <td className="p-4">{book.category}</td>
      <td className="p-4">{book.copies}</td>
      <td className="p-4 text-green-600 font-medium">{book.available}</td>
      <td className="p-4">{book.borrowed}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-500" />
          {book.location}
        </div>
      </td>

      <td className="p-4">
        <div className="flex gap-2">
          <button onClick={() => onView(book)} className="border rounded-lg p-2" aria-label={`View ${book.title}`}>
            <Eye size={17} />
          </button>

          <button onClick={() => onEdit(book)} className="border rounded-lg p-2" aria-label={`Edit ${book.title}`}>
            <Edit size={17} />
          </button>

          <button onClick={() => onDelete(book)} className="border rounded-lg p-2 text-red-600" aria-label={`Delete ${book.title}`}>
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}
