import React from "react";
import {
  Users,
  BookOpen,
  ArrowRight,
  School,
} from "lucide-react";

const classesData = [
  {
    name: "SS2",
    students: 35,
    subjects: ["Mathematics", "Physics"],
  },
  {
    name: "JSS3",
    students: 28,
    subjects: ["English", "Literature"],
  },
  {
    name: "SS1",
    students: 30,
    subjects: ["Chemistry", "Biology"],
  },
];

const TeacherClasses = () => {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          My Classes
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Manage and access your assigned classes
        </p>
      </section>

      {/* CLASSES GRID */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classesData.map((cls, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-2xl p-5 bg-white flex flex-col justify-between"
          >
            {/* TOP */}
            <div className="space-y-3">
              
              {/* CLASS NAME */}
              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium">{cls.name}</h3>
              </div>

              {/* STUDENTS */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                {cls.students} Students
              </div>

              {/* SUBJECTS */}
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <BookOpen className="w-4 h-4 mt-1" />
                <div className="flex flex-wrap gap-1">
                  {cls.subjects.map((sub, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 border border-gray-300 rounded-full text-xs"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ACTION */}
            <button className="mt-5 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition">
              View Class <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </section>

      {/* EMPTY STATE */}
      {classesData.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No classes assigned.
        </div>
      )}

    </div>
  );
};

export default TeacherClasses;