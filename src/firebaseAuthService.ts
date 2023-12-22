import { auth } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { ensureError } from "./utils/ensureError";

const registerUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
  return signOut(auth);
};

const resetPasswordViaEmail = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (err) {
    const error = ensureError(err);
    console.log(error);
  }
};

const FirebaseAuthService = {
  registerUser,
  loginUser,
  logoutUser,
  sendPasswordResetEmail,
  loginWithGoogle,
  resetPasswordViaEmail,
};

export default FirebaseAuthService;
