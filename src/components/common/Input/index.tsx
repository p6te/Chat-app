import {
  Container,
  InputProps,
  StyledInput,
  Label,
  ErrorMessage,
} from "./styled";

interface Props extends InputProps {
  label?: string;
  errorMessage?: string;
}

const Input = ({ label, errorMessage, placeholder, ...props }: Props) => {
  return (
    <>
      <Container>
        <StyledInput
          {...props}
          placeholder={placeholder && !label ? placeholder : " "}
          isError={!!errorMessage}
        />
        {label && <Label> {label} </Label>}
      </Container>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
};

export default Input;
