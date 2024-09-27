import { createEvent, createStore } from "effector";

export const $user = createStore({});
export const setUser = createEvent();

$user.on(setUser, (_, payload) => payload);
