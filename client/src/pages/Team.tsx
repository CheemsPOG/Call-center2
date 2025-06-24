import React, { useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout";
import TeamList from "@/components/team/TeamList";
import ChatWindow from "@/components/team/ChatWindow";
import ChatInput from "@/components/team/ChatInput";
import {
  teamMembers,
  currentUser,
  initialMessages,
} from "@/components/team/mockTeamData";
import { Phone, Video, MoreVertical, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

const Team: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const [selectedId, setSelectedId] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [showMemberSelect, setShowMemberSelect] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedId, messages]);

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
        {/* Sidebar: Team list (desktop only) */}
        {!isMobile && (
          <TeamList
            teamMembers={teamMembers}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            search={search}
            setSearch={setSearch}
          />
        )}
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
            {/* Mobile: Member select icon */}
            {isMobile && (
              <button
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 mr-2"
                onClick={() => setShowMemberSelect(true)}
                aria-label="Change chat member"
              >
                <Users className="w-6 h-6" />
              </button>
            )}
            {/* Action icons: call, video, more */}
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <Phone className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <Video className="w-5 h-5" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    // Clear chat for the selected member
                    onClick={() => {
                      setMessages((prev) => ({
                        ...prev,
                        [selectedId]: [],
                      }));
                    }}
                  >
                    Clear Chat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* Mobile: Member select modal */}
          {isMobile && showMemberSelect && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 w-11/12 max-w-xs">
                <div className="font-semibold text-lg mb-4 text-center dark:text-white">
                  Select a team member
                </div>
                <div className="space-y-2">
                  {teamMembers.map((member) => (
                    <button
                      key={member.id}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg border transition-colors ${
                        selectedId === member.id
                          ? "bg-blue-100 dark:bg-blue-900 border-blue-400 dark:border-blue-700"
                          : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      }`}
                      onClick={() => {
                        setSelectedId(member.id);
                        setShowMemberSelect(false);
                      }}
                    >
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                        style={{
                          background: member.online
                            ? "linear-gradient(135deg,#f7971e,#ffd200)"
                            : "#bdbdbd",
                        }}
                      >
                        {member.avatar}
                      </span>
                      <span className="flex-1 text-left text-gray-900 dark:text-white">
                        {member.name}
                      </span>
                      {member.online && (
                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                      )}
                    </button>
                  ))}
                </div>
                <button
                  className="mt-4 w-full py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium"
                  onClick={() => setShowMemberSelect(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {/* Chat window */}
          <ChatWindow
            chat={chat}
            selectedMember={
              selectedMember
                ? {
                    ...selectedMember,
                    online:
                      typeof selectedMember.online === "boolean"
                        ? selectedMember.online
                        : false,
                  }
                : { id: 0, name: "", avatar: "", online: false }
            }
            currentUser={currentUser}
            messagesEndRef={messagesEndRef}
          />
          {/* Chat input */}
          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Team;
