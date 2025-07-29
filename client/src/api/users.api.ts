import { UserLoginDataProps } from "../interface/users.interface";

export const usersApi = () => {
  const getUsersApi = async () => {
    const token = sessionStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:3000/api/v1/get-users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "applicaiton/json",
      },
    });

    return response.json();
  };

  const loginUsersApi = async (credentials: UserLoginDataProps) => {
    const response = await fetch("http://127.0.0.1:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });

    return response.json();
  };

  return { getUsersApi, loginUsersApi };
};
