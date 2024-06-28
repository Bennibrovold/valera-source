import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { isDevMedia } from "../../shared/config/game";
import { setLocation } from "../../shared/config/location";
import { setScreen } from "../../shared/config/router";
import musorka from "../../assets/pomoi.png";
import garaj from "../../assets/garaj.png";
import { CiCircleInfo } from "react-icons/ci";
import { Modal } from "../../shared/ui/modal";
import { useModal } from "../../shared/ui/modal/use-modal";

export const Map = () => {
  const store = [
    {
      width: "90%",
      title: "Помойка",
      active: true,
      location: "trash",
      price: 0,
      image: musorka,
      info: "пепега",
    },
    {
      width: "90%",
      title: "Гараж",
      location: "garage",
      active: true,
      price: 15000,
      image: garaj,
      lvl: 15,
    },
    {
      width: "90%",
      title: "Площадка",
      active: false,
      price: 500000,
      lvl: 20,
    },
    {
      width: "90%",
      title: "Больница",
      active: false,
      price: 500000,
      lvl: 25,
    },
    {
      width: "90%",
      title: "Отель",
      active: false,
      price: 500000,
      lvl: 30,
    },
    {
      width: "90%",
      title: "Квартира в центре Владивостока",
      active: false,
      price: 500000,
      lvl: 35,
    },
    {
      width: "90%",
      title: "Квартира на угольной",
      active: false,
      price: 500000,
      lvl: 40,
    },

    {
      width: "90%",
      title: "Полицейский участок",
      active: false,
      price: 500000,
      lvl: 45,
    },
    {
      width: "90%",
      title: "Полицейский участок",
      active: false,
      price: 500000,
      lvl: 50,
    },
  ];

  const clickFn = (location) => {
    setLocation(location);
    setScreen("game");
  };

  const [activeItem, setActiveItem] = useState<any>(null);

  const iconClickFn = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: (typeof store)[0]
  ) => {
    e.stopPropagation();
    console.log(item);
    setActiveItem(item);
    modal.open();
  };

  const modal = useModal();

  console.log(activeItem);

  return (
    <Wrapper>
      {store.map((item, index) => (
        <Block
          style={{
            width: `calc(${item.width} - 8px)`,
            backgroundImage: `url(${isDevMedia(item.image)})`,
          }}
          key={index}
          onClick={() => item.location && clickFn(item.location)}
        >
          <ICON
            onClick={(e) => {
              iconClickFn(e, item);
            }}
          >
            <CiCircleInfo />
          </ICON>
          <Bg active={item.active}>
            {item.title} {!item.active && item.price}
          </Bg>
        </Block>
      ))}
      <Modal {...modal} title="Описание локации">
        <ModalTitle>{activeItem?.title}</ModalTitle>
        <ModalDescription>{activeItem?.info}</ModalDescription>
      </Modal>
    </Wrapper>
  );
};

const ModalTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #000;
`;
const ModalDescription = styled.div`
  color: #000;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 100vh;
  padding: 10px;
  overflow-y: auto;
`;
const ICON = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 35px;
  &:hover {
    color: #3dbed4;
  }
`;
const Block = styled.div`
  position: relative;
  margin: 8px 0;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
`;

const Bg = styled.div`
  height: 300px;

  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  align-items: center;

  justify-content: center;
  text-align: center;
  font-size: 30px;
  border-radius: 10px;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  cursor: ${({ active }) => (active ? "pointer" : "default")};

  &:hover {
    background-image: ${({ active }) => active && "rgba(0, 0, 0, 0.5)"};
  }
`;
