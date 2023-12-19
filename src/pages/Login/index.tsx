import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "~/components/common/FormLayout";
import ErrorModal from "~/components/common/ErrorModal";
import { Flexbox } from "~/components/common/Flexbox";
import Loading from "~/components/common/LoadingSpinner";
import FirebaseAuthService from "~/firebaseAuthService";
import { ensureError } from "~/utils/ensureError";
import { Button } from "~/components/common/Button/styled";
import Spacer from "~/components/common/Spacer";
import Input from "~/components/common/Input";

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

  const loginViaEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      setIsLoading(true);
      await FirebaseAuthService.loginUser(values.email, values.password);
      navigate("/");
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
          <Spacer />
          <form onSubmit={loginViaEmail}>
            <Flexbox column gap="16px">
              <Input
                type="emial"
                placeholder="email"
                label="email"
                value={values.email}
                // errorMessage="sadsad"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
              <Input
                type="password"
                placeholder="password"
                label="password"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />

              <Button type="submit">Sign in</Button>
            </Flexbox>
          </form>
          <Spacer size="24" />
          <Button onClick={loginViaGoogle} outline>
            Sign in with Google
          </Button>
        </>
      </FormLayout>
    </>
  );
}

export default Login;
