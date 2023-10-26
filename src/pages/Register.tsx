import FormLayout from "../components/FormLayout";
import AddAvatar from "../assets/addAvatar.png";
import { ChangeEvent, FormEvent, useState } from "react";
import FormInput from "../components/FormInput/FormInput";

interface FormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
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

  const handleRegistration = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const onSaveAvatar: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
    }
  };
  console.log(avatar);

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
    <FormLayout title="Register" footer="You do have an account? Login">
      <form onSubmit={handleRegistration}>
        {inputs.map((input) => {
          const nameI = input.name;
          console.log(nameI);
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
          required
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
      </form>
    </FormLayout>
  );
}

export default Register;
