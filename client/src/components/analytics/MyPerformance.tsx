import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

/**
 * MyPerformance renders the current agent's performance card.
 * Props:
 *   - performance: { name: string; calls: number; avgTime: string; satisfaction: number; goal: number }
 */
const MyPerformance = ({
  performance,
}: {
  performance: {
    name: string;
    calls: number;
    avgTime: string;
    satisfaction: number;
    goal: number;
  };
}) => (
  <Card className="dark:bg-gray-800 dark:border-gray-700">
    <CardHeader>
      <CardTitle className="dark:text-white">My Performance Today</CardTitle>
      <CardDescription className="dark:text-gray-400">
        Your personal stats and progress for today
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-medium">
              {performance.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <div className="font-medium dark:text-white text-lg">
              {performance.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {performance.calls} calls handled
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-8 text-sm">
          <div className="text-center">
            <div className="font-medium dark:text-white">
              {performance.avgTime}
            </div>
            <div className="text-gray-500 dark:text-gray-400">Avg Time</div>
          </div>
          <div className="text-center">
            <div className="font-medium dark:text-white flex items-center justify-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              {performance.satisfaction}
            </div>
            <div className="text-gray-500 dark:text-gray-400">Rating</div>
          </div>
          <div className="text-center">
            <Progress
              value={(performance.calls / performance.goal) * 100}
              className="w-20"
            />
            <div className="text-gray-500 dark:text-gray-400">
              Goal Progress
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default MyPerformance;
