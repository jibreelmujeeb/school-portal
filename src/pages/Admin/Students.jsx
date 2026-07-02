import React from "react";
import AdminUsersManager from "../../components/AdminUsersManager";

const AdminStudents = () => {
  return (
    <AdminUsersManager
      title="Students"
      description="Create, edit, deactivate, and reactivate student accounts"
      fixedRole="STUDENT"
    />
  );
};

export default AdminStudents;
