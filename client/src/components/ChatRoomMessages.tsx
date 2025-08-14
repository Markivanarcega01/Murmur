import { getConversationDisplayName } from "../shared/utils/getConversationDisplayName";
import UserChatInformation from "./UserChatInformation";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import InfoIcon from "@mui/icons-material/Info";
import ChatBlock from "./ChatBlock";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ImageIcon from "@mui/icons-material/Image";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import GifIcon from "@mui/icons-material/Gif";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { ParticipantConversationsDataProps } from "../interface/conversation-participants.interface";
import { UsersDataProps } from "../interface/users.interface";
import { ConversationMessagesDataProps } from "../interface/conversations.interface";
import React from "react";
import { messageService } from "../services/message.service";

const {createMessage} = messageService()

export default function ChatRoomMessages({
  participantConversationsSelectedValue,
  loggedUser,
  messages,
}: {
  participantConversationsSelectedValue: ParticipantConversationsDataProps;
  loggedUser: UsersDataProps;
  messages: ConversationMessagesDataProps[];
}) {
  const userMessage = createMessage()
  const [message, setMessage] = React.useState("")
  const handleMessage = (e:React.FormEvent) =>{
    e.preventDefault()

    userMessage.mutate({
      text:message,
      conversationId: participantConversationsSelectedValue.id
    },{
      onError: (error:any)=>{
        console.log("Create message failed", error)
      }
    })
  }
  return (
    <div className="basis-3/4 border-x flex flex-col">
      {/** Conversation Heading Section */}
      <div className="border-b flex justify-between items-center">
        <div className="w-fit">
          <UserChatInformation
            profile={
              participantConversationsSelectedValue.participants[0]
                .profile_picture
            }
            information={{
              name: getConversationDisplayName(
                participantConversationsSelectedValue,
                loggedUser?.username
              ),
              lastConvo: ``,
            }}
            isActive={false} // comes from the socket io, if the user is connected
          />
        </div>
        <div className="flex flex-row gap-x-5 mr-5">
          <button>
            <CallIcon color="primary" />
          </button>
          <button>
            <VideocamIcon color="primary" />
          </button>
          <button>
            <InfoIcon color="primary" />
          </button>
        </div>
      </div>
      {/** Conversation Content Section */}
      <div className="flex-1 overflow-auto px-2">
        <ChatBlock conversationMessages={messages} loggedUser={loggedUser} />
      </div>
      {/** Conversation Create Message Section */}
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
              onChange={(e)=>setMessage(e.target.value)}
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
}
