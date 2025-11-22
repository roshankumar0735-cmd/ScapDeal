// src/components/forms/Forms.jsx
import React, { useState } from "react";

/* ---------------------------
   FIELD WRAPPER
----------------------------*/
function Field({ label, children, hint, error }) {
  return (
    <div className="mb-3"> {/* Reduced margin */}
      <label className="block text-base font-medium text-gray-800 mb-1">
        {label}
      </label>
      {children}
      {hint && <div className="text-xs text-gray-500 mt-1">{hint}</div>}
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </div>
  );
}

const delhiDistricts = [
  "Central Delhi",
  "North Delhi",
  "North East Delhi",
  "North West Delhi",
  "West Delhi",
  "South Delhi",
  "South West Delhi",
  "South East Delhi",
  "New Delhi",
  "Shahdara",
  "East Delhi",
];

/* ------------------------------------------------
   UNIVERSAL FORM CONTAINER (Makes forms fit screen)
------------------------------------------------*/
function FormContainer({ children }) {
  return (
    <div className="max-w-md mx-auto w-full max-h-[80vh] overflow-y-auto px-1 pb-3">
      {/* Scrollable form area */}
      {children}
    </div>
  );
}

/* ---------------------------
   SELLING FORM
----------------------------*/
/* ---------------------------
   SELLING FORM (UPDATED UI)
----------------------------*/
export function SellingForm({ onDone }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const today = new Date().toISOString().slice(0, 10);
  const now = new Date();
  const nowTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  function validate(data) {
    const e = {};

    if (!data.name?.trim() || data.name.length < 2)
      e.name = "Enter valid name.";

    if (!/^\d{10}$/.test(data.phone))
      e.phone = "Phone must be 10 digits.";

    if (!data.address?.trim() || data.address.length < 5)
      e.address = "Address too short.";

    if (!data.district) e.district = "Select district.";

    if (!data.state) e.state = "Select state.";
    else if (data.state !== "Delhi")
      e.state = "Sorry, we are currently serving in Delhi.";

    if (!/^\d{6}$/.test(data.pincode))
      e.pincode = "Pincode must be 6 digits.";

    if (!data.itemType) e.itemType = "Select item type.";

    if (data.quantity && !/^[\d\s.,kgKGitemsITEMS-]+$/.test(data.quantity))
      e.quantity = "Invalid quantity.";

    if (data.pickupDate) {
      const picked = new Date(`${data.pickupDate}T${data.pickupTime}`);
      if (picked < Date.now()) e.pickupDate = "Pickup cannot be in past.";
    }

    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const v = validate(data);

    if (Object.keys(v).length > 0) {
      setErrors(v);
      setLoading(false);
      return;
    }

    const payload = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      district: data.district,
      state: data.state,
      pincode: data.pincode,
      itemType: data.itemType,
      quantityWeight: data.quantity,
      preferredPickupDate: data.pickupDate,
      preferredPickupTime: data.pickupTime,
    };

    try {
      const res = await fetch("http://localhost:5001/api/scrap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json();
      if (!body.success) {
        setErrors({ form: body.message });
        setLoading(false);
        return;
      }

      setSuccessMsg(`🎉 Request submitted — ID: ${body.data?._id}`);
      setTimeout(() => onDone(body.data?._id), 400);
    } catch {
      setErrors({ form: "Network error." });
    }

    setLoading(false);
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit} className="space-y-3">
        {errors.form && <p className="text-red-600">{errors.form}</p>}
        {successMsg && <p className="text-green-600">{successMsg}</p>}

        {/* NAME */}
        <input
          name="name"
          placeholder="Name"
          className="w-full p-3 border rounded-lg"
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

        {/* PHONE */}
        <input
          name="phone"
          placeholder="Phone"
          className="w-full p-3 border rounded-lg"
        />
        {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}

        {/* ADDRESS */}
        <textarea
          name="address"
          placeholder="Address"
          className="w-full p-3 border rounded-lg"
        />
        {errors.address && (
          <p className="text-red-600 text-sm">{errors.address}</p>
        )}

        {/* DISTRICT */}
        <select name="district" className="w-full p-3 border rounded-lg bg-white">
          <option value="">Select District</option>
          {delhiDistricts.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        {errors.district && (
          <p className="text-red-600 text-sm">{errors.district}</p>
        )}

        {/* STATE */}
        <select
          name="state"
          defaultValue=""
          className="w-full p-3 border rounded-lg bg-white"
        >
          <option value="">Select State</option>
          <option>Delhi</option>
        </select>
        {errors.state && (
          <p className="text-red-600 text-sm">{errors.state}</p>
        )}

        {/* PINCODE */}
        <input
          name="pincode"
          placeholder="Pincode"
          className="w-full p-3 border rounded-lg"
        />
        {errors.pincode && (
          <p className="text-red-600 text-sm">{errors.pincode}</p>
        )}

        {/* ITEM TYPE */}
        <select name="itemType" className="w-full p-3 border rounded-lg bg-white">
          <option value="">Select Item Type</option>
          <option>Newspaper</option>
          <option>Cardboard</option>
          <option>Plastic</option>
          <option>Mixed Metal</option>
          <option>Refrigerator</option>
          <option>Washing Machine</option>
          <option>Microwave/Toaster</option>
          <option>Electronics</option>
        </select>
        {errors.itemType && (
          <p className="text-red-600 text-sm">{errors.itemType}</p>
        )}

        {/* QUANTITY */}
        <input
          name="quantity"
          placeholder="Quantity / Weight"
          className="w-full p-3 border rounded-lg"
        />
        {errors.quantity && (
          <p className="text-red-600 text-sm">{errors.quantity}</p>
        )}

        {/* DATE + TIME */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="date"
              name="pickupDate"
              defaultValue={today}
              className="w-full p-3 border rounded-lg"
            />
            {errors.pickupDate && (
              <p className="text-red-600 text-sm">{errors.pickupDate}</p>
            )}
          </div>

          <div>
            <input
              type="time"
              name="pickupTime"
              defaultValue={nowTime}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full p-3 bg-blue-600 text-white rounded-xl"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </FormContainer>
  );
}


/* ---------------------------
   TRUCK BOOKING FORM
----------------------------*/
export function TruckBookingForm({ onDone }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const today = new Date().toISOString().slice(0, 10);
  const now = new Date();
  const nowTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  function validate(data) {
    const e = {};

    if (!data.name?.trim()) e.name = "Enter name.";
    if (!/^\d{10}$/.test(data.phone)) e.phone = "Phone must be 10 digits.";
    if (!data.pickupLocation?.trim()) e.pickupLocation = "Enter location.";

    if (!data.district) e.district = "Select district.";

    if (!data.state) e.state = "Select state.";
    else if (data.state !== "Delhi")
      e.state = "Sorry, we are currently serving in Delhi.";

    if (!/^\d{6}$/.test(data.pincode))
      e.pincode = "Pincode must be 6 digits.";

    if (!data.materialType) e.materialType = "Select material.";
    if (!data.truckType) e.truckType = "Select truck type.";
    if (!data.preferredPickupDate) e.preferredPickupDate = "Select date.";
    if (!data.preferredPickupTime) e.preferredPickupTime = "Select time.";

    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const v = validate(data);

    if (Object.keys(v).length > 0) {
      setErrors(v);
      setLoading(false);
      return;
    }

    const payload = {
      name: data.name,
      phone: data.phone,
      pickupLocation: data.pickupLocation,
      district: data.district,
      state: data.state,
      pincode: data.pincode,
      truckType: data.truckType,
      materialType: data.materialType,
      preferredDate: data.preferredPickupDate,
      preferredTime: data.preferredPickupTime,
    };

    try {
      const res = await fetch("http://localhost:5001/api/malwa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json();
      if (!body.success) {
        setErrors({ form: body.message });
        setLoading(false);
        return;
      }

      setSuccessMsg(`🎉 Request submitted — ID: ${body.data?._id}`);
      setTimeout(() => onDone(body.data?._id), 400);
    } catch {
      setErrors({ form: "Network error." });
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.form && <p className="text-red-600">{errors.form}</p>}
      {successMsg && <p className="text-green-600">{successMsg}</p>}

      <input name="name" placeholder="Name" className="w-full p-3 border rounded-lg" />
      {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

      {/* PHONE (AUTO-FILLED & LOCKED) */}
      {/* PHONE (LOCKED) */}
      <input
        value={JSON.parse(localStorage.getItem("scrap_deal_user"))?.phone || ""}
        disabled
        className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
        style={{ cursor: "not-allowed" }}
      />
      <p className="text-xs text-gray-500 mt-1">
        🔒 This phone number is linked to your account and cannot be changed.
      </p>

      {/* HIDDEN FIELD SENT TO BACKEND */}
      <input
        type="hidden"
        name="phone"
        value={JSON.parse(localStorage.getItem("scrap_deal_user"))?.phone || ""}
      />


      <input name="pickupLocation" placeholder="Pickup Location" className="w-full p-3 border rounded-lg" />
      {errors.pickupLocation && <p className="text-red-600 text-sm">{errors.pickupLocation}</p>}

      {/* DISTRICT */}
      <select name="district" className="w-full p-3 border rounded-lg bg-white">
        <option value="">Select District</option>
        {delhiDistricts.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>
      {errors.district && <p className="text-red-600 text-sm">{errors.district}</p>}

      {/* STATE */}
      <select name="state" defaultValue="" className="w-full p-3 border rounded-lg bg-white">
        <option value="">Select State</option>
        <option>Delhi</option>
     
      </select>
      {errors.state && <p className="text-red-600 text-sm">{errors.state}</p>}

      {/* PINCODE */}
      <input name="pincode" placeholder="Pincode" className="w-full p-3 border rounded-lg" />
      {errors.pincode && <p className="text-red-600 text-sm">{errors.pincode}</p>}

      {/* MATERIAL */}
      <select name="materialType" className="w-full p-3 border rounded-lg bg-white">
        <option value="">Select Material</option>
        <option>Construction Malwa</option>
        <option>Debris</option>
        <option>Cement Waste</option>
        <option>Bricks</option>
        <option>Sand / Stone Waste</option>
        <option>Tiles / Marble Waste</option>
        <option>Soil / Excavation Waste</option>
        <option>Iron Scrap</option>
        <option>Mixed Construction Waste</option>
      </select>
      {errors.materialType && <p className="text-red-600 text-sm">{errors.materialType}</p>}

      {/* TRUCK TYPE */}
      <select name="truckType" className="w-full p-3 border rounded-lg bg-white">
        <option value="">Truck Type</option>
        <option>Mini Truck</option>
        <option>Tata 407</option>
        <option>Pickup Van</option>
        <option>Tractor Trolley</option>
      </select>
      {errors.truckType && <p className="text-red-600 text-sm">{errors.truckType}</p>}

      {/* DATE & TIME */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input name="preferredPickupDate" type="date" defaultValue={today} className="w-full p-3 border rounded-lg" />
          {errors.preferredPickupDate && <p className="text-red-600 text-sm">{errors.preferredPickupDate}</p>}
        </div>

        <div>
          <input name="preferredPickupTime" type="time" defaultValue={nowTime} className="w-full p-3 border rounded-lg" />
          {errors.preferredPickupTime && <p className="text-red-600 text-sm">{errors.preferredPickupTime}</p>}
        </div>
      </div>

      <button disabled={loading} className="w-full p-3 bg-blue-600 text-white rounded-xl">
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

/* ---------------------------
   CHECK FORM
----------------------------*/
export function CheckForm() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    if (!query.trim()) {
      setError("Please enter Pickup ID");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5001/api/scrap/${query.trim()}`);

      if (!res.ok) {
        setError("Pickup not found.");
        setLoading(false);
        return;
      }

      const body = await res.json();
      setResult(body.data);
    } catch {
      setError("Network error.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSearch} className="flex gap-3 mb-4">
        <input
          className="flex-1 p-4 border rounded-xl"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Pickup ID"
        />
        <button className="bg-blue-600 text-white px-6 rounded-xl">
          {loading ? "..." : "Search"}
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {result && (
        <div className="bg-gray-100 p-4 rounded-xl space-y-2">
          <p><strong>ID:</strong> {result._id}</p>
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Address:</strong> {result.address}</p>
        </div>
      )}
    </div>
  );
}
