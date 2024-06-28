import { createEvent, createStore } from "effector";
import { globalReset } from "./game";

export const $lvl = createStore<number>(1).reset(globalReset);
export const setLvl = createEvent<number>();
$lvl.on(setLvl, (_, payload) => payload);

export const $XP = createStore<number>(0).reset(globalReset);
export const addXP = createEvent<number>();
export const setXP = createEvent<number>();
$XP.on(setXP, (_, payload) => payload);
$XP.on(addXP, (store, payload) => store + payload);

export const $lvlExp = createStore<number>(100).reset(globalReset);
export const setLvlExp = createEvent<number>();
$lvlExp.on(setLvlExp, (_, payload) => payload);
$XP.watch((xp) => {
  const lvlexp = $lvlExp.getState();
  const lvl = $lvl.getState();

  if (xp >= lvlexp) {
    setXP(xp - lvlexp);
    setLvl(lvl + 1);
    setLvlExp(lvlexp * 1.65);
  }
});
