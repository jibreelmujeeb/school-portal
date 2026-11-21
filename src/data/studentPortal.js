export const coursesData = [
  { title: "Mathematics", code: "MTH101", instructor: "Mr. Ade", progress: 80 },
  { title: "Physics", code: "PHY102", instructor: "Mrs. Bello", progress: 60 },
  { title: "English", code: "ENG103", instructor: "Mr. James", progress: 90 },
  { title: "Chemistry", code: "CHM104", instructor: "Dr. Musa", progress: 50 },
];

export const subjectsData = [
  {
    id: 1,
    name: "Mathematics",
    teacher: "Mr. Johnson",
    grade: "A",
    assignments: 12,
    nextClass: "Monday, 9:00 AM",
    progress: 92,
  },
  {
    id: 2,
    name: "English Language",
    teacher: "Mrs. Grace",
    grade: "B+",
    assignments: 8,
    nextClass: "Tuesday, 10:00 AM",
    progress: 85,
  },
  {
    id: 3,
    name: "Physics",
    teacher: "Mr. David",
    grade: "A-",
    assignments: 10,
    nextClass: "Wednesday, 8:00 AM",
    progress: 88,
  },
  {
    id: 4,
    name: "Chemistry",
    teacher: "Mrs. Sarah",
    grade: "B",
    assignments: 7,
    nextClass: "Thursday, 11:00 AM",
    progress: 76,
  },
];

export const weekdays = [
  { key: "monday", label: "Monday", shortLabel: "Mon" },
  { key: "tuesday", label: "Tuesday", shortLabel: "Tue" },
  { key: "wednesday", label: "Wednesday", shortLabel: "Wed" },
  { key: "thursday", label: "Thursday", shortLabel: "Thu" },
  { key: "friday", label: "Friday", shortLabel: "Fri" },
];

export const timetableData = [
  {
    time: "08:00 - 09:00",
    monday: "Mathematics",
    tuesday: "English",
    wednesday: "Physics",
    thursday: "Chemistry",
    friday: "Biology",
  },
  {
    time: "09:00 - 10:00",
    monday: "Physics",
    tuesday: "Mathematics",
    wednesday: "English",
    thursday: "Biology",
    friday: "Chemistry",
  },
  {
    time: "10:00 - 11:00",
    monday: "Break",
    tuesday: "Break",
    wednesday: "Break",
    thursday: "Break",
    friday: "Break",
  },
  {
    time: "11:00 - 12:00",
    monday: "Chemistry",
    tuesday: "Biology",
    wednesday: "Mathematics",
    thursday: "English",
    friday: "Physics",
  },
];

export const attendanceData = [
  { date: "2026-04-01", status: "Present" },
  { date: "2026-04-02", status: "Absent" },
  { date: "2026-04-03", status: "Late" },
  { date: "2026-04-04", status: "Present" },
  { date: "2026-04-05", status: "Present" },
];

export const studentResultsData = [
  { subject: "Mathematics", score: 85 },
  { subject: "Physics", score: 72 },
  { subject: "English", score: 90 },
  { subject: "Chemistry", score: 65 },
  { subject: "Biology", score: 55 },
];

export const studentAcademicProfile = {
  name: "John Doe",
  className: "SS2",
  term: "2nd Term",
  session: "2025/2026",
};

export const getGradeForScore = (score) => {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
};

export const getAttendanceSummary = (records) => {
  const present = records.filter((record) => record.status === "Present").length;
  const absent = records.filter((record) => record.status === "Absent").length;
  const late = records.filter((record) => record.status === "Late").length;
  const total = records.length;

  return {
    present,
    absent,
    late,
    total,
    attendanceRate: total ? Math.round(((present + late) / total) * 100) : 0,
  };
};

export const getAverageGrade = (subjects) => {
  const gradePoints = {
    "A+": 4,
    A: 4,
    "A-": 3.7,
    "B+": 3.3,
    B: 3,
    "B-": 2.7,
    C: 2,
    D: 1,
    F: 0,
  };
  if (subjects.length === 0) return "N/A";

  const average =
    subjects.reduce((total, subject) => total + (gradePoints[subject.grade] ?? 0), 0) /
    subjects.length;
  if (average >= 3.85) return "A";
  if (average >= 3.7) return "A-";
  if (average >= 3.3) return "B+";
  if (average >= 3) return "B";
  if (average >= 2.7) return "B-";
  return "C";
};
