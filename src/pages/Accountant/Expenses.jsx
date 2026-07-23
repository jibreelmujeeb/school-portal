import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  Wallet,
  Calendar,
  FileText,
} from "lucide-react";

const expenses = [
  {
    id: "EXP001",
    title: "Laboratory Equipment",
    category: "Laboratory",
    department: "Science",
    vendor: "ABC Scientific Ltd",
    amount: "₦450,000",
    paymentMethod: "Bank Transfer",
    date: "2026-07-20",
    status: "Paid",
  },
  {
    id: "EXP002",
    title: "Office Supplies",
    category: "Office",
    department: "Administration",
    vendor: "Stationery World",
    amount: "₦65,000",
    paymentMethod: "Cash",
    date: "2026-07-21",
    status: "Pending",
  },
];

export default function AccountantExpensesPage() {
  const [search, setSearch] = useState("");

  const filtered = expenses.filter(
    (expense) =>
      expense.title.toLowerCase().includes(search.toLowerCase()) ||
      expense.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold">
            Expenses
          </h1>

          <p className="text-gray-500 mt-2">
            Manage school operational expenses and payments.
          </p>

        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18}/>
          Add Expense
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Wallet className="text-red-600 mb-3"/>
          <h2 className="text-2xl font-bold">₦24,500,000</h2>
          <p>Total Expenses</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Calendar className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">₦560,000</h2>
          <p>Today's Expenses</p>
        </div>

        <div className="border rounded-3xl p-5">
          <FileText className="text-yellow-600 mb-3"/>
          <h2 className="text-2xl font-bold">18</h2>
          <p>Pending Approval</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Wallet className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">1,265</h2>
          <p>Expense Records</p>
        </div>

      </div>

      {/* Search */}

      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex-1 flex items-center border rounded-xl px-4 py-3">

          <Search className="mr-3"/>

          <input
            placeholder="Search expenses..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="outline-none w-full"
          />

        </div>

        <button className="border rounded-xl px-5 flex items-center gap-2">
          <Filter size={18}/>
          Filter
        </button>

        <button className="border rounded-xl px-5 flex items-center gap-2">
          <Download size={18}/>
          Export
        </button>

      </div>

      {/* Expense Table */}

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[1300px]">

          <thead className="bg-gray-50">

            <tr>
              <th>ID</th>
              <th>Expense</th>
              <th>Category</th>
              <th>Department</th>
              <th>Vendor</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filtered.map((expense)=>(

              <tr key={expense.id} className="border-t">

                <td>{expense.id}</td>
                <td>{expense.title}</td>
                <td>{expense.category}</td>
                <td>{expense.department}</td>
                <td>{expense.vendor}</td>
                <td>{expense.amount}</td>
                <td>{expense.paymentMethod}</td>
                <td>{expense.date}</td>

                <td>
                  <span className={`px-3 py-1 rounded-full ${
                    expense.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {expense.status}
                  </span>
                </td>

                <td>

                  <div className="flex gap-2">

                    <button className="border rounded-lg p-2">
                      <Eye size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Edit size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Trash2 size={16}/>
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