import { createEvent, createStore } from 'effector';

export const openModal = createEvent();
export const closeModal = createEvent();

export const $isModalOpen = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);