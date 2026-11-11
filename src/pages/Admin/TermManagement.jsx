import React, { useState } from "react";
import {
  CalendarDays,
  CheckCircle,
  Lock,
  Clock,
  Plus,
  Edit,
  MoreVertical,
} from "lucide-react";

const initialTerms = [
  {
    id: 1,
    name: "First Term",
    start: "07 Sep 2026",
    end: "18 Dec 2026",
    status: "Active",
    locked: false,
    session: "2026/2027",
  },
  {
    id: 2,
    name: "Second Term",
    start: "11 Jan 2027",
    end: "26 Mar 2027",
    status: "Upcoming",
    locked: false,
    session: "2026/2027",
  },
  {
    id: 3,
    name: "Third Term",
    start: "12 Apr 2027",
    end: "30 Jul 2027",
    status: "Upcoming",
    locked: false,
    session: "2026/2027",
  },
];

export default function AdminTermManagementPage() {
  const [terms, setTerms] = useState(initialTerms);
  const [session, setSession] = useState("2026/2027");
  const [currentTerm, setCurrentTerm] = useState("First Term");
  const [notice, setNotice] = useState("");
  const visibleTerms = terms.filter((term) => term.session === session);

  const createTerm = () => {
    const name = window.prompt("Enter a term name:");
    if (!name?.trim()) return;
    if (visibleTerms.some((term) => term.name.toLowerCase() === name.trim().toLowerCase())) {
      setNotice("A term with that name already exists.");
      return;
    }
    const start = window.prompt("Enter the term start date:");
    if (!start?.trim()) return;
    const end = window.prompt("Enter the term end date:");
    if (!end?.trim()) return;
    setTerms((items) => [...items, { id: Date.now(), name: name.trim(), start, end, status: "Upcoming", locked: false, session }]);
    setNotice(`${name.trim()} added to the local term list.`);
  };

  const editTerm = (term) => {
    const name = window.prompt("Term name:", term.name);
    if (!name?.trim()) return;
    setTerms((items) => items.map((item) => item.id === term.id ? { ...item, name: name.trim() } : item));
    setNotice(`${term.name} updated in the local term list.`);
  };

  const toggleLock = (term) => {
    setTerms((items) => items.map((item) => item.id === term.id
      ? item.locked
        ? { ...item, locked: false, status: item.statusBeforeLock || "Upcoming", statusBeforeLock: undefined }
        : { ...item, locked: true, statusBeforeLock: item.status, status: "Locked" }
      : item));
    setNotice(`${term.name} ${term.locked ? "unlocked" : "locked"} in the local term list.`);
  };

  const changeCurrentTerm = (name) => {
    setCurrentTerm(name);
    setTerms((items) => {
      const sessionTerms = items.filter((term) => term.session === session && !term.locked);
      const selectedIndex = sessionTerms.findIndex((term) => term.name === name);
      return items.map((term) => {
        if (term.session !== session || term.locked) return term;
        const index = sessionTerms.findIndex((item) => item.id === term.id);
        return { ...term, status: index < selectedIndex ? "Completed" : index === selectedIndex ? "Active" : "Upcoming" };
      });
    });
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row
        lg:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Term Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage academic terms for the current session.
          </p>
        </div>

        <button onClick={createTerm} className="bg-blue-600 text-white
          px-5 py-3 rounded-xl flex items-center gap-2">

          <Plus size={18} />
          Create Term

        </button>

      </div>
      {notice && <p role="status" className="text-sm text-blue-700">{notice}</p>}

      {/* Session Filter */}
      <div className="border rounded-2xl p-5">

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="text-sm font-medium">
              Academic Session
            </label>

            <select aria-label="Academic Session" value={session} onChange={(event) => setSession(event.target.value)} className="w-full border rounded-xl
              px-4 py-3 mt-2">

              <option>2026/2027</option>
              <option>2025/2026</option>

            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              Current Term
            </label>

            <select aria-label="Current Term" value={currentTerm} onChange={(event) => changeCurrentTerm(event.target.value)} className="w-full border rounded-xl
              px-4 py-3 mt-2">

              <option>First Term</option>
              <option>Second Term</option>
              <option>Third Term</option>

            </select>
          </div>

        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          icon={<CalendarDays />}
          value={currentTerm}
          label="Current Term"
        />

        <StatCard
          icon={<CalendarDays />}
        value={visibleTerms.length}
          label="Total Terms"
        />

        <StatCard
          icon={<CheckCircle />}
        value={visibleTerms.filter((term) => term.status === "Active").length}
          label="Active Term"
        />

        <StatCard
          icon={<Lock />}
          value={visibleTerms.filter((term) => term.locked).length}
          label="Locked Terms"
        />

      </div>

      {/* Term Cards */}
      <div className="grid md:grid-cols-3 gap-5">

        {visibleTerms.map((term) => (
          <TermCard
            key={term.id}
            term={term}
          onEdit={() => editTerm(term)}
          onToggleLock={() => toggleLock(term)}
          />
        ))}
        {visibleTerms.length === 0 && <p className="text-sm text-gray-500">No terms are recorded for {session} in this local list.</p>}

      </div>

      {/* Table */}
      <div className="border rounded-3xl overflow-hidden">

        <div className="p-5 border-b">
          <h2 className="text-xl font-bold">
            Term Overview
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead className="border-b">

              <tr>
                <th className="p-4 text-left">
                  Term
                </th>

                <th className="p-4 text-left">
                  Start Date
                </th>

                <th className="p-4 text-left">
                  End Date
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Locked
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {visibleTerms.map((term) => (

                <tr
                  key={term.id}
                  className="border-b"
                >

                  <td className="p-4 font-semibold">
                    {term.name}
                  </td>

                  <td className="p-4">
                    {term.start}
                  </td>

                  <td className="p-4">
                    {term.end}
                  </td>

                  <td className="p-4">
                    <StatusBadge status={term.status} />
                  </td>

                  <td className="p-4">
                    {term.locked ? (
                      <Lock size={18} />
                    ) : (
                      "No"
                    )}
                  </td>

                  <td className="p-4">

                    <div className="flex gap-2">

                      <button aria-label={`Edit ${term.name}`} title="Edit term" onClick={() => editTerm(term)} className="border rounded-lg p-2">
                        <Edit size={16} />
                      </button>

                      <button aria-label={`${term.locked ? "Unlock" : "Lock"} ${term.name}`} title="Toggle term lock" onClick={() => toggleLock(term)} className="border rounded-lg p-2">
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

    </div>
  );
}

function TermCard({ term, onEdit, onToggleLock }) {
  return (
    <div className="border rounded-3xl p-5">

      <div className="flex justify-between">

        <div className="p-3 border rounded-xl">
          <CalendarDays size={22} />
        </div>

        <StatusBadge status={term.status} />

      </div>

      <h2 className="text-xl font-bold mt-5">
        {term.name}
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        {term.start} → {term.end}
      </p>

      <div className="flex gap-2 mt-5">

        <button onClick={onEdit} className="flex-1 border rounded-xl
          px-4 py-2 flex justify-center items-center gap-2">

          <Edit size={16} />
          Manage

        </button>

        {term.status === "Active" || term.locked ? (
          <button aria-label={`${term.locked ? "Unlock" : "Lock"} ${term.name}`} onClick={onToggleLock} className="border rounded-xl px-3 py-2">
            <Lock size={16} />
          </button>
        ) : null}

      </div>

    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-green-100 text-green-700",
    Upcoming: "bg-blue-100 text-blue-700",
    Completed: "bg-gray-100 text-gray-700",
    Locked: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm
        ${styles[status] || styles.Completed}`}
    >
      {status}
    </span>
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