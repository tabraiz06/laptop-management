const express = require("express");
const {
  assignLaptop,
  getAssignments,
  unassignLaptop,
  getAllAssignments,
} = require("../controllers/assignmentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect(["admin"]), assignLaptop);
router.get("/admin", protect(["admin"]), getAllAssignments);
router.get("/", protect(["employee"]), getAssignments);
router.delete("/:id", protect(["admin"]), unassignLaptop);

module.exports = router;
