import ChatBlockInformation from "../components/ChatBlockInformation";
import { useEffect, useMemo, useState } from "react";
import { userService } from "../services/user.service";
import { messageService } from "../services/message.service";
import { Navigate } from "react-router";
import { conversationParticipantsService } from "../services/conversation-participants.service";
import ChatRooms from "../components/ChatRooms";
import ChatRoomMessages from "../components/ChatRoomMessages";
import { GetMessagesProps } from "../interface/messages.interface";
import CreateChatRoom from "../components/CreateChatRoom";

const { getUser } = userService();
const { getMessages } = messageService();
const { getParticipantConversations } = conversationParticipantsService();

function Message() {
  const [selected, setSelected] = useState<GetMessagesProps>("");
  const [isCreateMessageOpen, setIsCreateMessageOpen] = useState(false);
  {
    /** Fetch User */
  }
  const { data: loggedUser, isLoading } = getUser();
  {
    /** Fetch Messages */
  }
  const { data: messages, isLoading: messageLoading } = getMessages(selected);

  {
    /** Fetch Participant Conversations */
  }
  const {
    data: participantConversations,
    isLoading: participantConversationsIsLoading,
    isError: participantConversationsIsError,
  } = getParticipantConversations();

  const participantConversationsSelectedValue = useMemo(() => {
    return participantConversations?.find(
      (conversation) => conversation.id === selected
    );
  }, [participantConversations, selected]);

  useEffect(() => {
    if (participantConversations && participantConversations.length) {
      setSelected(participantConversations[0].id);
    }
    if (participantConversationsIsError) {
      setIsCreateMessageOpen(true);
    }
  }, [participantConversations]);
  if (participantConversationsIsError) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="flex flex-row h-screen">
        {participantConversations && loggedUser ? (
          //Component 1
          <ChatRooms
            participantConversations={participantConversations}
            loggedUser={loggedUser}
            setSelected={setSelected}
            isCreateMessageOpen={setIsCreateMessageOpen}
          />
        ) : (
          //Create a skeleton component
          "Loading"
        )}

        {/* Component 2 */}
        {participantConversationsSelectedValue &&
        loggedUser &&
        messages &&
        !isCreateMessageOpen ? (
          <ChatRoomMessages
            participantConversationsSelectedValue={
              participantConversationsSelectedValue
            }
            loggedUser={loggedUser}
            messages={messages}
          />
        ) : isCreateMessageOpen ? (
          //Create a skeleton component
          <CreateChatRoom />
        ) : (
          "Loading middle skeleton"
        )}

        {/** Component 3*/}
        {participantConversationsSelectedValue &&
        loggedUser &&
        !isCreateMessageOpen ? (
          <div className="basis-1/4">
            <ChatBlockInformation
              chatRoomDetails={participantConversationsSelectedValue}
              loggedUser={loggedUser?.username}
            />
          </div>
        ) : (
          //Create a skeleton component
          ""
        )}
      </div>
    </>
  );
}

export default Message;
