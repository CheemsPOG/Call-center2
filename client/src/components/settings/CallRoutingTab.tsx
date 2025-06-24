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

const CallRoutingTab = () => {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-white">Call Routing Rules</CardTitle>
        <CardDescription className="dark:text-gray-400">
          Configure how calls are distributed to agents
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="dark:text-gray-300">Routing Method</Label>
            <Select>
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                <SelectValue placeholder="Select routing method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="round-robin">Round Robin</SelectItem>
                <SelectItem value="least-occupied">Least Occupied</SelectItem>
                <SelectItem value="skills-based">Skills Based</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="dark:text-gray-300">Queue Priority</Label>
            <div className="space-y-3">
              {["Support", "Sales", "Technical", "Billing"].map((queue) => (
                <div key={queue} className="flex items-center justify-between">
                  <span className="dark:text-white">{queue}</span>
                  <Select>
                    <SelectTrigger className="w-32 dark:bg-gray-700 dark:border-gray-600">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="dark:text-gray-300">Overflow Settings</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm dark:text-gray-300">
                  Enable call overflow
                </span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm dark:text-gray-300">
                  Overflow after (seconds)
                </span>
                <Input
                  className="w-20 dark:bg-gray-700 dark:border-gray-600"
                  defaultValue="120"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallRoutingTab;
