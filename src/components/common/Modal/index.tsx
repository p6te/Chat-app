import React from "react";
import { Background, CloseButton, ModalContainer } from "./styled";
import CancelIcon from "~/assets/CancelIcon";
import { Flexbox } from "../Flexbox";
import { Button } from "../Button/styled";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}
export default function Modal({ isOpen, onClose, children }: Props) {
  if (!isOpen) {
    return null;
  }
  console.log(isOpen);
  return (
    <>
      <Background>
        <ModalContainer>
          <Flexbox spaceBetween>
            <h2>Add new chat</h2>
            <CloseButton onClick={onClose}>
              <CancelIcon />
            </CloseButton>
          </Flexbox>
          {children}
          <Button outline onClick={onClose}>
            close
          </Button>
        </ModalContainer>
      </Background>
    </>
  );
}
