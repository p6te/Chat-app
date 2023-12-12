import { createContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

interface AuthContextType {
  loggedUser: User | null;
  setLoggedUser: (user: User) => void;
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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setLoggedUser(user);
        const isLogin = async () => {
          await setDoc(
            doc(db, "users", user.uid),
            {
              isOnline: true,
            },
            { merge: true }
          );
        };
        isLogin();
      }
      setIsReady(true);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser }}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};
