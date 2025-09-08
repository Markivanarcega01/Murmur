import {
  UserLoginDataProps,
  UserRegistrationDataProps,
} from "../interface/users.interface";
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

  const getUserApi = async () => {
    const token = sessionStorage.getItem("token");

    const response = await axios.get("http://127.0.0.1:3000/api/v1/get-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const loginUserApi = async (credentials: UserLoginDataProps) => {
    const response = await axios.post("http://127.0.0.1:3000/auth/login", {
      username: credentials.username,
      password: credentials.password,
    });

    return response.data;
  };

  const registerUserApi = async (credentials: UserRegistrationDataProps) => {
    const response = await axios.post("http://127.0.0.1:3000/auth/register", {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      firstname: credentials.firstname,
      lastname: credentials.lastname,
      gender: credentials.gender,
      birthday: credentials.birthday,
    });
    return response.data;
  };

  return { getUsersApi, loginUserApi, registerUserApi, getUserApi };
};
