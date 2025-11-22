const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema(
  {
    materialName: { type: String, required: true, unique: true, trim: true },
    pricePerKg: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

module.exports = mongoose.model('Pricing', pricingSchema);
