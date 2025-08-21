import ChatBlockInformation from "../../components/ChatBlockInformation";
import ChatRooms from "../../components/ChatRooms";
import ChatRoomMessages from "../../components/ChatRoomMessages";
import CreateChatRoom from "../../components/CreateChatRoom";
import { useMessage } from "./Hook/useMessage";

function Message() {
  const {
    participantConversations,
    loggedUser,
    setSelected,
    setIsCreateMessageOpen,
    participantConversationsSelectedValue,
    messages,
    isCreateMessageOpen,
  } = useMessage();
  return (
    <>
      <div className="flex flex-row h-dvh">
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
