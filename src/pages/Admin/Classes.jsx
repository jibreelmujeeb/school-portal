import React from "react";
import {
  School,
  Users,
  GraduationCap,
  Plus,
  ArrowRight,
} from "lucide-react";

const classesData = [
  {
    name: "JSS1 - A",
    teacher: "Mr. Ade",
    students: 35,
    department: "Junior",
  },
  {
    name: "SS2 - Science",
    teacher: "Mrs. Bello",
    students: 28,
    department: "Science",
  },
  {
    name: "SS3 - Arts",
    teacher: "Mr. James",
    students: 22,
    department: "Arts",
  },
];

const AdminClasses = () => {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Classes
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage school classes and structure
          </p>
        </div>

        {/* ADD BUTTON */}
        <button className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Plus className="w-4 h-4" />
          Add Class
        </button>
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
              
              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium">{cls.name}</h3>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <GraduationCap className="w-4 h-4" />
                {cls.teacher}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                {cls.students} Students
              </div>

              <p className="text-xs text-gray-500">
                Department: {cls.department}
              </p>
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
          No classes available.
        </div>
      )}

    </div>
  );
};

export default AdminClasses;