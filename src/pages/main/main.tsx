import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { setScreen } from "../../shared/config/router";
import { ValeraUI } from "./valera";
import { useUnit } from "effector-react";
import {
  $dead,
  $priceFeed,
  $prices,
  $progress,
  $score,
  buyUpgrade,
  feedValera,
  isDevMedia,
  isDevelopment,
  setDead,
  setProgress,
  setScore,
} from "../../shared/config/game";
import { SiBurgerking } from "react-icons/si";
import { FaRegTrashCan } from "react-icons/fa6";
import { GiTeamUpgrade } from "react-icons/gi";
import BUHLO from "../../assets/buhlo.webp";
import FEED from "../../assets/feed.mp3";
import TUTUTU from "../../assets/tututu.mp3";

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
  const prices = useUnit($prices);
  const progress = useUnit($progress);

  const priceFeed = useUnit($priceFeed);
  const dead = useUnit($dead);

  const buyUpgradeFn = () => {
    if (!prices[progress]) return;

    buyUpgrade();
  };

  const feedValeraFn = () => {
    if (score >= priceFeed) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();

      feedValera();
    }
  };

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

  useEffect(() => {
    if (!score || init) {
      tututu.play();
    }
  }, [score, init]);

  const reset = () => {
    setScore(0);
    setProgress(0);
  };

  const canUpgrade = !prices[progress];

  return (
    <Wrapper>
      <BackToMenu onClick={() => setScreen("menu")}>Меню</BackToMenu>
      <ProfileButton onClick={() => setScreen("profile")}>
        Профиль
      </ProfileButton>
      <ScoreWrapper>
        <Relative>
          <AbsoluteButtons>
            <Score>
              {score}
              <img src={isDevMedia(BUHLO)} />
            </Score>
          </AbsoluteButtons>
        </Relative>
      </ScoreWrapper>
      <h1>
        <ValeraUI />
      </h1>

      <Relative>
        <AbsoluteButtons>
          <Button onClick={buyUpgradeFn}>
            <GiTeamUpgrade />
            Улучшить Валеру
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
          <Button onClick={reset}>
            <FaRegTrashCan />
            Сбросить
            <Price>
              {priceFeed}
              <img src={isDevMedia(BUHLO)} />
            </Price>
          </Button>
        </AbsoluteButtons>
      </Relative>
    </Wrapper>
  );
};

const Relative = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const BackToMenu = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  padding: 32px;
  cursor: pointer;

  &:hover {
    background-color: black;
    color: #fff;
  }
`;

const Score = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  font-size: 60px;

  img {
    height: 120px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 300px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;

  width: 300px;

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

const ScoreWrapper = styled.div`
  margin-bottom: 100px;
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

const AbsoluteButtons = styled.div`
  position: absolute;
  z-index: 1000;
  width: 300px;
  gap: 8px;
  display: flex;
  justify-content: center;
`;

const ProfileButton = styled.div`
  position: fixed;
  left: 109px;
  top: 0px;
  padding: 32px;
  cursor: pointer;

  &:hover {
    background-color: black;
    color: #fff;
  }
`;
