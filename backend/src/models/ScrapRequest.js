const mongoose = require("mongoose");

const scrapRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },

    address: { type: String, required: true },

    district: { type: String, required: true },
    state: { type: String, required: true, default: "Delhi" },
    pincode: { type: String, required: true },

    itemType: { type: String, required: true },
    quantityWeight: { type: String, required: true },

    preferredPickupDate: { type: String, required: true },
    preferredPickupTime: { type: String, required: true },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    status: {
      type: String,
      enum: ["pending", "assigned", "completed", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ScrapRequest", scrapRequestSchema);
