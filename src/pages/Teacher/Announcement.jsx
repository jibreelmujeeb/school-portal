import React, { useState } from "react";
import {
  Megaphone,
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  Users,
} from "lucide-react";

const initialAnnouncements = [
  {
    title: "Assignment Reminder",
    message: "Submit your Mathematics assignment before Friday.",
    audience: "SS2",
    date: "2026-04-20",
    mine: true,
  },
  {
    title: "School Resumption",
    message: "School resumes on Monday.",
    audience: "All",
    date: "2026-04-18",
    mine: false,
  },
];

const TeacherAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Announcements
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Share updates with students and classes
          </p>
        </div>

        {/* CREATE BUTTON */}
        <button className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </section>

      {/* ANNOUNCEMENTS LIST */}
      <section className="space-y-4">
        {announcements.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-2xl p-5 bg-white"
          >
            <div className="flex justify-between items-start gap-4">
              
              {/* CONTENT */}
              <div className="space-y-2">

                {/* TITLE */}
                <div className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium">{item.title}</h3>
                </div>

                {/* MESSAGE */}
                <p className="text-sm text-gray-600">
                  {item.message}
                </p>

                {/* META */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {item.audience}
                  </div>

                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {item.date}
                  </div>

                </div>

              </div>

              {/* ACTIONS (ONLY IF OWNER) */}
              {item.mine && (
                <div className="flex items-center gap-3">
                  <button className="text-gray-600 hover:text-blue-600">
                    <Pencil className="w-4 h-4" />
                  </button>

                  <button className="text-gray-600 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

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

export default TeacherAnnouncements;