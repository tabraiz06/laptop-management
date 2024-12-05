const Laptop = require("../models/Laptop");

exports.getStats = async (req, res) => {
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
};