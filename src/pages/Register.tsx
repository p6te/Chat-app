import FormLayout from "../components/FormLayout";
import Loading from "../components/Loading";
import AddAvatar from "../assets/addAvatar.png";
import CancelIcon from "../assets/cancel.png";
import { ChangeEvent, FormEvent, useState } from "react";
import FormInput from "../components/FormInput/FormInput";
import FirebaseAuthService from "../firebaseAuthService";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage, db } from "../firebaseConfig";
import { User, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../types";
import { ensureError } from "../utils/ensureError";
import ErrorModal from "../components/ErrorModal";

function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [values, setValues] = useState<UserForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const updateUserProfile = async (user: User, downloadURL: string) => {
    try {
      //Update profile
      await updateProfile(user, {
        displayName: values.username,
        photoURL: downloadURL,
      });

      //create user on firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: values.username,
        email: values.email ? values.email : user.email,
        photoURL: downloadURL,
      });

      //create empty user chats on firestore
      await setDoc(doc(db, "userChats", user.uid), {});
    } catch (err) {
      const error = ensureError(err);
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

      getDownloadURL(avatar ? storageRef : ref(storage, "avatarIcon.png")).then(
        async (downloadURL) => {
          updateUserProfile(
            res.user,
            res.user.photoURL ? res.user.photoURL : downloadURL
          );
        }
      );
      navigate("/");
    } catch (err) {
      const error = ensureError(err);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
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

  const handleRegistrationViaGoogle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await FirebaseAuthService.loginWithGoogle();
      if (response.user.photoURL) {
        updateUserProfile(response.user, response.user.photoURL);
      } else {
        getDownloadURL(ref(storage, "avatarIcon.png")).then(
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

  const addUsername = () => {
    setIsGoogleAuth(true);
  };

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      pattern: "^[A-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Z0-9.-]+$",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  return (
    <>
      {isLoading && <Loading />}
      {errorMessage && (
        <ErrorModal
          closeModal={() => setErrorMessage("")}
          errorMessage={errorMessage}
        />
      )}
      <div className="register">
        <FormLayout
          title="Register"
          footer="You do have an account?"
          footerLink="Login"
        >
          <>
            <form onSubmit={handleRegistration}>
              {inputs.map((input) => {
                return (
                  <FormInput
                    key={input.id}
                    onChange={onChange}
                    value={values[input.name as keyof typeof values]}
                    {...input}
                    id={input.id.toString()}
                  />
                );
              })}
              <div>
                {imageURL ? (
                  <div className="avatarPreview">
                    <button
                      onClick={() => {
                        setImageURL("");
                      }}
                    >
                      <img src={CancelIcon} alt="" />
                    </button>
                    <img src={imageURL} alt="avatar" />
                  </div>
                ) : (
                  <div className="addAvatar">
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      onChange={(e) => {
                        console.warn("zmiana");
                        onSaveAvatar(e);
                      }}
                      accept="image/png, image/jpeg"
                    />
                    <label htmlFor="file">
                      <img src={AddAvatar} alt="" />
                    </label>
                    <span>Add an avatar</span>
                  </div>
                )}
              </div>
              <button type="submit">Sign up</button>
            </form>
            <button className="googleBtn" onClick={addUsername}>
              Register with Google account
            </button>
          </>
        </FormLayout>
        {isGoogleAuth && (
          <div
            className="googleUsername"
            onClick={() => setIsGoogleAuth(false)}
          >
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleRegistrationViaGoogle}
            >
              <h3>Add your display name</h3>
              {
                <FormInput
                  onChange={onChange}
                  value={values.username}
                  {...inputs[0]}
                  id={inputs[0].id.toString()}
                />
              }
              <button type="submit">Sign up with Google</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Register;
