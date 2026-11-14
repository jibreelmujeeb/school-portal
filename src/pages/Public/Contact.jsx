import React, { useState } from "react";
import PublicLayout from "../../components/PublicLayout";
import { Mail, Phone, MapPin, Send, X } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="px-6 py-16 max-w-5xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          Contact Us
        </h1>
        <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Have questions or need help? Reach out to us and we’ll respond as soon as possible.
        </p>
      </section>

      {/* CONTACT INFO */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* Email */}
          <div className="border border-gray-200 rounded-2xl p-6 bg-white text-center">
            <div className="flex justify-center mb-3">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium mb-1">Email</h3>
            <p className="text-sm text-gray-600">school@email.com</p>
          </div>

          {/* Phone */}
          <div className="border border-gray-200 rounded-2xl p-6 bg-white text-center">
            <div className="flex justify-center mb-3">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium mb-1">Phone</h3>
            <p className="text-sm text-gray-600">+234 800 000 0000</p>
          </div>

          {/* Location */}
          <div className="border border-gray-200 rounded-2xl p-6 bg-white text-center">
            <div className="flex justify-center mb-3">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium mb-1">Location</h3>
            <p className="text-sm text-gray-600">Ibadan, Nigeria</p>
          </div>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="px-6 py-16 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2">
          {/* FORM */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Send a Message</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none"
              />

              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none"
              />

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* MAP */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Our Location</h2>

            <div className="border border-gray-200 rounded-2xl h-[300px] flex items-center justify-center text-sm text-gray-500">
              Map Placeholder
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Message sent</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <p className="text-sm text-gray-600">
              Thanks for reaching out. Your message has been received and our team will respond soon.
            </p>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
};

export default Contact;