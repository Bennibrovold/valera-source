import { useState } from "react";
import "./App.css";
import { useUnit } from "effector-react";
import { $screen } from "./shared/config/router";
import { Menu } from "./pages/menu";
import { Main } from "./pages/main/main";
import styled from "styled-components";
import { ProfilePage } from "./pages/profile/profile";
import { Games } from "./pages/mini";
import { Map } from "./pages/map";
import { isDevMedia } from "./shared/config/game";
import BG from "./assets/bg.png";
import { Header } from "./layout/header";
import "./assets/font/font.css";
import { $location, $locations } from "./shared/config/location";
import { Shop } from "./pages/shop";
import Div100vh from "react-div-100vh";
import { GameHistory } from "./features/game-history";

function App() {
  const screen = useUnit($screen);
  const locations = useUnit($locations);
  const location = useUnit($location);

  return (
    <Wrapper location={screen === "game" ? locations[location] : null}>
      {screen !== "menu" && <Header />}
      {screen === "shop" ? (
        <Shop />
      ) : screen === "profile" ? (
        <ProfilePage />
      ) : screen === "menu" ? (
        <Menu />
      ) : screen === "mini" ? (
        <Games />
      ) : screen === "map" ? (
        <Map />
      ) : (
        <Main />
      )}
      <DeveloperInfo>
        Связь с разработчиком:{" "}
        <a href="https://t.me/hellmorphin">@Hellmorphin</a>. Версия 1.0.3
      </DeveloperInfo>
      <GameHistory />
    </Wrapper>
  );
}

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
