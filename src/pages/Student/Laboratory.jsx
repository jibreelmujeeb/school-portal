import React from "react";
import {
  FlaskConical,
  Calendar,
  FileText,
  Download,
  Shield,
  Award,
  Clock,
  BookOpen,
} from "lucide-react";

const practicals = [
  {
    id: 1,
    subject: "Physics",
    experiment: "Ohm's Law Verification",
    date: "15 Jun 2026",
    status: "Upcoming",
  },
  {
    id: 2,
    subject: "Chemistry",
    experiment: "Acid-Base Titration",
    date: "10 Jun 2026",
    status: "Completed",
  },
  {
    id: 3,
    subject: "Biology",
    experiment: "Plant Cell Observation",
    date: "18 Jun 2026",
    status: "Upcoming",
  },
];

const StudentLaboratoryPage = () => {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          Laboratory
        </h1>

        <p className="text-gray-500 mt-2">
          Manage practical activities, laboratory schedules,
          reports, and experiment resources.
        </p>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="border border-gray-200 rounded-3xl p-5">
          <FlaskConical className="w-6 h-6 mb-3 text-blue-600" />
          <h2 className="text-3xl font-bold">24</h2>
          <p className="text-sm text-gray-500">
            Total Practicals
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Clock className="w-6 h-6 mb-3 text-orange-600" />
          <h2 className="text-3xl font-bold">3</h2>
          <p className="text-sm text-gray-500">
            Upcoming Sessions
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Award className="w-6 h-6 mb-3 text-green-600" />
          <h2 className="text-3xl font-bold">87%</h2>
          <p className="text-sm text-gray-500">
            Practical Score
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <FileText className="w-6 h-6 mb-3 text-purple-600" />
          <h2 className="text-3xl font-bold">12</h2>
          <p className="text-sm text-gray-500">
            Reports Submitted
          </p>
        </div>

      </div>

      {/* PRACTICAL SCHEDULE */}
      <div className="border border-gray-200 rounded-3xl p-6">

        <div className="flex items-center gap-2 mb-5">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">
            Practical Schedule
          </h2>
        </div>

        <div className="space-y-4">

          {practicals.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
            >
              <div>
                <h3 className="font-semibold">
                  {item.experiment}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {item.subject}
                </p>
              </div>

              <div className="text-sm text-gray-500">
                {item.date}
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs w-fit ${
                  item.status === "Completed"
                    ? "border border-green-200 bg-green-50 text-green-600"
                    : "border border-orange-200 bg-orange-50 text-orange-600"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}

        </div>

      </div>

      {/* LAB RESOURCES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="border border-gray-200 rounded-3xl p-6">

          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold">
              Experiment Guides
            </h2>
          </div>

          <div className="space-y-3">

            <div className="flex items-center justify-between border border-gray-200 rounded-xl p-3">
              <span>Physics Practical Manual</span>

              <button>
                <Download className="w-5 h-5 text-blue-600" />
              </button>
            </div>

            <div className="flex items-center justify-between border border-gray-200 rounded-xl p-3">
              <span>Chemistry Lab Guide</span>

              <button>
                <Download className="w-5 h-5 text-blue-600" />
              </button>
            </div>

          </div>

        </div>

        {/* SAFETY GUIDELINES */}
        <div className="border border-gray-200 rounded-3xl p-6">

          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-red-600" />
            <h2 className="font-semibold">
              Safety Guidelines
            </h2>
          </div>

          <ul className="space-y-3 text-sm text-gray-600">

            <li>
              • Always wear protective equipment.
            </li>

            <li>
              • Follow teacher instructions carefully.
            </li>

            <li>
              • Handle chemicals with caution.
            </li>

            <li>
              • Report accidents immediately.
            </li>

            <li>
              • Keep workstations clean.
            </li>

          </ul>

        </div>

      </div>

      {/* REPORT SUBMISSION */}
      <div className="border border-gray-200 rounded-3xl p-6">

        <h2 className="text-lg font-semibold mb-5">
          Submit Practical Report
        </h2>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="Experiment Title"
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none"
          />

          <textarea
            rows="5"
            placeholder="Write your report..."
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none resize-none"
          />

          <input
            type="file"
            className="w-full border border-gray-200 rounded-2xl px-4 py-3"
          />

          <button
            type="submit"
            className="px-6 py-3 rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Submit Report
          </button>

        </form>

      </div>

    </div>
  );
};

export default StudentLaboratoryPage;