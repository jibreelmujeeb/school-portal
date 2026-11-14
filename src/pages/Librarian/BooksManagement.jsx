import { useMemo, useState } from "react";
import { Plus, Search, Eye, Pencil, Trash2, BookOpen } from "lucide-react";

const initialBooks = [
  { id: "BK-1001", title: "Mathematics for SS2", author: "A. Okafor", category: "Textbook", copies: 32, available: 18, shelf: "A-12", status: "Available" },
  { id: "BK-1002", title: "Advanced Physics", author: "M. Ibrahim", category: "Reference", copies: 16, available: 6, shelf: "B-08", status: "Borrowed" },
  { id: "BK-1003", title: "Biology Essentials", author: "R. Yusuf", category: "Textbook", copies: 22, available: 14, shelf: "C-04", status: "Available" },
  { id: "BK-1004", title: "Chemistry Lab Manual", author: "T. Ade", category: "Practical", copies: 12, available: 3, shelf: "D-02", status: "Damaged" },
];

export default function BooksManagement() {
  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = [book.title, book.author, book.id, book.category].join(" ").toLowerCase().includes(search.trim().toLowerCase());
      const matchesCategory = categoryFilter === "All Categories" || book.category === categoryFilter;
      const matchesStatus = statusFilter === "All Status" || book.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [books, search, categoryFilter, statusFilter]);

  const handleAddBook = () => {
    const title = window.prompt("Book title:", "New Library Book");
    if (!title || !title.trim()) return;
    const author = window.prompt("Author:", "Unknown Author");
    if (!author || !author.trim()) return;
    const category = window.prompt("Category:", "Textbook");
    if (!category || !category.trim()) return;
    const shelf = window.prompt("Shelf location:", "A-10");
    if (!shelf || !shelf.trim()) return;

    setBooks((current) => [{
      id: `BK-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      author: author.trim(),
      category: category.trim(),
      copies: 10,
      available: 10,
      shelf: shelf.trim(),
      status: "Available",
    }, ...current]);
  };

  const handleDelete = (id) => {
    setBooks((current) => current.filter((book) => book.id !== id));
  };

  const handleStatusChange = (id, status) => {
    setBooks((current) => current.map((book) => book.id === id ? { ...book, status } : book));
  };

  const totalBooks = books.length;
  const available = books.filter((book) => book.status === "Available").length;
  const borrowed = books.filter((book) => book.status === "Borrowed").length;
  const damaged = books.filter((book) => book.status === "Damaged").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Books Management</h1>
          <p className="text-gray-500">Manage all books available in the school library.</p>
        </div>

        <button onClick={handleAddBook} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18} />
          Add Book
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<BookOpen className="text-blue-600" />} value={totalBooks.toLocaleString()} label="Total Books" />
        <StatCard icon={<BookOpen className="text-green-600" />} value={available.toLocaleString()} label="Available" />
        <StatCard icon={<BookOpen className="text-orange-600" />} value={borrowed.toLocaleString()} label="Borrowed" />
        <StatCard icon={<BookOpen className="text-red-600" />} value={damaged.toLocaleString()} label="Damaged" />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex items-center border rounded-xl px-4 py-3">
          <Search className="mr-2" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search books..." className="outline-none w-full" />
        </div>

        <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Categories</option>
          <option>Textbook</option>
          <option>Reference</option>
          <option>Practical</option>
          <option>Novel</option>
        </select>

        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Status</option>
          <option>Available</option>
          <option>Borrowed</option>
          <option>Damaged</option>
        </select>
      </div>

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="text-left p-4">Book</th>
              <th className="text-left p-4">Author</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Copies</th>
              <th className="text-left p-4">Available</th>
              <th className="text-left p-4">Shelf</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">No books match your search.</td>
              </tr>
            ) : (
              filteredBooks.map((book) => (
                <tr key={book.id} className="border-b">
                  <td className="p-4 font-medium">{book.title}<div className="text-xs text-gray-500">{book.id}</div></td>
                  <td className="p-4">{book.author}</td>
                  <td className="p-4">{book.category}</td>
                  <td className="p-4">{book.copies}</td>
                  <td className="p-4">{book.available}</td>
                  <td className="p-4">{book.shelf}</td>
                  <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${book.status === "Available" ? "bg-green-100 text-green-700" : book.status === "Borrowed" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{book.status}</span></td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="border rounded-lg p-2" title="View"><Eye size={16} /></button>
                      <button onClick={() => handleStatusChange(book.id, book.status === "Available" ? "Borrowed" : "Available")} className="border rounded-lg p-2" title="Toggle status"><Pencil size={16} /></button>
                      <button onClick={() => handleDelete(book.id)} className="border rounded-lg p-2" title="Delete"><Trash2 size={16} /></button>
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
      <div className="mb-2">{icon}</div>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p>{label}</p>
    </div>
  );
}