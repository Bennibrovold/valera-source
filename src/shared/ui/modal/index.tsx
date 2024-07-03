import React from "react";
import styled, { keyframes } from "styled-components";
import { media } from "../../lib/media";
import { IoClose } from "react-icons/io5";

export const Modal = ({ show, close, title, children }) => {
  if (!show) return null;

  return (
    <ModalWrapper onClick={() => close()}>
      <ModalContent id="inventory-modal" onClick={(e) => e.stopPropagation()}>
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

const slideUp = keyframes`
  from {
    transform: translateY(100vh);
  }

  to {
    transform: translateY(0px);
  }
`;

const slideLeft = keyframes`
  from {
    transform: translateX(100vw);
  }

  to {
    transform: translateX(0px);
  }
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 16px 32px 32px 32px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 500px;
  position: relative;

  animation: ${slideUp} 0.25s ease-in-out forwards;

  ${media.pure.less(media.size.sm)} {
    width: 100%;
    max-width: 100%;
    max-height: 80%;
    overflow-y: auto;

    padding: 16px 16px 32px 16px;

    animation: ${slideLeft} 0.25s ease-in-out forwards;

    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: none;
  border: none;
  font-size: 35px;
  cursor: pointer;
  color: black;
  transition: 0.1s ease-in-out;

  &:hover {
    color: #fff;
    background-color: darkorange;
  }
  &:active {
    background-color: #e37d00;
  }
  &:focus {
    outline: none;
  }
`;

const H2 = styled.div`
  color: black;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin: 0px;
`;
