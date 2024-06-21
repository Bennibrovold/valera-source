import { useState } from "react";
import "./App.css";
import { useUnit } from "effector-react";
import { $screen } from "./shared/config/router";
import { Menu } from "./pages/menu";
import { Main } from "./pages/main/main";
import styled from "styled-components";
import { ProfilePage } from "./pages/profile/profile";
import { isDevMedia } from "./shared/config/game";
import BG from "./assets/bg.png";
import { Header } from "./layout/header";

function App() {
  const screen = useUnit($screen);

  return (
    <Wrapper>
      {screen !== "menu" && <Header />}
      {screen === "profile" ? (
        <ProfilePage />
      ) : screen === "menu" ? (
        <Menu />
      ) : (
        <Main />
      )}
      <DeveloperInfo>
        Связь с разработчиком:{" "}
        <a href="https://t.me/hellmorphin">@Hellmorphin</a>. Версия 1.0.2
      </DeveloperInfo>
    </Wrapper>
  );
}

const DeveloperInfo = styled.div`
  position: fixed;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  font-size: 10px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${isDevMedia(BG)});
  background-repeat: no-repeat;
  background-size: cover;
`;

export default App;
