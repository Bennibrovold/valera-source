import React from "react";
import styled from "styled-components";
import {
  $priceFeed,
  $prices,
  $progress,
  $score,
  $sound,
  feedValera,
  isDevMedia,
} from "../../shared/config/game";
import { useUnit } from "effector-react";
import FEED from "../../assets/feed.mp3";
import {
  RiMap2Line,
  RiRestaurant2Fill,
  RiShoppingBasket2Line,
} from "react-icons/ri";
import { setScreen } from "../../shared/config/router";

const audio = new Audio();
audio.preload = "auto";
audio.src = isDevMedia(FEED);

export const Actions = () => {
  const score = useUnit($score);
  const sound = useUnit($sound);

  const priceFeed = useUnit($priceFeed);

  const feedValeraFn = () => {
    if (score >= priceFeed) {
      if (sound) {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      }

      feedValera();
    }
  };

  return (
    <Wrapper>
      <Helper>
        <Button onClick={() => setScreen("shop")}>
          <RiShoppingBasket2Line />
        </Button>
        <Button onClick={() => {}}>
          <RiMap2Line />
        </Button>
        <Button onClick={feedValeraFn}>
          <RiRestaurant2Fill />
          <Price>{priceFeed}</Price>
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
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  transition: all 0.2s ease-in-out;
  width: 100%;

  svg {
    font-size: 40px;
    flex-grow: 1;
  }
  &:hover {
    background-color: #296f82;
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 20px;
  width: 100%;
  border-radius: 8px;
  padding: 4px;
  background-color: #212121;

  img {
    height: 30px;
  }
`;
