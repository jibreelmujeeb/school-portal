
import { useMemo, useRef, useState } from "react";
import {
  BookOpen, Search, Plus, UploadCloud, FileText,
  FileImage, FileVideo, Presentation, Download, Eye,
  Pencil, Trash2, X, CheckCircle, FilePenLine,
  Files, FolderOpen, Filter, BookMarked, GraduationCap,
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
    owner: "You",
    status: "Published",
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
    owner: "Mrs. Bello",
    status: "Published",
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
    owner: "You",
    status: "Draft",
    downloads: 0,
    date: "2026-10-17",
  },
  {
    _id: "4",
    title: "Computer Studies: Basic Concepts",
    description: "Presentation on computer fundamentals.",
    subject: "Computer Studies",
    className: "JSS 1",
    type: "PPTX",
    fileName: "computer-studies.pptx",
    size: "5.6 MB",
    owner: "Mr. Ade",
    status: "Published",
    downloads: 74,
    date: "2026-10-15",
  },
];

const classes = ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"];

const emptyForm = {
  title: "",
  description: "",
  subject: "",
  className: "",
  status: "Draft",
};

function FileIcon({ type }) {
  if (type === "PPT" || type === "PPTX") {
    return <Presentation size={22} />;
  }
  if (["JPG", "JPEG", "PNG"].includes(type)) {
    return <FileImage size={22} />;
  }
  if (["MP4", "MOV"].includes(type)) {
    return <FileVideo size={22} />;
  }
  return <FileText size={22} />;
}

