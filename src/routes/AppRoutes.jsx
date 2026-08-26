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
import StudentAssignmentSubmission from "../pages/Student/AssignmentSubmission";
import StudentTranscript from "../pages/Student/Transcript";
import StudentLearningMaterials from "../pages/Student/LearningMaterials";
import StudentPaymentHistory from "../pages/Student/PaymentHistory";
import StudentPaymentReceipt from "../pages/Student/PaymentReceipt";
import StudentReportCard from "../pages/Student/ReportCard";
import StudentCertificate from "../pages/Student/Certificate";


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
import TeacherAssignmentGrading from "../pages/Teacher/AssignmentGrading";
import TeacherLessonNote from "../pages/Teacher/LessonNote";
import TeacherStudentsList from "../pages/Teacher/StudentsList";
import TeacherStudentGrading from "../pages/Teacher/StudentGrading";


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
import AdminGallery from "../pages/Admin/Gallery";
import AdminParentsManagement from "../pages/Admin/ParentsManagement";
import AdminStaffManagement from "../pages/Admin/StaffManagement";
import AdminUsersRoleAndPermission from "../pages/Admin/UsersRoleAndPermission";
import AdminDepartments from "../pages/Admin/Departments";
import AdminGrading from "../pages/Admin/Grading";
import AdminAdmissionApplication from "../pages/Admin/AdmissionApplication";
import AdminAdmissionApproval from "../pages/Admin/AdmissionApproval";
import AdminAdmissionRejection from "../pages/Admin/AdmissionRejection";
import AdminScholarship from "../pages/Admin/Scholarship";


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
import ParentChildrenOverview from "../pages/Parents/ChildrenOverview";
import ParentChildProfile from "../pages/Parents/ChildProfile";
import ParentPaymentHistory from "../pages/Parents/PaymentHistory";
import ParentPaymentReceipt from "../pages/Parents/PaymentReciept";


// Accountant pages
import AccountantDashboard from "../pages/Accountant/AccountantDashboard";
import AccountantFeesCollection from "../pages/Accountant/FeesCollection";
import AccountantExpenses from "../pages/Accountant/Expenses";
import AccountantPaymentVerification from "../pages/Accountant/PaymentVerification";
import AccountantFinancialReport from "../pages/Accountant/FinancialReport";
import AccountantStudentsDebtors from "../pages/Accountant/StudentsDebtors";
import AccountantReceiptsManagement from "../pages/Accountant/ReceiptsManagement";
import AccountantProfile from "../pages/Accountant/Profile";
import AccountantSettings from "../pages/Accountant/Settings";
import AccountantNotifications from "../pages/Accountant/Notifications";
import AccountantAnnouncements from "../pages/Accountant/Announcement";
import AccountantPaymentHistory from "../pages/Accountant/PaymentHistory";
import AccountantBudgeting from "../pages/Accountant/Budgeting";
import AccountantPayroll from "../pages/Accountant/Payroll";
import AccountantAuditTrail from "../pages/Accountant/AuditTrail";


