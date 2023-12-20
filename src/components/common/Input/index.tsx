import { forwardRef } from "react";
import {
  Container,
  InputProps,
  StyledInput,
  Label,
  ErrorMessage,
} from "./styled";
import Spacer from "../Spacer";

interface Props extends InputProps {
  label?: string;
  errorMessage?: string;
  marginTop?: string;
}

export type Ref = Props;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, errorMessage, placeholder, marginTop, ...props }: Props, ref) => {
    return (
      <>
        {marginTop && <Spacer size={marginTop} />}
        <Container>
          <StyledInput
            placeholder={placeholder && !label ? placeholder : " "}
            isError={!!errorMessage}
            {...props}
            ref={ref}
          />
          {label && <Label> {label} </Label>}
        </Container>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </>
    );
  }
);
export default Input;
