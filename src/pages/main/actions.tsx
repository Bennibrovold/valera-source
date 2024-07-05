import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RiMap2Line, RiShoppingBasket2Line } from "react-icons/ri";
import { GrGamepad } from "react-icons/gr";
import { setScreen } from "../../shared/config/router";
import { Modal } from "../../shared/ui/modal";
import { useModal } from "../../shared/ui/modal/use-modal";
import { Inventory } from "../../features/inventory";
import { RxBackpack } from "react-icons/rx";
import { CgMenuGridR } from "react-icons/cg";
import { Feed } from "../../features/feed";
import { RiZzzFill } from "react-icons/ri";
import { toggleRotation } from "./models/rotationStore.ts";

interface SlideOutPanelProps {
  isOpen: boolean;
}

export const Actions = () => {
  const modal = useModal();
  const [sleep, setSleep] = useState(100);

  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    const decreaseInterval = setInterval(() => {
      setSleep((prevSleep) => {
        const newSleep = prevSleep - 5;
        return newSleep > 0 ? newSleep : 0;
      });
    }, 50000);

    let restoreInterval;
    if (!rotation) {
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
  }, [rotation]);

  const [isOpen, setIsOpen] = useState(false);
  const onClickFn = () => {
    toggleRotation();
  };
  return (
    <Wrapper>
      <Helper>
        <Button onClick={() => setScreen("shop")}>
          <RiShoppingBasket2Line />
        </Button>
        <Button onClick={() => setScreen("mini")}>
          <GrGamepad />
        </Button>
        <Button onClick={() => setScreen("map")}>
          <RiMap2Line />
        </Button>
        <Button onClick={modal.open}>
          <RxBackpack />
        </Button>
        <Modal {...modal} title="Инвентарь">
          <Inventory />
        </Modal>
        <Button onClick={() => setIsOpen(!isOpen)}>
          <CgMenuGridR />
        </Button>
        <SlideOutPanel isOpen={isOpen}>
          <SlideOutButton>
            <Feed />
          </SlideOutButton>

          <SlideOutButton>
            <Circle onClick={onClickFn}>
              <RiZzzFill />
            </Circle>
          </SlideOutButton>
        </SlideOutPanel>
      </Helper>
    </Wrapper>
  );
};

const Circle = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  gap: 10px;
  border-radius: 44px;

  justify-content: center;
  font-size: 23px;
  align-items: center;
  cursor: pointer;
  margin-left: 12px;
  margin-right: 12px;

  &:active {
    background-color: #296f82;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: #296f82;
    }
  }
`;

const SlideOutPanel = styled.div<SlideOutPanelProps>`
  position: fixed;
  bottom: 58px;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #1a1a1a;
  transition: transform 0.4s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(100%)")};
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  z-index: 1;
`;
const SlideOutButton = styled.button`
  margin: 0 10px;
`;
const Helper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Wrapper = styled.div`
  display: flex;

  height: 60px;
  left: 0px;
  width: 100%;
  position: relative;
  z-index: 2;
  background-color: #1a1a1a;
`;
const Button = styled.button`
  display: flex;
  flex-direction: column;
  z-index: 2;

  justify-content: center;
  align-items: center;
  flex-grow: 1;
  transition: all 0.2s ease-in-out;
  width: 100%;

  svg {
    font-size: 24px;
    flex-grow: 1;
  }
  &:active {
    background-color: #296f82;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: #296f82;
    }
  }
`;
