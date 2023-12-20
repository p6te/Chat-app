import { Dispatch, ReactElement, SetStateAction, forwardRef } from "react";
import {
  Container,
  InputProps,
  StyledInput,
  Label,
  ErrorMessage,
  PasswordIconContainer,
} from "./styled";
import Spacer from "../Spacer";

interface Props extends InputProps {
  label?: string;
  errorMessage?: string;
  marginTop?: string;
  endIcon?: ReactElement;
  endIconOnClick?: () => void;
}

export type Ref = Props;

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      errorMessage,
      placeholder,
      marginTop,
      endIcon,
      endIconOnClick,
      ...props
    }: Props,
    ref
  ) => {
    return (
      <>
        {marginTop && <Spacer size={marginTop} />}
        <Container>
          <StyledInput
            placeholder={placeholder && !label ? placeholder : " "}
            isError={!!errorMessage}
            {...props}
            ref={ref}
            withEndIcon={!!endIcon}
          />
          {label && <Label> {label} </Label>}
          {endIcon && !!endIconOnClick && (
            <PasswordIconContainer onClick={endIconOnClick}>
              {endIcon}
            </PasswordIconContainer>
          )}
        </Container>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </>
    );
  }
);
export default Input;
