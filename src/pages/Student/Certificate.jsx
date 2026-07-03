import React, { useState } from "react";
import {
  Award,
  Search,
  Download,
  Printer,
  Eye,
  Calendar,
  CheckCircle,
 Clock,
  ShieldCheck,
} from "lucide-react";

const certificates = [
  {
    id: 1,
    title: "Academic Excellence Award",
    type: "Academic",
    issuedDate: "2026-06-20",
    status: "Issued",
  },
  {
    id: 2,
    title: "Science Fair Participation",
    type: "Participation",
    issuedDate: "2026-05-18",
    status: "Issued",
  },
  {
    id: 3,
    title: "Sports Competition",
    type: "Sports",
    issuedDate: "-",
    status: "Pending",
  },
];

export default function StudentCertificatesPage() {
  const [search, setSearch] = useState("");

  const filteredCertificates = certificates.filter(
    (certificate) =>
      certificate.title.toLowerCase().includes(search.toLowerCase()) ||
      certificate.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            My Certificates
          </h1>

          <p className="text-gray-500 mt-2">
            View, download, and verify all certificates issued by the school.
          </p>
        </div>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Award className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">8</h2>
          <p>Total Certificates</p>
        </div>

        <div className="border rounded-3xl p-5">
          <CheckCircle className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">6</h2>
          <p>Issued</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Clock className="text-yellow-600 mb-3"/>
          <h2 className="text-2xl font-bold">2</h2>
          <p>Pending</p>
        </div>

        <div className="border rounded-3xl p-5">
          <ShieldCheck className="text-purple-600 mb-3"/>
          <h2 className="text-2xl font-bold">100%</h2>
          <p>Verified</p>
        </div>

      </div>

      {/* Search */}
      <div className="flex items-center border rounded-2xl px-4 py-3">

        <Search className="text-gray-500 mr-3"/>

        <input
          type="text"
          placeholder="Search certificates..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full outline-none"
        />

      </div>

      {/* Certificates */}
      <div className="border rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead className="bg-gray-50">

              <tr>
                <th className="text-left p-4">Certificate</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Issue Date</th>
                <th className="text-left p-4">Status</th>
                <th className="text-center p-4">Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredCertificates.map((certificate)=>(
                <tr key={certificate.id} className="border-t">

                  <td className="p-4 font-medium">
                    {certificate.title}
                  </td>

                  <td className="p-4">
                    {certificate.type}
                  </td>

                  <td className="p-4 flex items-center gap-2">
                    <Calendar size={16}/>
                    {certificate.issuedDate}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        certificate.status === "Issued"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {certificate.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button className="border rounded-lg p-2">
                        <Eye size={16}/>
                      </button>

                      <button className="border rounded-lg p-2">
                        <Download size={16}/>
                      </button>

                      <button className="border rounded-lg p-2">
                        <Printer size={16}/>
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Verification Notice */}
      <div className="border border-green-200 bg-green-50 rounded-3xl p-6">

        <div className="flex items-start gap-3">

          <ShieldCheck className="text-green-600 mt-1"/>

          <div>

            <h3 className="font-semibold">
              Certificate Verification
            </h3>

            <p className="text-gray-600 mt-2">
              Every certificate includes a unique QR code and verification ID,
              allowing employers, institutions, and other organizations to
              verify its authenticity online.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}