import { useState } from "react";
import {
  Library,
  BookOpen,
  DollarSign,
  Bell,
  Bot,
  ShieldCheck,
  Palette,
  Database,
  Save,
} from "lucide-react";

const initialSettings = {
  libraryName: "Main School Library",
  libraryCode: "LIB-001",
  libraryEmail: "library@school.com",
  libraryPhone: "08000000000",
  openingTime: "08:00",
  closingTime: "16:00",
  libraryAddress: "Main School Campus",
  studentBookLimit: 3,
  teacherBookLimit: 5,
  borrowingPeriod: 14,
  renewalLimit: 2,
  renewalPeriod: 7,
  reservationPeriod: 3,
  dailyOverdueFine: 200,
  maximumFine: 10000,
  lostBookCharge: 5000,
  damagedBookCharge: 2500,
  replacementCharge: 5000,
  overdueFines: true,
  partialFinePayments: true,
  fineWaivers: false,
  emailNotifications: true,
  smsNotifications: true,
  dueDateReminders: true,
  overdueReminders: true,
  reservationNotifications: true,
  bookRequestNotifications: true,
  paymentNotifications: true,
  autoDetectOverdue: true,
  autoCalculateFines: true,
  autoExpireReservations: true,
  autoNotifyBorrowers: true,
  autoUpdateBookAvailability: true,
};

