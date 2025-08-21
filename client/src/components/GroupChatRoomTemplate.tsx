import AddCircleIcon from "@mui/icons-material/AddCircle";
import ImageIcon from "@mui/icons-material/Image";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import GifIcon from "@mui/icons-material/Gif";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import React from "react";
import { messageService } from "../services/message.service";
import ChatBlock from "./ChatBlock";

const { createMessage } = messageService();

const GroupChatRoomTemplate = ({}: {}) => {
  const [message, setMessage] = React.useState("");
  const userMessage = createMessage();
  const handleMessage = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col flex-1 bg-violet-500 h-full">
      <div className="mt-10 self-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
        voluptates.
      </div>
      <div className="flex-1 overflow-auto px-2 bg-red-500">
        <ChatBlock />
      </div>
      <div className="p-2 flex flex-row gap-x-3 items-center">
        <button>
          <AddCircleIcon color="primary" />
        </button>
        <button>
          <ImageIcon color="primary" />
        </button>
        <button>
          <EmojiEmotionsIcon color="primary" />
        </button>
        <button>
          <GifIcon color="primary" />
        </button>
        <div className="relative flex-1">
          <button className="absolute inset-y-0 end-0 flex items-center pe-3 ">
            <EmojiEmotionsIcon color="primary" />
          </button>
          <form onSubmit={handleMessage}>
            <input
              className="block w-full h-8 px-4 pe-10 text-sm rounded-full bg-gray-200"
              placeholder="Search Messenger"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </form>
        </div>
        <button>
          <ThumbUpIcon color="primary" />
        </button>
      </div>
    </div>
  );
};

export default GroupChatRoomTemplate;
