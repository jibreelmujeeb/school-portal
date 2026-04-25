import React, { useState } from "react";
import {
  BarChart3,
  Search,
  Pencil,
  Plus,
} from "lucide-react";

const gradesData = [
  {
    student: "John Doe",
    class: "SS2",
    subject: "Mathematics",
    score: 75,
    grade: "B",
  },
  {
    student: "Aisha Bello",
    class: "JSS3",
    subject: "English",
    score: 88,
    grade: "A",
  },
  {
    student: "Michael James",
    class: "SS1",
    subject: "Physics",
    score: 60,
    grade: "C",
  },
];

const AdminGrades = () => {
  const [search, setSearch] = useState("");

  const filteredGrades = gradesData.filter((item) =>
    item.student.toLowerCase().includes(search.toLowerCase())
  );

  const gradeColor = (grade) => {
    if (grade === "A") return "text-green-600";
    if (grade === "B") return "text-blue-600";
    if (grade === "C") return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Grades Management
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage student academic performance
          </p>
        </div>

        {/* ADD BUTTON */}
        <button className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Plus className="w-4 h-4" />
          Add Grade
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
          <span>Subject</span>
          <span>Score</span>
          <span>Grade</span>
          <span>Action</span>
        </div>

        {/* BODY */}
        {filteredGrades.map((item, idx) => (
          <div
            key={idx}
            className="grid md:grid-cols-6 gap-2 p-4 border-b border-gray-100 text-sm items-center"
          >
            <span className="font-medium">{item.student}</span>
            <span>{item.class}</span>
            <span>{item.subject}</span>
            <span>{item.score}%</span>

            <span className={gradeColor(item.grade)}>
              {item.grade}
            </span>

            <button className="text-gray-600 hover:text-blue-600">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        ))}

      </section>

      {/* EMPTY STATE */}
      {filteredGrades.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No records found.
        </div>
      )}

    </div>
  );
};

export default AdminGrades;