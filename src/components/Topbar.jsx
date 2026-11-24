// src/components/Topbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, LogOut, Menu, Settings, User, X } from "lucide-react";

const Topbar = ({ role, color, onMenuClick, sidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const profileMenuRef = useRef(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    const readProfileName = () => {
      try {
        const savedProfile = window.localStorage.getItem(`${role}-profile`);
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          setProfileName(profile.name || "");
          return;
        }
      } catch {
        // Keep the role fallback name if saved profile data is unavailable.
      }
      setProfileName("");
    };

    readProfileName();
    window.addEventListener("storage", readProfileName);
    window.addEventListener("persistent-state-updated", readProfileName);
    return () => {
      window.removeEventListener("storage", readProfileName);
      window.removeEventListener("persistent-state-updated", readProfileName);
    };
  }, [role]);

  useEffect(() => {
    setProfileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!profileMenuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setProfileMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [profileMenuOpen]);

  const rolePath = `/${role}`;
  const displayName = profileName || role.charAt(0).toUpperCase() + role.slice(1);
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const logout = () => {
    setProfileMenuOpen(false);
    window.sessionStorage.removeItem("currentRole");
    navigate("/login");
  };

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
        <button
          type="button"
          aria-label="Open notifications"
          onClick={() => navigate(`${rolePath}/notifications`)}
          className={`relative rounded-lg p-2 text-gray-700 hover:bg-gray-100 hover:text-${color}-600`}
        >
          <Bell className="w-5 h-5" />
          {location.pathname !== `${rolePath}/notifications` && (
            <span className={`absolute right-1 top-1 w-2 h-2 bg-${color}-500 rounded-full ring-2 ring-white`} />
          )}
        </button>
        <div ref={profileMenuRef} className="relative">
          <button
            type="button"
            aria-label="Open profile menu"
            aria-haspopup="menu"
            aria-expanded={profileMenuOpen}
            onClick={() => setProfileMenuOpen((open) => !open)}
            className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100"
          >
            <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-${color}-100 text-xs font-semibold text-${color}-700`}>
              {initials || <User className="h-4 w-4" />}
            </span>
            <span className="hidden max-w-32 truncate text-sm font-medium text-gray-700 sm:inline">
              {displayName}
            </span>
            <ChevronDown className={`hidden h-4 w-4 text-gray-500 transition-transform sm:block ${profileMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {profileMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-[70] mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => navigate(`${rolePath}/profile`)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                <User className="h-4 w-4" />
                View profile
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => navigate(`${rolePath}/settings`)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
              <div className="my-1 border-t border-gray-100" />
              <button
                type="button"
                role="menuitem"
                onClick={logout}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
