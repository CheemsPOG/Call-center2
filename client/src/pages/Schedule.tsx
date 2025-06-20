import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Video,
  Clock,
  Calendar as CalendarIcon,
  Edit,
  Trash2,
} from "lucide-react";

// Placeholder data for today's schedule
const initialEvents = [
  {
    id: 1,
    title: "Digital Marketing Strategy",
    time: "08:00 AM",
    duration: "1 hour",
    attendees: 5,
    type: "meeting",
  },
  {
    id: 2,
    title: "UI Development Review",
    time: "10:00 AM",
    duration: "45 minutes",
    attendees: 3,
    type: "meeting",
  },
  {
    id: 3,
    title: "Data Analysis Presentation",
    time: "11:00 AM",
    duration: "30 minutes",
    attendees: 8,
    type: "presentation",
  },
  {
    id: 4,
    title: "Team Standup",
    time: "02:00 PM",
    duration: "15 minutes",
    attendees: 12,
    type: "standup",
  },
  {
    id: 5,
    title: "Client Presentation",
    time: "04:00 PM",
    duration: "1.5 hours",
    attendees: 6,
    type: "presentation",
  },
];

// Placeholder summary stats
const summaryStats = [
  {
    icon: <CalendarIcon className="w-6 h-6 text-blue-600" />,
    label: "Meetings Today",
    value: 12,
  },
  {
    icon: <Clock className="w-6 h-6 text-green-600" />,
    label: "Total Duration",
    value: "6.5h",
  },
  {
    icon: <Users className="w-6 h-6 text-purple-600" />,
    label: "Total Attendees",
    value: 34,
  },
  {
    icon: <Video className="w-6 h-6 text-pink-600" />,
    label: "Video Calls",
    value: 8,
  },
];

const emptyEvent = {
  title: "",
  time: "",
  duration: "",
  attendees: 1,
  type: "meeting",
};

// Productivity tips or fun facts array
const tips = [
  "Shorter meetings are often more productive. Try 25-minute sessions!",
  "Always set a clear agenda before your meeting starts.",
  "End meetings with clear action items for everyone involved.",
  "Did you know? The average worker spends 31 hours per month in unproductive meetings.",
  "Standing meetings can help keep discussions brief and focused.",
  "Encourage everyone to contribute for more engaging meetings.",
];

/**
 * Schedule page redesigned to match the reference image.
 * Calendar on the left, today's schedule on the right, summary cards at the bottom.
 * Sidebar and layout remain unchanged.
 */
