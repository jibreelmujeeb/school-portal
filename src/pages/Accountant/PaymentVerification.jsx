import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Receipt,
} from "lucide-react";

const payments = [
  {
    id: "PAY001",
    student: "John David",
    admissionNo: "ADM2026001",
    feeType: "Tuition",
    amount: "₦150,000",
    method: "Bank Transfer",
    reference: "TRX847392",
    date: "2026-07-21",
    status: "Pending",
  },
  {
    id: "PAY002",
    student: "Mary Johnson",
    admissionNo: "ADM2026002",
    feeType: "Hostel Fee",
    amount: "₦80,000",
    method: "POS",
    reference: "POS983422",
    date: "2026-07-21",
    status: "Verified",
  },
];

export default function AccountantPaymentVerificationPage() {
  const [search, setSearch] = useState("");

  const filtered = payments.filter(
    (payment) =>
      payment.student.toLowerCase().includes(search.toLowerCase()) ||
      payment.reference.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Payment Verification
          </h1>

          <p className="text-gray-500 mt-2">
            Verify student fee payments before posting them to financial records.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Download size={18}/>
          Export
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Clock className="text-yellow-600 mb-3"/>
          <h2 className="text-2xl font-bold">24</h2>
          <p>Pending</p>
        </div>

        <div className="border rounded-3xl p-5">
          <CheckCircle className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">1,254</h2>
          <p>Verified</p>
        </div>

        <div className="border rounded-3xl p-5">
          <XCircle className="text-red-600 mb-3"/>
          <h2 className="text-2xl font-bold">18</h2>
          <p>Rejected</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Receipt className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">₦2.8M</h2>
          <p>Today's Collections</p>
        </div>

      </div>

      {/* Search */}

      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex-1 flex items-center border rounded-xl px-4 py-3">

          <Search className="mr-3"/>

          <input
            placeholder="Search by student or transaction reference..."
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

      {/* Table */}

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[1300px]">

          <thead className="bg-gray-50">
            <tr>
              <th>Reference</th>
              <th>Student</th>
              <th>Admission No.</th>
              <th>Fee Type</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((payment)=>(

              <tr key={payment.id} className="border-t">

                <td>{payment.reference}</td>
                <td>{payment.student}</td>
                <td>{payment.admissionNo}</td>
                <td>{payment.feeType}</td>
                <td>{payment.amount}</td>
                <td>{payment.method}</td>
                <td>{payment.date}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full ${
                      payment.status === "Verified"
                        ? "bg-green-100 text-green-700"
                        : payment.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {payment.status}
                  </span>

                </td>

                <td>

                  <div className="flex gap-2">

                    <button className="border rounded-lg p-2">
                      <Eye size={16}/>
                    </button>

                    <button className="border rounded-lg p-2 text-green-600">
                      <CheckCircle size={16}/>
                    </button>

                    <button className="border rounded-lg p-2 text-red-600">
                      <XCircle size={16}/>
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