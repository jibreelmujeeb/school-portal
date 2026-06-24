import React, { useState } from "react";
import {
  Search,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const faqs = [
  {
    id: 1,
    category: "Admissions",
    question: "How can I apply for admission?",
    answer:
      "You can apply online through the admissions page or visit the school admission office.",
  },
  {
    id: 2,
    category: "Fees",
    question: "What payment methods are accepted?",
    answer:
      "We accept bank transfers, online payments, POS payments, and approved installment plans.",
  },
  {
    id: 3,
    category: "Academics",
    question: "When does the academic session begin?",
    answer:
      "The academic session typically begins in September. Official dates are announced yearly.",
  },
  {
    id: 4,
    category: "Examinations",
    question: "How can students check their results?",
    answer:
      "Students can access results through the student portal using their login credentials.",
  },
  {
    id: 5,
    category: "Transportation",
    question: "Does the school provide transportation services?",
    answer:
      "Yes, transportation services are available for selected routes.",
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(null);

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      faq.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const toggleFAQ = (id) => {
    setActive(active === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="border-b border-gray-200">

        <div className="max-w-5xl mx-auto px-4 md:px-6 py-16 text-center">

          <div className="w-20 h-20 mx-auto rounded-3xl border border-blue-200 flex items-center justify-center mb-6">
            <HelpCircle className="w-10 h-10 text-blue-600" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            Frequently Asked Questions
          </h1>

          <p className="text-gray-500 mt-5 text-lg">
            Find answers to common questions about admissions,
            academics, fees, examinations, and school life.
          </p>

        </div>

      </section>

      {/* SEARCH */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-10">

        <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3">

          <Search className="w-5 h-5 text-gray-500 mr-3" />

          <input
            type="text"
            placeholder="Search FAQs..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full outline-none"
          />

        </div>

      </section>

      {/* FAQ LIST */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 pb-16">

        <div className="space-y-4">

          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-3xl overflow-hidden"
            >

              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >

                <div>

                  <span className="inline-flex px-3 py-1 rounded-full text-xs border border-blue-200 bg-blue-50 text-blue-600 mb-3">
                    {faq.category}
                  </span>

                  <h3 className="font-semibold text-lg">
                    {faq.question}
                  </h3>

                </div>

                {active === faq.id ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}

              </button>

              {active === faq.id && (
                <div className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </div>
              )}

            </div>
          ))}

        </div>

      </section>

      {/* CONTACT SUPPORT */}
      <section className="border-t border-gray-200">

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 text-center">

          <h2 className="text-2xl font-bold">
            Still Have Questions?
          </h2>

          <p className="text-gray-500 mt-4">
            Contact our admissions or support team for
            additional assistance.
          </p>

          <button className="mt-6 px-6 py-3 rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-50">
            Contact Us
          </button>

        </div>

      </section>

    </div>
  );
}