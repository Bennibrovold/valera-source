import React, { useState } from "react";
import styled from "styled-components";

export const BarUI = ({ count, Icon, color }) => {
  return (
    <Wrapper count={count} color={color}>
      <Icon />
    </Wrapper>
  );
};

export const Lvlbar = ({ count, color }) => {
  return <WrapperLVL count={count} color={color}></WrapperLVL>;
};
const Wrapper = styled.div<{ count: number; color: string }>`
  position: relative;
  height: 80px;
  width: 24px;
  border-radius: 8px;
  background-color: #2c2b2b;
  display: flex;
  justify-content: center;

  &:before {
    content: "";
    position: absolute;

    height: ${(p) => p.count + "%"};
    width: 24px;
    border-radius: 8px;
    background-color: ${(p) => p.color};
    display: flex;
    justify-content: center;
    bottom: 0px;
  }

  svg {
    position: relative;
    margin-top: 4px;
    z-index: 2;
    width: 20px;
    height: 20px;
  }
`;

const WrapperLVL = styled.div<{ count: number; color: string }>`
  height: 24px;
  position: relative;
  width: 120px;
  border-radius: 8px;
  background-color: #2c2b2b;
  display: flex;
  justify-content: center;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    height: 100%;
    width: ${(p) => p.count + "%"};
    border-radius: 8px;
    background-color: ${(p) => p.color};
    display: flex;
    max-width: 120px;
  }
`;
