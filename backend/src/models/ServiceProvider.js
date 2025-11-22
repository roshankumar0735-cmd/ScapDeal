const mongoose = require("mongoose");

const ServiceProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    serviceType: {
      type: String,
      enum: ["malwa_truck", "scrap_pickup", "other"],
      default: "malwa_truck",
    },

    vehicleNumber: {
      type: String,
      default: "",
    },

    vehicleType: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceProvider", ServiceProviderSchema);
