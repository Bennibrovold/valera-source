import { useUnit } from "effector-react";
import { $up, buy } from "./shop";
import { $up1, buy1 } from "./carshop";
import styled, { css } from "styled-components";
import React, { useState } from "react";
import { $multiplayerShow, isDevMedia } from "../../shared/config/game";
import BUHLO from "../../assets/buhlo.webp";
import { numberToSpecialFormat } from "../../shared/lib/format-number";
import { $score } from "../../shared/config/stores";

export const Shop = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);
  const [isMenuOpen3, setIsMenuOpen3] = useState(false);
  const score = useUnit($score);
  const shop = useUnit($up);
  const score1 = useUnit($score);
  const shop1 = useUnit($up1);
  const multiplayer = useUnit($multiplayerShow);

  const onClickFn = (menuName) => {
    if (menuName === "Прокачка") {
      setIsMenuOpen(true);
      setIsMenuOpen2(false);
      setIsMenuOpen3(false);
    } else if (menuName === "Автосалон") {
      setIsMenuOpen(false);
      setIsMenuOpen2(true);
      setIsMenuOpen3(false);
    } else if (menuName === "Скины") {
      setIsMenuOpen(false);
      setIsMenuOpen2(false);
      setIsMenuOpen3(true);
    } else {
      console.log(`Нажата кнопка ${menuName}`);
    }
  };

  return (
    <Wrapper>
      <Score>
        <img src={isDevMedia(BUHLO)} alt="BUHLO" />
        {numberToSpecialFormat(score)}
      </Score>
      <Menu>
        <Button onClick={() => onClickFn("Прокачка")}>Прокачка</Button>
        <Button onClick={() => onClickFn("Автосалон")}>Автосалон</Button>
        <Button onClick={() => onClickFn("Скины")}>Скины</Button>
      </Menu>
      {isMenuOpen && (
        <Group>
          {shop.map((x) => (
            <Item
              key={x.name}
              onClick={() => buy({ name: x.name, price: x.price })}
              isEnough={x.price <= score}
            >
              <Title>
                <Name>{x.name}</Name>
                <Price>{numberToSpecialFormat(x.price)}</Price>
              </Title>
              <SubTitle>
                <p>Куплено: {x.qnty}</p>
                <p>+{x.multiply} за клик</p>
              </SubTitle>
            </Item>
          ))}
        </Group>
      )}
      {isMenuOpen2 && (
        <Group>
          {shop1.map((x) => (
            <Item
              key={x.name}
              onClick={() => buy1({ name: x.name, price: x.price })}
              isEnough={x.price <= score1}
            >
              <Title>
                <Name>{x.name}</Name>
                <IMG>
                  <img src={x.image} />
                </IMG>
                <Price>{numberToSpecialFormat(x.price)}</Price>
              </Title>
              <SubTitle>
                <p>Куплено: {x.qnty}</p>
                <p>+{x.multiply} Авто прибыль</p>
              </SubTitle>
            </Item>
          ))}
        </Group>
      )}

      {isMenuOpen3 && (
        <Group>
          {shop.map((x) => (
            <Item
              key={x.name}
              onClick={() => buy({ name: x.name, price: x.price })}
              isEnough={x.price <= score}
            >
              <Title>
                <Name>{x.name}</Name>
                <Price>{numberToSpecialFormat(x.price)}</Price>
              </Title>
              <SubTitle>
                <p>Куплено: {x.qnty}</p>
              </SubTitle>
            </Item>
          ))}
        </Group>
      )}
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
  &:active {
    background-color: #1398b3;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: #296f82;
    }
  }
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
  padding: 12px 12px;
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

const Menu = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);

  font-size: 20px;
  gap: 6px;
`;
const Button = styled.div`
  border-radius: 44px;
  background-color: #2c2b2b;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  padding: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    color: #1398b3;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: #296f82;
    }
  }
`;

const IMG = styled.div`
  display: Flex;
  width: 100px;
  height: 100px;
  padding-right: 85px;
`;
