const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
  updateProfile
} = require("../controllers/auth.controller");

// ⭐ THIS IMPORT WAS MISSING — caused crash
const { auth } = require("../middleware/auth");

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// GET PROFILE (protected)
router.get("/profile", auth, getProfile);

// UPDATE PROFILE (protected)
router.put("/update-profile", auth, updateProfile);

module.exports = router;
