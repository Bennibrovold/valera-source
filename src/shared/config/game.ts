import { combine, createEvent, createStore, sample } from "effector";
import Swal from "sweetalert2";
import BALOON from "../../assets/baloon.mp3";
import { $up, setUp, store } from "../../pages/shop/shop";
import { STORE_DATA_SAMPLE } from "../../pages/shop/shop.data";
import { hasherator } from "../lib/hasherator";
import { $currentLocation } from "./location";
import { $score } from "./stores";

export const isDevelopment = process.env.NODE_ENV === "development";

export const isDevMedia = (link) => {
  return link;
};

export const $sound = createStore<boolean>(
  localStorage.getItem("sound") === "true" ? true : false
);
export const setSound = createEvent<boolean>();
$sound.on(setSound, (_, payload) => payload);

$sound.watch((x) => {
  const r = localStorage.getItem("sound");
  localStorage.setItem("sound", x.toString());
});

export const setScore = createEvent<number>();
export const setHistoryScore = createEvent<number>();
export const addScore = createEvent<void>();

$score.on(setHistoryScore, (store, payload) => {
  return store + payload;
});

$score.on(addScore, (store) => {
  const location = $currentLocation.getState();
  let multiplayer = $multiplayer.getState();
  const up = $up.getState();

  up.forEach((item) => {
    multiplayer += item.qnty * item.multiply * location?.multiply;
  });

  return Number(
    Number(
      parseFloat(store) +
        parseFloat(Math.floor(1 * parseFloat(multiplayer) * 10) / 10)
    ).toFixed(2)
  );
});
$score.on(setScore, (_, payload) => parseFloat(payload));
$score.watch((x) => {
  localStorage.setItem("score", x.toString());
  localStorage.setItem("key", hasherator(x.toString()));
});

export const $progress = createStore<number>(
  parseInt(localStorage.getItem("progress")) || 0
);
export const setProgress = createEvent<number>();
$progress.on(setProgress, (_, payload) => payload);

$progress.watch((x) => {
  localStorage.setItem("progress", x.toString());
});

export const $prices = createStore([10, 20]);

export const buyUpgrade = createEvent<void>();

buyUpgrade.watch((_) => {
  const score = $score.getState();
  const progress = $progress.getState();
  const prices = $prices.getState();
  const price = prices[progress];

  if (price <= score) {
    setScore(parseFloat((parseFloat(score) - parseFloat(price)).toFixed(2)));
    setProgress(progress + 1);
  }
});

export const $priceFeed = createStore(10);
export const feedValera = createEvent<void>();
export const resetFeed = createEvent<void>();

$priceFeed.reset(resetFeed);

export const $dead = createStore<boolean>(false);
export const setDead = createEvent<boolean>();
$dead.on(setDead, (_, payload) => payload);

const audio = new Audio();
audio.preload = "auto";
audio.src = isDevMedia(BALOON);

$dead.watch((x) => {
  const sound = $sound.getState();
  if (x && sound) {
    audio.play();
  }
});

const random = (a: number, b: number) =>
  Math.floor(Math.random() * (b - a) + a);

export const setPriceFeed = createEvent<number>();
$priceFeed.on(setPriceFeed, (store, payload) => {
  return payload;
});

feedValera.watch((x) => {
  const score = $score.getState();
  const price = $priceFeed.getState();
  if (score >= price) {
    setScore(parseFloat((parseFloat(score) - parseFloat(price)).toFixed(2)));
    setPriceFeed(Math.floor(price * 1.14));
  }

  const res = random(1, 100);

  if (res > 80) {
    setDead(true);
    setUp(STORE_DATA_SAMPLE);
    setProgress(0);
    setScore(0);
    resetFeed();
    Swal.fire({
      title: "Байка!",
      text: "Валера погиб...",
      icon: "error",
      allowOutsideClick: false,
      confirmButtonText: "Заново.",
    }).then((x) => {});
  } else {
    addMultiplayer();
  }
});

export const $multiplayer = createStore<number>(1).reset(resetFeed);
export const setMultiplayer = createEvent<number>();
export const addMultiplayer = createEvent<void>();
$multiplayer.on(setMultiplayer, (_, payload) => payload);
$multiplayer.on(addMultiplayer, (store) => store + 1);

export const $multiplayerShow = combine([$multiplayer, $up]).map((store) => {
  const [multiplayer, up] = store;
  let multiplayer_ = multiplayer;

  up.forEach((item) => {
    multiplayer_ += item.qnty * item.multiply;
  });

  return multiplayer_;
});
