import React from "react";
import VALERA from "../../assets/valera_default.png";
import styled, { css } from "styled-components";
import { $priceFeed, addScore, isDevelopment } from "../../shared/config/game";
import { useUnit } from "effector-react";
import { addEntities } from "./models/entities";
import { Entities } from "./entities";
import { media } from "../../shared/lib/media";
import { useMatchMedia } from "../../shared/lib/use-match-media";
import { addXP } from "../../shared/config/lvl";

export const ValeraUI = () => {
  const sm = useMatchMedia((x) => x.less.sm);
  const [isScale, setIsScale] = React.useState(false);
  const feed = useUnit($priceFeed);

  const handleButtonClick = () => {
    addXP(5);
  };

  const onClickFn = () => {
    addScore();
    addEntities();
    handleButtonClick();
  };

  const MobileTouch = () => {
    onClickFn();
    setIsScale(true);
  };

  return (
    <Wrapper
      id="entities-field"
      scaleFactor={feed}
      isScale={isScale}
      onClick={sm ? () => {} : onClickFn}
      onMouseDown={() => setIsScale(true)}
      onMouseUp={() => setIsScale(false)}
      onTouchStart={MobileTouch}
      onTouchEnd={() => setIsScale(false)}
    >
      <Entities />
      <img
        src={
          isDevelopment
            ? VALERA
            : `https://bennibrovold.github.io/valera-simulator/${VALERA}`
        }
      />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isScale: boolean; scaleFactor?: number }>`
  display: flex;
  justify-content: center;
  touch-action: manipulation;
  ${({ isScale }) =>
    isScale &&
    css`
      transform: scale(1.2);
    `}

  height: 500px;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  img {
    touch-action: manipulation;
    height: 100%;
    user-select: none;

    ${({ scaleFactor }) =>
      scaleFactor &&
      `
      transform: scale(${scaleFactor / 10});
    `}
  }

  ${media.pure.less(media.size.sm)} {
    height: 200px;
  }
`;
