import React, { useState } from "react";
import VALERA from "../../assets/valera_default.png";
import styled, { css } from "styled-components";
import { $priceFeed, addScore, isDevelopment } from "../../shared/config/game";
import { useUnit } from "effector-react";
import { addEntities } from "./models/entities";
import { Entities } from "./entities";
import { media } from "../../shared/lib/media";
import { useMatchMedia } from "../../shared/lib/use-match-media";

import {
  $level,
  $XPprogress,
  setXPLevel,
  setXPProgress,
} from "../../shared/config/game";

export const ValeraUI = () => {
  const sm = useMatchMedia((x) => x.less.sm);
  const [isScale, setIsScale] = React.useState(false);
  const feed = useUnit($priceFeed);

  const level = useUnit($level);
  const progress = useUnit($XPprogress);

  const handleButtonClick = () => {
    setXPProgress(progress + 5);
    if (progress + 10 >= 110) {
      setXPLevel(level + 1);
      setXPProgress(0);
    }
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
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

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
