import React from "react";
import {
  CalendarDays,
  Clock3,
  BookOpen,
  User,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

const timetable = [
  {
    id: 1,
    subject: "Mathematics",
    teacher: "Mr. Johnson",
    class: "SS2",
    time: "08:00 AM - 09:00 AM",
    day: "Monday",
  },
  {
    id: 2,
    subject: "Physics",
    teacher: "Mrs. Grace",
    class: "SS3",
    time: "09:00 AM - 10:00 AM",
    day: "Tuesday",
  },
  {
    id: 3,
    subject: "English",
    teacher: "Mr. Daniel",
    class: "JSS3",
    time: "10:00 AM - 11:00 AM",
    day: "Wednesday",
  },
];

const AdminTimetablePage = () => {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Timetable Management
          </h1>

          <p className="text-sm text-gray-600 mt-2">
            Manage school schedules and class periods
          </p>
        </div>

        {/* ADD TIMETABLE */}
        <button className="flex items-center justify-center gap-2 px-5 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Plus className="w-4 h-4" />
          Add Schedule
        </button>

      </section>

      {/* TIMETABLE LIST */}
      <section className="space-y-5">

        {timetable.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-2xl p-5 bg-white"
          >
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

              {/* LEFT */}
              <div className="space-y-4">

                {/* SUBJECT */}
                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg">
                      {item.subject}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {item.class}
                    </p>
                  </div>

                </div>

                {/* DETAILS */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">

                  {/* TEACHER */}
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-green-600" />
                    {item.teacher}
                  </div>

                  {/* DAY */}
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-purple-600" />
                    {item.day}
                  </div>

                  {/* TIME */}
                  <div className="flex items-center gap-1">
                    <Clock3 className="w-4 h-4 text-orange-600" />
                    {item.time}
                  </div>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">

                {/* EDIT */}
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition">
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>

                {/* DELETE */}
                <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-full text-sm hover:bg-red-50 transition">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}

      </section>

      {/* EMPTY STATE */}
      {timetable.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No timetable schedules available.
        </div>
      )}

    </div>
  );
};

export default AdminTimetablePage;