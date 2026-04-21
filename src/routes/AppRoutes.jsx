// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Auth/Login"; 

// Student pages
import StudentDashboard from "../pages/Student/StudentDashboard";
import Courses from "../pages/Student/Courses";

// Teacher pages
import TeacherDashboard from "../pages/Teacher/TeacherDashboard";

// Admin pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Home from "../pages/Public/Home";
import AdminStudents from "../pages/Admin/Students";
import AdminClasses from "../pages/Admin/Classes";
import AdminFees from "../pages/Admin/Fees";
import AdminReports from "../pages/Admin/Reports";
import AdminSettings from "../pages/Admin/Settings";
import AdminTeachers from "../pages/Admin/Teachers";
import AdminSubjects from "../pages/Admin/Subjects";
import AdminAnnouncements from "../pages/Admin/Announcements";


const AppRoutes = () => {
  return (
    <Routes>

       <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      {/* STUDENT ROUTES */}
      <Route
        path="/student/*"
        element={
          <Layout role="student">
            <Routes>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="courses" element={<Courses />} />
            </Routes>
          </Layout>
        }
      />

      {/* TEACHER ROUTES */}
      <Route
        path="/teacher/*"
        element={
          <Layout role="teacher">
            <Routes>
              <Route path="dashboard" element={<TeacherDashboard />} />
            </Routes>
          </Layout>
        }
      />

      {/* ADMIN ROUTES */}
      <Route
        path="/admin/*"
        element={
          <Layout role="admin">
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="classes" element={<AdminClasses />} />
              <Route path="fees" element={<AdminFees/>} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings/>} />
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="subjects" element={<AdminSubjects />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
