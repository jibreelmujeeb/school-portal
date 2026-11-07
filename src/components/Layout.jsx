// src/components/Layout.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Role-based theme colors
  const roleColors = {
    student: "blue",
    teacher: "green",
    admin: "indigo",
    parent: "orange",
    accountant: "teal",
    librarian: "purple",
  };

  const color = roleColors[role] || "gray";

  useEffect(() => {
    if (!sidebarOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen]);

  return (
    <div className="relative flex h-screen h-[100dvh] overflow-hidden bg-gray-50">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        role={role}
        color={color}
        isOpen={sidebarOpen}
        onNavigate={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar
          role={role}
          color={color}
          onMenuClick={() => setSidebarOpen((open) => !open)}
          sidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
