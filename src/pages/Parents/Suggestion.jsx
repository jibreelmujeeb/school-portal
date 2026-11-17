import React, { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Lightbulb,
  MessageSquare,
  Send,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

const initialSuggestions = [
  {
    id: 1,
    title: "Improve School Transport",
    message: "More buses should be added for students living far from school.",
    status: "Under Review",
    date: "2026-05-18",
  },
  {
    id: 2,
    title: "Weekend Extra Classes",
    message: "Weekend revision classes would help students prepare better for exams.",
    status: "Approved",
    date: "2026-05-15",
  },
];

const ParentSuggestionPage = () => {
  const [suggestions, setSuggestions, storageError] = usePersistentState(
    "parent-portal-suggestions",
    initialSuggestions
  );
  const [formData, setFormData] = useState({ title: "", message: "" });
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = formData.title.trim();
    const message = formData.message.trim();
    if (!title || !message) {
      setFormError("Enter both a title and suggestion details.");
      setSubmitted(false);
      return;
    }

    setSuggestions((current) => [
      {
        id: Date.now(),
        title,
        message,
        status: "Pending",
        date: new Date().toISOString().slice(0, 10),
      },
      ...current,
    ]);
    setFormData({ title: "", message: "" });
    setFormError("");
    setSubmitted(true);
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Parent Suggestions</h1>
        <p className="mt-2 text-sm text-gray-600">
          Share ideas and feedback with the school management.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="mb-5 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-semibold">Submit Suggestion</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="parent-suggestion-title"
              className="mb-2 block text-sm text-gray-600"
            >
              Suggestion Title
            </label>
            <input
              id="parent-suggestion-title"
              type="text"
              maxLength={100}
              placeholder="Enter title"
              value={formData.title}
              onChange={(event) => {
                setFormData((current) => ({ ...current, title: event.target.value }));
                setSubmitted(false);
              }}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="parent-suggestion-message"
              className="mb-2 block text-sm text-gray-600"
            >
              Suggestion Details
            </label>
            <textarea
              id="parent-suggestion-message"
              rows="5"
              maxLength={2000}
              placeholder="Write your suggestion..."
              value={formData.message}
              onChange={(event) => {
                setFormData((current) => ({ ...current, message: event.target.value }));
                setSubmitted(false);
              }}
              className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              required
            />
            <p className="mt-1 text-right text-xs text-gray-500">
              {formData.message.length}/2000
            </p>
          </div>
          {(storageError || formError) && (
            <p role="alert" className="text-sm text-red-600">
              {storageError || formError}
            </p>
          )}
          {submitted && !storageError && (
            <p role="status" className="text-sm text-green-700">
              Suggestion submitted and saved in this browser.
            </p>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm text-white transition hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
            Submit Suggestion
          </button>
        </form>
      </section>

      <section className="space-y-4" aria-label="Submitted suggestions">
        {suggestions.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
                  {item.message}
                </p>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                School feedback
              </span>
              <span className="flex items-center gap-1">
                <Clock3 className="h-4 w-4" />
                {item.date}
              </span>
            </div>
          </article>
        ))}
        {suggestions.length === 0 && (
          <p className="text-center text-sm text-gray-500">
            No suggestions submitted yet.
          </p>
        )}
      </section>
    </div>
  );
};

function StatusBadge({ status }) {
  const isApproved = status === "Approved";
  const isReviewing = status === "Under Review";
  const Icon = isApproved ? CheckCircle2 : isReviewing ? AlertCircle : Clock3;
  const styles = isApproved
    ? "border-green-200 bg-green-50 text-green-700"
    : isReviewing
      ? "border-orange-200 bg-orange-50 text-orange-700"
      : "border-gray-200 bg-gray-50 text-gray-700";
  return (
    <span className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm ${styles}`}>
      <Icon className="h-4 w-4" />
      {status}
    </span>
  );
}

export default ParentSuggestionPage;
