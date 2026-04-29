// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Auth/Login"; 
import Home from "../pages/Public/Home";

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
 

// Teacher pages
import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import TeacherAnnouncements from "../pages/Teacher/Announcement";
import TeacherAttendance from "../pages/Teacher/Attendance";
import TeacherClasses from "../pages/Teacher/Classes";
import TeacherGrades from "../pages/Teacher/Grades";
import TeacherProfile from "../pages/Teacher/Profile";
import TeacherResults from "../pages/Teacher/Results";
import TeacherAssignments from "../pages/Teacher/TeacherAssignments";



// Admin pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
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

      <Route path="/login" element={<Login />} />

      {/* STUDENT ROUTES */}
      <Route
        path="/student/*"
        element={
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
               <Route path="announcements" element={<TeacherAnnouncements />} />
              <Route path="attendance" element={<TeacherAttendance />} />
              <Route path="classes" element={<TeacherClasses />} />
              <Route path="grades" element={<TeacherGrades />} />
              <Route path="profile" element={<TeacherProfile />} />
              <Route path="results" element={<TeacherResults />} />
              <Route path="assignments" element={<TeacherAssignments />} />
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
              <Route path="grades" element={<AdminGrades />} /> 
              <Route path="profile" element={<AdminProfile />} /> 
              <Route path="results" element={<AdminResults />} /> 
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
