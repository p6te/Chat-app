import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Spacer from "../common/Spacer";
import { AddImageContainer, Avatar } from "./styled";
import { AuthContext } from "~/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "~/firebaseConfig";
import { ensureError } from "~/utils/ensureError";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { Button } from "../common/Button/styled";
import Input from "../common/Input";
import { Flexbox } from "../common/Flexbox";
import { useForm } from "react-hook-form";

type Inputs = {
  username: string;
};

type Props = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
};

export default function UserSettings({ setIsLoading, onClose }: Props) {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>("");

  const { loggedUser, setLoggedUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    defaultValues: {
      username: loggedUser?.displayName as string,
    },
  });

  const updateUser = async () => {
    if (!loggedUser) {
      return;
    }

    if (errors.username) {
      return;
    }

    const values = getValues();

    if (
      (imageURL !== "" ||
        values.username !== (loggedUser?.displayName as string)) &&
      !!loggedUser.displayName
    ) {
      setIsLoading(true);
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
            console.log(imageURL);
            await updateProfile(currentUser, {
              displayName: values.username,
              photoURL:
                imageURL === ""
                  ? (loggedUser?.photoURL as string)
                  : downloadURL,
            }).catch((e) => console.log(e));

            await setDoc(doc(db, "users", loggedUser.uid), {
              uid: loggedUser.uid,
              displayName: values.username,
              email: loggedUser.email,
              photoURL:
                imageURL === ""
                  ? (loggedUser?.photoURL as string)
                  : downloadURL,
              isOnline: true,
            });

            setLoggedUser({
              ...loggedUser,
              photoURL:
                imageURL === ""
                  ? (loggedUser?.photoURL as string)
                  : downloadURL,
              displayName: values.username,
            });
            setIsLoading(false);
            onClose();
          })
          .catch((e) => console.log(e));
      } catch (err) {
        const error = ensureError(err);
        // TODO Send to error page
        alert(error.message);
      }
    } else {
      onClose();
    }
  };

  const onSaveAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 100000) {
        alert("Your img is too large, please use file below 100Kb");
      } else {
        setAvatar(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target !== null && typeof e.target.result === "string") {
            setImageURL(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <>
      <Spacer />
      <h3>My account</h3>
      <Flexbox column>
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
        <Spacer />
        <form onSubmit={handleSubmit(updateUser)}>
          <Input
            marginTop="8"
            label="Username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              maxLength: {
                value: 16,
                message: "Username must be at less than 16 characters",
              },
            })}
            errorMessage={errors.username?.message}
          />
          <Spacer />
          <Button type="submit">Save</Button>
        </form>
        <Spacer />
      </Flexbox>
    </>
  );
}
