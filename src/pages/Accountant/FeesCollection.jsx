import React, { useState } from "react";
import {
  Search,
  CreditCard,
  Wallet,
  Receipt,
  DollarSign,
  CheckCircle,
  User,
} from "lucide-react";

export default function FeesCollectionPage() {

  const [student, setStudent] = useState("");

  return (

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Fees Collection
        </h1>

        <p className="text-gray-500">
          Collect student fees and generate receipts.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">

          <DollarSign className="text-green-600 mb-3"/>

          <h2 className="text-2xl font-bold">
            ₦3,450,000
          </h2>

          <p>Today's Collection</p>

        </div>

        <div className="border rounded-3xl p-5">

          <User className="text-blue-600 mb-3"/>

          <h2 className="text-2xl font-bold">
            72
          </h2>

          <p>Students Paid</p>

        </div>

        <div className="border rounded-3xl p-5">

          <Wallet className="text-orange-600 mb-3"/>

          <h2 className="text-2xl font-bold">
            ₦6,800,000
          </h2>

          <p>Outstanding</p>

        </div>

        <div className="border rounded-3xl p-5">

          <Receipt className="text-purple-600 mb-3"/>

          <h2 className="text-2xl font-bold">
            89
          </h2>

          <p>Transactions</p>

        </div>

      </div>

      {/* Search */}

      <div className="border rounded-3xl p-6">

        <div className="flex items-center border rounded-xl px-4 py-3">

          <Search className="mr-3"/>

          <input
            value={student}
            onChange={(e)=>setStudent(e.target.value)}
            placeholder="Search by Student Name, Admission No or Student ID"
            className="outline-none w-full"
          />

        </div>

      </div>

      {/* Collection Form */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="border rounded-3xl p-6 space-y-4">

          <h2 className="font-bold text-xl">
            Student Information
          </h2>

          <p><strong>Name:</strong> John David</p>

          <p><strong>Admission No:</strong> STD2026010</p>

          <p><strong>Class:</strong> SS2A</p>

          <p><strong>Outstanding Balance:</strong> ₦120,000</p>

        </div>

        <div className="border rounded-3xl p-6 space-y-4">

          <h2 className="font-bold text-xl">
            Payment Details
          </h2>

          <select className="border rounded-xl p-3 w-full">
            <option>Tuition Fee</option>
            <option>Hostel Fee</option>
            <option>Library Fee</option>
          </select>

          <input
            type="number"
            placeholder="Amount Paid"
            className="border rounded-xl p-3 w-full"
          />

          <select className="border rounded-xl p-3 w-full">
            <option>Cash</option>
            <option>Bank Transfer</option>
            <option>POS</option>
            <option>Card</option>
          </select>

          <textarea
            placeholder="Remarks"
            className="border rounded-xl p-3 w-full"
          ></textarea>

          <button className="bg-blue-600 text-white rounded-xl py-3 w-full flex justify-center gap-2">

            <CreditCard size={18}/>

            Collect Payment

          </button>

        </div>

      </div>

      {/* Recent Payments */}

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead className="bg-gray-50">

            <tr>

              <th>Receipt</th>
              <th>Student</th>
              <th>Fee Type</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>RC00021</td>

              <td>John David</td>

              <td>Tuition</td>

              <td>₦120,000</td>

              <td>Transfer</td>

              <td>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                  Paid

                </span>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  );

}