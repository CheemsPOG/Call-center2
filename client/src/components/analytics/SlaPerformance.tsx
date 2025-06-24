import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle } from "lucide-react";

/**
 * SlaPerformance renders the grid of SLA, queue health, and alerts cards.
 * No props needed (static content).
 */
const SlaPerformance = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Service Level Card */}
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg dark:text-white">Service Level</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="dark:text-gray-300">Answered within 30s</span>
              <span className="dark:text-white">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="dark:text-gray-300">Target: 90%</span>
              <Badge className="bg-green-100 text-green-800">
                Above Target
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    {/* Queue Health Card */}
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg dark:text-white">Queue Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm dark:text-gray-300">Calls in Queue</span>
            <span className="font-medium dark:text-white">8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm dark:text-gray-300">Longest Wait</span>
            <span className="font-medium dark:text-white">2:15</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm dark:text-gray-300">Avg Wait Time</span>
            <span className="font-medium dark:text-white">0:45</span>
          </div>
        </div>
      </CardContent>
    </Card>
    {/* Alerts Card */}
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg dark:text-white">Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <span className="text-sm dark:text-gray-300">
              High queue volume
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm dark:text-gray-300">
              All systems operational
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default SlaPerformance;
