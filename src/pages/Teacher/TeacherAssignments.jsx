import React, { useState } from "react";
import {
  ClipboardList,
  Plus,
  CalendarDays,
  Users,
  Pencil,
  Trash2,
} from "lucide-react";

const initialAssignments = [
  {
    title: "Math Homework",
    class: "SS2",
    deadline: "2026-04-25",
  },
  {
    title: "Essay Writing",
    class: "JSS3",
    deadline: "2026-04-22",
  },
];

const TeacherAssignments = () => {
  const [assignments, setAssignments] = useState(initialAssignments);

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Assignments
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Create and manage student assignments
          </p>
        </div>

        {/* CREATE BUTTON */}
        <button className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Plus className="w-4 h-4" />
          New Assignment
        </button>
      </section>

      {/* LIST */}
      <section className="space-y-4">
        {assignments.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-2xl p-5 bg-white"
          >
            <div className="flex justify-between items-start gap-4">
              
              {/* CONTENT */}
              <div className="space-y-2">

                {/* TITLE */}
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium">{item.title}</h3>
                </div>

                {/* META */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {item.class}
                  </div>

                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    Due: {item.deadline}
                  </div>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">
                <button className="text-gray-600 hover:text-blue-600">
                  <Pencil className="w-4 h-4" />
                </button>

                <button className="text-gray-600 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </section>

      {/* EMPTY */}
      {assignments.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No assignments created.
        </div>
      )}

    </div>
  );
};

export default TeacherAssignments;