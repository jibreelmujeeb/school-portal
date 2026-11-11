import React, { useState } from "react";
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
  const [sessions, setSessions] = useState([
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
  ]);
  const [terms, setTerms] = useState([
    { name: "First Term", start: "07 Sep 2026", end: "18 Dec 2026", status: "Active" },
    { name: "Second Term", start: "11 Jan 2027", end: "26 Mar 2027", status: "Upcoming" },
    { name: "Third Term", start: "12 Apr 2027", end: "30 Jul 2027", status: "Upcoming" },
  ]);
  const [notice, setNotice] = useState("");
  const activeSession = sessions.find((session) => session.status === "Active") || sessions[0];
  const activeTerm = terms.find((term) => term.status === "Active") || terms[0];

  const createSession = () => {
    const name = window.prompt("Enter the academic session (for example, 2027/2028):");
    if (!name?.trim()) return;
    if (sessions.some((session) => session.name.toLowerCase() === name.trim().toLowerCase())) {
      setNotice("That session already exists.");
      return;
    }
    const start = window.prompt("Enter the start date:");
    if (!start?.trim()) return;
    const end = window.prompt("Enter the end date:");
    if (!end?.trim()) return;
    setSessions((current) => [...current, { name: name.trim(), start, end, terms: 0, status: "Upcoming" }]);
    setNotice(`${name.trim()} added to the local session list.`);
  };

  const createTerm = () => {
    const name = window.prompt("Enter a term name:");
    if (!name?.trim()) return;
    if (terms.some((term) => term.name.toLowerCase() === name.trim().toLowerCase())) {
      setNotice("A term with that name already exists.");
      return;
    }
    const start = window.prompt("Enter the term start date:");
    if (!start?.trim()) return;
    const end = window.prompt("Enter the term end date:");
    if (!end?.trim()) return;
    setTerms((current) => [...current, { name: name.trim(), start, end, status: "Upcoming" }]);
    setNotice(`${name.trim()} added to the local term list.`);
  };

  const updateSession = (name, action) => {
    const updatedName = action === "edit" ? window.prompt("Edit session name:", name) : null;
    if (action === "edit" && !updatedName?.trim()) return;
    setSessions((current) => current.map((session) => {
      if (session.name !== name) return session;
      if (action === "edit") return { ...session, name: updatedName.trim() };
      if (action === "lock") {
        return session.status === "Locked"
          ? { ...session, status: session.statusBeforeLock || "Upcoming", statusBeforeLock: undefined }
          : { ...session, statusBeforeLock: session.status, status: "Locked" };
      }
      return session.status === "Archived"
        ? { ...session, status: session.statusBeforeArchive || "Completed", statusBeforeArchive: undefined }
        : { ...session, statusBeforeArchive: session.status, status: "Archived" };
    }));
    setNotice(`${name} updated in the local session list.`);
  };

  const updateTerm = (name, action) => {
    const updatedName = action === "edit" ? window.prompt("Edit term name:", name) : null;
    if (action === "edit" && !updatedName?.trim()) return;
    setTerms((current) => current.map((term) => {
      if (term.name !== name) return term;
      if (action === "edit") return { ...term, name: updatedName.trim() };
      return term.status === "Locked"
        ? { ...term, status: term.statusBeforeLock || "Upcoming", statusBeforeLock: undefined }
        : { ...term, statusBeforeLock: term.status, status: "Locked" };
    }));
    setNotice(`${name} updated in the local term list.`);
  };

  const manageCurrentSession = () => {
    const start = window.prompt("Edit session start date:", activeSession?.start || "");
    if (!start?.trim()) return;
    const end = window.prompt("Edit session end date:", activeSession?.end || "");
    if (!end?.trim()) return;
    setSessions((current) => current.map((session) => session.name === activeSession?.name
      ? { ...session, start: start.trim(), end: end.trim() }
      : session));
    setNotice(`${activeSession?.name || "Session"} dates updated in the local list.`);
  };

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
          onClick={createSession}
          className="bg-blue-600 text-white rounded-xl
            px-5 py-3 flex items-center gap-2"
        >
          <Plus size={18} />
          Create Session
        </button>

      </div>
      {notice && <p role="status" className="text-sm text-blue-700">{notice}</p>}

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          icon={<CalendarDays />}
          value={activeSession?.name || "None"}
          label="Current Session"
        />

        <StatCard
          icon={<BookOpen />}
          value={activeTerm?.name || "None"}
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
                {activeSession?.name || "No session"}
              </h2>

              <span className="px-3 py-1
                rounded-full text-sm
                bg-green-100 text-green-700">
                {activeSession?.status || "Inactive"}
              </span>

            </div>

            <p className="text-gray-500 mt-2">
              {activeSession ? `${activeSession.start} → ${activeSession.end}` : "No active session"}
            </p>

          </div>

          <button onClick={manageCurrentSession} disabled={!activeSession} className="border rounded-xl px-5 py-3 disabled:opacity-40">
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

          <button aria-label="Create term" onClick={createTerm} className="border rounded-xl p-3">
            <Plus size={18} />
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          {terms.map((term) => <TermCard key={term.name} {...term} onEdit={() => updateTerm(term.name, "edit")} onToggleLock={() => updateTerm(term.name, "lock")} />)}

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

                      <button aria-label={`Edit ${session.name}`} title="Edit session" onClick={() => updateSession(session.name, "edit")} className="border rounded-lg p-2">
                        <Edit size={16} />
                      </button>

                      <button aria-label={`${session.status === "Locked" ? "Unlock" : "Lock"} ${session.name}`} title="Toggle session lock" onClick={() => updateSession(session.name, "lock")} className="border rounded-lg p-2">
                        <Lock size={16} />
                      </button>

                      <button aria-label={`${session.status === "Archived" ? "Unarchive" : "Archive"} ${session.name}`} title="Toggle archive" onClick={() => updateSession(session.name, "archive")} className="border rounded-lg p-2">
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

function TermCard({ name, start, end, status, onEdit, onToggleLock }) {
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

        <button onClick={onEdit} className="border rounded-lg px-3 py-2
          flex items-center gap-2">

          <Edit size={15} />
          Edit

        </button>

        <button aria-label={`${status === "Locked" ? "Unlock" : "Lock"} ${name}`} onClick={onToggleLock} className="border rounded-lg px-3 py-2
          flex items-center gap-2">

          <Lock size={15} />
          Lock

        </button>

      </div>

    </div>
  );
}