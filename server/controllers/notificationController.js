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
  const { error } = await supabase.from("notifications").insert(notifications);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json({ message: "Notifications added successfully" });
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

module.exports = {
  addHardcodedNotifications,
  getNotifications,
};
