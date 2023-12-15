import "./styles.scss";

export default function Loading() {
  return (
    <div className="background">
      <div className="spinner">
        <span className="spinner-inner-1"></span>
        <span className="spinner-inner-2"></span>
        <span className="spinner-inner-3"></span>
      </div>
    </div>
  );
}
