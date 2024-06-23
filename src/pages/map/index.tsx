import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import backgroundImage from "../../assets/carta.png";
import Div100vh from "react-div-100vh";

const Viewport = styled(Div100vh)`
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  position: relative;
  cursor: grab;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  position: absolute;
  width: 2000px;
  height: 2000px;
  zoom: 5;
`;

function getRandomColor() {
  // Генерация случайного числа между 0 и 255 для каждого из RGB компонентов
  let r = Math.floor(Math.random() * 256); // Красный
  let g = Math.floor(Math.random() * 256); // Зеленый
  let b = Math.floor(Math.random() * 256); // Синий

  // Преобразование значений RGB в строку HEX формата
  let color =
    "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  return color;
}

export const Map = () => {
  const store = [
    {
      width: "20%",
      title: "Город",
      active: false,
      price: 500000,
    },
    {
      width: "60%",
      title: "Помойка",
      active: false,
      price: 500000,
    },
    {
      width: "20%",
      title: "Площадка",
      active: false,
      price: 500000,
    },
    {
      width: "30%",
      title: "Больница",
      active: false,
      price: 500000,
    },
    {
      width: "30%",
      title: "Отель",
      active: true,
      price: 500000,
    },
    {
      width: "40%",
      title: "Квартира в центре Владивостока",
      active: true,
      price: 500000,
    },
    {
      width: "50%",
      title: "Квартира на угольной",
      active: false,
      price: 500000,
    },
    {
      width: "25%",
      title: "Автосалон",
      active: false,
      price: 500000,
    },
    {
      width: "25%",
      title: "Полицейский участок",
      active: false,
      price: 500000,
    },
  ];

  return (
    <Wrapper>
      {store.map((x) => (
        <Block style={{ width: `calc(${x.width} - 8px)` }}>
          <Bg color={getRandomColor()} active={x.active}>
            {x.title} {!x.active && x.price}
          </Bg>
        </Block>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Block = styled.div`
  padding: 4px;
`;

const Bg = styled.div<{ color?: string; active?: boolean }>`
  height: 300px;
  background-color: ${(p) => p.color};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 30px;
  border-radius: 10px;
  opacity: 0.5;

  ${({ active }) =>
    active &&
    css`
      cursor: pointer;
      opacity: 1;
      &:hover {
        background-color: blue;
      }
    `}
`;
