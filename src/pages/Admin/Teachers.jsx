import React, { useState } from "react";
import {
  GraduationCap,
  Search,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

const teachersData = [
  {
    name: "Mr. Ade",
    email: "ade@example.com",
    subject: "Mathematics",
    class: "SS2",
    status: "Active",
  },
  {
    name: "Mrs. Bello",
    email: "bello@example.com",
    subject: "English",
    class: "JSS3",
    status: "Active",
  },
  {
    name: "Mr. James",
    email: "james@example.com",
    subject: "Physics",
    class: "SS1",
    status: "Inactive",
  },
];

const AdminTeachers = () => {
  const [search, setSearch] = useState("");

  const filteredTeachers = teachersData.filter((teacher) =>
    teacher.name.toLowerCase().includes(search.toLowerCase())
  );

  const statusStyle = (status) =>
    status === "Active"
      ? "text-green-600"
      : "text-red-600";

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Teachers
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage all teachers in the system
          </p>
        </div>

        {/* ADD BUTTON */}
        <button className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Plus className="w-4 h-4" />
          Add Teacher
        </button>
      </section>

      {/* SEARCH */}
      <section className="max-w-md">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-600 transition">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search teachers..."
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
          <span>Name</span>
          <span>Email</span>
          <span>Subject</span>
          <span>Class</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* BODY */}
        {filteredTeachers.map((teacher, idx) => (
          <div
            key={idx}
            className="grid md:grid-cols-6 gap-2 p-4 border-b border-gray-100 text-sm items-center"
          >
            {/* NAME */}
            <div className="flex items-center gap-2 font-medium">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              {teacher.name}
            </div>

            {/* EMAIL */}
            <span>{teacher.email}</span>

            {/* SUBJECT */}
            <span>{teacher.subject}</span>

            {/* CLASS */}
            <span>{teacher.class}</span>

            {/* STATUS */}
            <span className={statusStyle(teacher.status)}>
              {teacher.status}
            </span>

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
      {filteredTeachers.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No teachers found.
        </div>
      )}

    </div>
  );
};

export default AdminTeachers;