import React, { useState } from "react";
import {
  FileText,
  Users,
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
    class: "SS2",
    total: 520,
    average: 86,
    position: "1st",
  },
  {
    name: "Michael James",
    class: "SS2",
    total: 390,
    average: 65,
    position: "5th",
  },
];

const TeacherResults = () => {
  const [selectedClass, setSelectedClass] = useState("SS2");

  const filteredResults = resultsData.filter(
    (r) => r.class === selectedClass
  );

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Results Overview
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          View student academic performance
        </p>
      </section>

      {/* CLASS SELECT */}
      <section className="max-w-sm">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <Users className="w-4 h-4 text-gray-500 mr-2" />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          >
            <option>SS2</option>
            <option>SS1</option>
            <option>JSS3</option>
          </select>
        </div>
      </section>

      {/* TABLE */}
      <section className="border border-gray-200 rounded-2xl bg-white overflow-hidden">

        {/* HEADER */}
        <div className="hidden md:grid grid-cols-5 text-sm text-gray-500 border-b border-gray-200 p-4">
          <span>Student</span>
          <span>Total</span>
          <span>Average</span>
          <span>Position</span>
          <span>Action</span>
        </div>

        {/* BODY */}
        {filteredResults.map((item, idx) => (
          <div
            key={idx}
            className="grid md:grid-cols-5 gap-2 p-4 border-b border-gray-100 text-sm items-center"
          >
            <div className="flex items-center gap-2 font-medium">
              <FileText className="w-4 h-4 text-blue-600" />
              {item.name}
            </div>

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
          No results available.
        </div>
      )}

    </div>
  );
};

export default TeacherResults;