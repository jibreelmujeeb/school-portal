import React, { useState } from "react";

import {
  Lightbulb,
  Send,
  MessageSquare,
  Clock3,
  CheckCircle2,
  AlertCircle,
  BookOpen,
} from "lucide-react";

const initialSuggestions = [
  {
    id: 1,
    title: "Digital Classroom Upgrade",
    message:
      "Interactive smart boards should be installed in senior classrooms.",
    category: "Infrastructure",
    status: "Under Review",
    date: "2026-05-20",
  },
  {
    id: 2,
    title: "More Practical Sessions",
    message:
      "Science subjects should include additional laboratory sessions.",
    category: "Academics",
    status: "Approved",
    date: "2026-05-17",
  },
];

const TeacherSuggestionPage = () => {
  const [suggestions, setSuggestions] =
    useState(initialSuggestions);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.message
    )
      return;

    const newSuggestion = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      message: formData.message,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };

    setSuggestions([newSuggestion, ...suggestions]);

    setFormData({
      title: "",
      category: "",
      message: "",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return {
          icon: (
            <CheckCircle2 className="w-4 h-4" />
          ),
          style:
            "border-green-200 bg-green-50 text-green-600",
        };

      case "Under Review":
        return {
          icon: (
            <AlertCircle className="w-4 h-4" />
          ),
          style:
            "border-orange-200 bg-orange-50 text-orange-600",
        };

      default:
        return {
          icon: (
            <Clock3 className="w-4 h-4" />
          ),
          style:
            "border-gray-200 bg-gray-50 text-gray-600",
        };
    }
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Teacher Suggestions
        </h1>

        <p className="text-sm text-gray-600 mt-2">
          Share professional ideas and recommendations with school management
        </p>
      </section>

      {/* FORM */}
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

          {/* CATEGORY */}
          <div>

            <label className="text-sm text-gray-500 mb-2 block">
              Category
            </label>

            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">

              <BookOpen className="w-4 h-4 text-gray-500 mr-2" />

              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
                className="w-full outline-none text-sm bg-transparent"
              >
                <option value="">
                  Select category
                </option>

                <option value="Academics">
                  Academics
                </option>

                <option value="Infrastructure">
                  Infrastructure
                </option>

                <option value="Technology">
                  Technology
                </option>

                <option value="Administration">
                  Administration
                </option>

              </select>

            </div>

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

          {/* BUTTON */}
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
          >
            <Send className="w-4 h-4" />
            Submit Suggestion
          </button>

        </form>

      </section>

      {/* SUGGESTIONS */}
      <section className="space-y-5">

        {suggestions.map((item) => {
          const statusData = getStatusStyle(item.status);

          return (
            <div
              key={item.id}
              className="border border-gray-200 rounded-2xl p-5 bg-white"
            >
              <div className="space-y-4">

                {/* TOP */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

                  <div>

                    {/* CATEGORY */}
                    <span className="inline-flex items-center gap-1 px-3 py-1 border border-blue-200 rounded-full text-xs text-blue-600 bg-blue-50 mb-3">
                      <BookOpen className="w-3 h-3" />
                      {item.category}
                    </span>

                    <h2 className="text-lg font-semibold">
                      {item.title}
                    </h2>

                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      {item.message}
                    </p>

                  </div>

                  {/* STATUS */}
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm w-fit ${statusData.style}`}
                  >
                    {statusData.icon}
                    {item.status}
                  </div>

                </div>

                {/* FOOTER */}
                <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">

                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    Discussion Enabled
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock3 className="w-4 h-4" />
                    {item.date}
                  </div>

                </div>

              </div>
            </div>
          );
        })}

      </section>

      {/* EMPTY */}
      {suggestions.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No suggestions submitted yet.
        </div>
      )}

    </div>
  );
};

export default TeacherSuggestionPage;