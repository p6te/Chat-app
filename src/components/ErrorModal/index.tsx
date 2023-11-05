import ErrorIcon from "../../assets/error-message.png";
import CloseIcon from "../../assets/cancel.png";
import "./styles.scss";
type Props = {
  errorMessage?: string;
  closeModal: () => void;
};
export default function ErrorModal({ errorMessage, closeModal }: Props) {
  return (
    <div className="errorBackground">
      <div>
        <button onClick={closeModal}>
          <img src={CloseIcon} alt="" />
        </button>
        <img src={ErrorIcon} alt="" />
        <h2>Houston, we have a problem...</h2>
        <h4>{errorMessage}</h4>
      </div>
    </div>
  );
}
