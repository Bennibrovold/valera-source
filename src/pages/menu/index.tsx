import styled from "styled-components";
import { setScreen } from "../../shared/config/router";

export const Menu = () => {
  return (
    <Wrapper>
      <h2 onClick={() => setScreen("game")}>Играть</h2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  place-items: center;
`;
