import { combine, createEvent, createStore } from "effector";
import { LOCATIONS_DATA } from "../data/location.data";
import { setScore } from "./game";
import { $lvl } from "./lvl";
import { getParsedValue } from "../lib/parseToValue";
import { $score } from "./stores";

export const $locations = createStore(LOCATIONS_DATA);

export const $locationsAvailable = createStore(
  getParsedValue(localStorage.getItem("locations_available")) || ["trash"]
);

$locationsAvailable.watch((x) => {
  localStorage.setItem("locations_available", JSON.stringify(x));
});

export const addLocationsAvailable = createEvent<string>();

$locationsAvailable.on(addLocationsAvailable, (store, payload) => [
  ...store,
  payload,
]);

$locationsAvailable.watch(console.log);

export const $locationsInfo = combine(
  [$locations, $locationsAvailable],
  ([locations, availables]) => {
    return locations.map((x) => ({
      ...x,
      active: availables.includes(x.location),
    }));
  }
);

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

export const $currentLocation = combine([$locations, $location]).map(
  ([locations, location]) => {
    return locations.find((item) => item.location === location);
  }
);

export const $ruLocation = $currentLocation.map((x) => x!.title);
export const $locationImage = $currentLocation.map((x) => x!.image);

export const buyLocation = createEvent<string>();

export const buyLocationFn = createEvent<any>();

buyLocation.watch((source) => {
  const location = source;
  const score = $score.getState();
  const locations = $locations.getState();
  const lvl = $lvl.getState();
  
  const { price, lvl: lvl_, multiply } = locations.find(
    (item) => item.location === location
  ) || {};

  if (price && lvl_ !== undefined && multiply !== undefined) {
    if (price <= score && lvl_ <= lvl) {
      setScore(parseFloat((parseFloat(score) - parseFloat(price)).toFixed(2)));
      addLocationsAvailable(location);
    }
  }
});

// Функция для периодического увеличения очков на основе множителя купленных локаций
function updateScoreWithMultiply() {
  setInterval(() => {
    const locationsAvailable = $locationsAvailable.getState();
    const locations = $locations.getState();
    const score = $score.getState();

    const totalMultiply = locations
      .filter((location) => 
        locationsAvailable.includes(location.location) && location.multiply
      )
      .reduce((acc, location) => acc + (location.multiply || 0), 0);

    if (totalMultiply > 0) {
      setScore(score + totalMultiply);
    }
  }, 3000);
}

updateScoreWithMultiply();