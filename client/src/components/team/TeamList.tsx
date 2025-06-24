import React from "react";
import { Search } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  lastTime: string;
  unread: number;
}

interface TeamListProps {
  teamMembers: TeamMember[];
  selectedId: number;
  setSelectedId: (id: number) => void;
  search: string;
  setSearch: (s: string) => void;
}

const TeamList: React.FC<TeamListProps> = ({
  teamMembers,
  selectedId,
  setSelectedId,
  search,
  setSearch,
}) => {
  // Filter team members by search
  const filteredMembers = teamMembers.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
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
  );
};

export default TeamList;
