import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ClipboardList,
  CalendarDays,
  Clock,
} from "lucide-react";
import { studentApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const StudentAssignments = () => {
  const { accessToken } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const filteredAssignments = useMemo(() => (
    filter === "All"
      ? assignments
      : assignments.filter((assignment) => assignment.status === filter.toUpperCase())
  ), [assignments, filter]);

  const loadAssignments = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError("");

    try {
      const payload = await studentApi.assignments(accessToken);
      setAssignments(payload.assignments);
    } catch (err) {
      setError(err.message || "Unable to load assignments.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void loadAssignments();
  }, [loadAssignments]);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Assignments</h1>
        <p className="mt-2 text-sm text-gray-600">View assignments from your teachers</p>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="flex flex-wrap gap-3">
        {["All", "Pending", "Overdue"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`rounded-lg border px-4 py-2 text-sm ${
              filter === tab
                ? "border-blue-600 text-blue-600"
                : "border-gray-300 text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </section>

      <section className="grid gap-4">
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading assignments...</div>
        ) : filteredAssignments.length === 0 ? (
          <div className="text-sm text-gray-500">No assignments found.</div>
        ) : (
          filteredAssignments.map((item) => (
            <article key={item.id} className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <ClipboardList className="h-5 w-5 text-blue-600" />
                  </div>

                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      {item.subject.name} - {item.class.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">{item.description || "No instructions added."}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <CalendarDays className="h-4 w-4" />
                      Due: {item.dueDate}
                    </div>
                  </div>
                </div>

                <div className={`flex items-center gap-1 text-sm ${item.status === "OVERDUE" ? "text-red-600" : "text-orange-600"}`}>
                  <Clock className="h-4 w-4" />
                  {item.status === "OVERDUE" ? "Overdue" : "Pending"}
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
};

export default StudentAssignments;
