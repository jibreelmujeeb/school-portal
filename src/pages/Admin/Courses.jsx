import React, { useMemo, useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  User,
  GraduationCap,
  CalendarDays,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

const initialCourses = [
  {
    id: 1,
    name: "Mathematics",
    teacher: "Mr. Johnson",
    class: "SS2",
    schedule: "Mon & Wed",
  },
  {
    id: 2,
    name: "Physics",
    teacher: "Mrs. Grace",
    class: "SS3",
    schedule: "Tue & Thu",
  },
  {
    id: 3,
    name: "English Language",
    teacher: "Mr. Daniel",
    class: "JSS3",
    schedule: "Mon & Fri",
  },
];

const emptyForm = { name: "", teacher: "", class: "", schedule: "" };

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return courses.filter((course) =>
      [course.name, course.teacher, course.class, course.schedule]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [courses, search]);

  const openAddModal = () => {
    setEditingCourseId(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (course) => {
    setEditingCourseId(course.id);
    setFormData({
      name: course.name,
      teacher: course.teacher,
      class: course.class,
      schedule: course.schedule,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourseId(null);
    setFormData(emptyForm);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const course = {
      ...formData,
      name: formData.name.trim(),
      teacher: formData.teacher.trim(),
      class: formData.class.trim(),
      schedule: formData.schedule.trim(),
    };

    if (editingCourseId !== null) {
      setCourses((current) =>
        current.map((item) =>
          item.id === editingCourseId ? { ...item, ...course } : item,
        ),
      );
    } else {
      const nextId = Math.max(0, ...courses.map((item) => item.id)) + 1;
      setCourses((current) => [{ id: nextId, ...course }, ...current]);
    }

    closeModal();
  };

  const handleDelete = (course) => {
    if (window.confirm(`Delete the ${course.name} course?`)) {
      setCourses((current) => current.filter((item) => item.id !== course.id));
    }
  };

  return (
    <div className="space-y-10">
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Courses Management
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage school subjects and assigned teachers
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-5 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </button>
      </section>

      <section>
        <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 bg-white">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search course..."
            aria-label="Search courses"
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>
      </section>

      <section className="space-y-5">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-200 rounded-2xl p-5 bg-white"
          >
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{course.name}</h2>
                    <p className="text-sm text-gray-500">Course Subject</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-green-600" />
                    {course.teacher}
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                    {course.class}
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-orange-600" />
                    {course.schedule}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => openEditModal(course)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(course)}
                  className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-full text-sm hover:bg-red-50 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {filteredCourses.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          {courses.length === 0
            ? "No courses available."
            : "No courses match your search."}
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-form-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 id="course-form-title" className="text-xl font-semibold">
                  {editingCourseId !== null ? "Edit Course" : "Add Course"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Course changes are held in this page until it is refreshed.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              {[
                ["name", "Course name", "Mathematics"],
                ["teacher", "Teacher", "Mr. Johnson"],
                ["class", "Class", "SS2"],
                ["schedule", "Schedule", "Mon & Wed"],
              ].map(([name, label, placeholder]) => (
                <label key={name} className="grid gap-2 text-sm font-medium">
                  {label}
                  <input
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                    required
                  />
                </label>
              ))}

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
                  {editingCourseId !== null ? "Update Course" : "Save Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCoursesPage;
