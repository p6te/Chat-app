import styled from "styled-components";

interface SpacerProps {
  size?: string;
}

const Spacer = styled.div<SpacerProps>`
  height: ${({ size }) => (size ? size + "px" : "1rem")};
`;
export default Spacer;
