import React, { useMemo, useState } from "react";
import {
  Search,
  CreditCard,
  Wallet,
  Receipt,
  DollarSign,
  User,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import { formatNaira, initialPayments } from "../../data/accountantData";

const students = [
  { name: "John David", admissionNo: "ADM2026001", className: "SS2A", balance: 120000 },
  { name: "Mary Johnson", admissionNo: "ADM2026002", className: "JSS3B", balance: 45000 },
];

export default function FeesCollectionPage() {
  const [payments, setPayments, storageError] = usePersistentState(
    "accountant-payments",
    initialPayments
  );
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [feeType, setFeeType] = useState("Tuition");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Cash");
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState("");

  const matchingStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query
      ? students.filter((item) =>
          `${item.name} ${item.admissionNo}`.toLowerCase().includes(query)
        )
      : [];
  }, [search]);

  const verifiedPayments = payments.filter(
    (payment) => payment.status === "Verified"
  );

  const collectPayment = (event) => {
    event.preventDefault();
    const paidAmount = Number(amount);

    if (!selectedStudent) {
      setMessage("Select a student from the search results first.");
      return;
    }

    if (!Number.isFinite(paidAmount) || paidAmount <= 0) {
      setMessage("Enter a payment amount greater than zero.");
      return;
    }

    const now = new Date();
    const reference = `PAY-${now.getTime()}`;
    const payment = {
      id: reference,
      student: selectedStudent.name,
      admissionNo: selectedStudent.admissionNo,
      feeType,
      amount: paidAmount,
      method,
      reference,
      date: now.toISOString().slice(0, 10),
      status: "Verified",
      remarks: remarks.trim(),
    };

    setPayments((current) => [payment, ...current]);
    setAmount("");
    setRemarks("");
    setMessage(`Payment recorded successfully. Receipt: ${reference}`);
  };

  const selectStudent = (student) => {
    setSelectedStudent(student);
    setSearch(student.name);
    setMessage("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Fees Collection</h1>
        <p className="text-gray-500">
          Collect student fees and generate receipts.
        </p>
      </div>

      {storageError && (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {storageError}
        </p>
      )}

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <Stat icon={<DollarSign />} label="Collected" value={formatNaira(verifiedPayments.reduce((sum, item) => sum + item.amount, 0))} />
        <Stat icon={<User />} label="Payments" value={verifiedPayments.length} />
        <Stat icon={<Wallet />} label="Outstanding (sample students)" value={formatNaira(students.reduce((sum, item) => sum + item.balance, 0))} />
        <Stat icon={<Receipt />} label="Transactions" value={payments.length} />
      </div>

      <div className="border rounded-3xl p-6">
        <label htmlFor="student-search" className="mb-2 block font-semibold">
          Find student
        </label>
        <div className="flex items-center border rounded-xl px-4 py-3">
          <Search className="mr-3" />
          <input
            id="student-search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setSelectedStudent(null);
            }}
            placeholder="Search by name or admission number"
            className="outline-none w-full"
          />
        </div>
        {matchingStudents.length > 0 && (
          <ul className="mt-2 divide-y rounded-xl border">
            {matchingStudents.map((student) => (
              <li key={student.admissionNo}>
                <button
                  type="button"
                  className="w-full p-3 text-left hover:bg-gray-50"
                  onClick={() => selectStudent(student)}
                >
                  {student.name} · {student.admissionNo} · {student.className}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="border rounded-3xl p-6 space-y-4">
          <h2 className="font-bold text-xl">Student Information</h2>
          {selectedStudent ? (
            <>
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>Admission No:</strong> {selectedStudent.admissionNo}</p>
              <p><strong>Class:</strong> {selectedStudent.className}</p>
              <p><strong>Outstanding Balance:</strong> {formatNaira(selectedStudent.balance)}</p>
            </>
          ) : (
            <p className="text-gray-500">Search for and select a student to continue.</p>
          )}
        </div>

        <form onSubmit={collectPayment} className="border rounded-3xl p-6 space-y-4">
          <h2 className="font-bold text-xl">Payment Details</h2>
          <label className="sr-only" htmlFor="fee-type">Fee type</label>
          <select id="fee-type" value={feeType} onChange={(event) => setFeeType(event.target.value)} className="border rounded-xl p-3 w-full">
            <option>Tuition</option>
            <option>Hostel Fee</option>
            <option>Library Fee</option>
            <option>Examination Fee</option>
          </select>
          <label className="sr-only" htmlFor="amount-paid">Amount paid</label>
          <input id="amount-paid" type="number" min="1" step="1" required value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Amount paid" className="border rounded-xl p-3 w-full" />
          <label className="sr-only" htmlFor="payment-method">Payment method</label>
          <select id="payment-method" value={method} onChange={(event) => setMethod(event.target.value)} className="border rounded-xl p-3 w-full">
            <option>Cash</option>
            <option>Bank Transfer</option>
            <option>POS</option>
            <option>Card</option>
          </select>
          <label className="sr-only" htmlFor="payment-remarks">Remarks</label>
          <textarea id="payment-remarks" value={remarks} onChange={(event) => setRemarks(event.target.value)} placeholder="Remarks" className="border rounded-xl p-3 w-full" />
          {message && <p role="status" className="text-sm text-blue-700">{message}</p>}
          <button type="submit" className="bg-blue-600 text-white rounded-xl py-3 w-full flex justify-center gap-2">
            <CreditCard size={18} />
            Collect Payment
          </button>
        </form>
      </div>

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Receipt</th>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Fee Type</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Method</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t">
                <td className="p-3">{payment.reference}</td>
                <td className="p-3">{payment.student}</td>
                <td className="p-3">{payment.feeType}</td>
                <td className="p-3">{formatNaira(payment.amount)}</td>
                <td className="p-3">{payment.method}</td>
                <td className="p-3">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr><td className="p-5 text-center text-gray-500" colSpan="6">No payments recorded.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="border rounded-3xl p-5">
      <span className="mb-3 inline-block text-blue-600">{icon}</span>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p>{label}</p>
    </div>
  );
}
