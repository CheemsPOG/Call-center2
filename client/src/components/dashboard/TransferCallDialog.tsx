import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";

/**
 * TransferCallDialog renders the dialog/modal for transferring a call.
 * Props: open, onOpenChange, availableAgents, selectedAgent, setSelectedAgent, onConfirm
 */
const TransferCallDialog = ({
  open,
  onOpenChange,
  availableAgents,
  selectedAgent,
  setSelectedAgent,
  onConfirm,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
      <DialogHeader>
        <DialogTitle className="dark:text-white">Transfer Call</DialogTitle>
        <DialogDescription className="dark:text-gray-400">
          Select an available agent to transfer the active call.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Active Call with:{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            Alice Johnson
          </span>
        </p>
        <div className="space-y-2">
          {availableAgents.length > 0 ? (
            availableAgents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent.name)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedAgent === agent.name
                    ? "bg-blue-100 dark:bg-blue-900/50"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {agent.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium dark:text-white">
                      {agent.name}
                    </div>
                  </div>
                </div>
                <Badge variant={agent.online ? "default" : "secondary"}>
                  {agent.online ? "Online" : "Offline"}
                </Badge>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">
              No available agents to transfer to.
            </p>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          className="dark:border-gray-700 dark:hover:bg-gray-700"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={!selectedAgent}
        >
          <PhoneCall className="h-4 w-4 mr-2" />
          Confirm Transfer
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default TransferCallDialog;
