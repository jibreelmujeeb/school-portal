import {
  Users,
  UserPlus,
  Search,
  Eye,
  Edit,
  CreditCard,
  RefreshCw,
  Ban,
} from "lucide-react";

export default function LibrarianLibraryMembershipPage() {
  const members = [
    {
      name: "John Doe",
      id: "LIB-00125",
      type: "Student",
      group: "SS2A",
      borrowed: 2,
      fine: "₦0",
      expiry: "20 Aug 2027",
      status: "Active",
    },
    {
      name: "Mary Ali",
      id: "LIB-00126",
      type: "Student",
      group: "SS3B",
      borrowed: 0,
      fine: "₦500",
      expiry: "20 Aug 2027",
      status: "Active",
    },
    {
      name: "Mr. Bello",
      id: "LIB-T015",
      type: "Teacher",
      group: "Science",
      borrowed: 5,
      fine: "₦0",
      expiry: "20 Aug 2027",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row
        lg:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Library Membership
          </h1>

          <p className="text-gray-500 mt-1">
            Manage library members and borrowing privileges.
          </p>
        </div>

        <button className="bg-blue-600 text-white
          px-5 py-3 rounded-xl flex items-center gap-2">

          <UserPlus size={18} />
          Register Member

        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          icon={<Users />}
          value="2,850"
          label="Total Members"
        />

        <StatCard
          icon={<Users />}
          value="2,710"
          label="Active"
        />

        <StatCard
          icon={<RefreshCw />}
          value="85"
          label="Expiring Soon"
        />

        <StatCard
          icon={<Ban />}
          value="55"
          label="Suspended"
        />

      </div>

      {/* Search */}
      <div className="flex flex-col lg:flex-row gap-3">

        <div className="border rounded-xl px-4 py-3
          flex items-center flex-1">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search name, ID, barcode..."
            className="w-full ml-3 outline-none"
          />

        </div>

        <select className="border rounded-xl px-4 py-3">
          <option>All Member Types</option>
          <option>Students</option>
          <option>Teachers</option>
          <option>Staff</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Status</option>
          <option>Active</option>
          <option>Expiring</option>
          <option>Suspended</option>
          <option>Expired</option>
        </select>

      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">

        {[
          "All",
          "Students",
          "Teachers",
          "Staff",
          "Active",
          "Expiring",
          "Suspended",
        ].map((tab, index) => (
          <button
            key={tab}
            className={`px-5 py-2 rounded-xl
              whitespace-nowrap ${
                index === 0
                  ? "bg-blue-600 text-white"
                  : "border"
              }`}
          >
            {tab}
          </button>
        ))}

      </div>

      {/* Members Table */}
      <div className="border rounded-3xl overflow-hidden
        overflow-x-auto">

        <table className="w-full min-w-[1100px]">

          <thead className="border-b">
            <tr>
              <th className="p-4 text-left">Member</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Class/Dept.</th>
              <th className="p-4 text-left">Borrowed</th>
              <th className="p-4 text-left">Fine</th>
              <th className="p-4 text-left">Expiry</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {members.map((member) => (
              <MemberRow
                key={member.id}
                member={member}
              />
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="border rounded-2xl p-5">

      <div className="mb-3">
        {icon}
      </div>

      <h2 className="text-2xl font-bold">
        {value}
      </h2>

      <p className="text-sm text-gray-500">
        {label}
      </p>

    </div>
  );
}

function MemberRow({ member }) {
  return (
    <tr className="border-b">

      <td className="p-4">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full border
            flex items-center justify-center">

            <Users size={18} />

          </div>

          <div>
            <p className="font-semibold">
              {member.name}
            </p>

            <p className="text-xs text-gray-500">
              {member.id}
            </p>
          </div>

        </div>

      </td>

      <td className="p-4">
        {member.type}
      </td>

      <td className="p-4">
        {member.group}
      </td>

      <td className="p-4">
        {member.borrowed}
      </td>

      <td className="p-4">
        {member.fine}
      </td>

      <td className="p-4">
        {member.expiry}
      </td>

      <td className="p-4">

        <span className="px-3 py-1 rounded-full
          text-sm bg-green-100 text-green-700">
          {member.status}
        </span>

      </td>

      <td className="p-4">

        <div className="flex gap-2">

          <button className="border rounded-lg p-2">
            <Eye size={16} />
          </button>

          <button className="border rounded-lg p-2">
            <Edit size={16} />
          </button>

          <button className="border rounded-lg p-2">
            <CreditCard size={16} />
          </button>

          <button className="border rounded-lg p-2">
            <RefreshCw size={16} />
          </button>

        </div>

      </td>

    </tr>
  );
}