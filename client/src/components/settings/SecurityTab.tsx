import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

const SecurityTab = () => {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-white">Security Settings</CardTitle>
        <CardDescription className="dark:text-gray-400">
          Manage security and compliance settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="dark:text-gray-300">Authentication</Label>
            <div className="flex items-center justify-between">
              <span className="text-sm dark:text-gray-300">
                Require two-factor authentication
              </span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm dark:text-gray-300">
                Auto-logout after inactivity
              </span>
              <Switch />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="dark:text-gray-300">
              Session Timeout (minutes)
            </Label>
            <Input
              defaultValue="30"
              className="w-32 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="space-y-3">
            <Label className="dark:text-gray-300">Recording & Compliance</Label>
            <div className="flex items-center justify-between">
              <span className="text-sm dark:text-gray-300">
                Record all calls
              </span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm dark:text-gray-300">
                PCI compliance mode
              </span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm dark:text-gray-300">
                GDPR compliance
              </span>
              <Switch />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="dark:text-gray-300">Data Retention (days)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm dark:text-gray-400">
                  Call recordings
                </Label>
                <Input
                  defaultValue="90"
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm dark:text-gray-400">
                  Customer data
                </Label>
                <Input
                  defaultValue="365"
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

export default SecurityTab;
