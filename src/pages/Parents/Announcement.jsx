import React, { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Megaphone, Search } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "PTA Meeting",
    description:
      "The PTA meeting will hold on Friday by 10:00 AM in the school hall.",
    date: "2026-05-15",
    category: "Meeting",
    details:
      "Parents and guardians are invited to attend. The meeting will cover the term's academic progress, upcoming activities, and questions from families.",
  },
  {
    id: 2,
    title: "Examination Timetable Released",
    description: "The second term examination timetable has been published.",
    date: "2026-05-12",
    category: "Academic",
    details:
      "Please review the timetable with your child and contact the school office if you need a printed copy or have a timetable question.",
  },
  {
    id: 3,
    title: "School Resumption",
    description: "Students are expected to resume on Monday next week.",
    date: "2026-05-10",
    category: "General",
    details:
      "Students should arrive before the first lesson and bring the required books and learning materials for the new school week.",
  },
];

export default function ParentAnnouncementsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const categories = [...new Set(announcements.map((item) => item.category))];

  const filteredAnnouncements = useMemo(() => {
    const query = search.trim().toLowerCase();
    return announcements.filter((item) => {
      const matchesSearch = [
        item.title,
        item.description,
        item.category,
        item.details,
      ].some((value) => value.toLowerCase().includes(query));
      return matchesSearch && (category === "All" || item.category === category);
    });
  }, [category, search]);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Announcements</h1>
        <p className="mt-2 text-sm text-gray-600">
          Find important updates and information from the school.
        </p>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center gap-3 rounded-xl border px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-gray-500" />
          <span className="sr-only">Search announcements</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search announcements..."
            className="w-full outline-none"
          />
        </label>
        <label className="flex items-center gap-2 rounded-xl border px-4 py-3">
          <span className="text-sm text-gray-500">Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="bg-transparent text-sm outline-none"
          >
            <option>All</option>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <section className="space-y-5" aria-label="School announcements">
        {filteredAnnouncements.map((item) => {
          const expanded = expandedId === item.id;
          return (
            <article
              key={item.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-blue-300"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs text-blue-700">
                    <Megaphone className="h-3 w-3" />
                    {item.category}
                  </span>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                  {expanded && (
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
                      {item.details}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CalendarDays className="h-4 w-4" />
                    {item.date}
                  </div>
                </div>
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setExpandedId(expanded ? null : item.id)}
                  className="flex shrink-0 items-center gap-2 self-start text-sm text-blue-700 hover:underline"
                >
                  {expanded ? "Show Less" : "Read More"}
                  <ArrowRight className={`h-4 w-4 transition ${expanded ? "rotate-90" : ""}`} />
                </button>
              </div>
            </article>
          );
        })}
        {filteredAnnouncements.length === 0 && (
          <p className="rounded-2xl border border-dashed p-8 text-center text-sm text-gray-500">
            No announcements match your search.
          </p>
        )}
      </section>
    </div>
  );
}
