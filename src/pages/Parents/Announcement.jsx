import React from "react";
import {
  Megaphone,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

const announcements = [
  {
    title: "PTA Meeting",
    description:
      "The PTA meeting will hold on Friday by 10:00 AM in the school hall.",
    date: "2026-05-15",
    category: "Meeting",
  },
  {
    title: "Examination Timetable Released",
    description:
      "The second term examination timetable has been published.",
    date: "2026-05-12",
    category: "Academic",
  },
  {
    title: "School Resumption",
    description:
      "Students are expected to resume on Monday next week.",
    date: "2026-05-10",
    category: "General",
  },
];

const ParentAnnouncementsPage = () => {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Announcements
        </h1>

        <p className="text-sm text-gray-600 mt-2">
          Stay updated with important school information
        </p>
      </section>

      {/* ANNOUNCEMENTS LIST */}
      <section className="space-y-5">

        {announcements.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-2xl p-5 bg-white transition hover:border-blue-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

              {/* CONTENT */}
              <div className="space-y-3">

                {/* CATEGORY */}
                <span className="inline-flex items-center gap-1 px-3 py-1 border border-blue-200 rounded-full text-xs text-blue-600 bg-blue-50">
                  <Megaphone className="w-3 h-3" />
                  {item.category}
                </span>

                {/* TITLE */}
                <h2 className="text-lg font-semibold">
                  {item.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                {/* DATE */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CalendarDays className="w-4 h-4" />
                  {item.date}
                </div>

              </div>

              {/* ACTION */}
              <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                Read More
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>
        ))}

      </section>

      {/* EMPTY STATE */}
      {announcements.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No announcements available.
        </div>
      )}

    </div>
  );
};

export default ParentAnnouncementsPage;