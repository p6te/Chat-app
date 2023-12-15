import { Link } from "react-router-dom";
import { Container } from "./styled";

type Props = {
  title: string;
  footer: string;
  footerLink: string;
  children: JSX.Element;
};

function FormLayout({ title, footer, footerLink, children }: Props) {
  return (
    <Container>
      <h1>Chat wall</h1>
      <h3>{title}</h3>
      {children}
      <p>
        {footer}
        <Link to={`/${footerLink}`}> {footerLink}</Link>
      </p>
    </Container>
  );
}

export default FormLayout;
