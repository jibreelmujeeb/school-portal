import React, { useState } from "react";
import {
  Images,
  Upload,
  Search,
  Trash2,
  Edit,
  Eye,
  Plus,
  ImageIcon,
  Video,
  Star,
} from "lucide-react";

const initialGalleryItems = [
  {
    id: 1,
    title: "Graduation Ceremony 2026",
    category: "Events",
    type: "Image",
    date: "2026-06-15",
    views: 1250,
    featured: true,
  },
  {
    id: 2,
    title: "Science Fair",
    category: "Academics",
    type: "Image",
    date: "2026-06-10",
    views: 850,
    featured: false,
  },
  {
    id: 3,
    title: "Sports Competition",
    category: "Sports",
    type: "Video",
    date: "2026-06-05",
    views: 1420,
    featured: true,
  },
];

export default function AdminGalleryPage() {
  const [search, setSearch] = useState("");
  const [galleryItems, setGalleryItems] = useState(initialGalleryItems);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const visibleGallery = galleryItems.filter((item) =>
    [item.title, item.category, item.type]
      .some((value) => value.toLowerCase().includes(search.trim().toLowerCase()))
  );

  const addMedia = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title").trim();
    const category = data.get("category");
    const file = data.get("file");
    if (!title || !category || !file?.name) return;
    setGalleryItems((current) => [{
      id: Date.now(),
      title,
      category,
      fileName: file.name,
      type: /\.(mp4|mov|webm)$/i.test(file.name) ? "Video" : "Image",
      date: new Date().toISOString().slice(0, 10),
      views: 0,
      featured: false,
    }, ...current]);
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Gallery Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage gallery images, videos, albums,
            and featured media content.
          </p>
        </div>

        <button onClick={() => document.getElementById("gallery-title")?.focus()} className="flex items-center gap-2 px-5 py-3 border border-blue-600 rounded-2xl text-blue-600 hover:bg-blue-50">
          <Plus className="w-4 h-4" />
          Upload Media
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="border border-gray-200 rounded-3xl p-5">
          <Images className="w-6 h-6 text-blue-600 mb-3" />
          <h2 className="text-3xl font-bold">{galleryItems.length}</h2>
          <p className="text-sm text-gray-500">
            Total Media Files
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <ImageIcon className="w-6 h-6 text-green-600 mb-3" />
          <h2 className="text-3xl font-bold">{galleryItems.filter((item) => item.type === "Image").length}</h2>
          <p className="text-sm text-gray-500">
            Images
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Video className="w-6 h-6 text-purple-600 mb-3" />
          <h2 className="text-3xl font-bold">{galleryItems.filter((item) => item.type === "Video").length}</h2>
          <p className="text-sm text-gray-500">
            Videos
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Star className="w-6 h-6 text-orange-600 mb-3" />
          <h2 className="text-3xl font-bold">{galleryItems.filter((item) => item.featured).length}</h2>
          <p className="text-sm text-gray-500">
            Featured Media
          </p>
        </div>

      </div>

      {/* SEARCH */}
      <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3">

        <Search className="w-5 h-5 text-gray-500 mr-3" />

        <input
          type="text"
          placeholder="Search gallery..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none"
        />

      </div>

      {/* MEDIA GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {visibleGallery.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-3xl overflow-hidden"
          >

            <div className="h-52 bg-gray-100 flex items-center justify-center">
              {item.type === "Image" ? (
                <ImageIcon className="w-16 h-16 text-gray-400" />
              ) : (
                <Video className="w-16 h-16 text-gray-400" />
              )}
            </div>

            <div className="p-5">

              <div className="flex items-center justify-between">

                <span className="px-3 py-1 rounded-full text-xs border border-blue-200 bg-blue-50 text-blue-600">
                  {item.category}
                </span>

                {item.featured && (
                  <Star className="w-4 h-4 text-orange-500" />
                )}

              </div>

              <h3 className="font-semibold text-lg mt-4">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {item.views} Views
              </p>

              <div className="flex gap-2 mt-5">

                <button onClick={() => setSelectedMedia(item)} title="View media details" className="flex-1 border border-blue-200 rounded-xl py-2 text-blue-600">
                  <Eye className="w-4 h-4 mx-auto" />
                </button>

                <button onClick={() => {
                  const title = window.prompt("Media title:", item.title);
                  if (title === null || !title.trim()) return;
                  const category = window.prompt("Category:", item.category);
                  if (category === null || !category.trim()) return;
                  setGalleryItems((current) => current.map((media) => media.id === item.id ? { ...media, title: title.trim(), category: category.trim() } : media));
                }} aria-label={`Edit ${item.title}`} className="flex-1 border border-green-200 rounded-xl py-2 text-green-600">
                  <Edit className="w-4 h-4 mx-auto" />
                </button>

                <button onClick={() => {
                  if (window.confirm(`Delete "${item.title}"?`)) {
                    setGalleryItems((current) => current.filter((media) => media.id !== item.id));
                  }
                }} aria-label={`Delete ${item.title}`} className="flex-1 border border-red-200 rounded-xl py-2 text-red-600">
                  <Trash2 className="w-4 h-4 mx-auto" />
                </button>

              </div>

            </div>

          </div>
        ))}

        {visibleGallery.length === 0 && <p className="col-span-full py-8 text-center text-sm text-gray-500">No gallery items match your search.</p>}

      </div>

      {/* QUICK UPLOAD */}
      <div className="border border-gray-200 rounded-3xl p-6">

        <h2 className="text-lg font-semibold mb-5">
          Upload New Media
        </h2>

        <form onSubmit={addMedia} className="grid md:grid-cols-2 gap-4">

          <input
            id="gallery-title"
            name="title"
            required
            type="text"
            placeholder="Media Title"
            className="border border-gray-200 rounded-2xl px-4 py-3"
          />

          <select name="category" required className="border border-gray-200 rounded-2xl px-4 py-3">
            <option value="">Select Category</option>
            <option>Events</option>
            <option>Sports</option>
            <option>Academics</option>
            <option>Graduation</option>
          </select>

          <input
            name="file"
            type="file"
            required
            accept="image/*,video/*"
            className="border border-gray-200 rounded-2xl px-4 py-3"
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 py-3 border border-blue-600 rounded-2xl text-blue-600 hover:bg-blue-50"
          >
            <Upload className="w-4 h-4" />
            Upload Media
          </button>

        </form>
        <p className="mt-3 text-xs text-gray-500">This demo records media details locally only. The selected file is not uploaded or saved.</p>

      </div>

      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md space-y-3 rounded-2xl bg-white p-6">
            <h2 className="text-lg font-semibold">{selectedMedia.title}</h2>
            <p className="text-sm text-gray-600">{selectedMedia.category} · {selectedMedia.type}</p>
            <p className="text-sm text-gray-500">Added {selectedMedia.date} · {selectedMedia.views} sample views</p>
            {selectedMedia.fileName && <p className="text-sm text-gray-500">Selected file: {selectedMedia.fileName} (not uploaded)</p>}
            <button onClick={() => setSelectedMedia(null)} className="rounded-xl border px-4 py-2">Close</button>
          </div>
        </div>
      )}

    </div>
  );
}