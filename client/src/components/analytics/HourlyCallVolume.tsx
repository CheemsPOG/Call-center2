import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

/**
 * HourlyCallVolume renders a bar chart of calls received vs resolved by hour.
 * Props:
 *   - data: Array<{ hour: string; calls: number; resolved: number }>
 */
const HourlyCallVolume = ({
  data,
}: {
  data: { hour: string; calls: number; resolved: number }[];
}) => (
  <Card className="dark:bg-gray-800 dark:border-gray-700">
    <CardHeader>
      <CardTitle className="dark:text-white">Hourly Call Volume</CardTitle>
      <CardDescription className="dark:text-gray-400">
        Calls received vs resolved today
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="calls" fill="#3B82F6" name="Received" />
          <Bar dataKey="resolved" fill="#10B981" name="Resolved" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default HourlyCallVolume;
