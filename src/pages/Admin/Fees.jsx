import React, { useState } from "react";
import {
  CreditCard,
  CheckCircle,
  Clock,
  Search,
  ArrowRight,
  X,
} from "lucide-react";

const initialPayments = [
  {
    id: "TRK-1001",
    paymentType: "School Fees",
    student: "John Doe",
    email: "john.doe@studentportal.com",
    class: "SS2",
    amount: "₦50,000",
    date: "2026-04-01",
    status: "Paid",
  },
  {
    id: "TRK-1002",
    paymentType: "Transportation",
    student: "Aisha Bello",
    email: "aisha.bello@studentportal.com",
    class: "JSS3",
    amount: "₦30,000",
    date: "2026-04-03",
    status: "Pending",
  },
  {
    id: "TRK-1003",
    paymentType: "Lab Fee",
    student: "Michael James",
    email: "michael.james@studentportal.com",
    class: "SS1",
    amount: "₦40,000",
    date: "2026-04-05",
    status: "Paid",
  },
];

const AdminFees = () => {
  const [search, setSearch] = useState("");
  const [payments, setPayments] = useState(initialPayments);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  const filteredPayments = payments.filter((item) =>
    `${item.student} ${item.email} ${item.id} ${item.paymentType}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const parseAmount = (amount) => Number(amount.replace(/[₦,]/g, ""));

  const totalRevenue = payments.reduce(
    (sum, item) => sum + parseAmount(item.amount),
    0,
  );
  const totalPaid = payments
    .filter((item) => item.status === "Paid")
    .reduce((sum, item) => sum + parseAmount(item.amount), 0);
  const totalPending = payments
    .filter((item) => item.status === "Pending")
    .reduce((sum, item) => sum + parseAmount(item.amount), 0);

  const getStatusStyle = (status) =>
    status === "Paid" ? "text-green-600" : "text-orange-600";

  const getStatusIcon = (status) =>
    status === "Paid" ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <Clock className="w-4 h-4 text-orange-600" />
    );

  const togglePaymentStatus = (student, status) => {
    setPayments((currentPayments) =>
      currentPayments.map((payment) =>
        payment.student === student ? { ...payment, status } : payment,
      ),
    );
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">Fees Management</h1>
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
            <h2 className="text-lg font-semibold">
              ₦{totalRevenue.toLocaleString()}
            </h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Paid</p>
            <h2 className="text-lg font-semibold">
              ₦{totalPaid.toLocaleString()}
            </h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <Clock className="w-5 h-5 text-orange-600" />
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-lg font-semibold">
              ₦{totalPending.toLocaleString()}
            </h2>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="max-w-md">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-600 transition">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by student, email, type, or tracker..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>
      </section>

      {/* TABLE */}
      <section className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
        <div className="hidden md:grid grid-cols-7 text-sm text-gray-500 border-b border-gray-200 p-4">
          <span>Student</span>
          <span>Type</span>
          <span>Tracker ID</span>
          <span>Class</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filteredPayments.map((item) => (
          <div
            key={item.id}
            className="grid md:grid-cols-7 gap-2 p-4 border-b border-gray-100 text-sm items-center"
          >
            <div>
              <p className="font-medium">{item.student}</p>
              <p className="text-xs text-gray-500">{item.email}</p>
            </div>
            <span>{item.paymentType}</span>
            <span className="font-medium text-blue-600">{item.id}</span>
            <span>{item.class}</span>
            <span>{item.amount}</span>

            <div
              className={`flex items-center gap-2 ${getStatusStyle(item.status)}`}
            >
              {getStatusIcon(item.status)}
              {item.status}
            </div>

            <button
              type="button"
              onClick={() =>
                togglePaymentStatus(
                  item.student,
                  item.status === "Paid" ? "Pending" : "Paid",
                )
              }
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                item.status === "Paid"
                  ? "bg-orange-50 text-orange-600 hover:bg-orange-100"
                  : "bg-green-50 text-green-600 hover:bg-green-100"
              }`}
            >
              {item.status === "Paid" ? "Mark Pending" : "Mark Paid"}
            </button>
          </div>
        ))}
      </section>

      {filteredPayments.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No payments found.
        </div>
      )}

      {/* ACTION */}
      <section className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsManageModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
        >
          Manage Fees <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {isManageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setIsManageModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Manage Fees</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Update student payment status.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsManageModalOpen(false)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">
                      {payment.id} • {payment.paymentType}
                    </p>
                    <p className="text-xs text-gray-500">
                      {payment.student} • {payment.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      {payment.class} • {payment.amount}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        togglePaymentStatus(payment.student, "Paid")
                      }
                      className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                        payment.status === "Paid"
                          ? "bg-green-600 text-white"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        togglePaymentStatus(payment.student, "Pending")
                      }
                      className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                        payment.status === "Pending"
                          ? "bg-orange-600 text-white"
                          : "bg-orange-50 text-orange-600"
                      }`}
                    >
                      Pending
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFees;