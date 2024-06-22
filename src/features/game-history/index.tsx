import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { HYSTORY } from "./history.data";
import { $score, setScore } from "../../shared/config/game";
import { useUnit } from "effector-react";

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const GameHistory = () => {
  const score = useUnit($score);
  useEffect(() => {
    setInterval(() => {
      const rand_val = rand(0, HYSTORY.length - 1);
      Swal.fire({
        title: HYSTORY[rand_val].title,
        text: HYSTORY[rand_val].description,
        icon: "info",
        allowOutsideClick: false,
        confirmButtonText: "Понятно.",
      }).then((x) => {
        setScore(score + HYSTORY[rand_val].bonus);
      });
    }, 10 * 60 * 1000);
  }, []);

  return null;
};
