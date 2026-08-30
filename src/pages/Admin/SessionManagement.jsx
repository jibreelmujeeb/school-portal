import {
  CalendarDays,
  GraduationCap,
  Users,
  BookOpen,
  Plus,
  Edit,
  Lock,
  Archive,
} from "lucide-react";

export default function AdminSessionManagementPage() {
  const sessions = [
    {
      name: "2026/2027",
      start: "07 Sep 2026",
      end: "30 Jul 2027",
      terms: 3,
      status: "Active",
    },
    {
      name: "2025/2026",
      start: "09 Sep 2025",
      end: "31 Jul 2026",
      terms: 3,
      status: "Completed",
    },
    {
      name: "2024/2025",
      start: "10 Sep 2024",
      end: "30 Jul 2025",
      terms: 3,
      status: "Archived",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row
        lg:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Session Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage academic sessions, terms and school calendars.
          </p>
        </div>

        <button
          className="bg-blue-600 text-white rounded-xl
            px-5 py-3 flex items-center gap-2"
        >
          <Plus size={18} />
          Create Session
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          icon={<CalendarDays />}
          value="2026/2027"
          label="Current Session"
        />

        <StatCard
          icon={<BookOpen />}
          value="First Term"
          label="Current Term"
        />

        <StatCard
          icon={<Users />}
          value="1,250"
          label="Students"
        />

        <StatCard
          icon={<GraduationCap />}
          value="3"
          label="Terms"
        />

      </div>

      {/* Current Session */}
      <div className="border rounded-3xl p-6">

        <div className="flex flex-col md:flex-row
          md:items-center justify-between gap-4">

          <div>

            <div className="flex items-center gap-3">

              <h2 className="text-2xl font-bold">
                2026/2027
              </h2>

              <span className="px-3 py-1
                rounded-full text-sm
                bg-green-100 text-green-700">
                Active
              </span>

            </div>

            <p className="text-gray-500 mt-2">
              07 September 2026 → 30 July 2027
            </p>

          </div>

          <button className="border rounded-xl px-5 py-3">
            Manage Session
          </button>

        </div>

      </div>

      {/* Terms */}
      <div className="border rounded-3xl p-6">

        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-xl font-bold">
              Terms
            </h2>

            <p className="text-sm text-gray-500">
              Manage terms for the current session.
            </p>
          </div>

          <button className="border rounded-xl p-3">
            <Plus size={18} />
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <TermCard
            name="First Term"
            start="07 Sep 2026"
            end="18 Dec 2026"
            status="Active"
          />

          <TermCard
            name="Second Term"
            start="11 Jan 2027"
            end="26 Mar 2027"
            status="Upcoming"
          />

          <TermCard
            name="Third Term"
            start="12 Apr 2027"
            end="30 Jul 2027"
            status="Upcoming"
          />

        </div>

      </div>

      {/* Session Table */}
      <div className="border rounded-3xl overflow-hidden">

        <div className="p-5 border-b">
          <h2 className="text-xl font-bold">
            Academic Sessions
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead className="border-b">

              <tr>
                <th className="p-4 text-left">Session</th>
                <th className="p-4 text-left">Start</th>
                <th className="p-4 text-left">End</th>
                <th className="p-4 text-left">Terms</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>

            </thead>

            <tbody>

              {sessions.map((session) => (

                <tr
                  key={session.name}
                  className="border-b"
                >

                  <td className="p-4 font-semibold">
                    {session.name}
                  </td>

                  <td className="p-4">
                    {session.start}
                  </td>

                  <td className="p-4">
                    {session.end}
                  </td>

                  <td className="p-4">
                    {session.terms}
                  </td>

                  <td className="p-4">

                    <span className="px-3 py-1
                      rounded-full text-sm
                      bg-gray-100">
                      {session.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex gap-2">

                      <button className="border rounded-lg p-2">
                        <Edit size={16} />
                      </button>

                      <button className="border rounded-lg p-2">
                        <Lock size={16} />
                      </button>

                      <button className="border rounded-lg p-2">
                        <Archive size={16} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="border rounded-2xl p-5">

      {icon}

      <h2 className="text-xl font-bold mt-3">
        {value}
      </h2>

      <p className="text-sm text-gray-500">
        {label}
      </p>

    </div>
  );
}

function TermCard({
  name,
  start,
  end,
  status,
}) {
  return (
    <div className="border rounded-2xl p-5">

      <div className="flex justify-between">

        <h3 className="font-bold">
          {name}
        </h3>

        <span className="text-sm">
          {status}
        </span>

      </div>

      <p className="text-sm text-gray-500 mt-3">
        {start} → {end}
      </p>

      <div className="flex gap-2 mt-5">

        <button className="border rounded-lg px-3 py-2
          flex items-center gap-2">

          <Edit size={15} />
          Edit

        </button>

        <button className="border rounded-lg px-3 py-2
          flex items-center gap-2">

          <Lock size={15} />
          Lock

        </button>

      </div>

    </div>
  );
}