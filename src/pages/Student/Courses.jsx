import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  User,
  Search,
} from "lucide-react";
import { studentApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const StudentCourses = () => {
  const { accessToken } = useAuth();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const filteredCourses = useMemo(() => (
    courses.filter((course) => (
      course.subject.name.toLowerCase().includes(search.toLowerCase())
      || course.subject.code.toLowerCase().includes(search.toLowerCase())
      || course.class.name.toLowerCase().includes(search.toLowerCase())
    ))
  ), [courses, search]);

  const loadCourses = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError("");

    try {
      const payload = await studentApi.courses(accessToken);
      setCourses(payload.courses);
    } catch (err) {
      setError(err.message || "Unable to load courses.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void loadCourses();
  }, [loadCourses]);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Courses</h1>
        <p className="mt-2 text-sm text-gray-600">
          View your enrolled classes and subjects
        </p>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="max-w-md">
        <label className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-600">
          <Search className="mr-2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading courses...</div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-sm text-gray-500">No courses found.</div>
        ) : (
          filteredCourses.map((course) => (
            <article key={course.id} className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium">{course.subject.name}</h3>
                </div>
                <p className="text-xs text-gray-500">Code: {course.subject.code}</p>
                <p className="text-sm text-gray-600">Class: {course.class.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  {course.teacher.firstName} {course.teacher.lastName}
                </div>
                <p className="text-xs text-gray-500">{course.academicSession}</p>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
};

export default StudentCourses;
