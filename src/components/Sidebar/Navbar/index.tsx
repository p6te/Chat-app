import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import {
  ChatButton,
  CredentialsContainer,
  ImageContainer,
  NavbarContainer,
} from "./styled";
import SettingsIcon from "~/assets/SettingsIcon";
import { AuthContext } from "~/context/AuthContext";
import useIsMobile from "~/hooks/useIsMobile";
import ChatIcon from "~/assets/ChatIcon";

type Props = {
  setErrorMessage: (message: string) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};
export default function Navbar({
  setIsSettingsOpen,
  setIsLoading,
  setIsSidebarOpen,
}: Props) {
  const { loggedUser } = useContext(AuthContext);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!loggedUser?.photoURL) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loggedUser?.photoURL, setIsLoading]);
  return (
    <NavbarContainer>
      <ImageContainer
        onClick={() => {
          setIsSettingsOpen(true);
        }}
      >
        {loggedUser?.photoURL && <img src={loggedUser?.photoURL} alt="" />}
        <div>
          <SettingsIcon size="24" color="white" />
        </div>
      </ImageContainer>
      <CredentialsContainer>
        <h4>{loggedUser?.displayName}</h4>
        <span>{loggedUser?.email}</span>
      </CredentialsContainer>
      {isMobile && (
        <ChatButton onClick={() => setIsSidebarOpen(false)}>
          <ChatIcon />
        </ChatButton>
      )}
    </NavbarContainer>
  );
}
