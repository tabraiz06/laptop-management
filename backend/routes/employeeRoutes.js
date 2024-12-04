const express = require("express");
const {
  addEmployee,
  getEmployees,
  removeEmployee,
} = require("../controllers/employeeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect(["admin"]), addEmployee);
router.get("/", protect(["admin"]), getEmployees);
router.delete("/:id", protect(["admin"]), removeEmployee);

module.exports = router;
