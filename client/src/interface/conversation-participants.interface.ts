import { ConversationMessagesDataProps } from "./conversations.interface";
import { UsersDataProps } from "./users.interface";

export interface ParticipantConversationsDataProps {
  id: string;
  name: string;
  participants: UsersDataProps[];
  Messages: ConversationMessagesDataProps[];
}
