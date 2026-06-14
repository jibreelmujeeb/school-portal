import React, { useState } from "react";
import { User, Search, Plus, Pencil, Trash2, X } from "lucide-react";

const studentsData = [
  {
    name: "John Doe",
    id: "STD-001",
    email: "john@example.com",
    class: "SS2",
    status: "Active",
  },
  {
    name: "Aisha Bello",
    id: "STD-002",
    email: "aisha@example.com",
    class: "JSS3",
    status: "Active",
  },
  {
    name: "Michael James",
    id: "STD-003",
    email: "michael@example.com",
    class: "SS1",
    status: "Inactive",
  },
];

const AdminStudents = () => {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState(studentsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    class: "",
    status: "Active",
  });

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()),
  );

  const statusStyle = (status) =>
    status === "Active" ? "text-green-600" : "text-red-600";

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      id: "",
      name: "",
      email: "",
      class: "",
      status: "Active",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setStudents((currentStudents) => [
      {
        id:
          formData.id ||
          `STD-${String(currentStudents.length + 1).padStart(3, "0")}`,
        name: formData.name,
        email: formData.email,
        class: formData.class,
        status: formData.status,
      },
      ...currentStudents,
    ]);

    closeModal();
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">Students</h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage all students in the system
          </p>
        </div>

        {/* ADD BUTTON */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
        >
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
        <div className="hidden md:grid grid-cols-6 text-sm text-gray-500 border-b border-gray-200 p-4">
          <span>Name</span>
          <span>ID</span>
          <span>Email</span>
          <span>Class</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* TABLE BODY */}
        {filteredStudents.map((student, idx) => (
          <div
            key={idx}
            className="grid md:grid-cols-6 gap-2 p-4 border-b border-gray-100 text-sm items-center"
          >
            {/* NAME */}
            <div className="flex items-center gap-2 font-medium">
              <User className="w-4 h-4 text-blue-600" />
              {student.name}
            </div>

            {/* ID */}
            <span className="font-medium text-gray-700">{student.id}</span>

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

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Add Student</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Fill in the student details below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">ID</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="STD-004"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Student name"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@example.com"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Class
                  </label>
                  <input
                    type="text"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    placeholder="SS2"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="mt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-gray-300 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-full bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
