import React, { useState } from "react";
import {
  Search,
  BookOpen,
  Download,
  Star,
  Video,
  Headphones,
  Filter,
} from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Advanced Mathematics",
    subject: "Mathematics",
    type: "Book",
    author: "John Smith",
    downloads: 245,
  },
  {
    id: 2,
    title: "English Grammar Mastery",
    subject: "English",
    type: "Book",
    author: "Grace Johnson",
    downloads: 180,
  },
  {
    id: 3,
    title: "Physics Video Tutorial",
    subject: "Physics",
    type: "Video",
    author: "David Wilson",
    downloads: 320,
  },
  {
    id: 4,
    title: "Chemistry Audio Revision",
    subject: "Chemistry",
    type: "Audio",
    author: "Sarah Adams",
    downloads: 150,
  },
];

const StudentELibraryPage = () => {
  const [search, setSearch] = useState("");

  const getTypeIcon = (type) => {
    switch (type) {
      case "Video":
        return (
          <Video className="w-5 h-5 text-red-500" />
        );

      case "Audio":
        return (
          <Headphones className="w-5 h-5 text-purple-500" />
        );

      default:
        return (
          <BookOpen className="w-5 h-5 text-blue-500" />
        );
    }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <section>

        <h1 className="text-2xl md:text-3xl font-bold">
          E-Library
        </h1>

        <p className="text-gray-500 mt-2">
          Access books, videos, audio lessons, and study materials
        </p>

      </section>

      {/* STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="border border-gray-200 rounded-3xl p-5">
          <p className="text-gray-500 text-sm">
            Total Resources
          </p>

          <h2 className="text-3xl font-bold mt-2">
            1,240
          </h2>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <p className="text-gray-500 text-sm">
            Books
          </p>

          <h2 className="text-3xl font-bold mt-2">
            820
          </h2>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <p className="text-gray-500 text-sm">
            Videos
          </p>

          <h2 className="text-3xl font-bold mt-2">
            290
          </h2>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <p className="text-gray-500 text-sm">
            Audio Lessons
          </p>

          <h2 className="text-3xl font-bold mt-2">
            130
          </h2>
        </div>

      </section>

      {/* SEARCH + FILTER */}
      <section className="flex flex-col lg:flex-row gap-4">

        <div className="flex-1 flex items-center border border-gray-200 rounded-2xl px-4 py-3">

          <Search className="w-4 h-4 text-gray-500 mr-2" />

          <input
            type="text"
            placeholder="Search books and resources..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full outline-none"
          />

        </div>

        <button className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-200 rounded-2xl">
          <Filter className="w-4 h-4" />
          Filter
        </button>

      </section>

      {/* RESOURCE GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {resources.map((resource) => (
          <div
            key={resource.id}
            className="border border-gray-200 rounded-3xl p-6"
          >

            {/* TOP */}
            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center">
                {getTypeIcon(resource.type)}
              </div>

              <button>
                <Star className="w-5 h-5 text-gray-400" />
              </button>

            </div>

            {/* CONTENT */}
            <div className="mt-5">

              <span className="inline-flex px-3 py-1 rounded-full text-xs border border-blue-200 bg-blue-50 text-blue-600">
                {resource.subject}
              </span>

              <h2 className="text-lg font-semibold mt-4">
                {resource.title}
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                By {resource.author}
              </p>

            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between mt-6">

              <span className="text-sm text-gray-500">
                {resource.downloads} Downloads
              </span>

              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition">

                <Download className="w-4 h-4" />

                Download

              </button>

            </div>

          </div>
        ))}

      </section>

    </div>
  );
};

export default StudentELibraryPage;