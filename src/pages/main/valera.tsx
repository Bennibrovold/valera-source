import React, { useEffect } from "react";
import VALERA from "../../assets/valera_default.png";
import VALERA2 from "../../assets/sticker2.webp";
import VALERA3 from "../../assets/sticker3.webp";
import styled, { css } from "styled-components";
import {
  $priceFeed,
  $progress,
  addScore,
  isDevelopment,
} from "../../shared/config/game";
import { useUnit } from "effector-react";
import { addEntities } from "./models/entities";
import { Entities } from "./entities";
import { media } from "../../shared/lib/media";

export const ValeraUI = () => {
  const [isScale, setIsScale] = React.useState(false);
  const progress = useUnit($progress);
  const feed = useUnit($priceFeed);
  const IMAGES = [VALERA, VALERA2, VALERA3];

  const onClickFn = () => {
    addScore();
    addEntities();
  };

  return (
    <Wrapper
      id="entities-field"
      scaleFactor={feed}
      isScale={isScale}
      onClick={onClickFn}
      onMouseDown={() => setIsScale(true)}
      onMouseUp={() => setIsScale(false)}
      onTouchStart={() => setIsScale(true)}
      onTouchEnd={() => setIsScale(false)}
    >
      <Entities />
      <img
        src={
          isDevelopment
            ? IMAGES[progress]
            : `https://bennibrovold.github.io/valera-simulator/${IMAGES[progress]}`
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
