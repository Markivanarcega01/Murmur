import { ConversationMessagesDataProps } from "./conversations.interface";
import { UsersDataProps } from "./users.interface";

export interface ParticipantConversationsDataProps {
  id: number;
  name: string;
  participants: UsersDataProps[];
  Messages: ConversationMessagesDataProps[];
}
