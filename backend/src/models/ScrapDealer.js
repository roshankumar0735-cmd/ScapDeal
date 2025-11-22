// backend/src/models/ScrapDealer.js
const mongoose = require("mongoose");

const DealerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String },
  phone: { type: String, required: true },
  aadhaar: { type: String, required: true },

  address: { type: String, required: true },

  district: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },

  businessType: { type: String, required: true },
  annualSales: { type: String, required: true },

  profilePic: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("ScrapDealer", DealerSchema);
