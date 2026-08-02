import { Plus, Search, Eye, Pencil, Trash2, BookOpen } from "lucide-react";

export default function BooksManagement() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Books Management
          </h1>

          <p className="text-gray-500">
            Manage all books available in the school library.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18}/>
          Add Book
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-2xl p-5">
          <BookOpen className="text-blue-600 mb-2"/>
          <h2 className="text-2xl font-bold">12,450</h2>
          <p>Total Books</p>
        </div>

        <div className="border rounded-2xl p-5">
          <BookOpen className="text-green-600 mb-2"/>
          <h2 className="text-2xl font-bold">11,120</h2>
          <p>Available</p>
        </div>

        <div className="border rounded-2xl p-5">
          <BookOpen className="text-orange-600 mb-2"/>
          <h2 className="text-2xl font-bold">1,250</h2>
          <p>Borrowed</p>
        </div>

        <div className="border rounded-2xl p-5">
          <BookOpen className="text-red-600 mb-2"/>
          <h2 className="text-2xl font-bold">80</h2>
          <p>Damaged</p>
        </div>

      </div>

      {/* Search */}
      <div className="flex gap-4">

        <div className="flex-1 flex items-center border rounded-xl px-4 py-3">
          <Search className="mr-2"/>
          <input
            placeholder="Search books..."
            className="outline-none w-full"
          />
        </div>

      </div>

    </div>
  );
}