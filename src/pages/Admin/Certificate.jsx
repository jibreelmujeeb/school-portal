
import { useMemo, useState } from "react";
import {
  Award,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Download,
  Eye,
  FileBadge,
  FileText,
  GraduationCap,
  Plus,
  Printer,
  Search,
  ShieldCheck,
  Users,
  X,
  Ban,
  RotateCcw,
} from "lucide-react";

const initialCertificates = [
  {
    id: 1,
    certificateNo: "CERT-2026-0001",
    student: "Abdulrahman Jibreel",
    admissionNo: "STU-2026-0012",
    className: "SS 3A",
    type: "Graduation Certificate",
    issueDate: "2026-10-10",
    status: "Issued",
    description: "Certificate of successful completion of secondary education.",
  },
  {
    id: 2,
    certificateNo: "CERT-2026-0002",
    student: "Aisha Jibreel",
    admissionNo: "STU-2026-0045",
    className: "SS 3A",
    type: "Academic Excellence",
    issueDate: "",
    status: "Pending",
    description: "Recognition of outstanding academic performance.",
  },
  {
    id: 3,
    certificateNo: "CERT-2026-0003",
    student: "Muhammad Ibrahim",
    admissionNo: "STU-2026-0061",
    className: "SS 3A",
    type: "School Completion",
    issueDate: "",
    status: "Approved",
    description: "Confirmation of completion of the school programme.",
  },
  {
    id: 4,
    certificateNo: "CERT-2026-0004",
    student: "Fatimah Abdullahi",
    admissionNo: "STU-2026-0074",
    className: "JSS 3B",
    type: "Achievement Award",
    issueDate: "2026-10-15",
    status: "Issued",
    description: "Recognition of an outstanding school achievement.",
  },
  {
    id: 5,
    certificateNo: "CERT-2026-0005",
    student: "Yusuf Ahmed",
    admissionNo: "STU-2026-0088",
    className: "SS 3A",
    type: "Graduation Certificate",
    issueDate: "",
    status: "Revoked",
    description: "Certificate record revoked by the administration.",
  },
];

const certificateTypes = [
  "Graduation Certificate",
  "School Completion",
  "Academic Excellence",
  "Achievement Award",
  "Participation Certificate",
  "Course Completion",
];

const statusStyles = {
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  Approved: "border-blue-200 bg-blue-50 text-blue-700",
  Issued: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Revoked: "border-rose-200 bg-rose-50 text-rose-700",
};

