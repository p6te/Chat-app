import "./styles.scss";
import UserComponent from "../User";
import { useState, KeyboardEvent, useContext } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { UserData } from "../../types";
import { AuthContext } from "../../context/AuthContext";
import { ensureError } from "../../utils/ensureError";
import Loading from "../Loading";

type Props = {
  setErrorMessage: (message: string) => void;
};

export default function Search({ setErrorMessage }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<UserData | null>(null);

  const { loggedUser } = useContext(AuthContext);

  //TODO add save user to context
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data() as UserData);
      });
    } catch (err) {
      const error = ensureError(err);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelectUser = async () => {
    //check whether the group(chats in firestore) exists, if not create
    if (!loggedUser || !user) {
      return;
    }
    const combinedId =
      loggedUser.uid > user.uid
        ? loggedUser.uid + user.uid
        : user.uid + loggedUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(res.exists());
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await setDoc(
          doc(db, "userChats", loggedUser.uid),
          {
            [combinedId]: {
              userId: user.uid,
              date: serverTimestamp(),
              lastMessage: "",
            },
          },
          { merge: true }
        );

        await setDoc(
          doc(db, "userChats", user.uid),
          {
            [combinedId]: {
              userId: loggedUser.uid,
              date: serverTimestamp(),
              lastMessage: "",
            },
          },
          { merge: true }
        );
      }
    } catch (err) {
      const error = ensureError(err);
      setErrorMessage(error.message);
    }

    setUser(null);
    setUsername("");
  };
  return (
    <>
      {isLoading && <Loading />}
      <div className="search">
        <div className="searchForm">
          <input
            type="text"
            placeholder="Find a user by nickname"
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKey}
            value={username}
          />
        </div>
        <div className="userChat" onClick={handleSelectUser}>
          {user && (
            <UserComponent
              imgSrc={user?.photoURL}
              name={user?.displayName}
              timestamp={0}
              isOnline={false}
              lastMessage=""
            />
          )}
        </div>
      </div>
    </>
  );
}
