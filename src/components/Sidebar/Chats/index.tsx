import { v4 as uuid } from "uuid";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";
import { db } from "../../../firebaseConfig";
import User from "./User";
import { ChatContext } from "../../../context/ChatContext";
import { changeUser } from "~/context/actionCreators";
import { ensureError } from "../../../utils/ensureError";
import Loading from "../../common/LoadingSpinner";
import { ChatsContainer } from "./styled";

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
};

export default function Chats({ setErrorMessage }: Props) {
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(true);

    if (!loggedUser) {
      return;
    }
    try {
      onSnapshot(doc(db, "userChats", loggedUser.uid), (userChatsDb) => {
        if (!userChatsDb.exists()) {
          return;
        }

        const chatsData = Object.entries(userChatsDb.data());

        let randomUserChats: ((ChatUserData & UserInfo) | null)[] = [];

        chatsData.forEach((chatData) => {
          const [, chatUser] = chatData as [string, ChatUserData];

          const userRef = doc(db, "users", chatUser.userId);
          onSnapshot(userRef, (userData) => {
            if (!userData.exists()) {
              return;
            }
            const userDbData = userData.data() as UserInfo;
            console.log(userDbData);
            const nextChatUser = {
              ...chatUser,
              ...userDbData,
            };

            randomUserChats = [...randomUserChats, nextChatUser];

            const sortedChats = randomUserChats.sort((a, b) => {
              if (b?.date?.seconds && a?.date?.seconds) {
                return b?.date.seconds - a?.date.seconds;
              } else if (b?.date.seconds) {
                return -1;
              } else if (a?.date.seconds) {
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

            //TODO Consider better solution to not save state for each user, but all in one.
            setChats(sortedChats);
          });
        });
      });
    } catch (err) {
      const error = ensureError(err);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loggedUser?.uid && getChats();

    // eslint-disable-next-line
  }, [loggedUser?.uid, loggedUser]);

  return (
    <>
      {isLoading && <Loading />}
      <ChatsContainer>
        <div className="userChat">
          <div className="userChatInfo">
            {chats.map((chat) => {
              if (!chat) {
                return null;
              }
              return (
                <div
                  onClick={() =>
                    handleSelect({
                      displayName: chat.displayName,
                      isOnline: chat.isOnline,
                      photoURL: chat.photoURL,
                      uid: chat.userId,
                    })
                  }
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
                </div>
              );
            })}
          </div>
        </div>
      </ChatsContainer>
    </>
  );
}