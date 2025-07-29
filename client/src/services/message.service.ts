import { useQuery } from "@tanstack/react-query";
import { ConversationMessagesDataProps } from "../interface/conversations.interface";
import { MESSAGE_QUERYKEY } from "../shared/const/message.querykey";
import { messagesApi } from "../api/messages.api";

const { getMessagesApi } = messagesApi();

export const messageService = () => {
  const getMessages = (conversationId: number) => {
    return useQuery<ConversationMessagesDataProps[]>({
      queryKey: [MESSAGE_QUERYKEY.messages, conversationId],
      queryFn: ({ queryKey }) => {
        const [, conversationId] = queryKey as [string, number];
        return getMessagesApi(conversationId);
      },
    });
  };
  return { getMessages };
};
