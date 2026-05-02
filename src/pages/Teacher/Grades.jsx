import React, { useState } from "react";
import {
  Users,
  BookOpen,
  Save,
} from "lucide-react";

const studentsData = [
  { name: "John Doe", score: 75 },
  { name: "Aisha Bello", score: 88 },
  { name: "Michael James", score: 60 },
];

const TeacherGrades = () => {
  const [students, setStudents] = useState(studentsData);
  const [selectedClass, setSelectedClass] = useState("SS2");
  const [subject, setSubject] = useState("Mathematics");

  const handleScoreChange = (index, value) => {
    const updated = [...students];
    updated[index].score = value;
    setStudents(updated);
  };

  const getGrade = (score) => {
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "F";
  };

  const gradeColor = (grade) => {
    if (grade === "A") return "text-green-600";
    if (grade === "B") return "text-blue-600";
    if (grade === "C") return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Enter Grades
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Record and manage student scores
        </p>
      </section>

      {/* CONTROLS */}
      <section className="grid gap-4 sm:grid-cols-2">

        {/* CLASS */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <Users className="w-4 h-4 text-gray-500 mr-2" />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          >
            <option>SS2</option>
            <option>SS1</option>
            <option>JSS3</option>
          </select>
        </div>

        {/* SUBJECT */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <BookOpen className="w-4 h-4 text-gray-500 mr-2" />
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          >
            <option>Mathematics</option>
            <option>English</option>
            <option>Physics</option>
          </select>
        </div>

      </section>

      {/* TABLE */}
      <section className="border border-gray-200 rounded-2xl bg-white overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-3 text-sm text-gray-500 border-b border-gray-200 p-4">
          <span>Student</span>
          <span>Score</span>
          <span>Grade</span>
        </div>

        {/* BODY */}
        {students.map((student, idx) => (
          <div
            key={idx}
            className="grid grid-cols-3 p-4 border-b border-gray-100 text-sm items-center"
          >
            <span className="font-medium">
              {student.name}
            </span>

            {/* INPUT */}
            <input
              type="number"
              value={student.score}
              onChange={(e) =>
                handleScoreChange(idx, e.target.value)
              }
              className="border border-gray-300 rounded-lg px-2 py-1 outline-none text-sm w-20"
            />

            {/* GRADE */}
            <span className={gradeColor(getGrade(student.score))}>
              {getGrade(student.score)}
            </span>
          </div>
        ))}

      </section>

      {/* SAVE */}
      <section className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Save className="w-4 h-4" />
          Save Grades
        </button>
      </section>

    </div>
  );
};

export default TeacherGrades;