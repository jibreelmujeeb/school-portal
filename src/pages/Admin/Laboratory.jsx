import React from "react";
import {
  FlaskConical,
  Package,
  Users,
  AlertTriangle,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Wrench,
  Calendar,
} from "lucide-react";

const equipment = [
  {
    id: 1,
    name: "Microscope",
    laboratory: "Biology Lab",
    quantity: 25,
    status: "Available",
  },
  {
    id: 2,
    name: "Beaker Set",
    laboratory: "Chemistry Lab",
    quantity: 60,
    status: "Available",
  },
  {
    id: 3,
    name: "Voltmeter",
    laboratory: "Physics Lab",
    quantity: 15,
    status: "Maintenance",
  },
];

const AdminLaboratoryPage = () => {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Laboratory Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage laboratory equipment, inventory,
            practical sessions, and maintenance activities.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 px-5 py-3 border border-blue-600 rounded-2xl text-blue-600 hover:bg-blue-50">
          <Plus className="w-4 h-4" />
          Add Equipment
        </button>

      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="border border-gray-200 rounded-3xl p-5">
          <FlaskConical className="w-6 h-6 text-blue-600 mb-3" />
          <h2 className="text-3xl font-bold">8</h2>
          <p className="text-sm text-gray-500">
            Total Laboratories
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Package className="w-6 h-6 text-green-600 mb-3" />
          <h2 className="text-3xl font-bold">1,240</h2>
          <p className="text-sm text-gray-500">
            Equipment Items
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Users className="w-6 h-6 text-purple-600 mb-3" />
          <h2 className="text-3xl font-bold">18</h2>
          <p className="text-sm text-gray-500">
            Lab Staff
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <AlertTriangle className="w-6 h-6 text-red-600 mb-3" />
          <h2 className="text-3xl font-bold">7</h2>
          <p className="text-sm text-gray-500">
            Maintenance Requests
          </p>
        </div>

      </div>

      {/* SEARCH */}
      <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3">

        <Search className="w-5 h-5 text-gray-500 mr-3" />

        <input
          type="text"
          placeholder="Search equipment..."
          className="w-full outline-none"
        />

      </div>

      {/* EQUIPMENT TABLE */}
      <div className="border border-gray-200 rounded-3xl p-6">

        <h2 className="text-lg font-semibold mb-5">
          Laboratory Equipment
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3">Equipment</th>
                <th className="text-left py-3">Laboratory</th>
                <th className="text-left py-3">Quantity</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Actions</th>
              </tr>
            </thead>

            <tbody>

              {equipment.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100"
                >
                  <td className="py-4">{item.name}</td>

                  <td>{item.laboratory}</td>

                  <td>{item.quantity}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        item.status === "Available"
                          ? "border border-green-200 bg-green-50 text-green-600"
                          : "border border-orange-200 bg-orange-50 text-orange-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>

                    <div className="flex gap-2">

                      <button className="p-2 border border-blue-200 rounded-xl text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>

                      <button className="p-2 border border-green-200 rounded-xl text-green-600">
                        <Edit className="w-4 h-4" />
                      </button>

                      <button className="p-2 border border-red-200 rounded-xl text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* UPCOMING PRACTICALS & MAINTENANCE */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* PRACTICALS */}
        <div className="border border-gray-200 rounded-3xl p-6">

          <div className="flex items-center gap-2 mb-5">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold">
              Upcoming Practical Sessions
            </h2>
          </div>

          <div className="space-y-4">

            <div className="border border-gray-200 rounded-2xl p-4">
              <h3 className="font-medium">
                Chemistry Titration Practical
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                SS2 Students • June 15, 2026
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4">
              <h3 className="font-medium">
                Physics Electricity Experiment
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                SS3 Students • June 18, 2026
              </p>
            </div>

          </div>

        </div>

        {/* MAINTENANCE */}
        <div className="border border-gray-200 rounded-3xl p-6">

          <div className="flex items-center gap-2 mb-5">
            <Wrench className="w-5 h-5 text-orange-600" />
            <h2 className="font-semibold">
              Maintenance Requests
            </h2>
          </div>

          <div className="space-y-4">

            <div className="border border-gray-200 rounded-2xl p-4">
              <h3 className="font-medium">
                Voltmeter Calibration
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Physics Laboratory
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4">
              <h3 className="font-medium">
                Microscope Lens Replacement
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Biology Laboratory
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminLaboratoryPage;