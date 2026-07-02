import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";

const PublicFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.3fr_0.7fr_0.8fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 font-semibold">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <GraduationCap className="h-6 w-6" />
            </span>
            School Portal
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-gray-300">
            A connected school management platform for admissions, learning,
            results, attendance, fees, and daily communication.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-100">Pages</h2>
          <nav className="mt-4 grid gap-3 text-sm text-gray-300">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/admissions" className="hover:text-white">Admissions</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-100">Contact</h2>
          <div className="mt-4 grid gap-3 text-sm text-gray-300">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-400" />
              school@email.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-400" />
              +234 800 000 0000
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-400" />
              Ibadan, Nigeria
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5">
        <p className="mx-auto max-w-6xl text-sm text-gray-400">
          © {year} School Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default PublicFooter;
