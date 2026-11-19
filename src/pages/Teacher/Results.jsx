import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { Download, FileText, Search } from "lucide-react";
import downloadCsv from "../../utils/downloadCsv";

const scoresByStudentId = {
  "STD-001": [
    { subject: "Mathematics", score: 78 },
    { subject: "English", score: 82 },
    { subject: "Physics", score: 70 },
  ],
  "STD-002": [
    { subject: "Mathematics", score: 92 },
    { subject: "English", score: 88 },
    { subject: "Physics", score: 78 },
  ],
  "STD-003": [
    { subject: "Mathematics", score: 61 },
    { subject: "English", score: 68 },
    { subject: "Physics", score: 66 },
  ],
};

const TeacherResults = () => {
  const students = useSelector((state) => state.students.items);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedClass, setSelectedClass] = useState("All");
  const [expandedStudentId, setExpandedStudentId] = useState(null);

  const results = useMemo(() => students.flatMap((student) => {
    const grades = scoresByStudentId[student.id];
    if (!grades?.length) return [];
    const total = grades.reduce((sum, grade) => sum + grade.score, 0);
    return [{
      ...student,
      grades,
      total,
      average: Math.round(total / grades.length),
    }];
  }), [students]);
  const classes = [...new Set(results.map((result) => result.class).filter(Boolean))];
  const filteredResults = results.filter((result) => {
    const query = search.trim().toLowerCase();
    return (
      [result.name, result.id].some((value) => value?.toLowerCase().includes(query)) &&
      (selectedClass === "All" || result.class === selectedClass)
    );
  });

  const getPosition = (result) => {
    const classmates = results
      .filter((item) => item.class === result.class)
      .sort((first, second) => second.average - first.average);
    return classmates.findIndex((item) => item.id === result.id) + 1;
  };

  const handleExport = () => {
    downloadCsv("teacher-results.csv", [
      ["Student", "Student ID", "Class", "Total", "Average", "Position"],
      ...filteredResults.map((result) => [
        result.name,
        result.id,
        result.class,
        result.total,
        `${result.average}%`,
        getPosition(result),
      ]),
    ]);
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Results Overview</h1>
          <p className="mt-2 text-sm text-gray-600">
            Review student scores, filter results, and export a class report.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/teacher/grades"
            className="rounded-xl border border-gray-300 px-4 py-3 text-sm hover:bg-gray-50"
          >
            Enter grades
          </Link>
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm text-white hover:bg-blue-700"
          >
            <Download className="h-4 w-4" />
            Export results
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center rounded-xl border border-gray-300 px-4 py-3 focus-within:border-blue-600">
          <Search className="mr-3 h-4 w-4 text-gray-500" />
          <span className="sr-only">Search results</span>
          <input
            type="search"
            placeholder="Search student name or ID"
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
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4 font-medium">Student</th>
                <th className="p-4 font-medium">Class</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Average</th>
                <th className="p-4 font-medium">Position</th>
                <th className="p-4 font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => {
                const isExpanded = expandedStudentId === result.id;
                return (
                  <React.Fragment key={result.id}>
                    <tr className="border-t border-gray-100">
                      <td className="p-4 font-medium">
                        <span className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          {result.name}
                        </span>
                      </td>
                      <td className="p-4">{result.class || "Unassigned"}</td>
                      <td className="p-4">{result.total}</td>
                      <td className="p-4">{result.average}%</td>
                      <td className="p-4">{getPosition(result)}</td>
                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() => setExpandedStudentId(isExpanded ? null : result.id)}
                          aria-expanded={isExpanded}
                          className="text-blue-600 hover:underline"
                        >
                          {isExpanded ? "Hide scores" : "View scores"}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="border-t border-gray-100 bg-gray-50">
                        <td colSpan="6" className="p-4">
                          <h2 className="mb-3 font-medium">Subject scores for {result.name}</h2>
                          <div className="flex flex-wrap gap-3">
                            {result.grades.map((grade) => (
                              <div
                                key={grade.subject}
                                className="min-w-40 rounded-xl border border-gray-200 bg-white p-3"
                              >
                                <p className="text-sm text-gray-500">{grade.subject}</p>
                                <p className="mt-1 font-semibold">{grade.score}%</p>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {!filteredResults.length && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    {results.length
                      ? "No results match your search and class filter."
                      : "No results have been recorded for these students yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TeacherResults;
