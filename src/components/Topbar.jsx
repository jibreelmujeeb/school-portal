// src/components/Topbar.jsx
import React from "react";
import { Bell, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const Topbar = ({ role, color }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const colorClasses = {
    blue: {
      heading: "text-blue-700",
      hover: "hover:text-blue-600",
      indicator: "bg-blue-500",
    },
    green: {
      heading: "text-green-700",
      hover: "hover:text-green-600",
      indicator: "bg-green-500",
    },
    indigo: {
      heading: "text-indigo-700",
      hover: "hover:text-indigo-600",
      indicator: "bg-indigo-500",
    },
    gray: {
      heading: "text-gray-700",
      hover: "hover:text-gray-600",
      indicator: "bg-gray-500",
    },
  };
  const classes = colorClasses[color] || colorClasses.gray;

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <h2 className={`text-lg font-semibold ${classes.heading}`}>
        Welcome, {role.charAt(0).toUpperCase() + role.slice(1)}
      </h2>
      <div className="flex items-center gap-4">
        <button className={`relative text-gray-700 ${classes.hover}`}>
          <Bell className="w-5 h-5" />
          <span className={`absolute top-0 right-0 w-2 h-2 ${classes.indicator} rounded-full`} />
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <User className="w-5 h-5 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">
            {user ? `${user.firstName} ${user.lastName}` : "Profile"}
          </span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-100"
          aria-label="Logout"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
