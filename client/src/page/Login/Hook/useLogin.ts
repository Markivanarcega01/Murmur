import { useNavigate } from "react-router";
import { userService } from "../../../services/user.service";
import React from "react";

const { loginUser } = userService();

export const useLogin = () => {
  const navigate = useNavigate();

  const login = loginUser();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    login.mutate(
      {
        username: username,
        password: password,
      },
      {
        onSuccess: (data) => {
          sessionStorage.setItem("token", data.token);
          console.log("Login successful:", data);
          navigate("/");
        },
        onError: (error: any) => {
          console.log("Login failed", error);
        },
      }
    );
  };

  console.log(login);
  return {
    navigate,
    login,
    username,
    password,
    handleLogin,
    setUsername,
    setPassword,
  };
};
