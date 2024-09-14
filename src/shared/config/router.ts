import { createEvent, createStore } from "effector";

export const $screen = createStore<string>("menu");

export const setScreen = createEvent<string>();

$screen.on(setScreen, (_, payload) => payload);




export const $screenreg = createStore<string>("register");

export const setScreenreg = createEvent<string>();

$screenreg.on(setScreenreg, (_, payload) => payload);