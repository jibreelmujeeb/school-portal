import React from "react";
import {
  FileText,
  Download,
  Calendar,
  Filter,
  DollarSign,
  Wallet,
  TrendingUp,
  Receipt,
} from "lucide-react";

export default function FinancialReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Financial Reports</h1>
          <p className="text-gray-500 mt-2">
            Generate and export school financial reports.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Download size={18} />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="border rounded-3xl p-5">
          <DollarSign className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">₦52.4M</h2>
          <p>Revenue</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Wallet className="text-red-600 mb-3"/>
          <h2 className="text-2xl font-bold">₦18.5M</h2>
          <p>Expenses</p>
        </div>

        <div className="border rounded-3xl p-5">
          <TrendingUp className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">₦33.9M</h2>
          <p>Net Income</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Receipt className="text-orange-600 mb-3"/>
          <h2 className="text-2xl font-bold">₦7.2M</h2>
          <p>Outstanding</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">
          <Calendar className="mr-3"/>
          <input type="date" className="outline-none w-full"/>
        </div>

        <button className="border rounded-xl px-5 flex items-center gap-2">
          <Filter size={18}/>
          Filters
        </button>
      </div>

      <div className="border rounded-3xl p-6">
        <h2 className="font-bold text-xl mb-4">Revenue vs Expenses</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          [Chart Here]
        </div>
      </div>

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50">
            <tr>
              <th>Report</th>
              <th>Period</th>
              <th>Generated</th>
              <th>Format</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td>Monthly Revenue Report</td>
              <td>July 2026</td>
              <td>2026-07-21</td>
              <td>PDF</td>
              <td><Download size={16}/></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}