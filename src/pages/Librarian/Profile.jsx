import { useState } from "react";
import {
  Camera,
  Lock,
  Mail,
  Phone,
  MapPin,
  User,
  ShieldCheck,
  BookOpen,
  RotateCcw,
  AlertTriangle,
  Save,
} from "lucide-react";

const initialProfile = {
  fullName: "Aisha Bello",
  email: "aisha@school.com",
  phone: "08000000000",
  address: "School Staff Quarters",
  staffId: "LIB-0025",
  position: "Librarian",
  department: "Library",
  employmentType: "Full Time",
  dateEmployed: "10 January 2024",
  status: "Active",
};

export default function LibrarianProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  const updateField = (field) => (event) => {
    setProfile((current) => ({ ...current, [field]: event.target.value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    window.alert("Profile updated successfully.");
  };

  const handlePasswordChange = () => {
    const password = window.prompt("Enter new password:", "");
    if (!password || !password.trim()) return;
    window.alert("Password updated successfully.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-gray-500 mt-1">Manage your personal information and account security.</p>
      </div>

      <div className="border rounded-3xl p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center">
              <User size={48} />
            </div>
            <button onClick={() => window.alert("Profile photo upload coming soon.")} className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-600 text-white">
              <Camera size={16} />
            </button>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">{profile.fullName}</h2>
            <p className="text-gray-500">{profile.position}</p>
            <p className="text-sm text-gray-400">Staff ID: {profile.staffId}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="border rounded-2xl p-5"><BookOpen className="mb-3" /><h2 className="text-2xl font-bold">12,450</h2><p className="text-gray-500">Books Managed</p></div>
        <div className="border rounded-2xl p-5"><BookOpen className="mb-3" /><h2 className="text-2xl font-bold">1,286</h2><p className="text-gray-500">Books Issued</p></div>
        <div className="border rounded-2xl p-5"><RotateCcw className="mb-3" /><h2 className="text-2xl font-bold">1,120</h2><p className="text-gray-500">Books Returned</p></div>
        <div className="border rounded-2xl p-5"><AlertTriangle className="mb-3" /><h2 className="text-2xl font-bold">58</h2><p className="text-gray-500">Overdue Books</p></div>
      </div>

      <div className="border rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <User size={20} />
          <div>
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <p className="text-sm text-gray-500">Update your personal details.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-2 text-sm font-medium">Full Name</label>
            <input type="text" value={profile.fullName} onChange={updateField("fullName")} className="w-full border rounded-xl px-4 py-3 outline-none" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Email Address</label>
            <div className="flex items-center border rounded-xl px-4">
              <Mail size={18} />
              <input type="email" value={profile.email} onChange={updateField("email")} className="w-full px-3 py-3 outline-none" />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Phone Number</label>
            <div className="flex items-center border rounded-xl px-4">
              <Phone size={18} />
              <input type="text" value={profile.phone} onChange={updateField("phone")} className="w-full px-3 py-3 outline-none" />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Address</label>
            <div className="flex items-center border rounded-xl px-4">
              <MapPin size={18} />
              <input type="text" value={profile.address} onChange={updateField("address")} className="w-full px-3 py-3 outline-none" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button onClick={handleSave} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
            <Save size={18} />
            Save Changes
          </button>
          {saved && <span className="text-sm text-green-600 font-medium">Saved</span>}
        </div>
      </div>

      <div className="border rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-6">Professional Information</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Info label="Staff ID" value={profile.staffId} />
          <Info label="Position" value={profile.position} />
          <Info label="Department" value={profile.department} />
          <Info label="Employment Type" value={profile.employmentType} />
          <Info label="Date Employed" value={profile.dateEmployed} />
          <Info label="Status" value={profile.status} />
        </div>
      </div>

      <div className="border rounded-3xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck />
          <div>
            <h2 className="text-xl font-semibold">Account Security</h2>
            <p className="text-sm text-gray-500">Manage your password and account security.</p>
          </div>
        </div>

        <button onClick={handlePasswordChange} className="border px-5 py-3 rounded-xl flex items-center gap-2">
          <Lock size={18} />
          Change Password
        </button>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}