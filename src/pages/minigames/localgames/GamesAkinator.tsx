import React from "react";
import { AkinatorGame } from "../../main/info/infogames.tsx";
import styled from "styled-components";
export const GamesAkinator = () => {
  return (
    <Wrapper>
      <h1>Развлечение</h1>
      <AkinatorGame />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
`;
