import React, { useState } from "react";
import {
  ClipboardList,
  CalendarDays,
  CheckCircle,
  Clock,
  Upload,
} from "lucide-react";

const assignmentsData = [
  {
    title: "Mathematics Assignment",
    course: "Mathematics",
    due: "2026-04-15",
    status: "Pending",
  },
  {
    title: "Physics Lab রিপোর্ট",
    course: "Physics",
    due: "2026-04-10",
    status: "Submitted",
  },
  {
    title: "English Essay",
    course: "English",
    due: "2026-04-05",
    status: "Late",
  },
];

const StudentAssignments = () => {
  const [filter, setFilter] = useState("All");

  const filteredAssignments =
    filter === "All"
      ? assignmentsData
      : assignmentsData.filter((a) => a.status === filter);

  const statusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "text-orange-600";
      case "Submitted":
        return "text-green-600";
      case "Late":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const statusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4 text-orange-600" />;
      case "Submitted":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Late":
        return <CalendarDays className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Assignments
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Manage and submit your assignments
        </p>
      </section>

      {/* FILTER TABS */}
      <section className="flex flex-wrap gap-3">
        {["All", "Pending", "Submitted"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-full border text-sm ${
              filter === tab
                ? "border-blue-600 text-blue-600"
                : "border-gray-300 text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </section>

      {/* ASSIGNMENT LIST */}
      <section className="grid gap-4">
        {filteredAssignments.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-2xl p-5 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* LEFT */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-gray-100">
                <ClipboardList className="w-5 h-5 text-blue-600" />
              </div>

              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  {item.course}
                </p>

                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <CalendarDays className="w-4 h-4" />
                  Due: {item.due}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-between md:justify-end gap-4">
              
              {/* STATUS */}
              <div className={`flex items-center gap-1 text-sm ${statusStyle(item.status)}`}>
                {statusIcon(item.status)}
                {item.status}
              </div>

              {/* ACTION */}
              {item.status !== "Submitted" && (
                <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
                  <Upload className="w-4 h-4" />
                  Submit
                </button>
              )}
            </div>
          </div>
        ))}
      </section>

    </div>
  );
};

export default StudentAssignments;