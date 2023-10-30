import { FormEvent, useState } from "react";
import FormLayout from "../components/FormLayout";
import FirebaseAuthService from "../firebaseAuthService";
import { useNavigate } from "react-router-dom";

interface FormInputs {
  email: string;
  password: string;
}

function Login() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<FormInputs>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginViaGoogle = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await FirebaseAuthService.loginWithGoogle();
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      setLoading(true);
      await FirebaseAuthService.loginUser(values.email, values.password);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
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
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <button type="submit">Sign in</button>
        </form>
        <button className="googleBtn" onClick={loginViaGoogle}>
          Sign in with Google
        </button>
        {error && <span>something went wrong</span>}
        {loading && <span>loading...</span>}
      </>
    </FormLayout>
  );
}

export default Login;
