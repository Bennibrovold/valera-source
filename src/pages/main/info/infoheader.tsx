import React from "react";
import styled, { css } from "styled-components";
import { setScreen } from "../../../shared/config/router.ts";
import {
  RiArrowGoBackFill,
  
} from "react-icons/ri";
export const Infoheader = () => {
  return (
    <Wrapper>
      <Links>
        {screen !== "exit" ? (
          <Link onClick={() => setScreen("exit")}>
            <RiArrowGoBackFill />
          </Link>
        ) : (
          <Link
            onClick={() => setScreen("exit")}
            active={screen === "exit"}
          ></Link>
        )}
      </Links>
      <RightBar>
        <Username>Об Игре</Username>
      </RightBar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding-top: 8px;
  padding-left: 8px;
  padding-right: 8px;
  background-color: transparent;
  gap: 8px;
  position: relative;
  z-index: 2;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 55px;
    background-color: #7a7373;

    z-index: -1;
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Link = styled.div<{ active?: boolean }>`
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  ${({ active }) =>
    active &&
    css`
      outline: 2px solid yellow;
    `}

  cursor: pointer;

  svg {
    font-size: 24px;
  }

  &:hover {
    background-color: #296f82;
  }
`;

const RightBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #1a1a1a;
  height: 100%;
  height: 40px;
  border-radius: 8px;
`;

const Username = styled.div`
  display: flex;
  margin: 0px 8px;
  align-items: center;
`;
