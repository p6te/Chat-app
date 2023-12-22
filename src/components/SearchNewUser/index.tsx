import UserComponent from "../common/User";
import {
  useState,
  KeyboardEvent,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
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

import { Button } from "../common/Button/styled";
import { Flexbox } from "../common/Flexbox";
import { StyledInput, Users } from "./styled";
import Spacer from "../common/Spacer";

type Props = {
  setErrorMessage: (message: string) => void;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export default function Search({
  setErrorMessage,
  setIsSearchOpen,
  setIsLoading,
}: Props) {
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
    console.log(loggedUser);
    console.log(user);
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
      <Spacer size="32" />
      <Flexbox spaceBetween gap="16px">
        <StyledInput
          type="text"
          placeholder="Find a user by nickname"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          value={username}
        />
        <Button shrink onClick={handleSearch}>
          Search
        </Button>
      </Flexbox>
      <Users>
        <div onClick={handleSelectUser}>
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
      </Users>
    </>
  );
}
