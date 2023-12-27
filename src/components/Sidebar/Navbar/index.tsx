import { Dispatch, SetStateAction, useContext } from "react";
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
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
};
export default function Navbar({ setIsSettingsOpen }: Props) {
  const { loggedUser } = useContext(AuthContext);

  // useEffect(() => {
  //   if (!loggedUser) {
  //     setIsLoading(true);
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [loggedUser, setIsLoading]);
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
    </NavbarContainer>
  );
}
