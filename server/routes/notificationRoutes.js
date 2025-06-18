const express = require("express");
const router = express.Router();
const {
  addHardcodedNotifications,
  getNotifications,
} = require("../controllers/notificationController");

// Route to add hardcoded notifications
router.post("/seed", addHardcodedNotifications);

// Route to fetch all notifications
router.get("/", getNotifications);

module.exports = router;
