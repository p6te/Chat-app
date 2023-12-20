import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import {
  CredentialsContainer,
  ImageContainer,
  NavbarContainer,
} from "./styled";
import SettingsIcon from "~/assets/SettingsIcon";
import { AuthContext } from "~/context/AuthContext";

type Props = {
  setErrorMessage: (message: string) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
export default function Navbar({ setErrorMessage, setIsLoading }: Props) {
  const { loggedUser } = useContext(AuthContext);
  useEffect(() => {
    if (!loggedUser || !loggedUser?.photoURL) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loggedUser, setIsLoading]);
  return (
    <NavbarContainer>
      <ImageContainer onClick={() => {}}>
        {loggedUser?.photoURL && <img src={loggedUser?.photoURL} alt="" />}
        <SettingsIcon size="24" />
      </ImageContainer>
      <CredentialsContainer>
        <h4>{loggedUser?.displayName}</h4>
        <span>{loggedUser?.email}</span>
      </CredentialsContainer>
    </NavbarContainer>
  );
}
