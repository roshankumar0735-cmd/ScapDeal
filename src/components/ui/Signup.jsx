// src/components/ui/Signup.jsx
import React, { useState } from "react";

export default function Signup({ onSuccess, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successText, setSuccessText] = useState("");

  // ✅ EMAIL → accept any valid email (gmail + institutional)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ✅ PASSWORD → min 8 chars, 1 letter, 1 number, 1 special character
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|;:"<>,.?/~`]).{8,}$/;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 3)
      return setError("Name must be at least 3 characters.");

    if (phone.length !== 10)
      return setError("Phone number must be exactly 10 digits.");
    
    if (email.trim() !== "" && !emailPattern.test(email))
      return setError("Please enter a valid email address.");

    if (email.trim() !== "" && !emailPattern.test(email))
      return setError("Please enter a valid email address.");

    if (!passwordPattern.test(password))
      return setError(
        "Password must be at least 8 characters long and include 1 letter, 1 number, and 1 special character."
      );

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        if (data.message?.includes("E11000")) {
          if (data.message.includes("email"))
            return setError("Email already registered.");
          if (data.message.includes("phone"))
            return setError("Phone number already registered.");
        }
        return setError(data.message || "Signup failed.");
      }

      setSuccessText("Account created successfully! Please login.");

      setTimeout(() => {
        onClose();
        onSuccess(); // open login
      }, 900);
    } catch (err) {
      setLoading(false);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
        Create Account
      </h2>

      {error && (
        <p className="bg-red-100 text-red-700 p-2 rounded mb-3">{error}</p>
      )}
      {successText && (
        <p className="bg-emerald-50 text-emerald-700 p-2 rounded mb-3">
          {successText}
        </p>
      )}

      <form onSubmit={handleSignup} noValidate className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          required
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone Number 10 digit"
          required
          className="w-full border p-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email xyz@gmail.com"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="8 digit Password (e.g. Abc@1234)"
          required
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      {/* LOGIN LINK (only 1) */}
      <p className="text-center text-sm mt-2">
        Already have an account?{" "}
        <button
          onClick={() => {
            onClose();
            onSuccess();
          }}
          className="text-blue-600 underline font-semibold"
        >
          Login
        </button>
      </p>
    </div>
  );
}
