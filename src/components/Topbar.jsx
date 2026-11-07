// src/components/Topbar.jsx
import React from "react";
import { Bell, Menu, User, X } from "lucide-react";

const Topbar = ({ role, color, onMenuClick, sidebarOpen }) => {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={sidebarOpen}
          aria-controls="portal-navigation"
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
          onClick={onMenuClick}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <h2 className={`truncate text-base font-semibold text-${color}-700 sm:text-lg`}>
          Welcome, {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <button className={`relative text-gray-700 hover:text-${color}-600`}>
          <Bell className="w-5 h-5" />
          <span className={`absolute top-0 right-0 w-2 h-2 bg-${color}-500 rounded-full`} />
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <User className="w-5 h-5 text-gray-700" />
          <span className="hidden text-sm font-medium text-gray-700 sm:inline">Profile</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
