const express = require("express");
const {
  addLaptop,
  getLaptops,
  updateLaptop,
  deleteLaptop,
} = require("../controllers/laptopController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect(["admin"]), addLaptop);
router.get("/", protect(["admin", "employee"]), getLaptops);
router.put("/:id", protect(["admin"]), updateLaptop);
router.delete("/:id", protect(["admin"]), deleteLaptop);

module.exports = router;
