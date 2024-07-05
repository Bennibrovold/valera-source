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
  height: 20px;
  width: 100px;
  border-radius: 8px;
  background-color: #2c2b2b;
  display: flex;
  justify-content: right;

  &:before {
    content: "";
    position: absolute;

    height: 20px;
    width: ${(p) => p.count + "%"};
    border-radius: 8px;
    background-color: ${(p) => p.color};
    display: flex;
    justify-content: center;
    bottom: 0px;
  }

  svg {
    position: relative;
    margin-top: 2px;
    margin-right: 4px;
    z-index: 2;
    width: 15px;
    height: 15px;
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
