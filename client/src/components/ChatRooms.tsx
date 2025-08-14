import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useState } from "react";
import UserChatInformation from "./UserChatInformation";
import { ParticipantConversationsDataProps } from "../interface/conversation-participants.interface";
import { UsersDataProps } from "../interface/users.interface";
import { getConversationDisplayName } from "../shared/utils/getConversationDisplayName";
import { GetMessagesProps } from "../interface/messages.interface";

export default function ChatRooms({
  participantConversations,
  loggedUser,
  setSelected,
}: {
  participantConversations: ParticipantConversationsDataProps[];
  loggedUser: UsersDataProps;
  setSelected: React.Dispatch<React.SetStateAction<GetMessagesProps>>;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop } = e.target as HTMLElement;
    setIsScrolled(scrollTop > 0);
  };
  return (
    <div className="basis-1/4 p-4 flex flex-col h-full ">
      <div className="flex flex-row h-fit space-x-3">
        <div className="text-2xl font-semibold basis-10/12 self-center">
          Chats
        </div>
        <button className="rounded-full p-1 bg-gray-200 w-9">
          <MoreHorizIcon />
        </button>
        <button className="rounded-full p-1 bg-gray-200 w-9">
          <CreateOutlinedIcon />
        </button>
      </div>

      <form className="max-w-md mt-4 mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full h-10 p-4 ps-10 text-sm rounded-full bg-gray-200"
            placeholder="Search Messenger"
            required
          />
        </div>
      </form>

      {/*Add is Selected for each users */}
      <div
        className={`flex-1 overflow-auto ${
          isScrolled ? "border-y border-slate-200" : ""
        }`}
        onScroll={handleScroll}
      >
        {participantConversations?.map(
          (data: ParticipantConversationsDataProps) => {
            let name = getConversationDisplayName(data, loggedUser.username);
            const lastConvo =
              data.Messages.length !== 0 ? data.Messages[0].text : "";
            return (
              <div
                onClick={(e) => {
                  setSelected({conversationId:data.id});
                }}
                key={data.id}
              >
                <UserChatInformation
                  profile={data.participants[0].profile_picture}
                  information={{
                    name: name,
                    lastConvo: lastConvo,
                  }}
                  isActive={true}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
