
// frontend/src/admin/AdminDashboard.jsx
import React, { useEffect, useState, useRef } from "react";

function StatusBadge({ status }) {
  const map = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-blue-100 text-blue-800",
    assigned: "bg-blue-100 text-blue-800",
    in_transit: "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-2 py-1 rounded text-xs ${
        map[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

function EmptyState({ tab }) {
  return (
    <div className="p-6 text-center text-gray-600">
      {tab === "scrap"
        ? "No scrap requests found."
        : tab === "malwa"
        ? "No malwa truck requests found."
        : "No scrap dealers found."}
    </div>
  );
}

export default function AdminDashboard() {
  const [tab, setTab] = useState("scrap");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [updatingIds, setUpdatingIds] = useState({});
  const debounceRef = useRef(null);

  const token = localStorage.getItem("scrap_deal_admin_token");
  const adminRaw = localStorage.getItem("scrap_deal_admin_user");
  const admin = adminRaw ? JSON.parse(adminRaw) : null;

  async function fetchRequests(q = "") {
    setFetchError(null);
    setLoading(true);

    try {
      let url = "";

      if (tab === "scrap") {
        url = q
          ? `http://localhost:5001/api/admin/scrap?q=${encodeURIComponent(q)}`
          : `http://localhost:5001/api/admin/scrap`;

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const body = await res.json();
        if (!body.success) throw new Error(body.message);
        setItems(body.data || []);
      }

      if (tab === "malwa") {
        url = q
          ? `http://localhost:5001/api/malwa/search?q=${encodeURIComponent(q)}`
          : `http://localhost:5001/api/malwa/all`;

        const res = await fetch(url);
        const body = await res.json();
        if (!body.success) throw new Error(body.message);
        setItems(body.data || []);
      }

      if (tab === "dealers") {
        url = q
          ? `http://localhost:5001/api/dealer/search?q=${encodeURIComponent(q)}`
          : `http://localhost:5001/api/dealer/all`;

        const res = await fetch(url);
        const body = await res.json();
        if (!body.success) throw new Error(body.message);
        setItems(body.dealers || []);
      }
    } catch (err) {
      setFetchError(err.message || "Server error");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setSearchQ("");
    fetchRequests("");
  }, [tab]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchRequests(searchQ.trim());
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [searchQ]);

  async function updateStatus(id, status) {
    if (tab === "dealers") return;

    if (!window.confirm(`Set status → ${status}?`)) return;

    setUpdatingIds((s) => ({ ...s, [id]: true }));

    try {
      let url, method, body;

      if (tab === "scrap") {
        url = `http://localhost:5001/api/admin/scrap/${id}/status`;
        method = "PATCH";
        body = JSON.stringify({ status });
      }

      if (tab === "malwa") {
        url = `http://localhost:5001/api/malwa/status`;
        method = "POST";
        body = JSON.stringify({ requestId: id, status });
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      const json = await res.json();

      if (!json.success) {
        alert(json.message || "Update failed");
        return;
      }

      setItems((prev) =>
        prev.map((x) => (x._id === id ? json.data : x))
      );
    } catch {
      alert("Network error while updating.");
    } finally {
      setUpdatingIds((s) => ({ ...s, [id]: false }));
    }
  }

  function handleLogout() {
    localStorage.removeItem("scrap_deal_admin_token");
    localStorage.removeItem("scrap_deal_admin_user");
    window.location.href = "/admin/login";
  }

  const renderTable = () => {
    if (loading)
      return <div className="p-6 text-center text-gray-600">Loading...</div>;
    if (fetchError)
      return (
        <div className="p-6 text-center text-red-600">{fetchError}</div>
      );
    if (items.length === 0) return <EmptyState tab={tab} />;

    /* ---------------- SCRAP PICKUP TABLE (unchanged) ---------------- */
    if (tab === "scrap") {
      return (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Address</th>
              <th className="p-3">District</th>
              <th className="p-3">Pincode</th>
              <th className="p-3">Item</th>
              <th className="p-3">Qty</th>
              <th className="p-3">When</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="p-3 text-sm font-mono">{r._id}</td>
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.phone}</td>
                <td className="p-3">{r.address}</td>
                <td className="p-3">{r.district}</td>
                <td className="p-3">{r.pincode}</td>
                <td className="p-3">{r.itemType}</td>
                <td className="p-3">{r.quantityWeight}</td>
                <td className="p-3">
                  {r.preferredPickupDate} {r.preferredPickupTime}
                </td>
                <td className="p-3">
                  <StatusBadge status={r.status} />
                </td>
                <td className="p-3 space-x-2">
                  <button
                    disabled={updatingIds[r._id]}
                    onClick={() => updateStatus(r._id, "assigned")}
                    className="px-3 py-1 rounded text-sm text-white bg-blue-600"
                  >
                    Accept
                  </button>
                  <button
                    disabled={updatingIds[r._id]}
                    onClick={() => updateStatus(r._id, "completed")}
                    className="px-3 py-1 rounded text-sm text-white bg-green-600"
                  >
                    Complete
                  </button>
                  <button
                    disabled={updatingIds[r._id]}
                    onClick={() => updateStatus(r._id, "rejected")}
                    className="px-3 py-1 rounded text-sm text-white bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    /* ---------------- MALWA TABLE (unchanged) ---------------- */
    if (tab === "malwa") {
      return (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Pickup Location</th>
              <th className="p-3">District</th>
              <th className="p-3">Pincode</th>
              <th className="p-3">Truck</th>
              <th className="p-3">Material</th>
              <th className="p-3">When</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="p-3 text-sm font-mono">{r._id}</td>
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.phone}</td>
                <td className="p-3">{r.pickupLocation}</td>
                <td className="p-3">{r.district}</td>
                <td className="p-3">{r.pincode}</td>
                <td className="p-3">{r.truckType}</td>
                <td className="p-3">{r.materialType}</td>
                <td className="p-3">
                  {r.preferredDate} {r.preferredTime}
                </td>
                <td className="p-3">
                  <StatusBadge status={r.status} />
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => updateStatus(r._id, "assigned")}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(r._id, "completed")}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => updateStatus(r._id, "rejected")}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    /* ---------------- SCRAP DEALERS TABLE (UPDATED ONLY THIS) ---------------- */
    if (tab === "dealers") {
      return (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">District</th>
              <th className="p-3">State</th>
              <th className="p-3">Pincode</th>
              <th className="p-3">Business Type</th>
              <th className="p-3">Annual Sales</th>
              <th className="p-3">Address</th>
              <th className="p-3">Call</th>
            </tr>
          </thead>

          <tbody>
            {items.map((d) => (
              <tr key={d._id} className="border-t">
                <td className="p-3">{d.name}</td>
                <td className="p-3">{d.phone}</td>
                <td className="p-3">{d.district}</td>
                <td className="p-3">{d.state}</td>
                <td className="p-3">{d.pincode}</td>
                <td className="p-3">{d.businessType}</td>
                <td className="p-3">{d.annualSales}</td>
                <td className="p-3">{d.address}</td>
                <td className="p-3">
                  <a
                    href={`tel:${d.phone}`}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Call
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

        <div className="flex items-center gap-4">
          <input
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Search..."
            className="border p-2 rounded w-72"
          />

          <div className="flex items-center gap-2 border rounded-full px-3 py-1">
            <span className="text-sm">Hi, {admin?.name || "Admin"}</span>
            <button
              onClick={handleLogout}
              className="text-xs text-red-500 underline ml-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("scrap")}
          className={`px-4 py-2 rounded ${
            tab === "scrap"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Scrap Pickup
        </button>

        <button
          onClick={() => setTab("malwa")}
          className={`px-4 py-2 rounded ${
            tab === "malwa"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Malwa Truck
        </button>

        <button
          onClick={() => setTab("dealers")}
          className={`px-4 py-2 rounded ${
            tab === "dealers"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Scrap Dealers
        </button>
      </div>

      <div className="bg-white border rounded shadow overflow-auto">
        {renderTable()}
      </div>
    </div>
  );
}

