import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ValeraUI } from "./valera";
import { useUnit } from "effector-react";
import { $priceFeed } from "../../shared/config/game";
import { Actions } from "./actions";
import { RiZzzFill } from "react-icons/ri";
import { GiIceCreamScoop } from "react-icons/gi";
import { Stats } from "../../features/stats/stats";
import { Inventory } from "../../features/inventory";
import { Modal } from "../../shared/ui/modal";
import { useModal } from "../../shared/ui/modal/use-modal";
import { RxBackpack } from "react-icons/rx";
import { XpBar } from "../../features/xp-bar/xp-bar";

export const Main = () => {
  const priceFeed = useUnit($priceFeed);

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

  const onClickFg = () => {
    setEat((prevCount) => {
      const newCount = prevCount + 20;
      return newCount <= 100 ? newCount : 100;
    });
  };

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
            <Modal {...modal} title="Инвентарь">
              <Inventory />
            </Modal>
          </div>
          <Circle onClick={onClickFg}>
            <GiIceCreamScoop />
            <Price>{priceFeed}</Price>
          </Circle>
        </CirclesContainer>
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
  width: 100%;
  position: absolute;
  left: 0px;
  bottom: 80px;
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

const Price = styled.div`
  display: flex;
  gap: 10px;
  font-size: 10px;
`;
