import ErrorIcon from "~/assets/error-message.png";

import Modal from "../Modal";
import { ErrorContainer } from "./styled";
type Props = {
  errorMessage?: string;
  onClose: () => void;
  isOpen: boolean;
};
export default function ErrorModal({ errorMessage, onClose, isOpen }: Props) {
  return (
    <Modal data-testId="ErrorModal-testid" isOpen={isOpen} onClose={onClose}>
      <ErrorContainer>
        <h2>Houston, we have a problem...</h2>
        <img src={ErrorIcon} alt="" />
        <h4 data-testId="errorMessage-testid">{errorMessage}</h4>
      </ErrorContainer>
    </Modal>
  );
}
