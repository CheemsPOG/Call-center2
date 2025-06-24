import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const NotificationsTab = () => {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-white">Notification Settings</CardTitle>
        <CardDescription className="dark:text-gray-400">
          Configure alerts and notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="dark:text-gray-300">Email Notifications</Label>
            {[
              "New ticket created",
              "High priority calls",
              "Queue overflow alerts",
              "Agent performance reports",
              "System maintenance updates",
            ].map((notification) => (
              <div
                key={notification}
                className="flex items-center justify-between"
              >
                <span className="text-sm dark:text-gray-300">
                  {notification}
                </span>
                <Switch />
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <Label className="dark:text-gray-300">Real-time Alerts</Label>
            {[
              "Call queue threshold exceeded",
              "Agent status changes",
              "Customer satisfaction scores",
              "System errors",
            ].map((alert) => (
              <div key={alert} className="flex items-center justify-between">
                <span className="text-sm dark:text-gray-300">{alert}</span>
                <Switch />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label className="dark:text-gray-300">Alert Recipients</Label>
            <Textarea
              placeholder="Enter email addresses separated by commas"
              className="dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
