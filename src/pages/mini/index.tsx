import React, { useEffect, useState, useRef } from 'react'
import styled, {keyframes} from 'styled-components'
import valeraPic from '../../assets/valera_default.png'
import bomjPic from '../../assets/bomj.png'
import { $priceFeed, addScore, isDevelopment } from '../../shared/config/game'
import { ShowCase } from './showcase'

const fadeInOut = keyframes`
  0% {
    opacity: 1;
  }
  95% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// Определяем вторую анимацию (исчезновение)
const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

// Создаем стилизованные компоненты с анимациями
const FadeDiv = styled.div`
  animation: ${fadeInOut} 3s ease-in-out;
  opacity: ${props => (props.isFading ? 1 : 0)};
  transition: opacity 0s ease-in-out 1s;
`;

const FadeOutDiv = styled.div`
  animation: ${fadeOut} 0.7ms ease-in-out forwards;
`;


export const Games = () => {
     const [isFading, setIsFading] = useState(true);
  const [isCompletelyFading, setIsCompletelyFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(false);
      setIsCompletelyFading(true);
    }, 3000); // 3 секунды для первой анимации

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isCompletelyFading ? (
        <FadeOutDiv>
          <ShowCase/>
        </FadeOutDiv>
      ) : (
        <FadeDiv isFading={isFading}>
          <ShowCase/>
        </FadeDiv>
      )}
    </>
  );
};