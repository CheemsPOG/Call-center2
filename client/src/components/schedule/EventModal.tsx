import React from "react";
import { Button } from "@/components/ui/button";

const EventModal = ({ isOpen, onClose, onSubmit, event, setEvent, isEdit }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {isEdit ? "Edit Meeting" : "Add New Meeting"}
        </h3>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            name="title"
            value={event.title}
            onChange={(e) =>
              setEvent((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Title"
            className="border rounded px-3 py-2"
            required
          />
          <input
            name="time"
            value={event.time}
            onChange={(e) =>
              setEvent((prev) => ({ ...prev, time: e.target.value }))
            }
            placeholder="Time (e.g. 03:00 PM)"
            className="border rounded px-3 py-2"
            required
          />
          <input
            name="duration"
            value={event.duration}
            onChange={(e) =>
              setEvent((prev) => ({ ...prev, duration: e.target.value }))
            }
            placeholder="Duration (e.g. 1 hour)"
            className="border rounded px-3 py-2"
            required
          />
          <input
            name="attendees"
            type="number"
            min={1}
            value={event.attendees}
            onChange={(e) =>
              setEvent((prev) => ({
                ...prev,
                attendees: Number(e.target.value),
              }))
            }
            placeholder="Attendees"
            className="border rounded px-3 py-2"
            required
          />
          <select
            name="type"
            value={event.type}
            onChange={(e) =>
              setEvent((prev) => ({ ...prev, type: e.target.value }))
            }
            className="border rounded px-3 py-2"
          >
            <option value="meeting">Meeting</option>
            <option value="presentation">Presentation</option>
            <option value="standup">Standup</option>
          </select>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isEdit ? "Save" : "Add"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
