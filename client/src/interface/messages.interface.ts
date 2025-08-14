export interface MessageProps {
  id:string;
  senderId:string;
  conversationId:string;
  text: string;
  updatedAt:string;
  createdAt:string;
}

export interface CreateMessageProps{
  text:string;
  conversationId:string;
}

export interface GetMessagesProps{
  conversationId:string
}
