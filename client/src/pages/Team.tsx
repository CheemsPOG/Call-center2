import React, { useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout";
import { Search, Phone, Video, MoreVertical, Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Team of 4 (including current user)
const teamMembers = [
  {
    id: 1,
    name: "Jerome Bell",
    avatar: "JB",
    online: true,
    lastMessage: "Hey, how are the designs coming along?",
    lastTime: "2 min ago",
    unread: 2,
  },
  {
    id: 2,
    name: "Kathryn Murphy",
    avatar: "KM",
    online: true,
    lastMessage: "The user research findings look great!",
    lastTime: "1 hour ago",
    unread: 0,
  },
  {
    id: 3,
    name: "Darrell Steward",
    avatar: "DS",
    online: false,
    lastMessage: "Can we schedule a call for tomorrow?",
    lastTime: "3 hours ago",
    unread: 1,
  },
  {
    id: 4,
    name: "Annette Brooks",
    avatar: "AB",
    online: true,
    lastMessage: "Thanks for the feedback on the mockups",
    lastTime: "1 day ago",
    unread: 0,
  },
];

const currentUser = {
  id: 0,
  name: "You",
  avatar: "Y",
};

// Initial messages per member (simulate chat history)
const initialMessages = {
  1: [
    {
      sender: 1,
      text: "Hey! How are the new dashboard designs coming along?",
      time: "10:30 AM",
    },
    {
      sender: 0,
      text: "Going well! I should have the first draft ready by end of day.",
      time: "10:32 AM",
    },
    {
      sender: 1,
      text: "Awesome! Looking forward to seeing them. The client is really excited about this project.",
      time: "10:35 AM",
    },
    {
      sender: 0,
      text: "Perfect! I'll send over the Figma link once it's ready.",
      time: "10:37 AM",
    },
  ],
  2: [
    {
      sender: 2,
      text: "The user research findings look great!",
      time: "09:00 AM",
    },
    {
      sender: 0,
      text: "Thanks Kathryn! I'll incorporate them into the next sprint.",
      time: "09:05 AM",
    },
  ],
  3: [
    {
      sender: 3,
      text: "Can we schedule a call for tomorrow?",
      time: "08:00 AM",
    },
    {
      sender: 0,
      text: "Sure, what time works for you?",
      time: "08:10 AM",
    },
  ],
  4: [
    {
      sender: 4,
      text: "Thanks for the feedback on the mockups",
      time: "Yesterday",
    },
    {
      sender: 0,
      text: "You're welcome! They look great.",
      time: "Yesterday",
    },
  ],
};

const Team: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const [selectedId, setSelectedId] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedId, messages]);

  // Filter team members by search
  const filteredMembers = teamMembers.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle sending a message
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((prev) => ({
      ...prev,
      [selectedId]: [
        ...(prev[selectedId] || []),
        { sender: 0, text: input, time },
      ],
    }));
    setInput("");
  };

  const selectedMember = teamMembers.find((m) => m.id === selectedId);
  const chat = messages[selectedId] || [];

  return (
    <Layout onLogout={onLogout}>
      <div className="flex h-[70vh] bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Sidebar: Team list */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-2">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className={`flex items-center px-4 py-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 transition relative ${
                  selectedId === member.id ? "bg-blue-50 dark:bg-gray-700" : ""
                }`}
                onClick={() => setSelectedId(member.id)}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-3"
                  style={{
                    background: member.online
                      ? "linear-gradient(135deg,#f7971e,#ffd200)"
                      : "#bdbdbd",
                  }}
                >
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white truncate">
                      {member.name}
                    </span>
                    {member.online && (
                      <span className="ml-2 w-2 h-2 rounded-full bg-green-500 inline-block" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {member.lastMessage}
                  </div>
                </div>
                <div className="flex flex-col items-end ml-2">
                  <span className="text-xs text-gray-400 mb-1">
                    {member.lastTime}
                  </span>
                  {member.unread > 0 && (
                    <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                      {member.unread}
          </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-3"
              style={{
                background: selectedMember?.online
                  ? "linear-gradient(135deg,#f7971e,#ffd200)"
                  : "#bdbdbd",
              }}
            >
              {selectedMember?.avatar}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 dark:text-white">
                {selectedMember?.name}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                {selectedMember?.online ? "Online" : "Offline"}
              </div>
            </div>
            {/* Action icons: call, video, more */}
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <Phone className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <Video className="w-5 h-5" />
              </button>
              {/* Interactive 3-dot menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-40 dark:bg-gray-800 dark:border-gray-700"
                >
                  <DropdownMenuItem
                    onClick={() => alert("View Profile clicked!")}
                  >
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => alert("Clear Chat clicked!")}
                  >
                    Clear Chat
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => alert("Block User clicked!")}
                  >
                    Block User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* Chat messages and input centered vertically */}
          <div className="flex-1 flex flex-col justify-center px-6 py-4 bg-white dark:bg-gray-900">
            <div className="flex-1 flex flex-col justify-center">
              {chat.length === 0 ? (
                <div className="text-center text-gray-400 mt-10">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                chat.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex mb-4 ${
                      msg.sender === 0 ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-lg ${
                        msg.sender === 0 ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`inline-block px-4 py-2 rounded-lg text-sm ${
                          msg.sender === 0
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
      </div>
            {/* Message input */}
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4"
            >
              <input
                type="text"
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Team;
