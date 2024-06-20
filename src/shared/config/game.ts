import { createEvent, createStore, sample } from "effector";
import Swal from "sweetalert2";
import BALOON from "../../assets/baloon.mp3";

export const isDevelopment = process.env.NODE_ENV === "development";

export const isDevMedia = (link) => {
  return isDevelopment
    ? link
    : `https://bennibrovold.github.io/valera-simulator/${link}`;
};

export const $score = createStore<number>(
  parseInt(localStorage.getItem("score")) || 0
);
export const setScore = createEvent<number>();
export const addScore = createEvent<void>();

$score.on(addScore, (store) => store + 1);
$score.on(setScore, (_, payload) => payload);
$score.watch((x) => {
  localStorage.setItem("score", x.toString());
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
    setScore(score - price);
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
  if (x) {
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
    setScore(score - price);
    setPriceFeed(Math.floor(price * 1.14));
  }

  const res = random(1, 100);

  if (res > 70) {
    setDead(true);
    Swal.fire({
      title: "Пиздец!",
      text: "Валера погиб...",
      icon: "error",
      allowOutsideClick: false,
      confirmButtonText: "Заново.",
    }).then((x) => {
      setProgress(0);
      setScore(0);
      resetFeed();
    });
  }
});
