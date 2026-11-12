export const initialPayments = [
  {
    id: "PAY001",
    student: "John David",
    admissionNo: "ADM2026001",
    feeType: "Tuition",
    amount: 150000,
    method: "Bank Transfer",
    reference: "TRX847392",
    date: "2026-07-21",
    status: "Pending",
  },
  {
    id: "PAY002",
    student: "Mary Johnson",
    admissionNo: "ADM2026002",
    feeType: "Hostel Fee",
    amount: 80000,
    method: "POS",
    reference: "POS983422",
    date: "2026-07-21",
    status: "Verified",
  },
];

export const initialExpenses = [
  {
    id: "EXP001",
    title: "Laboratory Equipment",
    category: "Laboratory",
    department: "Science",
    vendor: "ABC Scientific Ltd",
    amount: 450000,
    paymentMethod: "Bank Transfer",
    date: "2026-07-20",
    status: "Paid",
  },
  {
    id: "EXP002",
    title: "Office Supplies",
    category: "Office",
    department: "Administration",
    vendor: "Stationery World",
    amount: 65000,
    paymentMethod: "Cash",
    date: "2026-07-21",
    status: "Pending",
  },
];

export const initialBudgets = [
  { id: "BDG-001", category: "Staff Salaries", department: "Administration", budget: 50000000, spent: 28000000 },
  { id: "BDG-002", category: "Learning Materials", department: "Academic", budget: 20000000, spent: 12000000 },
  { id: "BDG-003", category: "Utilities", department: "Administration", budget: 15000000, spent: 14000000 },
  { id: "BDG-004", category: "Maintenance", department: "Facilities", budget: 10000000, spent: 12000000 },
];

export const formatNaira = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
