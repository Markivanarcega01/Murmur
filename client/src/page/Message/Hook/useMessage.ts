import { useState, useMemo, useEffect } from "react";
import { GetMessagesProps } from "../../../interface/messages.interface";
import { conversationParticipantsService } from "../../../services/conversation-participants.service";
import { messageService } from "../../../services/message.service";
import { userService } from "../../../services/user.service";
import { Navigate } from "react-router";

const { getUser } = userService();
const { getMessages } = messageService();
const { getParticipantConversations } = conversationParticipantsService();

export const useMessage = () => {
  const [selected, setSelected] = useState<GetMessagesProps>("");
  const [isCreateMessageOpen, setIsCreateMessageOpen] = useState(false);
  {
    /** Fetch User */
  }
  const { data: loggedUser, isLoading } = getUser();
  {
    /** Fetch Messages */
  }
  const { data: messages, isLoading: messageLoading } = getMessages(selected);

  {
    /** Fetch Participant Conversations */
  }
  const {
    data: participantConversations,
    isLoading: participantConversationsIsLoading,
    isError: participantConversationsIsError,
  } = getParticipantConversations();

  const participantConversationsSelectedValue = useMemo(() => {
    return participantConversations?.find(
      (conversation) => conversation.id === selected
    );
  }, [participantConversations, selected]);

  useEffect(() => {
    if (participantConversations && participantConversations.length) {
      setSelected(participantConversations[0].id);
    }
    if (participantConversationsIsError) {
      setIsCreateMessageOpen(true);
    }
  }, [participantConversations]);

  return {
    loggedUser,
    isLoading,
    messages,
    messageLoading,
    participantConversations,
    participantConversationsIsError,
    participantConversationsSelectedValue,
    setSelected,
    setIsCreateMessageOpen,
    isCreateMessageOpen,
  };
};
