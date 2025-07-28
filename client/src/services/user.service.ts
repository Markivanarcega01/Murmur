import { useQuery } from "@tanstack/react-query";
import { UsersDataProps } from "../interface/users.interface";
import { USER_QUERYKEY } from "../shared/const/user.querykeys";
import { usersApi } from "../api/users.api";

const { getUsersApi } = usersApi();

export const userService = () => {
  const getUsers = () => {
    return useQuery<UsersDataProps[]>({
      queryKey: [USER_QUERYKEY.users],
      queryFn: getUsersApi,
    });
  };

  return { getUsers };
};