// Librarian pages
import LibrarianDashboard from "../pages/Librarian/LibrarianDashboard";
import LibrarianBooksManagement from "../pages/Librarian/BooksManagement";
import LibrarianBorrowedBooks from "../pages/Librarian/BorrowedBooks";
import LibrarianReturnBooks from "../pages/Librarian/ReturnBooks";
import LibrarianOverdueBooks from "../pages/Librarian/OverdueBooks";
import LibrarianLibraryReports from "../pages/Librarian/LibraryReports";
import LibrarianFinesManagement from "../pages/Librarian/FinesManagement";
import LibrarianDamagedBooks from "../pages/Librarian/DamagedBooks";
import LibrarianBooksRequest from "../pages/Librarian/BooksRequest";
import LibrarianReservation from "../pages/Librarian/Reservation";
import LibrarianProfile from "../pages/Librarian/Profile";
import LibrarianSettings from "../pages/Librarian/Settings";
import LibrarianNotification from "../pages/Librarian/Notification";
import LibrarianAnnouncements from "../pages/Librarian/Announcement";
import LibrarianLibraryStatistics from "../pages/Librarian/LibraryStatistics";
import LibrarianElibraryManagement from "../pages/Librarian/ElibraryManagement";
import LibrarianLibraryCatalog from "../pages/Librarian/LibraryCatalog";
import LibrarianLibraryEvents from "../pages/Librarian/LibraryEvents";
import LibrarianLibraryPolicies from "../pages/Librarian/LibraryPolicies";
import LibrarianLibraryResources from "../pages/Librarian/LibraryResources";
import LibrarianLibraryInventory from "../pages/Librarian/LibraryInventory";
import LibrarianLibraryMembership from "../pages/Librarian/LibraryMembership";

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
               <Route path="assignmentSubmission" element={<StudentAssignmentSubmission />} />
               <Route path="transcript" element={<StudentTranscript />} />
              <Route path="learning-materials" element={<StudentLearningMaterials />} />
              <Route path="payment-history" element={<StudentPaymentHistory />} />
              <Route path="payment-receipt" element={<StudentPaymentReceipt />} />
              <Route path="report-card" element={<StudentReportCard />} />
              <Route path="certificate" element={<StudentCertificate />} />
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
              <Route path="assignment-grading" element={<TeacherAssignmentGrading />} />
              <Route path="lesson-note" element={<TeacherLessonNote />} />
              <Route path="students-list" element={<TeacherStudentsList />} />
              <Route path="student-grading" element={<TeacherStudentGrading />} />
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
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="parents" element={<AdminParentsManagement />} />
              <Route path="staff" element={<AdminStaffManagement />} />
              <Route path="users-role-permission" element={<AdminUsersRoleAndPermission />} />
              <Route path="departments" element={<AdminDepartments />} />
              <Route path="grading" element={<AdminGrading />} />
              <Route path="admission-application" element={<AdminAdmissionApplication />} />
              <Route path="admission-approval" element={<AdminAdmissionApproval />} />
              <Route path="admission-rejection" element={<AdminAdmissionRejection />} />
              <Route path="scholarship" element={<AdminScholarship />} />
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
              <Route path="children-overview" element={<ParentChildrenOverview />} />
              <Route path="child-profile" element={<ParentChildProfile />} />
              <Route path="payment-history" element={<ParentPaymentHistory />} />
              <Route path="payment-receipt" element={<ParentPaymentReceipt />} />
              
            </Routes>
          </Layout>
        }
      />

      {/* ACCOUNTANT ROUTES */}
      <Route
        path="/accountant/*"
        element={
          <Layout role="accountant">
            <Routes>
              <Route path="dashboard" element={<AccountantDashboard />} />
              <Route path="fees-collection" element={<AccountantFeesCollection />} />
              <Route path="expenses" element={<AccountantExpenses />} />
              <Route path="payment-verification" element={<AccountantPaymentVerification />} />
              <Route path="financial-report" element={<AccountantFinancialReport />} />
              <Route path="students-debtors" element={<AccountantStudentsDebtors />} />
              <Route path="receipts-management" element={<AccountantReceiptsManagement />} />
              <Route path="profile" element={<AccountantProfile />} />
              <Route path="settings" element={<AccountantSettings />} />
              <Route path="notifications" element={<AccountantNotifications />} />
              <Route path="announcements" element={<AccountantAnnouncements />} />
              <Route path="payment-history" element={<AccountantPaymentHistory />} />
              <Route path="budgeting" element={<AccountantBudgeting />} />
              <Route path="payroll" element={<AccountantPayroll />} />
              <Route path="audit-trail" element={<AccountantAuditTrail />} />
            </Routes>
          </Layout>
        }
      />

      {/* LIBRARIAN ROUTES */}
      <Route
        path="/librarian/*"
        element={
          <Layout role="librarian">
            <Routes>
              <Route path="dashboard" element={<LibrarianDashboard />} />
              <Route path="books-management" element={<LibrarianBooksManagement />} />
              <Route path="borrowed-books" element={<LibrarianBorrowedBooks />} />
              <Route path="return-books" element={<LibrarianReturnBooks />} />
              <Route path="overdue-books" element={<LibrarianOverdueBooks />} />
              <Route path="library-reports" element={<LibrarianLibraryReports />} />
              <Route path="fines-management" element={<LibrarianFinesManagement />} />
              <Route path="damaged-books" element={<LibrarianDamagedBooks />} />
              <Route path="book-requests" element={<LibrarianBooksRequest />} />
              <Route path="reservation" element={<LibrarianReservation />} />
              <Route path="profile" element={<LibrarianProfile />} />
              <Route path="settings" element={<LibrarianSettings />} />
              <Route path="notifications" element={<LibrarianNotification />} />
              <Route path="announcements" element={<LibrarianAnnouncements />} />
              <Route path="library-statistics" element={<LibrarianLibraryStatistics />} />
              <Route path="e-library-management" element={<LibrarianElibraryManagement />} />
              <Route path="library-catalog" element={<LibrarianLibraryCatalog />} />
              <Route path="library-events" element={<LibrarianLibraryEvents />} />
              <Route path="library-policies" element={<LibrarianLibraryPolicies />} />
              <Route path="library-resources" element={<LibrarianLibraryResources />} />
              <Route path="library-inventory" element={<LibrarianLibraryInventory />} />
              <Route path="library-membership" element={<LibrarianLibraryMembership />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
