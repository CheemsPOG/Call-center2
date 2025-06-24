import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

/**
 * StatsGrid renders the grid of stat cards on the dashboard.
 * Props: stats (array of stat objects)
 */
const StatsGrid = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {stats.map((stat) => {
      const Icon = stat.icon;
      return (
        <Card
          key={stat.title}
          className="dark:bg-gray-800 dark:border-gray-700"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {stat.title}
            </CardTitle>
            <Icon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">
              {stat.value}
            </div>
            <p
              className={`text-xs ${
                stat.trend === "up"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {stat.change} from last week
            </p>
          </CardContent>
        </Card>
      );
    })}
  </div>
);

export default StatsGrid;
