import { useState, useEffect, InputHTMLAttributes } from "react";
import "./styles.scss";

type props = {
  label: string;
  errorMessage: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
} & React.HTMLProps<HTMLInputElement>;

const FormInput = ({ label, errorMessage, onChange, ...inputProps }: props) => {
  const [focused, setFocused] = useState(false);

  const handleOnBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      <input onChange={onChange} onBlur={handleOnBlur} {...inputProps} />
      <span className={focused ? "focused" : ""}>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
