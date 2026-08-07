import {
  DollarSign,
  Search,
  Receipt,
  Eye,
  CreditCard,
  Download,
  Mail,
  FileText,
} from "lucide-react";

export default function FinesManagementPage() {
  return (
    <div className="space-y-6">

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Fines Management
          </h1>
          <p className="text-gray-500">
            Manage overdue, lost, and damaged book fines.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <FileText size={18}/>
          Add Fine
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-2xl p-5">
          <DollarSign className="text-blue-600 mb-2"/>
          <h2 className="text-2xl font-bold">₦845,000</h2>
          <p>Total Fines</p>
        </div>

        <div className="border rounded-2xl p-5">
          <Receipt className="text-green-600 mb-2"/>
          <h2 className="text-2xl font-bold">₦620,000</h2>
          <p>Collected</p>
        </div>

        <div className="border rounded-2xl p-5">
          <CreditCard className="text-red-600 mb-2"/>
          <h2 className="text-2xl font-bold">₦225,000</h2>
          <p>Outstanding</p>
        </div>

        <div className="border rounded-2xl p-5">
          <Receipt className="text-yellow-600 mb-2"/>
          <h2 className="text-2xl font-bold">128</h2>
          <p>Paid Fines</p>
        </div>

      </div>

      {/* Search */}

      <div className="flex items-center border rounded-xl px-4 py-3">

        <Search className="mr-2"/>

        <input
          className="outline-none w-full"
          placeholder="Search by member, book, fine ID..."
        />

      </div>

    </div>
  );
}