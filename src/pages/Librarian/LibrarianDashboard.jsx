import {
  BookOpen,
  Library,
  Users,
  RotateCcw,
  AlertTriangle,
  DollarSign,
  ClipboardList,
  Plus,
} from "lucide-react";

export default function LibrarianDashboard() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Librarian Dashboard
          </h1>

          <p className="text-gray-500">
            Manage books, members, borrowing, returns, and library activities.
          </p>

        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18}/>
          Add New Book
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Library className="text-blue-600 mb-2"/>
          <h2 className="text-3xl font-bold">12,450</h2>
          <p>Total Books</p>
        </div>

        <div className="border rounded-3xl p-5">
          <BookOpen className="text-green-600 mb-2"/>
          <h2 className="text-3xl font-bold">1,246</h2>
          <p>Borrowed</p>
        </div>

        <div className="border rounded-3xl p-5">
          <AlertTriangle className="text-red-600 mb-2"/>
          <h2 className="text-3xl font-bold">54</h2>
          <p>Overdue</p>
        </div>

        <div className="border rounded-3xl p-5">
          <DollarSign className="text-yellow-600 mb-2"/>
          <h2 className="text-3xl font-bold">₦250,000</h2>
          <p>Fine Revenue</p>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">

        <button className="border rounded-2xl p-5 text-center">
          <Plus className="mx-auto mb-2"/>
          Add Book
        </button>

        <button className="border rounded-2xl p-5 text-center">
          <ClipboardList className="mx-auto mb-2"/>
          Issue Book
        </button>

        <button className="border rounded-2xl p-5 text-center">
          <RotateCcw className="mx-auto mb-2"/>
          Return Book
        </button>

        <button className="border rounded-2xl p-5 text-center">
          <Users className="mx-auto mb-2"/>
          Members
        </button>

      </div>

    </div>
  );
}