import { useMemo, useState } from "react";
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

const initialMembers = [
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

export default function LibrarianLibraryMembershipPage() {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [memberType, setMemberType] = useState("All Member Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [tab, setTab] = useState("All");

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch = [member.name, member.id, member.group].join(" ").toLowerCase().includes(search.trim().toLowerCase());
      const matchesType = memberType === "All Member Types" ||
        (memberType === "Students" && member.type === "Student") ||
        (memberType === "Teachers" && member.type === "Teacher") ||
        (memberType === "Staff" && member.type === "Staff");
      const matchesStatus = statusFilter === "All Status" || member.status === statusFilter;
      const matchesTab =
        tab === "All" ||
        (tab === "Students" && member.type === "Student") ||
        (tab === "Teachers" && member.type === "Teacher") ||
        (tab === "Staff" && member.type === "Staff") ||
        (tab === "Active" && member.status === "Active") ||
        (tab === "Expiring" && member.status === "Expiring") ||
        (tab === "Suspended" && member.status === "Suspended");

      return matchesSearch && matchesType && matchesStatus && matchesTab;
    });
  }, [members, search, memberType, statusFilter, tab]);

  const handleAddMember = () => {
    const name = window.prompt("Member name:", "");
    if (!name || !name.trim()) return;
    const id = window.prompt("Member ID:", `LIB-${Date.now().toString().slice(-5)}`);
    if (!id || !id.trim()) return;
    const typeValue = window.prompt("Type (Student/Teacher/Staff):", "Student");
    if (!typeValue || !typeValue.trim()) return;
    const groupValue = window.prompt("Class/Department:", "SS2A");
    if (!groupValue || !groupValue.trim()) return;
    const borrowedValue = window.prompt("Borrowed books:", "0");
    if (!borrowedValue || !Number.isInteger(Number(borrowedValue)) || Number(borrowedValue) < 0) return;
    const fineValue = window.prompt("Fine:", "₦0");
    if (fineValue === null) return;
    const expiryValue = window.prompt("Expiry date:", "20 Aug 2027");
    if (!expiryValue || !expiryValue.trim()) return;

    setMembers((current) => [{
      name: name.trim(),
      id: id.trim(),
      type: typeValue.trim(),
      group: groupValue.trim(),
      borrowed: Number(borrowedValue),
      fine: fineValue.trim() || "₦0",
      expiry: expiryValue.trim(),
      status: "Active",
    }, ...current]);
  };

  const handleEditMember = (member) => {
    const name = window.prompt("Member name:", member.name);
    if (!name || !name.trim()) return;
    const typeValue = window.prompt("Type (Student/Teacher/Staff):", member.type);
    if (!typeValue || !typeValue.trim()) return;
    const groupValue = window.prompt("Class/Department:", member.group);
    if (!groupValue || !groupValue.trim()) return;
    const borrowedValue = window.prompt("Borrowed books:", String(member.borrowed));
    if (!borrowedValue || !Number.isInteger(Number(borrowedValue)) || Number(borrowedValue) < 0) return;
    const fineValue = window.prompt("Fine:", member.fine);
    if (fineValue === null) return;
    const expiryValue = window.prompt("Expiry date:", member.expiry);
    if (!expiryValue || !expiryValue.trim()) return;

    setMembers((current) => current.map((item) => item.id === member.id ? {
      ...item,
      name: name.trim(),
      type: typeValue.trim(),
      group: groupValue.trim(),
      borrowed: Number(borrowedValue),
      fine: fineValue.trim(),
      expiry: expiryValue.trim(),
    } : item));
  };

  const handleDeleteMember = (member) => {
    if (window.confirm(`Remove ${member.name} from library membership?`)) {
      setMembers((current) => current.filter((item) => item.id !== member.id));
    }
  };

  const viewMember = (member) => {
    window.alert(`${member.name}\nID: ${member.id}\nType: ${member.type}\nClass/Dept: ${member.group}\nBorrowed: ${member.borrowed}\nFine: ${member.fine}\nExpiry: ${member.expiry}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Library Membership</h1>
          <p className="text-gray-500 mt-1">Manage library members and borrowing privileges.</p>
        </div>

        <button onClick={handleAddMember} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <UserPlus size={18} />
          Register Member
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Users />} value={members.length.toLocaleString()} label="Total Members" />
        <StatCard icon={<Users />} value={members.filter((member) => member.status === "Active").length.toLocaleString()} label="Active" />
        <StatCard icon={<RefreshCw />} value={members.filter((member) => member.status === "Expiring").length.toLocaleString()} label="Expiring Soon" />
        <StatCard icon={<Ban />} value={members.filter((member) => member.status === "Suspended").length.toLocaleString()} label="Suspended" />
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        <div className="border rounded-xl px-4 py-3 flex items-center flex-1">
          <Search size={18} />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, ID, barcode..."
            className="w-full ml-3 outline-none"
          />
        </div>

        <select value={memberType} onChange={(event) => setMemberType(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Member Types</option>
          <option>Students</option>
          <option>Teachers</option>
          <option>Staff</option>
        </select>

        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Status</option>
          <option>Active</option>
          <option>Expiring</option>
          <option>Suspended</option>
          <option>Expired</option>
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {[
          "All",
          "Students",
          "Teachers",
          "Staff",
          "Active",
          "Expiring",
          "Suspended",
        ].map((tabItem) => (
          <button
            key={tabItem}
            onClick={() => setTab(tabItem)}
            className={`px-5 py-2 rounded-xl whitespace-nowrap ${
              tab === tabItem ? "bg-blue-600 text-white" : "border"
            }`}
          >
            {tabItem}
          </button>
        ))}
      </div>

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">
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
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  No members match your filters.
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <MemberRow
                  key={member.id}
                  member={member}
                  onView={viewMember}
                  onEdit={handleEditMember}
                  onDelete={handleDeleteMember}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="border rounded-2xl p-5">
      <div className="mb-3">{icon}</div>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

function MemberRow({ member, onView, onEdit, onDelete }) {
  return (
    <tr className="border-b">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border flex items-center justify-center">
            <Users size={18} />
          </div>
          <div>
            <p className="font-semibold">{member.name}</p>
            <p className="text-xs text-gray-500">{member.id}</p>
          </div>
        </div>
      </td>

      <td className="p-4">{member.type}</td>
      <td className="p-4">{member.group}</td>
      <td className="p-4">{member.borrowed}</td>
      <td className="p-4">{member.fine}</td>
      <td className="p-4">{member.expiry}</td>

      <td className="p-4">
        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">{member.status}</span>
      </td>

      <td className="p-4">
        <div className="flex gap-2">
          <button onClick={() => onView(member)} className="border rounded-lg p-2" aria-label={`View ${member.name}`}>
            <Eye size={16} />
          </button>

          <button onClick={() => onEdit(member)} className="border rounded-lg p-2" aria-label={`Edit ${member.name}`}>
            <Edit size={16} />
          </button>

          <button className="border rounded-lg p-2" aria-label={`Payments ${member.name}`}>
            <CreditCard size={16} />
          </button>

          <button onClick={() => onDelete(member)} className="border rounded-lg p-2" aria-label={`Remove ${member.name}`}>
            <RefreshCw size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}