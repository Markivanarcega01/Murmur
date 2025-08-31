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
import { io, Socket } from "socket.io-client";

const { createMessage } = messageService();

export default function ChatRoomMessages({
  participantConversationsSelectedValue,
  loggedUser,
  messages: initialMessages,
}: {
  participantConversationsSelectedValue: ParticipantConversationsDataProps;
  loggedUser: UsersDataProps;
  messages: ConversationMessagesDataProps[];
}) {
  const socketRef = React.useRef<Socket | null>(null);
  const userMessage = createMessage();
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState(initialMessages);
  const roomId = String(participantConversationsSelectedValue.id);
  const listRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const url = import.meta.env.VITE_SOCKET_URL ?? "http://localhost:3000";
    const s = io(url, {
      // optional: transports: ["websocket"],
      // optional: auth: { token: yourToken },
    });
    socketRef.current = s;

    return () => {
      s.disconnect(); // removes all listeners too
      socketRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages, roomId]);

  React.useEffect(() => {
    if (!socketRef.current) return;

    const s = socketRef.current;
    s.emit("joinRoom", roomId);

    const onReceive = (data: {
      sender: string;
      message: string;
      createdAt?: string;
    }) => {
      console.log("emit", data);
      // Append incoming message to UI
      setMessages((prev) => [
        ...prev,
        {
          id: `temp-${Date.now()}`, // temp id for UI
          text: data.message,
          createdAt: data.createdAt ?? new Date().toISOString(),
          User: { username: data.sender, firstname: data.sender }, // adapt to your shape
        } as ConversationMessagesDataProps,
      ]);
    };

    s.on("receiveMessage", onReceive);

    // Cleanup: leave room listener to avoid duplicates next time
    return () => {
      s.off("receiveMessage", onReceive);
      // You can optionally leave the room:
      // s.emit("leaveRoom", roomId);
    };
  }, [roomId]);

  const handleMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const s = socketRef.current;
    if (!s || !message.trim()) return;

    userMessage.mutate(
      {
        text: message,
        conversationId: roomId,
      },
      {
        onError: (error: any) => {
          console.log("Create message failed", error);
        },
      }
    );

    // Optimistic UI update
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        text: message,
        createdAt: new Date().toISOString(),
        User: {
          username: loggedUser.username,
          firstname: loggedUser.firstname,
        },
      } as ConversationMessagesDataProps,
    ]);

    // Emit to room
    s.emit("sendMessage", {
      roomName: roomId,
      message,
      senderName: `${loggedUser.firstname}`,
    });

    setMessage("");
  };

  // Jump to bottom on first render
  React.useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  // Optional: keep sticking to bottom when new messages arrive
  React.useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    // Only auto-stick if user is already near the bottom
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    if (nearBottom) el.scrollTop = el.scrollHeight;
  }, [messages.length]); // or [messages]

  return (
    <div className="basis-3/4 border-x flex flex-col flex-1 min-h-0">
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
      <div ref={listRef} className="flex-1 min-h-0 px-2 overflow-auto">
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
}
