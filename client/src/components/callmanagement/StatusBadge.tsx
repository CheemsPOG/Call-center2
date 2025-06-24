import React from "react";
import { Badge } from "@/components/ui/badge";

/**
 * StatusBadge renders a colored badge for the call status.
 * Props: status (string)
 */
const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400";
    case "completed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400";
    case "queued":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400";
    case "on-hold":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

const StatusBadge = ({ status }) => (
  <Badge className={`${getStatusColor(status)} dark:bg-opacity-20`}>
    {status}
  </Badge>
);

export default StatusBadge;
