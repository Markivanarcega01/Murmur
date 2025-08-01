import { UserLoginDataProps } from "../interface/users.interface";
import axios from "axios";

export const usersApi = () => {
  const getUsersApi = async () => {
    const token = sessionStorage.getItem("token");

    const response = await axios.get("http://127.0.0.1:3000/api/v1/get-users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  };

  const loginUsersApi = async (credentials: UserLoginDataProps) => {
    // const response = await fetch("http://127.0.0.1:3000/auth/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: credentials.username,
    //     password: credentials.password,
    //   }),
    // });
    const response = await axios.post("http://127.0.0.1:3000/auth/login", {
      username: credentials.username,
      password: credentials.password,
    });

    return response.data;
  };

  return { getUsersApi, loginUsersApi };
};
