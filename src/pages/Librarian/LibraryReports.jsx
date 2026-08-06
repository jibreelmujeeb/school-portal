import {
  FileBarChart,
  Download,
  Printer,
  Mail,
  Calendar,
  Search,
  FileSpreadsheet,
  PieChart,
} from "lucide-react";

export default function LibraryReportsPage() {
  return (
    <div className="space-y-6">

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Library Reports
          </h1>
          <p className="text-gray-500">
            Generate reports and analyze library activities.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <FileBarChart size={18}/>
          Generate Report
        </button>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-2xl p-5">
          <FileBarChart className="text-blue-600 mb-2"/>
          <h2 className="text-2xl font-bold">326</h2>
          <p>Total Reports</p>
        </div>

        <div className="border rounded-2xl p-5">
          <PieChart className="text-green-600 mb-2"/>
          <h2 className="text-2xl font-bold">128</h2>
          <p>Borrowing Reports</p>
        </div>

        <div className="border rounded-2xl p-5">
          <FileSpreadsheet className="text-yellow-600 mb-2"/>
          <h2 className="text-2xl font-bold">₦425,000</h2>
          <p>Fine Revenue</p>
        </div>

        <div className="border rounded-2xl p-5">
          <Calendar className="text-red-600 mb-2"/>
          <h2 className="text-2xl font-bold">24</h2>
          <p>Scheduled Reports</p>
        </div>

      </div>

      {/* Search */}

      <div className="flex items-center border rounded-xl px-4 py-3">
        
        <Search className="mr-2"/>
        <input
          className="w-full outline-none"
          placeholder="Search reports..."
        />
      </div>

    </div>
  );
}