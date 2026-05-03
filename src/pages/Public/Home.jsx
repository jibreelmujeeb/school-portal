import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardList,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Shield,
  Zap,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import About from "./About";

const Home = () => {
  const features = [
    {
      title: "Course Management",
      desc: "Organize and manage subjects with comprehensive learning materials, resources, and structured curricula.",
      icon: <BookOpen className="w-8 h-8" />,
      color: "blue",
    },
    {
      title: "Assignment Tracking",
      desc: "Streamline assignment workflows with submission tracking, automated grading, and real-time feedback.",
      icon: <ClipboardList className="w-8 h-8" />,
      color: "green",
    },
    {
      title: "Performance Analytics",
      desc: "Comprehensive student records with grades, attendance tracking, and detailed performance metrics.",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "purple",
    },
  ];

  const roles = [
    {
      title: "Students",
      desc: "Access courses, track assignments, view grades, manage attendance, and stay updated with announcements.",
      icon: <GraduationCap className="w-8 h-8" />,
      benefits: ["View Results", "Track Progress", "Submit Assignments"],
    },
    {
      title: "Teachers",
      desc: "Manage classes, create assignments, track student performance, and generate comprehensive reports.",
      icon: <Users className="w-8 h-8" />,
      benefits: ["Create Classes", "Grade Students", "View Analytics"],
    },
    {
      title: "Administrators",
      desc: "Full control over users, institutional data, reporting, system settings, and platform management.",
      icon: <Shield className="w-8 h-8" />,
      benefits: ["Manage Users", "System Reports", "Settings Control"],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email",
      value: "info@schoolportal.com",
      color: "blue",
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone",
      value: "+234 800 000 0000",
      color: "green",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Location",
      value: "Ibadan, Nigeria",
      color: "purple",
    },
  ];

  const stats = [
    { label: "Active Users", value: "5,000+" },
    { label: "Schools", value: "50+" },
    { label: "Success Rate", value: "98%" },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white pt-32 pb-20 px-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20 -z-10"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6 text-sm font-medium">
            <Zap className="w-4 h-4" />
            The Future of School Management
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mt-6 leading-tight">
            Transform Your School with <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Smart Management</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            An intuitive, all-in-one platform designed for students, teachers, and administrators. Streamline operations, improve engagement, and drive academic excellence.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
              to="/login"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Get Started Now <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              Learn More
            </button>
          </div>

          <div className="mt-12 flex justify-center items-center gap-6 flex-wrap text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Trusted by 50+ Schools</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>5,000+ Active Users</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>98% Uptime</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="px-6 py-16 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 sm:grid-cols-3">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-gray-600 mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="px-6 py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Powerful Features Built for You</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your school efficiently and effectively
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl border border-gray-200 transition-all duration-300 hover:border-blue-300 hover:scale-105"
              >
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-5 transition-all duration-300 ${
                  item.color === 'blue' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
                  item.color === 'green' ? 'bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white' :
                  'bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'
                }`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES SECTION */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Built for Every Role</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored experiences for students, teachers, and administrators
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {roles.map((role, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white">
                    {role.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{role.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{role.desc}</p>
                
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  {role.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Get in Touch</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to us anytime
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid gap-8 sm:grid-cols-3 mb-16">
            {contactInfo.map((info, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${
                  info.color === 'blue' ? 'from-blue-50 to-white border-blue-200' :
                  info.color === 'green' ? 'from-green-50 to-white border-green-200' :
                  'from-purple-50 to-white border-purple-200'
                } rounded-xl p-8 border hover:shadow-lg transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${
                  info.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  info.color === 'green' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-600 font-medium">{info.value}</p>
              </div>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid gap-10 md:grid-cols-2">
            {/* Form */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-10 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h3>
              
              <form className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                ></textarea>
                
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 justify-center"
                >
                  Send Message <Mail className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Map & Info */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-10 text-white h-[300px] flex flex-col justify-center items-center">
                <MapPin className="w-12 h-12 mb-4 opacity-80" />
                <h4 className="text-2xl font-bold mb-2">Our Location</h4>
                <p className="text-blue-100 text-center">Ibadan, Nigeria</p>
              </div>
              
              <div className="bg-white rounded-xl p-8 border border-gray-200 space-y-4">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Business Hours</h4>
                <div className="space-y-3 text-gray-600">
                  <p className="flex justify-between"><span className="font-medium text-gray-900">Monday - Friday:</span> 8:00 AM - 5:00 PM</p>
                  <p className="flex justify-between"><span className="font-medium text-gray-900">Saturday:</span> 9:00 AM - 2:00 PM</p>
                  <p className="flex justify-between"><span className="font-medium text-gray-900">Sunday:</span> Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Link to Full Contact Page */}
          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200"
            >
              View Full Contact Page <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-gray-50">
        <About />
      </section>

      {/* FINAL CTA SECTION */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your School?</h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Join hundreds of schools already using our platform to streamline management and improve student outcomes.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/login"
              className="flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-200"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="#contact"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;