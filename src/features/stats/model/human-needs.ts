import { createStore } from "effector";

export const $player_config = createStore(
  localStorage.getItem("config") || {
    sleep: 100,
    food: 100,
  }
);

export const $sleep = $player_config.map((x) => x.sleep);
export const $food = $player_config.map((x) => x.food);
