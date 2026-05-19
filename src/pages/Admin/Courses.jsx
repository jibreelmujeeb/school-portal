import React from "react";
import {
  BookOpen,
  Plus,
  Search,
  User,
  GraduationCap,
  CalendarDays,
  Pencil,
  Trash2,
} from "lucide-react";

const courses = [
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

const AdminCoursesPage = () => {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Courses Management
          </h1>

          <p className="text-sm text-gray-600 mt-2">
            Manage school subjects and assigned teachers
          </p>
        </div>

        {/* ADD COURSE */}
        <button className="flex items-center justify-center gap-2 px-5 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Plus className="w-4 h-4" />
          Add Course
        </button>

      </section>

      {/* SEARCH */}
      <section>

        <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 bg-white">

          <Search className="w-4 h-4 text-gray-500 mr-2" />

          <input
            type="text"
            placeholder="Search course..."
            className="w-full outline-none text-sm bg-transparent"
          />

        </div>

      </section>

      {/* COURSE LIST */}
      <section className="space-y-5">

        {courses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-200 rounded-2xl p-5 bg-white"
          >
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

              {/* LEFT */}
              <div className="space-y-4">

                {/* COURSE NAME */}
                <div className="flex items-center gap-2">

                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg">
                      {course.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      Course Subject
                    </p>
                  </div>

                </div>

                {/* DETAILS */}
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

              {/* ACTIONS */}
              <div className="flex items-center gap-3">

                {/* EDIT */}
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition">
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>

                {/* DELETE */}
                <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-full text-sm hover:bg-red-50 transition">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}

      </section>

      {/* EMPTY STATE */}
      {courses.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No courses available.
        </div>
      )}

    </div>
  );
};

export default AdminCoursesPage;