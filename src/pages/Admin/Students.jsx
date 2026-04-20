import React, { useState } from "react";
import {
  User,
  Search,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

const studentsData = [
  {
    name: "John Doe",
    email: "john@example.com",
    class: "SS2",
    status: "Active",
  },
  {
    name: "Aisha Bello",
    email: "aisha@example.com",
    class: "JSS3",
    status: "Active",
  },
  {
    name: "Michael James",
    email: "michael@example.com",
    class: "SS1",
    status: "Inactive",
  },
];

const AdminStudents = () => {
  const [search, setSearch] = useState("");

  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
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
            Students
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage all students in the system
          </p>
        </div>

        {/* ADD BUTTON */}
        <button className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Plus className="w-4 h-4" />
          Add Student
        </button>
      </section>

      {/* SEARCH */}
      <section className="max-w-md">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-600 transition">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>
      </section>

      {/* TABLE */}
      <section className="border border-gray-200 rounded-2xl bg-white overflow-hidden">

        {/* TABLE HEADER */}
        <div className="hidden md:grid grid-cols-5 text-sm text-gray-500 border-b border-gray-200 p-4">
          <span>Name</span>
          <span>Email</span>
          <span>Class</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* TABLE BODY */}
        {filteredStudents.map((student, idx) => (
          <div
            key={idx}
            className="grid md:grid-cols-5 gap-2 p-4 border-b border-gray-100 text-sm items-center"
          >
            {/* NAME */}
            <div className="flex items-center gap-2 font-medium">
              <User className="w-4 h-4 text-blue-600" />
              {student.name}
            </div>

            {/* EMAIL */}
            <span>{student.email}</span>

            {/* CLASS */}
            <span>{student.class}</span>

            {/* STATUS */}
            <span className={statusStyle(student.status)}>
              {student.status}
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
      {filteredStudents.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No students found.
        </div>
      )}

    </div>
  );
};

export default AdminStudents;