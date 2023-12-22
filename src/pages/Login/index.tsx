import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "~/components/common/FormLayout";
import ErrorModal from "~/components/common/ErrorModal";
import Loading from "~/components/common/LoadingSpinner";
import FirebaseAuthService from "~/firebaseAuthService";
import { ensureError } from "~/utils/ensureError";
import { Button } from "~/components/common/Button/styled";
import Spacer from "~/components/common/Spacer";
import Input from "~/components/common/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { ref, getDownloadURL } from "firebase/storage";
import { User, updateProfile } from "firebase/auth";
import { AuthContext } from "~/context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "~/firebaseConfig";

type Inputs = {
  email: string;
  password: string;
};

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loggedUser, setLoggedUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const updateUserProfile = async (user: User, downloadURL: string) => {
    const googleAccountDisplayName = user.providerData[0].displayName;
    const values = getValues();

    try {
      //Update profile
      await updateProfile(user, {
        displayName: googleAccountDisplayName,
        photoURL: downloadURL,
      });
      console.log(user.uid);
      const userRes = await getDoc(doc(db, "users", user.uid));
      console.log(userRes.data()?.uid);

      if (userRes.data()?.uid) {
        console.log("koniec");
        return;
      }

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: googleAccountDisplayName,
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

  const handleRegistrationViaGoogle = async (
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await FirebaseAuthService.loginWithGoogle();
      if (!response) {
        return;
      }

      if (response && response.user.photoURL) {
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

  const loginViaEmail: SubmitHandler<Inputs> = async (data) => {
    const values = data;
    setIsLoading(true);

    try {
      setIsLoading(true);
      await FirebaseAuthService.loginUser(values.email, values.password);
      navigate("/");
    } catch (err) {
      const error = ensureError(err);

      if (
        error.message === "Firebase: Error (auth/invalid-login-credentials)."
      ) {
        setError("password", {
          type: "manual",
          message: "Invalid login credentials",
        });
        setError("email", {
          type: "manual",
          message: "Invalid login credentials",
        });
      } else {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loggedUser) {
      navigate("/");
    }
  }, [loggedUser]);

  return (
    <>
      {isLoading && <Loading />}
      {errorMessage && (
        <ErrorModal
          closeModal={() => setErrorMessage("")}
          errorMessage={errorMessage}
        />
      )}

      <FormLayout
        title="Login"
        footer="You don't have an account?"
        footerLink="Register"
      >
        <>
          <Spacer />
          <form onSubmit={handleSubmit(loginViaEmail)}>
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
              type="password"
              marginTop="8"
              label="Password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
              errorMessage={errors.password?.message}
            />
            <Spacer />
            <Button type="submit">Sign in</Button>
          </form>
          <Spacer size="24" />
          <Button onClick={handleRegistrationViaGoogle} outline>
            Sign in with Google
          </Button>
        </>
      </FormLayout>
    </>
  );
}

export default Login;
