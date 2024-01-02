import React from "react";
import { Background, CloseButton, ModalContainer } from "./styled";
import CancelIcon from "~/assets/CancelIcon";
import { Flexbox } from "../Flexbox";
import { Button } from "../Button/styled";

interface Props {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}
export default function Modal({ isOpen, onClose, title, children }: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Background>
        <ModalContainer>
          <Flexbox spaceBetween>
            <h2>{title}</h2>
            <CloseButton onClick={onClose}>
              <CancelIcon />
            </CloseButton>
          </Flexbox>
          {children}
          <Button outline onClick={onClose}>
            Close
          </Button>
        </ModalContainer>
      </Background>
    </>
  );
}
