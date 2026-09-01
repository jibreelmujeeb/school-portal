import {
  Database,
  Download,
  Upload,
  RotateCcw,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  HardDrive,
  MoreVertical,
} from "lucide-react";

const backups = [
  {
    id: "BKP-2026-0081",
    name: "August Full Backup",
    type: "Full System",
    date: "31 Aug 2026, 02:00 AM",
    size: "1.8 GB",
    status: "Successful",
  },
  {
    id: "BKP-2026-0080",
    name: "Daily Backup",
    type: "Full System",
    date: "30 Aug 2026, 02:00 AM",
    size: "1.7 GB",
    status: "Successful",
  },
  {
    id: "BKP-2026-0079",
    name: "Finance Backup",
    type: "Database",
    date: "29 Aug 2026, 02:00 AM",
    size: "850 MB",
    status: "Successful",
  },
  {
    id: "BKP-2026-0078",
    name: "Daily Backup",
    type: "Full System",
    date: "28 Aug 2026, 02:00 AM",
    size: "-",
    status: "Failed",
  },
];

export default function AdminBackupRestorePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Backup & Restore
          </h1>

          <p className="mt-1 text-gray-500">
            Protect and recover your school portal data.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border px-5 py-3">
            <RotateCcw size={18} />
            Restore Backup
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white">
            <Plus size={18} />
            Create Backup
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={<Database size={22} />}
          value="48"
          label="Total Backups"
        />

        <StatCard
          icon={<CheckCircle2 size={22} />}
          value="46"
          label="Successful"
        />

        <StatCard
          icon={<AlertTriangle size={22} />}
          value="2"
          label="Failed"
        />

        <StatCard
          icon={<HardDrive size={22} />}
          value="12.4 GB"
          label="Storage Used"
        />
      </div>

      {/* Last Backup */}
      <div className="rounded-3xl border p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl border p-3">
              <Database size={24} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">
                  Last Backup
                </h2>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Successful
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                31 Aug 2026, 02:00 AM
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="rounded-xl border px-4 py-2">
              View Details
            </button>

            <button className="flex items-center gap-2 rounded-xl border px-4 py-2">
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Backup Schedule */}
      <div className="grid gap-4 md:grid-cols-3">
        <InfoCard
          icon={<Clock size={20} />}
          title="Automatic Backup"
          value="Enabled"
        />

        <InfoCard
          icon={<Clock size={20} />}
          title="Next Backup"
          value="Tomorrow, 02:00 AM"
        />

        <InfoCard
          icon={<HardDrive size={20} />}
          title="Retention"
          value="30 Days"
        />
      </div>

      {/* Backup History */}
      <div className="overflow-hidden rounded-3xl border">
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="text-xl font-bold">
              Backup History
            </h2>

            <p className="text-sm text-gray-500">
              View and manage previous system backups.
            </p>
          </div>

          <button className="rounded-xl border px-4 py-2">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="border-b">
              <tr>
                <th className="p-4 text-left">Backup ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Size</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {backups.map((backup) => (
                <tr
                  key={backup.id}
                  className="border-b last:border-b-0"
                >
                  <td className="p-4 font-medium">
                    {backup.id}
                  </td>

                  <td className="p-4">
                    {backup.name}
                  </td>

                  <td className="p-4">
                    {backup.type}
                  </td>

                  <td className="p-4 text-gray-500">
                    {backup.date}
                  </td>

                  <td className="p-4">
                    {backup.size}
                  </td>

                  <td className="p-4">
                    <StatusBadge status={backup.status} />
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        className="rounded-lg border p-2"
                        title="Download Backup"
                      >
                        <Download size={16} />
                      </button>

                      <button
                        className="rounded-lg border p-2"
                        title="Restore Backup"
                      >
                        <RotateCcw size={16} />
                      </button>

                      <button
                        className="rounded-lg border p-2"
                        title="More Actions"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Storage */}
      <div className="rounded-3xl border p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">
              Backup Storage
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              12.4 GB of 50 GB currently used.
            </p>
          </div>

          <HardDrive size={24} />
        </div>

        <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-[62%] rounded-full bg-blue-600" />
        </div>

        <div className="mt-4 flex flex-wrap justify-between gap-3 text-sm text-gray-500">
          <span>Used: 12.4 GB</span>
          <span>Available: 37.6 GB</span>
          <span>62% Used</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="rounded-2xl border p-5">
      {icon}

      <h2 className="mt-3 text-2xl font-bold">
        {value}
      </h2>

      <p className="text-sm text-gray-500">
        {label}
      </p>
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border p-5">
      <div className="flex items-center gap-3">
        {icon}

        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="font-semibold">
            {value}
          </h3>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Successful: "bg-green-100 text-green-700",
    Failed: "bg-red-100 text-red-700",
    Processing: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm ${
        styles[status]
      }`}
    >
      {status}
    </span>
  );
}