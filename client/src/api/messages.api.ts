export const messagesApi = () => {
  const getMessagesApi = async (conversationId: number) => {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `http://127.0.0.1:3000/api/v1/show-messages/${conversationId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  };

  return { getMessagesApi };
};
