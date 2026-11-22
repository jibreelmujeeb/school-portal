import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList,
  CalendarDays,
  CheckCircle,
  Clock,
  Upload,
  Search,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

const assignmentsData = [
  {
    id: "math-assignment",
    title: "Mathematics Assignment",
    course: "Mathematics",
    due: "2026-04-15",
    status: "Pending",
  },
  {
    id: "physics-lab",
    title: "Physics Lab রিপোর্ট",
    course: "Physics",
    due: "2026-04-10",
    status: "Submitted",
  },
  {
    id: "english-essay",
    title: "English Essay",
    course: "English",
    due: "2026-04-05",
    status: "Late",
  },
];

const StudentAssignments = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [assignments, , assignmentsError] = usePersistentState(
    "student-assignments",
    assignmentsData,
  );

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesFilter = filter === "All" || assignment.status === filter;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      assignment.title.toLowerCase().includes(query) ||
      assignment.course.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

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

      {assignmentsError && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {assignmentsError}
        </p>
      )}

      <section className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3">
        <Search className="h-4 w-4 text-gray-500" />
        <span className="sr-only">Search assignments</span>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by title or subject"
          className="w-full text-sm outline-none"
        />
      </section>

      {/* FILTER TABS */}
      <section className="flex flex-wrap gap-3">
        {["All", "Pending", "Submitted", "Late"].map((tab) => (
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
                <button
                  type="button"
                  onClick={() =>
                    navigate("/student/assignmentSubmission", {
                      state: { assignmentId: item.id, title: item.title, course: item.course, due: item.due },
                    })
                  }
                  className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
                >
                  <Upload className="w-4 h-4" />
                  Submit
                </button>
              )}
            </div>
          </div>
        ))}
        {filteredAssignments.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            No assignments match your search and filter.
          </div>
        )}
      </section>

    </div>
  );
};

export default StudentAssignments;