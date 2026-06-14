import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GraduationCap, Search, Plus, Pencil, Trash2, X } from "lucide-react";
import {
  addTeacher,
  deleteTeacher,
  updateTeacher,
} from "../../store/teachersSlice";

const AdminTeachers = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    class: "",
    status: "Active",
  });

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(search.toLowerCase()),
  );

  const statusStyle = (status) =>
    status === "Active" ? "text-green-600" : "text-red-600";

  const openAddModal = () => {
    setEditingTeacherId(null);
    setFormData({
      id: "",
      name: "",
      email: "",
      class: "",
      status: "Active",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (teacher) => {
    setEditingTeacherId(teacher.id);
    setFormData({
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      class: teacher.class,
      status: teacher.status,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTeacherId(null);
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

    const teacherPayload = {
      id: formData.id || `TCH-${String(teachers.length + 1).padStart(3, "0")}`,
      name: formData.name,
      email: formData.email,
      class: formData.class,
      status: formData.status,
    };

    if (editingTeacherId) {
      dispatch(
        updateTeacher({
          originalId: editingTeacherId,
          teacher: teacherPayload,
        }),
      );
    } else {
      dispatch(addTeacher(teacherPayload));
    }

    closeModal();
  };

  const handleDelete = (teacherId) => {
    dispatch(deleteTeacher(teacherId));
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">Teachers</h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage all teachers in the system
          </p>
        </div>

        {/* ADD BUTTON */}
        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
        >
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
          <span>ID</span>
          <span>Email</span>
          <span>Class</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* BODY */}
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="grid md:grid-cols-6 gap-2 p-4 border-b border-gray-100 text-sm items-center"
          >
            {/* NAME */}
            <div className="flex items-center gap-2 font-medium">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              {teacher.name}
            </div>

            {/* ID */}
            <span className="font-medium text-gray-700">{teacher.id}</span>

            {/* EMAIL */}
            <span>{teacher.email}</span>

            {/* CLASS */}
            <span>{teacher.class}</span>

            {/* STATUS */}
            <span className={statusStyle(teacher.status)}>
              {teacher.status}
            </span>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => openEditModal(teacher)}
                className="text-gray-600 hover:text-blue-600"
              >
                <Pencil className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleDelete(teacher.id)}
                className="text-gray-600 hover:text-red-600"
              >
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
                <h2 className="text-xl font-semibold">
                  {editingTeacherId ? "Edit Teacher" : "Add Teacher"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {editingTeacherId
                    ? "Update the teacher details below."
                    : "Fill in the teacher details below."}
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
                  placeholder="TCH-004"
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
                  placeholder="Teacher name"
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
                    placeholder="teacher@example.com"
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
                  {editingTeacherId ? "Update Teacher" : "Save Teacher"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeachers;
