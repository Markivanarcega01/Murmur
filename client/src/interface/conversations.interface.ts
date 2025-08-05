import { UsersDataProps } from "./users.interface";

export interface ConversationDataProps {
  name: string;
}

export interface ConversationMessagesDataProps {
  id: number;
  conversationId: number;
  senderId: number;
  text: string;
  updatedAt: string;
  createdAt: string;
  User: UsersDataProps;
  Conversation: ConversationDataProps;
}
