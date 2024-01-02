import { v4 as uuid } from "uuid";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Timestamp, doc, getDoc, onSnapshot } from "firebase/firestore";
import { ChatsContainer } from "./styled";
import { AuthContext } from "~/context/AuthContext";
import { ChatContext } from "~/context/ChatContext";
import { changeUser } from "~/context/actionCreators";
import { db } from "~/firebaseConfig";
import { ensureError } from "~/utils/ensureError";
import User from "~/components/common/User";
import Spacer from "~/components/common/Spacer";

export type ChatUserData = {
  userId: string;
  date: Timestamp;
  lastMessage: string;
};

export type UserInfo = {
  email: string;
  photoURL: string;
  userId: string;
  displayName: string;
  isOnline: boolean;
};

type Props = {
  setErrorMessage: (message: string) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Chats({
  setErrorMessage,
  setIsLoading,
  setIsSidebarOpen,
}: Props) {
  const [chats, setChats] = useState<((ChatUserData & UserInfo) | null)[]>([]);
  const { loggedUser } = useContext(AuthContext);
  const { dispatch, state } = useContext(ChatContext);

  const handleSelect = (user: {
    uid: string;
    displayName: string;
    photoURL: string;
    isOnline: boolean;
  }) => {
    dispatch(changeUser(user));
  };

  const getChats = async () => {
    if (!loggedUser) {
      return;
    }

    setIsLoading(true);

    try {
      const userChatsRef = doc(db, "userChats", loggedUser.uid);

      const unsubscribe = onSnapshot(userChatsRef, async (userChatsDb) => {
        if (!userChatsDb.exists()) {
          setIsLoading(false);
          return;
        }

        const chatsData = Object.entries(userChatsDb.data());

        const chatPromises = chatsData.map(async (chatData) => {
          const [, chatUser] = chatData as [string, ChatUserData];

          const userRef = doc(db, "users", chatUser.userId);
          const userData = await getDoc(userRef);

          if (!userData.exists()) {
            return null;
          }

          const userDbData = userData.data() as UserInfo;

          return {
            ...chatUser,
            ...userDbData,
          };
        });

        const resolvedChats = await Promise.all(chatPromises);

        const filteredChats = resolvedChats.filter(Boolean) as (ChatUserData &
          UserInfo)[];

        const sortedChats = filteredChats.sort((a, b) => {
          if (b?.date?.seconds && a?.date?.seconds) {
            return b?.date?.seconds - a?.date?.seconds;
          } else if (b?.date?.seconds) {
            return -1;
          } else if (a?.date?.seconds) {
            return 1;
          }
          return 0;
        });

        if (sortedChats[0]) {
          handleSelect({
            displayName: sortedChats[0].displayName,
            isOnline: sortedChats[0].isOnline,
            photoURL: sortedChats[0].photoURL,
            uid: sortedChats[0].userId,
          });
        }

        // Update state with the sorted chats
        setChats(sortedChats);
        setIsLoading(false);
      });

      return () => {
        unsubscribe();
      };
    } catch (err) {
      const error = ensureError(err);
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loggedUser?.uid && getChats();

    // eslint-disable-next-line
  }, [loggedUser?.uid, loggedUser]);

  return (
    <>
      <ChatsContainer>
        {chats.map((chat) => {
          if (!chat) {
            return null;
          }
          return (
            <div
              onClick={() => {
                handleSelect({
                  displayName: chat.displayName,
                  isOnline: chat.isOnline,
                  photoURL: chat.photoURL,
                  uid: chat.userId,
                });
                setIsSidebarOpen(false);
              }}
              key={uuid()}
            >
              <User
                name={chat.displayName}
                imgSrc={chat.photoURL}
                lastMessage={chat.lastMessage}
                timestamp={chat?.date?.seconds ? chat?.date?.seconds : 0}
                isSelected={chat.userId === state.user.uid ? true : false}
                isOnline={chat.isOnline}
              />
              <Spacer size="8" />
            </div>
          );
        })}
      </ChatsContainer>
    </>
  );
}
