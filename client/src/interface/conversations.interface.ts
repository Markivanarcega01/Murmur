import { UsersDataProps } from "./users.interface";

export interface ConversationMessagesDataProps {
  id: number;
  conversationId: number;
  senderId: number;
  text: string;
  updatedAt: string;
  createdAt: string;
  User: UsersDataProps;
}
