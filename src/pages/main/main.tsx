import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ValeraUI } from "./valera";
import { useUnit } from "effector-react";
import {
  $XP,
  $dead,
  $lvl,
  $lvlExp,
  $multiplayer,
  $multiplayerShow,
  $score,
  $sound,
  isDevMedia,
  setDead,
  $priceFeed,
} from "../../shared/config/game";
import BUHLO from "../../assets/buhlo.webp";
import FEED from "../../assets/feed.mp3";
import TUTUTU from "../../assets/tututu.mp3";
import { Actions } from "./actions";
import { RiHealthBookLine, RiHeart3Line, RiZzzFill } from "react-icons/ri";
import { GiIceCreamScoop, GiHealthNormal } from "react-icons/gi";
import { addEntities } from "./models/entities";
import { BarUI, Lvlbar } from "../../features/bar";
import { FaGrinHearts, FaRegSmile } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { numberToSpecialFormat } from "../../shared/lib/format-number";

const audio = new Audio();
audio.preload = "auto";
audio.src = isDevMedia(FEED);
const tututu = new Audio();
tututu.preload = "auto";
tututu.src = isDevMedia(TUTUTU);
tututu.loop = true;

export const Main = () => {
  const [init, setInit] = useState(false);
  const score = useUnit($score);
  const dead = useUnit($dead);
  const sound = useUnit($sound);
  const multiplayer = useUnit($multiplayerShow);
  const lvl = useUnit($lvl);
  const lvlProgress = useUnit($lvlExp);
  const xp = useUnit($XP);
  const priceFeed = useUnit($priceFeed);

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    audio.pause();
    audio.currentTime = 0;
    tututu.pause();
    tututu.currentTime = 0;
    setDead(false);
  }, [dead]);

  const [count, setCount] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const decreaseInterval = setInterval(() => {
      setCount((prevCount) => {
        const newCount = prevCount - 5;
        return newCount > 0 ? newCount : 0;
      });
    }, 300000);

    let restoreInterval;
    if (!isVisible) {
      restoreInterval = setInterval(() => {
        setCount((prevCount) => {
          const newCount = prevCount + 10;
          return newCount <= 100 ? newCount : 100;
        });
      }, 10000);
    }

    return () => {
      clearInterval(decreaseInterval);
      clearInterval(restoreInterval);
    };
  }, [isVisible]);

  const onClickFn = () => {
    setIsVisible(!isVisible);
  };

  const [count2, setCount2] = useState(100);
  const [isEat, setIsEat] = useState(true);

  const audio = new Audio("path_to_your_audio_file.mp3");

  useEffect(() => {
    const decreaseInterval = setInterval(() => {
      setCount2((prevCount) => {
        const newCount = prevCount - 5;
        return newCount > 0 ? newCount : 0;
      });
    }, 220000);

    return () => clearInterval(decreaseInterval);
  }, [isEat]);

  const onClickFg = () => {
    if (score >= priceFeed) {
      setCount2((prevCount) => {
        const newCount = prevCount + 20;
        return newCount <= 100 ? newCount : 100;
      });

      if (sound) {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      }
    }
  };

  return (
    <Wrapper>
      <GameInfo>
        <ScoreWrapper>
          <Score>
            {numberToSpecialFormat(score)}
            <img src={isDevMedia(BUHLO)} />
          </Score>
          <Multiplayer> X{multiplayer}</Multiplayer>
        </ScoreWrapper>
        <Bar>
          <BarUI count="100" Icon={FaGrinHearts} color="purple" />
          <BarUI count={count} Icon={RiZzzFill} color="#007ca6" />
          <BarUI count={count2} Icon={IoFastFoodSharp} color="green" />

          <BarUI count="80" Icon={FaRegSmile} color="#a69800" />
        </Bar>
      </GameInfo>
      <Xpbar>
        lvl: {lvl}
        <Lvlbar count={(xp * 100) / lvlProgress} color="#ebe5a1" />
      </Xpbar>
      <h1>
        <Circle onClick={onClickFn}>
          <RiZzzFill />
        </Circle>
        {isVisible && <ValeraUI />}
        <Circle onClick={onClickFg}>
          <GiIceCreamScoop />
          {<Price>{priceFeed}</Price>}
        </Circle>
      </h1>
      <Actions />
    </Wrapper>
  );
};

const Multiplayer = styled.div``;

const Xpbar = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 25px;
`;

const Score = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  font-size: 28px;

  img {
    height: 50px;
    order: -1;
  }
`;

const Wrapper = styled.div`
  padding: 0px 8px;
  display: flex;
  flex-direction: column;

  flex-grow: 1;
  justify-content: flex-end;

  h1 {
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
`;

const ScoreWrapper = styled.div``;

const Circle = styled.div`
  display: flex;
  width: 66px;
  height: 44px;
  gap: 10px;
  border-radius: 44px;
  background-color: #2c2b2b;

  justify-content: center;
  font-size: 23px;
  align-items: center;
  cursor: pointer;
  margin-left: 12px;
  margin-right: 12px;
  &:hover {
    background-color: #296f82;
  }
`;

const Bar = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const Healbar = styled.div`
  border-radius: 44px;
  background-color: #2c2b2b;
`;

const Sleepbar = styled.div`
  border-radius: 44px;
  background-color: #2c2b2b;
`;

const GameInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Price = styled.div`
  display: flex;
  gap: 10px;
  font-size: 10px;
`;
