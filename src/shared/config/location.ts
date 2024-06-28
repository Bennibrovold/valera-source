import { createEvent, createStore } from "effector";

import TRASH from "../../assets/locations/trash.jpg";
import GARAGE from "../../assets/locations/garage.jpg";

export const $locations = createStore<string[]>({
  trash: TRASH,
  garage: GARAGE ,
});
export const $location = createStore<string>(
  localStorage.getItem("location") || "trash"
);
$location.watch((x) => {
  localStorage.setItem("location", x);
});
export const setLocation = createEvent<string>();
$location.on(setLocation, (store, payload) => {
  return payload;
});

const lang = {
  trash: "Помойка",
  garage: "Гараж" ,
};

export const $ruLocation = $location.map((x) =>  lang[x]);