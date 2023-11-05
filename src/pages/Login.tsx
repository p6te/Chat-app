import { FormEvent, useState } from "react";
import FormLayout from "../components/FormLayout";
import FirebaseAuthService from "../firebaseAuthService";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorModal from "../components/ErrorModal";
import { ensureError } from "../utils/ensureError";

interface FormInputs {
  email: string;
  password: string;
}

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<FormInputs>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginViaGoogle = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await FirebaseAuthService.loginWithGoogle();
    } catch (err) {
      const error = ensureError(err);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
      navigate("/");
    }
  };

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      setIsLoading(true);
      await FirebaseAuthService.loginUser(values.email, values.password);
      navigate("/");
      setIsLoading(false);
    } catch (err) {
      const error = ensureError(err);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
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
      <FormLayout
        title="Login"
        footer="You don't have an account?"
        footerLink="Register"
      >
        <>
          <form onSubmit={login}>
            <input
              type="emial"
              placeholder="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
            <button type="submit">Sign in</button>
          </form>
          <button className="googleBtn" onClick={loginViaGoogle}>
            Sign in with Google
          </button>
        </>
      </FormLayout>
    </>
  );
}

export default Login;
