import {
  Search,
  Plus,
  RefreshCw,
  RotateCcw,
  Eye,
  Download,
  Mail,
  BookOpen,
} from "lucide-react";

export default function BorrowedBooksPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Borrowed Books
          </h1>

          <p className="text-gray-500">
            Monitor all issued books, returns, renewals, and overdue items.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18}/>
          Issue Book
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-2xl p-5">
          <BookOpen className="mb-2 text-blue-600"/>
          <h2 className="text-2xl font-bold">1,286</h2>
          <p>Borrowed Books</p>
        </div>

        <div className="border rounded-2xl p-5">
          <RefreshCw className="mb-2 text-yellow-600"/>
          <h2 className="text-2xl font-bold">34</h2>
          <p>Due Today</p>
        </div>

        <div className="border rounded-2xl p-5">
          <RotateCcw className="mb-2 text-red-600"/>
          <h2 className="text-2xl font-bold">58</h2>
          <p>Overdue</p>
        </div>

        <div className="border rounded-2xl p-5">
          <BookOpen className="mb-2 text-green-600"/>
          <h2 className="text-2xl font-bold">₦145,000</h2>
          
          <p>Outstanding Fines</p>
        </div>

      </div>

      {/* Search */}
      <div className="flex items-center border rounded-xl px-4 py-3">
        <Search className="mr-2"/>
        <input
          className="w-full outline-none"
          placeholder="Search by student, teacher, book title or ISBN..."
        />
      </div>

    </div>
  );
}