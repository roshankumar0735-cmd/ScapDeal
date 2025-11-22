const { body } = require('express-validator');

// Auth
const validateRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const validateLogin = [
  body('phone').notEmpty().withMessage('Phone is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Scrap Pickup Request
const validateScrapCreate = [
  body('name').notEmpty(),
  body('phone').notEmpty(),
  body('address').notEmpty(),
  body('itemType').notEmpty(),
  body('quantityWeight').notEmpty(),
  body('preferredPickupDate').notEmpty(),
  body('preferredPickupTime').notEmpty(),
];

// Malwa Booking
const validateMalwaCreate = [
  body('name').notEmpty(),
  body('phone').notEmpty(),
  body('pickupLocation').notEmpty(),
  body('truckType').notEmpty(),
  body('materialType').notEmpty(),
  body('preferredDate').notEmpty(),
  body('preferredTime').notEmpty(),
];

// Repair Request
const validateRepairCreate = [
  body('name').notEmpty(),
  body('phone').notEmpty(),
  body('address').notEmpty(),
  body('deviceOrAppliance').notEmpty(),
  body('issueDescription').notEmpty(),
  body('preferredDate').notEmpty(),
  body('preferredTime').notEmpty(),
];

// Donation Request
const validateDonationCreate = [
  body('name').notEmpty(),
  body('phone').notEmpty(),
  body('address').notEmpty(),
  body('itemType').notEmpty(),
  body('itemDescription').notEmpty(),
  body('quantity').notEmpty(),
  body('preferredDate').notEmpty(),
  body('preferredTime').notEmpty(),
];

// Schedule Request
const validateScheduleCreate = [
  body('name').notEmpty(),
  body('phone').notEmpty(),
  body('address').notEmpty(),
  body('scrapType').notEmpty(),
  body('date').notEmpty(),
  body('time').notEmpty(),
];

module.exports = {
  validateRegister,
  validateLogin,
  validateScrapCreate,
  validateMalwaCreate,
  validateRepairCreate,
  validateDonationCreate,
  validateScheduleCreate,
};
