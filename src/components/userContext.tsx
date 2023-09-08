// userContext.tsx
import { createContext, useContext, ReactNode, useState } from "react";

interface UserContextProps {
  userId: string | null;
  setUserId: (id: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userId, setUserIdState] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userId");
    }
    return null;
  });

  const setUserId = (id: string) => {
    localStorage.setItem("userId", id);
    setUserIdState(id);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
