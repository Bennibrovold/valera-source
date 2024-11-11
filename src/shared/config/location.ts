import { combine, createEvent, createStore, sample } from "effector";
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

$locationsAvailable.watch(console.log)

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
  console.log(source)

  const location = source;
  const score = $score.getState()
  const locations = $locations.getState()
  const lvl = $lvl.getState()
    
    const { price, lvl: lvl_ } = locations.find(
      (item) => item.location === location
    );



    console.log(lvl_)

    console.log('here2')

    console.log(price, score, lvl_, lvl)
    if (price <= score && lvl_ <= lvl) {
      console.log('here')
      setScore(parseFloat((parseFloat(score) - parseFloat(price)).toFixed(2)));
      console.log(location)
      addLocationsAvailable(location);
    }
})

