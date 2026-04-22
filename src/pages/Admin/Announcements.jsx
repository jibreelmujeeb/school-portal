import React, { useState } from "react";
import {
  Megaphone,
  Plus,
  Trash2,
  Pencil,
  CalendarDays,
  Users,
} from "lucide-react";

const announcementsData = [
  {
    title: "School Resumption",
    message: "School resumes on Monday, April 25.",
    audience: "All",
    date: "2026-04-20",
  },
  {
    title: "Staff Meeting",
    message: "Meeting scheduled for Friday at 10 AM.",
    audience: "Teachers",
    date: "2026-04-18",
  },
];

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(announcementsData);

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Announcements
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage school-wide communications
          </p>
        </div>

        {/* ADD BUTTON */}
        <button className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </section>

      {/* ANNOUNCEMENT LIST */}
      <section className="space-y-4">
        {announcements.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-2xl p-5 bg-white"
          >
            {/* TOP */}
            <div className="flex justify-between items-start gap-4">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium">{item.title}</h3>
                </div>

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

      {/* EMPTY STATE */}
      {announcements.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No announcements available.
        </div>
      )}

    </div>
  );
};

export default AdminAnnouncements;