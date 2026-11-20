import React, { useRef, useState } from "react";
import {
  BookOpen,
  Lock,
  Mail,
  Phone,
  Save,
  Upload,
  User,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

const initialProfile = {
  name: "Mr. Adewale",
  email: "adewale@email.com",
  phone: "",
  subject: "Mathematics Teacher",
  avatar: "",
};

const TeacherProfile = () => {
  const [profile, setProfile, persistenceError] = usePersistentState(
    "teacher-profile",
    initialProfile,
  );
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const photoInput = useRef(null);

  const updateProfile = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
    setNotice("");
  };

  const saveProfile = (event) => {
    event.preventDefault();
    if (!profile.name.trim() || !profile.email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setError("");
    setNotice("Profile changes saved in this browser.");
  };

  const changePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file.");
      event.target.value = "";
      return;
    }
    if (file.size > 1024 * 1024) {
      setError("Profile images must be 1 MB or smaller.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProfile((current) => ({ ...current, avatar: String(reader.result) }));
      setError("");
      setNotice("Profile photo updated.");
    };
    reader.onerror = () => setError("The selected photo could not be read.");
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    if (newPassword.length < 8) {
      setError("Choose a password with at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("The password confirmation does not match.");
      return;
    }
    setNewPassword("");
    setConfirmPassword("");
    setError("Password updates require a connected authentication service. No password was saved.");
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Profile</h1>
        <p className="mt-2 text-sm text-gray-600">Manage your teacher contact information.</p>
      </section>

      {persistenceError && (
        <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{persistenceError}</p>
      )}
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      {notice && <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">{notice}</p>}
      <p className="text-xs text-gray-500">Profile details and photo are saved in this browser only.</p>

      <section className="flex flex-col items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 sm:flex-row">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
          {profile.avatar ? (
            <img src={profile.avatar} alt={`${profile.name} profile`} className="h-full w-full object-cover" />
          ) : (
            <User className="h-8 w-8 text-gray-500" />
          )}
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold">{profile.name}</h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
          <p className="mt-1 text-xs text-gray-400">{profile.subject}</p>
          <input ref={photoInput} type="file" accept="image/*" onChange={changePhoto} className="hidden" />
          <button
            type="button"
            onClick={() => photoInput.current?.click()}
            className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
          >
            <Upload className="h-4 w-4" /> Change photo
          </button>
        </div>
      </section>

      <form onSubmit={saveProfile} className="space-y-5">
        <section>
          <h2 className="mb-4 text-lg font-semibold">Edit Profile</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-3">
              <User className="h-4 w-4 text-gray-500" />
              <span className="sr-only">Full name</span>
              <input required name="name" value={profile.name} onChange={updateProfile} className="w-full bg-transparent text-sm outline-none" />
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="sr-only">Email address</span>
              <input required type="email" name="email" value={profile.email} onChange={updateProfile} className="w-full bg-transparent text-sm outline-none" />
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="sr-only">Phone number</span>
              <input name="phone" value={profile.phone} onChange={updateProfile} className="w-full bg-transparent text-sm outline-none" placeholder="Phone number" />
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-3">
              <BookOpen className="h-4 w-4 text-gray-500" />
              <span className="sr-only">Teaching role or subject</span>
              <input name="subject" value={profile.subject} onChange={updateProfile} className="w-full bg-transparent text-sm outline-none" placeholder="Teaching role or subject" />
            </label>
          </div>
        </section>
        <div className="flex justify-end">
          <button type="submit" className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm text-white hover:bg-blue-700">
            <Save className="h-4 w-4" /> Save Changes
          </button>
        </div>
      </form>

      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold">Change Password</h2>
        <p className="mt-2 text-sm text-gray-500">
          Password updates are not available until this portal is connected to an authentication service.
        </p>
        <form onSubmit={handlePasswordChange} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-3">
            <Lock className="h-4 w-4 text-gray-500" />
            <span className="sr-only">New password</span>
            <input type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="New password" />
          </label>
          <label className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-3">
            <Lock className="h-4 w-4 text-gray-500" />
            <span className="sr-only">Confirm password</span>
            <input type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="Confirm password" />
          </label>
          <button type="submit" className="justify-self-start rounded-xl border border-gray-300 px-4 py-2.5 text-sm hover:bg-gray-50">
            Check password change
          </button>
        </form>
      </section>
    </div>
  );
};

export default TeacherProfile;
