// src/components/Modal.jsx
import React from "react";
import logo from "/assets/logo.jpg"; // adjust path if needed

export default function Modal({ title, open, onClose, children, width = "max-w-md" }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className={`bg-white rounded-xl shadow-xl w-full ${width} relative`}>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* BRAND HEADER — Scrap Deal + Logo */}
        <div className="flex items-center justify-center gap-3 pt-6 pb-4">
          <img
            src={logo}
            alt="Scrap Deal Logo"
            className="h-10 w-10 object-contain rounded"
          />
          <h1 className="text-2xl font-bold text-green-700">Scrap Deal</h1>
        </div>


        {/* Form Title (Login / Sign Up / Account etc.) */}
        {title && (
          <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
        )}

        {/* Content */}
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
}
