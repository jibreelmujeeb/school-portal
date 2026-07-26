import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  CreditCard,
  Receipt,
  Bell,
  Download,
  AlertCircle,
  Users,
} from "lucide-react";

const debtors = [
  {
    id: "STD001",
    name: "John David",
    class: "SS2A",
    totalFees: "₦180,000",
    paid: "₦120,000",
    balance: "₦60,000",
    dueDate: "2026-09-15",
    status: "Partial",
  },
  {
    id: "STD002",
    name: "Mary Johnson",
    class: "JSS3B",
    totalFees: "₦150,000",
    paid: "₦0",
    balance: "₦150,000",
    dueDate: "2026-08-30",
    status: "Overdue",
  },
];

export default function StudentDebtorsPage() {
  const [search, setSearch] = useState("");

  const filtered = debtors.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">Student Debtors</h1>
          <p className="text-gray-500 mt-2">
            Track outstanding student fees and manage debt recovery.
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
          <Users className="text-blue-600 mb-3" />
          <h2 className="text-2xl font-bold">236</h2>
          <p>Total Debtors</p>
        </div>

        <div className="border rounded-3xl p-5">
          <CreditCard className="text-red-600 mb-3" />
          <h2 className="text-2xl font-bold">₦12,450,000</h2>
          <p>Total Outstanding</p>
        </div>

        <div className="border rounded-3xl p-5">
          <AlertCircle className="text-orange-600 mb-3" />
          <h2 className="text-2xl font-bold">78</h2>
          <p>Overdue</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Receipt className="text-green-600 mb-3" />
          <h2 className="text-2xl font-bold">₦850,000</h2>
          <p>Collected Today</p>
        </div>

      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex-1 flex items-center border rounded-xl px-4 py-3">
          <Search className="mr-3" />
          <input
            className="outline-none w-full"
            placeholder="Search by student name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="border rounded-xl px-5 flex items-center gap-2">
          <Filter size={18} />
          Filter
        </button>

      </div>

      {/* Debtors Table */}
      <div className="border rounded-3xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[1300px]">

          <thead className="bg-gray-50">
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th>Total Fees</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((student) => (

              <tr key={student.id} className="border-t">

                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.totalFees}</td>
                <td>{student.paid}</td>
                <td>{student.balance}</td>
                <td>{student.dueDate}</td>

                <td>
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                    {student.status}
                  </span>
                </td>

                <td>

                  <div className="flex gap-2">

                    <button className="border rounded-lg p-2">
                      <Eye size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <CreditCard size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Bell size={16}/>
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