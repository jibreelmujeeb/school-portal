import React, { useMemo, useState } from "react";
import {
  BarChart3,
  CheckCircle,
  XCircle,
  Search,
  Download,
} from "lucide-react";
import { studentResultsData, getGradeForScore } from "../../data/studentPortal";
import downloadCsv from "../../utils/downloadCsv";

const StudentGrades = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const resultsData = useMemo(() => studentResultsData.map((item) => ({
    ...item,
    grade: getGradeForScore(item.score),
    status: item.score >= 50 ? "Pass" : "Fail",
  })), []);
  const filteredResults = useMemo(() => {
    const query = search.trim().toLowerCase();
    return resultsData.filter((item) =>
      item.subject.toLowerCase().includes(query) &&
      (statusFilter === "All" || item.status === statusFilter),
    );
  }, [resultsData, search, statusFilter]);
  const average = resultsData.length
    ? resultsData.reduce((total, item) => total + item.score, 0) / resultsData.length
    : 0;
  const passedCount = resultsData.filter((item) => item.status === "Pass").length;
  const failedCount = resultsData.length - passedCount;
  const exportGrades = () => downloadCsv("student-grades.csv", [
    ["Subject", "Score", "Grade", "Status"],
    ...filteredResults.map((item) => [item.subject, `${item.score}%`, item.grade, item.status]),
  ]);

  const getStatus = (score) => (score >= 50 ? "Pass" : "Fail");

  const getStatusIcon = (score) =>
    score >= 50 ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <XCircle className="w-4 h-4 text-red-600" />
    );

  return (
    <div className="space-y-10">
      
      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Grades
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          View your academic performance
        </p>
      </section>

      {/* SUMMARY */}
      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        
        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Average Score</p>
            <h2 className="text-lg font-semibold">{average.toFixed(1)}%</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Passed</p>
            <h2 className="text-lg font-semibold">{passedCount} Subjects</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <XCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-sm text-gray-500">Failed</p>
            <h2 className="text-lg font-semibold">{failedCount} Subjects</h2>
          </div>
        </div>

      </section>

      <section>
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold">Subject Grades</h2>
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredResults.length} of {resultsData.length} subjects
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2">
              <Search className="h-4 w-4 text-gray-500" />
              <span className="sr-only">Search grades by subject</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search subjects"
                className="text-sm outline-none"
              />
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 text-sm">
              <span className="text-gray-600">Status</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="bg-transparent outline-none"
              >
                {["All", "Pass", "Fail"].map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
            <button
              type="button"
              onClick={exportGrades}
              disabled={filteredResults.length === 0}
              className="flex items-center justify-center gap-2 rounded-xl border border-blue-600 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="hidden grid-cols-4 border-b border-gray-200 p-4 text-sm text-gray-500 sm:grid">
            <span>Subject</span><span>Score</span><span>Grade</span><span>Status</span>
          </div>
          {filteredResults.map((item) => (
            <div key={item.subject} className="grid items-center gap-2 border-b border-gray-100 p-4 text-sm sm:grid-cols-4">
              <span className="font-medium">{item.subject}</span>
              <span>{item.score}%</span>
              <span>{item.grade}</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(item.score)}
                {getStatus(item.score)}
              </div>
            </div>
          ))}
          {filteredResults.length === 0 && (
            <p className="p-8 text-center text-sm text-gray-500">
              No grades match your search and status filter.
            </p>
          )}
        </div>
      </section>

    </div>
  );
};

export default StudentGrades;