import axios, { AxiosResponse } from "axios";
import {
  DirectConversationDataProps,
  GroupConversationDataProps,
  ResponseGroupConversationDataProps,
} from "../interface/conversations.interface";

export const conversationApi = () => {
  const createDirectConversationApi = async (
    participants: DirectConversationDataProps
  ) => {
    const token = sessionStorage.getItem("token");

    const response = await axios.post(
      `http://127.0.0.1:3000/api/v1/create-direct-conversation`,
      {
        userAId: participants.userdAId,
        userBId: participants.userBId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("direct", response.data);
    return response.data;
  };
  const createGroupConversationApi = async (
    participants: GroupConversationDataProps
  ): Promise<ResponseGroupConversationDataProps[]> => {
    const token = sessionStorage.getItem("token");
    const mapUsers = participants.users.map((user) => user.id);
    const response = await axios.post(
      `http://127.0.0.1:3000/api/v1/create-conversation`,
      {
        users: mapUsers,
        type: participants.type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("group", response.data);
    return response.data;
  };

  return { createDirectConversationApi, createGroupConversationApi };
};
