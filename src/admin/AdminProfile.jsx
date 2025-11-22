// frontend/src/admin/AdminProfile.jsx
import React, { useState, useEffect } from "react";

export default function AdminProfile() {
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("scrap_deal_admin_user");
      if (raw) setAdmin(JSON.parse(raw));
    } catch {}
  }, []);

  const logout = () => {
    localStorage.removeItem("scrap_deal_admin_token");
    localStorage.removeItem("scrap_deal_admin_user");
    window.location.href = "/";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="border px-3 py-2 rounded bg-white shadow"
      >
        {admin?.name || "Admin"} ▾
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow p-3 z-50">
          <div className="mb-2">
            <div className="font-semibold">{admin?.name}</div>
            <div className="text-sm text-gray-600">{admin?.email}</div>
            <div className="text-sm text-gray-500">Role: {admin?.role}</div>
          </div>
          <hr />
          <button
            className="w-full text-left py-2 text-red-600 mt-2"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
