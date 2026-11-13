import React, { useRef, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Shield,
  Lock,
  Camera,
  Edit,
  Key,
  Download,
  X,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import { recordAccountantAuditEvent } from "../../data/accountantAuditData";

const initialProfile = {
  name: "John Doe",
  title: "Senior Accountant",
  department: "Finance Department",
  email: "john@example.com",
  phone: "+234 800 123 4567",
  location: "Lagos, Nigeria",
  avatar: "",
};

export default function AccountantProfilePage() {
  const [profile, setProfile, profileError] = usePersistentState("accountant-profile", initialProfile);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [message, setMessage] = useState("");
  const photoInput = useRef(null);

  const initials = profile.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const completeness = Math.round(
    ["name", "title", "department", "email", "phone", "location"]
      .filter((key) => String(profile[key] || "").trim())
      .length / 6 * 100
  );

  const saveProfile = (event) => {
    event.preventDefault();
    const updated = {
      ...draft,
      name: draft.name.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      location: draft.location.trim(),
    };
    if (!updated.name || !updated.email) {
      setMessage("Name and email are required.");
      return;
    }

    setProfile(updated);
    setEditing(false);
    setMessage("Profile saved in this browser.");
    try {
      recordAccountantAuditEvent({
        action: "Profile Updated",
        module: "Profile",
        record: updated.email,
      });
    } catch {
      setMessage("Profile saved, but the audit event could not be recorded.");
    }
  };

  const updatePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("Choose an image file.");
      event.target.value = "";
      return;
    }
    if (file.size > 1024 * 1024) {
      setMessage("Choose an image smaller than 1 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProfile((current) => ({ ...current, avatar: String(reader.result) }));
      setMessage("Profile photo saved in this browser.");
      try {
        recordAccountantAuditEvent({
          action: "Profile Photo Updated",
          module: "Profile",
          record: profile.email,
        });
      } catch {
        setMessage("Profile photo saved, but the audit event could not be recorded.");
      }
    };
    reader.onerror = () => setMessage("The selected image could not be read.");
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const downloadProfile = () => {
    const profileFile = { ...profile };
    delete profileFile.avatar;
    const file = new Blob([JSON.stringify(profileFile, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "accountant-profile.json";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const openEditor = () => {
    setDraft(profile);
    setEditing(true);
    setMessage("");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-6 rounded-3xl border p-6 lg:flex-row">
        <div className="relative">
          {profile.avatar ? (
            <img src={profile.avatar} alt={`${profile.name} profile`} className="h-32 w-32 rounded-full border object-cover" />
          ) : (
            <div aria-label={`${profile.name} profile`} className="flex h-32 w-32 items-center justify-center rounded-full border bg-blue-50 text-3xl font-semibold text-blue-700">{initials}</div>
          )}
          <input ref={photoInput} type="file" accept="image/*" onChange={updatePhoto} className="hidden" aria-label="Choose profile photo" />
          <button type="button" onClick={() => photoInput.current?.click()} title="Update photo (max 1 MB)" className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white">
            <Camera size={16} />
          </button>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="mt-2 text-gray-500">{profile.title}</p>
          <p className="text-gray-500">{profile.department}</p>
        </div>
        <button onClick={openEditor} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white">
          <Edit size={18} />
          Edit Profile
        </button>
      </div>

      {(profileError || message) && <p role={profileError ? "alert" : "status"} className={`rounded-xl p-3 text-sm ${profileError ? "bg-red-50 text-red-700" : "text-blue-700"}`}>{profileError || message}</p>}

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <Stat icon={<User className="text-blue-600" />} value={`${completeness}%`} label="Profile Complete" />
        <Stat icon={<Calendar className="text-green-600" />} value="8 Years" label="Service" />
        <Stat icon={<Briefcase className="text-purple-600" />} value="245" label="Reports" />
        <Stat icon={<Shield className="text-orange-600" />} value="4,860" label="Receipts Processed" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border p-6">
          <h2 className="text-xl font-bold">Personal Information</h2>
          <p className="flex items-center gap-3"><Mail size={18} />{profile.email}</p>
          <p className="flex items-center gap-3"><Phone size={18} />{profile.phone}</p>
          <p className="flex items-center gap-3"><MapPin size={18} />{profile.location}</p>
        </div>
        <div className="space-y-4 rounded-3xl border p-6">
          <h2 className="text-xl font-bold">Security</h2>
          <p className="flex items-center gap-3"><Lock size={18} />Password and sign-in managed by the authentication service.</p>
          <p className="flex items-center gap-3"><Shield size={18} />Review security preferences in Settings.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <button onClick={openEditor} className="flex flex-col items-center gap-2 rounded-2xl border p-5"><Edit />Edit Profile</button>
        <button onClick={() => setMessage("Password changes require a connected authentication service.")} className="flex flex-col items-center gap-2 rounded-2xl border p-5"><Key />Change Password</button>
        <button onClick={downloadProfile} className="flex flex-col items-center gap-2 rounded-2xl border p-5"><Download />Download Profile</button>
        <button onClick={() => photoInput.current?.click()} className="flex flex-col items-center gap-2 rounded-2xl border p-5"><Camera />Update Photo</button>
      </div>

      {editing && (
        <div role="dialog" aria-modal="true" aria-labelledby="profile-edit-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={saveProfile} className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 id="profile-edit-title" className="text-xl font-bold">Edit Profile</h2>
              <button type="button" onClick={() => setEditing(false)} className="rounded-lg border p-2"><X size={16} /></button>
            </div>
            {[
              ["name", "Full name"],
              ["title", "Job title"],
              ["department", "Department"],
              ["email", "Email", "email"],
              ["phone", "Phone"],
              ["location", "Location"],
            ].map(([key, label, type = "text"]) => (
              <label key={key} className="block">
                <span className="mb-1 block">{label}</span>
                <input type={type} required={key === "name" || key === "email"} value={draft[key]} onChange={(event) => setDraft((current) => ({ ...current, [key]: event.target.value }))} className="w-full rounded-xl border p-3" />
              </label>
            ))}
            {message && <p role="alert" className="text-sm text-red-700">{message}</p>}
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setEditing(false)} className="rounded-xl border px-4 py-2">Cancel</button>
              <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-white">Save Profile</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Stat({ icon, value, label }) {
  return <div className="rounded-3xl border p-5">{icon}<h2 className="mt-3 text-2xl font-bold">{value}</h2><p>{label}</p></div>;
}
