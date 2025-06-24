import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React from "react";

/**
 * QueueStatus renders the call queue status card on the dashboard.
 * No props needed (static for now).
 */
const QueueStatus = () => (
  <Card className="dark:bg-gray-800 dark:border-gray-700">
    <CardHeader>
      <CardTitle className="dark:text-white">Call Queue Status</CardTitle>
      <CardDescription className="dark:text-gray-400">
        Current queue performance metrics
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium dark:text-white">
              Queue Length
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              12 calls
            </span>
          </div>
          <Progress value={60} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium dark:text-white">
              Avg Wait Time
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              3:24
            </span>
          </div>
          <Progress value={35} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium dark:text-white">
              Service Level
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              87%
            </span>
          </div>
          <Progress value={87} className="h-2" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default QueueStatus;
