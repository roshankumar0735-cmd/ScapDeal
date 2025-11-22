// backend/src/routes/malwa.routes.js
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// IMPORT FIXED
const MalwaRequest = require("../models/MalwaRequest");

const {
  auth,
  authorizeRoles
} = require("../middleware/auth");

const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createMalwaRequest,
  getMyMalwaRequests,
  assignTruck,
  updateMalwaStatus
} = require("../controllers/malwa.controller");

/* ======================================================
   USER ROUTES
=======================================================*/

// Create Malwa (Truck Booking)
router.post(
  "/",
  [
    body("name").notEmpty(),
    body("phone").notEmpty(),
    body("pickupLocation").notEmpty(),
    body("truckType").notEmpty(),
    body("materialType").notEmpty(),
    body("preferredDate").notEmpty(),
    body("preferredTime").notEmpty()
  ],
  createMalwaRequest
);
// Get My Malwa History (User requests)
router.get("/my", getMyMalwaRequests);


// Admin fetch all Malwa requests
router.get("/all", async (req, res) => {
  try {
    const data = await MalwaRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Server error" });
  }
});
// Search Malwa Requests
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q || "";

    const MalwaRequest = require("../models/MalwaRequest");

    const data = await MalwaRequest.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
        { materialType: { $regex: q, $options: "i" } },
        { pickupLocation: { $regex: q, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.json({ success: true, data });
  } catch (err) {
    console.log("Malwa Search ERROR:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


/* ======================================================
   ADMIN ROUTES
=======================================================*/

// Assign truck provider
router.post(
  "/assign",
  auth,
  adminMiddleware,
  assignTruck
);

// Update Malwa status
router.post(
  "/status",
  auth,
  adminMiddleware,
  updateMalwaStatus
);

module.exports = router;
