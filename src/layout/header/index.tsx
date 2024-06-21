import styled from "styled-components";
import { $screen, setScreen } from "../../shared/config/router";
import { useUnit } from "effector-react";

export const Header = () => {
  const screen = useUnit($screen);
  return (
    <Wrapper>
      <Links>
        {screen === "profile" ? (
          <Link onClick={() => setScreen("game")}>Назад</Link>
        ) : (
          <Link onClick={() => setScreen("menu")}>Меню</Link>
        )}
        <Link onClick={() => setScreen("profile")}>Профиль</Link>
      </Links>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50px;
  background-color: transparent;
`;

const Links = styled.div`
  display: flex;
  gap: 8px;
`;

const Link = styled.div``;
