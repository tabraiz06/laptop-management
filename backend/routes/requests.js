const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
const Request = require("../models/Request");


// Fetch all laptop requests
router.get("/", protect(["admin"]), async (req, res) => {
  try {
    const requests = await Request.find().populate(
      "employeeId",
      "name email department"
    );
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching laptop requests:", error);
    res.status(500).json({ message: "Failed to fetch requests." });
  }
});


// Route for employees to request a new laptop
router.post("/", protect(['employee']), async (req, res) => {
  const { employeeId, reason } = req.body;

  if (!reason) {
    return res.status(400).json({ message: "Reason is required." });
  }

  try {
    const newRequest = new Request({
      employeeId,
      reason,
      status: "Pending",
      requestedAt: new Date(),
    });

    await newRequest.save();
    res.status(201).json({ message: "Laptop request submitted successfully." });
  } catch (error) {
    console.error("Error submitting laptop request:", error);
    res.status(500).json({ message: "Failed to submit laptop request." });
  }
});

// Update request status
router.put("/:requestId", protect(["admin"]), async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  if (!["Pending", "Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  try {
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    request.status = status;
    request.resolvedAt = status !== "Pending" ? new Date() : null;
    await request.save();

    res.status(200).json({ message: "Request status updated successfully." });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ message: "Failed to update request status." });
  }
});


module.exports = router;
