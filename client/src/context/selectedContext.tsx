import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
} from "react";
import { UsersDataProps } from "../interface/users.interface";
import { userService } from "../services/user.service";

type MyStateContextType = {
  selected: string;
  setSelected: React.Dispatch<SetStateAction<string>>;
  loggedUser: UsersDataProps;
};

const MyStateContext = createContext<MyStateContextType | undefined>(undefined);
const { getUser } = userService();

export const MyStateProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<string>("");
  const { data: loggedUser, isLoading } = getUser();
  //   const handleSelected = (conversationId: string) => {
  //     setSelected(conversationId);
  //   };
  if (isLoading || !loggedUser) {
    // You can show a loading screen or return null
    return <div>Loading...</div>;
  }

  return (
    <MyStateContext.Provider value={{ selected, setSelected, loggedUser }}>
      {children}
    </MyStateContext.Provider>
  );
};

// ✅ custom hook for convenience
export const useMyState = () => {
  const context = useContext(MyStateContext);
  if (!context) {
    throw new Error("useMyState must be used within a MyStateProvider");
  }
  return context;
};
