import React from "react";
import styled from "styled-components";
import { media } from "../../lib/media";
import { IoClose } from "react-icons/io5";

export const Modal = ({ show, close, title, children }) => {
  if (!show) return null;

  return (
    <ModalWrapper>
      <ModalContent id="inventory-modal">
        <Header>
          <H2>{title}</H2>
          <CloseButton onClick={() => close()}>
            <IoClose />
          </CloseButton>
        </Header>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};

const Header = styled.div`
  display: flex;
  background-color: #fff;
  position: sticky;
  justify-content: space-between;
  top: -20px;
  margin-bottom: 8px;
  align-items: center;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  ${media.pure.less(media.size.sm)} {
    align-items: flex-end;
  }
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 500px;
  position: relative;

  ${media.pure.less(media.size.sm)} {
    width: 100%;
    max-width: 100%;
    max-height: 80%;
    overflow-y: auto;
  }
`;

export const CloseButton = styled.button`
  margin-right: -20px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: none;
  border: none;
  font-size: 35px;
  cursor: pointer;
  color: orange;

  &:hover {
    color: black;
  }
`;

const H2 = styled.div`
  color: black;
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 0px;
`;
