import FormLayout from "../components/FormLayout";

function Register() {
  return (
    <FormLayout title="Register" footer="You do have an account? Login">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target);
        }}
      >
        <input type="text" placeholder="display name" />
        <input type="emial" placeholder="email" />
        <input type="password" placeholder="password" />
        <input type="file" placeholder="Add an avatar" />
        <button type="submit">Sign up</button>
      </form>
    </FormLayout>
  );
}

export default Register;
