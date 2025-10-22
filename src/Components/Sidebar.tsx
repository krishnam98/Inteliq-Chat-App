import { ArrowRightAlt, Search } from "@mui/icons-material";
import { useContext, useState } from "react";
import { chatTitles } from "../SampleChats";
import { ChatContextAPI } from "../Store/ChatContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const chatTitles = useContext(ChatContextAPI)?.chat || [];
  console.log(chatTitles);

  const tabs = [
    {
      name: "Home",
      icon: "chat-bubble.png",
      badge: "H",
    },
    {
      name: "Library",
      icon: "Library.png",
      badge: "T",
    },
    {
      name: "History",
      icon: "History.png",
      badge: "G",
    },
    {
      name: "Explore",
      icon: "Explore.png",
      badge: "L",
    },
  ];

  return (
    <div
      className={`flex flex-col h-full ${
        isCollapsed ? "w-[80px] px-1 items-center" : "w-[25%] px-4"
      } py-4 border-r border-gray-300 bg-[#F8F9FC]  overflow-y-scroll transition-all duration-300 relative`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="bg-[#E9EFFF] text-blue-600 rounded p-1 hover:bg-blue-100 transition-colors absolute top-4 right-0 rounded-tl-full rounded-bl-full"
      >
        {!isCollapsed ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
      </button>
      <div className="flex justify-between items-center mb-8">
        <div className="flex justify-start items-center">
          <img src="/Group 2.png" className="h-[30px] w-[30px] mr-1"></img>
          {!isCollapsed && <span className="text-xl font-bold">Inteliq</span>}
        </div>
      </div>

      <div
        className={` w-full flex justify-center items-center h-[40px] rounded-[15px]  ${
          !isCollapsed &&
          "px-4 py-2 justify-start bg-white border-1 border-gray-300"
        }  mb-4`}
      >
        <Search sx={{ color: "#989898" }} />
        {!isCollapsed && (
          <input
            type="text"
            placeholder="Search for Chats…"
            className="outline-none ml-[10px] placeholder:text-gray-400"
          ></input>
        )}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.name}
          className={`flex justify-between items-center  ${
            activeTab === tab.name
              ? ` ${
                  !isCollapsed &&
                  "bg-white px-4 border-1 py-2 border-gray-300 rounded-[15px] shadow-[0_0_5px_1px_rgba(0,0,0,0.1)]"
                }  `
              : "px-4 py-2"
          } h-[40px]  mb-2 cursor-pointer`}
          onClick={() => {
            setActiveTab(tab.name);
          }}
        >
          <div className="flex justify-start items-center">
            <img
              src={tab.icon}
              alt="chatIcon"
              className="h-[20px] w-[20px]"
            ></img>
            {!isCollapsed && (
              <span className="ml-2 font-bricolage text-[#515151]">
                {tab.name}
              </span>
            )}
          </div>
          {!isCollapsed && (
            <span className="bg-[#F3F3F3] text-[#515151] font-bricolage text-xs font-medium px-2 py-1 rounded">
              {" "}
              <b>⌘</b> {tab.badge}{" "}
            </span>
          )}
        </div>
      ))}

      {!isCollapsed && (
        <div className="mt-8 flex flex-col justify-start items-start height-full w-full px-4">
          <h2 className="font-semibold font-bricolage text-[#515151] mb-1">
            Recent Chats
          </h2>
          <div className="flex flex-col w-full">
            {chatTitles.map((chat) => (
              <div
                key={chat.title}
                className="flex justify-between items-center mb-1 group cursor-pointer transition-all duration-100 hover:bg-white hover:border hover:border-gray-300 px-2 py-1 rounded-md"
              >
                <span className="font-bricolage text-[#515151] text-xs overflow-hidden whitespace-nowrap text-ellipsis w-[80%] ">
                  {chat.title}
                </span>
                <img
                  src="IconBubble.png"
                  alt="options"
                  className="h-[20px] w-[20px] opacity-0 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
          <span className="font-bricolage text-xs font-semibold text-blue-500">
            View All
            <ArrowRightAlt />
          </span>
        </div>
      )}

      <div
        className={`bg-[linear-gradient(90deg,hsla(332,53%,82%,0.3)_0%,hsla(176,57%,89%,0.3)_100%)]  mt-6 flex ${
          isCollapsed ? "justify-center w-full" : "justify-between px-4"
        } items-center font-bricolage text-[#515151] border-1 border-gray-200 py-2 rounded-md`}
      >
        <div>
          <p className="text-sm font-normal">Try Pro!</p>
          {!isCollapsed && (
            <span className="text-xs">Upgarde For smarter Ai and more...</span>
          )}
        </div>
        {!isCollapsed && (
          <img src="rocket-launch.png" className="w-[20px] h-[20px]"></img>
        )}
      </div>

      <div
        className={`p-4 mt-2 flex ${
          isCollapsed
            ? "justify-center"
            : "justify-between bg-white border-1 border-gray-300 rounded-md"
        } items-center `}
      >
        <div className="flex justify-start items-center">
          <img
            src="profile.jpg"
            className={`${
              isCollapsed ? "h-[30px] w-[30px]" : "h-[20px] w-[20px]"
            } rounded-full mr-1`}
          ></img>
          {!isCollapsed && (
            <span className="font-semibold font-bricolage text-sm text-[#515151] ">
              Lawrence Cruz
            </span>
          )}
        </div>

        {!isCollapsed && (
          <img src="usermenu.png" className="h-[25px] w-[25px]"></img>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
