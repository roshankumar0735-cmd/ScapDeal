// backend/src/routes/index.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Auth Routes
router.use("/auth", require("./auth.routes"));

// Scrap Routes
router.use("/scrap", require("./scrap.routes"));

// Malwa Routes
router.use("/malwa", require("./malwa.routes"));

// Dealer Registration Routes
router.use("/dealer", require("./dealer.routes"));

// Admin Routes
router.use("/admin", require("./admin.route.js"));

router.use("/user", require("./user.routes"));


// Database Health Check
router.get("/db-test", (req, res) => {
  res.json({
    connected: mongoose.connection.readyState === 1,
    host: mongoose.connection.host,
    dbName: mongoose.connection.name,
  });
});

module.exports = router;
