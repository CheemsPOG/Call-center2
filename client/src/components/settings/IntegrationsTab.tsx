import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Database, Phone, Bell } from "lucide-react";
import React from "react";

const IntegrationsTab = () => {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-white">System Integrations</CardTitle>
        <CardDescription className="dark:text-gray-400">
          Connect with external systems and APIs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="border rounded-lg p-4 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-blue-500" />
                <span className="font-medium dark:text-white">
                  CRM Integration
                </span>
              </div>
              <Switch />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Connect with Salesforce, HubSpot, or other CRM systems
            </p>
          </div>

          <div className="border rounded-lg p-4 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-green-500" />
                <span className="font-medium dark:text-white">
                  VoIP Provider
                </span>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Set up connection to your VoIP service provider
            </p>
          </div>

          <div className="border rounded-lg p-4 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-yellow-500" />
                <span className="font-medium dark:text-white">
                  Slack Notifications
                </span>
              </div>
              <Switch />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Send alerts and updates to Slack channels
            </p>
          </div>

          <div className="space-y-2">
            <Label className="dark:text-gray-300">API Configuration</Label>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label className="text-sm dark:text-gray-400">
                  Webhook URL
                </Label>
                <Input
                  placeholder="https://your-api.com/webhook"
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm dark:text-gray-400">API Key</Label>
                <Input
                  type="password"
                  placeholder="Enter your API key"
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationsTab;
