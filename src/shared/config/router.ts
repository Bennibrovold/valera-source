import { createEvent, createStore } from "effector";

export const $screen = createStore<string>("menu");
export const setScreen = createEvent<string>();

$screen.on(setScreen, (_, payload) => payload);
