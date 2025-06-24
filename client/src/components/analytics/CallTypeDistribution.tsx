import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

/**
 * CallTypeDistribution renders a pie chart of call types.
 * Props:
 *   - data: Array<{ name: string; value: number; color: string }>
 */
const CallTypeDistribution = ({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) => (
  <Card className="dark:bg-gray-800 dark:border-gray-700">
    <CardHeader>
      <CardTitle className="dark:text-white">Call Distribution</CardTitle>
      <CardDescription className="dark:text-gray-400">
        Breakdown by call type
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default CallTypeDistribution;
