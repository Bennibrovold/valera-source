import { useUnit } from "effector-react";
import {
  $priceFeed,
  $sound,
  feedValera,
  isDevMedia,
} from "../../shared/config/game";
import FEED from "../../assets/feed.mp3";
import styled from "styled-components";
import { GiIceCreamScoop } from "react-icons/gi";
import React from "react";
import { numberToSpecialFormat } from "../../shared/lib/format-number";
import { $score } from "../../shared/config/stores";

const audio = new Audio();
audio.preload = "auto";
audio.src = isDevMedia(FEED);

export const Feed = () => {
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
    <Circle onClick={feedValeraFn}>
      <GiIceCreamScoop />
      <Price>{numberToSpecialFormat(priceFeed)}</Price>
    </Circle>
  );
};

const Circle = styled.div`
  display: flex;
  flex-direction: column;
  width: 70px;
  height: 70px;
  gap: 10px;
  border-radius: 44px;
  background-color: #2c2b2b;

  justify-content: center;
  font-size: 23px;
  align-items: center;
  cursor: pointer;

  &:active {
    background-color: #1398b3;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: #296f82;
    }
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 12px;
  border-radius: 8px;
  padding: 4px;
  background-color: #212121;

  img {
    height: 30px;
  }
`;
