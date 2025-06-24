import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, PhoneCall } from "lucide-react";

/**
 * NewCallDialog renders the dialog for initiating a new call.
 * Props: open, onOpenChange, phoneNumber, setPhoneNumber, callCategory, setCallCategory, onStart, onCancel
 */
const NewCallDialog = ({
  open,
  onOpenChange,
  phoneNumber,
  setPhoneNumber,
  callCategory,
  setCallCategory,
  onStart,
  onCancel,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="dark:text-white">
            Initiate New Call
          </DialogTitle>
          <DialogDescription className="dark:text-gray-400">
            Enter the phone number to start a new outbound call
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium dark:text-gray-300"
            >
              Phone Number
            </label>
            <Input
              id="phone"
              placeholder="+1 (555) 000-0000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="text-sm font-medium dark:text-gray-300"
            >
              Call Category
            </label>
            <Select value={callCategory} onValueChange={setCallCategory}>
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem
                  value="support"
                  className="dark:text-white dark:hover:bg-gray-700"
                >
                  Support
                </SelectItem>
                <SelectItem
                  value="sales"
                  className="dark:text-white dark:hover:bg-gray-700"
                >
                  Sales
                </SelectItem>
                <SelectItem
                  value="technical"
                  className="dark:text-white dark:hover:bg-gray-700"
                >
                  Technical
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onCancel}
            className="dark:border-gray-700 dark:hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={onStart}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            disabled={!phoneNumber}
          >
            <PhoneCall className="h-4 w-4 mr-2" />
            Start Call
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewCallDialog;
