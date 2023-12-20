import { StyledCircle, StyledSpinner, Wrapper } from "./styled";

export default function Loading() {
  return (
    <Wrapper>
      <StyledSpinner width="65px" height="65px" viewBox="0 0 66 66">
        <StyledCircle />
      </StyledSpinner>
    </Wrapper>
  );
}
