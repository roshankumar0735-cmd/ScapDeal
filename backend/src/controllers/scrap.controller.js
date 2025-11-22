const { validationResult } = require('express-validator');
const ScrapRequest = require('../models/ScrapRequest');
const { success } = require('../utils/response');
const AdminLog = require('../models/AdminLog');

exports.createScrapRequest = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const {
      name,
      phone,
      address,
      district,
      state,
      pincode,
      itemType,
      quantityWeight,
      preferredPickupDate,
      preferredPickupTime,
    } = req.body;

    const scrapRequest = await ScrapRequest.create({
      name,
      phone,
      address,
      district,
      state,
      pincode,
      itemType,
      quantityWeight,
      preferredPickupDate,
      preferredPickupTime,
      user: req.user ? req.user._id : null,
    });

    return success(res, {
      message: "Scrap pickup request created",
      data: scrapRequest,
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
};


exports.getMyScrapRequests = async (req, res, next) => {
  try {
    const filter = {};

    if (req.user) {
      filter.user = req.user._id;
    }

    const requests = await ScrapRequest.find(filter).sort({ createdAt: -1 });

    return success(res, {
      message: 'My scrap pickup requests',
      data: requests,
    });
  } catch (err) {
    next(err);
  }
};

exports.getScrapById = async (req, res, next) => {
  try {
    const request = await ScrapRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Scrap request not found' });
    }

    return success(res, {
      message: 'Scrap request details',
      data: request,
    });
  } catch (err) {
    next(err);
  }
};

// inside scrap.controller.js — replace updateScrapStatus with this
exports.updateScrapStatus = async (req, res, next) => {
  try {
    const { id, status } = req.body;

    const allowedStatuses = ['pending', 'assigned', 'completed', 'rejected'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const request = await ScrapRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ success: false, message: 'Scrap request not found' });
    }

    // create admin log if AdminLog model exists and req.user present
    try {
      if (req.user) {
        const AdminLog = require('../models/AdminLog');
        await AdminLog.create({
          adminId: req.user._id,
          action: 'SCRAP_STATUS_UPDATE',
          meta: { scrapRequestId: id, status },
        });
      }
    } catch (logErr) {
      console.warn('Failed to create admin log:', logErr.message);
    }

    return success(res, {
      message: 'Scrap request status updated',
      data: request,
    });
  } catch (err) {
    next(err);
  }
};
