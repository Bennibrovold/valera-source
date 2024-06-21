import React from "react";
import styled from "styled-components";
import {
  $priceFeed,
  $prices,
  $progress,
  $score,
  feedValera,
  isDevMedia,
  setProgress,
  setScore,
} from "../../shared/config/game";
import BUHLO from "../../assets/buhlo.webp";
import { useUnit } from "effector-react";
import { GiTeamUpgrade } from "react-icons/gi";
import { SiBurgerking } from "react-icons/si";
import FEED from "../../assets/feed.mp3";
import BG from "../../assets/bg.png";

const audio = new Audio();
audio.preload = "auto";
audio.src = isDevMedia(FEED);

export const Actions = () => {
  const score = useUnit($score);
  const prices = useUnit($prices);
  const progress = useUnit($progress);

  const priceFeed = useUnit($priceFeed);

  const feedValeraFn = () => {
    if (score >= priceFeed) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();

      feedValera();
    }
  };

  return (
    <Wrapper>
      <Button onClick={() => {}}>
        <GiTeamUpgrade />
        Магазин
        <Price>
          {prices[progress] || "Максимум"}
          <img src={isDevMedia(BUHLO)} />
        </Price>
      </Button>
      <Button onClick={feedValeraFn}>
        <SiBurgerking />
        Накормить Валеру{" "}
        <Price>
          {priceFeed}
          <img src={isDevMedia(BUHLO)} />
        </Price>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-image: url(${isDevMedia(BG)});
`;
const Button = styled.button`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;

  width: 100%;

  svg {
    font-size: 50px;
    flex-grow: 1;
  }

  &:last-child {
    div {
      visibility: hidden;
    }
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
