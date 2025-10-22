import {
  CirclePlus,
  CircleQuestionMark,
  MessageCircle,
  Share2,
} from "lucide-react";

interface HeaderProps {
  handleNewChat: () => void;
}

const Header = ({ handleNewChat }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <MessageCircle />
          <span className="font-medium text-gray-800">ChatGPT 4</span>
        </div>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Share2 />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <CircleQuestionMark />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <CirclePlus />
          <span className="font-medium" onClick={handleNewChat}>
            New Chat
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
