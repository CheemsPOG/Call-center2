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

const GeneralTab = () => {
  return (
    <div className="grid gap-6">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">General Settings</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Basic call center configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="center-name" className="dark:text-gray-300">
                Call Center Name
              </Label>
              <Input
                id="center-name"
                defaultValue="Customer Support Center"
                className="dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone" className="dark:text-gray-300">
                Timezone
              </Label>
              <Select>
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="est">Eastern Standard Time</SelectItem>
                  <SelectItem value="pst">Pacific Standard Time</SelectItem>
                  <SelectItem value="cst">Central Standard Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="business-hours" className="dark:text-gray-300">
              Business Hours
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="9:00 AM"
                className="dark:bg-gray-700 dark:border-gray-600"
              />
              <Input
                placeholder="5:00 PM"
                className="dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="dark:text-gray-300">Auto-answer calls</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Automatically answer incoming calls after 3 rings
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">
            Service Level Targets
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Set performance targets for your team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="dark:text-gray-300">
                Answer within (seconds)
              </Label>
              <Input
                defaultValue="30"
                className="dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label className="dark:text-gray-300">
                Service Level Target (%)
              </Label>
              <Input
                defaultValue="90"
                className="dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label className="dark:text-gray-300">
                Max Handle Time (minutes)
              </Label>
              <Input
                defaultValue="8"
                className="dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralTab;
