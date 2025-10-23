import { useContext, useEffect, useRef, useState } from "react";
import Header from "../Components/Header";
import { Camera, Paperclip, Sparkles } from "lucide-react";
import { ChatContextAPI } from "../Store/ChatContext";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface SuggestedPrompt {
  text: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const addChat = useContext(ChatContextAPI)?.addChat;
  const chatTitles = useContext(ChatContextAPI)?.chat || [];

  const suggestedPrompts: SuggestedPrompt[] = [
    {
      text: "Give me a concise summary of this meeting transcript",
    },
    {
      text: "Write a product description for a minimalist smartwatch",
    },
    {
      text: "Provide a polite response to a customer asking for a refund",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateMockResponse = (userMessage: string): string => {
    const responses = [
      "I'd be happy to help you with that! Let me provide you with a comprehensive response based on your question.",
      "That's an interesting question. Here's what I can tell you about that topic.",
      "Great question! Let me break this down for you in a clear and helpful way.",
      "I understand what you're asking. Here's a detailed response that should address your needs.",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    return `${randomResponse}\n\nYou asked: "${userMessage}"\n\nThis is a mock response to demonstrate the chat functionality. In a real implementation, this would be replaced with actual AI-generated responses.`;
  };

  const handleSendMessage = async (costumInp?: string) => {
    const inputVal = costumInp || inputValue;
    if (!inputVal.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputVal,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (addChat) {
      addChat({ id: Number(userMessage.id), title: inputVal });
    }

    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateMockResponse(inputVal),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedPromptClick = (prompt: string) => {
    setInputValue(prompt);
    textareaRef.current?.focus();
    handleSendMessage(prompt);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen bg-white w-full font-bricolage">
      <Header handleNewChat={handleNewChat} />

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-8">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-start h-full max-w-3xl mx-auto pt-16 md:pt-0">
            <div className="mb-8 text-left w-full px-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                👋 Hi Laurence!
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-800">
                What do you want to learn today?
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-4xl px-2">
              {suggestedPrompts.slice(0, 2).map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedPromptClick(prompt.text)}
                  className="p-2 sm:p-4 md:w-[200px] bg-[linear-gradient(90deg,hsla(332,53%,82%,0.2)_0%,hsla(176,57%,89%,0.2)_100%)] hover:border hover:border-blue-600 rounded-2xl text-left transition-colors border border-gray-200 group"
                >
                  <div className="flex flex-col justify-between items-start gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white group-hover:bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform mb-8 sm:mb-16">
                      <span className="text-blue-600 group-hover:text-white">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                      </span>
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed pt-1">
                      {prompt.text}
                    </p>
                  </div>
                </button>
              ))}
              {/* Third prompt for medium screens and up */}
              <button
                onClick={() =>
                  handleSuggestedPromptClick(suggestedPrompts[2].text)
                }
                className="hidden md:block p-4 w-[200px] bg-[linear-gradient(90deg,hsla(332,53%,82%,0.2)_0%,hsla(176,57%,89%,0.2)_100%)] hover:border hover:border-blue-600 rounded-2xl text-left transition-colors border border-gray-200 group"
              >
                <div className="flex flex-col justify-between items-start gap-3">
                  <div className="w-10 h-10 bg-white group-hover:bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform mb-16">
                    <span className="text-blue-600 group-hover:text-white">
                      <Sparkles />
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed pt-1">
                    {suggestedPrompts[2].text}
                  </p>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 sm:gap-4 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "assistant" && (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-medium text-xs sm:text-sm">
                    AI
                  </div>
                )}
                <div
                  className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl max-w-[80%] ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-xs sm:text-sm md:text-base">
                    {message.content}
                  </p>
                </div>
                {message.type === "user" && (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-700 text-white rounded-full flex items-center justify-center flex-shrink-0 font-medium text-xs sm:text-sm">
                    L
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 sm:gap-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-medium text-xs sm:text-sm">
                  AI
                </div>
                <div className="px-3 py-2 sm:px-4 sm:py-3 rounded-2xl bg-gray-100">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 px-4 sm:px-6 py-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2 sm:gap-3 bg-gray-50 rounded-2xl p-2 sm:p-3 border border-gray-200 focus-within:border-blue-500 transition-colors">
            <button className="p-1 sm:p-1.5 text-gray-500 hover:text-gray-700 transition-colors bg-gray-200 rounded-full">
              <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="p-1 sm:p-1.5 text-gray-500 hover:text-gray-700 transition-colors bg-gray-200 rounded-full">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me a question..."
              className="flex-1 bg-transparent border-none outline-none resize-none text-gray-800 placeholder-gray-400 max-h-32 text-sm sm:text-base"
              rows={1}
              style={{ minHeight: "24px" }}
            />

            <div className="text-xs text-gray-400 self-center px-1 sm:px-2">
              {inputValue.length}/1000
            </div>

            <button
              onClick={() => {
                handleSendMessage();
              }}
              disabled={!inputValue.trim()}
              className={`p-1 sm:p-1.5 transition-colors ${
                inputValue.trim()
                  ? "text-blue-600 hover:text-blue-700"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
