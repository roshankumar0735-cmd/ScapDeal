const User = require('../models/User');
const ScrapRequest = require('../models/ScrapRequest');
const MalwaRequest = require('../models/MalwaRequest');
const RepairRequest = require('../models/RepairRequest');
const DonationRequest = require('../models/DonationRequest');
const ScheduleRequest = require('../models/ScheduleRequest');
const AdminLog = require('../models/AdminLog');
const { success } = require('../utils/response');

exports.getOrders = async (req, res, next) => {
  try {
    const { type } = req.query;

    if (type) {
      let data;
      switch (type) {
        case 'scrap':
          data = await ScrapRequest.find({}).sort({ createdAt: -1 });
          break;
        case 'malwa':
          data = await MalwaRequest.find({}).sort({ createdAt: -1 });
          break;
        case 'repair':
          data = await RepairRequest.find({}).sort({ createdAt: -1 });
          break;
        case 'donation':
          data = await DonationRequest.find({}).sort({ createdAt: -1 });
          break;
        case 'schedule':
          data = await ScheduleRequest.find({}).sort({ createdAt: -1 });
          break;
        default:
          return res.status(400).json({ success: false, message: 'Invalid order type' });
      }

      return success(res, { message: 'Orders list', data });
    }

    const [scrap, malwa, repair, donation, schedule] = await Promise.all([
      ScrapRequest.find({}).sort({ createdAt: -1 }),
      MalwaRequest.find({}).sort({ createdAt: -1 }),
      RepairRequest.find({}).sort({ createdAt: -1 }),
      DonationRequest.find({}).sort({ createdAt: -1 }),
      ScheduleRequest.find({}).sort({ createdAt: -1 }),
    ]);

    return success(res, {
      message: 'All orders',
      data: { scrap, malwa, repair, donation, schedule },
    });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 }).select('-password');

    return success(res, {
      message: 'Users list',
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      scrapCount,
      malwaCount,
      repairCount,
      donationCount,
      scheduleCount,
    ] = await Promise.all([
      User.countDocuments(),
      ScrapRequest.countDocuments(),
      MalwaRequest.countDocuments(),
      RepairRequest.countDocuments(),
      DonationRequest.countDocuments(),
      ScheduleRequest.countDocuments(),
    ]);

    const scrapStatus = await ScrapRequest.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    return success(res, {
      message: 'Dashboard statistics',
      data: {
        totals: {
          users: totalUsers,
          scrap: scrapCount,
          malwa: malwaCount,
          repair: repairCount,
          donation: donationCount,
          schedule: scheduleCount,
        },
        scrapStatus,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getLogs = async (req, res, next) => {
  try {
    const logs = await AdminLog.find({})
      .populate('adminId', 'name phone role')
      .sort({ timestamp: -1 })
      .limit(200);

    return success(res, {
      message: 'Admin logs',
      data: logs,
    });
  } catch (err) {
    next(err);
  }
};
