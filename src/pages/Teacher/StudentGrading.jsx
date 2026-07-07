import React, { useState } from "react";
import {
  Search,
  Save,
  Send,
  Download,
  Filter,
  Award,
  Users,
  CheckCircle,
} from "lucide-react";

const students = [
  {
    id: 1,
    admissionNo: "STD001",
    name: "John Doe",
    assignment: 10,
    quiz: 8,
    ca: 18,
    practical: 9,
    exam: 62,
  },
  {
    id: 2,
    admissionNo: "STD002",
    name: "Mary Johnson",
    assignment: 9,
    quiz: 10,
    ca: 19,
    practical: 10,
    exam: 66,
  },
];

const getGrade = (score) => {
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 45) return "D";
  if (score >= 40) return "E";
  return "F";
};

export default function TeacherStudentsGradingPage() {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Students Grading
          </h1>

          <p className="text-gray-500">
            Enter and manage students' academic scores.
          </p>
        </div>

        <div className="flex gap-3">

          <button className="border rounded-xl px-5 py-3 flex items-center gap-2">
            <Save size={18}/>
            Save Draft
          </button>

          <button className="bg-blue-600 text-white rounded-xl px-5 py-3 flex items-center gap-2">
            <Send size={18}/>
            Publish
          </button>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Users className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">45</h2>
          <p>Students</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Award className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">78%</h2>
          <p>Class Average</p>
        </div>

        <div className="border rounded-3xl p-5">
          <CheckCircle className="text-purple-600 mb-3"/>
          <h2 className="text-2xl font-bold">39</h2>
          <p>Grades Saved</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Download className="text-orange-600 mb-3"/>
          <h2 className="text-2xl font-bold">
            PDF / Excel
          </h2>
          <p>Export</p>
        </div>

      </div>

      {/* Filters */}

      <div className="grid md:grid-cols-5 gap-4">

        <select className="border rounded-xl p-3">
          <option>Session</option>
        </select>

        <select className="border rounded-xl p-3">
          <option>Term</option>
        </select>

        <select className="border rounded-xl p-3">
          <option>Class</option>
        </select>

        <select className="border rounded-xl p-3">
          <option>Subject</option>
        </select>

        <button className="border rounded-xl flex items-center justify-center gap-2">
          <Filter size={18}/>
          Filter
        </button>

      </div>

      {/* Search */}

      <div className="flex border rounded-xl px-4 py-3">

        <Search className="mr-3"/>

        <input
          placeholder="Search student..."
          className="outline-none w-full"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </div>

      {/* Grade Table */}

      <div className="border rounded-3xl overflow-x-auto">

        <table className="w-full min-w-[1200px]">

          <thead className="bg-gray-50">

            <tr>

              <th>Name</th>
              <th>Admission</th>
              <th>Assignment</th>
              <th>Quiz</th>
              <th>CA</th>
              <th>Practical</th>
              <th>Exam</th>
              <th>Total</th>
              <th>Grade</th>
              <th>Remark</th>

            </tr>

          </thead>

          <tbody>

            {filteredStudents.map((student)=>{

              const total =
                student.assignment +
                student.quiz +
                student.ca +
                student.practical +
                student.exam;

              return (

                <tr key={student.id} className="border-t">

                  <td>{student.name}</td>

                  <td>{student.admissionNo}</td>

                  <td>
                    <input
                      defaultValue={student.assignment}
                      className="border rounded w-16 p-1"
                    />
                  </td>

                  <td>
                    <input
                      defaultValue={student.quiz}
                      className="border rounded w-16 p-1"
                    />
                  </td>

                  <td>
                    <input
                      defaultValue={student.ca}
                      className="border rounded w-16 p-1"
                    />
                  </td>

                  <td>
                    <input
                      defaultValue={student.practical}
                      className="border rounded w-16 p-1"
                    />
                  </td>

                  <td>
                    <input
                      defaultValue={student.exam}
                      className="border rounded w-16 p-1"
                    />
                  </td>

                  <td>{total}</td>

                  <td>{getGrade(total)}</td>

                  <td>
                    {total >= 70 ? "Excellent" : "Needs Improvement"}
                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}