import { createEvent, createStore } from "effector";
import { CARSTORE_DATA_SAMPLE } from "./carshop.data";
import { $score } from "../../shared/config/stores";
import { setScore } from "../../shared/config/game";
export const carstore = CARSTORE_DATA_SAMPLE;


export const $carup = createStore(
  JSON.parse(localStorage.getItem("carstore")) || carstore
);

$carup.watch((x) => {
  if (CARSTORE_DATA_SAMPLE.length > JSON.parse(localStorage.getItem("carstore"))?.length) {
    localStorage.setItem("carstore", JSON.stringify(CARSTORE_DATA_SAMPLE));
  } else {
    localStorage.setItem("carstore", JSON.stringify(x));
  }
});


export const carbuy = createEvent<{ name: string; price: number }>();

carbuy.watch(({ name, price }) => {
  const store = $carup.getState();
  const score = $score.getState();

  if (score >= price) {
    const index = store.findIndex((x) => x.name === name);
    if (index !== -1 && typeof price === "number") {
      store[index] = {
        ...store[index],
        price: "КУПЛЕНО",
      };

     
      setScore(score - price);
    }
  }

  setUp(store);
});


export const setUp = createEvent<any>();
$carup.on(setUp, (_, payload) => {
  return [...payload];
});


function updateScoreWithMultiply() {
  setInterval(() => {
    const carstoreState = $carup.getState();
    const score = $score.getState();

    
    const totalMultiply = carstoreState
      .filter((car) => car.price === "КУПЛЕНО")
      .reduce((acc, car) => acc + (car.multiply || 0), 0);

    
    if (totalMultiply > 0) {
      setScore(score + totalMultiply);
    }
  }, 2000); 
}


updateScoreWithMultiply();
