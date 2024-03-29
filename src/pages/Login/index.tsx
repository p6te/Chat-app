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
import { StyledGoogleIcon } from "../Register/styled";
import googleIcon from "~/assets/googleIcon.png";
import Modal from "~/components/common/Modal";
import { MockUser, mockUsersData } from "~/mockUsersData";
import TestUserCard from "~/components/TestUserCard";

type Inputs = {
  email: string;
  password: string;
};

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isTestUsersModalOpen, setIsTestUsersModalOpen] = useState(false);
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
      const userRes = await getDoc(doc(db, "users", user.uid));

      if (userRes.data()?.uid) {
        return;
      }

      //Update profile
      await updateProfile(user, {
        displayName: googleAccountDisplayName,
        photoURL: downloadURL,
      });

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

  const loginMockUser = async (user: MockUser) => {
    try {
      setIsLoading(true);
      await FirebaseAuthService.loginUser(user.email, user.password);
      navigate("/");
    } catch (err) {
      const error = ensureError(err);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loggedUser) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUser]);

  return (
    <>
      {isLoading && <Loading />}
      <ErrorModal
        onClose={() => setErrorMessage("")}
        errorMessage={errorMessage}
        isOpen={!!errorMessage}
      />
      <Modal
        isOpen={isTestUsersModalOpen}
        onClose={() => setIsTestUsersModalOpen(false)}
        title="Choose a test user"
      >
        <Spacer size="24" />
        {mockUsersData.map((user, index) => {
          return (
            <TestUserCard
              key={index}
              user={user}
              onClick={() => loginMockUser(user)}
            />
          );
        })}
        <Spacer size="24" />
      </Modal>
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
            Sign in with Google <StyledGoogleIcon src={googleIcon} />
          </Button>
          <Spacer size="24" />
          <Button onClick={() => setIsTestUsersModalOpen(true)} outline>
            Testing - use mock user
          </Button>
        </>
      </FormLayout>
    </>
  );
}

export default Login;
