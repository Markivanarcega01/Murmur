import AccountBoxIcon from "@mui/icons-material/AccountBox";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import SearchIcon from "@mui/icons-material/Search";
import ChatBlockInformationButton from "./ChatBlockInformationButton";
import PushPinIcon from "@mui/icons-material/PushPin";
import { ReactNode } from "react";
import { ParticipantConversationsDataProps } from "../interface/conversation-participants.interface";
import { getConversationDisplayName } from "../shared/utils/getConversationDisplayName";

export interface ChatBlockInformationItemProps {
  name: string;
  list: {
    icon: ReactNode;
    item_name: string;
  }[];
}
function ChatBlockInformation({
  chatRoomDetails,
  loggedUser,
}: {
  chatRoomDetails: ParticipantConversationsDataProps;
  loggedUser: string;
}) {
  const chatBlockList: ChatBlockInformationItemProps[] = [
    {
      name: "Chat info",
      list: [
        {
          icon: <PushPinIcon />,
          item_name: "View pinned messages",
        },
      ],
    },
    {
      name: "Customize chat",
      list: [
        {
          icon: <PushPinIcon />,
          item_name: "Change theme",
        },
        {
          icon: <PushPinIcon />,
          item_name: "Change emoji",
        },
        {
          icon: <PushPinIcon />,
          item_name: "Edit nicknames",
        },
      ],
    },
    {
      name: "Media & files",
      list: [
        {
          icon: <PushPinIcon />,
          item_name: "Media",
        },
        {
          icon: <PushPinIcon />,
          item_name: "Files",
        },
      ],
    },
    {
      name: "Privacy & support",
      list: [
        {
          icon: <PushPinIcon />,
          item_name: "Mute notifications",
        },
        {
          icon: <PushPinIcon />,
          item_name: "Disappearing messages",
        },
        {
          icon: <PushPinIcon />,
          item_name: "Verify end-to-end encryption",
        },
        {
          icon: <PushPinIcon />,
          item_name: "Restrict",
        },
        {
          icon: <PushPinIcon />,
          item_name: "Block",
        },
        {
          icon: <PushPinIcon />,
          item_name: "Report",
        },
      ],
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center font-sans gap-y-5 p-4">
        <div className="flex flex-col items-center">
          <img
            src="/src/assets/image.png"
            alt=""
            className="size-14 rounded-full"
          />
          <p className="text-base font-normal">
            {getConversationDisplayName(chatRoomDetails, loggedUser)}
          </p>
          <p className="text-xs text-gray-500">Active now</p>
        </div>
        <div className="flex flex-row gap-x-7">
          <AccountBoxIcon />
          <NotificationsOffIcon />
          <SearchIcon />
        </div>
        <div className="w-full">
          {chatBlockList.map((item, index) => (
            <ChatBlockInformationButton key={item.name} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ChatBlockInformation;
