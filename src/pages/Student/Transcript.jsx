import React from "react";
import {
  User,
  GraduationCap,
  Download,
  Printer,
  Calendar,
  Award,
  BookOpen,
} from "lucide-react";

const transcript = [
  {
    session: "2025/2026",
    term: "First Term",
    subjects: [
      { subject: "Mathematics", score: 88, grade: "A" },
      { subject: "English", score: 81, grade: "A" },
      { subject: "Physics", score: 76, grade: "B+" },
      { subject: "Chemistry", score: 84, grade: "A" },
      { subject: "Biology", score: 79, grade: "B+" },
    ],
    average: 81.6,
  },
  {
    session: "2025/2026",
    term: "Second Term",
    subjects: [
      { subject: "Mathematics", score: 91, grade: "A+" },
      { subject: "English", score: 85, grade: "A" },
      { subject: "Physics", score: 82, grade: "A" },
      { subject: "Chemistry", score: 86, grade: "A" },
      { subject: "Biology", score: 83, grade: "A" },
    ],
    average: 85.4,
  },
];

export default function StudentTranscriptPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Academic Transcript
          </h1>

          <p className="text-gray-500 mt-2">
            Complete academic record and performance history.
          </p>
        </div>

        <div className="flex gap-3">

          <button className="flex items-center gap-2 px-5 py-3 border rounded-2xl">
            <Printer size={18}/>
            Print
          </button>

          <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-2xl">
            <Download size={18}/>
            Download PDF
          </button>

        </div>

      </div>

      {/* Student Info */}
      <div className="border rounded-3xl p-6">

        <div className="flex items-center gap-4">

          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <User size={35}/>
          </div>

          <div>

            <h2 className="text-xl font-bold">
              John Doe
            </h2>

            <p className="text-gray-500">
              Student ID: STD2026001
            </p>

            <p className="text-gray-500">
              Class: SS2 Science
            </p>

          </div>

        </div>

      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Award className="text-blue-600 mb-3"/>
          <h2 className="text-3xl font-bold">3.82</h2>
          <p>Current GPA</p>
        </div>

        <div className="border rounded-3xl p-5">
          <GraduationCap className="text-green-600 mb-3"/>
          <h2 className="text-3xl font-bold">3.76</h2>
          <p>CGPA</p>
        </div>

        <div className="border rounded-3xl p-5">
          <BookOpen className="text-purple-600 mb-3"/>
          <h2 className="text-3xl font-bold">24</h2>
          <p>Subjects Completed</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Calendar className="text-orange-600 mb-3"/>
          <h2 className="text-3xl font-bold">95%</h2>
          <p>Attendance</p>
        </div>

      </div>

      {/* Transcript */}
      {transcript.map((term, index) => (

        <div key={index} className="border rounded-3xl p-6">

          <h2 className="text-xl font-bold mb-1">
            {term.session}
          </h2>

          <p className="text-gray-500 mb-6">
            {term.term}
          </p>

          <div className="overflow-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-3">
                    Subject
                  </th>

                  <th className="text-left py-3">
                    Score
                  </th>

                  <th className="text-left py-3">
                    Grade
                  </th>

                </tr>

              </thead>

              <tbody>

                {term.subjects.map((subject, i) => (

                  <tr key={i} className="border-b">

                    <td className="py-3">
                      {subject.subject}
                    </td>

                    <td>
                      {subject.score}
                    </td>

                    <td>

                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">

                        {subject.grade}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          <div className="mt-5 flex justify-end">

            <div className="text-lg font-semibold">

              Average Score: {term.average}%

            </div>

          </div>

        </div>

      ))}

      {/* Academic Standing */}
      <div className="border rounded-3xl p-6 bg-green-50">

        <h2 className="text-xl font-bold text-green-700">
          Academic Standing
        </h2>

        <p className="mt-3 text-gray-700">
          Excellent academic performance. The student is eligible
          for promotion to the next class and qualifies for the
          Academic Excellence Award.
        </p>

      </div>

    </div>
  );
}