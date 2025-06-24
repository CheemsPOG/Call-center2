import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Users, Clock, Video } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import EventCard from "@/components/schedule/EventCard";
import SummaryCard from "@/components/schedule/SummaryCard";
import EventModal from "@/components/schedule/EventModal";
import useRotatingTip from "@/components/schedule/useRotatingTip";
import { tips, parseDuration } from "@/components/schedule/utils";

// Initial events data
const initialEvents = [
  {
    id: 1,
    title: "Digital Marketing Strategy",
    time: "08:00 AM",
    duration: "1 hour",
    attendees: 5,
    type: "meeting",
    host: "Alice Johnson",
    status: "live",
  },
  {
    id: 2,
    title: "UI Development Review",
    time: "10:00 AM",
    duration: "45 minutes",
    attendees: 3,
    type: "meeting",
    host: "Bob Smith",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Data Analysis Presentation",
    time: "11:00 AM",
    duration: "30 minutes",
    attendees: 8,
    type: "presentation",
    host: "Carol Davis",
    status: "completed",
  },
  {
    id: 4,
    title: "Team Standup",
    time: "02:00 PM",
    duration: "15 minutes",
    attendees: 12,
    type: "standup",
    host: "David Brown",
    status: "upcoming",
  },
  {
    id: 5,
    title: "Client Presentation",
    time: "04:00 PM",
    duration: "1.5 hours",
    attendees: 6,
    type: "presentation",
    host: "Emma Wilson",
    status: "live",
  },
];

const emptyEvent = {
  title: "",
  time: "",
  duration: "",
  attendees: 1,
  type: "meeting",
  host: "",
  status: "upcoming",
};

const Schedule: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  // State for events
  const [events, setEvents] = useState(initialEvents);
  // State for add/edit modals
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newEvent, setNewEvent] = useState(emptyEvent);
  const [editEvent, setEditEvent] = useState({ ...emptyEvent, id: undefined });
  // Rotating tip
  const tip = useRotatingTip(tips, 10000);

  // Handler to open/close modals
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenEditModal = (event: any) => {
    setEditEvent(event);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  // Add new event
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents((prev) => [
      ...prev,
      {
        ...newEvent,
        id: Date.now(),
        host: newEvent.host || "Unknown",
        status: newEvent.status || "upcoming",
      },
    ]);
    setNewEvent(emptyEvent);
    setShowModal(false);
  };
  // Update event
  const handleUpdateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === editEvent.id
          ? {
              ...editEvent,
              host: editEvent.host || "Unknown",
              status: editEvent.status || "upcoming",
            }
          : ev
      )
    );
    setShowEditModal(false);
  };
  // Delete event
  const handleDelete = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };
  // Drag and drop handler
  const getTimeForIndex = (idx: number) => initialEvents[idx]?.time || "";
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(events);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    // Update the time of the moved event to match its new slot
    const updated = reordered.map((ev, idx) =>
      idx === result.destination.index
        ? { ...ev, time: getTimeForIndex(idx) }
        : ev
    );
    setEvents(updated);
  };

  // Dynamic stats
  const meetingsToday = events.length;
  const totalDurationHours = events.reduce(
    (sum, ev) => sum + parseDuration(ev.duration),
    0
  );
  const totalAttendees = events.reduce(
    (sum, ev) => sum + (ev.attendees || 0),
    0
  );
  const videoCalls = events.filter((ev) => ev.type === "meeting").length;

  return (
    <Layout onLogout={onLogout}>
      <div className="w-full p-0 md:p-6 flex flex-col gap-8">
        {/* Top section: Calendar and Today's Schedule */}
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Calendar */}
          <div className="lg:w-1/3 w-full flex flex-col items-center">
            <div className="w-full max-w-xs">
              <div className="p-6 flex flex-col items-center bg-white dark:bg-gray-900 rounded-lg shadow border">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" /> This Week
                </h2>
                <div className="w-full">
                  <Calendar selected={new Date(2024, 5, 20)} />
                </div>
              </div>
            </div>
            {/* Rotating productivity tip */}
            <div className="mt-6 w-full max-w-xs text-center">
              <div className="bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-lg px-4 py-3 text-blue-900 dark:text-blue-200 text-sm font-medium min-h-[56px] flex items-center justify-center">
                {tip}
              </div>
            </div>
          </div>
          {/* Today's Schedule */}
          <div className="flex-1 w-full">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Today's Schedule</h2>
                  <button
                    className="bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2 text-sm font-medium"
                    onClick={handleOpenModal}
                  >
                    + Schedule Meeting
                  </button>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="schedule-list">
                    {(provided) => (
                      <div
                        className="flex flex-col gap-4"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {events.length === 0 ? (
                          <div className="text-center text-gray-500 py-12 text-lg">
                            No meetings scheduled for today!
                            <br />
                            Enjoy your free time or schedule a new meeting.
                          </div>
                        ) : (
                          events.map((event, idx) => (
                            <Draggable
                              key={event.id}
                              draggableId={String(event.id)}
                              index={idx}
                            >
                              {(provided, snapshot) => (
                                <EventCard
                                  event={event}
                                  idx={idx}
                                  onEdit={handleOpenEditModal}
                                  onDelete={handleDelete}
                                  onJoin={() => {}}
                                  provided={provided}
                                  snapshot={snapshot}
                                />
                              )}
                            </Draggable>
                          ))
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom section: Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <SummaryCard
            icon={<CalendarIcon className="w-6 h-6 text-blue-600 mb-2" />}
            value={meetingsToday}
            label="Meetings Today"
          />
          <SummaryCard
            icon={<Clock className="w-6 h-6 text-green-600 mb-2" />}
            value={`${totalDurationHours.toFixed(1)}h`}
            label="Total Duration"
          />
          <SummaryCard
            icon={<Users className="w-6 h-6 text-purple-600 mb-2" />}
            value={totalAttendees}
            label="Total Attendees"
          />
          <SummaryCard
            icon={<Video className="w-6 h-6 text-pink-600 mb-2" />}
            value={videoCalls}
            label="Video Calls"
          />
        </div>
        {/* Add Event Modal */}
        <EventModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSubmit={handleAddEvent}
          event={newEvent}
          setEvent={setNewEvent}
          isEdit={false}
        />
        {/* Edit Event Modal */}
        <EventModal
          isOpen={showEditModal}
          onClose={handleCloseEditModal}
          onSubmit={handleUpdateEvent}
          event={editEvent}
          setEvent={setEditEvent}
          isEdit={true}
        />
      </div>
      {/* Custom style for calendar date hover */}
      <style>{`
        .rdp-day:hover:not([aria-selected]):not([disabled]) {
          background: #000 !important;
          color: #fff !important;
        }
        .rdp-day[aria-selected="true"] {
          background: #000 !important;
          color: #fff !important;
        }
      `}</style>
    </Layout>
  );
};

export default Schedule;
