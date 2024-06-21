import { useUnit } from "effector-react";
import { $up, buy } from "./shop";
import styled from "styled-components";
import React from "react";
import { $multiplayerShow, $score, isDevMedia } from "../../shared/config/game";
import BUHLO from "../../assets/buhlo.webp";

export const Shop = () => {
  const score = useUnit($score);
  const shop = useUnit($up);
  const multiplayer = useUnit($multiplayerShow);

  return (
    <Wrapper>
      <Score>
        <img src={isDevMedia(BUHLO)} />
        {score}
      </Score>
      <Multiplayer> X{multiplayer}</Multiplayer>
      <Group>
        {shop.map((x) => (
          <Item onClick={() => buy({ name: x.name, price: x.price })}>
            <Title>
              <Name>{x.name}</Name>
              <Price> {x.price}</Price>
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

const Item = styled.div`
  display: flex;
  padding: 8px;
  background-color: #fff;
  color: #000;

  flex-direction: column;
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
