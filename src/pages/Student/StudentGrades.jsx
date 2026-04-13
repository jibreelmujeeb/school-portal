import React from "react";
import {
  BarChart3,
  CheckCircle,
  XCircle,
} from "lucide-react";

const resultsData = [
  { subject: "Mathematics", score: 85, grade: "A" },
  { subject: "Physics", score: 72, grade: "B" },
  { subject: "English", score: 90, grade: "A" },
  { subject: "Chemistry", score: 65, grade: "C" },
  { subject: "Biology", score: 55, grade: "D" },
];

const StudentGrades = () => {
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
          Results
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
            <h2 className="text-lg font-semibold">73%</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Passed</p>
            <h2 className="text-lg font-semibold">5 Subjects</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <XCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-sm text-gray-500">Failed</p>
            <h2 className="text-lg font-semibold">0 Subjects</h2>
          </div>
        </div>

      </section>

      {/* RESULTS TABLE */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Subject Results
        </h2>

        <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
          
          {/* TABLE HEADER */}
          <div className="hidden sm:grid grid-cols-4 text-sm text-gray-500 border-b border-gray-200 p-4">
            <span>Subject</span>
            <span>Score</span>
            <span>Grade</span>
            <span>Status</span>
          </div>

          {/* TABLE BODY */}
          {resultsData.map((item, idx) => (
            <div
              key={idx}
              className="grid sm:grid-cols-4 gap-2 p-4 border-b border-gray-100 text-sm items-center"
            >
              <span className="font-medium">{item.subject}</span>
              <span>{item.score}%</span>
              <span>{item.grade}</span>

              <div className="flex items-center gap-2">
                {getStatusIcon(item.score)}
                {getStatus(item.score)}
              </div>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
};

export default StudentGrades;