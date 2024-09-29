import React, { useState, useEffect } from "react";
import styled from "styled-components";
import objectImage from "../../../assets/buhlo22.webp";
import bombImage from "../../../assets/bomba.webp";
import x2Image from "../../../assets/2x.webp";
import explosionSound from "../../../assets/baloon.mp3";
import clickSound from "../../../assets/custom8.mp3";
import { setScreen } from "../../../shared/config/router.ts";

export const GamesAkinator = () => {
  const [objects, setObjects] = useState([]);
  const [bombs, setBombs] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [multiplierActive, setMultiplierActive] = useState(false);
  const [x2Object, setX2Object] = useState(null);
  const explosionAudio = new Audio(explosionSound);
  const clickAudio = new Audio(clickSound);

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
    if (!gameOver && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

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
          { id: Date.now(), left: left, top: top },
        ]);
      }, 200);

      return () => clearInterval(interval);
    }
  }, [gameOver]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        let left, top;
        do {
          left = Math.random() * 90 + "%";
          top = -10;
        } while (checkOverlap(left, top));

        setBombs((prev) => [...prev, { id: Date.now(), left: left, top: top }]);
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [gameOver]);

  useEffect(() => {
    if (!x2Object && !gameOver) {
      const randomTime = Math.random() * (40 - 20) + 20;

      const x2Timeout = setTimeout(() => {
        setX2Object({ id: "x2", left: Math.random() * 90 + "%", top: -10 });
      }, randomTime * 1000);

      return () => clearTimeout(x2Timeout);
    }
  }, [gameOver, x2Object]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setObjects((prevObjects) =>
          prevObjects
            .map((obj) => ({ ...obj, top: obj.top + 3 }))
            .filter((obj) => obj.top < 100)
        );
      }, 40);

      return () => clearInterval(interval);
    }
  }, [gameOver]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setBombs((prevBombs) =>
          prevBombs
            .map((bomb) => ({ ...bomb, top: bomb.top + 3 }))
            .filter((bomb) => bomb.top < 100)
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [gameOver]);

  useEffect(() => {
    if (x2Object && !gameOver) {
      const interval = setInterval(() => {
        setX2Object((prevX2) =>
          prevX2 ? { ...prevX2, top: prevX2.top + 3 } : null
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [x2Object, gameOver]);

  const handleClickObject = (id) => {
    clickAudio.play();
    setObjects((prevObjects) => prevObjects.filter((obj) => obj.id !== id));
    setScore(score + (multiplierActive ? 2 : 1));
  };

  const handleClickBomb = (id) => {
    explosionAudio.play();
    setGameOver(true);
    setExploded(true);
    setBombs([]);
    setScore(0);
  };

  const handleClickX2Object = () => {
    setMultiplierActive(true);
    setX2Object(null);
  };

  const handleExit = () => {
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setObjects([]);
    setBombs([]);
    setExploded(false);
    setMultiplierActive(false);
    setX2Object(null);
  };

  return (
    <Wrapper>
      <GameArea>
        <ScoreBoard>Счет: {score}</ScoreBoard>
        <Timer>Оставшееся время: {timeLeft}</Timer>
        {!gameOver ? (
          <>
            {/* Обычные объекты */}
            {objects.map((obj) => (
              <FallingObject
                key={obj.id}
                style={{ left: obj.left, top: `${obj.top}%` }}
                onClick={() => handleClickObject(obj.id)}
              >
                <img src={objectImage} alt="object" />
              </FallingObject>
            ))}

            {/* Бомбы */}
            {bombs.map((bomb) => (
              <FallingObject
                key={bomb.id}
                style={{ left: bomb.left, top: `${bomb.top}%` }}
                onClick={() => handleClickBomb(bomb.id)}
              >
                <img src={bombImage} alt="bomb" />
              </FallingObject>
            ))}

            {/* x2 объект */}
            {x2Object && (
              <X2Object
                style={{ left: x2Object.left, top: `${x2Object.top}%` }}
                onClick={handleClickX2Object}
              >
                <img src={x2Image} alt="x2" />
              </X2Object>
            )}
          </>
        ) : (
          <GameOverScreen>
            <h2>{exploded ? "Байка, вы подорвались!" : "Игра окончена!"}</h2>
            <p>Ваш счет: {score}</p>
            <ExitButton onClick={() => setScreen("mini")}>
              Выйти из игры
            </ExitButton>
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
  height: 70px;
  cursor: pointer;
  transition: top 0.1s linear;

  img {
    width: 100%;
    height: 100%;
  }
`;

const X2Object = styled(FallingObject)`
  width: 55px;
  height: 55px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const GameOverScreen = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
`;

const ExitButton = styled.button`
  background-color: #4d4c4c;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
`;
