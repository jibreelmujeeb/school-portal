import React from "react";
import {
  Megaphone,
  CalendarDays,
  Pin,
} from "lucide-react";

const announcementsData = [
  {
    title: "School Resumption",
    message: "School resumes on Monday, April 25.",
    date: "2026-04-20",
    important: true,
  },
  {
    title: "Exam Timetable Released",
    message: "Check your dashboard for the full exam timetable.",
    date: "2026-04-18",
    important: false,
  },
  {
    title: "Sports Day",
    message: "Annual sports day holds next week.",
    date: "2026-04-15",
    important: false,
  },
];

const StudentAnnouncements = () => {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Announcements
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Stay updated with school news and updates
        </p>
      </section>

      {/* LIST */}
      <section className="space-y-4">
        {announcementsData.map((item, idx) => (
          <div
            key={idx}
            className={`border rounded-2xl p-5 ${
              item.important
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            {/* TOP */}
            <div className="flex items-start justify-between gap-4">

              <div className="space-y-2">

                {/* TITLE */}
                <div className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium">{item.title}</h3>

                  {item.important && (
                    <span className="flex items-center gap-1 text-xs text-blue-600">
                      <Pin className="w-3 h-3" />
                      Important
                    </span>
                  )}
                </div>

                {/* MESSAGE */}
                <p className="text-sm text-gray-600">
                  {item.message}
                </p>

                {/* DATE */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <CalendarDays className="w-4 h-4" />
                  {item.date}
                </div>

              </div>

            </div>
          </div>
        ))}
      </section>

      {/* EMPTY STATE */}
      {announcementsData.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No announcements available.
        </div>
      )}

    </div>
  );
};

export default StudentAnnouncements;