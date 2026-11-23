import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  CalendarDays,
  School,
  Pencil,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

const defaultProfile = {
  name: "Jibreel Mujeeb",
  dateOfBirth: "12 Jan 2005",
  className: "SS2",
  department: "Science",
  email: "jibreel@email.com",
  phone: "+234 800 000 0000",
  address: "Ibadan, Nigeria",
};

const StudentProfile = () => {
  const [profile, setProfile, profileError] = usePersistentState(
    "student-profile",
    defaultProfile,
  );
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [notice, setNotice] = useState("");

  const openEditor = () => {
    setDraft(profile);
    setNotice("");
    setEditing(true);
  };

  const saveProfile = (event) => {
    event.preventDefault();
    if (!draft.name.trim() || !draft.email.trim()) {
      setNotice("Name and email are required.");
      return;
    }
    setProfile({ ...draft, name: draft.name.trim(), email: draft.email.trim() });
    setEditing(false);
    setNotice("Profile updated successfully.");
  };

  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-10">
      {notice && (
        <p role="status" className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {notice}
        </p>
      )}
      {profileError && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {profileError}
        </p>
      )}
      
      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border border-gray-200 rounded-2xl p-6 bg-white">
        
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold">
            {initials}
          </div>

          {/* Info */}
          <div>
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="text-sm text-gray-600">Student</p>
          </div>
        </div>

        {/* Edit Button */}
        <button type="button" onClick={openEditor} className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition">
          <Pencil className="w-4 h-4" />
          Edit Profile
        </button>
      </section>

      {/* PERSONAL INFO */}
      <section>
        <h3 className="text-lg font-semibold mb-4">
          Personal Information
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          
          <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <User className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="text-sm font-medium">{profile.name}</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <CalendarDays className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Date of Birth</p>
              <p className="text-sm font-medium">{profile.dateOfBirth}</p>
            </div>
          </div>

        </div>
      </section>

      {/* ACADEMIC INFO */}
      <section>
        <h3 className="text-lg font-semibold mb-4">
          Academic Information
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          
          <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Class</p>
              <p className="text-sm font-medium">{profile.className}</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <School className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Department</p>
              <p className="text-sm font-medium">{profile.department}</p>
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT INFO */}
      <section>
        <h3 className="text-lg font-semibold mb-4">
          Contact Information
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          
          <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium">{profile.email}</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm font-medium">{profile.phone}</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 sm:col-span-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="text-sm font-medium">
                {profile.address}
              </p>
            </div>
          </div>

        </div>
      </section>

      {editing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-label="Edit profile">
          <form onSubmit={saveProfile} className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6">
            <h2 className="text-lg font-semibold">Edit Profile</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["name", "Full name"],
                ["dateOfBirth", "Date of birth"],
                ["className", "Class"],
                ["department", "Department"],
                ["email", "Email"],
                ["phone", "Phone"],
              ].map(([field, label]) => (
                <label key={field} className="text-sm text-gray-600">
                  {label}
                  <input
                    value={draft[field]}
                    onChange={(event) => setDraft((current) => ({ ...current, [field]: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
                  />
                </label>
              ))}
              <label className="text-sm text-gray-600 sm:col-span-2">
                Address
                <textarea
                  value={draft.address}
                  onChange={(event) => setDraft((current) => ({ ...current, address: event.target.value }))}
                  rows="3"
                  className="mt-1 w-full resize-none rounded-xl border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setEditing(false)} className="rounded-xl border border-gray-300 px-4 py-2 text-sm">Cancel</button>
              <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">Save Changes</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default StudentProfile;