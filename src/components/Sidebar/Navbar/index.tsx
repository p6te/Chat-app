import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseAuthService from "../../../firebaseAuthService";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ensureError } from "../../../utils/ensureError";
import Loading from "../../common/LoadingSpinner";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { NavbarContainer } from "./styled";

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

      <NavbarContainer>
        <img src={loggedUser?.photoURL} alt="" />
        {/* <span>{loggedUser?.displayName}</span> */}
        <span>User Name</span>
      </NavbarContainer>
    </>
  );
}
