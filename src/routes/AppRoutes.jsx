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
import StudentSettings from "../pages/Student/Settings";
import StudentNotifications from "../pages/Student/Notifications";
import StudentSuggestion from "../pages/Student/Suggestion";
import StudentSubjects from "../pages/Student/Subjects";
import StudentELibrary from "../pages/Student/ELibrary";
import StudentLibrary from "../pages/Student/Library";
import StudentLaboratory from "../pages/Student/Laboratory";

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
import TeacherSuggestion from "../pages/Teacher/Suggestion";
import TeacherSubjects from "../pages/Teacher/Subjects";

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
import AdminCourses from "../pages/Admin/Courses";
import AdminTimetable from "../pages/Admin/Timetable";
import AdminAttendance from "../pages/Admin/Attendance";
import AdminFinance from "../pages/Admin/Finance";
import AnalyticsDashboard from "../pages/Admin/AnalyticsDashboard";
import AdminSuggestion from "../pages/Admin/Suggestion";
import AdminNotifications from "../pages/Admin/Notification";
import AdminELibrary from "../pages/Admin/ELibrary";
import AdminLibrary from "../pages/Admin/Library";
import AdminLaboratory from "../pages/Admin/Laboratory";

// Parent pages
import ParentDashboard from "../pages/Parents/ParentDashboard";
import ParentResults from "../pages/Parents/Results ";
import ParentFees from "../pages/Parents/Fees";
import ParentNotifications from "../pages/Parents/Notification";
import ParentAttendance from "../pages/Parents/Attendance";
import ParentProfile from "../pages/Parents/Profile";
import ParentSettings from "../pages/Parents/Settings";
import ParentAnnouncements from "../pages/Parents/Announcement";
import ParentAssignments from "../pages/Parents/Assignment";
import ParentSuggestion from "../pages/Parents/Suggestion";
import ParentSubjects from "../pages/Parents/Subjects";

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
              <Route path="grades" element={<StudentGrades />} />
              <Route path="announcements" element={<StudentAnnouncements />} />
              <Route path="results" element={<StudentResult />} />
              <Route path="settings" element={<StudentSettings />} />
              <Route path="notifications" element={<StudentNotifications />} />
              <Route path="suggestion" element={<StudentSuggestion />} />
              <Route path="subjects" element={<StudentSubjects />} />
              <Route path="e-library" element={<StudentELibrary />} />
              <Route path="library" element={<StudentLibrary />} />
              <Route path="laboratory" element={<StudentLaboratory />} />
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
              <Route path="settings" element={<TeacherSettings />} />
              <Route path="notifications" element={<TeacherNotifications />} />
              <Route path="suggestion" element={<TeacherSuggestion />} />
              <Route path="subjects" element={<TeacherSubjects />} />
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
              <Route path="fees" element={<AdminFees />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="subjects" element={<AdminSubjects />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
              <Route path="grades" element={<AdminGrades />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="results" element={<AdminResults />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="timetable" element={<AdminTimetable />} />
              <Route path="attendance" element={<AdminAttendance />} />
              <Route path="finance" element={<AdminFinance />} />
              <Route path="analytics" element={<AnalyticsDashboard />} />
              <Route path="suggestion" element={<AdminSuggestion />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="e-library" element={<AdminELibrary />} />
              <Route path="library" element={<AdminLibrary />} />
              <Route path="laboratory" element={<AdminLaboratory />} />
            </Routes>
          </Layout>
        }
      />

      {/* PARENT ROUTES */}
      <Route
        path="/parent/*"
        element={
          <Layout role="parent">
            <Routes>
              <Route path="dashboard" element={<ParentDashboard />} />
              <Route path="results" element={<ParentResults />} />
              <Route path="fees" element={<ParentFees />} />
              <Route path="notifications" element={<ParentNotifications />} />
              <Route path="attendance" element={<ParentAttendance />} />
              <Route path="profile" element={<ParentProfile />} />
              <Route path="settings" element={<ParentSettings />} />
              <Route path="announcements" element={<ParentAnnouncements />} />
              <Route path="assignments" element={<ParentAssignments />} />
              <Route path="suggestion" element={<ParentSuggestion />} />
              <Route path="subjects" element={<ParentSubjects />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
