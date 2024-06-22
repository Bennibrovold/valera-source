import { useUnit } from "effector-react";
import { $entities, removeEntitites } from "./models/entities";
import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import BUHLO from "../../assets/buhlo.webp";
import { isDevMedia } from "../../shared/config/game";

export const Entities = () => {
  const entities = useUnit($entities);

  if (!entities) return null;

  return (
    <Wrapper>
      {entities.map(({ x, y }, i) => (
        <EntityComponent key={`${x.toString()}-${y.toString()}`} x={x} y={y} />
      ))}
    </Wrapper>
  );
};

const EntityComponent = ({ x, y }) => {
  useEffect(() => {
    setInterval(() => {
      removeEntitites({ x, y });
    }, 1000);
  }, []);

  return (
    <Entity x={x} y={y}>
      <img src={isDevMedia(BUHLO)} />
    </Entity>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const animation = keyframes`
    from {
        transform: translateY(0)
    }
    to {
        transform: translateY(-500%);
        opacity: 0;
    }
`;

const Entity = styled.div<{ x: number; y: number }>`
  position: absolute;
  pointer-events: none;
  font-size: 16px;
  left: ${(p) => p.x}px;
  top: ${(p) => p.y}px;
  z-index: 10;
  animation: ${animation} 1s;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  img {
    width: 24px;
    user-drag: none;
    user-select: none;
    pointer-events: none;
    -webkit-user-drag: none;

    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
`;
