import { createEvent, createStore } from "effector";
import { getParsedValue } from "../lib/parseToValue";
import { globalReset } from "./global-reset";

export const $lvl = createStore<number>(
  getParsedValue(localStorage.getItem("lvl")) || 1
).reset(globalReset);
export const setLvl = createEvent<number>();
$lvl.on(setLvl, (_, payload) => payload);

$lvl.watch((x) => {
  localStorage.setItem("lvl", x);
});

export const $XP = createStore<number>(
  getParsedValue(localStorage.getItem("xp")) || 0
).reset(globalReset);
$XP.watch((x) => {
  localStorage.setItem("xp", x);
});
export const addXP = createEvent<number>();
export const setXP = createEvent<number>();
$XP.on(setXP, (_, payload) => payload);
$XP.on(addXP, (store, payload) => store + payload);

export const $lvlExp = createStore<number>(
  getParsedValue(localStorage.getItem("lvl_exp")) || 100
).reset(globalReset);
$lvlExp.watch((x) => {
  localStorage.setItem("lvl_exp", x);
});
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
