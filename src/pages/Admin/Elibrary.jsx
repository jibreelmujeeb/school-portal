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

const initialResources = [
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
  const [resources, setResources] = useState(initialResources);
  const filteredResources = resources.filter((resource) =>
    [resource.title, resource.subject, resource.type]
      .some((value) => value.toLowerCase().includes(search.trim().toLowerCase()))
  );
  const addResource = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title").trim();
    const subject = data.get("subject");
    const type = data.get("type");
    const file = data.get("file");
    if (!title || !subject || !type) return;
    setResources((current) => [{
      id: Date.now(),
      title,
      subject,
      type,
      fileName: file?.name || "",
      uploads: 0,
    }, ...current]);
    event.currentTarget.reset();
  };

  const editResource = (resource) => {
    const title = window.prompt("Resource title:", resource.title);
    if (title === null || !title.trim()) return;
    const subject = window.prompt("Subject:", resource.subject);
    if (subject === null || !subject.trim()) return;
    setResources((current) => current.map((item) =>
      item.id === resource.id ? { ...item, title: title.trim(), subject: subject.trim() } : item
    ));
  };

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

        <button onClick={() => document.getElementById("resource-title")?.focus()} className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-50">
          <Plus className="w-4 h-4" />
          Add Resource
        </button>

      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="border border-gray-200 rounded-3xl p-5">
          <BookOpen className="w-6 h-6 text-blue-600 mb-3" />

          <h2 className="text-3xl font-bold">
            {resources.length}
          </h2>

          <p className="text-sm text-gray-500">
            Total Resources
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <FileText className="w-6 h-6 text-green-600 mb-3" />

          <h2 className="text-3xl font-bold">
            {resources.filter((resource) => resource.type === "PDF").length}
          </h2>

          <p className="text-sm text-gray-500">
            PDF Documents
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Video className="w-6 h-6 text-red-600 mb-3" />

          <h2 className="text-3xl font-bold">
            {resources.filter((resource) => resource.type === "Video").length}
          </h2>

          <p className="text-sm text-gray-500">
            Video Lessons
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Download className="w-6 h-6 text-purple-600 mb-3" />

          <h2 className="text-3xl font-bold">
            {resources.reduce((total, resource) => total + resource.uploads, 0).toLocaleString()}
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

              {filteredResources.map((resource) => (
                <tr
                  key={resource.id}
                  className="border-b border-gray-100"
                >
                  <td className="py-4">
                    {resource.title}
                    {resource.fileName && <span className="block text-xs text-gray-500">{resource.fileName}</span>}
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

                      <button onClick={() => editResource(resource)} aria-label={`Edit ${resource.title}`} className="p-2 border border-blue-200 rounded-xl text-blue-600">
                        <Edit className="w-4 h-4" />
                      </button>

                      <button onClick={() => {
                        if (window.confirm(`Delete "${resource.title}"?`)) {
                          setResources((current) => current.filter((item) => item.id !== resource.id));
                        }
                      }} aria-label={`Delete ${resource.title}`} className="p-2 border border-red-200 rounded-xl text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
              {filteredResources.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-gray-500">
                    No resources match your search.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* QUICK UPLOAD */}
      <div className="border border-gray-200 rounded-3xl p-6">

        <h2 className="text-lg font-semibold mb-5">
          Upload Resource
        </h2>

        <form onSubmit={addResource} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            id="resource-title"
            name="title"
            required
            type="text"
            placeholder="Resource Title"
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none"
          />

          <select name="subject" required className="border border-gray-200 rounded-2xl px-4 py-3 outline-none">
            <option value="">Select Subject</option>
            <option>Mathematics</option>
            <option>English</option>
            <option>Physics</option>
          </select>

          <select name="type" required className="border border-gray-200 rounded-2xl px-4 py-3 outline-none">
            <option value="">Select Resource Type</option>
            <option>PDF</option>
            <option>Video</option>
            <option>Audio</option>
          </select>

          <input
            name="file"
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
        <p className="mt-3 text-xs text-gray-500">Resources are added to this page's in-memory sample list only; no file is uploaded or saved.</p>

      </div>

    </div>
  );
};

export default AdminELibraryPage;