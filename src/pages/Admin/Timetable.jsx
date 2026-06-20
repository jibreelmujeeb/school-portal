import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarDays,
  Clock3,
  BookOpen,
  User,
  Plus,
  Pencil,
  Trash2,
  X,
  Filter,
  GraduationCap,
} from "lucide-react";
import {
  addTimetableItem,
  deleteTimetableItem,
  updateTimetableItem,
} from "../../store/timetableSlice";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const initialFormData = {
  id: "",
  subject: "",
  teacher: "",
  class: "",
  day: "Monday",
  startTime: "08:00",
  endTime: "09:00",
};

const AdminTimetablePage = () => {
  const dispatch = useDispatch();
  const timetable = useSelector((state) => state.timetable.items);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingScheduleId, setEditingScheduleId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const uniqueClasses = [
    ...new Set(timetable.map((schedule) => schedule.class)),
  ].sort();

  const filteredTimetable = timetable.filter((item) => {
    const dayMatches = selectedDay === "" || item.day === selectedDay;
    const classMatches = selectedClass === "" || item.class === selectedClass;

    return dayMatches && classMatches;
  });

  const openAddModal = () => {
    setEditingScheduleId(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const openEditModal = (schedule) => {
    setEditingScheduleId(schedule.id);
    setFormData({
      id: schedule.id,
      subject: schedule.subject,
      teacher: schedule.teacher,
      class: schedule.class,
      day: schedule.day,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingScheduleId(null);
    setFormData(initialFormData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const schedulePayload = {
      id: formData.id || `SCH-${String(timetable.length + 1).padStart(3, "0")}`,
      subject: formData.subject,
      teacher: formData.teacher,
      class: formData.class,
      day: formData.day,
      startTime: formData.startTime,
      endTime: formData.endTime,
    };

    if (editingScheduleId) {
      dispatch(
        updateTimetableItem({
          originalId: editingScheduleId,
          item: schedulePayload,
        }),
      );
    } else {
      dispatch(addTimetableItem(schedulePayload));
    }

    closeModal();
  };

  const handleDelete = (scheduleId) => {
    dispatch(deleteTimetableItem(scheduleId));
  };

  return (
    <div className="space-y-8">
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

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-5 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
        >
          <Plus className="w-4 h-4" />
          Add Schedule
        </button>
      </section>

      {/* FILTERS */}
      <section className="flex flex-col sm:flex-row sm:items-center gap-3">
        <button
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Filter</span>
        </button>

        {showFilters && (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedDay}
                onChange={(event) => setSelectedDay(event.target.value)}
                className="rounded-xl border border-gray-300 bg-white pl-9 pr-4 py-2 text-sm outline-none focus:border-blue-600"
              >
                <option value="">Day</option>
                {weekdays.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <GraduationCap className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedClass}
                onChange={(event) => setSelectedClass(event.target.value)}
                className="rounded-xl border border-gray-300 bg-white pl-9 pr-4 py-2 text-sm outline-none focus:border-blue-600"
              >
                <option value="">Class</option>
                {uniqueClasses.map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </section>

      {/* TIMETABLE LIST */}
      <section className="space-y-5">
        {filteredTimetable.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-2xl p-5 bg-white"
          >
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg">{item.subject}</h2>
                    <p className="text-sm text-gray-500">{item.class}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-green-600" />
                    {item.teacher}
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-purple-600" />
                    {item.day}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock3 className="w-4 h-4 text-orange-600" />
                    {item.startTime} - {item.endTime}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => openEditModal(item)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-full text-sm hover:bg-red-50 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {filteredTimetable.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No timetable schedules available for the selected filters.
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {editingScheduleId ? "Edit Schedule" : "Add Schedule"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {editingScheduleId
                    ? "Update the class timetable details below."
                    : "Fill in the class schedule details below."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Mathematics"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Teacher
                  </label>
                  <input
                    type="text"
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleChange}
                    placeholder="Mr. Johnson"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Class
                  </label>
                  <input
                    type="text"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    placeholder="SS2"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Day
                  </label>
                  <select
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                  >
                    {weekdays.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Schedule ID
                  </label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="SCH-004"
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="mt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-gray-300 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-full bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
                >
                  {editingScheduleId ? "Update Schedule" : "Save Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTimetablePage;
