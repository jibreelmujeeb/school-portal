import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  User,
  Search,
  ArrowRight,
} from "lucide-react";
import { coursesData } from "../../data/studentPortal";

const StudentCourses = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return coursesData
      .filter((course) =>
        [course.title, course.code, course.instructor]
          .some((value) => value.toLowerCase().includes(query)),
      )
      .sort((first, second) =>
        sortBy === "progress"
          ? second.progress - first.progress
          : first.title.localeCompare(second.title),
      );
  }, [search, sortBy]);

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
      <section className="flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-600 transition">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            aria-label="Search courses"
            type="text"
            placeholder="Search name, code, or instructor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          />
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600">
          Sort by
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="bg-transparent text-gray-900 outline-none"
          >
            <option value="name">Name</option>
            <option value="progress">Progress</option>
          </select>
        </label>
      </section>

      {/* COURSES GRID */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <div
            key={course.code}
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
            <button
              type="button"
              onClick={() => navigate("/student/subjects", { state: { selectedSubject: course.title } })}
              className="mt-5 flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
            >
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