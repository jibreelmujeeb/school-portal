import React, { useState } from "react";

import {
  Lightbulb,
  Send,
  MessageSquare,
  ThumbsUp,
  Clock3,
} from "lucide-react";

const initialSuggestions = [
  {
    id: 1,
    title: "Add More Science Equipment",
    message:
      "The laboratory needs additional practical materials for experiments.",
    likes: 18,
    status: "Under Review",
    date: "2026-05-20",
  },
  {
    id: 2,
    title: "Improve School WiFi",
    message:
      "Internet access in the library should be improved for students.",
    likes: 25,
    status: "Approved",
    date: "2026-05-18",
  },
];

const StudentSuggestionBoardPage = () => {
  const [suggestions, setSuggestions] =
    useState(initialSuggestions);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.message) return;

    const newSuggestion = {
      id: Date.now(),
      title: formData.title,
      message: formData.message,
      likes: 0,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };

    setSuggestions([newSuggestion, ...suggestions]);

    setFormData({
      title: "",
      message: "",
    });
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Suggestion Board
        </h1>

        <p className="text-sm text-gray-600 mt-2">
          Share your ideas and suggestions to improve the school
        </p>
      </section>

      {/* SUBMIT FORM */}
      <section className="border border-gray-200 rounded-2xl p-5 bg-white">

        <div className="flex items-center gap-2 mb-5">

          <Lightbulb className="w-5 h-5 text-yellow-500" />

          <h2 className="text-lg font-semibold">
            Submit Suggestion
          </h2>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* TITLE */}
          <div>

            <label className="text-sm text-gray-500 mb-2 block">
              Suggestion Title
            </label>

            <input
              type="text"
              placeholder="Enter suggestion title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none text-sm"
            />

          </div>

          {/* MESSAGE */}
          <div>

            <label className="text-sm text-gray-500 mb-2 block">
              Suggestion Details
            </label>

            <textarea
              rows="5"
              placeholder="Write your suggestion..."
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none text-sm resize-none"
            />

          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
          >
            <Send className="w-4 h-4" />
            Submit Suggestion
          </button>

        </form>

      </section>

      {/* SUGGESTIONS LIST */}
      <section className="space-y-5">

        {suggestions.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-2xl p-5 bg-white"
          >
            <div className="space-y-4">

              {/* TOP */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

                <div>

                  <h2 className="text-lg font-semibold">
                    {item.title}
                  </h2>

                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {item.message}
                  </p>

                </div>

                {/* STATUS */}
                <div
                  className={`px-4 py-2 rounded-full text-sm border w-fit ${
                    item.status === "Approved"
                      ? "border-green-200 bg-green-50 text-green-600"
                      : item.status === "Under Review"
                      ? "border-orange-200 bg-orange-50 text-orange-600"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                >
                  {item.status}
                </div>

              </div>

              {/* BOTTOM */}
              <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">

                {/* COMMENTS */}
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  Discussion Open
                </div>

                {/* LIKES */}
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  {item.likes} Likes
                </div>

                {/* DATE */}
                <div className="flex items-center gap-1">
                  <Clock3 className="w-4 h-4" />
                  {item.date}
                </div>

              </div>

            </div>
          </div>
        ))}

      </section>

      {/* EMPTY STATE */}
      {suggestions.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No suggestions submitted yet.
        </div>
      )}

    </div>
  );
};

export default StudentSuggestionBoardPage;