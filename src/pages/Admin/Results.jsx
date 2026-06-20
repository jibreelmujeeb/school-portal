import React, { useState } from "react";
import { FileText, Search, ArrowDownToLine, Filter } from "lucide-react";

const resultsData = [
  {
    name: "John Doe",
    class: "SS2",
    total: 450,
    average: 75,
    position: "2nd",
  },
  {
    name: "Aisha Bello",
    class: "JSS3",
    total: 520,
    average: 86,
    position: "1st",
  },
  {
    name: "Michael James",
    class: "SS1",
    total: 390,
    average: 65,
    position: "5th",
  },
];

const gradeDetails = {
  "John Doe": [
    { subject: "Mathematics", score: 78, grade: "B" },
    { subject: "English", score: 82, grade: "A" },
    { subject: "Science", score: 70, grade: "B" },
  ],
  "Aisha Bello": [
    { subject: "Mathematics", score: 92, grade: "A" },
    { subject: "English", score: 88, grade: "A" },
    { subject: "Science", score: 78, grade: "B" },
  ],
  "Michael James": [
    { subject: "Mathematics", score: 61, grade: "C" },
    { subject: "English", score: 68, grade: "B" },
    { subject: "Science", score: 66, grade: "B" },
  ],
};

const AdminResults = () => {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const classOptions = [
    "All",
    ...new Set(resultsData.map((item) => item.class)),
  ];

  const filteredResults = resultsData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesClass =
      selectedClass === "All" || item.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const toggleView = (name) => {
    setSelectedStudent((current) => (current === name ? null : name));
  };

  const handleExport = () => {
    const headers = ["Student", "Class", "Total", "Average", "Position"];
    const rows = filteredResults.map((item) => [
      item.name,
      item.class,
      item.total,
      item.average,
      item.position,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `results-${selectedClass.toLowerCase()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">Results</h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage and generate student result sheets
          </p>
        </div>

        {/* EXPORT */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
        >
          <ArrowDownToLine className="w-4 h-4" />
          Export Results
        </button>
      </section>

      {/* FILTERS */}
      <section className="flex flex-col sm:flex-row gap-3">
        <div className="max-w-md w-full">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-600 transition">
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>
        </div>

        <div className="w-full sm:w-44">
          <div className="relative">
            <Filter className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-blue-600" />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full appearance-none border border-gray-300 rounded-lg pl-8 pr-3 py-1.5 text-xs outline-none focus:border-blue-600"
            >
              {classOptions.map((className) => (
                <option key={className} value={className}>
                  {className === "All" ? "Filter" : className}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* TABLE */}
      <section className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
        {/* HEADER */}
        <div className="hidden md:grid grid-cols-6 text-sm text-gray-500 border-b border-gray-200 p-4">
          <span>Student</span>
          <span>Class</span>
          <span>Total</span>
          <span>Average</span>
          <span>Position</span>
          <span>Action</span>
        </div>

        {/* BODY */}
        {filteredResults.map((item, idx) => (
          <div
            key={idx}
            className="grid md:grid-cols-6 gap-2 p-4 border-b border-gray-100 text-sm items-center"
          >
            <div className="flex items-center gap-2 font-medium">
              <FileText className="w-4 h-4 text-blue-600" />
              {item.name}
            </div>

            <span>{item.class}</span>
            <span>{item.total}</span>
            <span>{item.average}%</span>
            <span>{item.position}</span>

            <button
              onClick={() => toggleView(item.name)}
              className="text-blue-600 text-sm hover:underline"
            >
              {selectedStudent === item.name ? "Hide" : "View"}
            </button>
          </div>
        ))}

        {selectedStudent && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">
                Grade Details for {selectedStudent}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="pb-2 pr-4">Subject</th>
                    <th className="pb-2 pr-4">Score</th>
                    <th className="pb-2">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {gradeDetails[selectedStudent]?.map((entry, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="py-2 pr-4">{entry.subject}</td>
                      <td className="py-2 pr-4">{entry.score}%</td>
                      <td className="py-2">{entry.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* EMPTY */}
      {filteredResults.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No results found.
        </div>
      )}
    </div>
  );
};

export default AdminResults;
