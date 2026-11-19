import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BookOpen, Search, Users } from "lucide-react";

const TeacherSubjectsPage = () => {
  const subjects = useSelector((state) => state.subjects.items);
  const students = useSelector((state) => state.students.items);
  const [search, setSearch] = useState("");

  const filteredSubjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return subjects.filter((subject) =>
      [subject.name, subject.code, subject.teacher]
        .some((value) => value?.toLowerCase().includes(query)),
    );
  }, [search, subjects]);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">My Subjects</h1>
        <p className="mt-2 text-sm text-gray-600">
          Browse available subjects and open the related teaching tools.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 p-5">
          <BookOpen className="mb-3 h-5 w-5 text-blue-600" />
          <p className="text-2xl font-semibold">{subjects.length}</p>
          <p className="text-sm text-gray-500">Subjects in the portal</p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-5">
          <Users className="mb-3 h-5 w-5 text-green-600" />
          <p className="text-2xl font-semibold">{students.length}</p>
          <p className="text-sm text-gray-500">Students in the portal</p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-5">
          <Users className="mb-3 h-5 w-5 text-purple-600" />
          <p className="text-2xl font-semibold">
            {[...new Set(students.map((student) => student.class).filter(Boolean))].length}
          </p>
          <p className="text-sm text-gray-500">Classes in the portal</p>
        </div>
      </section>

      <label className="flex max-w-xl items-center rounded-xl border border-gray-300 px-4 py-3 focus-within:border-blue-600">
        <Search className="mr-3 h-4 w-4 text-gray-500" />
        <span className="sr-only">Search subjects</span>
        <input
          type="search"
          placeholder="Search subject, code, or teacher"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full outline-none"
        />
      </label>

      {filteredSubjects.length ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredSubjects.map((subject) => (
            <article key={subject.code || subject.name} className="rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-semibold">{subject.name}</h2>
                  <p className="text-sm text-gray-500">{subject.code || "No subject code"}</p>
                </div>
              </div>
              <p className="mt-5 text-sm text-gray-600">
                Teacher: {subject.teacher || "Unassigned"}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Link
                  to="/teacher/students-list"
                  className="rounded-xl border border-gray-300 px-3 py-2 text-center text-sm hover:bg-gray-50"
                >
                  Browse students
                </Link>
                <Link
                  to="/teacher/learning-materials"
                  className="rounded-xl border border-blue-600 px-3 py-2 text-center text-sm text-blue-600 hover:bg-blue-50"
                >
                  Teaching materials
                </Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="rounded-2xl border border-gray-200 p-8 text-center text-sm text-gray-500">
          {subjects.length ? "No subjects match your search." : "No subjects are available."}
        </div>
      )}
    </div>
  );
};

export default TeacherSubjectsPage;
