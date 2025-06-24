import React from "react";
import { Badge } from "@/components/ui/badge";

/**
 * PriorityBadge renders a colored badge for the call priority.
 * Props: priority (string)
 */
const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400";
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

const PriorityBadge = ({ priority }) => (
  <Badge className={`${getPriorityColor(priority)} dark:bg-opacity-20`}>
    {priority.charAt(0).toUpperCase() + priority.slice(1)}
  </Badge>
);

export default PriorityBadge;
