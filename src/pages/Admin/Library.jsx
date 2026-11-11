import React, { useState } from "react";
import {
  BookOpen,
  Library,
  Users,
  AlertCircle,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

const initialBooks = [
  {
    id: 1,
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    category: "Literature",
    quantity: 25,
    available: 18,
  },
  {
    id: 2,
    title: "New General Mathematics",
    author: "M.F. Macrae",
    category: "Mathematics",
    quantity: 30,
    available: 12,
  },
  {
    id: 3,
    title: "Essential Physics",
    author: "M.W. Anyakoha",
    category: "Science",
    quantity: 20,
    available: 9,
  },
];

const AdminLibraryPage = () => {
  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const filteredBooks = books.filter((book) =>
    [book.title, book.author, book.category]
      .some((value) => value.toLowerCase().includes(search.trim().toLowerCase()))
  );

  const editBook = (book = null) => {
    const title = window.prompt("Book title:", book?.title || "");
    if (title === null || !title.trim()) return;
    const author = window.prompt("Author:", book?.author || "");
    if (author === null || !author.trim()) return;
    const category = window.prompt("Category:", book?.category || "");
    if (category === null || !category.trim()) return;
    const quantityInput = window.prompt("Quantity:", book?.quantity || "1");
    if (quantityInput === null || !Number.isInteger(Number(quantityInput)) || Number(quantityInput) < 0) return;
    const quantity = Number(quantityInput);
    setBooks((current) => book
      ? current.map((item) => item.id === book.id
        ? {
            ...item,
            title: title.trim(),
            author: author.trim(),
            category: category.trim(),
            quantity,
            available: Math.max(0, quantity - Math.min(quantity, item.quantity - item.available)),
          }
        : item)
      : [{ id: Date.now(), title: title.trim(), author: author.trim(), category: category.trim(), quantity, available: quantity }, ...current]);
  };

  const borrowed = books.reduce((total, book) => total + book.quantity - book.available, 0);
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Library Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage books, borrowing records, returns,
            and library operations. Book edits in this demo stay in this page only.
          </p>
        </div>

        <button onClick={() => editBook()} className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-50">
          <Plus className="w-4 h-4" />
          Add New Book
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="border border-gray-200 rounded-3xl p-5">
          <BookOpen className="w-6 h-6 text-blue-600 mb-3" />
          <h2 className="text-3xl font-bold">{books.reduce((total, book) => total + book.quantity, 0).toLocaleString()}</h2>
          <p className="text-sm text-gray-500">
            Total Books
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Library className="w-6 h-6 text-green-600 mb-3" />
          <h2 className="text-3xl font-bold">{books.reduce((total, book) => total + book.available, 0).toLocaleString()}</h2>
          <p className="text-sm text-gray-500">
            Available Books
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Users className="w-6 h-6 text-orange-600 mb-3" />
          <h2 className="text-3xl font-bold">{borrowed.toLocaleString()}</h2>
          <p className="text-sm text-gray-500">
            Borrowed Books
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <AlertCircle className="w-6 h-6 text-red-600 mb-3" />
          <h2 className="text-3xl font-bold">92</h2>
          <p className="text-sm text-gray-500">
            Overdue Books
          </p>
        </div>

      </div>

      {/* SEARCH */}
      <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3">

        <Search className="w-5 h-5 text-gray-500 mr-3" />

        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full outline-none"
        />

      </div>

      {/* BOOK INVENTORY */}
      <div className="border border-gray-200 rounded-3xl p-6">

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-lg font-semibold">
            Book Inventory
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3">Title</th>
                <th className="text-left py-3">Author</th>
                <th className="text-left py-3">Category</th>
                <th className="text-left py-3">Quantity</th>
                <th className="text-left py-3">Available</th>
                <th className="text-left py-3">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredBooks.map((book) => (
                <tr
                  key={book.id}
                  className="border-b border-gray-100"
                >
                  <td className="py-4">
                    {book.title}
                  </td>

                  <td>{book.author}</td>

                  <td>{book.category}</td>

                  <td>{book.quantity}</td>

                  <td>{book.available}</td>

                  <td>

                    <div className="flex gap-2">

                      <button onClick={() => window.alert(`${book.title}\n${book.author} · ${book.category}\n${book.available} of ${book.quantity} available`)} aria-label={`View ${book.title}`} className="p-2 border border-blue-200 rounded-xl text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>

                      <button onClick={() => editBook(book)} aria-label={`Edit ${book.title}`} className="p-2 border border-green-200 rounded-xl text-green-600">
                        <Edit className="w-4 h-4" />
                      </button>

                      <button onClick={() => {
                        if (window.confirm(`Delete "${book.title}"?`)) {
                          setBooks((current) => current.filter((item) => item.id !== book.id));
                        }
                      }} aria-label={`Delete ${book.title}`} className="p-2 border border-red-200 rounded-xl text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </td>
                </tr>
              ))}
              {filteredBooks.length === 0 && <tr><td colSpan={6} className="py-8 text-center text-gray-500">No books match your search.</td></tr>}

            </tbody>

          </table>

        </div>

      </div>

      {/* RECENT BORROWINGS */}
      <div className="border border-gray-200 rounded-3xl p-6">

        <h2 className="text-lg font-semibold mb-5">
          Recent Borrowing Records
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3">
                  Student
                </th>
                <th className="text-left py-3">
                  Book
                </th>
                <th className="text-left py-3">
                  Borrow Date
                </th>
                <th className="text-left py-3">
                  Due Date
                </th>
                <th className="text-left py-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b border-gray-100">
                <td className="py-4">
                  John Doe
                </td>
                <td>
                  Essential Physics
                </td>
                <td>
                  01 Jun 2026
                </td>
                <td>
                  15 Jun 2026
                </td>
                <td>
                  <span className="px-3 py-1 rounded-full text-xs border border-orange-200 bg-orange-50 text-orange-600">
                    Due Soon
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminLibraryPage;