// // src/data/sidebarMenus.js
// import {
//   LayoutDashboard,
//   BookOpen,
//   ClipboardList,
//   GraduationCap,
//   CalendarDays,
//   CreditCard,
//   Megaphone,
//   Users,
//   Settings,
//   Briefcase,
//   FileText,
// } from "lucide-react";

// export const sidebarMenus = {
//   student: [
//     { name: "Dashboard", path: "/student/dashboard", icon: <LayoutDashboard /> },
//     { name: "Courses", path: "/student/courses", icon: <BookOpen /> },
//     { name: "Assignments", path: "/student/assignments", icon: <ClipboardList /> },
//     { name: "Grades", path: "/student/grades", icon: <GraduationCap /> },
//     { name: "Attendance", path: "/student/attendance", icon: <CalendarDays /> },
//     { name: "Fees", path: "/student/fees", icon: <CreditCard /> },
//     { name: "Announcements", path: "/student/announcements", icon: <Megaphone /> },
//   ],

//   teacher: [
//     { name: "Dashboard", path: "/teacher/dashboard", icon: <LayoutDashboard /> },
//     { name: "My Classes", path: "/teacher/classes", icon: <Users /> },
//     { name: "Assignments", path: "/teacher/assignments", icon: <ClipboardList /> },
//     { name: "Attendance", path: "/teacher/attendance", icon: <CalendarDays /> },
//     { name: "Grades", path: "/teacher/grades", icon: <GraduationCap /> },
//     { name: "Announcements", path: "/teacher/announcements", icon: <Megaphone /> },
//   ],

//   admin: [
//     { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard /> },
//     { name: "Students", path: "/admin/students", icon: <Users /> },
//     { name: "Teachers", path: "/admin/teachers", icon: <Briefcase /> },
//     { name: "Classes", path: "/admin/classes", icon: <BookOpen /> },
//     { name: "Subjects", path: "/admin/subjects", icon: <FileText /> },
//     { name: "Fees", path: "/admin/fees", icon: <CreditCard /> },
//     { name: "Reports", path: "/admin/reports", icon: <ClipboardList /> },
//     { name: "Announcements", path: "/admin/announcements", icon: <Megaphone /> },
//     { name: "Settings", path: "/admin/settings", icon: <Settings /> },
//   ],
// };

// src/data/sidebarMenus.js
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  GraduationCap,
  CalendarDays,
  CreditCard,
  Megaphone,
  Users,
  Settings,
  Briefcase,
  FileText,
} from "lucide-react";

export const sidebarMenus = {
  student: [
    { name: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
    { name: "Courses", path: "/student/courses", icon: BookOpen },
    { name: "Assignments", path: "/student/assignments", icon: ClipboardList },
    { name: "Grades", path: "/student/grades", icon: GraduationCap },
    { name: "Attendance", path: "/student/attendance", icon: CalendarDays },
    { name: "Fees", path: "/student/fees", icon: CreditCard },
    { name: "Announcements", path: "/student/announcements", icon: Megaphone },
    { name: "Profile", path: "/student/profile", icon: Users },
    { name: "Timetable", path: "/student/timetable", icon: BookOpen },
  ],

  teacher: [
    { name: "Dashboard", path: "/teacher/dashboard", icon: LayoutDashboard },
    { name: "My Classes", path: "/teacher/classes", icon: Users },
    { name: "Assignments", path: "/teacher/assignments", icon: ClipboardList },
    { name: "Attendance", path: "/teacher/attendance", icon: CalendarDays },
    { name: "Grades", path: "/teacher/grades", icon: GraduationCap },
    { name: "Announcements", path: "/teacher/announcements", icon: Megaphone },
    { name: "Profile", path: "/teacher/profile", icon: Users },
    
  ],

  admin: [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Students", path: "/admin/students", icon: Users },
    { name: "Teachers", path: "/admin/teachers", icon: Briefcase },
    { name: "Classes", path: "/admin/classes", icon: BookOpen },
    { name: "Subjects", path: "/admin/subjects", icon: FileText },
    { name: "Fees", path: "/admin/fees", icon: CreditCard },
    { name: "Reports", path: "/admin/reports", icon: ClipboardList },
    { name: "Announcements", path: "/admin/announcements", icon: Megaphone },
    { name: "Settings", path: "/admin/settings", icon: Settings },
    { name: "Grades", path: "/admin/grades", icon: GraduationCap },
    { name: "Profile", path: "/admin/profile", icon: Users },
  ],
};