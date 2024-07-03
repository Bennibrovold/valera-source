import { createEvent, createStore } from "effector";
import { CARSTORE_DATA_SAMPLE } from "./carshop.data";
import { $score } from "../../shared/config/stores";

export const store1 = CARSTORE_DATA_SAMPLE;

export const $up1 = createStore(
  JSON.parse(localStorage.getItem("carstore")) || store1
);

$up1.watch((x) => {
  if (
    CARSTORE_DATA_SAMPLE.length >
    JSON.parse(localStorage.getItem("carstore"))?.length
  ) {
    localStorage.setItem("carstore", JSON.stringify(CARSTORE_DATA_SAMPLE));
  } else {
    localStorage.setItem("carstore", JSON.stringify(x));
  }
});

export const buy1 = createEvent<any>();

buy1.watch(({ name, price }) => {
  const store = $up1.getState();

  const score = $score.getState();

  if (score >= price) {
    const index1 = store1.findIndex((x) => x.name === name);
  }

  setUp(store1);
});

export const setUp = createEvent<any>();

$up1.on(setUp, (_, payload) => {
  return [...payload];
});
