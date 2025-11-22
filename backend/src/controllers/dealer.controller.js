// backend/src/controllers/dealer.controller.js
const ScrapDealer = require("../models/ScrapDealer");


exports.getDealerByPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    // Always get the MOST RECENT dealer info for this phone
    const dealer = await ScrapDealer
      .findOne({ phone })
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: dealer || null,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


exports.registerDealer = async (req, res) => {
  try {
    const {
      name,
      phone,
      aadhaar,
      businessType,
      annualSales,
      address,
      district,
      state,
      pincode,
      companyName
    } = req.body;

    const profilePic = req.file ? req.file.filename : null;

    const exists = await ScrapDealer.findOne({ aadhaar });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "A dealer with this Aadhaar is already registered.",
      });
    }

    const dealer = await ScrapDealer.create({
      name,
      phone,
      aadhaar,
      businessType,
      annualSales,
      address,
      district,
      state,
      pincode,
      profilePic,
      companyName
    });

    return res.json({
      success: true,
      message: "Scrap dealer registered successfully",
      data: dealer,
    });

  } catch (err) {
    console.log("DEALER REGISTER ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
