import styled from "styled-components";
import { setScreen } from "../../shared/config/router";

export const ProfilePage = () => {
  return (
    <div>
      <h1>Профиль</h1>
    </div>
  );
};

const BackToMenu = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  padding: 32px;
  cursor: pointer;

  &:hover {
    background-color: black;
    color: #fff;
  }
`;
