export const parentPaymentsStorageKey = "parent-portal-payments";

export const initialParentPayments = [
  {
    id: 1,
    receiptNo: "REC-2026-001",
    child: "John Doe",
    feeType: "School Fees",
    amount: 120000,
    date: "2026-01-15",
    method: "Bank Transfer",
    status: "Paid",
  },
  {
    id: 2,
    receiptNo: "REC-2026-015",
    child: "Mary Doe",
    feeType: "Examination Fee",
    amount: 15000,
    date: "2026-02-20",
    method: "Card Payment",
    status: "Paid",
  },
  {
    id: 3,
    receiptNo: "REC-2026-028",
    child: "John Doe",
    feeType: "Transport Fee",
    amount: 25000,
    date: "2026-03-12",
    method: "Cash",
    status: "Pending Verification",
  },
];

export function downloadCsv(filename, rows) {
  const contents = rows
    .map((row) =>
      row
        .map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`)
        .join(",")
    )
    .join("\r\n");
  const blob = new Blob(["\uFEFF", contents], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function downloadPaymentRecord(payment) {
  const contents = [
    "School payment record",
    `Receipt: ${payment.receiptNo}`,
    `Child: ${payment.child}`,
    `Fee: ${payment.feeType}`,
    `Amount: NGN ${Number(payment.amount).toLocaleString()}`,
    `Date: ${payment.date}`,
    `Method: ${payment.method}`,
    `Status: ${payment.status}`,
  ].join("\r\n");
  const blob = new Blob([contents], { type: "text/plain;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${payment.receiptNo.toLowerCase()}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

export function createParentPaymentRequest({
  child,
  feeType,
  amount,
  method,
  reference,
}) {
  const id = Date.now();
  return {
    id,
    receiptNo: `PAY-${id}`,
    child,
    feeType,
    amount,
    date: new Date().toISOString().slice(0, 10),
    method,
    reference,
    status: "Pending Verification",
  };
}
