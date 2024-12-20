import { useState } from "react";
import "./App.css";
import { useUnit } from "effector-react";
import { $screen, setScreen } from "./shared/config/router";
import { Menu } from "./pages/menu";
import { Main } from "./pages/main/main";
import { Register } from "./pages/main/register/register.jsx";
import { Infogames } from "./pages/main/info/Infogames.tsx";
import { GamesAkinator } from "./pages/minigames/localgames/GamesAkinator.tsx";
import { Registermain } from "./pages/main/register/loginreg.jsx";
import styled, { createGlobalStyle } from "styled-components";
import { ProfilePage } from "./pages/profile/profile";
import { Map } from "./pages/map";
import { isDevMedia } from "./shared/config/game";
import BG from "./assets/bg.png";
import { Header } from "./layout/header";
import "./assets/font/font.css";
import { $locationImage } from "./shared/config/location";
import { Shop } from "./pages/shop";
import Div100vh from "react-div-100vh";
import { GameHistory } from "./features/game-history";
import { Games } from "./pages/minigames";
import { Sound } from "./features/sound";
import React from "react";
import { LocationHandler } from "./features/location-handler";
import { useSwipeable } from "react-swipeable";

function App() {
  const screen = useUnit($screen);
  const image = useUnit($locationImage);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (screen === "game") {
        setScreen("shop");
      } else if (screen === "map") {
        setScreen("game");
      }
    },
    onSwipedRight: () => {
      if (screen === "shop") {
        setScreen("game");
      } else if (screen === "game") {
        setScreen("map");
      }
    },
    onSwipedDown: () => {
      if (screen === "game") {
        setScreen("profile");
      }
    },
    onSwipedUp: () => {
      if (screen === "profile") {
        setScreen("game");
      }
    },
    delta: 75,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <Wrapper location={screen === "game" ? image : null} {...swipeHandlers}>
      <Sound />
      <LocationHandler />

      {screen !== "menu" && screen !== "Infogames" && screen !== "exit" && (
        <Header />
      )}

      {screen === "register" ? (
        <Register />
      ) : screen === "login" ? (
        <Registermain />
      ) : screen === "shop" ? (
        <Shop />
      ) : screen === "profile" ? (
        <ProfilePage />
      ) : screen === "menu" ? (
        <Menu />
      ) : screen === "mini" ? (
        <Games />
      ) : screen === "mini" ? (
        <GamesAkinator />
      ) : screen === "map" ? (
        <Map />
      ) : screen === "exit" ? (
        <Menu />
      ) : screen == "Infogames" ? (
        <Infogames />
      ) : screen == "GamesAkinator" ? (
        <GamesAkinator />
      ) : (
        <Main />
      )}
      <DeveloperInfo>
        Связь с разработчиком:{" "}
        <a href="https://t.me/hellmorphin">@Hellmorphin</a>. Бета 1.0.3
      </DeveloperInfo>
      <GameHistory />
      <StylesheetGlobal />
    </Wrapper>
  );
}

const StylesheetGlobal = createGlobalStyle`
.swal2-icon-content {
      margin-left: 7px;
}
`;

const DeveloperInfo = styled.div`
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  font-size: 10px;
`;

const Wrapper = styled(Div100vh)`
  width: 100%;
  background-image: url(${(p) => isDevMedia(p.location || BG)});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  display: flex;
  flex-direction: column;

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
`;

export default App;
