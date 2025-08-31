import React, { SetStateAction } from "react";
import { userService } from "../services/user.service";
import UserChatInformation from "./UserChatInformation";
import { UsersDataProps } from "../interface/users.interface";
import ChatRoomMessages from "./ChatRoomMessages";
import { useMessage } from "../page/Message/Hook/useMessage";
import { conversationService } from "../services/conversation.service";
import { ParticipantConversationsDataProps } from "../interface/conversation-participants.interface";
import { ResponseConversationDataProps } from "../interface/conversations.interface";
import GroupChatRoomTemplate from "./GroupChatRoomTemplate";
import { useMyState } from "../context/selectedContext";

const { getUsers } = userService();
const { createDirectConversation } = conversationService();

export default function CreateChatRoom({
  isCreateMessageOpen,
}: {
  isCreateMessageOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { data: users, isLoading: isUsersLoading } = getUsers();

  const [isFocused, setIsFocused] = React.useState(false);
  const [userSearch, setUserSearch] = React.useState("");
  const directConversation = createDirectConversation();
  const [selectedUsers, setSelectedUsers] = React.useState<UsersDataProps[]>(
    []
  );

  // Filter users → exclude already selected
  const filteredUsers = users?.filter(
    (u) =>
      `${u.firstname} ${u.lastname}`
        .toLowerCase()
        .includes(userSearch.toLowerCase()) &&
      !selectedUsers.some((sel) => sel.id === u.id)
  );

  const handleAddUser = (user: UsersDataProps) => {
    setSelectedUsers((prev) => [...prev, user]);
    setUserSearch(""); // reset search
    setIsFocused(true); // keep searching for more
  };

  const handleRemoveUser = (id: string) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // const findSelectedUserConversationRoomWithTheLoggedUser = ()=>{

  // }

  const {
    loggedUser,
    participantConversationsSelectedValue,
    messages,
    participantConversations,
  } = useMessage();

  const { setSelected } = useMyState();

  const handleDirectConversation = (
    userSenderId: string,
    userReceiverId: string
  ) => {
    directConversation.mutate(
      {
        userdAId: userSenderId,
        userBId: userReceiverId,
      },
      {
        onSuccess: (newConvo: ResponseConversationDataProps[]) => {
          console.log("new", newConvo);
          //alert(newConvo);
          setSelected(newConvo[0].conversationId); // ✅ Select new conversation immediately
        },
      }
    );
  };

  return (
    <div className="w-full h-full flex flex-col min-h-0">
      {/* Input with chips */}
      <div
        className={`relative w-full flex flex-col ${
          selectedUsers.length == 1 ? "" : "h-full"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2 border rounded-full px-3 py-1 bg-gray-200">
          {selectedUsers.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center gap-1 bg-gray-300 px-2 py-1 rounded-full text-sm"
            >
              {user.firstname} {user.lastname}
              <button
                className="ml-1 text-gray-600 hover:text-red-500"
                onClick={() => {
                  handleRemoveUser(user.id);
                  if (!participantConversations || !loggedUser) return;
                  const existingConversation = participantConversations.find(
                    (convo) => {
                      const participantsIds = convo.participants.map(
                        (participants) => participants.id
                      );
                      return (
                        participantsIds.includes(loggedUser.id) &&
                        participantsIds.includes(
                          selectedUsers[index === 0 ? 1 : 0].id
                        ) &&
                        convo.type == "direct"
                      );
                    }
                  );
                  if (existingConversation) {
                    setSelected(existingConversation.id);
                  } else {
                    setSelected("");
                    // handleDirectConversation(loggedUser.id, user.id);
                  }
                }}
              >
                ✕
              </button>
            </div>
          ))}

          <input
            type="search"
            id="default-search"
            className="flex-1 bg-transparent outline-none text-sm h-8"
            placeholder={selectedUsers.length === 0 ? "To:" : ""}
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
        </div>

        {/* Dropdown list (absolute inside relative container) */}
        {isFocused && loggedUser && userSearch ? (
          <div className="absolute left-0 right-0 top-10 bg-white border rounded shadow mt-1 max-h-60 overflow-y-auto z-10">
            {filteredUsers?.map((user) => (
              <div
                key={user.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleAddUser(user);
                  if (!participantConversations) return;
                  const existingConversation = participantConversations.find(
                    (convo) => {
                      const participantsIds = convo.participants.map(
                        (participants) => participants.id
                      );
                      return (
                        participantsIds.includes(loggedUser.id) &&
                        participantsIds.includes(user.id) &&
                        convo.type == "direct"
                      );
                    }
                  );
                  if (existingConversation) {
                    setSelected(existingConversation.id);
                  } else {
                    setSelected("");
                    handleDirectConversation(loggedUser.id, user.id);
                  }
                }}
                className="cursor-pointer hover:bg-gray-100"
              >
                <UserChatInformation
                  profile={user.profile_picture}
                  information={{
                    name: `${user.firstname} ${user.lastname}`,
                  }}
                />
              </div>
            ))}

            {filteredUsers?.length === 0 && (
              <div className="p-2 text-gray-500 text-sm">No users found</div>
            )}
          </div>
        ) : selectedUsers.length > 1 && loggedUser ? (
          <div className="flex-1">
            <GroupChatRoomTemplate
              selectedUsers={[...selectedUsers, loggedUser]}
              isCreateMessageOpen={isCreateMessageOpen}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Messages Section */}
      {selectedUsers.length == 1 &&
      participantConversationsSelectedValue &&
      loggedUser &&
      messages ? (
        <ChatRoomMessages
          participantConversationsSelectedValue={
            participantConversationsSelectedValue
          }
          loggedUser={loggedUser}
          messages={messages}
        />
      ) : null}
    </div>
  );
}
