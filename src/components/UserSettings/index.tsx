import { ChangeEvent, useContext, useState } from "react";
import Spacer from "../common/Spacer";
import { AddImageContainer, Avatar, AvatarContainer } from "./styled";
import ImageIcon from "~/assets/ImageIcon";
import CancelIcon from "~/assets/cancel.png";
import { AuthContext } from "~/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "~/firebaseConfig";
import { ensureError } from "~/utils/ensureError";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { Button } from "../common/Button/styled";
import Input from "../common/Input";
import { Flexbox } from "../common/Flexbox";

export default function UserSettings() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const { loggedUser, setLoggedUser } = useContext(AuthContext);

  const [username, setUsername] = useState<string>(
    loggedUser?.displayName as string
  );
  const updateUser = async () => {
    if (!loggedUser) {
      return;
    }

    if (imageURL && loggedUser.displayName) {
      try {
        const date = new Date().getTime();
        const storageRef = ref(
          storage,
          `avatars/${loggedUser.displayName + date}`
        );

        if (avatar) {
          await uploadBytes(storageRef, avatar);
        }
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("Not logged in");
        }
        getDownloadURL(avatar ? storageRef : ref(storage, "avatarIcon.png"))
          .then(async (downloadURL) => {
            await updateProfile(currentUser, {
              displayName: username,
              photoURL: downloadURL,
            }).catch((e) => console.log(e));

            await setDoc(doc(db, "users", loggedUser.uid), {
              uid: loggedUser.uid,
              displayName: username,
              email: loggedUser.email,
              photoURL: downloadURL,
              isOnline: true,
            });

            setLoggedUser({
              ...loggedUser,
              photoURL: downloadURL,
              displayName: username,
            });
          })
          .catch((e) => console.log(e));
      } catch (err) {
        const error = ensureError(err);
        // TODO Send to error page
        alert(error.message);
      }
    }
  };

  const onSaveAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target !== null && typeof e.target.result === "string") {
          setImageURL(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Spacer />
      <h3>My account</h3>
      <Flexbox column gap="16px">
        <AddImageContainer>
          <>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              onChange={(e) => {
                onSaveAvatar(e);
              }}
              accept="image/png, image/jpeg"
            />
            <label htmlFor="file">
              <Avatar
                src={imageURL ? imageURL : (loggedUser?.photoURL as string)}
                alt="avatar"
              />
            </label>
          </>
        </AddImageContainer>
        {/* )} */}
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
        />
        <Button onClick={updateUser}>Save</Button>
      </Flexbox>
    </>
  );
}
