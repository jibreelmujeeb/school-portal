import React, { useState } from "react";
import {
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

const initialProfile = {
  fullName: "Adewale Johnson",
  email: "parent@email.com",
  phone: "+234 800 000 0000",
  address: "Lagos, Nigeria",
};

export default function ParentProfilePage() {
  const [profile, setProfile, storageError] = usePersistentState(
    "parent-portal-profile",
    initialProfile
  );
  const [saved, setSaved] = useState(false);
  const [validationError, setValidationError] = useState("");

  const updateField = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setSaved(false);
    setValidationError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!profile.fullName.trim() || !profile.email.trim()) {
      setValidationError("Name and email address are required.");
      return;
    }
    setSaved(true);
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Parent Profile</h1>
        <p className="mt-2 text-sm text-gray-600">
          Update your contact information and review linked students.
        </p>
      </section>

      <section className="flex flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 sm:flex-row">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
          <User className="h-10 w-10 text-gray-500" />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold">{profile.fullName}</h2>
          <p className="mt-1 text-sm text-gray-500">Parent Account</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-600 sm:justify-start">
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {profile.email}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {profile.phone}
            </span>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <ProfileField
              icon={User}
              label="Full Name"
              value={profile.fullName}
              onChange={(value) => updateField("fullName", value)}
              required
            />
            <ProfileField
              icon={Mail}
              label="Email Address"
              type="email"
              value={profile.email}
              onChange={(value) => updateField("email", value)}
              required
            />
            <ProfileField
              icon={Phone}
              label="Phone Number"
              type="tel"
              value={profile.phone}
              onChange={(value) => updateField("phone", value)}
            />
            <ProfileField
              icon={MapPin}
              label="Address"
              value={profile.address}
              onChange={(value) => updateField("address", value)}
            />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="mb-5 text-lg font-semibold">Linked Students</h2>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <GraduationCap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-sm text-gray-500">
                  SS2 • Admission No: STD1023
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Student records are managed by the school. Contact the office if
              a linked student is missing.
            </p>
          </div>
        </section>

        {(storageError || validationError) && (
          <p role="alert" className="text-sm text-red-600">
            {storageError || validationError}
          </p>
        )}
        {saved && !storageError && (
          <p role="status" className="text-sm text-green-700">
            Profile changes saved in this browser.
          </p>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm text-white transition hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

function ProfileField({ icon: Icon, label, value, onChange, type = "text", required = false }) {
  const id = `parent-profile-${label.toLowerCase().replaceAll(" ", "-")}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-gray-500">
        {label}
      </label>
      <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2">
        {React.createElement(Icon, {
          className: "mr-2 h-4 w-4 shrink-0 text-gray-500",
        })}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>
    </div>
  );
}
