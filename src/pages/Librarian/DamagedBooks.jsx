import {
  Search,
  Plus,
  Eye,
  Pencil,
  Wrench,
  DollarSign,
  FileText,
  Download,
  AlertTriangle,
} from "lucide-react";

export default function DamagedBooksPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Damaged Books
          </h1>

          <p className="text-gray-500 mt-2">
            Manage damaged books, repairs, charges, and replacement records.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2">
          <Plus size={18} />
          Report Damaged Book
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-2xl p-5">
          <AlertTriangle className="mb-3" />
          <h2 className="text-2xl font-bold">
            84
          </h2>
          <p className="text-gray-500">
            Damaged Books
          </p>
        </div>

        <div className="border rounded-2xl p-5">
          <Wrench className="mb-3" />
          <h2 className="text-2xl font-bold">
            21
          </h2>
          <p className="text-gray-500">
            Under Repair
          </p>
        </div>

        <div className="border rounded-2xl p-5">
          <DollarSign className="mb-3" />
          <h2 className="text-2xl font-bold">
            ₦185,000
          </h2>
          <p className="text-gray-500">
            Damage Charges
          </p>
        </div>

        <div className="border rounded-2xl p-5">
          <FileText className="mb-3" />
          <h2 className="text-2xl font-bold">
            43
          </h2>
          <p className="text-gray-500">
            Recovered
          </p>
        </div>

      </div>

      {/* Search */}
      <div className="flex flex-col lg:flex-row gap-4">

        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search book, borrower, ISBN or barcode..."
            className="w-full outline-none ml-3"
          />

        </div>

        <select className="border rounded-xl px-4 py-3">
          <option>All Damage Types</option>
          <option>Torn Pages</option>
          <option>Water Damage</option>
          <option>Damaged Cover</option>
          <option>Missing Pages</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Severity</option>
          <option>Minor</option>
          <option>Moderate</option>
          <option>Major</option>
          <option>Severe</option>
        </select>

      </div>

      {/* Table */}
      <div className="border rounded-3xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead className="border-b">
            <tr>
              <th className="text-left p-4">Book</th>
              <th className="text-left p-4">Borrower</th>
              <th className="text-left p-4">Damage</th>
              <th className="text-left p-4">Severity</th>
              <th className="text-left p-4">Charge</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-b">

              <td className="p-4">
                Physics for SS2
              </td>

              <td className="p-4">
                John Doe
              </td>

              <td className="p-4">
                Torn Cover
              </td>

              <td className="p-4">
                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                  Major
                </span>
              </td>

              <td className="p-4">
                ₦2,500
              </td>

              <td className="p-4">
                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                  Repair
                </span>
              </td>

              <td className="p-4">

                <div className="flex gap-2">

                  <button className="border rounded-lg p-2">
                    <Eye size={16} />
                  </button>

                  <button className="border rounded-lg p-2">
                    <Pencil size={16} />
                  </button>

                  <button className="border rounded-lg p-2">
                    <Wrench size={16} />
                  </button>

                </div>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}