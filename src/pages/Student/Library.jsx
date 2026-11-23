import React, { useState } from "react";
import {
  Search,
  BookOpen,
  Calendar,
  Heart,
  Clock,
  Bookmark,
} from "lucide-react";

const books = [
  {
    id: 1,
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    category: "Literature",
    available: true,
  },
  {
    id: 2,
    title: "New General Mathematics",
    author: "M.F. Macrae",
    category: "Mathematics",
    available: false,
  },
  {
    id: 3,
    title: "Essential Physics",
    author: "M.W. Anyakoha",
    category: "Science",
    available: true,
  },
  {
    id: 4,
    title: "Modern Biology",
    author: "Ramalingam",
    category: "Science",
    available: true,
  },
];

const StudentLibraryPage = () => {
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState(
    () => books.filter((book) => book.title === "Essential Physics").map((book) => book.id),
  );
  const [notice, setNotice] = useState("");

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(search.toLowerCase())
  );

  const toggleBorrow = (book) => {
    if (!book.available && !borrowedBooks.includes(book.id)) {
      setNotice(`${book.title} is currently unavailable.`);
      return;
    }
    setBorrowedBooks((current) =>
      current.includes(book.id)
        ? current.filter((id) => id !== book.id)
        : [...current, book.id],
    );
    setNotice(
      borrowedBooks.includes(book.id)
        ? `${book.title} has been returned.`
        : `${book.title} added to your borrowed books.`,
    );
  };

  return (
    <div className="space-y-8">
      {notice && (
        <p role="status" className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          {notice}
        </p>
      )}

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          Library
        </h1>

        <p className="text-gray-500 mt-2">
          Browse available books and manage your borrowing activities.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="border border-gray-200 rounded-3xl p-5">
          <BookOpen className="w-6 h-6 mb-3" />
          <h2 className="text-3xl font-bold">2,540</h2>
          <p className="text-gray-500 text-sm">
            Total Books
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Bookmark className="w-6 h-6 mb-3" />
          <h2 className="text-3xl font-bold">4</h2>
          <p className="text-gray-500 text-sm">
            Borrowed Books
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Clock className="w-6 h-6 mb-3" />
          <h2 className="text-3xl font-bold">1</h2>
          <p className="text-gray-500 text-sm">
            Due Soon
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Heart className="w-6 h-6 mb-3" />
          <h2 className="text-3xl font-bold">12</h2>
          <p className="text-gray-500 text-sm">
            Favorites
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
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full outline-none"
        />

      </div>

      {/* BOOK GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="border border-gray-200 rounded-3xl p-6"
          >

            <div className="flex items-start justify-between">

              <BookOpen className="w-10 h-10 text-blue-600" />

              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  book.available
                    ? "bg-green-50 text-green-600 border border-green-200"
                    : "bg-red-50 text-red-600 border border-red-200"
                }`}
              >
                {book.available
                  ? "Available"
                  : "Borrowed"}
              </span>

            </div>

            <h2 className="font-semibold text-lg mt-5">
              {book.title}
            </h2>

            <p className="text-gray-500 mt-1">
              {book.author}
            </p>

            <p className="text-sm text-blue-600 mt-3">
              {book.category}
            </p>

            <div className="flex gap-3 mt-6">

              <button type="button" onClick={() => setSelectedBook(book)} className="flex-1 py-3 rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-50">
                View
              </button>

              <button type="button" disabled={!book.available && !borrowedBooks.includes(book.id)} onClick={() => toggleBorrow(book)} className="flex-1 py-3 rounded-2xl border border-green-600 text-green-600 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-40">
                {borrowedBooks.includes(book.id) ? "Return" : "Borrow"}
              </button>

            </div>

            {selectedBook && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-label={selectedBook.title}>
                <div className="w-full max-w-md rounded-2xl bg-white p-6">
                  <BookOpen className="h-10 w-10 text-blue-600" />
                  <h2 className="mt-4 text-xl font-semibold">{selectedBook.title}</h2>
                  <p className="mt-2 text-sm text-gray-600">by {selectedBook.author}</p>
                  <p className="mt-3 text-sm text-blue-600">{selectedBook.category}</p>
                  <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={() => setSelectedBook(null)} className="rounded-xl border border-gray-300 px-4 py-2 text-sm">Close</button>
                    {selectedBook.available && (
                      <button type="button" onClick={() => toggleBorrow(selectedBook)} className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white">
                        {borrowedBooks.includes(selectedBook.id) ? "Return Book" : "Borrow Book"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        ))}

      </div>

      {/* BORROWED BOOKS */}
      <div className="border border-gray-200 rounded-3xl p-6">

        <h2 className="text-lg font-semibold mb-5">
          Borrowed Books
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>
              <tr className="border-b border-gray-200">
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
              <tr>
                <td className="py-4">
                  Essential Physics
                </td>
                <td>01 Jun 2026</td>
                <td>15 Jun 2026</td>
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

export default StudentLibraryPage;