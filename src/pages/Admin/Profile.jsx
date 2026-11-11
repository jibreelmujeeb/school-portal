import React, { useState } from "react";
import { User, Mail, Phone, Lock, Save } from "lucide-react";

const initialProfile = { name: "Admin Name", email: "admin@email.com", phone: "" };

const AdminProfile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [notice, setNotice] = useState("");

  const update = (field) => (event) =>
    setProfile((current) => ({ ...current, [field]: event.target.value }));

  const save = (event) => {
    event.preventDefault();
    if (password && password !== confirmPassword) {
      setNotice("The new password and confirmation do not match.");
      return;
    }
    if (password && password.length < 8) {
      setNotice("Choose a password with at least 8 characters.");
      return;
    }
    setNotice("Profile changes are saved in this page session only; no account service is connected.");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <form onSubmit={save} className="space-y-10">
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">Profile</h1>
        <p className="text-sm text-gray-600 mt-2">Manage your account information</p>
      </section>

      <section className="border border-gray-200 rounded-2xl p-6 bg-white flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
          <User className="w-8 h-8 text-gray-500" />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold">{profile.name}</h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
          <label className="mt-3 inline-block text-sm text-blue-600 hover:underline cursor-pointer">
            Change Photo
            <input type="file" accept="image/*" className="sr-only" onChange={(event) => setPhotoName(event.target.files?.[0]?.name || "")} />
          </label>
          {photoName && <p className="text-xs text-gray-500 mt-1">Selected: {photoName} (preview only)</p>}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <User className="w-4 h-4 text-gray-500 mr-2" />
            <input required type="text" aria-label="Full Name" placeholder="Full Name" value={profile.name} onChange={update("name")} className="w-full outline-none text-sm bg-transparent" />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Mail className="w-4 h-4 text-gray-500 mr-2" />
            <input required type="email" aria-label="Email Address" placeholder="Email Address" value={profile.email} onChange={update("email")} className="w-full outline-none text-sm bg-transparent" />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 sm:col-span-2">
            <Phone className="w-4 h-4 text-gray-500 mr-2" />
            <input type="tel" aria-label="Phone Number" placeholder="Phone Number" value={profile.phone} onChange={update("phone")} className="w-full outline-none text-sm bg-transparent" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Lock className="w-4 h-4 text-gray-500 mr-2" />
            <input type="password" autoComplete="new-password" placeholder="New Password" aria-label="New Password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full outline-none text-sm bg-transparent" />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Lock className="w-4 h-4 text-gray-500 mr-2" />
            <input type="password" autoComplete="new-password" placeholder="Confirm Password" aria-label="Confirm Password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full outline-none text-sm bg-transparent" />
          </div>
        </div>
      </section>

      {notice && <p role="status" className="text-sm text-blue-700">{notice}</p>}
      <section className="flex justify-end">
        <button type="submit" className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Save className="w-4 h-4" />Save Changes
        </button>
      </section>
    </form>
  );
};

export default AdminProfile;
