import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookOpen, Search, Plus, Pencil, Trash2, X } from "lucide-react";
import {
  addSubject,
  deleteSubject,
  updateSubject,
} from "../../store/subjectsSlice";

const AdminSubjects = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjects.items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubjectCode, setEditingSubjectCode] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    teacher: "",
  });

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(search.toLowerCase()) ||
      subject.code.toLowerCase().includes(search.toLowerCase()) ||
      subject.teacher.toLowerCase().includes(search.toLowerCase()),
  );

  const openAddModal = () => {
    setEditingSubjectCode(null);
    setFormData({
      name: "",
      code: "",
      teacher: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (subject) => {
    setEditingSubjectCode(subject.code);
    setFormData({
      name: subject.name,
      code: subject.code,
      teacher: subject.teacher,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSubjectCode(null);
    setFormData({
      name: "",
      code: "",
      teacher: "",
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

    const subjectPayload = {
      name: formData.name,
      code: formData.code,
      teacher: formData.teacher,
    };

    if (editingSubjectCode) {
      dispatch(
        updateSubject({
          originalCode: editingSubjectCode,
          subject: subjectPayload,
        }),
      );
    } else {
      dispatch(addSubject(subjectPayload));
    }

    closeModal();
  };

  const handleDelete = (subjectCode) => {
    dispatch(deleteSubject(subjectCode));
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">Subjects</h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage subjects and assignments
          </p>
        </div>

        {/* ADD BUTTON */}
        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
        >
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
        <div className="hidden md:grid grid-cols-4 text-sm text-gray-500 border-b border-gray-200 p-4">
          <span>Subject</span>
          <span>Code</span>
          <span>Teacher</span>
          <span>Actions</span>
        </div>

        {/* BODY */}
        {filteredSubjects.map((sub) => (
          <div
            key={sub.code}
            className="grid md:grid-cols-4 gap-2 p-4 border-b border-gray-100 text-sm items-center"
          >
            {/* NAME */}
            <div className="flex items-center gap-2 font-medium">
              <BookOpen className="w-4 h-4 text-blue-600" />
              {sub.name}
            </div>

            {/* CODE */}
            <span>{sub.code}</span>

            {/* TEACHER */}
            <span>{sub.teacher}</span>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => openEditModal(sub)}
                className="text-gray-600 hover:text-blue-600"
              >
                <Pencil className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleDelete(sub.code)}
                className="text-gray-600 hover:text-red-600"
              >
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

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {editingSubjectCode ? "Edit Subject" : "Add Subject"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {editingSubjectCode
                    ? "Update the subject details below."
                    : "Fill in the subject details below."}
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
                <label className="text-sm font-medium text-gray-700">
                  Subject Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Mathematics"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="MTH101"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Teacher
                  </label>
                  <input
                    type="text"
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleChange}
                    placeholder="Mr. Ade"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                    required
                  />
                </div>
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
                  {editingSubjectCode ? "Update Subject" : "Save Subject"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubjects;