const Schedule: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  // State for events
  const [events, setEvents] = useState(initialEvents);
  // State for add modal visibility
  const [showModal, setShowModal] = useState(false);
  // State for edit modal visibility
  const [showEditModal, setShowEditModal] = useState(false);
  // State for new event form
  const [newEvent, setNewEvent] = useState(emptyEvent);
  // State for editing event
  const [editEvent, setEditEvent] = useState({ ...emptyEvent, id: undefined });
  // State for rotating tip
  const [tipIndex, setTipIndex] = useState(0);

  // Rotate tip every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Handler to open add modal
  const handleOpenModal = () => setShowModal(true);
  // Handler to close add modal
  const handleCloseModal = () => setShowModal(false);

  // Handler to open edit modal
  const handleOpenEditModal = (event: any) => {
    setEditEvent(event);
    setShowEditModal(true);
  };
  // Handler to close edit modal
  const handleCloseEditModal = () => setShowEditModal(false);

  // Handler for form input changes (add)
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: name === "attendees" ? Number(value) : value,
    }));
  };
  // Handler for form input changes (edit)
  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditEvent((prev: any) => ({
      ...prev,
      [name]: name === "attendees" ? Number(value) : value,
    }));
  };

  // Handler to add new event
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents((prev) => [
      ...prev,
      {
        ...newEvent,
        id: Date.now(),
      },
    ]);
    setNewEvent(emptyEvent);
    setShowModal(false);
  };

  // Handler to update event
  const handleUpdateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents((prev) =>
      prev.map((ev) => (ev.id === editEvent.id ? editEvent : ev))
    );
    setShowEditModal(false);
  };

  // Handler to delete event
  const handleDelete = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="w-full p-0 md:p-6 flex flex-col gap-8">
        {/* Top section: Calendar and Today's Schedule */}
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Calendar - default color, centered */}
          <div className="lg:w-1/3 w-full flex flex-col items-center">
            <Card className="w-full max-w-xs">
              <CardContent className="p-6 flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" /> This Week
                </h2>
                <div className="w-full">
                  <Calendar selected={new Date(2024, 5, 20)} />
                </div>
              </CardContent>
            </Card>
            {/* Rotating productivity tip/fun fact under the calendar */}
            <div className="mt-6 w-full max-w-xs text-center">
              <div className="bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-lg px-4 py-3 text-blue-900 dark:text-blue-200 text-sm font-medium transition-all duration-300 min-h-[56px] flex items-center justify-center">
                {tips[tipIndex]}
              </div>
            </div>
          </div>
          {/* Today's Schedule */}
          <div className="flex-1 w-full">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Today's Schedule</h2>
                  <Button
                    size="sm"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    onClick={handleOpenModal}
                  >
                    + Schedule Meeting
                  </Button>
                </div>
                <div className="flex flex-col gap-4">
                  {events.length === 0 ? (
                    <div className="text-center text-gray-500 py-12 text-lg">
                      No meetings scheduled for today!
                      <br />
                      Enjoy your free time or schedule a new meeting.
                    </div>
                  ) : (
                    events.map((event) => (
                      <div
                        key={event.id}
                        className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                          <span
                            className={`w-2 h-8 rounded-full mr-3 ${
                              event.type === "meeting"
                                ? "bg-blue-500"
                                : event.type === "presentation"
                                ? "bg-purple-500"
                                : "bg-green-500"
                            }`}
                          ></span>
                          <div>
                            <div className="font-semibold text-base">
                              {event.title}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                              <span>
                                <Clock className="inline w-4 h-4 mr-1" />{" "}
                                {event.time}
                              </span>
                              <span>{event.duration}</span>
                              <span>{event.attendees} attendees</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2 md:mt-0">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Video className="w-4 h-4" /> Join
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                            onClick={() => handleOpenEditModal(event)}
                          >
                            <Edit className="w-4 h-4" /> Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="flex items-center gap-1"
                            onClick={() => handleDelete(event.id)}
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Bottom section: Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {summaryStats.map((stat, idx) => (
            <Card
              key={idx}
              className="flex flex-col items-center justify-center py-6"
            >
              <div className="mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Modal for adding a new event */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Add New Meeting</h3>
              <form onSubmit={handleAddEvent} className="flex flex-col gap-4">
                <input
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  name="time"
                  value={newEvent.time}
                  onChange={handleInputChange}
                  placeholder="Time (e.g. 03:00 PM)"
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  name="duration"
                  value={newEvent.duration}
                  onChange={handleInputChange}
                  placeholder="Duration (e.g. 1 hour)"
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  name="attendees"
                  type="number"
                  min={1}
                  value={newEvent.attendees}
                  onChange={handleInputChange}
                  placeholder="Attendees"
                  className="border rounded px-3 py-2"
                  required
                />
                <select
                  name="type"
                  value={newEvent.type}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2"
                >
                  <option value="meeting">Meeting</option>
                  <option value="presentation">Presentation</option>
                  <option value="standup">Standup</option>
                </select>
                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Add
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal for editing an event */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Edit Meeting</h3>
              <form
                onSubmit={handleUpdateEvent}
                className="flex flex-col gap-4"
              >
                <input
                  name="title"
                  value={editEvent.title}
                  onChange={handleEditInputChange}
                  placeholder="Title"
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  name="time"
                  value={editEvent.time}
                  onChange={handleEditInputChange}
                  placeholder="Time (e.g. 03:00 PM)"
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  name="duration"
                  value={editEvent.duration}
                  onChange={handleEditInputChange}
                  placeholder="Duration (e.g. 1 hour)"
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  name="attendees"
                  type="number"
                  min={1}
                  value={editEvent.attendees}
                  onChange={handleEditInputChange}
                  placeholder="Attendees"
                  className="border rounded px-3 py-2"
                  required
                />
                <select
                  name="type"
                  value={editEvent.type}
                  onChange={handleEditInputChange}
                  className="border rounded px-3 py-2"
                >
                  <option value="meeting">Meeting</option>
                  <option value="presentation">Presentation</option>
                  <option value="standup">Standup</option>
                </select>
                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseEditModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* Add custom style for calendar date hover */}
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
