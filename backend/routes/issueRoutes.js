const express = require("express");
const {
  reportIssue,
  getIssues,
  updateIssueStatus,
  getLaptopIssue,
} = require("../controllers/issueController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect(["employee", "admin"]), reportIssue);
router.get("/", protect(["admin"]), getIssues);
router.get("/:id", protect(["admin"]), getLaptopIssue);

router.patch("/:id", protect(["admin"]), updateIssueStatus);

module.exports = router;
