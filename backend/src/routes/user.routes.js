const express = require("express");
const router = express.Router();

const ScrapRequest = require("../models/ScrapRequest");
const MalwaRequest = require("../models/MalwaRequest");
const User = require("../models/User");

/* =============================
     GET USER HISTORY
============================= */
router.get("/history", async (req, res) => {
  try {
    const { phone } = req.query;

    if (!phone) {
      return res.json({ success: false, message: "Phone is required" });
    }

    const scrap = await ScrapRequest.find({ phone }).sort({ createdAt: -1 });
    const malwa = await MalwaRequest.find({ phone }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: { scrap, malwa }
    });

  } catch (err) {
    console.error("History error:", err);
    res.json({ success: false, message: "Server error" });
  }
});


/* =============================
     UPDATE USER PROFILE
============================== */
router.put("/update", async (req, res) => {
  try {
    const { phone, name, photo } = req.body;

    if (!phone) {
      return res.json({ success: false, message: "Phone is required" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { phone },
      { name, photo },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });

  } catch (err) {
    console.error("Update profile error:", err);
    res.json({ success: false, message: "Server error" });
  }
});

module.exports = router;
