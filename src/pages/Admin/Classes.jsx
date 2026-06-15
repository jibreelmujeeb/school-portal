import React, { useState } from "react";
import {
  School,
  Users,
  GraduationCap,
  Plus,
  ArrowRight,
  X,
} from "lucide-react";

const classesData = [
  {
    name: "JSS1 - A",
    teacher: "Mr. Ade",
    students: 35,
    department: "Junior",
  },
  {
    name: "SS2 - Science",
    teacher: "Mrs. Bello",
    students: 28,
    department: "Science",
  },
  {
    name: "SS3 - Arts",
    teacher: "Mr. James",
    students: 22,
    department: "Arts",
  },
];

const AdminClasses = () => {
  const [classes, setClasses] = useState(classesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    teacher: "",
    students: "",
    department: "",
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      teacher: "",
      students: "",
      department: "",
    });
  };

  const openClassDetails = (cls) => {
    setSelectedClass(cls);
  };

  const closeClassDetails = () => {
    setSelectedClass(null);
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

    setClasses((currentClasses) => [
      {
        name: formData.name,
        teacher: formData.teacher,
        students: Number(formData.students),
        department: formData.department,
      },
      ...currentClasses,
    ]);

    closeModal();
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">Classes</h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage school classes and structure
          </p>
        </div>

        {/* ADD BUTTON */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
        >
          <Plus className="w-4 h-4" />
          Add Class
        </button>
      </section>

      {/* CLASSES GRID */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-2xl p-5 bg-white flex flex-col justify-between"
          >
            {/* TOP */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium">{cls.name}</h3>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <GraduationCap className="w-4 h-4" />
                {cls.teacher}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                {cls.students} Students
              </div>

              <p className="text-xs text-gray-500">
                Department: {cls.department}
              </p>
            </div>

            {/* ACTION */}
            <button
              type="button"
              onClick={() => openClassDetails(cls)}
              className="mt-5 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition"
            >
              View Class <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </section>

      {/* EMPTY STATE */}
      {classes.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No classes available.
        </div>
      )}

      {selectedClass && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={closeClassDetails}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-blue-600">
                  <School className="w-5 h-5" />
                  <span className="text-sm font-medium">Class Overview</span>
                </div>
                <h2 className="mt-2 text-2xl font-semibold">
                  {selectedClass.name}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Review the assigned teacher and class structure details.
                </p>
              </div>

              <button
                type="button"
                onClick={closeClassDetails}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close class details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <GraduationCap className="w-4 h-4" />
                  Teacher
                </div>
                <p className="mt-2 text-base font-medium text-gray-900">
                  {selectedClass.teacher}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Users className="w-4 h-4" />
                  Students
                </div>
                <p className="mt-2 text-base font-medium text-gray-900">
                  {selectedClass.students}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <School className="w-4 h-4" />
                  Department
                </div>
                <p className="mt-2 text-base font-medium text-gray-900">
                  {selectedClass.department}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-700">Quick summary</p>
              <p className="mt-2 text-sm text-gray-600">
                {selectedClass.name} is assigned to {selectedClass.teacher} with{" "}
                {selectedClass.students} students currently enrolled under the{" "}
                {selectedClass.department} department.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end">
              <button
                type="button"
                onClick={closeClassDetails}
                className="rounded-full bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
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
                <h2 className="text-xl font-semibold">Add Class</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Fill in the class details below.
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
                  Class Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="SS1 - Science"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Teacher
                  </label>
                  <input
                    type="text"
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleChange}
                    placeholder="Teacher name"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Students
                  </label>
                  <input
                    type="number"
                    name="students"
                    value={formData.students}
                    onChange={handleChange}
                    placeholder="30"
                    min="0"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Science"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                  required
                />
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
                  Save Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClasses;
