import React, { useState } from "react";
import {
  BookOpen,
  Upload,
  Search,
  FileText,
  Video,
  Headphones,
  Download,
  Trash2,
  Edit,
  Plus,
} from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Advanced Mathematics",
    subject: "Mathematics",
    type: "PDF",
    uploads: 245,
  },
  {
    id: 2,
    title: "Physics Practical Guide",
    subject: "Physics",
    type: "PDF",
    uploads: 180,
  },
  {
    id: 3,
    title: "Biology Video Lesson",
    subject: "Biology",
    type: "Video",
    uploads: 320,
  },
];

const AdminELibraryPage = () => {
  const [search, setSearch] = useState("");

  const getIcon = (type) => {
    switch (type) {
      case "Video":
        return (
          <Video className="w-5 h-5 text-red-600" />
        );

      case "Audio":
        return (
          <Headphones className="w-5 h-5 text-purple-600" />
        );

      default:
        return (
          <FileText className="w-5 h-5 text-blue-600" />
        );
    }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            E-Library Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage digital learning resources across the school.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-50">
          <Plus className="w-4 h-4" />
          Add Resource
        </button>

      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="border border-gray-200 rounded-3xl p-5">
          <BookOpen className="w-6 h-6 text-blue-600 mb-3" />

          <h2 className="text-3xl font-bold">
            1,250
          </h2>

          <p className="text-sm text-gray-500">
            Total Resources
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <FileText className="w-6 h-6 text-green-600 mb-3" />

          <h2 className="text-3xl font-bold">
            820
          </h2>

          <p className="text-sm text-gray-500">
            PDF Documents
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Video className="w-6 h-6 text-red-600 mb-3" />

          <h2 className="text-3xl font-bold">
            290
          </h2>

          <p className="text-sm text-gray-500">
            Video Lessons
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Download className="w-6 h-6 text-purple-600 mb-3" />

          <h2 className="text-3xl font-bold">
            15,430
          </h2>

          <p className="text-sm text-gray-500">
            Total Downloads
          </p>
        </div>

      </div>

      {/* SEARCH */}
      <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3">

        <Search className="w-5 h-5 text-gray-500 mr-3" />

        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full outline-none"
        />

      </div>

      {/* RESOURCE TABLE */}
      <div className="border border-gray-200 rounded-3xl p-6">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3">
                  Resource
                </th>
                <th className="text-left py-3">
                  Subject
                </th>
                <th className="text-left py-3">
                  Type
                </th>
                <th className="text-left py-3">
                  Downloads
                </th>
                <th className="text-left py-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {resources.map((resource) => (
                <tr
                  key={resource.id}
                  className="border-b border-gray-100"
                >
                  <td className="py-4">
                    {resource.title}
                  </td>

                  <td>{resource.subject}</td>

                  <td>
                    <div className="flex items-center gap-2">
                      {getIcon(resource.type)}
                      {resource.type}
                    </div>
                  </td>

                  <td>{resource.uploads}</td>

                  <td>
                    <div className="flex gap-2">

                      <button className="p-2 border border-blue-200 rounded-xl text-blue-600">
                        <Edit className="w-4 h-4" />
                      </button>

                      <button className="p-2 border border-red-200 rounded-xl text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* QUICK UPLOAD */}
      <div className="border border-gray-200 rounded-3xl p-6">

        <h2 className="text-lg font-semibold mb-5">
          Upload Resource
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Resource Title"
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none"
          />

          <select className="border border-gray-200 rounded-2xl px-4 py-3 outline-none">
            <option>Select Subject</option>
            <option>Mathematics</option>
            <option>English</option>
            <option>Physics</option>
          </select>

          <select className="border border-gray-200 rounded-2xl px-4 py-3 outline-none">
            <option>Select Resource Type</option>
            <option>PDF</option>
            <option>Video</option>
            <option>Audio</option>
          </select>

          <input
            type="file"
            className="border border-gray-200 rounded-2xl px-4 py-3"
          />

          <button
            type="submit"
            className="md:col-span-2 flex items-center justify-center gap-2 py-3 rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <Upload className="w-4 h-4" />
            Upload Resource
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminELibraryPage;