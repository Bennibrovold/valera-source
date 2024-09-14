import styled from "styled-components";
import { setScreen } from "../../shared/config/router";
import BUHLO from "../../assets/buhlo22.webp";
import VALERA from "../../assets/valera_default.png";
import { media } from "../../shared/lib/media";

export const Menu = () => {
  return (
    <Wrapper>
      <Content>
        <h2>Valera Simulator</h2>
        <div onClick={() => setScreen("register")}>Играть</div>
        <BUHLOIMG src={BUHLO} />
        <VALERAIMG src={VALERA} />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  place-items: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  h2 {
    position: relative;
    z-index: 1;
    font-size: 30px;
    color: #e0dfdc;

    letter-spacing: 0.1em;
    text-shadow: 0 -1px 0 #fff, 0 1px 0 #2e2e2e, 0 2px 0 #2c2c2c,
      0 3px 0 #2a2a2a, 0 4px 0 #282828, 0 5px 0 #262626, 0 6px 0 #242424,
      0 7px 0 #222, 0 8px 0 #202020, 0 9px 0 #1e1e1e, 0 10px 0 #1c1c1c,
      0 11px 0 #1a1a1a, 0 12px 0 #181818, 0 13px 0 #161616, 0 14px 0 #141414,
      0 15px 0 #121212, 0 22px 30px rgba(0, 0, 0, 0.9);
    //text-shadow: -6px 4px 6px rgba(0, 0, 0, 0.527);
    //text-shadow: -6px 4px 6px rgba(148, 206, 200, 0.66);
  }

  div {
    position: relative;
    z-index: 1;
    box-shadow: -6px 4px 2px rgba(177, 222, 218, 0.66);
    padding: 16px;
    width: 200px;
    height: 40px;
    color: #000;
    background-color: rgb(180, 228, 224);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.1s ease-in-out;

    &:hover {
      background-color: rgb(161, 206, 202);
      box-shadow: -6px 4px 2px rgba(162, 203, 200, 0.66);
    }
  }
`;

const BUHLOIMG = styled.img`
  position: absolute;
  left: -50px;
  top: -50px;
  height: 120px;
  transform: rotate(-25deg);
  opacity: 0.7;
  overflow: hidden;

  ${media.pure.less(media.size.sm)} {
    left: 0px;
  }
`;

const VALERAIMG = styled.img`
  position: absolute;
  z-index: 0;
  height: 200px;
  right: -100px;
  overflow: hidden;
  top: -75px;
  transform: rotate(25deg);
  opacity: 0.7;

  ${media.pure.less(media.size.sm)} {
    right: -50px;
  }
`;
