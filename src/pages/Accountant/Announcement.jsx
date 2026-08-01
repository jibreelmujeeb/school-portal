import React, { useState } from "react";
import {
  Megaphone,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Pin,
  Send,
  Copy,
  Trash2,
} from "lucide-react";

const announcements = [
  {
    id: "ANN001",
    title: "School Fee Payment Reminder",
    audience: "Parents",
    category: "Fee Payment",
    status: "Published",
    date: "2026-07-31",
  },
  {
    id: "ANN002",
    title: "Scholarship Registration Opens",
    audience: "Students",
    category: "Scholarship",
    status: "Scheduled",
    date: "2026-08-10",
  },
];

export default function AccountantAnnouncementsPage() {
  const [search, setSearch] = useState("");

  const filtered = announcements.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.audience.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Announcements
          </h1>

          <p className="text-gray-500 mt-2">
            Create and manage financial announcements for the school community.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18}/>
          New Announcement
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Megaphone className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">84</h2>
          <p>Total</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Send className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">58</h2>
          <p>Published</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Edit className="text-yellow-600 mb-3"/>
          <h2 className="text-2xl font-bold">15</h2>
          <p>Drafts</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Pin className="text-red-600 mb-3"/>
          <h2 className="text-2xl font-bold">11</h2>
          <p>Scheduled</p>
        </div>

      </div>

      {/* Search */}

      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex-1 flex items-center border rounded-xl px-4 py-3">

          <Search className="mr-3"/>

          <input
            placeholder="Search announcements..."
            className="outline-none w-full"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>

        <button className="border rounded-xl px-5 flex items-center gap-2">
          <Filter size={18}/>
          Filter
        </button>

      </div>

      {/* Table */}

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">
        

        <table className="w-full min-w-[1100px]">

          <thead className="bg-gray-50">

            <tr>
              <th>Title</th>
              <th>Audience</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filtered.map((item)=>(

              <tr key={item.id} className="border-t">

                <td>{item.title}</td>
                <td>{item.audience}</td>
                <td>{item.category}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full ${
                      item.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Scheduled"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>{item.date}</td>

                <td>

                  <div className="flex gap-2">

                    <button className="border rounded-lg p-2">
                      <Eye size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Edit size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Pin size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Copy size={16}/>
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
  );
}