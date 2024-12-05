const express = require("express");
const router = express.Router();

const { getStats } = require("../controllers/statsController");
const { protect } = require("../middleware/authMiddleware");

// @route   GET /api/admin/stats
// @desc    Get statistics for laptop statuses
// @access  Admin
router.get("/stats",protect(['admin']), getStats);

module.exports = router;
