import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { UsersDataProps } from "../interface/users.interface";
import { USER_QUERYKEY } from "../shared/const/user.querykeys";
import { usersApi } from "../api/users.api";
import { AxiosError } from "axios";

const { getUsersApi, loginUsersApi, getUserApi } = usersApi();

export const userService = () => {
  const getUsers = () => {
    return useQuery<UsersDataProps[], AxiosError<any>>({
      queryKey: [USER_QUERYKEY.users],
      queryFn: getUsersApi,
      refetchOnWindowFocus: false,
    });
  };

  const getUser = () => {
    return useQuery<UsersDataProps>({
      queryKey: [USER_QUERYKEY.user],
      queryFn: getUserApi,
    });
  };

  const loginUser = () => {
    return useMutation({
      mutationKey: [USER_QUERYKEY.login],
      mutationFn: loginUsersApi,
    });
  };

  return { getUsers, loginUser, getUser };
};
