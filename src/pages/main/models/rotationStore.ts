import { createStore, createEvent } from "effector";

export const toggleRotation = createEvent();
export const $rotation = createStore(0).on(toggleRotation, (state) => (state === 0 ? -90 : 0));
