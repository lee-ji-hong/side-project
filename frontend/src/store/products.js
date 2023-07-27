import { atom } from "recoil";
import dayjs from 'dayjs';

export const reservationProductState = atom({
  key: 'reservationProductState',
  default: undefined
});

export const selectedItemState = atom({
  key: 'selectedItemState',
  // default: null
  default: []
});

export const totalPriceState = atom({
  key: 'totalPriceState',
  default: 0
});

export const openModalState = atom({
  key: 'openModalState',
  default: false
});

export const cartItemState = atom({
  key: 'cartItemState',
  default: []
});

export const addressState = atom({
  key: 'addressState',
  default:{}
});

export const pickupState = atom({
  key: 'pickupState',
  default: false,
});

export const pickupTimeState = atom({
  key: 'pickupTimeState',
  default: dayjs()
});

export const weightState = atom({
  key: 'weightState',
  default: undefined
});

export const sizeState = atom({
  key: 'sizeState',
  default: undefined
});

export const petState = atom({
  key: 'petState',
  default: undefined
});