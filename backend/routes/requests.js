const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
const Request = require("../models/Request");
const {
  getRequest,
  raisNewRequest,
  updateRequest,
} = require("../controllers/requestControllers");

// Fetch all laptop requests
router.get("/", protect(["admin"]), getRequest);

// Route for employees to request a new laptop
router.post("/", protect(["employee"]), raisNewRequest);

// Update request status
router.put("/:requestId", protect(["admin"]), updateRequest);

module.exports = router;
