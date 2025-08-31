import { useState, useMemo, useEffect } from "react";
import { conversationParticipantsService } from "../../../services/conversation-participants.service";
import { messageService } from "../../../services/message.service";
import { userService } from "../../../services/user.service";
import { useMyState } from "../../../context/selectedContext";

const { getUser } = userService();
const { getMessages } = messageService();
const { getParticipantConversations } = conversationParticipantsService();

export const useMessage = () => {
  const { selected, setSelected } = useMyState();
  //const [selected, setSelected] = useState<GetMessagesProps>("");
  const [isCreateMessageOpen, setIsCreateMessageOpen] = useState(false);
  {
    /** Fetch User */
  }
  const { data: loggedUser, isLoading } = getUser();
  {
    /** Fetch Messages */
  }
  const { data: messages, isLoading: messageLoading } = getMessages(selected);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

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
    if (!isFirstLoad) {
      return;
    }
    if (
      participantConversations &&
      participantConversations.length &&
      isFirstLoad
    ) {
      setSelected(participantConversations[0].id);
      setIsFirstLoad(false);
    }
    if (participantConversationsIsError) {
      setIsCreateMessageOpen(true);
    }
  }, [participantConversations, isFirstLoad]);

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
