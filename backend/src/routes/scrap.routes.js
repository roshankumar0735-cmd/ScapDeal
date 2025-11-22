const express = require("express");
const router = express.Router();

const {
  createScrapRequest,
  getMyScrapRequests,
  getScrapById,
  updateScrapStatus,
} = require("../controllers/scrap.controller");

// CREATE SCRAP REQUEST (your frontend uses POST /api/scrap)
router.post("/", createScrapRequest);

// GET CURRENT USER'S SCRAP REQUESTS
router.get("/my", getMyScrapRequests);

// GET SCRAP REQUEST BY ID
router.get("/:id", getScrapById);

// UPDATE STATUS
router.patch("/status", updateScrapStatus);

module.exports = router;
