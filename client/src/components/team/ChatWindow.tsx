import React, { RefObject } from "react";

interface Message {
  sender: number;
  text: string;
  time: string;
}

interface Member {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
}

interface ChatWindowProps {
  chat: Message[];
  selectedMember: Member | undefined;
  currentUser: Member;
  messagesEndRef: RefObject<HTMLDivElement>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  selectedMember,
  currentUser,
  messagesEndRef,
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 bg-white dark:bg-gray-900">
      {chat.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          No messages yet. Say hello!
        </div>
      ) : (
        chat.map((msg, idx) => {
          const isMe = msg.sender === currentUser.id;
          return (
            <div
              key={idx}
              className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm ${
                  isMe
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
                }`}
              >
                {msg.text}
                <div className="text-xs text-gray-300 mt-1 text-right">
                  {msg.time}
                </div>
              </div>
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
