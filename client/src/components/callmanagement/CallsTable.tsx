import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pause, Volume2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

/**
 * CallsTable renders the list of calls in a table format.
 * Props:
 * - calls: array of call objects
 * - onView: function to view call details
 */
const CallsTable = ({ calls, onView }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="dark:border-gray-700">
          <TableHead className="dark:text-gray-300">Call ID</TableHead>
          <TableHead className="dark:text-gray-300">Customer</TableHead>
          <TableHead className="dark:text-gray-300">Type & Category</TableHead>
          <TableHead className="dark:text-gray-300">Status</TableHead>
          <TableHead className="dark:text-gray-300">Duration</TableHead>
          <TableHead className="dark:text-gray-300">Priority</TableHead>
          <TableHead className="dark:text-gray-300">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {calls.map((call) => (
          <TableRow
            key={call.id}
            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 dark:border-gray-700"
          >
            <TableCell className="font-medium dark:text-white">
              {call.id}
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
                  {call.customer}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {call.customerPhone}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-32">
                  {call.subject}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium dark:text-white">{call.type}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {call.category}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <StatusBadge status={call.status} />
            </TableCell>
            <TableCell className="dark:text-white">{call.duration}</TableCell>
            <TableCell>
              <PriorityBadge priority={call.priority} />
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="dark:hover:bg-gray-700"
                  onClick={() => onView(call)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                {call.status === "active" && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="dark:hover:bg-gray-700"
                    >
                      <Pause className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="dark:hover:bg-gray-700"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CallsTable;
