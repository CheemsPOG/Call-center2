import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PhoneCall, CheckCircle, Clock } from "lucide-react";
import React from "react";

/**
 * RecentCalls renders the recent calls card on the dashboard.
 * Props: recentCalls (array of call objects)
 */
const RecentCalls = ({ recentCalls }) => (
  <Card className="dark:bg-gray-800 dark:border-gray-700">
    <CardHeader>
      <CardTitle className="dark:text-white">Recent Calls</CardTitle>
      <CardDescription className="dark:text-gray-400">
        Latest call activity in your center
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {recentCalls.map((call) => (
          <div
            key={call.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-full ${
                  call.status === "active"
                    ? "bg-green-100 dark:bg-green-900/50"
                    : call.status === "completed"
                    ? "bg-blue-100 dark:bg-blue-900/50"
                    : "bg-yellow-100 dark:bg-yellow-900/50"
                }`}
              >
                {call.status === "active" ? (
                  <PhoneCall className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : call.status === "completed" ? (
                  <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                )}
              </div>
              <div>
                <div className="font-medium dark:text-white">
                  {call.customer}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {call.agent} • {call.duration}
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge
                variant={
                  call.status === "active"
                    ? "default"
                    : call.status === "completed"
                    ? "secondary"
                    : "outline"
                }
              >
                {call.status}
              </Badge>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {call.type}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default RecentCalls;
