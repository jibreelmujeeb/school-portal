export const roleDashboardPath = (role) => {
  const paths = {
    STUDENT: "/student/dashboard",
    TEACHER: "/teacher/dashboard",
    ADMIN: "/admin/dashboard",
  };

  return paths[role] || "/login";
};
