import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Printer,
  Download,
  Mail,
  RotateCcw,
  Ban,
  FileText,
} from "lucide-react";

const receipts = [
  {
    id: "REC2026001",
    student: "John David",
    feeType: "Tuition",
    amount: "₦150,000",
    method: "Bank Transfer",
    date: "2026-07-21",
    status: "Issued",
  },
  {
    id: "REC2026002",
    student: "Mary Johnson",
    feeType: "Hostel Fee",
    amount: "₦80,000",
    method: "POS",
    date: "2026-07-22",
    status: "Reissued",
  },
];

export default function ReceiptManagementPage() {
  const [search, setSearch] = useState("");

  const filtered = receipts.filter(
    (receipt) =>
      receipt.id.toLowerCase().includes(search.toLowerCase()) ||
      receipt.student.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Receipts Management</h1>
          <p className="text-gray-500 mt-2">
            View, print, download, and manage all payment receipts.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Download size={18} />
          Export
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <FileText className="text-blue-600 mb-3" />
          <h2 className="text-2xl font-bold">5,247</h2>
          <p>Total Receipts</p>
        </div>

        <div className="border rounded-3xl p-5">
          <FileText className="text-green-600 mb-3" />
          <h2 className="text-2xl font-bold">₦48.6M</h2>
          <p>Total Collections</p>
        </div>

        <div className="border rounded-3xl p-5">
          <RotateCcw className="text-yellow-600 mb-3" />
          <h2 className="text-2xl font-bold">32</h2>
          <p>Reissued</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Ban className="text-red-600 mb-3" />
          <h2 className="text-2xl font-bold">5</h2>
          <p>Voided</p>
        </div>

      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex-1 flex items-center border rounded-xl px-4 py-3">
          <Search className="mr-3" />
          <input
            className="outline-none w-full"
            placeholder="Search receipt number or student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="border rounded-xl px-5 flex items-center gap-2">
          <Filter size={18} />
          Filter
        </button>

      </div>

      {/* Table */}
      <div className="border rounded-3xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[1200px]">

          <thead className="bg-gray-50">
            <tr>
              <th>Receipt No.</th>
              <th>Student</th>
              <th>Fee Type</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((receipt) => (
              <tr key={receipt.id} className="border-t">

                <td>{receipt.id}</td>
                <td>{receipt.student}</td>
                <td>{receipt.feeType}</td>
                <td>{receipt.amount}</td>
                <td>{receipt.method}</td>
                <td>{receipt.date}</td>

                <td>
                  <span className={`px-3 py-1 rounded-full ${
                    receipt.status === "Issued"
                      ? "bg-green-100 text-green-700"
                      : receipt.status === "Reissued"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {receipt.status}
                  </span>
                </td>

                <td>
                  <div className="flex gap-2">

                    <button className="border rounded-lg p-2">
                      <Eye size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Printer size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Download size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Mail size={16}/>
                    </button>

                  </div>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}