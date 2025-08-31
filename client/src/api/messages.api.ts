import axios from "axios";
import {
  CreateMessageProps,
  GetMessagesProps,
} from "../interface/messages.interface";

export const messagesApi = () => {
  const getMessagesApi = async (conversationId: GetMessagesProps) => {
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

  const createMessageApi = async (message: CreateMessageProps) => {
    const token = sessionStorage.getItem("token");
    console.log(message.conversationId);
    const response = await axios.post(
      `http://127.0.0.1:3000/api/v1/create-message`,
      {
        text: message.text,
        conversationId: message.conversationId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  return { getMessagesApi, createMessageApi };
};
