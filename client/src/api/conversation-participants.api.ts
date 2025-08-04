import axios from "axios";

export const conversation_participantsApi = () => {
  const getParticipantConversationsApi = async () => {
    const token = sessionStorage.getItem("token");

    const response = await axios.get(
      `http://127.0.0.1:3000/api/v1/show-participant-conversations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("convo", response.data);
    return response.data;
  };
  return { getParticipantConversationsApi };
};
