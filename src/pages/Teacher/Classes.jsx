import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight, School, Users } from "lucide-react";

const TeacherClasses = () => {
  const students = useSelector((state) => state.students.items);
  const classes = [...new Set(students.map((student) => student.class).filter(Boolean))];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">My Classes</h1>
        <p className="mt-2 text-sm text-gray-600">
          Browse your classes and open their student lists.
        </p>
      </section>

      {classes.length ? (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((className) => {
            const classStudents = students.filter((student) => student.class === className);
            return (
              <article
                key={className}
                className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <School className="h-5 w-5 text-blue-600" />
                    <h2 className="font-semibold">{className}</h2>
                  </div>
                  <p className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    {classStudents.length} {classStudents.length === 1 ? "student" : "students"}
                  </p>
                  <div className="mt-4 space-y-2">
                    {classStudents.slice(0, 3).map((student) => (
                      <p key={student.id} className="text-sm text-gray-600">{student.name}</p>
                    ))}
                    {classStudents.length > 3 && (
                      <p className="text-xs text-gray-500">and {classStudents.length - 3} more</p>
                    )}
                  </div>
                </div>
                <Link
                  to={`/teacher/students-list?class=${encodeURIComponent(className)}`}
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                >
                  View students <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </section>
      ) : (
        <div className="rounded-2xl border border-gray-200 p-8 text-center text-sm text-gray-500">
          No classes are available because no students have a class assigned.
        </div>
      )}
    </div>
  );
};

export default TeacherClasses;
