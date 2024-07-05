import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ValeraUI } from "./valera";
import { Actions } from "./actions";

import { Stats } from "../../features/stats/stats";
import { $rotation } from "./models/rotationStore.ts";
import { useModal } from "../../shared/ui/modal/use-modal";
import { RxBackpack } from "react-icons/rx";
import { XpBar } from "../../features/xp-bar/xp-bar";
import { useUnit } from "effector-react";
import { Sound } from "../../features/sound";
import { AiFillAppstore } from "react-icons/ai";

export const Main = () => {
  const [sleep, setSleep] = useState(100);
  const rotation = useUnit($rotation);

  const [eat, setEat] = useState(100);

  useEffect(() => {
    const decreaseInterval = setInterval(() => {
      setEat((prevCount) => {
        const newCount = prevCount - 5;
        return newCount > 0 ? newCount : 0;
      });
    }, 180000);

    return () => {
      clearInterval(decreaseInterval);
    };
  }, []);

  const modal = useModal();

  return (
    <Wrapper>
      <Stats />
      <XpBar />
      <h1>
        <AbsoluteAnimateText>
          Эта игра разрабатывается только потому что мне нужно больше денег
        </AbsoluteAnimateText>

        <Global
          style={{
            transform: `rotate(${rotation}deg)`,
            pointerEvents: rotation < 0 ? "none" : "all",
          }}
        >
          <ValeraUI />
        </Global>
      </h1>
      <Actions />
    </Wrapper>
  );
};

const Global = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s ease-in-out;
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-end;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 110px;
    background-color: #7a7373;
    border-radius: 0 0 50px 50px;
    z-index: 1;
  }
  h1 {
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin: 0px;
  }
`;

const leftToRight = keyframes`
  from {
    transform: translateX(1000px);
  }
  to {
    transform: translateX(-1000px);
  }
`;

const AbsoluteAnimateText = styled.div`
  position: fixed;
  font-size: 12px;
  text-wrap: nowrap;
  overflow: hidden;
  top: 50%;
  z-index: 9;
  animation: ${leftToRight} 30s ease-in-out infinite;
`;
