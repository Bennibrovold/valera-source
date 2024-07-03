import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { isDevMedia } from "../../shared/config/game";
import { setLocation } from "../../shared/config/location";
import { setScreen } from "../../shared/config/router";
import { CiCircleInfo } from "react-icons/ci";
import { Modal } from "../../shared/ui/modal";
import { useModal } from "../../shared/ui/modal/use-modal";
import { media } from "../../shared/lib/media";
import { store } from "../map/map.data";

export const Map = () => {
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
          }}
        >
          <ICON
            onClick={(e) => {
              iconClickFn(e, item);
            }}
          >
            <CiCircleInfo />
          </ICON>
          <Bg active={item.active} img={item.image}>
            {item.active ? (
              <span>{item.title}</span>
            ) : (
              <TextContainer>
                <span>{item.title}</span>
                <span>Уровень: {item.lvl}</span>
                <span>Цена: {item.price}</span>
              </TextContainer>
            )}
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

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  font-size: 25px;
`;

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

  justify-content: center;
  text-align: center;
  font-size: 30px;
  border-radius: 10px;

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
