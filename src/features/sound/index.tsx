import { useEffect, useState } from "react";
import {
  $dead,
  $score,
  $sound,
  isDevMedia,
  setDead,
} from "../../shared/config/game";
import { useUnit } from "effector-react";
import TUTUTU from "../../assets/tututu.mp3";

const tututu = new Audio();
tututu.preload = "auto";
tututu.src = isDevMedia(TUTUTU);
tututu.loop = true;

export const Sound = () => {
  const [init, setInit] = useState(false);
  const sound = useUnit($sound);
  const score = useUnit($score);
  const dead = useUnit($dead);

  useEffect(() => {
    if (!score || (init && sound)) {
      tututu.play();
    }
  }, [score, init]);

  useEffect(() => {
    if (!sound) {
      tututu.volume = 0;
    } else {
      tututu.volume = 1;
    }
  }, [sound]);

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    tututu.pause();
    tututu.currentTime = 0;
    setDead(false);
  }, [dead]);

  return null;
};
