import Loading from "~/components/common/LoadingSpinner";
import { FooterContainer, LogoutButton } from "./styled";
import FirebaseAuthService from "~/firebaseAuthService";
import { doc, setDoc } from "firebase/firestore";
import { db } from "~/firebaseConfig";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "~/context/AuthContext";
import { ensureError } from "~/utils/ensureError";
import { Button } from "~/components/common/Button/styled";
import LogoutIcon from "~/assets/logoutIcon";
import Spacer from "~/components/common/Spacer";

type Props = {
  setErrorMessage: (message: string) => void;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Footer({ setErrorMessage, setIsSearchOpen }: Props) {
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

      <FooterContainer>
        <div>
          <Button onClick={() => setIsSearchOpen(true)}>Add new chat</Button>
          <Spacer size="12" />
          <LogoutButton onClick={handleLogout}>
            <LogoutIcon />
            logout
          </LogoutButton>
        </div>
      </FooterContainer>
    </>
  );
}
