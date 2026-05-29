import React, { useState } from "react";

import {
  Search,
  CheckCircle2,
  XCircle,
  Clock3,
  MessageSquare,
  Send,
  Filter,
  Lightbulb,
} from "lucide-react";

const initialSuggestions = [
  {
    id: 1,
    user: "John Doe",
    role: "Student",
    title: "Improve Library WiFi",
    message:
      "Internet access in the library should be improved for research purposes.",
    status: "Pending",
    date: "2026-05-20",
  },
  {
    id: 2,
    user: "Mrs. Grace",
    role: "Teacher",
    title: "Digital Classroom Upgrade",
    message:
      "Interactive smart boards should be added to classrooms.",
    status: "Approved",
    date: "2026-05-18",
  },
  {
    id: 3,
    user: "Mr. James",
    role: "Parent",
    title: "Transport Improvement",
    message:
      "More buses should be added for distant students.",
    status: "Rejected",
    date: "2026-05-15",
  },
];

const AdminSuggestionPage = () => {
  const [suggestions, setSuggestions] =
    useState(initialSuggestions);

  const updateStatus = (id, status) => {
    const updatedSuggestions = suggestions.map((item) =>
      item.id === id
        ? { ...item, status }
        : item
    );

    setSuggestions(updatedSuggestions);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return {
          icon: (
            <CheckCircle2 className="w-4 h-4" />
          ),
          style:
            "border-green-200 bg-green-50 text-green-600",
        };

      case "Rejected":
        return {
          icon: (
            <XCircle className="w-4 h-4" />
          ),
          style:
            "border-red-200 bg-red-50 text-red-600",
        };

      default:
        return {
          icon: (
            <Clock3 className="w-4 h-4" />
          ),
          style:
            "border-orange-200 bg-orange-50 text-orange-600",
        };
    }
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Suggestion Management
          </h1>

          <p className="text-sm text-gray-600 mt-2">
            Review and manage suggestions from students, teachers, and parents
          </p>
        </div>

      </section>

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            Total Suggestions
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            120
          </h2>

        </div>

        {/* APPROVED */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            Approved
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            70
          </h2>

        </div>

        {/* PENDING */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock3 className="w-4 h-4 text-orange-600" />
            Pending
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            35
          </h2>

        </div>

        {/* REJECTED */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <XCircle className="w-4 h-4 text-red-600" />
            Rejected
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            15
          </h2>

        </div>

      </section>

      {/* SEARCH + FILTER */}
      <section className="flex flex-col lg:flex-row gap-4">

        {/* SEARCH */}
        <div className="flex-1 flex items-center border border-gray-300 rounded-2xl px-4 py-3 bg-white">

          <Search className="w-4 h-4 text-gray-500 mr-2" />

          <input
            type="text"
            placeholder="Search suggestions..."
            className="w-full outline-none text-sm bg-transparent"
          />

        </div>

        {/* FILTER */}
        <button className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 rounded-2xl text-sm hover:bg-gray-50 transition">
          <Filter className="w-4 h-4" />
          Filter
        </button>

      </section>

      {/* SUGGESTIONS */}
      <section className="space-y-5">

        {suggestions.map((item) => {
          const statusData = getStatusStyle(item.status);

          return (
            <div
              key={item.id}
              className="border border-gray-200 rounded-2xl p-5 bg-white"
            >
              <div className="space-y-5">

                {/* TOP */}
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">

                  <div>

                    {/* USER ROLE */}
                    <span className="inline-flex px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs mb-3">
                      {item.role}
                    </span>

                    <h2 className="text-lg font-semibold">
                      {item.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Submitted by {item.user}
                    </p>

                    <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                      {item.message}
                    </p>

                  </div>

                  {/* STATUS */}
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm w-fit ${statusData.style}`}
                  >
                    {statusData.icon}
                    {item.status}
                  </div>

                </div>

                {/* FOOTER */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                  {/* DATE */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">

                    <Clock3 className="w-4 h-4" />

                    {item.date}

                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap gap-3">

                    {/* APPROVE */}
                    <button
                      onClick={() =>
                        updateStatus(item.id, "Approved")
                      }
                      className="flex items-center gap-2 px-4 py-2 border border-green-200 rounded-full text-sm text-green-600 bg-green-50 hover:bg-green-100 transition"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve
                    </button>

                    {/* REJECT */}
                    <button
                      onClick={() =>
                        updateStatus(item.id, "Rejected")
                      }
                      className="flex items-center gap-2 px-4 py-2 border border-red-200 rounded-full text-sm text-red-600 bg-red-50 hover:bg-red-100 transition"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>

                    {/* REPLY */}
                    <button
                      className="flex items-center gap-2 px-4 py-2 border border-blue-200 rounded-full text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 transition"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Reply
                    </button>

                  </div>

                </div>

              </div>
            </div>
          );
        })}

      </section>

      {/* EMPTY STATE */}
      {suggestions.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No suggestions available.
        </div>
      )}

    </div>
  );
};

export default AdminSuggestionPage;