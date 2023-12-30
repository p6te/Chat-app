import { FooterContainer, LogoutButton } from "./styled";
import FirebaseAuthService from "~/firebaseAuthService";
import { doc, setDoc } from "firebase/firestore";
import { db } from "~/firebaseConfig";
import { Dispatch, SetStateAction, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "~/context/AuthContext";
import { ensureError } from "~/utils/ensureError";
import { Button } from "~/components/common/Button/styled";
import LogoutIcon from "~/assets/logoutIcon";
import Spacer from "~/components/common/Spacer";
import { ChatContext } from "~/context/ChatContext";
import { changeUser } from "~/context/actionCreators";

type Props = {
  setErrorMessage: (message: string) => void;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export default function Footer({
  setErrorMessage,
  setIsSearchOpen,
  setIsLoading,
}: Props) {
  const navigate = useNavigate();
  const { loggedUser, setLoggedUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      if (loggedUser) {
        await setDoc(
          doc(db, "users", loggedUser.uid),
          {
            isOnline: false,
          },
          { merge: true }
        );
      }

      FirebaseAuthService.logoutUser();
      setLoggedUser(null);
      dispatch(
        changeUser({ displayName: "", isOnline: false, uid: "", photoURL: "" })
      );
      navigate("/login");
    } catch (err) {
      const error = ensureError(err);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
