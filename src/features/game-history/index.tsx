import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { HYSTORY } from "./history.data";
import { $score, setScore } from "../../shared/config/game";
import { useUnit } from "effector-react";

export const GameHistory = () => {
  const score = useUnit($score);
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    setTimeout(() => {
      Swal.fire({
        title: HYSTORY[progress].title,
        text: HYSTORY[progress].description,
        icon: "info",
        allowOutsideClick: false,
        confirmButtonText: "Понятно.",
      }).then((x) => {
        setScore(score + HYSTORY[progress].bonus);
        if (progress < HYSTORY.length - 1) setProgress(progress + 1);
      });
    }, 60 * 60 * 10);
  }, []);

  return null;
};
