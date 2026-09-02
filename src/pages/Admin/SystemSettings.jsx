import {
  Settings,
  School,
  GraduationCap,
  Users,
  CreditCard,
  ShieldCheck,
  Bell,
  Database,
  BookOpen,
  Globe,
  Save,
} from "lucide-react";

const settingSections = [
  {
    name: "General",
    icon: Settings,
  },
  {
    name: "School Information",
    icon: School,
  },
  {
    name: "Academic",
    icon: GraduationCap,
  },
  {
    name: "Users & Access",
    icon: Users,
  },
  {
    name: "Finance",
    icon: CreditCard,
  },
  {
    name: "Security",
    icon: ShieldCheck,
  },
  {
    name: "Notifications",
    icon: Bell,
  },
  {
    name: "Backup",
    icon: Database,
  },
  {
    name: "Library",
    icon: BookOpen,
  },
  {
    name: "Localization",
    icon: Globe,
  },
];

export default function AdminSystemSettingsPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          System Settings
        </h1>

        <p className="mt-1 text-gray-500">
          Configure and manage your school portal.
        </p>
      </div>

      {/* Search */}
      <div className="border rounded-2xl p-4">
        <input
          type="text"
          placeholder="Search settings..."
          className="w-full outline-none"
        />
      </div>

      {/* Settings */}
      <div className="grid lg:grid-cols-[250px_1fr] gap-6">

        {/* Sidebar */}
        <aside className="border rounded-2xl p-3 h-fit">

          <div className="space-y-1">

            {settingSections.map((section) => {
              const Icon = section.icon;

              return (
                <button
                  key={section.name}
                  className="w-full flex items-center
                    gap-3 rounded-xl px-4 py-3
                    text-left hover:bg-gray-100"
                >
                  <Icon size={18} />

                  <span>
                    {section.name}
                  </span>
                </button>
              );
            })}

          </div>

        </aside>

        {/* Content */}
        <main className="space-y-6">

          <section className="border rounded-3xl p-6">

            <div className="mb-6">
              <h2 className="text-xl font-bold">
                General Settings
              </h2>

              <p className="text-sm text-gray-500">
                Configure basic portal preferences.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <SettingInput
                label="Portal Name"
                value="School Management System"
              />

              <SettingInput
                label="School Code"
                value="SCH001"
              />

              <SettingInput
                label="Timezone"
                value="Africa/Lagos"
              />

              <SettingInput
                label="Currency"
                value="NGN ₦"
              />

            </div>

            <button
              className="mt-6 flex items-center gap-2
                rounded-xl bg-blue-600
                px-5 py-3 text-white"
            >
              <Save size={18} />
              Save Changes
            </button>

          </section>

          <section className="border rounded-3xl p-6">

            <h2 className="text-xl font-bold">
              Portal Access
            </h2>

            <div className="mt-5 space-y-4">

              <Toggle
                label="Student Portal"
                enabled
              />

              <Toggle
                label="Teacher Portal"
                enabled
              />

              <Toggle
                label="Parent Portal"
                enabled
              />

              <Toggle
                label="Accountant Portal"
                enabled
              />

              <Toggle
                label="Librarian Portal"
                enabled
              />

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

function SettingInput({ label, value }) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label}
      </label>

      <input
        defaultValue={value}
        className="mt-2 w-full rounded-xl
          border px-4 py-3 outline-none
          focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Toggle({ label, enabled }) {
  return (
    <div className="flex items-center justify-between
      border-b pb-4">

      <span>{label}</span>

      <button
        className={`h-6 w-11 rounded-full
          ${enabled ? "bg-blue-600" : "bg-gray-300"}`}
      >
        <span className="block h-5 w-5 rounded-full
          bg-white translate-x-5" />
      </button>

    </div>
  );
}