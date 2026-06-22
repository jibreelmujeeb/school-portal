import React, { useState } from "react";
import {
  Megaphone,
  Search,
  Calendar,
  ArrowRight,
  Bell,
} from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "2026 Admission Form Now Available",
    category: "Admission",
    date: "June 20, 2026",
    description:
      "Applications for the 2026/2027 academic session are now open.",
  },
  {
    id: 2,
    title: "Third Term Examination Schedule Released",
    category: "Examination",
    date: "June 18, 2026",
    description:
      "Students can now view the official examination timetable.",
  },
  {
    id: 3,
    title: "Independence Day Celebration",
    category: "Event",
    date: "June 15, 2026",
    description:
      "The school will host its annual Independence Day celebration.",
  },
];

export default function PublicAnnouncementPage() {
  const [search, setSearch] = useState("");

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">

      {/* HERO SECTION */}
      <section className="border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">

          <div className="text-center max-w-3xl mx-auto">

            <div className="w-20 h-20 mx-auto rounded-3xl border border-blue-200 flex items-center justify-center mb-6">
              <Megaphone className="w-10 h-10 text-blue-600" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold">
              School Announcements
            </h1>

            <p className="text-gray-500 mt-5 text-lg">
              Stay informed with the latest school news,
              notices, events, admissions, and academic updates.
            </p>

          </div>

        </div>

      </section>

      {/* FEATURED ANNOUNCEMENT */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        <div className="border border-blue-200 bg-blue-50 rounded-3xl p-8">

          <div className="flex items-center gap-3 mb-4">

            <Bell className="w-6 h-6 text-blue-600" />

            <span className="font-semibold text-blue-600">
              Featured Announcement
            </span>

          </div>

          <h2 className="text-2xl font-bold">
            Admission Into 2026/2027 Session Is Open
          </h2>

          <p className="text-gray-600 mt-4">
            Interested parents and guardians can now
            apply online for admission into Nursery,
            Primary, and Secondary School classes.
          </p>

          <button className="mt-6 flex items-center gap-2 px-5 py-3 rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-100">
            Read More
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </section>

      {/* SEARCH */}
      <section className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3">

          <Search className="w-5 h-5 text-gray-500 mr-3" />

          <input
            type="text"
            placeholder="Search announcements..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full outline-none"
          />

        </div>

      </section>

      {/* ANNOUNCEMENTS GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredAnnouncements.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-3xl p-6 hover:border-blue-200 transition"
            >

              <span className="inline-flex px-3 py-1 rounded-full text-xs border border-blue-200 bg-blue-50 text-blue-600">
                {item.category}
              </span>

              <h3 className="text-xl font-semibold mt-4">
                {item.title}
              </h3>

              <div className="flex items-center gap-2 mt-4 text-gray-500 text-sm">

                <Calendar className="w-4 h-4" />

                {item.date}

              </div>

              <p className="text-gray-600 mt-4">
                {item.description}
              </p>

              <button className="mt-6 flex items-center gap-2 text-blue-600 font-medium">
                Read More
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}