import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ValeraUI } from "./valera";
import { Actions } from "./actions";
import { RiZzzFill } from "react-icons/ri";
import { Stats } from "../../features/stats/stats";
import { Inventory } from "../../features/inventory";
import { Modal } from "../../shared/ui/modal";
import { useModal } from "../../shared/ui/modal/use-modal";
import { RxBackpack } from "react-icons/rx";
import { XpBar } from "../../features/xp-bar/xp-bar";
import { Feed } from "../../features/feed";
import { Sound } from "../../features/sound";

export const Main = () => {
  const [sleep, setSleep] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const decreaseInterval = setInterval(() => {
      setSleep((prevSleep) => {
        const newSleep = prevSleep - 5;
        return newSleep > 0 ? newSleep : 0;
      });
    }, 50000);

    let restoreInterval;
    if (!isVisible) {
      restoreInterval = setInterval(() => {
        setSleep((prevSleep) => {
          const newSleep = prevSleep + 10;
          return newSleep <= 100 ? newSleep : 100;
        });
      }, 1500);
    }

    return () => {
      clearInterval(decreaseInterval);
      clearInterval(restoreInterval);
    };
  }, [isVisible]);

  const onClickFn = () => {
    setIsVisible(!isVisible);
  };

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
        <CirclesContainer>
          <Circle onClick={onClickFn}>
            <RiZzzFill />
          </Circle>
          <div>
            <Circle onClick={modal.open}>
              <RxBackpack />
            </Circle>
            <Global>
              <ValeraUI />
            </Global>
          </div>
        </CirclesContainer>
        <FeedContainer>
          <Feed />
        </FeedContainer>
        <Global>{isVisible && <ValeraUI />}</Global>
      </h1>
      <Actions />
    </Wrapper>
  );
};

const CirclesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  width: 80px;
  position: absolute;
  left: 0px;
  bottom: 80px;
  z-index: 10;
`;

const Global = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 0px 8px;
  display: flex;
  position: relative;
  flex-direction: column;

  flex-grow: 1;
  justify-content: flex-end;

  h1 {
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin: 0px;
  }
`;

const Circle = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
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

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  width: 80px;
  position: absolute;
  right: 0px;
  bottom: 80px;
  z-index: 10;
`;
