import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseAuthService from "../../../firebaseAuthService";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ensureError } from "../../../utils/ensureError";
import Loading from "../../common/LoadingSpinner";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import {
  CredentialsContainer,
  ImageContainer,
  NavbarContainer,
} from "./styled";
import SettingsIcon from "~/assets/SettingsIcon";

type Props = {
  setErrorMessage: (message: string) => void;
};
export default function Navbar({ setErrorMessage }: Props) {
  const { loggedUser } = useContext(AuthContext);

  return (
    <NavbarContainer>
      <ImageContainer onClick={() => {}}>
        {loggedUser?.photoURL && <img src={loggedUser?.photoURL} alt="" />}
        <SettingsIcon size="24" />
      </ImageContainer>
      <CredentialsContainer>
        {/* <h4>{loggedUser?.displayName}</h4> */}
        <h4>UserName</h4>
        <span>{loggedUser?.email}</span>
      </CredentialsContainer>
      {/* <span>dodac ikone zebaki przy zdjeciu użytkownika</span>/ */}
    </NavbarContainer>
  );
}
