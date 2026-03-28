// src/components/Topbar.jsx
import React from "react";
import { Bell, User } from "lucide-react";

const Topbar = ({ role, color }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <h2 className={`text-lg font-semibold text-${color}-700`}>
        Welcome, {role.charAt(0).toUpperCase() + role.slice(1)}
      </h2>
      <div className="flex items-center gap-4">
        <button className={`relative text-gray-700 hover:text-${color}-600`}>
          <Bell className="w-5 h-5" />
          <span className={`absolute top-0 right-0 w-2 h-2 bg-${color}-500 rounded-full`} />
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <User className="w-5 h-5 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">Profile</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
