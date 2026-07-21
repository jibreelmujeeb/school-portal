import React from "react";
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

export default function AccountantDashboard() {

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

        <button className="bg-blue-600 text-white rounded-xl px-5 py-3 flex gap-2">

          <Plus size={18}/>

          Record Payment

        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">

          <DollarSign className="text-green-600 mb-3"/>

          <h2 className="text-2xl font-bold">₦52,400,000</h2>

          <p>Total Revenue</p>

        </div>

        <div className="border rounded-3xl p-5">

          <Wallet className="text-red-600 mb-3"/>

          <h2 className="text-2xl font-bold">₦18,500,000</h2>

          <p>Total Expenses</p>

        </div>

        <div className="border rounded-3xl p-5">

          <TrendingUp className="text-blue-600 mb-3"/>

          <h2 className="text-2xl font-bold">₦33,900,000</h2>

          <p>Net Income</p>

        </div>

        <div className="border rounded-3xl p-5">

          <CreditCard className="text-orange-600 mb-3"/>

          <h2 className="text-2xl font-bold">₦7,200,000</h2>

          <p>Outstanding Fees</p>

        </div>

      </div>

      {/* Tables */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="border rounded-3xl p-6">

          <h2 className="font-bold text-xl mb-4">
            Recent Payments
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <div>

                <h3>John David</h3>

                <p className="text-gray-500">
                  Tuition Fee
                </p>

              </div>

              <div className="font-semibold">
                ₦120,000
              </div>

            </div>

            <div className="flex justify-between">

              <div>

                <h3>Mary Peter</h3>

                <p className="text-gray-500">
                  Hostel Fee
                </p>

              </div>

              <div className="font-semibold">
                ₦80,000
              </div>

            </div>

          </div>

        </div>

        <div className="border rounded-3xl p-6">

          <h2 className="font-bold text-xl mb-4">
            Recent Expenses
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <div>

                <h3>Office Supplies</h3>

                <p className="text-gray-500">
                  Administration
                </p>

              </div>

              <div className="font-semibold">
                ₦35,000
              </div>

            </div>

            <div className="flex justify-between">

              <div>

                <h3>Laboratory Equipment</h3>

                <p className="text-gray-500">
                  Science Department
                </p>

              </div>

              <div className="font-semibold">
                ₦220,000
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <button className="border rounded-2xl p-6">

          <Receipt className="mx-auto mb-3"/>

          Generate Receipt

        </button>

        <button className="border rounded-2xl p-6">

          <FileText className="mx-auto mb-3"/>

          Financial Reports

        </button>

        <button className="border rounded-2xl p-6">

          <ArrowUpRight className="mx-auto mb-3"/>

          Payroll

        </button>

        <button className="border rounded-2xl p-6">

          <Bell className="mx-auto mb-3"/>

          Notifications

        </button>

      </div>

    </div>

  );

}