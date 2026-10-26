
import { useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  Search, Plus, UploadCloud, FileText, FileImage,
  FileVideo, Presentation, Download, Eye, Pencil,
  Trash2, X, Check, BookOpen, Files, CheckCircle,
  FilePenLine, FolderOpen, Filter, MoreVertical,
  CalendarDays, Users, GraduationCap, BookMarked,
} from "lucide-react";

const initialMaterials = [
  {
    _id: "1",
    title: "Introduction to Algebra",
    description: "Basic algebraic expressions and equations.",
    subject: "Mathematics",
    className: "JSS 2",
    type: "PDF",
    fileName: "introduction-to-algebra.pdf",
    size: "2.4 MB",
    status: "Published",
    audience: "Students",
    downloads: 126,
    date: "2026-10-20",
  },
  {
    _id: "2",
    title: "Cell Structure and Functions",
    description: "An introduction to cells and their functions.",
    subject: "Biology",
    className: "SS 1",
    type: "PDF",
    fileName: "cell-structure.pdf",
    size: "3.1 MB",
    status: "Published",
    audience: "Both",
    downloads: 98,
    date: "2026-10-18",
  },
  {
    _id: "3",
    title: "English Grammar - Term Notes",
    description: "Grammar notes for the current term.",
    subject: "English Language",
    className: "JSS 3",
    type: "DOCX",
    fileName: "english-grammar.docx",
    size: "1.2 MB",
    status: "Draft",
    audience: "Students",
    downloads: 0,
    date: "2026-10-17",
  },
  {
    _id: "4",
    title: "Computer Studies: Basic Concepts",
    description: "Class presentation on computer fundamentals.",
    subject: "Computer Studies",
    className: "JSS 1",
    type: "PPTX",
    fileName: "computer-studies.pptx",
    size: "5.6 MB",
    status: "Published",
    audience: "Both",
    downloads: 74,
    date: "2026-10-15",
  },
  {
    _id: "5",
    title: "Physics: Motion and Force",
    description: "Notes on motion, force and measurements.",
    subject: "Physics",
    className: "SS 2",
    type: "PDF",
    fileName: "motion-and-force.pdf",
    size: "2.8 MB",
    status: "Unpublished",
    audience: "Students",
    downloads: 0,
    date: "2026-10-12",
  },
];

const emptyForm = {
  title: "",
  description: "",
  subject: "",
  className: "",
  type: "PDF",
  audience: "Students",
  status: "Draft",
};

const classOptions = [
  "JSS 1", "JSS 2", "JSS 3",
  "SS 1", "SS 2", "SS 3",
];

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

const formatSize = (bytes) => {
  if (!bytes) return "—";
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${(bytes / 1024).toFixed(0)} KB`;
};

function FileIcon({ type }) {
  const props = { size: 22, strokeWidth: 1.7 };

  if (type === "PPTX" || type === "PPT") {
    return <Presentation {...props} />;
  }
  if (["JPG", "PNG", "WEBP"].includes(type)) {
    return <FileImage {...props} />;
  }
  if (["MP4", "MOV"].includes(type)) {
    return <FileVideo {...props} />;
  }
  return <FileText {...props} />;
}

function StatusBadge({ status }) {
  const styles = {
    Published: "bg-emerald-50 text-emerald-700",
    Draft: "bg-amber-50 text-amber-700",
    Unpublished: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] || styles.Draft
      }`}
    >
      {status}
    </span>
  );
}

