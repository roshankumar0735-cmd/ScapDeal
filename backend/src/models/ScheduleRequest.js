const mongoose = require('mongoose');

const scheduleRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    scrapType: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model('ScheduleRequest', scheduleRequestSchema);