function StatusBadge({ status }) {
  const styles = {
    Published: "bg-emerald-50 text-emerald-700",
    Draft: "bg-amber-50 text-amber-700",
    Unpublished: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
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

export default function TeacherLearningMaterials() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [tab, setTab] = useState("All Materials");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const fileInput = useRef(null);

  // In production, get the teacher identity and assigned
  // classes/subjects from your authenticated user/API.
  const teacherName = "You";

  const subjects = useMemo(
    () => [
      ...new Set(
        materials.map((m) => m.subject).filter(Boolean)
      ),
    ],
    [materials]
  );

  const myMaterials = materials.filter(
    (m) => m.owner === teacherName
  );

  const stats = {
    total: materials.length,
    mine: myMaterials.length,
    published: myMaterials.filter(
      (m) => m.status === "Published"
    ).length,
    drafts: myMaterials.filter((m) => m.status === "Draft").length,
  };

  const filteredMaterials = useMemo(() => {
    const term = search.trim().toLowerCase();

    return materials.filter((m) => {
      const matchesSearch = [
        m.title,
        m.subject,
        m.className,
        m.fileName,
      ].some((v) => (v || "").toLowerCase().includes(term));

      const matchesTab =
        tab === "All Materials" ||
        (tab === "My Materials" && m.owner === teacherName) ||
        (tab === "Published" && m.status === "Published") ||
        (tab === "Drafts" &&
          m.owner === teacherName &&
          m.status === "Draft");

      return (
        matchesSearch &&
        matchesTab &&
        (classFilter === "All Classes" ||
          m.className === classFilter) &&
        (subjectFilter === "All Subjects" ||
          m.subject === subjectFilter)
      );
    });
  }, [materials, search, classFilter, subjectFilter, tab]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFile(null);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (material) => {
    if (material.owner !== teacherName) {
      setNotice("You can only edit your own materials.");
      return;
    }

    setEditing(material);
    setForm({
      title: material.title,
      description: material.description || "",
      subject: material.subject,
      className: material.className,
      status: material.status,
    });
    setFile(null);
    setError("");
    setModalOpen(true);
  };

  const updateForm = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const saveMaterial = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (
      !form.title.trim() ||
      !form.subject.trim() ||
      !form.className
    ) {
      setError("Please enter a title, subject and class.");
      return;
    }

    if (!editing && !file) {
      setError("Select a file to upload.");
      return;
    }

    if (file && file.size > 20 * 1024 * 1024) {
      setError("The file must not exceed 20 MB.");
      return;
    }

    setSaving(true);

    try {
      // Production integration:
      // const data = new FormData();
      // Object.entries(form).forEach(([key, value]) => {
      //   data.append(key, value);
      // });
      // if (file) data.append("file", file);
      //
      // const token = localStorage.getItem("token");
      // const config = {
      //   headers: { Authorization: `Bearer ${token}` },
      // };
      //
      // if (editing) {
      //   await axios.put(
      //     `/api/teacher/learning-materials/${editing._id}`,
      //     data, config
      //   );
      // } else {
      //   await axios.post(
      //     "/api/teacher/learning-materials",
      //     data, config
      //   );
      // }

      const extension = file
        ? file.name.split(".").pop().toUpperCase()
        : editing?.type || "PDF";

      const newMaterial = {
        ...form,
        _id: editing?._id || crypto.randomUUID(),
        owner: teacherName,
        type: extension,
        fileName: file?.name || editing?.fileName || "",
        size: file
          ? file.size >= 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
            : `${Math.ceil(file.size / 1024)} KB`
          : editing?.size || "—",
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
      setNotice(
        editing
          ? "Your material has been updated."
          : "Your material has been added."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to save the material. Try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (material) => {
    if (material.owner !== teacherName) {
      setNotice("You cannot change another teacher's material.");
      return;
    }

    const nextStatus =
      material.status === "Published" ? "Unpublished" : "Published";

    try {
      // await axios.patch(
      //   `/api/teacher/learning-materials/${material._id}/status`,
      //   { status: nextStatus }
      // );

      setMaterials((current) =>
        current.map((m) =>
          m._id === material._id
            ? { ...m, status: nextStatus }
            : m
        )
      );

      setNotice(`Material is now ${nextStatus.toLowerCase()}.`);
    } catch {
      setNotice("Unable to update publication status.");
    }
  };

  const deleteMaterial = async (material) => {
    if (material.owner !== teacherName) {
      setNotice("You can only delete your own materials.");
      return;
    }

    if (!window.confirm(`Delete "${material.title}"?`)) return;

    try {
      // await axios.delete(
      //   `/api/teacher/learning-materials/${material._id}`
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
    setSubjectFilter("All Subjects");
    setTab("All Materials");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <BookOpen size={16} />
              <span>Teacher</span>
              <span>/</span>
              <span>Learning Materials</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Learning Materials
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Find resources and share learning materials with your students.
            </p>
          </div>

          <button
            onClick={openCreate}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
          >
            <Plus size={18} />
            Upload Material
          </button>
        </div>

        {notice && (
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
            <span>{notice}</span>
            <button onClick={() => setNotice("")} aria-label="Dismiss">
              <X size={17} />
            </button>
          </div>
        )}

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Available Materials"
            value={stats.total}
            icon={Files}
            description="Resources in your library"
          />
          <StatCard
            title="My Materials"
            value={stats.mine}
            icon={BookMarked}
            description="Resources you uploaded"
          />
          <StatCard
            title="Published by Me"
            value={stats.published}
            icon={CheckCircle}
            description="Currently published resources"
          />
          <StatCard
            title="My Drafts"
            value={stats.drafts}
            icon={FilePenLine}
            description="Resources not yet published"
          />
        </div>

        {/* Library */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="space-y-4 border-b border-slate-200 p-4 sm:p-5">
            <div>
              <h2 className="font-semibold text-slate-900">
                Resource Library
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Browse school resources or manage your own uploads.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "All Materials",
                "My Materials",
                "Published",
                "Drafts",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                    tab === item
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search materials..."
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none"
              >
                <option>All Classes</option>
                {classes.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none"
              >
                <option>All Subjects</option>
                {subjects.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>

              <button
                onClick={resetFilters}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm hover:bg-slate-50"
              >
                <Filter size={16} />
                Reset filters
              </button>
            </div>
          </div>

          {/* Responsive table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Material</th>
                  <th className="px-5 py-4 font-medium">Class / Subject</th>
                  <th className="px-5 py-4 font-medium">Uploaded By</th>
                  <th className="px-5 py-4 font-medium">Downloads</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredMaterials.map((material) => {
                  const isMine = material.owner === teacherName;

                  return (
                    <tr key={material._id} className="hover:bg-slate-50/70">
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
                        {isMine ? "You" : material.owner}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {material.downloads || 0}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={material.status} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            title="View details"
                            onClick={() => setViewing(material)}
                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                          >
                            <Eye size={17} />
                          </button>

                          {isMine && (
                            <>
                              <button
                                title="Edit material"
                                onClick={() => openEdit(material)}
                                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                              >
                                <Pencil size={17} />
                              </button>

                              <button
                                title={material.status === "Published" ? "Unpublish" : "Publish"}
                                onClick={() => togglePublish(material)}
                                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                              >
                                <CheckCircle size={17} />
                              </button>

                              <button
                                title="Delete material"
                                onClick={() => deleteMaterial(material)}
                                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                              >
                                <Trash2 size={17} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredMaterials.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <FolderOpen
                        size={36}
                        className="mx-auto text-slate-300"
                      />
                      <p className="mt-3 font-medium text-slate-800">
                        No learning materials found
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try another search or upload your first material.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Upload / edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
          <div className="my-auto w-full max-w-2xl rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="font-semibold text-slate-900">
                  {editing ? "Edit Material" : "Upload Learning Material"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Share useful resources with your assigned class.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-2 hover:bg-slate-100"
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
                  placeholder="Enter material title"
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
                  placeholder="Describe this learning resource"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
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
                    {classes.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
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
                    <option value="Draft">Save as Draft</option>
                    <option value="Published">Publish</option>
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
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  className="flex w-full flex-col items-center rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center hover:bg-slate-50"
                >
                  <UploadCloud size={26} className="text-slate-500" />
                  <span className="mt-2 text-sm font-medium text-slate-800">
                    {file
                      ? file.name
                      : editing
                      ? "Choose replacement file (optional)"
                      : "Click to select a file"}
                  </span>
                  <span className="mt-1 text-xs text-slate-500">
                    PDF, Word, PowerPoint, images or video · Maximum 20 MB
                  </span>
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

      {/* Details modal */}
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
                <div>
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

              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Subject", viewing.subject],
                  ["Class", viewing.className],
                  ["File Type", viewing.type],
                  ["File Size", viewing.size],
                  ["Uploaded By", viewing.owner],
                  ["Downloads", viewing.downloads],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-slate-200 p-3">
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-1 break-words text-sm font-medium text-slate-800">
                      {value ?? "—"}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-end gap-3">
                {viewing.owner === teacherName && (
                  <button
                    onClick={() => {
                      const material = viewing;
                      setViewing(null);
                      openEdit(material);
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                )}
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
