import FormLayout from "../components/FormLayout";

function Login() {
  return (
    <FormLayout title="Login" footer="You don't have an account? Register">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target);
        }}
      >
        <input type="emial" placeholder="email" />
        <input type="password" placeholder="password" />
        <button type="submit">Sign in</button>
      </form>
    </FormLayout>
  );
}

export default Login;
