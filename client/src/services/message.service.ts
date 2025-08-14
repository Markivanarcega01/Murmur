import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ConversationMessagesDataProps } from "../interface/conversations.interface";
import { MESSAGE_QUERYKEY } from "../shared/const/message.querykey";
import { messagesApi } from "../api/messages.api";
import { GetMessagesProps } from "../interface/messages.interface";

const { getMessagesApi, createMessageApi } = messagesApi();

export const messageService = () => {
  const getMessages = (conversation: GetMessagesProps) => {
    return useQuery<ConversationMessagesDataProps[]>({
      queryKey: [MESSAGE_QUERYKEY.messages, conversation],
      queryFn: ({ queryKey }) => {
        const [, conversation] = queryKey as [string, GetMessagesProps];
        return getMessagesApi(conversation);
      },
    });
  };

  const createMessage = () =>{
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: [MESSAGE_QUERYKEY.createMessage],
      mutationFn: createMessageApi,
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:[MESSAGE_QUERYKEY.messages]})
      }
    })
  }
  return { getMessages, createMessage };
};
