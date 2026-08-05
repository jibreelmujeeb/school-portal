import {
  AlertTriangle,
  Search,
  Mail,
  MessageSquare,
  RotateCcw,
  Eye,
  DollarSign,
} from "lucide-react";

export default function OverdueBooksPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Overdue Books
          </h1>
          <p className="text-gray-500">
            Track overdue books, calculate fines, and send reminders.
          </p>
        </div>

        <button className="bg-red-600 text-white px-5 py-3 rounded-xl">
          Send Bulk Reminders
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-2xl p-5">
          <AlertTriangle className="text-red-600 mb-2"/>
          <h2 className="text-2xl font-bold">58</h2>
          <p>Total Overdue</p>
        </div>

        <div className="border rounded-2xl p-5">
          <AlertTriangle className="text-orange-600 mb-2"/>
          
          <h2 className="text-2xl font-bold">21</h2>
          <p>Critical</p>
        </div>

        <div className="border rounded-2xl p-5">
          <DollarSign className="text-green-600 mb-2"/>
          <h2 className="text-2xl font-bold">₦186,500</h2>
          <p>Outstanding Fines</p>
        </div>

        <div className="border rounded-2xl p-5">
          <Mail className="text-blue-600 mb-2"/>
          <h2 className="text-2xl font-bold">132</h2>
          <p>Reminders Sent</p>
        </div>

      </div>

      {/* Search */}
      <div className="flex items-center border rounded-xl px-4 py-3">
        <Search className="mr-2"/>
        <input
          className="w-full outline-none"
          placeholder="Search borrower, book title, ISBN or member ID..."
        />
      </div>

    </div>
  );
}