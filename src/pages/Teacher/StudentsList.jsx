import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { Download, Mail, Search, Users } from "lucide-react";
import downloadCsv from "../../utils/downloadCsv";

export default function TeacherStudentListPage() {
  const students = useSelector((state) => state.students.items);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState(searchParams.get("class") || "All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const classes = [...new Set(students.map((student) => student.class).filter(Boolean))];
  const statuses = [...new Set(students.map((student) => student.status).filter(Boolean))];
  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return students.filter((student) => {
      const matchesSearch = [student.name, student.id, student.email]
        .some((value) => value?.toLowerCase().includes(query));
      const matchesClass = selectedClass === "All" || student.class === selectedClass;
      const matchesStatus = selectedStatus === "All" || student.status === selectedStatus;
      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [search, selectedClass, selectedStatus, students]);

  const handleExport = () => {
    downloadCsv("teacher-students.csv", [
      ["Name", "Student ID", "Email", "Class", "Status"],
      ...filteredStudents.map((student) => [
        student.name,
        student.id,
        student.email,
        student.class,
        student.status,
      ]),
    ]);
  };

  const activeCount = students.filter((student) => student.status === "Active").length;

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">My Students</h1>
          <p className="mt-2 text-sm text-gray-600">
            Search, filter, and contact students assigned to your classes.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExport}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm text-white hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          Export filtered list
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 p-5">
          <Users className="mb-3 h-5 w-5 text-blue-600" />
          <p className="text-2xl font-semibold">{students.length}</p>
          <p className="text-sm text-gray-500">Total students</p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-5">
          <Users className="mb-3 h-5 w-5 text-green-600" />
          <p className="text-2xl font-semibold">{activeCount}</p>
          <p className="text-sm text-gray-500">Active students</p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-5">
          <Users className="mb-3 h-5 w-5 text-purple-600" />
          <p className="text-2xl font-semibold">{classes.length}</p>
          <p className="text-sm text-gray-500">Classes</p>
        </div>
      </section>

      <section className="flex flex-col gap-3 md:flex-row">
        <label className="flex flex-1 items-center rounded-xl border border-gray-300 px-4 py-3 focus-within:border-blue-600">
          <Search className="mr-3 h-4 w-4 text-gray-500" />
          <span className="sr-only">Search students</span>
          <input
            type="search"
            placeholder="Search name, student ID, or email"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full outline-none"
          />
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-3">
          <span className="text-sm text-gray-600">Class</span>
          <select
            value={selectedClass}
            onChange={(event) => setSelectedClass(event.target.value)}
            className="bg-transparent text-sm outline-none"
          >
            <option value="All">All classes</option>
            {classes.map((className) => <option key={className}>{className}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-3">
          <span className="text-sm text-gray-600">Status</span>
          <select
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            className="bg-transparent text-sm outline-none"
          >
            <option value="All">All statuses</option>
            {statuses.map((status) => <option key={status}>{status}</option>)}
          </select>
        </label>
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4 font-medium">Student</th>
                <th className="p-4 font-medium">Student ID</th>
                <th className="p-4 font-medium">Class</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Results</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-t border-gray-100">
                  <td className="p-4 font-medium">{student.name}</td>
                  <td className="p-4">{student.id}</td>
                  <td className="p-4">{student.class || "-"}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-3 py-1 text-xs ${
                      student.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {student.status || "Unknown"}
                    </span>
                  </td>
                  <td className="p-4">
                    {student.email ? (
                      <a
                        href={`mailto:${student.email}`}
                        aria-label={`Email ${student.name}`}
                        className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                      >
                        <Mail className="h-4 w-4" /> Email
                      </a>
                    ) : "-"}
                  </td>
                  <td className="p-4">
                    <Link
                      to={`/teacher/results?search=${encodeURIComponent(student.name)}`}
                      className="text-blue-600 hover:underline"
                    >
                      View results
                    </Link>
                  </td>
                </tr>
              ))}
              {!filteredStudents.length && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    No students match your search and filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
