// src/components/ui/Toast.jsx
import React, { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const t = setTimeout(() => onClose(), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed top-6 right-6 px-5 py-3 rounded-xl shadow-lg text-white 
      ${type === "error" ? "bg-red-600" : "bg-green-600"}`}
    >
      {message}
    </div>
  );
}
