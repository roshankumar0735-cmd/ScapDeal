import React, { useEffect, useState } from "react";

export default function AdminMalwa() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all malwa requests
  async function loadRequests() {
    try {
      const res = await fetch("http://localhost:5001/api/malwa/all"); // You'll create this route
      const body = await res.json();
      if (body.success) setRequests(body.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  // Update status: pending → approved → assigned → in_transit → completed
  async function updateStatus(id, status) {
    try {
      const res = await fetch("http://localhost:5001/api/malwa/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: id, status }),
      });

      const body = await res.json();
      if (body.success) loadRequests();
      else alert(body.message);
    } catch (err) {
      console.error(err);
    }
  }

  // Status color mapping
  const statusColor = {
    pending: "bg-yellow-200 text-yellow-700",
    approved: "bg-blue-200 text-blue-700",
    assigned: "bg-indigo-200 text-indigo-700",
    in_transit: "bg-purple-200 text-purple-700",
    completed: "bg-green-200 text-green-700",
    rejected: "bg-red-200 text-red-700",
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Malwa Truck Requests</h2>

      <div className="overflow-x-auto border rounded-xl shadow-sm">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Pickup Location</th>
              <th className="p-3 text-left">Truck</th>
              <th className="p-3 text-left">When</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-6 text-gray-600">
                  No requests found.
                </td>
              </tr>
            ) : (
              requests.map((r) => (
                <tr key={r._id} className="border-b">
                  <td className="p-3">{r._id.slice(-6)}</td>
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.phone}</td>
                  <td className="p-3">{r.pickupLocation}</td>
                  <td className="p-3">{r.truckType}</td>
                  <td className="p-3">
                    {r.preferredDate} {r.preferredTime}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${statusColor[r.status]}`}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td className="p-3 flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md"
                      onClick={() => updateStatus(r._id, "approved")}
                    >
                      Accept
                    </button>

                    <button
                      className={`${
                        r.status === "completed"
                          ? "bg-gray-400"
                          : "bg-green-500"
                      } text-white px-3 py-1 rounded-md`}
                      disabled={r.status === "completed"}
                      onClick={() => updateStatus(r._id, "completed")}
                    >
                      Complete
                    </button>

                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                      onClick={() => updateStatus(r._id, "rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
