const supabase = require("../db/supabaseClient");

// Add hardcoded notifications to the database
const addHardcodedNotifications = async (req, res) => {
  const notifications = [
    {
      title: "New Call Assigned",
      message: "You have been assigned to handle a high-priority support call",
      type: "call",
      read: false,
    },
    {
      title: "Customer Feedback",
      message: "You received a 5-star rating from your last call",
      type: "rating",
      read: false,
    },
    {
      title: "System Alert",
      message: "Call center system maintenance scheduled for tonight",
      type: "alert",
      read: false,
    },
    {
      title: "New Message",
      message: "Team meeting scheduled for tomorrow at 10 AM",
      type: "message",
      read: false,
    },
  ];

  // Insert notifications
  try {
    const { data, error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", id)
      .select(); // returns deleted rows

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Notification not found" });
    }
    return res.json({ message: "Notification deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Unexpected server error" });
  }
};

// Fetch all notifications
const getNotifications = async (req, res) => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("time", { ascending: false });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
};

// Delete a notification by id
const deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", id)
      .select(); // returns deleted rows

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Notification not found" });
    }
    return res.json({ message: "Notification deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Unexpected server error" });
  }
};

// Mark a notification as read by id
const markAsRead = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json({ message: "Notification marked as read" });
};

module.exports = {
  addHardcodedNotifications,
  getNotifications,
  deleteNotification,
  markAsRead,
};
