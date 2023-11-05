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
  updateDoc,
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

  const { currentUser } = useContext(AuthContext);

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
    if (!currentUser || !user) {
      return;
    }
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
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
            placeholder="Find a user"
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKey}
            value={username}
          />
        </div>
        <div className="userChat">
          {user && (
            <UserComponent
              imgSrc={user?.photoURL}
              name={user?.displayName}
              onClick={handleSelectUser}
              timestamp={0}
            />
          )}
        </div>
      </div>
    </>
  );
}
