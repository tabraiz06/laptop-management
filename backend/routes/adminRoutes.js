const express = require("express");
const router = express.Router();
const Laptop = require("../models/Laptop");

// @route   GET /api/admin/stats
// @desc    Get statistics for laptop statuses
// @access  Admin
router.get("/stats", async (req, res) => {
  try {
    // Fetch counts for different statuses
    const totalLaptops = await Laptop.countDocuments({});
    const assignedLaptops = await Laptop.countDocuments({ status: "assigned" });
    const availableLaptops = await Laptop.countDocuments({
      status: "available",
    });
    const maintenanceLaptops = await Laptop.countDocuments({
      status: "maintenance",
    });

    // Send the response
    res.json({
      total: totalLaptops,
      assigned: assignedLaptops,
      available: availableLaptops,
      maintenance: maintenanceLaptops,
    });
  } catch (error) {
    console.error("Error fetching laptop stats:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
