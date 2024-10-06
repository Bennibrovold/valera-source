import { useEffect } from "react";
import Swal from "sweetalert2";
import { HYSTORY } from "./history.data";
import { setHistoryScore } from "../../shared/config/gafe";

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const GameHistory = () => {
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
        setHistoryScore(HYSTORY[rand_val].bonus);
      });
    }, 500000);
  }, []);

  return null;
};
