import React, { useState } from "react";
import {
  Receipt,
  Search,
  Filter,
  Eye,
  Download,
  Printer,
  Mail,
  CheckCircle,
  Calendar,
  Wallet,
} from "lucide-react";

const receipts = [
  {
    id: 1,
    receiptNo: "REC-2026-001",
    student: "John Doe",
    feeType: "School Fees",
    amount: 120000,
    paymentMethod: "Bank Transfer",
    paymentDate: "2026-01-15",
    status: "Verified",
  },
  {
    id: 2,
    receiptNo: "REC-2026-015",
    student: "Mary Doe",
    feeType: "Examination Fee",
    amount: 15000,
    paymentMethod: "Card",
    paymentDate: "2026-02-20",
    status: "Verified",
  },
];

export default function ParentReceiptPage() {
  const [search, setSearch] = useState("");

  const filteredReceipts = receipts.filter(
    (receipt) =>
      receipt.receiptNo.toLowerCase().includes(search.toLowerCase()) ||
      receipt.student.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Payment Receipts
          </h1>

          <p className="text-gray-500 mt-2">
            View, download, print, and verify official payment receipts.
          </p>
        </div>

        <button className="bg-blue-600 text-white rounded-xl px-5 py-3 flex items-center gap-2">
          <Download size={18}/>
          Export Receipts
        </button>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Receipt className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">15</h2>
          <p>Total Receipts</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Wallet className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">₦450,000</h2>
          <p>Total Payments</p>
        </div>

        <div className="border rounded-3xl p-5">
          <CheckCircle className="text-purple-600 mb-3"/>
          <h2 className="text-2xl font-bold">15</h2>
          <p>Verified</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Calendar className="text-orange-600 mb-3"/>
          <h2 className="text-2xl font-bold">2025/2026</h2>
          <p>Current Session</p>
        </div>

      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex items-center flex-1 border rounded-xl px-4 py-3">
          <Search className="mr-3 text-gray-500"/>
          <input
            type="text"
            placeholder="Search receipt number or student..."
            className="w-full outline-none"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>

        <button className="border rounded-xl px-5 flex items-center gap-2">
          <Filter size={18}/>
          Filter
        </button>

      </div>

      {/* Receipts Table */}
      <div className="border rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead className="bg-gray-50">

              <tr>
                <th className="text-left p-4">Receipt No.</th>
                <th className="text-left p-4">Student</th>
                <th className="text-left p-4">Fee Type</th>
                <th className="text-right p-4">Amount</th>
                <th className="text-left p-4">Payment Method</th>
                <th className="text-left p-4">Date</th>
                <th className="text-center p-4">Status</th>
                <th className="text-center p-4">Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredReceipts.map((receipt)=>(
                <tr key={receipt.id} className="border-t">

                  <td className="p-4 font-medium">
                    {receipt.receiptNo}
                  </td>

                  <td className="p-4">
                    {receipt.student}
                  </td>

                  <td className="p-4">
                    {receipt.feeType}
                  </td>

                  <td className="p-4 text-right font-semibold">
                    ₦{receipt.amount.toLocaleString()}
                  </td>

                  <td className="p-4">
                    {receipt.paymentMethod}
                  </td>

                  <td className="p-4">
                    {receipt.paymentDate}
                  </td>

                  <td className="p-4 text-center">

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
                      {receipt.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button className="border rounded-lg p-2">
                        <Eye size={16}/>
                      </button>

                      <button className="border rounded-lg p-2">
                        <Download size={16}/>
                      </button>

                      <button className="border rounded-lg p-2">
                        <Printer size={16}/>
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

    </div>
  );
}