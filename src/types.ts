import { Timestamp } from "firebase/firestore";

export type UserData = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};
export type UserForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type MessageType = {
  id: string;
  text: string;
  senderId?: string;
  date: Timestamp;
  img: string;
};
