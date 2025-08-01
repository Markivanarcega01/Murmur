import axios from "axios";

export const messagesApi = () => {
  const getMessagesApi = async (conversationId: number) => {
    const token = sessionStorage.getItem("token");

    const response = await axios.get(
      `http://127.0.0.1:3000/api/v1/show-messages/${conversationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  return { getMessagesApi };
};
