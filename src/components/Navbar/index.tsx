import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseAuthService from "../../firebaseAuthService";
import "./styles.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ensureError } from "../../utils/ensureError";
import Loading from "../Loading";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

type Props = {
  setErrorMessage: (message: string) => void;
};
export default function Navbar({ setErrorMessage }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      if (loggedUser) {
        await setDoc(
          doc(db, "users", loggedUser?.uid),
          {
            isOnline: false,
          },
          { merge: true }
        );
      }

      FirebaseAuthService.logoutUser();
      navigate("/login");
    } catch (err) {
      const error = ensureError(err);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  if (!loggedUser?.photoURL) {
    return;
  }
  return (
    <>
      {isLoading && <Loading />}
      <div className="navbar">
        <h4>Wall chat</h4>
        <div className="user">
          <img src={loggedUser?.photoURL} alt="" />
          <span>{loggedUser?.displayName}</span>
          <button onClick={handleLogout}>logout</button>
        </div>
      </div>
    </>
  );
}
