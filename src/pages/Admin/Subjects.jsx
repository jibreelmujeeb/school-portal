import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

const subjectsData = [
  {
    name: "Mathematics",
    code: "MTH101",
    class: "SS2",
    teacher: "Mr. Ade",
  },
  {
    name: "English",
    code: "ENG102",
    class: "JSS3",
    teacher: "Mrs. Bello",
  },
  {
    name: "Physics",
    code: "PHY103",
    class: "SS1",
    teacher: "Mr. James",
  },
];

const AdminSubjects = () => {
  const [search, setSearch] = useState("");

  const filteredSubjects = subjectsData.filter((sub) =>
    sub.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Subjects
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage subjects and assignments
          </p>
        </div>

        {/* ADD BUTTON */}
        <button className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Plus className="w-4 h-4" />
          Add Subject
        </button>
      </section>

      {/* SEARCH */}
      <section className="max-w-md">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-600 transition">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search subjects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>
      </section>

      {/* TABLE */}
      <section className="border border-gray-200 rounded-2xl bg-white overflow-hidden">

        {/* HEADER */}
        <div className="hidden md:grid grid-cols-5 text-sm text-gray-500 border-b border-gray-200 p-4">
          <span>Subject</span>
          <span>Code</span>
          <span>Class</span>
          <span>Teacher</span>
          <span>Actions</span>
        </div>

        {/* BODY */}
        {filteredSubjects.map((sub, idx) => (
          <div
            key={idx}
            className="grid md:grid-cols-5 gap-2 p-4 border-b border-gray-100 text-sm items-center"
          >
            {/* NAME */}
            <div className="flex items-center gap-2 font-medium">
              <BookOpen className="w-4 h-4 text-blue-600" />
              {sub.name}
            </div>

            {/* CODE */}
            <span>{sub.code}</span>

            {/* CLASS */}
            <span>{sub.class}</span>

            {/* TEACHER */}
            <span>{sub.teacher}</span>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              <button className="text-gray-600 hover:text-blue-600">
                <Pencil className="w-4 h-4" />
              </button>

              <button className="text-gray-600 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

      </section>

      {/* EMPTY STATE */}
      {filteredSubjects.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No subjects found.
        </div>
      )}

    </div>
  );
};

export default AdminSubjects;