import { MessageProps } from "./messages.interface";

export interface UsersDataProps {
  id: string;
  profile_picture: string;
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  createdAt: string;
  updatedAt: string;
  Messages: MessageProps[];
}

export interface UserLoginDataProps {
  username: string;
  password: string;
}
