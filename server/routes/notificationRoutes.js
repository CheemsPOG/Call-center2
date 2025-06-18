const express = require("express");
const router = express.Router();
const {
  addHardcodedNotifications,
  getNotifications,
  deleteNotification,
  markAsRead,
} = require("../controllers/notificationController");

// Route to add hardcoded notifications
router.post("/seed", addHardcodedNotifications);

// Route to fetch all notifications
router.get("/", getNotifications);

// Route to delete a notification by id
router.delete("/:id", deleteNotification);

// Route to mark a notification as read by id
router.patch("/:id/read", markAsRead);

module.exports = router;
