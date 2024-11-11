import { createStore } from "effector";
import { hasherator } from "../lib/hasherator";

const initScore = () => {
  if (
    hasherator(localStorage.getItem("score")).toString() ===
    localStorage.getItem("key")
  ) {
    return parseFloat(localStorage.getItem("score"));
  }
  return 0;
};

export const $score = createStore<number>(initScore());
