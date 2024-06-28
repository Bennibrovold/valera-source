import { useUnit } from "effector-react";
import React from "react";
import styled from "styled-components";
import { Lvlbar } from "../bar";
import { $XP, $lvl, $lvlExp } from "../../shared/config/lvl";

export const XpBar = () => {
  const lvl = useUnit($lvl);
  const xp = useUnit($XP);
  const lvlProgress = useUnit($lvlExp);

  return (
    <Xpbar>
      Уровень: {lvl}
      <Lvlbar count={(xp * 100) / lvlProgress} color="#ebe5a1" />
    </Xpbar>
  );
};

const Xpbar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
