import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isDevMedia } from "../../shared/config/game";
import {
  $locations,
  $locationsInfo,
  buyLocation,
  setLocation,
} from "../../shared/config/location";
import { setScreen } from "../../shared/config/router";
import { CiCircleInfo } from "react-icons/ci";
import { Modal } from "../../shared/ui/modal";
import { useModal } from "../../shared/ui/modal/use-modal";
import { media } from "../../shared/lib/media";
import { useUnit } from "effector-react";
import { GoPlus } from "react-icons/go";
import { FaArrowAltCircleUp, FaPlus } from "react-icons/fa";
import BUHLO from "../../assets/buhlo22.webp";
import { $lvl } from "../../shared/config/lvl";
import { $score } from "../../shared/config/stores";

export const Map = () => {
  const [location, setLocation_] = useState<any>('')
  const score = useUnit($score);
  const lvl = useUnit($lvl);
  const locations = useUnit($locationsInfo);
  const clickFn = (location) => {
    setLocation(location);
    setScreen("game");
  };

  useEffect(() => {
    if(location) {
      buyLocation(location)
    }
  }, [location])

  const [activeItem, setActiveItem] = useState<any>(null);

  const iconClickFn = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: (typeof locations)[0]
  ) => {
    e.stopPropagation();
    setActiveItem(item);

    modal.open();
  };

  const buyLocationFn = () => {

  }

  const modal = useModal();

  return (
    <Wrapper>
      {locations?.map((item, index) => (
        <Block
          key={index}
          onClick={item.active ? () => clickFn(item.location) : () => {}}
        >
          <ICON
            onClick={(e) => {
              iconClickFn(e, item);
            }}
          >
            <CiCircleInfo />
          </ICON>
          <Bg active={item.active} img={item.image}>
            <TextContainer>
              {item.active ? (
                <span>{item.title}</span>
              ) : (
                <>
                  <span>{item.title} (Недоступо)</span>
                  <div>
                    <span>Lvl: {item.lvl}</span>
                    <span>
                      <img src={BUHLO} />: {item.price}
                    </span>
                    <button
                      onClick={() => setLocation_(item.location)}
                      disabled={!(item.lvl <= lvl && item.price <= score)}
                    >
                      Купить
                    </button>
                  </div>
                </>
              )}
            </TextContainer>
          </Bg>
        </Block>
      ))}
      <Modal {...modal} title={activeItem?.title}>
        <Content>
          {activeItem?.advantages && (
            <Avanantages>
              <Plus>
                <FaPlus />
              </Plus>
              {activeItem?.advantages?.join(", ")}
            </Avanantages>
          )}

          <Avanantages>
            <Plus>
              <FaArrowAltCircleUp />
            </Plus>
            x{activeItem?.multiply} Прибыль
          </Avanantages>
          <ModalDescription>{activeItem?.info}</ModalDescription>
        </Content>
      </Modal>
    </Wrapper>
  );
};

const Avanantages = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: #299829;
`;
const Plus = styled.div`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2fd72f;
  color: #299829;
  padding: 4px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 32px);
  padding: 16px;

  font-size: 20px;

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    height: 100%;

    img {
      height: 30px;
    }

    span {
      &:last-child {
        flex-grow: 1;
      }
    }

    button {
      padding: 16px;
    }
  }
`;

const ModalDescription = styled.div`
  color: #000;
  font-size: 18px;
  color: #535353;
  line-height: 150%;

  ${media.pure.less(media.size.sm)} {
    font-size: 16px;
  }
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
  width: 100%;
  max-width: 1170px;
  position: relative;
  margin: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
`;

const Bg = styled.div<{ active: boolean; img?: string }>`
  height: 300px;
  width: 100%;
  background-position: center;
  color: white;
  display: flex;
  align-items: center;
  background: url(${(p) => isDevMedia(p.img)});

  justify-content: center;
  font-size: 30px;
  border-radius: 10px;

  cursor: ${({ active }) => (active ? "pointer" : "default")};
  background-repeat: no-repeat;
  background-size: cover;

  &:hover {
    background-image: ${({ active }) => active && "rgba(0, 0, 0, 0.5)"};
  }

  ${media.pure.greater(media.size.xs)} {
    height: 300px;
  }

  ${media.pure.greater(media.size.md)} {
    height: 500px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
