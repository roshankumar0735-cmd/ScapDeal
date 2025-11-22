const { validationResult } = require('express-validator');
const MalwaRequest = require('../models/MalwaRequest');
const ServiceProvider = require('../models/ServiceProvider');
const { success } = require('../utils/response');
const AdminLog = require('../models/AdminLog');

exports.createMalwaRequest = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    const {
      name,
      phone,
      pickupLocation,
      district,
      state,
      pincode,
      truckType,
      materialType,
      preferredDate,
      preferredTime,
      notes,
    } = req.body;

    const malwaRequest = await MalwaRequest.create({
      name,
      phone,
      pickupLocation,
      district,
      state,
      pincode,
      truckType,
      materialType,
      preferredDate,
      preferredTime,
      notes,
    });

    return success(res, {
      message: 'Truck/Malwa booking request created',
      data: malwaRequest,
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMyMalwaRequests = async (req, res) => {
  try {
    const phone = req.query.phone;

    if (!phone) {
      return res.json({
        success: false,
        message: "Phone number is required"
      });
    }

    // ⭐ THIS FILTER IS THE REAL FIX ⭐
    const requests = await MalwaRequest.find({ phone })
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: requests
    });

  } catch (error) {
    console.error("GET MY MALWA ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

exports.assignTruck = async (req, res, next) => {
  try {
    const { requestId, providerId } = req.body;

    const provider = await ServiceProvider.findById(providerId);
    if (!provider || provider.type !== 'truck') {
      return res.status(400).json({ success: false, message: 'Invalid truck provider' });
    }

    const request = await MalwaRequest.findByIdAndUpdate(
      requestId,
      { assignedTruck: providerId, status: 'assigned' },
      { new: true }
    ).populate('assignedTruck');

    if (!request) {
      return res.status(404).json({ success: false, message: 'Malwa request not found' });
    }

    await AdminLog.create({
      adminId: req.user._id,
      action: 'MALWA_ASSIGN_TRUCK',
      meta: { requestId, providerId },
    });

    return success(res, {
      message: 'Truck assigned successfully',
      data: request,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateMalwaStatus = async (req, res, next) => {
  try {
    const { requestId, status } = req.body;

    const allowedStatuses = ['pending', 'approved', 'assigned', 'in_transit', 'completed'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const request = await MalwaRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    ).populate('assignedTruck');

    if (!request) {
      return res.status(404).json({ success: false, message: 'Malwa request not found' });
    }

    await AdminLog.create({
      adminId: req.user._id,
      action: 'MALWA_STATUS_UPDATE',
      meta: { requestId, status },
    });

    return success(res, {
      message: 'Malwa request status updated',
      data: request,
    });
  } catch (err) {
    next(err);
  }
};
