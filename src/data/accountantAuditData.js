export const initialAuditEvents = [
  {
    id: "AUDIT-001",
    timestamp: "2026-11-12T21:42:00",
    user: "John Bello",
    action: "Payment Created",
    module: "Payments",
    record: "PAY-82931",
    status: "Success",
  },
  {
    id: "AUDIT-002",
    timestamp: "2026-11-12T21:35:00",
    user: "Mary Ali",
    action: "Budget Updated",
    module: "Budgeting",
    record: "BDG-001",
    status: "Success",
  },
  {
    id: "AUDIT-003",
    timestamp: "2026-11-12T21:20:00",
    user: "Ahmed Musa",
    action: "Refund Processed",
    module: "Payments",
    record: "PAY-82920",
    status: "Warning",
  },
  {
    id: "AUDIT-004",
    timestamp: "2026-11-12T20:55:00",
    user: "John Bello",
    action: "Payroll Approved",
    module: "Payroll",
    record: "PAYROLL-08",
    status: "Success",
  },
];

export function recordAccountantAuditEvent(event) {
  const saved = window.localStorage.getItem("accountant-audit-events");
  const events = saved === null ? initialAuditEvents : JSON.parse(saved);
  const nextEvents = [
    {
      id: `AUDIT-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date().toISOString(),
      user: "Current Accountant",
      status: "Success",
      ...event,
    },
    ...events,
  ].slice(0, 500);

  window.localStorage.setItem("accountant-audit-events", JSON.stringify(nextEvents));
  window.dispatchEvent(new CustomEvent("persistent-state-updated", {
    detail: {
      key: "accountant-audit-events",
      value: JSON.stringify(nextEvents),
    },
  }));
}
