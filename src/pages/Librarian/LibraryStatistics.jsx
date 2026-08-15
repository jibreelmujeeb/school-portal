import {
  BookOpen,
  BookMarked,
  Clock3,
  RotateCcw,
  AlertTriangle,
  DollarSign,
  Users,
  Download,
  CalendarDays,
} from "lucide-react";

export default function LibraryStatisticsPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Library Statistics
          </h1>

          <p className="text-gray-500 mt-1">
            Monitor library performance, circulation and user activity.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">

          <select className="border rounded-xl px-4 py-3">
            <option>This Month</option>
            <option>This Week</option>
            <option>This Year</option>
            <option>Custom Range</option>
          </select>

          <button className="border rounded-xl px-5 py-3 flex items-center justify-center gap-2">
            <Download size={18} />
            Export Report
          </button>

        </div>

      </div>

      {/* Main Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          icon={<BookOpen />}
          value="4,250"
          label="Total Books"
        />

        <StatCard
          icon={<BookMarked />}
          value="2,840"
          label="Available"
        />

        <StatCard
          icon={<BookOpen />}
          value="1,180"
          label="Borrowed"
        />

        <StatCard
          icon={<Clock3 />}
          value="230"
          label="Overdue"
        />

      </div>

      {/* Secondary Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          icon={<RotateCcw />}
          value="3,420"
          label="Returned"
        />

        <StatCard
          icon={<CalendarDays />}
          value="125"
          label="Reserved"
        />

        <StatCard
          icon={<DollarSign />}
          value="₦245,000"
          label="Fines Collected"
        />

        <StatCard
          icon={<AlertTriangle />}
          value="38"
          label="Damaged"
        />

      </div>

      {/* Circulation */}
      <section className="border rounded-3xl p-6">

        <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">

          <div>
            <h2 className="text-xl font-semibold">
              Book Circulation
            </h2>

            <p className="text-sm text-gray-500">
              Borrowing and return activity over time.
            </p>
          </div>

          <select className="border rounded-xl px-4 py-2">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Yearly</option>
          </select>

        </div>

        <div className="h-72 flex items-center justify-center border rounded-2xl">
          <p className="text-gray-400">
            Circulation Chart
          </p>
        </div>

      </section>

      {/* Two Columns */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Most Borrowed */}
        <section className="border rounded-3xl p-6">

          <h2 className="text-xl font-semibold mb-5">
            Most Borrowed Books
          </h2>

          <div className="space-y-4">

            <BookRow
              rank="1"
              title="Mathematics for SS2"
              borrowed="245"
            />

            <BookRow
              rank="2"
              title="Advanced Physics"
              borrowed="218"
            />

            <BookRow
              rank="3"
              title="Biology Essentials"
              borrowed="195"
            />

            <BookRow
              rank="4"
              title="English Literature"
              borrowed="174"
            />

            <BookRow
              rank="5"
              title="Chemistry Complete Guide"
              borrowed="160"
            />

          </div>

        </section>

        {/* Active Borrowers */}
        <section className="border rounded-3xl p-6">

          <h2 className="text-xl font-semibold mb-5">
            Most Active Borrowers
          </h2>

          <div className="space-y-4">

            <BorrowerRow
              name="John Doe"
              className="SS2"
              books="42"
            />

            <BorrowerRow
              name="Mary Ali"
              className="SS3"
              books="38"
            />

            <BorrowerRow
              name="David James"
              className="SS2"
              books="35"
            />

            <BorrowerRow
              name="Sarah Bello"
              className="SS1"
              books="32"
            />

          </div>

        </section>

      </div>

      {/* Collection + Fines */}
      <div className="grid lg:grid-cols-2 gap-6">

        <section className="border rounded-3xl p-6">

          <h2 className="text-xl font-semibold mb-5">
            Collection Statistics
          </h2>

          <ProgressRow
            label="Good"
            value="4,050"
            percentage="95%"
          />

          <ProgressRow
            label="Damaged"
            value="38"
            percentage="1%"
          />

          <ProgressRow
            label="Under Repair"
            value="42"
            percentage="1%"
          />

          <ProgressRow
            label="Lost"
            value="25"
            percentage="1%"
          />

        </section>

        <section className="border rounded-3xl p-6">

          <h2 className="text-xl font-semibold mb-5">
            Fine Statistics
          </h2>

          <ProgressRow
            label="Collected"
            value="₦245,000"
            percentage="77%"
          />

          <ProgressRow
            label="Outstanding"
            value="₦75,000"
            percentage="23%"
          />

          <ProgressRow
            label="Waived"
            value="₦18,000"
            percentage="6%"
          />

        </section>

      </div>

      {/* E-Library */}
      <section className="border rounded-3xl p-6">

        <h2 className="text-xl font-semibold">
          E-Library Statistics
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">

          <MiniStat
            label="Resources"
            value="1,245"
          />

          <MiniStat
            label="Views"
            value="12,450"
          />

          <MiniStat
            label="Downloads"
            value="8,430"
          />

          <MiniStat
            label="Active Users"
            value="2,180"
          />

        </div>

      </section>

    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="border rounded-2xl p-5">

      <div className="mb-4">
        {icon}
      </div>

      <h2 className="text-2xl font-bold">
        {value}
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        {label}
      </p>

    </div>
  );
}

function BookRow({ rank, title, borrowed }) {
  return (
    <div className="flex items-center gap-4">

      <span className="font-bold w-6">
        {rank}
      </span>

      <div className="flex-1">
        <p className="font-medium">
          {title}
        </p>

        <p className="text-sm text-gray-500">
          {borrowed} borrowings
        </p>
      </div>

    </div>
  );
}

function BorrowerRow({ name, className, books }) {
  return (
    <div className="flex items-center gap-4">

      <div className="w-10 h-10 rounded-full border flex items-center justify-center">
        <Users size={18} />
      </div>

      <div className="flex-1">
        <p className="font-medium">
          {name}
        </p>

        <p className="text-sm text-gray-500">
          {className}
        </p>
      </div>

      <span className="font-semibold">
        {books}
      </span>

    </div>
  );
}

function ProgressRow({ label, value, percentage }) {
  return (
    <div className="mb-5">

      <div className="flex justify-between mb-2 text-sm">
        <span>{label}</span>
        <span className="font-medium">
          {value}
        </span>
      </div>

      <div className="h-2 bg-gray-100 rounded-full">
        <div
          className="h-2 bg-gray-700 rounded-full"
          style={{ width: percentage }}
        />
      </div>

    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="border rounded-2xl p-5">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="text-2xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}