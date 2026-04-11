import React, { useState } from "react";
import {
  BookOpen,
  User,
  Search,
  ArrowRight,
} from "lucide-react";

const coursesData = [
  {
    title: "Mathematics",
    code: "MTH101",
    instructor: "Mr. Ade",
    progress: 80,
  },
  {
    title: "Physics",
    code: "PHY102",
    instructor: "Mrs. Bello",
    progress: 60,
  },
  {
    title: "English",
    code: "ENG103",
    instructor: "Mr. James",
    progress: 90,
  },
  {
    title: "Chemistry",
    code: "CHM104",
    instructor: "Dr. Musa",
    progress: 50,
  },
];

const StudentCourses = () => {
  const [search, setSearch] = useState("");

  const filteredCourses = coursesData.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      
      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Courses
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          View and manage your enrolled courses
        </p>
      </section>

      {/* SEARCH */}
      <section className="max-w-md">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-600 transition">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>
      </section>

      {/* COURSES GRID */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-2xl p-5 bg-white flex flex-col justify-between"
          >
            {/* TOP */}
            <div className="space-y-3">
              
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium">{course.title}</h3>
              </div>

              <p className="text-xs text-gray-500">
                Code: {course.code}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                {course.instructor}
              </div>

              {/* PROGRESS */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* ACTION */}
            <button className="mt-5 flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
              View Course <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </section>

      {/* EMPTY STATE */}
      {filteredCourses.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No courses found.
        </div>
      )}

    </div>
  );
};

export default StudentCourses;