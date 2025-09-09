import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useRef, useState } from "react";
import UserChatInformation from "./UserChatInformation";
import { ParticipantConversationsDataProps } from "../interface/conversation-participants.interface";
import { UsersDataProps } from "../interface/users.interface";
import { getConversationDisplayName } from "../shared/utils/getConversationDisplayName";
import { GetMessagesProps } from "../interface/messages.interface";
import { userService } from "../services/user.service";
import { conversationService } from "../services/conversation.service";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useClickOutside } from "../shared/utils/useClickOutside";
import { useNavigate } from "react-router";

const { getUsers } = userService();
const { createDirectConversation } = conversationService();

export default function ChatRooms({
  participantConversations,
  loggedUser,
  setSelected,
  isCreateMessageOpen,
}: {
  participantConversations: ParticipantConversationsDataProps[];
  loggedUser: UsersDataProps;
  setSelected: React.Dispatch<React.SetStateAction<GetMessagesProps>>;
  isCreateMessageOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { data: users, isLoading: isUsersLoading } = getUsers();
  const directConversation = createDirectConversation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop } = e.target as HTMLElement;
    setIsScrolled(scrollTop > 0);
  };
  const handleDirectConversation = (
    userSenderId: string,
    userReceiverId: string
  ) => {
    directConversation.mutate({
      userdAId: userSenderId,
      userBId: userReceiverId,
    });
  };

  const settingsBtnRef = useRef<HTMLButtonElement>(null);
  const settingsMenuRef = useRef<HTMLDivElement>(null);
  const searchAreaRef = useRef<HTMLDivElement>(null);

  useClickOutside(settingsMenuRef, () => setIsSettingsOpen(false), [
    settingsBtnRef,
  ]);
  useClickOutside(searchAreaRef, () => setIsFocused(false));

  return (
    <div className="basis-1/4 p-4 flex flex-col h-full">
      <div className="flex flex-row h-fit space-x-3 relative">
        <div className="text-2xl font-semibold basis-10/12 self-center">
          Chats
        </div>
        <button
          ref={settingsBtnRef}
          className="rounded-full p-1 bg-gray-200 w-9"
          onClick={(e) => setIsSettingsOpen(!isSettingsOpen)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsSettingsOpen(false);
          }}
        >
          <MoreHorizIcon />
        </button>
        <button
          className="rounded-full p-1 bg-gray-200 w-9"
          onClick={(e) => isCreateMessageOpen(true)}
        >
          <CreateOutlinedIcon />
        </button>
        {isSettingsOpen ? (
          <div
            ref={settingsMenuRef}
            className="absolute right-0 top-full z-50 w-30 rounded-xl border border-slate-200 bg-white shadow-md"
          >
            <button
              className="w-full text-left px-4 py-2 hover:bg-slate-100"
              onClick={(e) => {
                console.log("logout");
                sessionStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div ref={searchAreaRef}>
        <form className="max-w-md mt-4 mb-4 flex flex-row">
          {isFocused ? (
            <button
              className="w-11"
              onClick={(e) => {
                e.preventDefault();
                setIsFocused(false);
              }}
            >
              <ArrowBackIcon />
            </button>
          ) : (
            ""
          )}
          <div className="relative w-full">
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
              onClick={() => setIsFocused(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsFocused(false);
              }}
              // onBlur={()=> setIsFocused(false)}
              required
            />
          </div>
        </form>
      </div>

      {/*Drop down menu if search field is clicked */}
      <div
        className={`flex-1 overflow-auto ${
          isScrolled ? "border-y border-slate-200" : ""
        }`}
        onScroll={handleScroll}
      >
        {!isFocused && participantConversations
          ? participantConversations?.map(
              (data: ParticipantConversationsDataProps) => {
                let name = getConversationDisplayName(
                  data,
                  loggedUser.username
                );
                const lastConvo =
                  data.Messages.length !== 0 ? data.Messages[0].text : "";
                return (
                  <div
                    onClick={(e) => {
                      setSelected(data.id);
                      isCreateMessageOpen(false);
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
            )
          : users?.map((user) => {
              return (
                <div
                  key={user.id}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("convossdsa", loggedUser.id, user.id);
                    handleDirectConversation(loggedUser.id, user.id);
                    setIsFocused(false);
                    if (participantConversations) {
                      participantConversations.map((convo) => {
                        const participantsIds = convo.participants.map(
                          (participants) => participants.id
                        );
                        if (
                          participantsIds.includes(loggedUser.id) &&
                          participantsIds.includes(user.id)
                        ) {
                          setSelected(convo.id);
                        }
                      });
                    }
                  }}
                >
                  <UserChatInformation
                    profile={user.profile_picture}
                    information={{
                      name: `${user.firstname} ${user.lastname}`,
                    }}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
}
