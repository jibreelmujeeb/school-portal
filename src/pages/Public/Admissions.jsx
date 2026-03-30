import React from "react";
import PublicLayout from "../../components/PublicLayout";
import {
  FileText,
  Upload,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const Admissions = () => {
  const steps = [
    {
      title: "Fill Application Form",
      desc: "Provide your personal and academic details.",
      icon: <FileText className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Upload Documents",
      desc: "Submit required documents for verification.",
      icon: <Upload className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Get Approved",
      desc: "Receive confirmation and start learning.",
      icon: <CheckCircle className="w-6 h-6 text-purple-600" />,
    },
  ];

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="px-6 py-16 max-w-5xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          Admissions
        </h1>
        <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Join our school in a few simple steps. Follow the process below to get started.
        </p>
      </section>

      {/* STEPS */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-2xl p-6 bg-white flex flex-col gap-3"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                {step.icon}
              </div>
              <h3 className="font-medium text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="px-6 py-16 border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
            Admission Requirements
          </h2>

          <ul className="grid gap-4 sm:grid-cols-2 text-sm text-gray-600">
            <li className="border border-gray-200 rounded-xl p-4">
              Birth Certificate
            </li>
            <li className="border border-gray-200 rounded-xl p-4">
              Previous School Results
            </li>
            <li className="border border-gray-200 rounded-xl p-4">
              Passport Photograph
            </li>
            <li className="border border-gray-200 rounded-xl p-4">
              Parent/Guardian Information
            </li>
          </ul>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-center">
          Apply Now
        </h2>

        <form className="border border-gray-200 rounded-2xl p-6 bg-white space-y-5">
          {/* NAME */}
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="First Name"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none"
            />
          </div>

          {/* EMAIL + PHONE */}
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none"
            />
          </div>

          {/* CLASS */}
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none">
            <option>Select Class</option>
            <option>Creche</option>
             <option>nursery</option>
              <option>Primary</option>
            <option>Secondary</option>
          </select>

          {/* MESSAGE */}
          <textarea
            rows="4"
            placeholder="Additional Information"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none"
          />

          {/* BUTTON */}
          <button className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition">
            Submit Application <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </section>
    </PublicLayout>
  );
};

export default Admissions;