const escapeHTML = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${
        statusStyles[status] || statusStyles.Pending
      }`}
    >
      {status}
    </span>
  );
}

function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <Icon size={21} className="text-slate-700" />
        </div>
      </div>
    </div>
  );
}

function CertificatePreview({ certificate, onClose, onPrint }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-3 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 p-4 sm:p-5">
          <div>
            <h2 className="font-semibold text-slate-900">
              Certificate Preview
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {certificate.certificateNo}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close preview"
          >
            <X size={20} />
          </button>
        </div>

        <div className="bg-slate-100 p-4 sm:p-8">
          <div className="mx-auto aspect-[1.414/1] w-full max-w-3xl border-[5px] border-double border-amber-700 bg-white p-3 sm:p-7">
            <div className="flex h-full flex-col items-center justify-center border border-amber-200 px-3 py-5 text-center sm:px-8">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-700 text-amber-700 sm:h-16 sm:w-16">
                <GraduationCap size={30} />
              </div>
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.35em]">
                School Name
              </p>
              <h3 className="mt-2 text-lg font-serif font-bold text-slate-900 sm:text-3xl">
                CERTIFICATE
              </h3>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-amber-700 sm:text-sm">
                {certificate.type}
              </p>

              <p className="mt-4 text-[10px] text-slate-500 sm:mt-8 sm:text-sm">
                This is to certify that
              </p>
              <h4 className="mt-2 break-words text-lg font-serif font-bold text-slate-900 sm:text-3xl">
                {certificate.student}
              </h4>
              <div className="mt-2 h-px w-3/4 bg-amber-300" />

              <p className="mt-3 max-w-lg text-[9px] leading-relaxed text-slate-600 sm:mt-5 sm:text-sm">
                {certificate.description}
              </p>

              <div className="mt-4 grid w-full grid-cols-2 gap-3 text-left text-[8px] text-slate-600 sm:mt-8 sm:gap-8 sm:text-xs">
                <div>
                  <p className="font-semibold text-slate-800">Certificate No.</p>
                  <p className="mt-1 break-words">{certificate.certificateNo}</p>
                  <p className="mt-2 font-semibold text-slate-800">Class</p>
                  <p className="mt-1">{certificate.className}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-800">Date Issued</p>
                  <p className="mt-1">
                    {certificate.issueDate || "Pending issuance"}
                  </p>
                  <p className="mt-2 font-semibold text-slate-800">Status</p>
                  <p className="mt-1">{certificate.status}</p>
                </div>
              </div>

              <div className="mt-auto flex w-full justify-between gap-4 pt-4 text-[8px] text-slate-500 sm:pt-8 sm:text-xs">
                <div className="border-t border-slate-400 pt-1">
                  Principal's Signature
                </div>
                <div className="border-t border-slate-400 pt-1">
                  School Stamp
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end gap-2 border-t border-slate-200 p-4 sm:flex-row sm:p-5">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
          <button
            onClick={onPrint}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            <Printer size={16} />
            Print Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminCertificate() {
  const [certificates, setCertificates] = useState(initialCertificates);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showRevokeForm, setShowRevokeForm] = useState(false);
  const [revokeReason, setRevokeReason] = useState("");
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    student: "",
    admissionNo: "",
    className: "SS 3A",
    type: "Graduation Certificate",
    description: "Certificate of successful completion of the school programme.",
  });

  const stats = useMemo(() => ({
    total: certificates.length,
    issued: certificates.filter((item) => item.status === "Issued").length,
    pending: certificates.filter((item) => item.status === "Pending").length,
    revoked: certificates.filter((item) => item.status === "Revoked").length,
  }), [certificates]);

  const filteredCertificates = useMemo(() => {
    return certificates.filter((certificate) => {
      const query = search.toLowerCase();

      const matchesSearch =
        certificate.student.toLowerCase().includes(query) ||
        certificate.admissionNo.toLowerCase().includes(query) ||
        certificate.certificateNo.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || certificate.status === statusFilter;

      const matchesType =
        typeFilter === "All" || certificate.type === typeFilter;

      const matchesClass =
        classFilter === "All" || certificate.className === classFilter;

      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Pending" && certificate.status === "Pending") ||
        (activeTab === "Approved" && certificate.status === "Approved") ||
        (activeTab === "Issued" && certificate.status === "Issued") ||
        (activeTab === "Revoked" && certificate.status === "Revoked");

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesClass &&
        matchesTab
      );
    });
  }, [
    certificates,
    search,
    statusFilter,
    typeFilter,
    classFilter,
    activeTab,
  ]);

  const createCertificate = (event) => {
    event.preventDefault();

    const newCertificate = {
      id: Date.now(),
      certificateNo: `CERT-${new Date().getFullYear()}-${String(
        certificates.length + 1
      ).padStart(4, "0")}`,
      student: form.student.trim(),
      admissionNo: form.admissionNo.trim(),
      className: form.className,
      type: form.type,
      issueDate: "",
      status: "Pending",
      description: form.description.trim(),
    };

    setCertificates((current) => [newCertificate, ...current]);
    setShowCreateForm(false);
    setForm({
      student: "",
      admissionNo: "",
      className: "SS 3A",
      type: "Graduation Certificate",
      description: "Certificate of successful completion of the school programme.",
    });
    setNotice("Certificate record created and added to pending review.");
  };

  const updateCertificateStatus = (certificate, status, message) => {
    const issueDate =
      status === "Issued"
        ? new Date().toISOString().slice(0, 10)
        : certificate.issueDate;

    setCertificates((current) =>
      current.map((item) =>
        item.id === certificate.id
          ? {
              ...item,
              status,
              issueDate,
              revokeReason: status === "Revoked" ? revokeReason.trim() : item.revokeReason,
            }
          : item
      )
    );

    setSelectedCertificate(null);
    setShowRevokeForm(false);
    setRevokeReason("");
    setNotice(message);
  };

  const printCertificate = (certificate) => {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      setNotice("Allow pop-ups in your browser to print certificates.");
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${escapeHTML(certificate.certificateNo)}</title>
        <style>
          @page { size: landscape; margin: 12mm; }
          body { font-family: Georgia, serif; color: #172033; text-align: center; }
          .frame { border: 8px double #a16207; padding: 36px; min-height: 75vh; }
          .inner { border: 1px solid #fde68a; padding: 28px; min-height: 60vh; display:flex; flex-direction:column; align-items:center; justify-content:center; }
          h1 { font-size: 42px; margin: 14px 0 8px; letter-spacing: 5px; }
          h2 { font-size: 28px; margin: 20px 0 8px; }
          .type { text-transform: uppercase; letter-spacing: 3px; color: #a16207; }
          .description { max-width: 650px; line-height: 1.8; margin: 18px auto; }
          .meta { width: 100%; display:flex; justify-content:space-between; text-align:left; margin-top:28px; font-size:12px; }
          .signatures { width:100%; display:flex; justify-content:space-between; margin-top:55px; font-size:12px; }
        </style>
      </head>
      <body>
        <div class="frame"><div class="inner">
          <p>✦ SCHOOL NAME ✦</p>
          <h1>CERTIFICATE</h1>
          <p class="type">${escapeHTML(certificate.type)}</p>
          <p>This is to certify that</p>
          <h2>${escapeHTML(certificate.student)}</h2>
          <p class="description">${escapeHTML(certificate.description)}</p>
          <div class="meta">
            <div>
              <strong>Certificate No.</strong><br>${escapeHTML(certificate.certificateNo)}<br><br>
              <strong>Admission No.</strong><br>${escapeHTML(certificate.admissionNo)}
            </div>
            <div style="text-align:right">
              <strong>Class</strong><br>${escapeHTML(certificate.className)}<br><br>
              <strong>Date Issued</strong><br>${escapeHTML(certificate.issueDate || "Not issued")}
            </div>
          </div>
          <div class="signatures">
            <span>________________________<br>Principal's Signature</span>
            <span>________________________<br>School Stamp</span>
          </div>
        </div></div>
        <script>window.onload = () => window.print();<\/script>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  const exportCSV = () => {
    const headers = [
      "Certificate Number",
      "Student",
      "Admission Number",
      "Class",
      "Certificate Type",
      "Issue Date",
      "Status",
      "Description",
    ];

    const rows = filteredCertificates.map((item) => [
      item.certificateNo,
      item.student,
      item.admissionNo,
      item.className,
      item.type,
      item.issueDate,
      item.status,
      item.description,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;",
      })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "admin-certificates.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const closeDetails = () => {
    setSelectedCertificate(null);
    setShowRevokeForm(false);
    setRevokeReason("");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <GraduationCap size={17} />
              <span>Admin Portal</span>
              <span>/</span>
              <span>Certificates</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Certificate Management
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Generate, review, issue, and verify student certificates.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={exportCSV}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <Download size={17} />
              Export CSV
            </button>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              <Plus size={17} />
              Create Certificate
            </button>
          </div>
        </div>

        {notice && (
          <div className="flex items-start justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <span>{notice}</span>
            <button onClick={() => setNotice("")} aria-label="Dismiss notice">
              <X size={17} />
            </button>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Certificates"
            value={stats.total}
            description="All certificate records"
            icon={FileBadge}
          />
          <StatCard
            title="Issued Certificates"
            value={stats.issued}
            description="Marked as issued"
            icon={BadgeCheck}
          />
          <StatCard
            title="Pending Requests"
            value={stats.pending}
            description="Awaiting review"
            icon={ClipboardList}
          />
          <StatCard
            title="Revoked Certificates"
            value={stats.revoked}
            description="Invalidated records"
            icon={ShieldCheck}
          />
        </div>

        {/* Quick workflow */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">Issuance Workflow</h2>
          <p className="mt-1 text-sm text-slate-500">
            Review each certificate before it is issued to a student.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                number: "01",
                title: "Review",
                description: "Confirm the student's identity and eligibility.",
              },
              {
                number: "02",
                title: "Approve",
                description: "Authorize the certificate for issuance.",
              },
              {
                number: "03",
                title: "Issue",
                description: "Record the issue date and print the certificate.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="flex items-start gap-3 rounded-xl border border-slate-200 p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700">
                  {step.number}
                </span>
                <div>
                  <p className="font-semibold text-slate-800">{step.title}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certificate table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Certificate Records
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Manage student certificates and their current status.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["All", "Pending", "Approved", "Issued", "Revoked"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`rounded-xl px-3 py-2 text-sm font-medium ${
                        activeTab === tab
                          ? "bg-slate-900 text-white"
                          : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="relative sm:col-span-2 xl:col-span-1">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search student or certificate no."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-slate-400"
                />
              </div>

              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(event) => setTypeFilter(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-3 pr-9 text-sm outline-none focus:border-slate-400"
                >
                  <option value="All">All Certificate Types</option>
                  {certificateTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <Users
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={classFilter}
                  onChange={(event) => setClassFilter(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-8 text-sm outline-none focus:border-slate-400"
                >
                  <option value="All">All Classes</option>
                  <option value="SS 3A">SS 3A</option>
                  <option value="JSS 3B">JSS 3B</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <ClipboardList
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-8 text-sm outline-none focus:border-slate-400"
                >
                  <option value="All">All Statuses</option>
                  {["Pending", "Approved", "Issued", "Revoked"].map(
                    (status) => (
                      <option key={status} value={status}>{status}</option>
                    )
                  )}
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Certificate</th>
                  <th className="px-5 py-4">Student</th>
                  <th className="px-5 py-4">Class</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Issue Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCertificates.map((certificate) => (
                  <tr key={certificate.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {certificate.certificateNo}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {certificate.admissionNo}
                      </p>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-800">
                      {certificate.student}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {certificate.className}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {certificate.type}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {certificate.issueDate || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={certificate.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedCertificate(certificate);
                            setShowRevokeForm(false);
                          }}
                          title="Preview certificate"
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                        >
                          <Eye size={16} />
                        </button>

                        {certificate.status === "Pending" && (
                          <button
                            onClick={() =>
                              updateCertificateStatus(
                                certificate,
                                "Approved",
                                `${certificate.student}'s certificate approved.`
                              )
                            }
                            title="Approve certificate"
                            className="rounded-lg border border-blue-200 p-2 text-blue-700 hover:bg-blue-50"
                          >
                            <Check size={16} />
                          </button>
                        )}

                        {certificate.status === "Approved" && (
                          <button
                            onClick={() =>
                              updateCertificateStatus(
                                certificate,
                                "Issued",
                                `${certificate.certificateNo} has been issued.`
                              )
                            }
                            title="Issue certificate"
                            className="rounded-lg border border-emerald-200 p-2 text-emerald-700 hover:bg-emerald-50"
                          >
                            <BadgeCheck size={16} />
                          </button>
                        )}

                        {certificate.status === "Issued" && (
                          <button
                            onClick={() => {
                              setSelectedCertificate(certificate);
                              setShowRevokeForm(true);
                            }}
                            title="Revoke certificate"
                            className="rounded-lg border border-rose-200 p-2 text-rose-700 hover:bg-rose-50"
                          >
                            <Ban size={16} />
                          </button>
                        )}

                        {certificate.status !== "Revoked" && (
                          <button
                            onClick={() => printCertificate(certificate)}
                            title="Print certificate"
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                          >
                            <Printer size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredCertificates.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-slate-500">
                      No certificates match your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-2 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:flex-row">
            <span>
              Showing {filteredCertificates.length} of {certificates.length} certificates
            </span>
            <span>Certificate Management</span>
          </div>
        </section>

        {/* Create certificate modal */}
        {showCreateForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-3 sm:p-6">
            <div className="my-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 p-5">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Create Certificate
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Enter the student's details to create a certificate record.
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  aria-label="Close form"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={createCertificate} className="space-y-4 p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">
                    Student Full Name
                    <input
                      required
                      value={form.student}
                      onChange={(event) =>
                        setForm({ ...form, student: event.target.value })
                      }
                      placeholder="Enter student name"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal outline-none focus:border-slate-400"
                    />
                  </label>

                  <label className="text-sm font-medium text-slate-700">
                    Admission Number
                    <input
                      required
                      value={form.admissionNo}
                      onChange={(event) =>
                        setForm({ ...form, admissionNo: event.target.value })
                      }
                      placeholder="e.g. STU-2026-0012"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 font-normal outline-none focus:border-slate-400"
                    />
                  </label>

                  <label className="text-sm font-medium text-slate-700">
                    Class
                    <select
                      value={form.className}
                      onChange={(event) =>
                        setForm({ ...form, className: event.target.value })
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 font-normal outline-none focus:border-slate-400"
                    >
                      <option>JSS 1A</option>
                      <option>JSS 2A</option>
                      <option>JSS 3B</option>
                      <option>SS 1A</option>
                      <option>SS 2A</option>
                      <option>SS 3A</option>
                    </select>
                  </label>

                  <label className="text-sm font-medium text-slate-700">
                    Certificate Type
                    <select
                      value={form.type}
                      onChange={(event) =>
                        setForm({ ...form, type: event.target.value })
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 font-normal outline-none focus:border-slate-400"
                    >
                      {certificateTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block text-sm font-medium text-slate-700">
                  Certificate Description
                  <textarea
                    required
                    rows={3}
                    value={form.description}
                    onChange={(event) =>
                      setForm({ ...form, description: event.target.value })
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal outline-none focus:border-slate-400"
                  />
                </label>

                <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                  >
                    <Plus size={16} />
                    Create Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Preview and revoke modal */}
        {selectedCertificate && (
          <div>
            <CertificatePreview
              certificate={selectedCertificate}
              onClose={closeDetails}
              onPrint={() => printCertificate(selectedCertificate)}
            />

            {showRevokeForm && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (!revokeReason.trim()) return;
                    updateCertificateStatus(
                      selectedCertificate,
                      "Revoked",
                      `${selectedCertificate.certificateNo} has been revoked.`
                    );
                  }}
                  className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">
                      Revoke Certificate
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowRevokeForm(false)}
                      aria-label="Close revoke form"
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-slate-600">
                    Explain why certificate {selectedCertificate.certificateNo} should be revoked. This action should be recorded in the audit history.
                  </p>
                  <textarea
                    required
                    value={revokeReason}
                    onChange={(event) => setRevokeReason(event.target.value)}
                    rows={4}
                    placeholder="Enter the reason for revocation..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-slate-400"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowRevokeForm(false)}
                      className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-rose-700 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-800"
                    >
                      Revoke Certificate
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
