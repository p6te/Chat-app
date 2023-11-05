import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseAuthService from "../../firebaseAuthService";
import "./styles.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ensureError } from "../../utils/ensureError";
import Loading from "../Loading";

type Props = {
  setErrorMessage: (message: string) => void;
};
export default function Navbar({ setErrorMessage }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    try {
      setIsLoading(true);
      FirebaseAuthService.logoutUser();
      navigate("/login");
    } catch (err) {
      const error = ensureError(err);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  if (!currentUser?.photoURL) {
    return;
  }
  return (
    <>
      {isLoading && <Loading />}
      <div className="navbar">
        <h4>Wall chat</h4>
        <div className="user">
          <img src={currentUser?.photoURL} alt="" />
          <span>{currentUser?.displayName}</span>
          <button onClick={handleLogout}>logout</button>
        </div>
      </div>
    </>
  );
}
