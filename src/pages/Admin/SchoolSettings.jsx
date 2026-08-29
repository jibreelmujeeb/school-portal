import {
  School,
  CalendarDays,
  GraduationCap,
  Wallet,
  Bell,
  ShieldCheck,
  Database,
  Receipt,
  Save,
} from "lucide-react";

const settings = [
  {
    name: "School Profile",
    icon: School,
  },
  {
    name: "Academic",
    icon: CalendarDays,
  },
  {
    name: "Grading",
    icon: GraduationCap,
  },
  {
    name: "Fees & Payments",
    icon: Wallet,
  },
  {
    name: "Receipts",
    icon: Receipt,
  },
  {
    name: "Notifications",
    icon: Bell,
  },
  {
    name: "Security",
    icon: ShieldCheck,
  },
  {
    name: "Backup & Data",
    icon: Database,
  },
];

export default function AdminSchoolSettingsPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          School Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Configure and manage your school portal.
        </p>
      </div>

      <div className="grid lg:grid-cols-[250px_1fr] gap-6">

        {/* Settings Navigation */}
        <aside className="border rounded-2xl p-3 h-fit">

          {settings.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className="w-full flex items-center
                  gap-3 px-4 py-3 rounded-xl
                  text-left hover:bg-gray-100"
              >
                <Icon size={18} />

                <span>
                  {item.name}
                </span>
              </button>
            );
          })}

        </aside>

        {/* Content */}
        <main className="space-y-6">

          {/* School Profile */}
          <section className="border rounded-3xl p-6">

            <div className="mb-6">
              <h2 className="text-xl font-bold">
                School Profile
              </h2>

              <p className="text-sm text-gray-500">
                Basic information about the school.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <Input
                label="School Name"
                value="Bright Future International School"
              />

              <Input
                label="School Code"
                value="BFIS001"
              />

              <Input
                label="Phone"
                value="+234 xxx xxx xxxx"
              />

              <Input
                label="Email"
                value="school@example.com"
              />

            </div>

            <div className="mt-6">

              <label className="block text-sm font-medium mb-2">
                School Address
              </label>

              <textarea
                rows="4"
                className="w-full border rounded-xl
                  px-4 py-3 outline-none"
                defaultValue="25 School Road, Benin City"
              />

            </div>

            <button className="mt-6 bg-blue-600 text-white
              px-5 py-3 rounded-xl flex items-center gap-2">

              <Save size={18} />

              Save Changes

            </button>

          </section>

          {/* Academic */}
          <section className="border rounded-3xl p-6">

            <h2 className="text-xl font-bold">
              Academic Settings
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              <Select
                label="Current Session"
                value="2026/2027"
              />

              <Select
                label="Current Term"
                value="First Term"
              />

            </div>

            <button className="mt-6 bg-blue-600 text-white
              px-5 py-3 rounded-xl flex items-center gap-2">

              <Save size={18} />

              Save Academic Settings

            </button>

          </section>

          {/* Security */}
          <section className="border rounded-3xl p-6">

            <h2 className="text-xl font-bold">
              Security Settings
            </h2>

            <div className="space-y-4 mt-6">

              <Toggle
                label="Two-Factor Authentication"
                enabled
              />

              <Toggle
                label="Require Strong Password"
                enabled
              />

              <Toggle
                label="Login Activity Tracking"
                enabled
              />

              <Toggle
                label="Audit Trail"
                enabled
              />

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

function Input({ label, value }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      <input
        defaultValue={value}
        className="w-full border rounded-xl
          px-4 py-3 outline-none"
      />
    </div>
  );
}

function Select({ label, value }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      <select
        defaultValue={value}
        className="w-full border rounded-xl
          px-4 py-3 outline-none"
      >
        <option>{value}</option>
      </select>
    </div>
  );
}

function Toggle({ label, enabled }) {
  return (
    <div className="flex items-center
      justify-between border-b pb-4">

      <span>{label}</span>

      <button
        className={`w-12 h-6 rounded-full
          ${enabled ? "bg-blue-600" : "bg-gray-300"}`}
      >
        <span className="block w-5 h-5 bg-white
          rounded-full ml-1" />
      </button>

    </div>
  );
}