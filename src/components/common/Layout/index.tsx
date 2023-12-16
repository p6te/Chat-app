import React, { useState } from "react";
import ErrorModal from "../ErrorModal";
import { LayoutPage } from "./styled";

interface Props {
  isError?: boolean;
  closeError: () => void;
  modal?: React.ReactNode;
  children?: React.ReactNode;
}
export default function Layout({
  isError,
  modal,
  closeError,
  children,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <LayoutPage>
      {!!modal && modal}
      {isError && <ErrorModal closeModal={closeError} />}
      <div>{children}</div>
    </LayoutPage>
  );
}
