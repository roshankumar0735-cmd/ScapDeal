const { validationResult } = require('express-validator');
const ScheduleRequest = require('../models/ScheduleRequest');
const { success } = require('../utils/response');

exports.createScheduleRequest = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    const { name, phone, address, scrapType, date, time } = req.body;

    const scheduleRequest = await ScheduleRequest.create({
      name,
      phone,
      address,
      scrapType,
      date,
      time,
    });

    return success(res, {
      message: 'Schedule pickup request created',
      data: scheduleRequest,
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMyScheduleRequests = async (req, res, next) => {
  try {
    const { phone } = req.query;

    const filter = {};
    if (req.user) {
      filter.phone = req.user.phone;
    } else if (phone) {
      filter.phone = phone;
    }

    const requests = await ScheduleRequest.find(filter).sort({ createdAt: -1 });

    return success(res, {
      message: 'My schedule pickup requests',
      data: requests,
    });
  } catch (err) {
    next(err);
  }
};
