import React, { useState } from "react";
import styled from "styled-components";
import { $multiplayerShow, isDevMedia } from "../../shared/config/game";
import BUHLO from "../../assets/buhlo.webp";
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
      <ScoreWrapper>
        <Score>
          {numberToSpecialFormat(score)}
          <img src={isDevMedia(BUHLO)} />
        </Score>
        <Multiplayer> X{multiplayer}</Multiplayer>
      </ScoreWrapper>
      <Bar>
        <BarUI count="100" Icon={FaGrinHearts} color="purple" />
        <BarUI count={sleep} Icon={RiZzzFill} color="#007ca6" />
        <BarUI count={eat} Icon={IoFastFoodSharp} color="green" />

        <BarUI count="80" Icon={FaRegSmile} color="#a69800" />
      </Bar>
    </GameInfo>
  );
};

const GameInfo = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 1;
  padding: 10px 10px;
`;
const ScoreWrapper = styled.div``;
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

const Bar = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const Multiplayer = styled.div``;
