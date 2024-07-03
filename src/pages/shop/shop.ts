import { createEvent, createStore } from "effector";
import { setScore } from "../../shared/config/game";
import { STORE_DATA_SAMPLE } from "./shop.data";
import { $score } from "../../shared/config/stores";

export const store = STORE_DATA_SAMPLE;

export const $up = createStore(
  JSON.parse(localStorage.getItem("store")) || store
);

$up.watch((x) => {
  if (
    STORE_DATA_SAMPLE.length > JSON.parse(localStorage.getItem("store"))?.length
  ) {
    localStorage.setItem("store", JSON.stringify(STORE_DATA_SAMPLE));
  } else {
    localStorage.setItem("store", JSON.stringify(x));
  }
});

export const buy = createEvent<any>();

buy.watch(({ name, price }) => {
  const store = $up.getState();

  const score = $score.getState();

  if (score >= price) {
    const index = store.findIndex((x) => x.name === name);

    if (store[index].price <= score) {
      store[index].qnty++;

      setScore((parseFloat(score) - parseFloat(store[index].price)).toFixed(2));
      store[index].price *= 1.15;
      store[index].price = Math.floor(store[index].price * 10) / 10;
    }
  }

  setUp(store);
});

export const setUp = createEvent<any>();

$up.on(setUp, (_, payload) => {
  return [...payload];
});
