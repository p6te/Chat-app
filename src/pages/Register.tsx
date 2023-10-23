import FormLayout from "../components/FormLayout";
import AddAvatar from "../assets/addAvatar.png";
import { useState } from "react";

function Register() {
  const [avatar, setAvatar] = useState("");

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
        <input
          type="file"
          placeholder="Add an avatar"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setAvatar(e.target.value)}
        />
        <label htmlFor="file">
          <img src={AddAvatar} alt="" />
          {avatar ? <img src={avatar} /> : <span>Add an avatar</span>}
        </label>

        <button type="submit">Sign up</button>
      </form>
    </FormLayout>
  );
}

export default Register;
