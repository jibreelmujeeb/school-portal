import React from "react";
import {
  School,
  CheckCircle,
  Download,
  Printer,
  User,
  CreditCard,
  Calendar,
  Hash,
  QrCode,
} from "lucide-react";

const receipt = {
  receiptNo: "RCT-2026-001245",
  reference: "TRX987654321",
  studentName: "John Doe",
  admissionNo: "STD2026001",
  class: "SS2 Science",
  session: "2025/2026",
  term: "First Term",

  paymentDate: "15 June 2026",
  paymentMethod: "Bank Transfer",
  status: "Successful",

  items: [
    {
      name: "Tuition Fee",
      amount: 150000,
    },
    {
      name: "Library Fee",
      amount: 5000,
    },
    {
      name: "Examination Fee",
      amount: 10000,
    },
  ],

  total: 165000,
};

export default function StudentReceiptPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <School className="text-blue-600" />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              Greenwood International School
            </h1>

            <p className="text-gray-500">
              Official Payment Receipt
            </p>

          </div>

        </div>

        <div className="flex gap-3">

          <button className="border rounded-xl px-5 py-3 flex items-center gap-2">
            <Printer size={18}/>
            Print
          </button>

          <button className="bg-blue-600 text-white rounded-xl px-5 py-3 flex items-center gap-2">
            <Download size={18}/>
            Download PDF
          </button>

        </div>

      </div>

      {/* Status */}

      <div className="border rounded-3xl p-6 bg-green-50">

        <div className="flex items-center gap-3">

          <CheckCircle className="text-green-600"/>

          <div>

            <h2 className="font-bold text-green-700">
              Payment Successful
            </h2>

            <p className="text-gray-600">
              Your payment has been received successfully.
            </p>

          </div>

        </div>

      </div>

      {/* Receipt Details */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="border rounded-3xl p-6 space-y-4">

          <h2 className="font-bold text-lg">
            Student Information
          </h2>

          <div className="flex items-center gap-2">
            <User size={18}/>
            {receipt.studentName}
          </div>

          <p>Admission No: {receipt.admissionNo}</p>

          <p>Class: {receipt.class}</p>

          <p>Session: {receipt.session}</p>

          <p>Term: {receipt.term}</p>

        </div>

        <div className="border rounded-3xl p-6 space-y-4">

          <h2 className="font-bold text-lg">
            Payment Information
          </h2>

          <div className="flex items-center gap-2">
            <Hash size={18}/>
            Receipt: {receipt.receiptNo}
          </div>

          <div className="flex items-center gap-2">
            <CreditCard size={18}/>
            {receipt.paymentMethod}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18}/>
            {receipt.paymentDate}
          </div>

          <p>
            Reference: {receipt.reference}
          </p>

          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
            {receipt.status}
          </span>

        </div>

      </div>

      {/* Fee Breakdown */}

      <div className="border rounded-3xl p-6">

        <h2 className="text-xl font-bold mb-6">
          Fee Breakdown
        </h2>

        <div className="overflow-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Fee Item
                </th>

                <th className="text-right py-3">
                  Amount
                </th>

              </tr>

            </thead>

            <tbody>

              {receipt.items.map((item,index)=>(
                <tr
                  key={index}
                  className="border-b"
                >
                  <td className="py-3">
                    {item.name}
                  </td>

                  <td className="text-right">
                    ₦{item.amount.toLocaleString()}
                  </td>

                </tr>
              ))}

            </tbody>

            <tfoot>

              <tr>

                <td className="font-bold py-4">
                  Total Paid
                </td>

                <td className="font-bold text-right text-lg">
                  ₦{receipt.total.toLocaleString()}
                </td>

              </tr>

            </tfoot>

          </table>

        </div>

      </div>

      {/* QR */}

      <div className="border rounded-3xl p-6 flex flex-col lg:flex-row justify-between items-center gap-6">

        <div>

          <h2 className="font-bold text-lg">
            Receipt Verification
          </h2>

          <p className="text-gray-500 mt-2">
            Scan the QR code to verify the authenticity
            of this payment receipt.
          </p>

        </div>

        <div className="w-32 h-32 border rounded-2xl flex items-center justify-center">

          <QrCode size={80}/>

        </div>

      </div>

    </div>
  );
}