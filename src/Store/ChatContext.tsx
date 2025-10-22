import { createContext, useReducer, type ReactNode } from "react";
import { chatTitles, type ChatTitles } from "../SampleChats";

interface ChatContext {
  chat: ChatTitles[];
  addChat: (chat: ChatTitles) => void;
}

type Action = {
  type: "ADD_CHAT";
  payload: ChatTitles;
};

const chatReducer = (state: ChatTitles[], action: Action): ChatTitles[] => {
  if (action.type === "ADD_CHAT") {
    return [action.payload, ...state];
  }
  return state;
};

export const ChatContextAPI = createContext<ChatContext | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, dispatch] = useReducer(chatReducer, chatTitles);

  const addChat = (chat: ChatTitles) => {
    dispatch({ type: "ADD_CHAT", payload: chat });
  };

  return (
    <ChatContextAPI.Provider value={{ chat: chats, addChat }}>
      {" "}
      {children}
    </ChatContextAPI.Provider>
  );
};
