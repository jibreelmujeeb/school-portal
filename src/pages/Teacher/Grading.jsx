import React, { useState } from "react";
import {
  Search,
  Save,
  Send,
  Download,
  Upload,
  BookOpen,
  Users,
  Award,
} from "lucide-react";

const studentsData = [
  {
    id: 1,
    admissionNo: "STD001",
    name: "John Doe",
    ca: 25,
    exam: 60,
    remark: "Excellent",
  },
  {
    id: 2,
    admissionNo: "STD002",
    name: "Jane Smith",
    ca: 22,
    exam: 58,
    remark: "Very Good",
  },
  {
    id: 3,
    admissionNo: "STD003",
    name: "Michael Johnson",
    ca: 20,
    exam: 52,
    remark: "Good",
  },
];

const calculateGrade = (total) => {
  if (total >= 70) return "A";
  if (total >= 60) return "B";
  if (total >= 50) return "C";
  if (total >= 45) return "D";
  if (total >= 40) return "E";
  return "F";
};

export default function TeacherGradingPage() {
  const [students, setStudents] = useState(studentsData);
  const [search, setSearch] = useState("");

  const updateScore = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = Number(value);
    setStudents(updated);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Student Grading
          </h1>

          <p className="text-gray-500 mt-2">
            Record and publish student assessment scores.
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">

          <button className="flex items-center gap-2 border rounded-xl px-4 py-2">
            <Upload size={18}/>
            Import
          </button>

          <button className="flex items-center gap-2 border rounded-xl px-4 py-2">
            <Download size={18}/>
            Export
          </button>

          <button className="flex items-center gap-2 border rounded-xl px-4 py-2">
            <Save size={18}/>
            Save Draft
          </button>

          <button className="flex items-center gap-2 bg-blue-600 text-white rounded-xl px-4 py-2">
            <Send size={18}/>
            Publish
          </button>

        </div>

      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-5 gap-4">

        <select className="border rounded-xl p-3">
          <option>Academic Session</option>
          <option>2025/2026</option>
        </select>

        <select className="border rounded-xl p-3">
          <option>Term</option>
          <option>First Term</option>
          <option>Second Term</option>
          <option>Third Term</option>
        </select>

        <select className="border rounded-xl p-3">
          <option>Class</option>
          <option>SS1</option>
          <option>SS2</option>
        </select>

        <select className="border rounded-xl p-3">
          <option>Subject</option>
          <option>Mathematics</option>
        </select>

        <div className="flex items-center border rounded-xl px-3">
          <Search size={18}/>
          <input
            className="w-full outline-none p-2"
            placeholder="Search student..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>

      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Users className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">35</h2>
          <p>Students</p>
        </div>

        <div className="border rounded-3xl p-5">
          <BookOpen className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">Mathematics</h2>
          <p>Subject</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Award className="text-purple-600 mb-3"/>
          <h2 className="text-2xl font-bold">78%</h2>
          <p>Class Average</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Save className="text-orange-600 mb-3"/>
          <h2 className="text-2xl font-bold">Draft</h2>
          <p>Status</p>
        </div>

      </div>

      {/* Grades Table */}
      <div className="border rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-4 text-left">Admission No.</th>
                <th className="p-4 text-left">Student</th>
                <th className="p-4 text-center">CA (30)</th>
                <th className="p-4 text-center">Exam (70)</th>
                <th className="p-4 text-center">Total</th>
                <th className="p-4 text-center">Grade</th>
                <th className="p-4 text-left">Remark</th>
              </tr>

            </thead>

            <tbody>

              {filteredStudents.map((student,index)=>{

                const total = student.ca + student.exam;
                const grade = calculateGrade(total);

                return(

                <tr key={student.id} className="border-t">

                  <td className="p-4">{student.admissionNo}</td>

                  <td className="p-4">{student.name}</td>

                  <td className="p-4">
                    <input
                      type="number"
                      max="30"
                      value={student.ca}
                      onChange={(e)=>updateScore(index,"ca",e.target.value)}
                      className="border rounded-lg w-20 p-2"
                    />
                  </td>

                  <td className="p-4">
                    <input
                      type="number"
                      max="70"
                      value={student.exam}
                      onChange={(e)=>updateScore(index,"exam",e.target.value)}
                      className="border rounded-lg w-20 p-2"
                    />
                  </td>

                  <td className="text-center font-semibold">
                    {total}
                  </td>

                  <td className="text-center">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                      {grade}
                    </span>
                  </td>

                  <td className="p-4">
                    <input
                      defaultValue={student.remark}
                      className="border rounded-lg p-2 w-full"
                    />
                  </td>

                </tr>

              )})}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}