import React from "react";
import {
  ClipboardList,
  CalendarDays,
  CheckCircle,
  Clock3,
  Download,
} from "lucide-react";

const assignments = [
  {
    title: "Mathematics Homework",
    subject: "Mathematics",
    deadline: "2026-05-20",
    status: "Submitted",
  },
  {
    title: "Physics Assignment",
    subject: "Physics",
    deadline: "2026-05-22",
    status: "Pending",
  },
  {
    title: "English Essay",
    subject: "English",
    deadline: "2026-05-25",
    status: "Pending",
  },
];

const ParentAssignmentsPage = () => {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Assignments
        </h1>

        <p className="text-sm text-gray-600 mt-2">
          Monitor your child’s assignments and submissions
        </p>
      </section>

      {/* ASSIGNMENTS LIST */}
      <section className="space-y-5">

        {assignments.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-2xl p-5 bg-white"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

              {/* LEFT */}
              <div className="space-y-3">

                {/* SUBJECT */}
                <span className="inline-flex items-center gap-1 px-3 py-1 border border-blue-200 rounded-full text-xs text-blue-600 bg-blue-50">
                  <ClipboardList className="w-3 h-3" />
                  {item.subject}
                </span>

                {/* TITLE */}
                <h2 className="text-lg font-semibold">
                  {item.title}
                </h2>

                {/* DEADLINE */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CalendarDays className="w-4 h-4" />
                  Deadline: {item.deadline}
                </div>

              </div>

              {/* RIGHT */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                {/* STATUS */}
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm ${
                    item.status === "Submitted"
                      ? "bg-green-50 text-green-600 border border-green-200"
                      : "bg-orange-50 text-orange-600 border border-orange-200"
                  }`}
                >
                  {item.status === "Submitted" ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Clock3 className="w-4 h-4" />
                  )}

                  {item.status}
                </div>

                {/* DOWNLOAD */}
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition">
                  <Download className="w-4 h-4" />
                  Download
                </button>

              </div>

            </div>
          </div>
        ))}

      </section>

      {/* EMPTY STATE */}
      {assignments.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No assignments available.
        </div>
      )}

    </div>
  );
};

export default ParentAssignmentsPage;