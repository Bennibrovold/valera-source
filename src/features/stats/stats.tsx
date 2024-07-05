import React, { useState } from "react";
import styled from "styled-components";
import { $multiplayerShow, isDevMedia } from "../../shared/config/game";
import BUHLO from "../../assets/wallet.png";
import UP from "../../assets/upx.webp";
import { useUnit } from "effector-react";
import { numberToSpecialFormat } from "../../shared/lib/format-number";
import { BarUI } from "../bar";
import { FaGrinHearts, FaRegSmile } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { RiZzzFill } from "react-icons/ri";
import { $score } from "../../shared/config/stores";

export const Stats = () => {
  const score = useUnit($score);
  const multiplayer = useUnit($multiplayerShow);
  const [sleep, setSleep] = useState(100);
  const [eat, setEat] = useState(100);

  return (
    <GameInfo>
      <Bar>
        <BarUI count={sleep} Icon={RiZzzFill} color="#e5b16d" />
        <BarUI count={eat} Icon={IoFastFoodSharp} color="#e5b16d" />

        <BarUI count="50" Icon={FaRegSmile} color="#e5b16d" />
      </Bar>

      <ScoreWrapper>
        <Score>
          <img src={isDevMedia(BUHLO)} />
          <Multiplayer2>{numberToSpecialFormat(score)}</Multiplayer2>
          <img src={isDevMedia(UP)} />
          <Multiplayer> X{multiplayer}</Multiplayer>
        </Score>
      </ScoreWrapper>
    </GameInfo>
  );
};

const GameInfo = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 1;
  padding: 10px 10px;
`;
const ScoreWrapper = styled.div`
  display: flex;
  justify-content: left;
  margin-right: 50px;
`;
const Score = styled.div`
  display: grid;
  grid-template-rows: 2fr;
  grid-template-columns: repeat(2, 2fr);
  gap: 8px;

  img {
    height: 35px;
  }
`;

const Bar = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(1, 3fr);
  gap: 8px;
`;

const Multiplayer = styled.div`
  font-size: 20px;
`;
const Multiplayer2 = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
