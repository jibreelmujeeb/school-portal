// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { sidebarMenus } from "../data/SidebarMenu";

const Sidebar = ({ role, color, isOpen, onNavigate }) => {
  const menus = sidebarMenus[role] || [];

  return (
    <aside
      id="portal-navigation"
      className={`fixed inset-y-0 left-0 z-50 flex h-screen h-[100dvh] w-64 shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-200 lg:static lg:z-auto lg:h-screen lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className={`p-4 border-b border-gray-200 text-${color}-600 font-bold`}>
        {role.charAt(0).toUpperCase() + role.slice(1)} Portal
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {menus.map((menu, idx) => {
          const Icon = menu.icon;
          return (
            <NavLink
              key={idx}
              to={menu.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? `text-${color}-600 bg-${color}-50 font-medium`
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