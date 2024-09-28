import { createEvent, createStore } from "effector";

export const $screen = createStore<string>("menu");

export const setScreen = createEvent<string>();

$screen.on(setScreen, (_, payload) => payload);




export const $screenreg = createStore<string>("register");

export const setScreenreg = createEvent<string>();

$screenreg.on(setScreenreg, (_, payload) => payload);



export const $screenlog = createStore<string>("login");

export const setScreenlog = createEvent<string>();

$screenreg.on(setScreenreg, (_, payload) => payload);


export const $screengame1 = createStore<string>("Infogames");

export const setScreengame1 = createEvent<string>();

$screengame1.on(setScreengame1, (_, payload) => payload);


export const $screenexit = createStore<string>("exit");

export const setScreenexit = createEvent<string>();

$screenexit.on(setScreenexit, (_, payload) => payload);


export const $screengames = createStore<string>("GamesAkinator");

export const setScreengames = createEvent<string>();

$screengames.on(setScreengames, (_, payload) => payload);