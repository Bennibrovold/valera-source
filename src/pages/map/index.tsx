import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { isDevMedia, $score } from "../../shared/config/game";
import { setLocation } from "../../shared/config/location";
import { setScreen } from "../../shared/config/router";
import musorka from "../../assets/musorka2.png";
import garaj from "../../assets/garaj2.png";
import { CiCircleInfo } from "react-icons/ci";
import { Modal } from "../../shared/ui/modal";
import { useModal } from "../../shared/ui/modal/use-modal";
import { media } from "../../shared/lib/media";
import { $lvl } from "../../shared/config/lvl.ts";
import { useUnit } from "effector-react";

export const Map = () => {
  const store = [
    {
      width: "90%",
      title: "Помойка",
      active: true,
      location: "trash",
      price: 0,
      image: musorka,
      info: "Cтартовая локация, где валера начал двигаться уверенно на блотной ноге",
    },
    {
      width: "90%",
      title: "Гараж",
      location: "garage",
      active: false,
      price: 1,
      image: garaj,
      lvl: 1,
      info: "На этой локации будет доступна покупка авто и добыча ресурсов будет увеличина",
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

  const score = useUnit($score);
  const lvl = useUnit($lvl);

  const buyLocation = (locationName) => {
    setStore(
      store.map((location) => {
        if (
          location.name === locationName &&
          !location.active &&
          score >= location.price &&
          lvl >= location.lvl
        ) {
          return { ...location, active: true };
        }
        return location;
      })
    );
  };

  const [activeItem, setActiveItem] = useState(null);
  const modal = useModal();

  return (
    <Wrapper>
      {store.map((item, index) => (
        <Block
          key={index}
          style={{
            width: `calc(${item.width} - 8px)`,
          }}
          onClick={() => {
            if (!item.active) {
              setActiveItem(item);
              modal.open();
            } else if (item.active && item.location) {
              setLocation(item.location);
              setScreen("game");
            }
          }}
        >
          <ICON
            onClick={(e) => {
              e.stopPropagation();
              setActiveItem(item);
              modal.open();
            }}
          >
            <CiCircleInfo />
          </ICON>
          <Bg active={item.active} img={item.image}>
            <span>{item.title}</span>
            {!item.active && (
              <TextContainer>
                <span>Цена: {item.price}</span>
                <span>Уровень: {item.lvl}</span>
                <BUY onClick={() => buyLocation(item.title)}>Купить</BUY>
              </TextContainer>
            )}
          </Bg>
        </Block>
      ))}
      <Modal {...modal} title="Описание локации">
        <ModalTitle>{activeItem?.title}</ModalTitle>
        <ModalDescription>{activeItem?.info}</ModalDescription>
        {!activeItem?.active && (
          <>
            <BUY onClick={() => buyLocation(activeItem?.title)}>
              Купить за {activeItem?.price}
            </BUY>
          </>
        )}
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
const BUY = styled.div`
  display: flex;
  font-size: 18px;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 18px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
`;

const Bg = styled.div<{ img?: string }>`
  height: 300px;
  width: 100%;
  background-position: center;
  color: white;
  display: flex;
  align-items: center;
  background: url(${(p) => isDevMedia(p.img)});
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 30px;
  border-radius: 10px;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  cursor: ${({ active }) => (active ? "pointer" : "default")};
  background-repeat: no-repeat;
  background-size: cover;

  &:hover {
    background-image: ${({ active }) => active && "rgba(0, 0, 0, 0.5)"};
  }

  ${media.pure.greater(media.size.xs)} {
    height: 600px;
  }

  ${media.pure.greater(media.size.md)} {
    height: 1000px;
  }
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  font-size: 18px;
`;
