import React, { useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Calendar,
  FileText,
  Edit,
  Trash2,
  Eye,
  Download,
  Save,
  Send,
} from "lucide-react";

const lessonNotes = [
  {
    id: 1,
    title: "Introduction to Algebra",
    subject: "Mathematics",
    class: "SS1",
    week: "Week 2",
    date: "2026-06-12",
    status: "Published",
  },
  {
    id: 2,
    title: "Chemical Reactions",
    subject: "Chemistry",
    class: "SS2",
    week: "Week 3",
    date: "2026-06-15",
    status: "Draft",
  },
];

export default function TeacherLessonNotesPage() {
  const [search, setSearch] = useState("");

  const filteredNotes = lessonNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Lesson Notes
          </h1>

          <p className="text-gray-500 mt-2">
            Create, organize, and manage lesson notes for your classes.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl">
          <Plus size={18} />
          New Lesson Note
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <BookOpen className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">48</h2>
          <p>Total Notes</p>
        </div>

        <div className="border rounded-3xl p-5">
          <FileText className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">36</h2>
          <p>Published</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Save className="text-yellow-600 mb-3"/>
          <h2 className="text-2xl font-bold">12</h2>
          <p>Drafts</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Calendar className="text-purple-600 mb-3"/>
          <h2 className="text-2xl font-bold">14</h2>
          <p>This Month</p>
        </div>

      </div>

      {/* Search */}
      <div className="flex items-center border rounded-2xl px-4 py-3">

        <Search className="mr-3 text-gray-500"/>

        <input
          type="text"
          placeholder="Search lesson notes..."
          className="w-full outline-none"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </div>

      {/* Lesson Notes Table */}
      <div className="border rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-gray-50">

              <tr>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Subject</th>
                <th className="text-left p-4">Class</th>
                <th className="text-left p-4">Week</th>
                <th className="text-left p-4">Status</th>
                <th className="text-center p-4">Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredNotes.map((note)=>(
                <tr key={note.id} className="border-t">

                  <td className="p-4">{note.title}</td>

                  <td className="p-4">{note.subject}</td>

                  <td className="p-4">{note.class}</td>

                  <td className="p-4">{note.week}</td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        note.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {note.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button className="border rounded-lg p-2">
                        <Eye size={16}/>
                      </button>

                      <button className="border rounded-lg p-2">
                        <Edit size={16}/>
                      </button>

                      <button className="border rounded-lg p-2">
                        <Download size={16}/>
                      </button>

                      <button className="border rounded-lg p-2">
                        <Trash2 size={16}/>
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Lesson Note Form */}
      <div className="border rounded-3xl p-6">

        <h2 className="text-xl font-semibold mb-6">
          Create Lesson Note
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Lesson Title"
            className="border rounded-xl px-4 py-3"
          />

          <select className="border rounded-xl px-4 py-3">
            <option>Select Subject</option>
            <option>Mathematics</option>
            <option>English</option>
            <option>Chemistry</option>
          </select>

          <select className="border rounded-xl px-4 py-3">
            <option>Select Class</option>
            <option>JSS1</option>
            <option>SS1</option>
            <option>SS2</option>
          </select>

          <input
            type="text"
            placeholder="Week"
            className="border rounded-xl px-4 py-3"
          />

        </div>

        <textarea
          rows="8"
          placeholder="Write your lesson note..."
          className="border rounded-xl w-full mt-5 p-4"
        />

        <input
          type="file"
          className="mt-5"
        />

        <div className="flex gap-3 mt-6">

          <button className="border px-5 py-3 rounded-xl flex items-center gap-2">
            <Save size={18}/>
            Save Draft
          </button>

          <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
            <Send size={18}/>
            Publish
          </button>

        </div>

      </div>

    </div>
  );
}