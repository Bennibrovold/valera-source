import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ValeraUI } from "./valera";
import { useUnit } from "effector-react";
import { $dead, $score, isDevMedia, setDead } from "../../shared/config/game";
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

  return (
    <Wrapper>
      <ScoreWrapper>
        <Score>
          {score}
          <img src={isDevMedia(BUHLO)} />
        </Score>
      </ScoreWrapper>
      <h1>
        <ValeraUI />
      </h1>
      <Actions />
    </Wrapper>
  );
};

const Score = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;

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
  gap: 30px;
`;

const ScoreWrapper = styled.div``;
