const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");

const ScrapRequest = require("../models/ScrapRequest");
const MalwaRequest = require("../models/MalwaRequest");
const ScrapDealer = require("../models/ScrapDealer");

/* =============================
   GET ALL SCRAP PICKUP REQUESTS
============================= */
router.get("/scrap", adminMiddleware, async (req, res) => {
  try {
    const q = req.query.q?.toLowerCase() || "";

    const filter = q
      ? {
          $or: [
            { name: new RegExp(q, "i") },
            { phone: new RegExp(q, "i") },
            { district: new RegExp(q, "i") },
            { pincode: new RegExp(q, "i") },
          ],
        }
      : {};

    const requests = await ScrapRequest.find(filter).sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: requests,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

/* =============================
   UPDATE SCRAP STATUS (ACCEPT / COMPLETE / REJECT)
============================= */
router.patch("/scrap/:id/status", adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required.",
      });
    }

    const updated = await ScrapRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    return res.json({
      success: true,
      message: "Status updated",
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});




module.exports = router;
