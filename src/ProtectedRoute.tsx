import { PropsWithChildren, useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { ensureError } from "./utils/ensureError";
import { Navigate } from "react-router-dom";
import { ChatContext } from "./context/ChatContext";
import { changeUser } from "./context/actionCreators";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { loggedUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const turnOnOnlineStatus = async () => {
    if (!loggedUser) {
      return null;
    }

    try {
      await setDoc(doc(db, "users", loggedUser.uid), {
        displayName: loggedUser.displayName,
        email: loggedUser.email,
        photoURL: loggedUser.photoURL,
        uid: loggedUser.uid,
        isOnline: true,
      });
    } catch (err) {
      const error = ensureError(err);
      // TODO Send to error page
      alert(error.message);
    }
  };

  const turnOffOnlineStatus = async () => {
    if (!loggedUser) {
      return;
    }

    try {
      await setDoc(doc(db, "users", loggedUser.uid), {
        displayName: loggedUser.displayName,
        email: loggedUser.email,
        photoURL: loggedUser.photoURL,
        uid: loggedUser.uid,
        isOnline: false,
      });
    } catch (err) {
      const error = ensureError(err);
      // TODO Send to error page
      alert(error.message);
    }
  };

  useEffect(() => {
    const handleTabClose = (event: Event) => {
      event.preventDefault();
      turnOffOnlineStatus();
      dispatch(
        changeUser({ displayName: "", isOnline: false, uid: "", photoURL: "" })
      );
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  useEffect(() => {
    turnOnOnlineStatus();
  }, []);

  if (!loggedUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
