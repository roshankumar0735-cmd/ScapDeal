const Pricing = require('../models/Pricing');
const { success } = require('../utils/response');
const AdminLog = require('../models/AdminLog');

exports.getAllPricing = async (req, res, next) => {
  try {
    const pricing = await Pricing.find({}).sort({ materialName: 1 });

    return success(res, {
      message: 'Material pricing list',
      data: pricing,
    });
  } catch (err) {
    next(err);
  }
};

// Update or create a single material price
exports.updatePricing = async (req, res, next) => {
  try {
    const { materialName, pricePerKg } = req.body;

    if (!materialName || typeof pricePerKg !== 'number') {
      return res.status(400).json({ success: false, message: 'materialName and numeric pricePerKg are required' });
    }

    const pricing = await Pricing.findOneAndUpdate(
      { materialName },
      { materialName, pricePerKg, lastUpdated: new Date() },
      { new: true, upsert: true }
    );

    await AdminLog.create({
      adminId: req.user._id,
      action: 'PRICING_UPDATE',
      meta: { materialName, pricePerKg },
    });

    return success(res, {
      message: 'Pricing updated',
      data: pricing,
    });
  } catch (err) {
    next(err);
  }
};
