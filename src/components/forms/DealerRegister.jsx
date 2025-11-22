import React, { useState } from "react";

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

export default function DealerRegister({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = (data) => {
    const e = {};

    if (!data.name || /\d/.test(data.name))
      e.name = "Full name cannot contain numbers.";

    if (!/^\d{10}$/.test(data.phone))
      e.phone = "Phone number must be exactly 10 digits.";

    if (!/^\d{12}$/.test(data.aadhaar))
      e.aadhaar = "Aadhaar must be 12 digits.";

    if (!data.address || data.address.length < 5)
      e.address = "Address is too short.";

    if (!data.district) e.district = "Select district.";

    if (!data.state) e.state = "Select state.";
    else if (data.state !== "Delhi")
      e.state = "Sorry, we are currently serving in Delhi.";

    if (!/^\d{6}$/.test(data.pincode))
      e.pincode = "Pincode must be 6 digits.";

    if (!data.businessType) e.businessType = "Select business type.";

    if (!data.annualSales) e.annualSales = "Please select annual sales.";

    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess("");

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    const v = validate(data);
    if (Object.keys(v).length > 0) {
      setErrors(v);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/dealer/register", {
        method: "POST",
        body: fd,
      });

      const body = await res.json();
      if (!body.success) {
        setErrors({ form: body.message });
        setLoading(false);
        return;
      }

      setSuccess("🎉 You are now registered as a Scrap Dealer!");

      const user = JSON.parse(localStorage.getItem("scrap_deal_user") || "{}");
      const updatedUser = { ...user, dealer: body.data };
      localStorage.setItem("scrap_deal_user", JSON.stringify(updatedUser));

      setTimeout(() => onClose(), 1500);
    } catch {
      setErrors({ form: "Network error. Try again." });
    }

    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">

      {errors.form && <p className="text-red-600">{errors.form}</p>}
      {success && <p className="text-green-600 font-medium">{success}</p>}

      <input name="name" className="w-full border p-3 rounded-md" placeholder="Full Name" />
      {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

      <input name="companyName" className="w-full border p-3 rounded-md" placeholder="Company Name (Optional)" />

      {/* PHONE (AUTO-FILLED & LOCKED) */}
      
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


      <input name="aadhaar" className="w-full border p-3 rounded-md" placeholder="Aadhaar Number" />
      {errors.aadhaar && <p className="text-red-600 text-sm">{errors.aadhaar}</p>}

      <textarea name="address" className="w-full border p-3 rounded-md" placeholder="Shop Address" />
      {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}

      {/* DISTRICT */}
      <select name="district" className="w-full border p-3 rounded-md bg-white">
        <option value="">Select District</option>
        {delhiDistricts.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>
      {errors.district && <p className="text-red-600 text-sm">{errors.district}</p>}

      {/* STATE */}
      <select name="state" defaultValue="Delhi" className="w-full border p-3 rounded-md bg-white">
      <option>Select State</option>
      <option>Delhi</option>
      </select>

      <p className="text-xs text-gray-500 mt-1">
        We are currently serving in Delhi
      </p>
      {errors.state && <p className="text-red-600 text-sm">{errors.state}</p>}

      {/* PINCODE */}
      <input name="pincode" className="w-full border p-3 rounded-md" placeholder="Pincode" />
      {errors.pincode && <p className="text-red-600 text-sm">{errors.pincode}</p>}

      <select name="businessType" className="w-full border p-3 rounded-md bg-white">
        <option value="">Select Business Type</option>
        <option>Scrap Dealer</option>
        <option>Waste Manager</option>
        <option>Metal Scrap Management</option>
        <option>E-Waste Dealer</option>
        <option>Paper Scrap Dealer</option>
        <option>Scrap collector</option>
        <option>Recycling Center</option>
      </select>
      {errors.businessType && <p className="text-red-600 text-sm">{errors.businessType}</p>}

      <select name="annualSales" className="w-full border p-3 rounded-md bg-white">
        <option value="">Annual Sales</option>
        <option>₹0–10 Lakh</option>
        <option>₹10–50 Lakh</option>
        <option>₹50–75 Lakh</option>
        <option>₹75+ Lakh</option>
      </select>
      {errors.annualSales && <p className="text-red-600 text-sm">{errors.annualSales}</p>}

      <div>
        <label className="block text-sm mb-1">Profile Picture (Optional)</label>
        <input type="file" name="profilePic" className="w-full" />
      </div>

      <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-md">
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
