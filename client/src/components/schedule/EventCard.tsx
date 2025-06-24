import React from "react";
import { Button } from "@/components/ui/button";
import {
  Video,
  Edit,
  Trash2,
  User,
  Clock,
  Users,
  Presentation,
  PlayCircle,
  PauseCircle,
  CheckCircle,
} from "lucide-react";
import { getTypeIconKey, getStatusBadgeKey } from "@/components/schedule/utils";

// Helper to render the icon for the event type
const renderTypeIcon = (type: string) => {
  switch (getTypeIconKey(type)) {
    case "meeting":
      return <Users className="w-5 h-5 text-blue-500" />;
    case "presentation":
      return <Presentation className="w-5 h-5 text-purple-500" />;
    case "standup":
      return <User className="w-5 h-5 text-green-500" />;
    default:
      return <Users className="w-5 h-5 text-gray-400" />;
  }
};

// Helper to render the status badge
const renderStatusBadge = (status: string) => {
  switch (getStatusBadgeKey(status)) {
    case "live":
      return (
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
          <PlayCircle className="w-3 h-3" /> Live
        </span>
      );
    case "upcoming":
      return (
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
          <PauseCircle className="w-3 h-3" /> Upcoming
        </span>
      );
    case "completed":
      return (
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold">
          <CheckCircle className="w-3 h-3" /> Completed
        </span>
      );
    default:
      return null;
  }
};

const EventCard = ({
  event,
  idx,
  onEdit,
  onDelete,
  onJoin,
  provided,
  snapshot,
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-4 transition-shadow border border-transparent ${
        snapshot.isDragging ? "shadow-lg border-blue-300" : ""
      }`}
    >
      {/* Drag handle: the colored bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        {/* Type icon */}
        {renderTypeIcon(event.type)}
        <span
          className={`w-2 h-8 rounded-full mr-3 cursor-grab ${
            event.type === "meeting"
              ? "bg-blue-500"
              : event.type === "presentation"
              ? "bg-purple-500"
              : "bg-green-500"
          }`}
        ></span>
        <div>
          <div className="font-semibold text-base flex items-center gap-2">
            {event.title}
            {/* Status badge */}
            {renderStatusBadge(event.status)}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span>
              <Clock className="inline w-4 h-4 mr-1" /> {event.time}
            </span>
            <span>{event.duration}</span>
            <span>{event.attendees} attendees</span>
            {/* Host */}
            <span className="flex items-center gap-1">
              <User className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {event.host}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2 md:mt-0">
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-1"
          disabled={event.status !== "live"}
          style={
            event.status !== "live"
              ? { opacity: 0.5, cursor: "not-allowed" }
              : {}
          }
          onClick={() => onJoin && onJoin(event)}
        >
          <Video className="w-4 h-4" /> Join
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-1"
          onClick={() => onEdit(event)}
        >
          <Edit className="w-4 h-4" /> Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="flex items-center gap-1"
          onClick={() => onDelete(event.id)}
        >
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
