import React, { useState, useEffect } from "react";
import styled from "styled-components";
import objectImage from "../../../assets/buhlo22.webp";
import bombImage from "../../../assets/bomba.webp";
import explosionSound from "../../../assets/baloon.mp3";
import ckickSound from "../../../assets/custom8.mp3";

export const GamesAkinator = () => {
  const [objects, setObjects] = useState([]);
  const [bombs, setBombs] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [exploded, setExploded] = useState(false);
  const explosionAudio = new Audio(explosionSound);
  const explosionAudiockick = new Audio(ckickSound);

  const checkOverlap = (left, top) => {
    const allItems = [...objects, ...bombs];
    for (const item of allItems) {
      const itemLeft = parseFloat(item.left);
      const itemTop = item.top;

      if (
        Math.abs(itemLeft - parseFloat(left)) < 5 &&
        Math.abs(itemTop - top) < 5
      ) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        let left, top;
        do {
          left = Math.random() * 90 + "%";
          top = -10;
        } while (checkOverlap(left, top));

        setObjects((prev) => [
          ...prev,
          {
            id: Date.now(),
            left: left,
            top: top,
          },
        ]);
      }, 200);

      return () => clearInterval(interval);
    }
  }, [gameOver]);

  useEffect(() => {
    if (!gameOver) {
      const bombInterval = setInterval(() => {
        let left, top;
        do {
          left = Math.random() * 90 + "%";
          top = -10;
        } while (checkOverlap(left, top));

        setBombs((prev) => [
          ...prev,
          {
            id: Date.now(),
            left: left,
            top: top,
          },
        ]);
      }, 1500);

      return () => clearInterval(bombInterval);
    }
  }, [gameOver]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setObjects((prevObjects) =>
          prevObjects
            .map((obj) => ({
              ...obj,
              top: obj.top + 3,
            }))
            .filter((obj) => obj.top < 100)
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [gameOver]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setBombs((prevBombs) =>
          prevBombs
            .map((bomb) => ({
              ...bomb,
              top: bomb.top + 3,
            }))
            .filter((bomb) => bomb.top < 100)
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [gameOver]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleClickObject = (id) => {
    explosionAudiockick.play();
    setObjects((prevObjects) => prevObjects.filter((obj) => obj.id !== id));
    setScore(score + 1);
  };

  const handleClickBomb = (id) => {
    explosionAudio.play();
    setGameOver(true);
    setExploded(true);
    setBombs([]);
    setScore(0);
  };

  const handleExit = () => {
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setObjects([]);
    setBombs([]);
    setExploded(false);
  };

  return (
    <Wrapper>
      <GameArea>
        <ScoreBoard>Счет: {score}</ScoreBoard>
        <Timer>Оставшееся время: {timeLeft}</Timer>
        {!gameOver ? (
          <>
            {/* Отображаем обычные объекты */}
            {objects.map((obj) => (
              <FallingObject
                key={obj.id}
                style={{ left: obj.left, top: `${obj.top}%` }}
                onClick={() => handleClickObject(obj.id)}
              >
                <img src={objectImage} alt="object" />
              </FallingObject>
            ))}

            {/* Отображаем бомбы */}
            {bombs.map((bomb) => (
              <FallingObject
                key={bomb.id}
                style={{ left: bomb.left, top: `${bomb.top}%` }}
                onClick={() => handleClickBomb(bomb.id)}
              >
                <img src={bombImage} alt="bomb" />
              </FallingObject>
            ))}
          </>
        ) : (
          <GameOverScreen>
            <h2>{exploded ? "Байка, вы подорвались!" : "Игра окончена!"}</h2>
            <p>Ваш счет: {score}</p>
            <ExitButton onClick={handleExit}>Выйти из игры</ExitButton>
          </GameOverScreen>
        )}
      </GameArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
  overflow: hidden;
`;

const GameArea = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const ScoreBoard = styled.div`
  position: absolute;
  top: 35px;
  left: 10px;
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const Timer = styled.div`
  position: absolute;
  top: 35px;
  right: 10px;
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const FallingObject = styled.div`
  position: absolute;
  width: 30px;
  height: 60px;
  cursor: pointer;
  transition: top 0.1s linear;

  img {
    width: 100%;
    height: 100%;
  }
`;

const GameOverScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 20px;

  border-radius: 10px;
`;

const ExitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #505050;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff3b1b;
  }
`;