export default function LibrarianSettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState("library");
  const [saved, setSaved] = useState(false);

  const updateSetting = (field, value) => {
    setSettings((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    window.alert("Library settings saved successfully.");
  };

  const tabs = [
    { id: "library", label: "Library Settings", icon: <Library /> },
    { id: "borrowing", label: "Borrowing", icon: <BookOpen /> },
    { id: "fines", label: "Fines", icon: <DollarSign /> },
    { id: "notifications", label: "Notifications", icon: <Bell /> },
    { id: "automation", label: "Automation", icon: <Bot /> },
    { id: "security", label: "Security", icon: <ShieldCheck /> },
    { id: "appearance", label: "Appearance", icon: <Palette /> },
    { id: "reports", label: "Data & Reports", icon: <Database /> },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "library":
        return (
          <section className="border rounded-3xl p-6">
            <SectionHeader icon={<Library />} title="Library Information" description="Configure your library details." />
            <div className="grid md:grid-cols-2 gap-5">
              <Input label="Library Name" value={settings.libraryName} onChange={(value) => updateSetting("libraryName", value)} />
              <Input label="Library Code" value={settings.libraryCode} onChange={(value) => updateSetting("libraryCode", value)} />
              <Input label="Library Email" value={settings.libraryEmail} onChange={(value) => updateSetting("libraryEmail", value)} />
              <Input label="Library Phone" value={settings.libraryPhone} onChange={(value) => updateSetting("libraryPhone", value)} />
              <Input label="Opening Time" type="time" value={settings.openingTime} onChange={(value) => updateSetting("openingTime", value)} />
              <Input label="Closing Time" type="time" value={settings.closingTime} onChange={(value) => updateSetting("closingTime", value)} />
            </div>
            <div className="mt-5">
              <label className="block text-sm font-medium mb-2">Library Address</label>
              <textarea rows="3" value={settings.libraryAddress} onChange={(event) => updateSetting("libraryAddress", event.target.value)} className="w-full border rounded-xl px-4 py-3 outline-none" />
            </div>
          </section>
        );
      case "borrowing":
        return (
          <section className="border rounded-3xl p-6">
            <SectionHeader icon={<BookOpen />} title="Borrowing Settings" description="Configure library borrowing rules." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Input label="Student Book Limit" type="number" value={settings.studentBookLimit} onChange={(value) => updateSetting("studentBookLimit", Number(value))} />
              <Input label="Teacher Book Limit" type="number" value={settings.teacherBookLimit} onChange={(value) => updateSetting("teacherBookLimit", Number(value))} />
              <Input label="Borrowing Period (Days)" type="number" value={settings.borrowingPeriod} onChange={(value) => updateSetting("borrowingPeriod", Number(value))} />
              <Input label="Renewal Limit" type="number" value={settings.renewalLimit} onChange={(value) => updateSetting("renewalLimit", Number(value))} />
              <Input label="Renewal Period (Days)" type="number" value={settings.renewalPeriod} onChange={(value) => updateSetting("renewalPeriod", Number(value))} />
              <Input label="Reservation Period (Days)" type="number" value={settings.reservationPeriod} onChange={(value) => updateSetting("reservationPeriod", Number(value))} />
            </div>
          </section>
        );
      case "fines":
        return (
          <section className="border rounded-3xl p-6">
            <SectionHeader icon={<DollarSign />} title="Fine Settings" description="Configure overdue and damage charges." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Input label="Daily Overdue Fine" type="number" value={settings.dailyOverdueFine} onChange={(value) => updateSetting("dailyOverdueFine", Number(value))} />
              <Input label="Maximum Fine" type="number" value={settings.maximumFine} onChange={(value) => updateSetting("maximumFine", Number(value))} />
              <Input label="Lost Book Charge" type="number" value={settings.lostBookCharge} onChange={(value) => updateSetting("lostBookCharge", Number(value))} />
              <Input label="Damaged Book Charge" type="number" value={settings.damagedBookCharge} onChange={(value) => updateSetting("damagedBookCharge", Number(value))} />
              <Input label="Replacement Charge" type="number" value={settings.replacementCharge} onChange={(value) => updateSetting("replacementCharge", Number(value))} />
            </div>
            <div className="mt-5 space-y-4">
              <Toggle label="Enable overdue fines" checked={settings.overdueFines} onChange={(value) => updateSetting("overdueFines", value)} />
              <Toggle label="Allow partial fine payments" checked={settings.partialFinePayments} onChange={(value) => updateSetting("partialFinePayments", value)} />
              <Toggle label="Allow authorized fine waivers" checked={settings.fineWaivers} onChange={(value) => updateSetting("fineWaivers", value)} />
            </div>
          </section>
        );
      case "notifications":
        return (
          <section className="border rounded-3xl p-6">
            <SectionHeader icon={<Bell />} title="Notification Settings" description="Control library notifications." />
            <div className="space-y-4">
              <Toggle label="Email notifications" checked={settings.emailNotifications} onChange={(value) => updateSetting("emailNotifications", value)} />
              <Toggle label="SMS notifications" checked={settings.smsNotifications} onChange={(value) => updateSetting("smsNotifications", value)} />
              <Toggle label="Due-date reminders" checked={settings.dueDateReminders} onChange={(value) => updateSetting("dueDateReminders", value)} />
              <Toggle label="Overdue reminders" checked={settings.overdueReminders} onChange={(value) => updateSetting("overdueReminders", value)} />
              <Toggle label="Reservation notifications" checked={settings.reservationNotifications} onChange={(value) => updateSetting("reservationNotifications", value)} />
              <Toggle label="Book request notifications" checked={settings.bookRequestNotifications} onChange={(value) => updateSetting("bookRequestNotifications", value)} />
              <Toggle label="Fine and payment notifications" checked={settings.paymentNotifications} onChange={(value) => updateSetting("paymentNotifications", value)} />
            </div>
          </section>
        );
      case "automation":
        return (
          <section className="border rounded-3xl p-6">
            <SectionHeader icon={<Bot />} title="Library Automation" description="Automate repetitive library operations." />
            <div className="space-y-4">
              <Toggle label="Automatically detect overdue books" checked={settings.autoDetectOverdue} onChange={(value) => updateSetting("autoDetectOverdue", value)} />
              <Toggle label="Automatically calculate overdue fines" checked={settings.autoCalculateFines} onChange={(value) => updateSetting("autoCalculateFines", value)} />
              <Toggle label="Automatically expire reservations" checked={settings.autoExpireReservations} onChange={(value) => updateSetting("autoExpireReservations", value)} />
              <Toggle label="Automatically notify borrowers" checked={settings.autoNotifyBorrowers} onChange={(value) => updateSetting("autoNotifyBorrowers", value)} />
              <Toggle label="Automatically update book availability" checked={settings.autoUpdateBookAvailability} onChange={(value) => updateSetting("autoUpdateBookAvailability", value)} />
            </div>
          </section>
        );
      case "security":
        return (
          <section className="border rounded-3xl p-6">
            <SectionHeader icon={<ShieldCheck />} title="Security" description="Manage your librarian account security." />
            <div className="flex flex-wrap gap-3">
              <button onClick={() => window.alert("Password change flow triggered.")} className="border rounded-xl px-5 py-3">Change Password</button>
              <button onClick={() => window.alert("2FA enabled.")} className="border rounded-xl px-5 py-3">Enable Two-Factor Authentication</button>
              <button onClick={() => window.alert("Login activity shown.")} className="border rounded-xl px-5 py-3">View Login Activity</button>
            </div>
          </section>
        );
      case "appearance":
        return (
          <section className="border rounded-3xl p-6">
            <SectionHeader icon={<Palette />} title="Appearance" description="Customize the library workspace." />
            <div className="grid md:grid-cols-2 gap-5">
              <Input label="Primary Color" value="#2563eb" onChange={() => {}} />
              <Input label="Theme" value="Light" onChange={() => {}} />
            </div>
          </section>
        );
      case "reports":
        return (
          <section className="border rounded-3xl p-6">
            <SectionHeader icon={<Database />} title="Data & Reports" description="Configure reporting preferences." />
            <div className="space-y-4">
              <Toggle label="Generate daily library reports" checked={true} onChange={() => {}} />
              <Toggle label="Export overdue summaries" checked={true} onChange={() => {}} />
              <Toggle label="Auto-sync circulation stats" checked={true} onChange={() => {}} />
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Library Settings</h1>
        <p className="text-gray-500 mt-1">Manage your library preferences, borrowing rules, notifications, and account settings.</p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        <aside className="border rounded-3xl p-3 h-fit">
          {tabs.map(({ id, label, icon }) => (
            <SettingMenu key={id} icon={icon} label={label} active={activeTab === id} onClick={() => setActiveTab(id)} />
          ))}
        </aside>

        <main className="space-y-6">
          {renderTab()}

          <div className="flex justify-end items-center gap-3">
            {saved && <span className="text-sm text-green-600 font-medium">Changes saved</span>}
            <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function SettingMenu({ icon, label, active, onClick }) {
  return (
    <button type="button" onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left ${active ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}>
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
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

function Input({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="w-full border rounded-xl px-4 py-3 outline-none" />
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer">
      <span className="text-sm">{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5" />
    </label>
  );
}