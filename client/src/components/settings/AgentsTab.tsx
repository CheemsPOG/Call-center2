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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const AgentsTab = () => {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-white">Agent Configuration</CardTitle>
        <CardDescription className="dark:text-gray-400">
          Manage agent settings and permissions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="dark:text-gray-300">Default Agent Status</Label>
            <Select>
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                <SelectValue placeholder="Select default status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="dark:text-gray-300">Agent Permissions</Label>
            {[
              "Can transfer calls",
              "Can access customer history",
              "Can create tickets",
              "Can modify customer information",
              "Can access recordings",
            ].map((permission) => (
              <div
                key={permission}
                className="flex items-center justify-between"
              >
                <span className="text-sm dark:text-gray-300">{permission}</span>
                <Switch />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label className="dark:text-gray-300">Break Time Limits</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm dark:text-gray-400">
                  Max break duration (minutes)
                </Label>
                <Input
                  defaultValue="15"
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm dark:text-gray-400">
                  Breaks per shift
                </Label>
                <Input
                  defaultValue="3"
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

export default AgentsTab;
