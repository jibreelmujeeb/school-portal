import React from "react";
import {
  School,
  Target,
  Eye,
  Users,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Shield,
  Award,
} from "lucide-react";

const About = () => {
  const values = [
    {
      title: "Innovation",
      desc: "We embrace modern technology and continuous improvement to enhance education systems.",
      icon: <Lightbulb className="w-6 h-6" />,
    },
    {
      title: "Integrity",
      desc: "We maintain transparency, honesty, and trust in all our processes and relationships.",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "Excellence",
      desc: "We strive for the highest standards in education, technology, and customer service.",
      icon: <Award className="w-6 h-6" />,
    },
  ];

  const stats = [
    { label: "Active Students", value: "5,000+", color: "blue" },
    { label: "Courses Managed", value: "200+", color: "green" },
    { label: "Success Rate", value: "98%", color: "purple" },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-28 pb-16 px-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10"></div>

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl text-white mb-8">
            <School className="w-8 h-8" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold text-gray-900 mb-6">
            About Our Platform
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're dedicated to transforming education management with innovative technology, making it easier for schools, students, and teachers to succeed together.
          </p>
        </div>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <div className="group bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-2xl p-10 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                To provide a seamless, user-friendly digital platform that empowers schools to manage students, courses, and academic performance with efficiency, transparency, and measurable results.
              </p>
            </div>

            {/* Vision */}
            <div className="group bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-2xl p-10 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                <Eye className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                To become the leading education management platform in Africa and beyond, setting new standards for innovation, reliability, and impact in the education sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KEY METRICS SECTION */}
      <section className="px-6 py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">Our Impact</h2>
          
          <div className="grid gap-8 sm:grid-cols-3">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                <div className={`text-5xl sm:text-6xl font-bold mb-3 ${
                  stat.color === 'blue' ? 'bg-gradient-to-r from-blue-600 to-blue-700' :
                  stat.color === 'green' ? 'bg-gradient-to-r from-green-600 to-green-700' :
                  'bg-gradient-to-r from-purple-600 to-purple-700'
                } bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape how we serve our community
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="px-6 py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">Why Choose Us?</h2>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {[
              { title: "User-Friendly Interface", desc: "Intuitive design that requires minimal training" },
              { title: "Comprehensive Analytics", desc: "Real-time insights and detailed performance reports" },
              { title: "Secure & Reliable", desc: "Enterprise-grade security with 99.9% uptime" },
              { title: "24/7 Support", desc: "Dedicated support team ready to help anytime" },
              { title: "Scalable Solution", desc: "Grows with your school's needs" },
              { title: "Affordable Pricing", desc: "Flexible plans that fit your budget" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;