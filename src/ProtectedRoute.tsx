import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { ensureError } from "./utils/ensureError";
import { ChatContext } from "./context/ChatContext";
import { changeUser } from "./context/actionCreators";
import { Navigate } from "react-router-dom";
import Loading from "./components/common/LoadingSpinner";
import ErrorModal from "./components/common/ErrorModal";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { loggedUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function getCurrentUser() {
    await sleep(100);
    if (auth.currentUser) {
      return auth.currentUser;
    }
    await sleep(100);
    if (auth.currentUser) {
      return auth.currentUser;
    }
    await sleep(200);
    if (auth.currentUser) {
      return auth.currentUser;
    }
    await sleep(500);
    if (auth.currentUser) {
      return auth.currentUser;
    }
    await sleep(500);
    if (auth.currentUser) {
      return auth.currentUser;
    }
    return;
  }

  const turnOnOnlineStatus = async () => {
    setIsLoading(true);
    const loggedUser = await getCurrentUser();

    if (loggedUser) {
      try {
        setIsLoading(true);
        await setDoc(doc(db, "users", loggedUser.uid), {
          displayName: loggedUser.displayName,
          email: loggedUser.email,
          photoURL: loggedUser.photoURL,
          uid: loggedUser.uid,
          isOnline: true,
        });
      } catch (err) {
        const error = ensureError(err);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    turnOnOnlineStatus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (errorMessage) {
    return (
      <ErrorModal
        isOpen={!!errorMessage}
        onClose={() => {
          setErrorMessage("");
          window.location.reload();
        }}
      />
    );
  }
  if (!loggedUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
