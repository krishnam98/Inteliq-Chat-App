import Sidebar from "../Components/Sidebar";
import ChatPage from "./ChatPage";

const MainContent = () => {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <ChatPage />
    </div>
  );
};

export default MainContent;
