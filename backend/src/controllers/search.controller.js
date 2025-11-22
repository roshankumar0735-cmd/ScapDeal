const ScrapRequest = require('../models/ScrapRequest');
const ScheduleRequest = require('../models/ScheduleRequest');
const MalwaRequest = require('../models/MalwaRequest');
const RepairRequest = require('../models/RepairRequest');
const DonationRequest = require('../models/DonationRequest');
const { success } = require('../utils/response');

// Check My Pickup by phone – searches across all request types
exports.searchByPhone = async (req, res, next) => {
  try {
    const { phone } = req.params;

    const [scrap, schedule, malwa, repair, donation] = await Promise.all([
      ScrapRequest.find({ phone }).sort({ createdAt: -1 }),
      ScheduleRequest.find({ phone }).sort({ createdAt: -1 }),
      MalwaRequest.find({ phone }).sort({ createdAt: -1 }),
      RepairRequest.find({ phone }).sort({ createdAt: -1 }),
      DonationRequest.find({ phone }).sort({ createdAt: -1 }),
    ]);

    return success(res, {
      message: 'Requests found by phone',
      data: {
        scrap,
        schedule,
        malwa,
        repair,
        donation,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Check My Pickup by pickupId (MongoDB ObjectId)
exports.searchById = async (req, res, next) => {
  try {
    const { pickupId } = req.params;

    const collections = [
      { type: 'scrap', model: ScrapRequest },
      { type: 'schedule', model: ScheduleRequest },
      { type: 'malwa', model: MalwaRequest },
      { type: 'repair', model: RepairRequest },
      { type: 'donation', model: DonationRequest },
    ];

    for (const { type, model } of collections) {
      const doc = await model.findById(pickupId);
      if (doc) {
        return success(res, {
          message: 'Request found by ID',
          data: { type, request: doc },
        });
      }
    }

    return res.status(404).json({ success: false, message: 'Request not found' });
  } catch (err) {
    next(err);
  }
};
