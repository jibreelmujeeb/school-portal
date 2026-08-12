import {
  Settings,
  Library,
  BookOpen,
  DollarSign,
  Bell,
  Bot,
  ShieldCheck,
  Palette,
  Database,
  Save,
  Clock,
} from "lucide-react";

export default function LibrarianSettingsPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Library Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your library preferences, borrowing rules,
          notifications, and account settings.
        </p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-6">

        {/* Sidebar */}
        <aside className="border rounded-3xl p-3 h-fit">

          <SettingMenu
            icon={<Library />}
            label="Library Settings"
            active
          />

          <SettingMenu
            icon={<BookOpen />}
            label="Borrowing"
          />

          <SettingMenu
            icon={<DollarSign />}
            label="Fines"
          />

          <SettingMenu
            icon={<Bell />}
            label="Notifications"
          />

          <SettingMenu
            icon={<Bot />}
            label="Automation"
          />

          <SettingMenu
            icon={<ShieldCheck />}
            label="Security"
          />

          <SettingMenu
            icon={<Palette />}
            label="Appearance"
          />

          <SettingMenu
            icon={<Database />}
            label="Data & Reports"
          />

        </aside>

        {/* Content */}
        <main className="space-y-6">

          {/* Library Information */}
          <section className="border rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <Library />

              <div>
                <h2 className="text-xl font-semibold">
                  Library Information
                </h2>

                <p className="text-sm text-gray-500">
                  Configure your library details.
                </p>
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <Input
                label="Library Name"
                defaultValue="Main School Library"
              />

              <Input
                label="Library Code"
                defaultValue="LIB-001"
              />

              <Input
                label="Library Email"
                defaultValue="library@school.com"
              />

              <Input
                label="Library Phone"
                defaultValue="08000000000"
              />

              <Input
                label="Opening Time"
                type="time"
                defaultValue="08:00"
              />

              <Input
                label="Closing Time"
                type="time"
                defaultValue="16:00"
              />

            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium mb-2">
                Library Address
              </label>

              <textarea
                rows="3"
                defaultValue="Main School Campus"
                className="w-full border rounded-xl px-4 py-3 outline-none"
              />
            </div>

          </section>

          {/* Borrowing */}
          <section className="border rounded-3xl p-6">

            <SectionHeader
              icon={<BookOpen />}
              title="Borrowing Settings"
              description="Configure library borrowing rules."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

              <Input
                label="Student Book Limit"
                type="number"
                defaultValue="3"
              />

              <Input
                label="Teacher Book Limit"
                type="number"
                defaultValue="5"
              />

              <Input
                label="Borrowing Period (Days)"
                type="number"
                defaultValue="14"
              />

              <Input
                label="Renewal Limit"
                type="number"
                defaultValue="2"
              />

              <Input
                label="Renewal Period (Days)"
                type="number"
                defaultValue="7"
              />

              <Input
                label="Reservation Period (Days)"
                type="number"
                defaultValue="3"
              />

            </div>

          </section>

          {/* Fine Settings */}
          <section className="border rounded-3xl p-6">

            <SectionHeader
              icon={<DollarSign />}
              title="Fine Settings"
              description="Configure overdue and damage charges."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

              <Input
                label="Daily Overdue Fine"
                type="number"
                defaultValue="200"
              />

              <Input
                label="Maximum Fine"
                type="number"
                defaultValue="10000"
              />

              <Input
                label="Lost Book Charge"
                type="number"
                defaultValue="5000"
              />

              <Input
                label="Damaged Book Charge"
                type="number"
                defaultValue="2500"
              />

              <Input
                label="Replacement Charge"
                type="number"
                defaultValue="5000"
              />

            </div>

            <div className="mt-5 space-y-4">

              <Toggle
                label="Enable overdue fines"
                defaultChecked
              />

              <Toggle
                label="Allow partial fine payments"
                defaultChecked
              />

              <Toggle
                label="Allow authorized fine waivers"
              />

            </div>

          </section>

          {/* Notifications */}
          <section className="border rounded-3xl p-6">

            <SectionHeader
              icon={<Bell />}
              title="Notification Settings"
              description="Control library notifications."
            />

            <div className="space-y-4">

              <Toggle
                label="Email notifications"
                defaultChecked
              />

              <Toggle
                label="SMS notifications"
                defaultChecked
              />

              <Toggle
                label="Due-date reminders"
                defaultChecked
              />

              <Toggle
                label="Overdue reminders"
                defaultChecked
              />

              <Toggle
                label="Reservation notifications"
                defaultChecked
              />

              <Toggle
                label="Book request notifications"
                defaultChecked
              />

              <Toggle
                label="Fine and payment notifications"
                defaultChecked
              />

            </div>

          </section>

          {/* Automation */}
          <section className="border rounded-3xl p-6">

            <SectionHeader
              icon={<Bot />}
              title="Library Automation"
              description="Automate repetitive library operations."
            />

            <div className="space-y-4">

              <Toggle
                label="Automatically detect overdue books"
                defaultChecked
              />

              <Toggle
                label="Automatically calculate overdue fines"
                defaultChecked
              />

              <Toggle
                label="Automatically expire reservations"
                defaultChecked
              />

              <Toggle
                label="Automatically notify borrowers"
                defaultChecked
              />

              <Toggle
                label="Automatically update book availability"
                defaultChecked
              />

            </div>

          </section>

          {/* Security */}
          <section className="border rounded-3xl p-6">

            <SectionHeader
              icon={<ShieldCheck />}
              title="Security"
              description="Manage your librarian account security."
            />

            <div className="flex flex-wrap gap-3">

              <button className="border rounded-xl px-5 py-3">
                Change Password
              </button>

              <button className="border rounded-xl px-5 py-3">
                Enable Two-Factor Authentication
              </button>

              <button className="border rounded-xl px-5 py-3">
                View Login Activity
              </button>

            </div>

          </section>

          {/* Save */}
          <div className="flex justify-end">

            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
              <Save size={18} />
              Save Changes
            </button>

          </div>

        </main>

      </div>

    </div>
  );
}

function SettingMenu({ icon, label, active }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left ${
        active ? "bg-blue-600 text-white" : "hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function SectionHeader({ icon, title, description }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {icon}

      <div>
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function Input({
  label,
  type = "text",
  defaultValue,
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full border rounded-xl px-4 py-3 outline-none"
      />
    </div>
  );
}

function Toggle({
  label,
  defaultChecked = false,
}) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer">

      <span className="text-sm">
        {label}
      </span>

      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-5 w-5"
      />

    </label>
  );
}