import { ArrowRightAlt, Search } from "@mui/icons-material";
import { useContext, useState } from "react";
import { chatTitles } from "../SampleChats";
import { ChatContextAPI } from "../Store/ChatContext";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Home");
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
    <div className="flex flex-col h-full w-[25%] py-4 border-r border-gray-300 bg-[#F8F9FC] px-4 overflow-y-scroll">
      <div className="flex justify-start items-center mb-8">
        <img src="/Group 2.png" className="h-[30px] w-[30px] mr-1"></img>
        <span className="text-xl font-bold">Inteliq</span>
      </div>

      <div className="bg-white w-full flex justify-start items-center h-[40px] rounded-[15px] border-1 border-gray-300 px-4 py-2 mb-4">
        <Search sx={{ color: "#989898" }} />
        <input
          type="text"
          placeholder="Search for Chats…"
          className="outline-none ml-[10px] placeholder:text-gray-400"
        ></input>
      </div>
      {tabs.map((tab) => (
        <div
          className={`flex justify-between items-center px-4 ${
            activeTab === tab.name
              ? "bg-white border-1 py-2 border-gray-300 rounded-[15px] shadow-[0_0_5px_1px_rgba(0,0,0,0.1)]"
              : ""
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
            <span className="ml-2 font-bricolage text-[#515151]">
              {tab.name}
            </span>
          </div>
          <span className="bg-[#F3F3F3] text-[#515151] font-bricolage text-xs font-medium px-2 py-1 rounded">
            {" "}
            <b>⌘</b> {tab.badge}{" "}
          </span>
        </div>
      ))}

      <div className="mt-8 flex flex-col justify-start items-start height-full w-full px-4">
        <h2 className="font-semibold font-bricolage text-[#515151] mb-1">
          Recent Chats
        </h2>
        <div className="flex flex-col w-full">
          {chatTitles.map((chat) => (
            <div className="flex justify-between items-center mb-1 group cursor-pointer transition-all duration-100 hover:bg-white hover:border hover:border-gray-300 px-2 py-1 rounded-md">
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

      <div className="bg-[linear-gradient(90deg,hsla(332,53%,82%,0.3)_0%,hsla(176,57%,89%,0.3)_100%)] px-4 mt-6 flex justify-between items-center font-bricolage text-[#515151] border-1 border-gray-200 py-2 rounded-md">
        <div>
          <p className="text-sm font-bold">Try Pro!</p>
          <span className="text-xs">Upgarde For smarter Ai and more...</span>
        </div>
        <img src="rocket-launch.png" className="w-[20px] h-[20px]"></img>
      </div>

      <div className="bg-white p-4 mt-2 flex justify-between items-center border-1 border-gray-300 rounded-md">
        <div className="flex justify-start items-center">
          <img
            src="profile.jpg"
            className="h-[20px] w-[20px] rounded-full mr-1"
          ></img>
          <span className="font-semibold font-bricolage text-sm text-[#515151] ">
            Lawrence Cruz
          </span>
        </div>

        <img src="usermenu.png" className="h-[25px] w-[25px]"></img>
      </div>
    </div>
  );
};

export default Sidebar;
