import { auth } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

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

const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider);
};

const subscribeToAuthChanges = onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const FirebaseAuthService = {
  registerUser,
  loginUser,
  logoutUser,
  sendPasswordResetEmail,
  loginWithGoogle,
  subscribeToAuthChanges,
  resetPasswordViaEmail,
};

export default FirebaseAuthService;
