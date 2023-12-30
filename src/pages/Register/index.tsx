import CancelIcon from "~/assets/cancel.png";
import { ChangeEvent, useContext, useState } from "react";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { User, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Input from "~/components/common/Input";
import { Button } from "~/components/common/Button/styled";
import Spacer from "~/components/common/Spacer";
import { AddImageContainer, Avatar, AvatarContainer } from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageIcon from "~/assets/ImageIcon";
import { AuthContext } from "~/context/AuthContext";
import { db, storage } from "~/firebaseConfig";
import { ensureError } from "~/utils/ensureError";
import FirebaseAuthService from "~/firebaseAuthService";
import Loading from "~/components/common/LoadingSpinner";
import ErrorModal from "~/components/common/ErrorModal";
import FormLayout from "~/components/common/FormLayout";
import HidePasswordIcon from "~/assets/HidePasswordIcon";
import ShowPasswordIcon from "~/assets/ShowPasswordIcon";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setLoggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password", "");

  const updateUserProfile = async (user: User, downloadURL: string) => {
    const googleAccountDisplayName = user.providerData[0].displayName;
    const values = getValues();
    const displayName = values.username
      ? values.username
      : googleAccountDisplayName;

    try {
      const userRes = await getDoc(doc(db, "users", user.uid));

      if (userRes.data()?.displayName) {
        return;
      }

      //Update profile
      await updateProfile(user, {
        displayName: displayName,
        photoURL: downloadURL,
      });
      //create user on firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: displayName,
        email: values.email ? values.email : user.email,
        photoURL: downloadURL,
        isOnline: true,
      });

      //create empty user chats on firestore
      await setDoc(doc(db, "userChats", user.uid), {});

      setLoggedUser(user);
    } catch (err) {
      const error = ensureError(err);
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  const handleRegistrationViaEmail: SubmitHandler<Inputs> = async (data) => {
    const values = data;
    setIsLoading(true);

    try {
      //create user
      const res = await FirebaseAuthService.registerUser(
        values.email,
        values.password
      );

      const date = new Date().getTime();
      const storageRef = ref(storage, `avatars/${values.username + date}`);

      if (avatar) {
        await uploadBytes(storageRef, avatar);
      }

      await getDownloadURL(
        avatar ? storageRef : ref(storage, "avatarIcon.png")
      ).then(async (downloadURL) => {
        await updateUserProfile(
          res.user,
          res.user.photoURL ? res.user.photoURL : downloadURL
        );
      });
      navigate("/");
    } catch (err) {
      const error = ensureError(err);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistrationViaGoogle = async (
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await FirebaseAuthService.loginWithGoogle();
      if (response.user.photoURL) {
        await updateUserProfile(response.user, response.user.photoURL);
      } else {
        await getDownloadURL(ref(storage, "avatarIcon.png")).then(
          async (downloadURL) => {
            updateUserProfile(response.user, downloadURL);
          }
        );
      }
    } catch (err) {
      const error = ensureError(err);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
      navigate("/");
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
      {isLoading && <Loading />}
      {errorMessage && (
        <ErrorModal
          closeModal={() => setErrorMessage("")}
          errorMessage={errorMessage}
        />
      )}
      <div>
        <FormLayout
          title="Register"
          footer="You do have an account?"
          footerLink="Login"
        >
          <>
            <Spacer />
            <form onSubmit={handleSubmit(handleRegistrationViaEmail)}>
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

              <Input
                marginTop="8"
                label="Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "Entered value does not match email format",
                  },
                })}
                errorMessage={errors.email?.message}
              />

              <Input
                type={showPassword ? "text" : "password"}
                marginTop="8"
                label="Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message:
                      "Password should be at least 8 characters and include minimum 1 letter and 1 number",
                  },
                })}
                errorMessage={errors.password?.message}
                endIcon={
                  showPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />
                }
                endIconOnClick={() =>
                  setShowPassword((prevState) => !prevState)
                }
              />

              <Input
                type={showConfirmPassword ? "text" : "password"}
                marginTop="8"
                label="Confirm Password"
                {...register("confirmPassword", {
                  validate: (fieldValue) => {
                    return fieldValue === password || "Passwords don't match!";
                  },
                })}
                errorMessage={errors.confirmPassword?.message}
                endIcon={
                  showConfirmPassword ? (
                    <HidePasswordIcon />
                  ) : (
                    <ShowPasswordIcon />
                  )
                }
                endIconOnClick={() =>
                  setShowConfirmPassword((prevState) => !prevState)
                }
              />

              <div>
                {imageURL ? (
                  <AvatarContainer>
                    <button
                      onClick={() => {
                        setImageURL("");
                      }}
                    >
                      <img src={CancelIcon} alt="" />
                    </button>
                    <Avatar src={imageURL} alt="avatar" />
                  </AvatarContainer>
                ) : (
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
                        <ImageIcon size={"48"} />
                      </label>
                    </>
                    <span>Add an avatar</span>
                  </AddImageContainer>
                )}
              </div>
              <Spacer />
              <Button type="submit">Sign up</Button>
            </form>
            <Spacer size="24" />
            <Button
              className="googleBtn"
              onClick={handleRegistrationViaGoogle}
              outline
            >
              Register with Google account
            </Button>
          </>
        </FormLayout>
      </div>
    </>
  );
  ``;
}

export default Register;
