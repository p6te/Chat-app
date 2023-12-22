import { createContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

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
  // const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      return;
    }
    const unsub = auth.onAuthStateChanged((user) => {
      console.log(user);
      console.log(user?.displayName);
      if (user) {
        setLoggedUser(user);
      }
    });

    return () => unsub();
  }, []);
  console.log(loggedUser);
  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </AuthContext.Provider>
  );
};
