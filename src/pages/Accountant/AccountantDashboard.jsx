import React from "react";
import { Link } from "react-router-dom";
import {
  DollarSign,
  Wallet,
  TrendingUp,
  CreditCard,
  Users,
  Receipt,
  FileText,
  Bell,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import { formatNaira, initialExpenses, initialPayments } from "../../data/accountantData";

export default function AccountantDashboard() {
  const [payments, , paymentError] = usePersistentState(
    "accountant-payments",
    initialPayments
  );
  const [expenses, , expenseError] = usePersistentState(
    "accountant-expenses",
    initialExpenses
  );
  const totalRevenue = payments
    .filter((payment) => payment.status === "Verified")
    .reduce((sum, payment) => sum + payment.amount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Accountant Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back. Here's today's financial overview.
          </p>

        </div>

        <Link to="/accountant/fees-collection" className="bg-blue-600 text-white rounded-xl px-5 py-3 flex gap-2">

          <Plus size={18}/>

          Record Payment

        </Link>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">

          <DollarSign className="text-green-600 mb-3"/>

          <h2 className="text-2xl font-bold">{formatNaira(totalRevenue)}</h2>

          <p>Total Revenue</p>

        </div>

        <div className="border rounded-3xl p-5">

          <Wallet className="text-red-600 mb-3"/>

          <h2 className="text-2xl font-bold">{formatNaira(totalExpenses)}</h2>

          <p>Total Expenses</p>

        </div>

        <div className="border rounded-3xl p-5">

          <TrendingUp className="text-blue-600 mb-3"/>

          <h2 className="text-2xl font-bold">{formatNaira(totalRevenue - totalExpenses)}</h2>

          <p>Net Income</p>

        </div>

        <div className="border rounded-3xl p-5">

          <CreditCard className="text-orange-600 mb-3"/>

          <h2 className="text-2xl font-bold">₦7,200,000</h2>

          <p>Outstanding Fees</p>

        </div>

      </div>

      {(paymentError || expenseError) && (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {paymentError || expenseError}
        </p>
      )}

      {/* Tables */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="border rounded-3xl p-6">

          <h2 className="font-bold text-xl mb-4">
            Recent Payments
          </h2>

          <div className="space-y-4">

            {payments.slice(0, 3).map((payment) => (
              <div key={payment.id} className="flex justify-between gap-4">
                <div>
                  <h3>{payment.student}</h3>
                  <p className="text-gray-500">{payment.feeType} · {payment.status}</p>
                </div>
                <div className="font-semibold">{formatNaira(payment.amount)}</div>
              </div>
            ))}
            {payments.length === 0 && <p className="text-sm text-gray-500">No payments recorded.</p>}

          </div>

        </div>

        <div className="border rounded-3xl p-6">

          <h2 className="font-bold text-xl mb-4">
            Recent Expenses
          </h2>

          <div className="space-y-4">

            {expenses.slice(0, 3).map((expense) => (
              <div key={expense.id} className="flex justify-between gap-4">
                <div>
                  <h3>{expense.title}</h3>
                  <p className="text-gray-500">{expense.department}</p>
                </div>
                <div className="font-semibold">{formatNaira(expense.amount)}</div>
              </div>
            ))}
            {expenses.length === 0 && <p className="text-sm text-gray-500">No expenses recorded.</p>}

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <Link to="/accountant/receipts-management" className="border rounded-2xl p-6">

          <Receipt className="mx-auto mb-3"/>

          Generate Receipt

        </Link>

        <Link to="/accountant/financial-report" className="border rounded-2xl p-6">

          <FileText className="mx-auto mb-3"/>

          Financial Reports

        </Link>

        <Link to="/accountant/payroll" className="border rounded-2xl p-6">

          <ArrowUpRight className="mx-auto mb-3"/>

          Payroll

        </Link>

        <Link to="/accountant/notifications" className="border rounded-2xl p-6">

          <Bell className="mx-auto mb-3"/>

          Notifications

        </Link>

      </div>

    </div>

  );

}