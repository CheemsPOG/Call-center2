const express = require("express");
const router = express.Router();

// In-memory store for agent status (keyed by agentId or just one global for demo)
let agentStatus = {
  status: "Available", // Default
};

// Set agent status
router.post("/", (req, res) => {
  const { status } = req.body;
  if (!status || !["Available", "Busy", "Offline"].includes(status)) {
    return res
      .status(400)
      .json({ error: "Invalid status. Must be Available, Busy, or Offline." });
  }
  agentStatus.status = status;
  res.json({ message: "Status updated.", status });
});

// Get current agent status
router.get("/", (req, res) => {
  res.json({ status: agentStatus.status });
});

module.exports = router;
