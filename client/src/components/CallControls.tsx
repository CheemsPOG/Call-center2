
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Users,
  PhoneForwarded,
  Pause,
  Play,
  Square,
} from "lucide-react";

interface CallControlsProps {
  callId: string;
  customer: string;
  duration: string;
  onEndCall: () => void;
  onTransfer: () => void;
  onHold: () => void;
}

const CallControls = ({
  callId,
  customer,
  duration,
  onEndCall,
  onTransfer,
  onHold,
}: CallControlsProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  const [isOnHold, setIsOnHold] = useState(false);

  return (
    <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500 text-white">Active Call</Badge>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {callId}
              </span>
            </div>
            <h3 className="font-semibold text-lg dark:text-white">
              {customer}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Duration: {duration}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <div
              className={`w-3 h-3 rounded-full ${
                isRecording ? "bg-red-500 animate-pulse" : "bg-gray-400"
              }`}
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {isRecording ? "Recording" : "Not Recording"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button
            variant={isMuted ? "destructive" : "outline"}
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="flex flex-col h-16"
          >
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            <span className="text-xs mt-1">{isMuted ? "Unmute" : "Mute"}</span>
          </Button>

          <Button
            variant={isSpeakerOn ? "default" : "outline"}
            size="sm"
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className="flex flex-col h-16"
          >
            {isSpeakerOn ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
            <span className="text-xs mt-1">Speaker</span>
          </Button>

          <Button
            variant={isOnHold ? "secondary" : "outline"}
            size="sm"
            onClick={() => {
              setIsOnHold(!isOnHold);
              onHold();
            }}
            className="flex flex-col h-16"
          >
            {isOnHold ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            <span className="text-xs mt-1">{isOnHold ? "Resume" : "Hold"}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onTransfer}
            className="flex flex-col h-16"
          >
            <PhoneForwarded className="h-4 w-4" />
            <span className="text-xs mt-1">Transfer</span>
          </Button>
        </div>

        <div className="flex space-x-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRecording(!isRecording)}
            className="flex-1"
          >
            {isRecording ? <Square className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={onEndCall}
            className="flex-1"
          >
            <PhoneOff className="h-4 w-4 mr-1" />
            End Call
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallControls;
