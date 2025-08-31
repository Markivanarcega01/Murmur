import { useQuery } from "@tanstack/react-query";
import { conversation_participantsApi } from "../api/conversation-participants.api";
import { CONVERSATION_PARTICIPANTS } from "../shared/const/conversation-participants.querykey";
import { ParticipantConversationsDataProps } from "../interface/conversation-participants.interface";

const { getParticipantConversationsApi } = conversation_participantsApi();

export const conversationParticipantsService = () => {
  const getParticipantConversations = () => {
    return useQuery<ParticipantConversationsDataProps[]>({
      queryKey: [CONVERSATION_PARTICIPANTS.participantConversations],
      queryFn: getParticipantConversationsApi,
    });
  };

  return { getParticipantConversations };
};
