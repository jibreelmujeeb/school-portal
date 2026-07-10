import React, { useState } from "react";
import {
  Wallet,
  Search,
  Filter,
  Eye,
  Download,
  Printer,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
} from "lucide-react";

const payments = [
  {
    id: 1,
    receiptNo: "REC-2026-001",
    child: "John Doe",
    feeType: "School Fees",
    amount: 120000,
    date: "2026-01-15",
    method: "Bank Transfer",
    status: "Paid",
  },
  {
    id: 2,
    receiptNo: "REC-2026-015",
    child: "Mary Doe",
    feeType: "Examination Fee",
    amount: 15000,
    date: "2026-02-20",
    method: "Card Payment",
    status: "Paid",
  },
  {
    id: 3,
    receiptNo: "REC-2026-028",
    child: "John Doe",
    feeType: "Transport Fee",
    amount: 25000,
    date: "2026-03-12",
    method: "Cash",
    status: "Pending",
  },
];

export default function ParentPaymentHistoryPage() {
  const [search, setSearch] = useState("");

  const filteredPayments = payments.filter(
    (payment) =>
      payment.receiptNo.toLowerCase().includes(search.toLowerCase()) ||
      payment.child.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Payment History
          </h1>

          <p className="text-gray-500 mt-2">
            View all payments made for your child(ren).
          </p>
        </div>

        <button className="bg-blue-600 text-white rounded-xl px-5 py-3 flex items-center gap-2">
          <Download size={18}/>
          Export
        </button>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Wallet className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">₦160,000</h2>
          <p>Total Paid</p>
        </div>

        <div className="border rounded-3xl p-5">
          <CheckCircle className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">12</h2>
          <p>Successful Payments</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Clock className="text-yellow-600 mb-3"/>
          <h2 className="text-2xl font-bold">1</h2>
          <p>Pending</p>
        </div>

        <div className="border rounded-3xl p-5">
          <AlertCircle className="text-red-600 mb-3"/>
          <h2 className="text-2xl font-bold">₦25,000</h2>
          <p>Outstanding</p>
        </div>

      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex items-center flex-1 border rounded-xl px-4 py-3">
          <Search className="mr-3 text-gray-500"/>
          <input
            type="text"
            placeholder="Search receipt number or child..."
            className="outline-none w-full"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>

        <button className="border rounded-xl px-5 flex items-center gap-2">
          <Filter size={18}/>
          Filter
        </button>

      </div>

      {/* Payment Table */}
      <div className="border rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead className="bg-gray-50">

              <tr>
                <th className="text-left p-4">Receipt No.</th>
                <th className="text-left p-4">Child</th>
                <th className="text-left p-4">Fee Type</th>
                <th className="text-right p-4">Amount</th>
                <th className="text-left p-4">Payment Date</th>
                <th className="text-left p-4">Method</th>
                <th className="text-center p-4">Status</th>
                <th className="text-center p-4">Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredPayments.map((payment)=>(

                <tr key={payment.id} className="border-t">

                  <td className="p-4 font-medium">
                    {payment.receiptNo}
                  </td>

                  <td className="p-4">
                    {payment.child}
                  </td>

                  <td className="p-4">
                    {payment.feeType}
                  </td>

                  <td className="p-4 text-right font-semibold">
                    ₦{payment.amount.toLocaleString()}
                  </td>

                  <td className="p-4 flex items-center gap-2">
                    <Calendar size={16}/>
                    {payment.date}
                  </td>

                  <td className="p-4">
                    {payment.method}
                  </td>

                  <td className="p-4 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payment.status}
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