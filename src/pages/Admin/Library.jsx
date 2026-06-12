import React from "react";
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

const books = [
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
            and library operations.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-50">
          <Plus className="w-4 h-4" />
          Add New Book
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="border border-gray-200 rounded-3xl p-5">
          <BookOpen className="w-6 h-6 text-blue-600 mb-3" />
          <h2 className="text-3xl font-bold">5,420</h2>
          <p className="text-sm text-gray-500">
            Total Books
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Library className="w-6 h-6 text-green-600 mb-3" />
          <h2 className="text-3xl font-bold">4,180</h2>
          <p className="text-sm text-gray-500">
            Available Books
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Users className="w-6 h-6 text-orange-600 mb-3" />
          <h2 className="text-3xl font-bold">1,145</h2>
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

              {books.map((book) => (
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

                      <button className="p-2 border border-blue-200 rounded-xl text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>

                      <button className="p-2 border border-green-200 rounded-xl text-green-600">
                        <Edit className="w-4 h-4" />
                      </button>

                      <button className="p-2 border border-red-200 rounded-xl text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </td>
                </tr>
              ))}

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