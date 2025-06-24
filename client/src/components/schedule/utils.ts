import {
  Users,
  Presentation,
  User,
  PlayCircle,
  PauseCircle,
  CheckCircle,
} from "lucide-react";
import React from "react";

// Productivity tips or fun facts array
export const tips = [
  "Shorter meetings are often more productive. Try 25-minute sessions!",
  "Always set a clear agenda before your meeting starts.",
  "End meetings with clear action items for everyone involved.",
  "Did you know? The average worker spends 31 hours per month in unproductive meetings.",
  "Standing meetings can help keep discussions brief and focused.",
  "Encourage everyone to contribute for more engaging meetings.",
];

// Helper to get icon type for meeting type (returns a string key)
export const getTypeIconKey = (type: string): "meeting" | "presentation" | "standup" | "default" => {
  switch (type) {
    case "meeting":
      return "meeting";
    case "presentation":
      return "presentation";
    case "standup":
      return "standup";
    default:
      return "default";
  }
};

// Helper to get status badge type (returns a string key)
export const getStatusBadgeKey = (status: string): "live" | "upcoming" | "completed" | "default" => {
  switch (status) {
    case "live":
      return "live";
    case "upcoming":
      return "upcoming";
    case "completed":
      return "completed";
    default:
      return "default";
  }
};

// Helper to parse duration strings like "1 hour", "45 minutes", "1.5 hours"
export function parseDuration(duration: string): number {
  // Returns duration in hours (float)
  if (!duration) return 0;
  const lower = duration.toLowerCase();
  if (lower.includes("hour")) {
    const match = lower.match(/([\d.]+)\s*hour/);
    if (match) return parseFloat(match[1]);
  }
  if (lower.includes("minute")) {
    const match = lower.match(/([\d.]+)\s*minute/);
    if (match) return parseFloat(match[1]) / 60;
  }
  return 0;
} 