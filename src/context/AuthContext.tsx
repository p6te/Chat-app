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
  const [context, setContext] = useState<AuthContextType>({
    currentUser: null,
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.warn(user);
      if (user) {
        setContext({ currentUser: user });
      }
      setIsReady(true);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={context}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};
