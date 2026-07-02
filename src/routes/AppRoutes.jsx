// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Auth/Login"; 
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import ProtectedRoute from "../auth/ProtectedRoute";
import Home from "../pages/Public/Home";
import About from "../pages/Public/About";
import Admissions from "../pages/Public/Admissions";
import Contact from "../pages/Public/Contact";

// Student pages
import StudentDashboard from "../pages/Student/StudentDashboard";
import Courses from "../pages/Student/Courses";
import StudentAssignments from "../pages/Student/Assignments";
import StudentAttendance from "../pages/Student/Attendance";
import StudentFees from "../pages/Student/Fees";
import StudentProfile from "../pages/Student/Profile";
import StudentTimetable from "../pages/Student/Timetable";
import StudentAnnouncements from "../pages/Student/Announcement";
import StudentGrades from "../pages/Student/StudentGrades";
import StudentResult from "../pages/Student/Results";
import StudentSettings from "../pages/Student/Settings";
import StudentNotifications from "../pages/Student/Notifications";
 

// Teacher pages
import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import TeacherAnnouncements from "../pages/Teacher/Announcement";
import TeacherAttendance from "../pages/Teacher/Attendance";
import TeacherClasses from "../pages/Teacher/Classes";
import TeacherGrades from "../pages/Teacher/Grades";
import TeacherProfile from "../pages/Teacher/Profile";
import TeacherResults from "../pages/Teacher/Results";
import TeacherAssignments from "../pages/Teacher/TeacherAssignments";
import TeacherSettings from "../pages/Teacher/Settings";
import TeacherNotifications from "../pages/Teacher/Notifications";



// Admin pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminUsers from "../pages/Admin/Users";
import AdminStudents from "../pages/Admin/Students";
import AdminClasses from "../pages/Admin/Classes";
import AdminFees from "../pages/Admin/Fees";
import AdminReports from "../pages/Admin/Reports";
import AdminSettings from "../pages/Admin/Settings";
import AdminTeachers from "../pages/Admin/Teachers";
import AdminSubjects from "../pages/Admin/Subjects";
import AdminAnnouncements from "../pages/Admin/Announcements";
import AdminGrades from "../pages/Admin/Grade";
import AdminProfile from "../pages/Admin/Profile";
import AdminResults from "../pages/Admin/Results";



const AppRoutes = () => {
  return (
    <Routes>

       <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/admissions" element={<Admissions />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* STUDENT ROUTES */}
      <Route
        path="/student/*"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <Layout role="student">
              <Routes>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="courses" element={<Courses />} />
                <Route path="assignments" element={<StudentAssignments />} />
                <Route path="attendance" element={<StudentAttendance />} />
                <Route path="fees" element={<StudentFees />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="timetable" element={<StudentTimetable />} />
                <Route path="grades" element={<StudentGrades/>} />
                <Route path="announcements" element={<StudentAnnouncements/>} />
                <Route path="results" element={<StudentResult />} />
                <Route path="settings" element={<StudentSettings />} />
                <Route path="notifications" element={<StudentNotifications />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* TEACHER ROUTES */}
      <Route
        path="/teacher/*"
        element={
          <ProtectedRoute allowedRoles={["TEACHER"]}>
            <Layout role="teacher">
              <Routes>
                <Route path="dashboard" element={<TeacherDashboard />} />
                 <Route path="announcements" element={<TeacherAnnouncements />} />
                <Route path="attendance" element={<TeacherAttendance />} />
                <Route path="classes" element={<TeacherClasses />} />
                <Route path="grades" element={<TeacherGrades />} />
                <Route path="profile" element={<TeacherProfile />} />
                <Route path="results" element={<TeacherResults />} />
                <Route path="assignments" element={<TeacherAssignments />} />
                <Route path="settings" element={<TeacherSettings />} />
                <Route path="notifications" element={<TeacherNotifications />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* ADMIN ROUTES */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Layout role="admin">
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="students" element={<AdminStudents />} />
                <Route path="classes" element={<AdminClasses />} />
                <Route path="fees" element={<AdminFees/>} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="settings" element={<AdminSettings/>} />
                <Route path="teachers" element={<AdminTeachers />} />
                <Route path="subjects" element={<AdminSubjects />} />
                <Route path="announcements" element={<AdminAnnouncements />} /> 
                <Route path="grades" element={<AdminGrades />} /> 
                <Route path="profile" element={<AdminProfile />} /> 
                <Route path="results" element={<AdminResults />} /> 
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
