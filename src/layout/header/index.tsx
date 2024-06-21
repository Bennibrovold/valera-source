import styled, { css } from "styled-components";
import { $screen, setScreen } from "../../shared/config/router";
import { useUnit } from "effector-react";
import {
  RiArrowGoBackFill,
  RiMenuFill,
  RiSettings5Line,
  RiUser3Line,
  RiVolumeUpLine,
} from "react-icons/ri";
import React from "react";

export const Header = () => {
  const screen = useUnit($screen);

  return (
    <Wrapper>
      <Links>
        {screen === "profile" ? (
          <Link onClick={() => setScreen("game")}>
            <RiArrowGoBackFill />
          </Link>
        ) : (
          <Link onClick={() => setScreen("menu")} active={screen === "menu"}>
            <RiMenuFill />
          </Link>
        )}
        <Link
          onClick={() => setScreen("profile")}
          active={screen === "profile"}
        >
          <RiUser3Line />
        </Link>
      </Links>
      <RightBar>
        <Username>Гость</Username>
        <Links>
          <Link>
            <RiVolumeUpLine />
          </Link>
          <Link>
            <RiSettings5Line />
          </Link>
        </Links>
      </RightBar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding: 8px 8px;
  background-color: transparent;
  gap: 8px;
`;

const Links = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Link = styled.div<{ active?: boolean }>`
  background-color: #31849b;
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
  background-color: #31849b;
  height: 100%;
  height: 40px;
  border-radius: 8px;
`;

const Username = styled.div`
  display: flex;
  margin: 0px 4px;
  align-items: center;
`;
