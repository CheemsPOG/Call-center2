import React from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (s: string) => void;
  handleSend: (e: React.FormEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  handleSend,
}) => {
  return (
    <form
      onSubmit={handleSend}
      className="flex items-center border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-white dark:bg-gray-900"
    >
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 mr-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center gap-2"
        disabled={!input.trim()}
      >
        <Send className="w-4 h-4" />
        Send
      </button>
    </form>
  );
};

export default ChatInput;
