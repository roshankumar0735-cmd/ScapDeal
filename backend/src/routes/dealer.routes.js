const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  registerDealer,
  getDealerByPhone
} = require("../controllers/dealer.controller");

const ScrapDealer = require("../models/ScrapDealer");

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/dealers"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });


// ⭐ REGISTER DEALER
router.post("/register", upload.single("profilePic"), registerDealer);


// ⭐ GET DEALER BY PHONE (for Account Page)
router.get("/my/:phone", getDealerByPhone);


// ⭐ SEARCH DEALERS
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q || "";

    const dealers = await ScrapDealer.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { companyName: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
        { businessType: { $regex: q, $options: "i" } },
        { annualSales: { $regex: q, $options: "i" } },
        { address: { $regex: q, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    return res.json({ success: true, dealers });
  } catch (err) {
    console.log("Dealer Search ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


// ⭐ GET ALL DEALERS (ADMIN)
router.get("/all", async (req, res) => {
  try {
    const dealers = await ScrapDealer.find().sort({ createdAt: -1 });
    return res.json({ success: true, dealers });
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
