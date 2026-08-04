import { Search, ScanLine, RotateCcw, Eye, Receipt, Download } from "lucide-react";

export default function ReturnedBooksPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Returned Books</h1>
          <p className="text-gray-500">
            Manage returned books, fines, and inventory updates.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <RotateCcw size={18}/>
          Receive Return
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-2xl p-5">
          <RotateCcw className="text-green-600 mb-2"/>
          <h2 className="text-2xl font-bold">42</h2>
          <p>Returned Today</p>
        </div>

        <div className="border rounded-2xl p-5">
          <Receipt className="text-blue-600 mb-2"/>
          <h2 className="text-2xl font-bold">8,245</h2>
          <p>Total Returned</p>
        </div>

        <div className="border rounded-2xl p-5">
          <ScanLine className="text-red-600 mb-2"/>
          <h2 className="text-2xl font-bold">16</h2>
          <p>Damaged Books</p>
        </div>

        <div className="border rounded-2xl p-5">
          <Download className="text-yellow-600 mb-2"/>
          <h2 className="text-2xl font-bold">₦86,000</h2>
          <p>Fine Collected</p>
        </div>

      </div>

      {/* Search */}
      <div className="flex items-center border rounded-xl px-4 py-3">
        <Search className="mr-2"/>
        <input
          className="w-full outline-none"
          placeholder="Search by borrower, book title, ISBN or return ID..."
        />
      </div>

    </div>
  );
}