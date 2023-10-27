import { Link } from "react-router-dom";
import "./styles.scss";

type Props = {
  title: string;
  footer: string;
  footerLink: string;
  children: JSX.Element;
};

function FormLayout({ title, footer, footerLink, children }: Props) {
  return (
    <div className="formContainer">
      <h1 className="logo">Chat wall</h1>
      <h3 className="title">{title}</h3>
      {children}
      <p>
        {footer}
        <Link to={`/${footerLink}`}> {footerLink}</Link>
      </p>
    </div>
  );
}

export default FormLayout;
