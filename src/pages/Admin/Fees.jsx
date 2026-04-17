import React, { useState } from "react";
import {
  CreditCard,
  CheckCircle,
  Clock,
  Search,
  ArrowRight,
} from "lucide-react";

const paymentsData = [
  {
    student: "John Doe",
    class: "SS2",
    amount: "₦50,000",
    date: "2026-04-01",
    status: "Paid",
  },
  {
    student: "Aisha Bello",
    class: "JSS3",
    amount: "₦30,000",
    date: "2026-04-03",
    status: "Pending",
  },
  {
    student: "Michael James",
    class: "SS1",
    amount: "₦40,000",
    date: "2026-04-05",
    status: "Paid",
  },
];

const AdminFees = () => {
  const [search, setSearch] = useState("");

  const filteredPayments = paymentsData.filter((item) =>
    item.student.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status) => {
    return status === "Paid"
      ? "text-green-600"
      : "text-orange-600";
  };

  const getStatusIcon = (status) => {
    return status === "Paid" ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <Clock className="w-4 h-4 text-orange-600" />
    );
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Fees Management
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Track and manage all student payments
        </p>
      </section>

      {/* SUMMARY */}
      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        
        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h2 className="text-lg font-semibold">₦2,400,000</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Paid</p>
            <h2 className="text-lg font-semibold">₦1,800,000</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <Clock className="w-5 h-5 text-orange-600" />
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-lg font-semibold">₦600,000</h2>
          </div>
        </div>

      </section>

      {/* SEARCH */}
      <section className="max-w-md">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-600 transition">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>
      </section>

      {/* TABLE */}
      <section className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
        
        {/* HEADER */}
        <div className="hidden md:grid grid-cols-5 text-sm text-gray-500 border-b border-gray-200 p-4">
          <span>Student</span>
          <span>Class</span>
          <span>Amount</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        {/* BODY */}
        {filteredPayments.map((item, idx) => (
          <div
            key={idx}
            className="grid md:grid-cols-5 gap-2 p-4 border-b border-gray-100 text-sm items-center"
          >
            <span className="font-medium">{item.student}</span>
            <span>{item.class}</span>
            <span>{item.amount}</span>
            <span>{item.date}</span>

            <div className={`flex items-center gap-2 ${getStatusStyle(item.status)}`}>
              {getStatusIcon(item.status)}
              {item.status}
            </div>
          </div>
        ))}

      </section>

      {/* ACTION */}
      <section className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          Manage Fees <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
};

export default AdminFees;