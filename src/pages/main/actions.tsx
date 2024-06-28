import React from "react";
import styled from "styled-components";
import { RiMap2Line, RiShoppingBasket2Line } from "react-icons/ri";
import { GrGamepad } from "react-icons/gr";
import { setScreen } from "../../shared/config/router";

export const Actions = () => {
  return (
    <Wrapper>
      <Helper>
        <Button onClick={() => setScreen("shop")}>
          <RiShoppingBasket2Line />
        </Button>
        <Button onClick={() => setScreen("map")}>
          <RiMap2Line />
        </Button>
        <Button onClick={() => setScreen("mini")}>
          <GrGamepad />
        </Button>
      </Helper>
    </Wrapper>
  );
};

const Helper = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 8px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  left: 0px;
  width: 100%;
  position: relative;
  z-index: 2;
`;
const Button = styled.button`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0px;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  transition: all 0.2s ease-in-out;
  width: 100%;

  svg {
    font-size: 24px;
    flex-grow: 1;
  }
  &:hover {
    background-color: #296f82;
  }
`;
