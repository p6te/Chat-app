import { createContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface AuthContextType {
  loggedUser: User | null;
  setLoggedUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  loggedUser: null,
  setLoggedUser: () => {},
});

type Props = {
  children: JSX.Element;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  useEffect(() => {
    if (loggedUser) {
      return;
    }
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedUser(user);
      }
    });

    return () => unsub();
  }, [loggedUser]);

  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </AuthContext.Provider>
  );
};
