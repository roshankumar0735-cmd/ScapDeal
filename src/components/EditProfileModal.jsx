
import React, { useState } from "react";

export default function EditProfileModal({ user, onClose, onSave }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5001/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        setLoading(false);
        return;
      }

      // update localStorage
      localStorage.setItem("scrap_deal_user", JSON.stringify(data.data.user));

      onSave(); // reloads account page
    } catch (err) {
      setError("Server error");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSave} className="p-6 space-y-4">
      <h2 className="text-xl font-bold mb-3">✏️ Edit Profile</h2>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-200 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
