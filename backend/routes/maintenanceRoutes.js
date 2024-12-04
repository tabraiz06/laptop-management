const express = require("express");
const {
  logMaintenance,
  getMaintenanceLogs,
  updateMaintenanceLogs,
} = require("../controllers/maintenanceController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect(["admin"]), logMaintenance);
router.get("/", protect(["admin"]), getMaintenanceLogs);
router.put("/:id", protect(["admin"]), updateMaintenanceLogs);

module.exports = router;
