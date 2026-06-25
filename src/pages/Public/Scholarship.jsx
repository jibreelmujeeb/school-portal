import React from "react";
import {
  GraduationCap,
  Award,
  Calendar,
  CheckCircle,
  ArrowRight,
  DollarSign,
} from "lucide-react";

const scholarships = [
  {
    id: 1,
    title: "Academic Excellence Scholarship",
    category: "Merit-Based",
    amount: "100% Tuition Coverage",
    deadline: "August 30, 2026",
    eligibility:
      "Students with outstanding academic performance and a minimum score of 85%.",
  },
  {
    id: 2,
    title: "Sports Achievement Scholarship",
    category: "Sports",
    amount: "50% Tuition Coverage",
    deadline: "September 15, 2026",
    eligibility:
      "Students with exceptional achievements in sports competitions.",
  },
  {
    id: 3,
    title: "Need-Based Scholarship",
    category: "Financial Aid",
    amount: "Up to 75% Tuition Coverage",
    deadline: "September 10, 2026",
    eligibility:
      "Students from financially disadvantaged backgrounds.",
  },
];

export default function ScholarshipPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 text-center">

          <div className="w-20 h-20 mx-auto rounded-3xl border border-blue-200 flex items-center justify-center mb-6">
            <GraduationCap className="w-10 h-10 text-blue-600" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            Scholarship Opportunities
          </h1>

          <p className="text-gray-500 mt-5 text-lg max-w-3xl mx-auto">
            Discover scholarships designed to support talented,
            hardworking, and deserving students in achieving
            their educational goals.
          </p>

        </div>

      </section>

      {/* STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="border border-gray-200 rounded-3xl p-5">
            <Award className="w-6 h-6 text-blue-600 mb-3" />
            <h2 className="text-3xl font-bold">15+</h2>
            <p className="text-gray-500 text-sm">
              Scholarships
            </p>
          </div>

          <div className="border border-gray-200 rounded-3xl p-5">
            <GraduationCap className="w-6 h-6 text-green-600 mb-3" />
            <h2 className="text-3xl font-bold">500+</h2>
            <p className="text-gray-500 text-sm">
              Beneficiaries
            </p>
          </div>

          <div className="border border-gray-200 rounded-3xl p-5">
            <DollarSign className="w-6 h-6 text-purple-600 mb-3" />
            <h2 className="text-3xl font-bold">₦50M+</h2>
            <p className="text-gray-500 text-sm">
              Scholarship Support
            </p>
          </div>

          <div className="border border-gray-200 rounded-3xl p-5">
            <CheckCircle className="w-6 h-6 text-orange-600 mb-3" />
            <h2 className="text-3xl font-bold">95%</h2>
            <p className="text-gray-500 text-sm">
              Success Rate
            </p>
          </div>

        </div>

      </section>

      {/* SCHOLARSHIP LIST */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {scholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="border border-gray-200 rounded-3xl p-6"
            >

              <span className="inline-flex px-3 py-1 rounded-full text-xs border border-blue-200 bg-blue-50 text-blue-600">
                {scholarship.category}
              </span>

              <h3 className="text-xl font-bold mt-4">
                {scholarship.title}
              </h3>

              <div className="mt-4 flex items-center gap-2 text-green-600 font-medium">
                <DollarSign className="w-4 h-4" />
                {scholarship.amount}
              </div>

              <div className="mt-4 flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                Deadline: {scholarship.deadline}
              </div>

              <p className="mt-4 text-gray-600">
                {scholarship.eligibility}
              </p>

              <button className="mt-6 flex items-center gap-2 text-blue-600 font-medium">
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ))}

        </div>

      </section>

      {/* APPLICATION PROCESS */}
      <section className="border-t border-gray-200">

        <div className="max-w-5xl mx-auto px-4 md:px-6 py-16">

          <h2 className="text-3xl font-bold text-center mb-12">
            How to Apply
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full border border-blue-200 flex items-center justify-center font-bold text-blue-600">
                1
              </div>
              <h3 className="font-semibold mt-4">
                Choose Scholarship
              </h3>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full border border-blue-200 flex items-center justify-center font-bold text-blue-600">
                2
              </div>
              <h3 className="font-semibold mt-4">
                Complete Application
              </h3>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full border border-blue-200 flex items-center justify-center font-bold text-blue-600">
                3
              </div>
              <h3 className="font-semibold mt-4">
                Submit Documents
              </h3>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full border border-blue-200 flex items-center justify-center font-bold text-blue-600">
                4
              </div>
              <h3 className="font-semibold mt-4">
                Await Review
              </h3>
            </div>

          </div>

        </div>

      </section>
    </div>
  );
}