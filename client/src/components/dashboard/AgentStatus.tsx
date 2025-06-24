import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from "react";

/**
 * AgentStatus renders the agent status card on the dashboard.
 * Props: teamMembers (array of agent objects)
 */
const AgentStatus = ({ teamMembers }) => (
  <Card className="dark:bg-gray-800 dark:border-gray-700">
    <CardHeader>
      <CardTitle className="dark:text-white">Agent Status</CardTitle>
      <CardDescription className="dark:text-gray-400">
        Current status of your team
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {teamMembers.map((agent) => (
          <div key={agent.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {agent.avatar}
                </span>
              </div>
              <div>
                <div className="font-medium dark:text-white">{agent.name}</div>
              </div>
            </div>
            <Badge variant={agent.online ? "default" : "secondary"}>
              {agent.online ? "Online" : "Offline"}
            </Badge>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default AgentStatus;
