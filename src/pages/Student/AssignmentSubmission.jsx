import React from "react";
import {
  FileText,
  Calendar,
  Clock,
  Upload,
  CheckCircle,
  AlertCircle,
  Download,
  MessageSquare,
  Award,
} from "lucide-react";

const assignment = {
  title: "Mathematics Assignment 3",
  subject: "Mathematics",
  teacher: "Mr. James",
  dueDate: "25 June 2026",
  status: "Pending",
  marks: null,
  feedback: "",
  description:
    "Solve all questions from Chapter 8 and upload your completed work in PDF format.",
};

export default function StudentAssignmentSubmissionPage() {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Assignment Submission
          </h1>

          <p className="text-gray-500 mt-2">
            Upload your completed assignment before the submission deadline.
          </p>
        </div>

        <span className="px-4 py-2 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-sm w-fit">
          Pending Submission
        </span>

      </div>

      {/* ASSIGNMENT DETAILS */}
      <div className="border border-gray-200 rounded-3xl p-6">

        <div className="flex items-center gap-3 mb-5">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">
            {assignment.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="space-y-4">

            <div>
              <p className="text-gray-500 text-sm">Subject</p>
              <p className="font-medium">{assignment.subject}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Teacher</p>
              <p className="font-medium">{assignment.teacher}</p>
            </div>

          </div>

          <div className="space-y-4">

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Due: {assignment.dueDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-600" />
              <span>2 Days Remaining</span>
            </div>

          </div>

        </div>

        <div className="mt-6">

          <h3 className="font-semibold mb-2">
            Instructions
          </h3>

          <p className="text-gray-600">
            {assignment.description}
          </p>

        </div>

        <button className="mt-6 flex items-center gap-2 px-5 py-3 border border-blue-600 rounded-2xl text-blue-600 hover:bg-blue-50">
          <Download className="w-4 h-4" />
          Download Assignment
        </button>

      </div>

      {/* SUBMISSION FORM */}
      <div className="border border-gray-200 rounded-3xl p-6">

        <h2 className="text-xl font-semibold mb-6">
          Submit Assignment
        </h2>

        <form className="space-y-5">

          <textarea
            rows="5"
            placeholder="Write comments for your teacher (optional)..."
            className="w-full border border-gray-200 rounded-2xl p-4 outline-none resize-none"
          />

          <input
            type="file"
            className="w-full border border-gray-200 rounded-2xl p-3"
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-blue-600 rounded-2xl text-blue-600 hover:bg-blue-50"
          >
            <Upload className="w-4 h-4" />
            Submit Assignment
          </button>

        </form>

      </div>

      {/* SUBMISSION STATUS */}
      <div className="border border-gray-200 rounded-3xl p-6">

        <div className="flex items-center gap-3 mb-5">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-semibold">
            Submission Status
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <p className="text-gray-500 text-sm">
              Current Status
            </p>

            <span className="inline-flex mt-2 px-4 py-2 rounded-full border border-orange-200 bg-orange-50 text-orange-600">
              Pending
            </span>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Submitted On
            </p>

            <p className="font-medium">
              Not Submitted Yet
            </p>

          </div>

        </div>

      </div>

      {/* RESULT & FEEDBACK */}
      <div className="border border-gray-200 rounded-3xl p-6">

        <div className="flex items-center gap-3 mb-5">

          <Award className="w-6 h-6 text-purple-600" />

          <h2 className="text-xl font-semibold">
            Marks & Teacher Feedback
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <p className="text-gray-500 text-sm">
              Marks
            </p>

            <p className="text-3xl font-bold mt-2">
              --
            </p>

          </div>

          <div>

            <div className="flex items-start gap-3">

              <MessageSquare className="w-5 h-5 text-blue-600 mt-1" />

              <p className="text-gray-600">
                Feedback will appear here after your teacher grades your assignment.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* IMPORTANT NOTICE */}
      <div className="border border-yellow-200 bg-yellow-50 rounded-3xl p-6">

        <div className="flex items-start gap-3">

          <AlertCircle className="w-6 h-6 text-yellow-600 mt-1" />

          <div>

            <h3 className="font-semibold">
              Submission Guidelines
            </h3>

            <ul className="list-disc ml-5 mt-3 text-gray-600 space-y-2">
              <li>Accepted formats: PDF, DOCX, ZIP, JPG, PNG.</li>
              <li>Maximum file size: 20 MB.</li>
              <li>Submit before the deadline.</li>
              <li>Resubmission is allowed only if enabled by the teacher.</li>
            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}