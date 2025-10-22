import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChatProvider } from "./Store/ChatContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ChatProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ChatProvider>
);
