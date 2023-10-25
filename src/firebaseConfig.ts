import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

console.log(import.meta.env.REACT_APP_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASURMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
