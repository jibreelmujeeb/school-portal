import React, { useState } from "react";
import {
  FileText,
  Search,
  ArrowDownToLine,
} from "lucide-react";

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

const AdminResults = () => {
  const [search, setSearch] = useState("");

  const filteredResults = resultsData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Results
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage and generate student result sheets
          </p>
        </div>

        {/* EXPORT */}
        <button className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <ArrowDownToLine className="w-4 h-4" />
          Export Results
        </button>
      </section>

      {/* SEARCH */}
      <section className="max-w-md">
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

            <button className="text-blue-600 text-sm hover:underline">
              View
            </button>
          </div>
        ))}

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