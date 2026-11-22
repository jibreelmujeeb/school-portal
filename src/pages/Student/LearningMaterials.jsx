import React, { useState } from "react";
import {
  Search,
  BookOpen,
  FileText,
  Video,
  Download,
  ExternalLink,
  Calendar,
  User,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

const materials = [
  {
    id: 1,
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    type: "PDF",
    teacher: "Mr. Johnson",
    date: "2026-06-15",
  },
  {
    id: 2,
    title: "Chemical Reactions",
    subject: "Chemistry",
    type: "Video",
    teacher: "Mrs. Grace",
    date: "2026-06-17",
  },
  {
    id: 3,
    title: "English Grammar Notes",
    subject: "English",
    type: "DOCX",
    teacher: "Mrs. Sarah",
    date: "2026-06-18",
  },
  {
    id: 4,
    title: "Physics Practical Guide",
    subject: "Physics",
    type: "PDF",
    teacher: "Mr. James",
    date: "2026-06-20",
  },
];

export default function StudentLearningMaterials() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [downloadCount, setDownloadCount, downloadError] = usePersistentState(
    "student-learning-material-downloads",
    0,
  );

  const filteredMaterials = materials.filter(
    (item) =>
      (item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.subject.toLowerCase().includes(search.toLowerCase())) &&
      (typeFilter === "All" || item.type === typeFilter)
  );

  const downloadMaterial = (material) => {
    const content = `${material.title}\nSubject: ${material.subject}\nTeacher: ${material.teacher}\nDate: ${material.date}\n\nThis is a downloadable learning resource from the student portal.`;
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${material.title.replaceAll(" ", "-").toLowerCase()}.${material.type === "PDF" ? "txt" : "txt"}`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloadCount((count) => count + 1);
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Learning Materials
          </h1>

          <p className="text-gray-500 mt-2">
            Access study notes, textbooks, videos, presentations,
            worksheets, and other learning resources.
          </p>
        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <BookOpen className="text-blue-600 mb-3"/>
          <h2 className="text-3xl font-bold">145</h2>
          <p>Total Materials</p>
        </div>

        <div className="border rounded-3xl p-5">
          <FileText className="text-green-600 mb-3"/>
          <h2 className="text-3xl font-bold">98</h2>
          <p>Documents</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Video className="text-red-600 mb-3"/>
          <h2 className="text-3xl font-bold">32</h2>
          <p>Videos</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Download className="text-purple-600 mb-3"/>
          <h2 className="text-3xl font-bold">{downloadCount}</h2>
          <p>Your Downloads</p>
        </div>

      </div>

      {downloadError && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {downloadError}
        </p>
      )}

      {/* Search */}
      <div className="flex items-center gap-3 rounded-2xl border px-4 py-3">

        <Search className="text-gray-500 mr-3"/>

        <input
          type="text"
          placeholder="Search materials..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full outline-none"
        />

        <label className="shrink-0">
          <span className="sr-only">Filter material type</span>
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none"
          >
            {["All", "PDF", "Video", "DOCX"].map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>

      </div>

      {/* Materials */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredMaterials.map((material)=>(
          <div
            key={material.id}
            className="border rounded-3xl p-6 hover:shadow-lg transition"
          >

            <div className="flex justify-between">

              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                {material.subject}
              </span>

              <span className="text-sm text-gray-500">
                {material.type}
              </span>

            </div>

            <h2 className="text-lg font-semibold mt-5">
              {material.title}
            </h2>

            <div className="mt-5 space-y-2 text-gray-500 text-sm">

              <div className="flex items-center gap-2">
                <User size={16}/>
                {material.teacher}
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={16}/>
                {material.date}
              </div>

            </div>

            <div className="flex gap-3 mt-6">

              <button
                type="button"
                onClick={() => downloadMaterial(material)}
                className="flex-1 flex items-center justify-center gap-2 border rounded-xl py-2"
              >
                <Download size={16}/>
                Download
              </button>

              <button
                type="button"
                onClick={() => setSelectedMaterial(material)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl py-2"
              >
                <ExternalLink size={16}/>
                Open
              </button>

            </div>

          </div>
        ))}

      </div>

      {filteredMaterials.length === 0 && (
        <div className="rounded-3xl border border-gray-200 p-10 text-center text-sm text-gray-500">
          No learning materials match your search and filter.
        </div>
      )}

      {selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-blue-600">{selectedMaterial.subject}</p>
                <h2 className="mt-1 text-xl font-semibold">{selectedMaterial.title}</h2>
              </div>
              <button type="button" onClick={() => setSelectedMaterial(null)} className="rounded-lg border border-gray-200 px-3 py-1 text-sm">
                Close
              </button>
            </div>
            <div className="mt-5 space-y-2 text-sm text-gray-600">
              <p>Type: {selectedMaterial.type}</p>
              <p>Teacher: {selectedMaterial.teacher}</p>
              <p>Added: {selectedMaterial.date}</p>
            </div>
            <button
              type="button"
              onClick={() => downloadMaterial(selectedMaterial)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white"
            >
              <Download size={16} /> Download Material
            </button>
          </div>
        </div>
      )}

    </div>
  );
}