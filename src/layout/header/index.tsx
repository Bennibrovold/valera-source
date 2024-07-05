import styled, { css } from "styled-components";
import { $screen, setScreen } from "../../shared/config/router";
import { useUnit } from "effector-react";
import {
  RiArrowGoBackFill,
  RiMenuFill,
  RiSettings5Line,
  RiUser3Line,
  RiVolumeMuteLine,
  RiVolumeUpLine,
} from "react-icons/ri";
import React from "react";
import { $sound, setSound } from "../../shared/config/game";

export const Header = () => {
  const screen = useUnit($screen);
  const sound = useUnit($sound);

  return (
    <Wrapper>
      <Links>
        {screen !== "game" ? (
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
        <Username>Валера</Username>
        <Links>
          <Link onClick={() => setSound(!sound)}>
            {sound ? <RiVolumeUpLine /> : <RiVolumeMuteLine />}
          </Link>
        </Links>
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
    background-color: #2e2d2d;

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
