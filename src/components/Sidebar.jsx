// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { sidebarMenus } from "../data/SidebarMenu";

const Sidebar = ({ role, color }) => {
  const menus = sidebarMenus[role] || [];
  const colorClasses = {
    blue: {
      title: "text-blue-600",
      active: "text-blue-600 bg-blue-50",
    },
    green: {
      title: "text-green-600",
      active: "text-green-600 bg-green-50",
    },
    indigo: {
      title: "text-indigo-600",
      active: "text-indigo-600 bg-indigo-50",
    },
    gray: {
      title: "text-gray-600",
      active: "text-gray-600 bg-gray-50",
    },
  };
  const classes = colorClasses[color] || colorClasses.gray;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className={`p-4 border-b border-gray-200 ${classes.title} font-bold`}>
        {role.charAt(0).toUpperCase() + role.slice(1)} Portal
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {menus.map((menu, idx) => {
          const Icon = menu.icon;
          return (
            <NavLink
              key={idx}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? `${classes.active} font-medium`
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </span>
              {menu.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
