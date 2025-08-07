import { ParticipantConversationsDataProps } from "../../interface/conversation-participants.interface";

export function getConversationDisplayName(
  conversation: ParticipantConversationsDataProps,
  loggedUsername: string
): string {
  if (conversation.name != null && conversation.name.trim() !== "") {
    return conversation.name;
  }
  const otherParticipants = conversation.participants.filter(
    (user) => user.username !== loggedUsername
  );
  if (conversation.participants.length <= 2) {
    // One-on-one chat
    return otherParticipants
      .map((user) => `${user.firstname} ${user.lastname}`)
      .join("");
  } else {
    // Group chat
    return conversation.participants.map((user) => user.firstname).join(", ");
  }
}