function StatCard({ title, value, icon: Icon, description }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            {value}
          </h3>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>
        <div className="rounded-lg bg-slate-100 p-2.5 text-slate-700">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

export default function AdminLearningMaterials() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const fileInput = useRef(null);

  const stats = useMemo(() => ({
    total: materials.length,
    published: materials.filter(
      (m) => m.status === "Published"
    ).length,
    drafts: materials.filter((m) => m.status === "Draft").length,
    downloads: materials.reduce(
      (sum, m) => sum + (m.downloads || 0), 0
    ),
  }), [materials]);

  const filteredMaterials = useMemo(() => {
    const term = search.trim().toLowerCase();

    return materials.filter((m) => {
      const matchesSearch = [
        m.title, m.subject, m.className, m.fileName,
      ].some((v) => (v || "").toLowerCase().includes(term));

      return (
        matchesSearch &&
        (classFilter === "All Classes" ||
          m.className === classFilter) &&
        (typeFilter === "All Types" || m.type === typeFilter) &&
        (statusFilter === "All Statuses" ||
          m.status === statusFilter)
      );
    });
  }, [materials, search, classFilter, typeFilter, statusFilter]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFile(null);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (material) => {
    setEditing(material);
    setForm({
      title: material.title,
      description: material.description || "",
      subject: material.subject,
      className: material.className,
      type: material.type,
      audience: material.audience || "Students",
      status: material.status,
    });
    setFile(null);
    setError("");
    setModalOpen(true);
  };

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const saveMaterial = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!form.title.trim() || !form.subject || !form.className) {
      setError("Enter a title, subject and class.");
      return;
    }

    if (!editing && !file) {
      setError("Please select a learning material file.");
      return;
    }

    if (file && file.size > 20 * 1024 * 1024) {
      setError("The file must not exceed 20 MB.");
      return;
    }

    setSaving(true);

    try {
      // Replace with your authenticated backend API.
      // FormData allows the server to receive the actual file.
      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (file) data.append("file", file);

      // Example:
      // const token = localStorage.getItem("token");
      // const config = {
      //   headers: { Authorization: `Bearer ${token}` },
      // };
      //
      // if (editing) {
      //   await axios.put(
      //     `/api/admin/learning-materials/${editing._id}`,
      //     data, config
      //   );
      // } else {
      //   await axios.post(
      //     "/api/admin/learning-materials", data, config
      //   );
      // }

      const newMaterial = {
        ...form,
        _id: editing?._id || crypto.randomUUID(),
        fileName: file?.name || editing?.fileName || "",
        size: file ? formatSize(file.size) : editing?.size || "—",
        downloads: editing?.downloads || 0,
        date: new Date().toISOString(),
      };

      setMaterials((current) =>
        editing
          ? current.map((m) =>
              m._id === editing._id ? newMaterial : m
            )
          : [newMaterial, ...current]
      );

      setModalOpen(false);
      setNotice(editing ? "Material updated." : "Material added.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to save the material. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (material) => {
    const nextStatus =
      material.status === "Published" ? "Unpublished" : "Published";

    try {
      // Connect this action to your PATCH endpoint.
      // await axios.patch(
      //   `/api/admin/learning-materials/${material._id}/status`,
      //   { status: nextStatus }
      // );

      setMaterials((current) =>
        current.map((m) =>
          m._id === material._id
            ? { ...m, status: nextStatus }
            : m
        )
      );

      setNotice(`Material marked ${nextStatus.toLowerCase()}.`);
    } catch {
      setNotice("Could not update the publication status.");
    }
  };

  const deleteMaterial = async (material) => {
    const confirmed = window.confirm(
      `Delete "${material.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      // await axios.delete(
      //   `/api/admin/learning-materials/${material._id}`
      // );

      setMaterials((current) =>
        current.filter((m) => m._id !== material._id)
      );
      setNotice("Material deleted.");
    } catch {
      setNotice("Unable to delete this material.");
    }
  };

  const resetFilters = () => {
    setSearch("");
    setClassFilter("All Classes");
    setTypeFilter("All Types");
    setStatusFilter("All Statuses");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <BookOpen size={16} />
              <span>Admin</span>
              <span>/</span>
              <span>Learning Materials</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Learning Materials
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Upload, organize and manage educational resources.
            </p>
          </div>

          <button
            onClick={openCreate}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
          >
            <Plus size={18} />
            Add Material
          </button>
        </div>

        {/* Feedback */}
        {notice && (
          <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <span>{notice}</span>
            <button onClick={() => setNotice("")} aria-label="Dismiss">
              <X size={17} />
            </button>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Materials"
            value={stats.total}
            icon={Files}
            description="All uploaded resources"
          />
          <StatCard
            title="Published"
            value={stats.published}
            icon={CheckCircle}
            description="Available to permitted users"
          />
          <StatCard
            title="Drafts"
            value={stats.drafts}
            icon={FilePenLine}
            description="Materials awaiting publication"
          />
          <StatCard
            title="Total Downloads"
            value={stats.downloads.toLocaleString()}
            icon={Download}
            description="Recorded resource downloads"
          />
        </div>

        {/* Main table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  All Resources
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {filteredMaterials.length} materials found
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <div className="relative min-w-0 sm:min-w-64">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search title, subject..."
                    className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-slate-500"
                  />
                </div>

                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none"
                >
                  <option>All Classes</option>
                  {classOptions.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none"
                >
                  <option>All Types</option>
                  {["PDF", "DOCX", "DOC", "PPTX", "PPT", "JPG", "PNG", "MP4"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none"
                >
                  <option>All Statuses</option>
                  <option>Published</option>
                  <option>Draft</option>
                  <option>Unpublished</option>
                </select>

                <button
                  onClick={resetFilters}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm hover:bg-slate-50"
                >
                  <Filter size={16} />
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Material</th>
                  <th className="px-5 py-4 font-medium">Class / Subject</th>
                  <th className="px-5 py-4 font-medium">Audience</th>
                  <th className="px-5 py-4 font-medium">Date Added</th>
                  <th className="px-5 py-4 font-medium">Downloads</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredMaterials.map((material) => (
                  <tr
                    key={material._id}
                    className="hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                          <FileIcon type={material.type} />
                        </div>
                        <div className="max-w-64">
                          <p className="font-medium text-slate-900">
                            {material.title}
                          </p>
                          <p className="mt-1 truncate text-xs text-slate-500">
                            {material.fileName} · {material.size}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-800">
                        {material.className}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {material.subject}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {material.audience}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {formatDate(material.date)}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {(material.downloads || 0).toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={material.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          title="View details"
                          onClick={() => setViewing(material)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          title="Edit"
                          onClick={() => openEdit(material)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          title={
                            material.status === "Published"
                              ? "Unpublish"
                              : "Publish"
                          }
                          onClick={() => togglePublish(material)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Check size={17} />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => deleteMaterial(material)}
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredMaterials.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <FolderOpen
                        size={36}
                        className="mx-auto text-slate-300"
                      />
                      <p className="mt-3 font-medium text-slate-800">
                        No materials found
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try different filters or upload a new resource.
                      </p>
                      <button
                        onClick={resetFilters}
                        className="mt-4 text-sm font-medium text-slate-800 underline"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
          <div className="my-auto w-full max-w-2xl rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="font-semibold text-slate-900">
                  {editing ? "Edit Material" : "Upload Learning Material"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the resource details below.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-2 hover:bg-slate-100"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={saveMaterial} className="space-y-4 p-5">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Material Title *
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={updateForm}
                  required
                  placeholder="e.g. Introduction to Algebra"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={updateForm}
                  rows={3}
                  placeholder="Describe the contents of this material..."
                  className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Subject *
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={updateForm}
                    required
                    placeholder="e.g. Mathematics"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Class *
                  </label>
                  <select
                    name="className"
                    value={form.className}
                    onChange={updateForm}
                    required
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                  >
                    <option value="">Select class</option>
                    {classOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Access for
                  </label>
                  <select
                    name="audience"
                    value={form.audience}
                    onChange={updateForm}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none"
                  >
                    <option value="Students">Students</option>
                    <option value="Teachers">Teachers</option>
                    <option value="Both">Students and Teachers</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Publication Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={updateForm}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Unpublished">Unpublished</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Material File {!editing && "*"}
                </label>
                <input
                  ref={fileInput}
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.webp,.mp4"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    setFile(selectedFile || null);
                    if (selectedFile) {
                      const ext = selectedFile.name.split(".").pop().toUpperCase();
                      setForm((current) => ({ ...current, type: ext }));
                    }
                  }}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  className="flex w-full flex-col items-center rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center hover:bg-slate-50"
                >
                  <UploadCloud size={26} className="text-slate-500" />
                  <span className="mt-2 text-sm font-medium text-slate-800">
                    {file ? file.name : editing ? "Choose a replacement file (optional)" : "Choose a file to upload"}
                  </span>
                  <span className="mt-1 text-xs text-slate-500">
                    PDF, Word, PowerPoint, images or video · Maximum 20 MB
                  </span>
                  {file && (
                    <span className="mt-2 text-xs text-slate-500">
                      {formatSize(file.size)}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-60"
                >
                  <UploadCloud size={17} />
                  {saving ? "Saving..." : editing ? "Save Changes" : "Save Material"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
          <div className="my-auto w-full max-w-lg rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <h2 className="font-semibold text-slate-900">
                Material Details
              </h2>
              <button
                onClick={() => setViewing(null)}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-slate-100 p-3 text-slate-700">
                  <FileIcon type={viewing.type} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900">
                    {viewing.title}
                  </h3>
                  <p className="mt-1 break-all text-sm text-slate-500">
                    {viewing.fileName}
                  </p>
                  <div className="mt-2">
                    <StatusBadge status={viewing.status} />
                  </div>
                </div>
              </div>

              <p className="text-sm leading-6 text-slate-600">
                {viewing.description || "No description provided."}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Subject", viewing.subject],
                  ["Class", viewing.className],
                  ["File Type", viewing.type],
                  ["File Size", viewing.size],
                  ["Audience", viewing.audience],
                  ["Downloads", viewing.downloads],
                  ["Date Added", formatDate(viewing.date)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-slate-200 p-3">
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-1 break-words text-sm font-medium text-slate-800">
                      {value ?? "—"}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setViewing(null);
                    openEdit(viewing);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
                >
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  onClick={() => setViewing(null)}
                  className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
