import { createEvent, createStore } from "effector";
import { CARSTORE_DATA_SAMPLE } from "./carshop.data";
import { $score } from "../../shared/config/stores";
import { setScore } from "../../shared/config/game";
export const carstore = CARSTORE_DATA_SAMPLE;

export const $carup = createStore(
  JSON.parse(localStorage.getItem("carstore")) || carstore
);

$carup.watch((x) => {
  if (
    CARSTORE_DATA_SAMPLE.length >
    JSON.parse(localStorage.getItem("carstore"))?.length
  ) {
    localStorage.setItem("carstore", JSON.stringify(CARSTORE_DATA_SAMPLE));
  } else {
    localStorage.setItem("carstore", JSON.stringify(x));
  }
});

export const carbuy = createEvent<any>();

carbuy.watch(({ name, price }) => {
  const store = $carup.getState();

  const score = $score.getState();

  if (score >= price) {
    const index1 = carstore.findIndex((x) => x.name === name);
    if (score >= price && typeof price === "number") { 
      const index = carstore.findIndex((x) => x.name === name);
      if (index !== -1) {
        
        carstore[index] = {
          ...carstore[index],
          price: "КУПЛЕНО",
          
        };
    
        
        setScore(score - price);
      }
    }
  }

  setUp(carstore);
});

export const setUp = createEvent<any>();

$carup.on(setUp, (_, payload) => {
  return [...payload];
});
