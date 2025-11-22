// src/components/ui/Login.jsx
import React, { useState } from "react";

export default function Login({ onLoginSuccess, onClose, onopenSignup }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successText, setSuccessText] = useState("");

  const API = "http://localhost:5001/api/auth";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessText("");

    try {
      const res = await fetch(API + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message?.toLowerCase().includes("invalid")) {
          setLoading(false);
          return setError("Phone number or password is incorrect. Try again.");
        }
        setLoading(false);
        return setError(data.message || "Login failed.");
      }

      const savedUser = {
        loggedIn: true,
        id: data.data.user?.id,
        name: data.data.user?.name,
        phone: data.data.user?.phone,
        email: data.data.user?.email || "",
        role: data.data.user?.role,
        token: data.data.token,
      };

      localStorage.setItem("scrap_deal_user", JSON.stringify(savedUser));

      setSuccessText(`🎉 Welcome back, ${savedUser.name}!`);
      setLoading(false);

      setTimeout(() => {
        onLoginSuccess();
        onClose();
      }, 600);
    } catch (err) {
      setError("Server error");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-blue-700">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="tel"
          placeholder="Phone Number"
          required
          className="w-full border p-2 rounded-md"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full border p-2 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {successText && (
          <p className="text-emerald-700 text-sm">{successText}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-md bg-blue-600 text-white font-semibold"
        >
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>

      {/* SIGNUP LINK */}

      <p className="text-center text-sm mt-2">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => {
            onClose();           // close login modal
            window.openSignupModal(); // open signup modal globally
          }}
          className="text-blue-600 underline"
        >
          Sign Up
        </button>
      </p>


    </div>
  );
}
