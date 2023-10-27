import "./styles.scss";

type Props = {
  title: string;
  footer: string;
  children: JSX.Element;
};

function FormLayout({ title, footer, children }: Props) {
  return (
    <div className="formContainer">
      <h1 className="logo">Chat wall</h1>
      <h3 className="title">{title}</h3>
      {children}
      <p>{footer}</p>
    </div>
  );
}

export default FormLayout;
