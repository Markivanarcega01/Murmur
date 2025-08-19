import { UsersDataProps } from "./users.interface";

export interface ConversationDataProps {
  name: string;
}

export interface ConversationMessagesDataProps {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  updatedAt: string;
  createdAt: string;
  User: UsersDataProps;
  Conversation: ConversationDataProps;
}

export interface DirectConversationDataProps {
  userdAId: string;
  userBId: string;
}

export interface ResponseConversationDataProps {
  conversationId: string;
  createdAt: string;
  id: string;
  updatedAt: string;
  userId: string;
}
