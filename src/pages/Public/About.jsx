import React from "react";
import PublicLayout from "../../components/PublicLayout";
import {
  School,
  Target,
  Eye,
  Users,
  BookOpen,
  GraduationCap,
} from "lucide-react";

const About = () => {
  return (
    <PublicLayout>
      {/* HERO */}
      <section className="px-6 py-16 max-w-5xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-50 rounded-full">
            <School className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
          About Our School Portal
        </h1>

        <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Our platform is designed to simplify school management by connecting
          students, teachers, and administrators in one clean and efficient system.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Mission */}
          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <Target className="w-6 h-6 text-green-600 mb-3" />
            <h2 className="font-semibold text-lg mb-2">Our Mission</h2>
            <p className="text-sm text-gray-600">
              To provide a seamless digital experience that improves how schools
              manage students, courses, and academic performance.
            </p>
          </div>

          {/* Vision */}
          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <Eye className="w-6 h-6 text-purple-600 mb-3" />
            <h2 className="font-semibold text-lg mb-2">Our Vision</h2>
            <p className="text-sm text-gray-600">
              To become a leading platform for modern education systems across
              Africa and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* STATS / HIGHLIGHTS */}
      <section className="px-6 py-16 border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 text-center">
          <div className="flex flex-col items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold">1,200+</h3>
            <p className="text-sm text-gray-600">Students</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <BookOpen className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-semibold">45+</h3>
            <p className="text-sm text-gray-600">Courses</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <GraduationCap className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-semibold">98%</h3>
            <p className="text-sm text-gray-600">Success Rate</p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-10">
          Our Core Values
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <h3 className="font-medium mb-2">Innovation</h3>
            <p className="text-sm text-gray-600">
              We embrace modern technology to improve education systems.
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <h3 className="font-medium mb-2">Integrity</h3>
            <p className="text-sm text-gray-600">
              We maintain transparency and trust in all processes.
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <h3 className="font-medium mb-2">Excellence</h3>
            <p className="text-sm text-gray-600">
              We strive for high standards in education and management.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default About;