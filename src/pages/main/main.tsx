import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ValeraUI } from "./valera";
import { useUnit } from "effector-react";
import {
  $dead,
  $multiplayer,
  $multiplayerShow,
  $score,
  $sound,
  isDevMedia,
  setDead,
} from "../../shared/config/game";
import BUHLO from "../../assets/buhlo.webp";
import FEED from "../../assets/feed.mp3";
import TUTUTU from "../../assets/tututu.mp3";
import { Actions } from "./actions";

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
    if (!score || (init && sound)) {
      tututu.play();
    }
  }, [score, init]);

  useEffect(() => {
    if (!sound) {
      tututu.volume = 0;
    } else {
      tututu.volume = 1;
    }
  }, [sound]);

  return (
    <Wrapper>
      <ScoreWrapper>
        <Score>
          {score}
          <img src={isDevMedia(BUHLO)} />
        </Score>
        <Multiplayer> X{multiplayer}</Multiplayer>
      </ScoreWrapper>
      <h1>
        <ValeraUI />
      </h1>
      <Actions />
    </Wrapper>
  );
};

const Multiplayer = styled.div``;

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
