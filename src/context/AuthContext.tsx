import { createContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface AuthContextType {
  currentUser: User | null;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
});

type Props = {
  children: JSX.Element;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<AuthContextType>({
    currentUser: null,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({ currentUser: user });
      }
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
