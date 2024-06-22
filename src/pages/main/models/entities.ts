import { createEvent, createStore } from "effector";

export const $entities = createStore<number[]>([]);
export const addEntities = createEvent<void>();
$entities.on(addEntities, (store, payload) =>
  store.length === 10
    ? store
    : [
        ...store,
        {
          x: Math.random() * 200 + (window.innerWidth <= 776 ? -50 : +50),
          y: Math.random() * 100 + 100,
        },
      ]
);

export const removeEntitites = createEvent<{ x: number; y: number }>();
$entities.on(removeEntitites, (store, payload) => {
  const { x, y } = payload;

  return store.filter((x) => x.x !== x && x.y !== y);
});
