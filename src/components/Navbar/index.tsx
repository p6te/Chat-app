import { useNavigate } from "react-router-dom";
import FirebaseAuthService from "../../firebaseAuthService";
import "./styles.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    FirebaseAuthService.logoutUser();
    navigate("/login");
  };
  if (!currentUser?.photoURL) {
    return;
  }
  return (
    <div className="navbar">
      <h4>Wall chat</h4>

      <div className="user">
        <img src={currentUser?.photoURL} alt="" />
        <span>{currentUser?.displayName}</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
}
