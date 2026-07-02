import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";
import PublicFooter from "./PublicFooter";

const PublicLayout = ({ children }) => {
  const navClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-blue-700" : "text-gray-700 hover:text-blue-700"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-950">
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
              <GraduationCap className="h-6 w-6" />
            </span>
            <span>School Portal</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/" className={navClass}>Home</NavLink>
            <NavLink to="/about" className={navClass}>About</NavLink>
            <NavLink to="/admissions" className={navClass}>Admissions</NavLink>
            <NavLink to="/contact" className={navClass}>Contact</NavLink>
          </nav>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
          >
            Login <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main>{children}</main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
