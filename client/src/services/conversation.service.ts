import { useMutation, useQueryClient } from "@tanstack/react-query";
import { conversationApi } from "../api/conversation.api";
import { CONVERSATION_QUERYKEY } from "../shared/const/conversation.querykey";
import { CONVERSATION_PARTICIPANTS } from "../shared/const/conversation-participants.querykey";


const {createDirectConversationApi} = conversationApi()

export const conversationService = () =>{
    const createDirectConversation = ()=>{
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: [CONVERSATION_QUERYKEY.directConversation],
            mutationFn: createDirectConversationApi,
            onSuccess:()=>{
                queryClient.invalidateQueries({queryKey:[CONVERSATION_PARTICIPANTS.participantConversations]})
            }
        })
    }
    return {createDirectConversation}
}