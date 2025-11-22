const ServiceProvider = require('../models/ServiceProvider');
const { success } = require('../utils/response');
const AdminLog = require('../models/AdminLog');

exports.addProvider = async (req, res, next) => {
  try {
    const { name, type, phone, zone, verified } = req.body;

    const provider = await ServiceProvider.create({ name, type, phone, zone, verified });

    await AdminLog.create({
      adminId: req.user._id,
      action: 'PROVIDER_ADD',
      meta: { providerId: provider._id },
    });

    return success(res, {
      message: 'Service provider added',
      data: provider,
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
};

exports.listProviders = async (req, res, next) => {
  try {
    const { type, zone } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (zone) filter.zone = zone;

    const providers = await ServiceProvider.find(filter).sort({ createdAt: -1 });

    return success(res, {
      message: 'Service providers list',
      data: providers,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProvider = async (req, res, next) => {
  try {
    const updates = req.body;

    const provider = await ServiceProvider.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }

    await AdminLog.create({
      adminId: req.user._id,
      action: 'PROVIDER_UPDATE',
      meta: { providerId: provider._id, updates },
    });

    return success(res, {
      message: 'Provider updated',
      data: provider,
    });
  } catch (err) {
    next(err);
  }
};
