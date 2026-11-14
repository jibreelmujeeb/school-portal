import { useMemo, useState } from "react";
import {
  FileBarChart,
  Calendar,
  Search,
  FileSpreadsheet,
  PieChart,
} from "lucide-react";

const initialReports = [
  { id: "REP-101", title: "Monthly Borrowing Summary", type: "Borrowing", date: "08 Aug 2026", status: "Ready" },
  { id: "REP-102", title: "Fine Revenue Overview", type: "Finance", date: "05 Aug 2026", status: "Scheduled" },
  { id: "REP-103", title: "Damaged Inventory Review", type: "Inventory", date: "02 Aug 2026", status: "Ready" },
];

export default function LibraryReportsPage() {
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState("");

  const filteredReports = useMemo(() => {
    return reports.filter((item) => [item.title, item.type, item.id].join(" ").toLowerCase().includes(search.trim().toLowerCase()));
  }, [reports, search]);

  const handleGenerateReport = () => {
    const title = window.prompt("Report title:", "Quarterly Usage Report");
    if (!title || !title.trim()) return;
    const type = window.prompt("Report type:", "Borrowing");
    if (!type || !type.trim()) return;
    setReports((current) => [{
      id: `REP-${Date.now().toString().slice(-3)}`,
      title: title.trim(),
      type: type.trim(),
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Ready",
    }, ...current]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Library Reports</h1>
          <p className="text-gray-500">Generate reports and analyze library activities.</p>
        </div>

        <button onClick={handleGenerateReport} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <FileBarChart size={18} />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<FileBarChart className="text-blue-600" />} value={reports.length.toLocaleString()} label="Total Reports" />
        <StatCard icon={<PieChart className="text-green-600" />} value={reports.filter((item) => item.type === "Borrowing").length.toLocaleString()} label="Borrowing Reports" />
        <StatCard icon={<FileSpreadsheet className="text-yellow-600" />} value="₦425,000" label="Fine Revenue" />
        <StatCard icon={<Calendar className="text-red-600" />} value={reports.filter((item) => item.status === "Scheduled").length.toLocaleString()} label="Scheduled Reports" />
      </div>

      <div className="flex items-center border rounded-xl px-4 py-3">
        <Search className="mr-2" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full outline-none"
          placeholder="Search reports..."
        />
      </div>

      <div className="overflow-hidden rounded-3xl border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Report ID</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">No reports match your search.</td>
                </tr>
              ) : (
                filteredReports.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4 font-medium">{item.id}</td>
                    <td className="p-4">{item.title}</td>
                    <td className="p-4">{item.type}</td>
                    <td className="p-4">{item.date}</td>
                    <td className="p-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.status === "Ready" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>{item.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="border rounded-2xl p-5">
      <div className="mb-2">{icon}</div>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p>{label}</p>
    </div>
  );
}