import React, { useState } from "react";
import {
  Image,
  Search,
  Camera,
  Calendar,
} from "lucide-react";

const galleryItems = [
  {
    id: 1,
    title: "Graduation Ceremony",
    category: "Events",
    date: "June 2026",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
  },
  {
    id: 2,
    title: "Science Laboratory",
    category: "Academics",
    date: "May 2026",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
  },
  {
    id: 3,
    title: "Sports Competition",
    category: "Sports",
    date: "April 2026",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  },
  {
    id: 4,
    title: "Cultural Day",
    category: "Events",
    date: "March 2026",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865",
  },
  {
    id: 5,
    title: "Library Session",
    category: "Academics",
    date: "February 2026",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  {
    id: 6,
    title: "School Excursion",
    category: "Trips",
    date: "January 2026",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
];

export default function GalleryPage() {
  const [search, setSearch] = useState("");

  const filteredImages = galleryItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">

          <div className="text-center max-w-3xl mx-auto">
            <div className="w-20 h-20 mx-auto rounded-3xl border border-blue-200 flex items-center justify-center mb-6">
              <Camera className="w-10 h-10 text-blue-600" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold">
              School Gallery
            </h1>

            <p className="text-gray-500 mt-5 text-lg">
              Explore memorable moments, school events,
              academic activities, sports competitions,
              excursions, and achievements.
            </p>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="border border-gray-200 rounded-3xl p-5">
            <h2 className="text-3xl font-bold">500+</h2>
            <p className="text-gray-500 text-sm">
              Photos
            </p>
          </div>

          <div className="border border-gray-200 rounded-3xl p-5">
            <h2 className="text-3xl font-bold">40+</h2>
            <p className="text-gray-500 text-sm">
              Events
            </p>
          </div>

          <div className="border border-gray-200 rounded-3xl p-5">
            <h2 className="text-3xl font-bold">20+</h2>
            <p className="text-gray-500 text-sm">
              Competitions
            </p>
          </div>

          <div className="border border-gray-200 rounded-3xl p-5">
            <h2 className="text-3xl font-bold">15+</h2>
            <p className="text-gray-500 text-sm">
              Excursions
            </p>
          </div>

        </div>

      </section>

      {/* SEARCH */}
      <section className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3">

          <Search className="w-5 h-5 text-gray-500 mr-3" />

          <input
            type="text"
            placeholder="Search gallery..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full outline-none"
          />

        </div>

      </section>

      {/* GALLERY GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredImages.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-3xl overflow-hidden group cursor-pointer"
            >

              <div className="overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                />

              </div>

              <div className="p-5">

                <span className="inline-flex px-3 py-1 rounded-full text-xs border border-blue-200 bg-blue-50 text-blue-600">
                  {item.category}
                </span>

                <h3 className="text-lg font-semibold mt-4">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">

                  <Calendar className="w-4 h-4" />

                  {item.date}

                </div>

              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}