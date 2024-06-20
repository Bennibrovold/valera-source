import { useState } from "react";
import "./App.css";
import { useUnit } from "effector-react";
import { $screen } from "./shared/config/router";
import { Menu } from "./pages/menu";
import { Main } from "./pages/main/main";
import styled from "styled-components";
import { ProfilePage } from "./pages/profile/profile";

function App() {
  const screen = useUnit($screen);

  return (
    <>
      {screen === "profile" ? (
        <ProfilePage />
      ) : screen === "menu" ? (
        <Menu />
      ) : (
        <Main />
      )}
      <DeveloperInfo>
        Версия 1.0.2 <br />
        Связь с разработчиком:{" "}
        <a href="https://t.me/hellmorphin">@Hellmorphin</a>
      </DeveloperInfo>
    </>
  );
}

const DeveloperInfo = styled.div`
  position: fixed;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
`;

export default App;
