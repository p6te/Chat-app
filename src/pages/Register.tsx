import FormLayout from "../components/FormLayout";
import AddAvatar from "../assets/addAvatar.png";
import { FormEvent, useState } from "react";
import FormInput from "../components/FormInput/FormInput";
import FirebaseAuthService from "../firebaseAuthService";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage, db } from "../firebaseConfig";
import { User, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface FormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState<FormInputs>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);

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
        email: values.email,
        photoURL: downloadURL,
      });

      //create empty user chats on firestore
      await setDoc(doc(db, "userChats", user.uid), {});
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  };

  const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      //create user
      const res = await FirebaseAuthService.registerUser(
        values.email,
        values.password
      );

      const date = new Date().getTime();
      const storageRef = ref(storage, `avatars/${values.username + date}`);

      if (avatar) {
        await uploadBytes(storageRef, avatar).then(() => {
          alert("image uploaded successfully");
        });
      }

      getDownloadURL(avatar ? storageRef : ref(storage, "avatarIcon.png")).then(
        async (downloadURL) => {
          if (!res.user.photoURL) {
          }
          updateUserProfile(
            res.user,
            res.user.photoURL ? res.user.photoURL : downloadURL
          );
        }
      );
    } catch (err) {
      console.warn(err);
      setLoading(false);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const onSaveAvatar: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleRegistrationViaGoogle = async () => {
    try {
      setLoading(true);
      const response = await FirebaseAuthService.loginWithGoogle();
      console.warn(response.user);
      if (response.user.photoURL) {
        updateUserProfile(response.user, response.user.photoURL);
      } else {
        getDownloadURL(ref(storage, "avatarIcon.png")).then(
          async (downloadURL) => {
            updateUserProfile(response.user, downloadURL);
          }
        );
      }

      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={onSaveAvatar}
            accept="image/png, image/gif, image/jpeg"
          />
          <label htmlFor="file">
            <img src={AddAvatar} alt="" />
            {avatar ? <img src={avatar.name} /> : <span>Add an avatar</span>}
          </label>
          <button type="submit">Sign up</button>

          <span onClick={handleRegistrationViaGoogle}>
            Register with Google account
          </span>
        </form>
        {error && <span>something went wrong</span>}
        {loading && <span>loading...</span>}
      </>
    </FormLayout>
  );
}

export default Register;
