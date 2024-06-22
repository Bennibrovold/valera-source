import { useUnit } from "effector-react";
import { $up, buy } from "./shop";
import styled, { css } from "styled-components";
import React from "react";
import { $multiplayerShow, $score, isDevMedia } from "../../shared/config/game";
import BUHLO from "../../assets/buhlo.webp";
import { numberToSpecialFormat } from "../../shared/lib/format-number";

export const Shop = () => {
  const score = useUnit($score);
  const shop = useUnit($up);
  const multiplayer = useUnit($multiplayerShow);
  const onClickFn = () => {};
  return (
    <Wrapper>
      <Score>
        <img src={isDevMedia(BUHLO)} />
        {numberToSpecialFormat(score)}
      </Score>
      <Multiplayer> X{multiplayer}</Multiplayer>
      <Pack>
        <Menu>
          <Click onClick={onClickFn}>Прокачка</Click>
          <Car onClick={onClickFn}>Автосалон</Car>
          <Skin onClick={onClickFn}>Скины</Skin>
        </Menu>
      </Pack>
      <Group>
        {shop.map((x) => (
          <Item
            onClick={() => buy({ name: x.name, price: x.price })}
            isEnough={x.price <= score}
          >
            <Title>
              <Name>{x.name}</Name>
              <Price> {numberToSpecialFormat(x.price)}</Price>
            </Title>
            <SubTitle>
              <p>Куплено: {x.qnty}</p>
              <p>+{x.multiply} за клик</p>
            </SubTitle>
          </Item>
        ))}
      </Group>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 8px;
`;

const Item = styled.div<{ isEnough: boolean }>`
  display: flex;
  padding: 8px;
  background-color: #fff;
  color: #000;

  flex-direction: column;

  ${({ isEnough }) =>
    !isEnough &&
    css`
      opacity: 0.5;
    `}
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
`;
const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-size: 12px;
    font-weight: bold;
    margin: 0;
  }
`;
const Name = styled.div``;
const Price = styled.div``;

const Score = styled.div`
  display: flex;
  align-items: center;
  font-size: 28px;
  gap: 8px;
  img {
    height: 50px;
  }
`;

const Group = styled.div`
  padding: 8px 0px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100vh - 180px);
  overflow-y: scroll;
`;
const Multiplayer = styled.div``;

const Menu = styled.div`
  padding-top: 10px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;
const Click = styled.div`
  border-radius: 44px;
  background-color: #2c2b2b;
  text-align: center;
`;
const Car = styled.div`
  border-radius: 44px;
  background-color: #2c2b2b;
  text-align: center;
  cursor: pointer;
`;
const Pack = styled.div`
  height: 4px;
  margin-bottom: 36px;
  background: gray;
  width: 100%;
  cursor: pointer;
`;
const Skin = styled.div`
  border-radius: 44px;
  background-color: #2c2b2b;
  text-align: center;
  cursor: pointer;
`;
