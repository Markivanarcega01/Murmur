import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
} from "react";

type MyStateContextType = {
  selected: string;
  setSelected: React.Dispatch<SetStateAction<string>>;
};

const MyStateContext = createContext<MyStateContextType | undefined>(undefined);

export const MyStateProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<string>("");
  //   const handleSelected = (conversationId: string) => {
  //     setSelected(conversationId);
  //   };

  return (
    <MyStateContext.Provider value={{ selected, setSelected }}>
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
