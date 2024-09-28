import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GAMES_DATA } from "./games.data";
import { media } from "../../shared/lib/media";
import { setScreen } from "../../shared/config/router.ts";

export const Games = () => {
  const wrapperRef = useRef(null);
  const [index, setIndex] = useState(0);
  const games = GAMES_DATA.map((x) => x.name);

  useEffect(() => {
    const el = document.getElementById(games[index]);
    el?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [index]);

  const scrollLeft = () => {
    if (index > 1) {
      setIndex(index - 1);
    }
  };

  const scrollRight = () => {
    if (index < games.length - 1) {
      setIndex(index + 1);
    }
  };

  const listItems = GAMES_DATA.map((game, index) => {
    return (
      <WrapperItem key={index} id={game.name}>
        <div>{game.name}</div>
        <div>{game.description}</div>
        <div>{game.rules}</div>
      </WrapperItem>
    );
  });

  return (
    <GlobalWrapper>
      <Container>
        <Button onClick={scrollLeft}>{"<"}</Button>
        <Wrapper ref={wrapperRef}>{listItems}</Wrapper>
        <Button onClick={scrollRight}> {">"} </Button>
      </Container>
      <Button onClick={() => setScreen("GamesAkinator")}>Играть</Button>
    </GlobalWrapper>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background-color: teal;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  max-width: 720px;
  padding: 16px;
  margin: 0px 16px;
  &::-webkit-scrollbar {
    display: none;
  }

  ${media.pure.less(media.size.md)} {
    max-width: calc(100vw - 124px);
  }
`;
const GlobalWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

const WrapperItem = styled.div`
  flex: 0 0 auto;
  width: calc(100% - 8px);
  margin: 10px;
  background-color: black;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
