import { createStore } from "effector";

import TRASH from "../../assets/locations/trash.jpg";

export const $locations = createStore<string[]>([TRASH]);
export const $location = createStore<string>(
  localStorage.getItem("location") || 0
);
