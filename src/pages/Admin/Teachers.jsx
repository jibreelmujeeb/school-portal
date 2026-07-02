import React from "react";
import AdminUsersManager from "../../components/AdminUsersManager";

const AdminTeachers = () => {
  return (
    <AdminUsersManager
      title="Teachers"
      description="Create, edit, deactivate, and reactivate teacher accounts"
      fixedRole="TEACHER"
    />
  );
};

export default AdminTeachers;
